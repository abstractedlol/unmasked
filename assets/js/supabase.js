(() => {
  'use strict';

  const PROJECT_URL = 'https://alkvbrescgfivcssabbp.supabase.co';
  const PUBLISHABLE_KEY = 'sb_publishable_BqQv2_Wu8SMVqKvqimqSLQ_ACJ2jCna';
  const SESSION_KEY = 'unmasked_supabase_session_v1';

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  }

  async function request(path, { method = 'GET', body, accessToken, headers = {} } = {}) {
    const response = await fetch(`${PROJECT_URL}${path}`, {
      method,
      headers: {
        apikey: PUBLISHABLE_KEY,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();
    if (!response.ok) {
      const message = payload?.msg || payload?.message || payload?.error_description || payload?.error || `Request failed (${response.status}).`;
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function normalizeSession(payload) {
    if (!payload?.access_token || !payload?.user) return null;
    return {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: payload.expires_at || Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600),
      user: payload.user
    };
  }

  async function signIn(email, password) {
    const payload = await request('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: { email, password }
    });
    const session = normalizeSession(payload);
    saveSession(session);
    return session;
  }

  async function signUp(email, password) {
    const payload = await request('/auth/v1/signup', {
      method: 'POST',
      body: { email, password }
    });
    const session = normalizeSession(payload);
    if (session) saveSession(session);
    return { session, user: payload.user || null };
  }

  async function refreshSession() {
    const current = readSession();
    if (!current?.refresh_token) return null;
    try {
      const payload = await request('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST',
        body: { refresh_token: current.refresh_token }
      });
      const session = normalizeSession(payload);
      saveSession(session);
      return session;
    } catch (error) {
      saveSession(null);
      throw error;
    }
  }

  async function restoreSession() {
    const session = readSession();
    if (!session) return null;
    if (Number(session.expires_at || 0) > Math.floor(Date.now() / 1000) + 60) return session;
    return refreshSession();
  }

  async function hasWorkspaceAccess() {
    const session = readSession();
    if (!session?.access_token) return false;
    const allowed = await request('/rest/v1/rpc/has_workspace_access', {
      method: 'POST',
      body: {},
      accessToken: session.access_token
    });
    return allowed === true;
  }

  async function lookup(searchType, queryKey) {
    const session = readSession();
    if (!session?.access_token) throw new Error('Log in before running a search.');

    const params = new URLSearchParams({
      select: 'records',
      search_type: `eq.${String(searchType).trim().toLowerCase()}`,
      query_key: `eq.${String(queryKey).trim().toLowerCase()}`,
      limit: '1'
    });
    const rows = await request(`/rest/v1/query_results?${params}`, {
      accessToken: session.access_token
    });
    if (!Array.isArray(rows) || !rows.length) throw new Error('No saved results were found for this query.');

    const value = rows[0].records;
    if (Array.isArray(value)) return { records: value, metadata: {} };
    return {
      records: Array.isArray(value?.records) ? value.records : [],
      metadata: value?.metadata && typeof value.metadata === 'object' ? value.metadata : {}
    };
  }

  async function signOut() {
    const session = readSession();
    saveSession(null);
    if (!session?.access_token) return;
    try {
      await request('/auth/v1/logout', { method: 'POST', accessToken: session.access_token });
    } catch {
      // The local session is already cleared even if the network request fails.
    }
  }

  function displayName(session) {
    const user = session?.user;
    return user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Account';
  }

  window.UnmaskedSupabase = Object.freeze({
    getSession: readSession,
    restoreSession,
    signIn,
    signUp,
    signOut,
    hasWorkspaceAccess,
    lookup,
    displayName
  });
})();
