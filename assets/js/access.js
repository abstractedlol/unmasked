(() => {
  'use strict';

  // Static-site demo access only. This obscures the permitted identifier but
  // is not a security boundary; production authorization belongs on a server.
  const permittedIdentityHash = 'f63c243cfc95bd9627cfd0e1b0c47b2b92ccefb257b0163f1f850af29b72b5b3';

  async function digest(value) {
    const normalized = String(value || '').trim().toLowerCase();
    const bytes = new TextEncoder().encode(normalized);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async function createSession(account) {
    const name = String(account?.name || 'Account').trim();
    return {
      name,
      workspaceAccess: await digest(name) === permittedIdentityHash
    };
  }

  function canUseWorkspace(session) {
    return session?.workspaceAccess === true;
  }

  window.UnmaskedAccess = Object.freeze({ createSession, canUseWorkspace });
})();
