    const ACCOUNTS_KEY = 'unmasked_accounts_v2';
    const SESSION_KEY = 'unmasked_session_v2';
    const THEME_KEY = 'unmasked_theme_v2';
    const FONT_KEY = 'unmasked_font_v2';
    const DISCORD_URL = 'https://discord.gg/njv2hsWkYW';

    const nav = document.getElementById('nav');
    const checkout = document.getElementById('checkout');
    const signin = document.getElementById('signin');
    const testDashboard = document.getElementById('testDashboard');
    const toast = document.getElementById('toast');
    const authTitle = document.getElementById('signinTitle');
    const authSubmit = document.getElementById('authSubmit');
    const authMessage = document.getElementById('authMessage');
    const authName = document.getElementById('authName');
    const authPassword = document.getElementById('authPassword');
    const navUserWrap = document.getElementById('navUserWrap');
    const accountButton = document.getElementById('accountButton');
    const accountButtonLabel = document.getElementById('accountButtonLabel');
    const navUserDropdown = document.getElementById('navUserDropdown');
    const navDashboardAction = document.getElementById('navDashboardAction');
    const navLogoutAction = document.getElementById('navLogoutAction');
    const dashboardUser = document.getElementById('dashboardUser');
    const overviewPanel = document.getElementById('overviewPanel');
    const casesPanel = document.getElementById('casesPanel');
    const themesPanel = document.getElementById('themesPanel');
    const graphBuilderPanel = document.getElementById('graphBuilderPanel');
    const lookupPanel = document.getElementById('lookupPanel');
    const toolInput = document.getElementById('toolInput');
    const toolSubmitBtn = document.getElementById('toolSubmitBtn');
    const toolSearchForm = document.getElementById('toolSearchForm');
    const imageDropzone = document.getElementById('imageDropzone');
    const imageFileInput = document.getElementById('imageFileInput');
    const toolLock = document.getElementById('toolLock');
    const previewLines = document.getElementById('previewLines');
    const loadingState = document.getElementById('loadingState');
    const loadingStatus = document.getElementById('loadingStatus');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsMetaCount = document.getElementById('resultsMetaCount');
    const resultsMetaQuery = document.getElementById('resultsMetaQuery');
    const resultsPagination = document.getElementById('resultsPagination');
    const discordDossierContainer = document.getElementById('discordDossierContainer');
    const machineViewContainer = document.getElementById('machineViewContainer');

    const HISTORY_KEY = 'unmasked_search_history_v1';
    const CASES_KEY = 'unmasked_cases_v1';
    const RESULT_FOLDERS = Object.freeze({
      'E-Mail': 'emails',
      'E-Mail FootPrint': 'emails',
      'Email To TikTok': 'emails',
      'Username': 'usernames',
      'Username FootPrint': 'usernames',
      'Roblox Username': 'usernames',
      'TikTok Username': 'usernames',
      'Instagram Username': 'usernames',
      'FiveM User': 'usernames',
      'Name': 'name',
      'Discord ID': 'discord id',
      'Discord To Roblox': 'discord id'
    });

    const toolCopy = {
      'Universal Search': ['Search any supported identifier from one place.', 'Search email, username, IP, phone, Discord ID…'],
      'Overview': ['Workspace metrics, search history, and saved cases.', 'Overview does not require an input'],
      'Cases': ['Create and manage saved investigation cases.', 'Cases do not require an input'],
      'Themes': ['Personalize the appearance of your investigation workspace.', 'Theme controls unlock with your account'],
      'Username': ['Review public-source signals connected to a username.', 'Enter a username'],
      'Name': ['Search public records using a person or organization name.', 'Enter a full name'],
      'Phone': ['Review lawful public-source records connected to a phone number.', 'Enter a phone number'],
      'IP Lookup': ['Review public network, ASN, hosting, and geolocation signals for an IP address.', 'Enter an IPv4 or IPv6 address'],
      'E-Mail': ['Review public-source records connected to an e-mail address.', 'Enter an e-mail address'],
      'Password': ['Check exposure records using a password.', 'Enter a password'],
      'E-Mail FootPrint': ['Map where an e-mail address appears across supported public sources.', 'Enter an e-mail address'],
      'Username FootPrint': ['Map a username across supported public platforms.', 'Enter a username'],
      'Roblox Username': ['Review public Roblox profile signals by username.', 'Enter a Roblox username'],
      'Roblox To Discord': ['Review authorized public links between Roblox and Discord profiles.', 'Enter a Roblox username or ID'],
      'Discord ID': ['Review public metadata associated with a Discord ID.', 'Enter a Discord ID'],
      'Discord To Roblox': ['Review authorized public links between Discord and Roblox profiles.', 'Enter a Discord ID'],
      'TikTok Username': ['Review public TikTok profile signals by username.', 'Enter a TikTok username'],
      'Email To TikTok': ['Review consented or public associations for an e-mail address.', 'Enter an e-mail address'],
      'Instagram Username': ['Review public Instagram profile signals by username.', 'Enter an Instagram username'],
      'Phone To Instagram': ['Review consented or public phone-to-profile associations.', 'Enter a phone number'],
      'FiveM License': ['Review authorized public FiveM license signals.', 'Enter a FiveM license identifier'],
      'FiveM User': ['Review public FiveM user signals.', 'Enter a FiveM username or identifier'],
      'Minecraft UUID': ['Review public Minecraft identity signals by UUID.', 'Enter a Minecraft UUID'],
      'Steam ID': ['Review public Steam profile signals by Steam ID.', 'Enter a Steam ID'],
      'IntelX Lookup': ['Search indexed public intelligence sources through IntelX.', 'Enter systemId UUID'],
      'Image GeoLocation': ['Inspect image metadata and public visual location signals.', 'Drop an image or choose a file'],
      'Machine View': ['Open a structured machine-readable intelligence view.', 'Enter an entity or indicator'],
      'Graph Case File': ['Visualize relationships inside a saved investigation case.', 'Create and map entity nodes']
    };

    let activeTool = 'Universal Search';
    const tabSearchState = {};
    const PAGE_SIZE = 15;
    let isSearching = false;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { root: null, threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    function initScrollReveals() {
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      const testMain = document.querySelector('.test-main');
      if (testMain) {
        const dashboardObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        }, { root: testMain, threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        testMain.querySelectorAll('.reveal').forEach(el => dashboardObserver.observe(el));
      }
    }

    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
    window.addEventListener('pointermove', e => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });

    function syncBodyLock() {
      document.body.style.overflow = document.querySelector('.modal-backdrop.open') || testDashboard.classList.contains('open') ? 'hidden' : '';
    }
    function openModal(modal) {
      modal.classList.add('open');
      syncBodyLock();
      modal.querySelector('.close').focus();
    }
    function closeModal(modal) {
      modal.classList.remove('open');
      syncBodyLock();
    }
    function openDashboard() { 
      testDashboard.classList.add('open'); 
      syncBodyLock();
      refreshWorkspaceAccess();
      setTimeout(() => {
        document.querySelectorAll('.test-main .reveal').forEach(el => el.classList.add('active'));
      }, 50);
    }
    function closeDashboard() { 
      testDashboard.classList.remove('open'); 
      syncBodyLock(); 
    }
    
    function getSession() {
      try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
      catch { return null; }
    }
    function getAccounts() {
      try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]'); }
      catch { return []; }
    }
    async function hashPassword(value) {
      const bytes = new TextEncoder().encode(value);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    }
    function showAuthMessage(text, type = '') {
      authMessage.textContent = text;
      authMessage.className = 'auth-message show' + (type ? ' ' + type : '');
    }
    function clearAuthMessage() {
      authMessage.textContent = '';
      authMessage.className = 'auth-message';
    }
    
    function hasDashboardAccess() {
      return window.UnmaskedAccess.canUseWorkspace(getSession());
    }

    function hasSearchAccess() {
      return window.UnmaskedAccess.canUseWorkspace(getSession());
    }

    function updateAuthUI() {
      const session = getSession();
      const workspaceAllowed = hasDashboardAccess();
      document.querySelectorAll('.nav-actions [data-auth]').forEach(button => button.hidden = !!session);
      navUserWrap.hidden = !session;
      if (session) {
        accountButtonLabel.textContent = session.name || 'Account';
        dashboardUser.textContent = session.name || 'Account';
        navDashboardAction.hidden = false;
      } else {
        dashboardUser.textContent = 'Intelligence workspace';
        navDashboardAction.hidden = true;
      }
      document.querySelectorAll('[data-action="dashboard"], #navDashboardAction').forEach(button => {
        button.disabled = !workspaceAllowed;
        button.classList.toggle('caution-covered', !workspaceAllowed);
        button.setAttribute('aria-disabled', String(!workspaceAllowed));
        button.title = workspaceAllowed ? '' : 'Authorized access required';
      });
      refreshWorkspaceAccess();
    }

    function refreshWorkspaceAccess() {
      const privileged = hasSearchAccess();
      if (privileged) {
        toolInput.disabled = false;
        toolLock.hidden = true;
        previewLines.hidden = true;
      } else {
        toolInput.disabled = true;
        toolLock.hidden = false;
        previewLines.hidden = false;
        resultsContainer.hidden = true;
      }
    }

    function requestDashboard() {
      if (!hasDashboardAccess()) {
        toast.textContent = 'Dashboard access is not enabled for this account.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
        return;
      }
      openDashboard();
    }
    function showCheckout(plan = 'Studio') {
      const selectedPlan = window.UnmaskedPlans.get(plan);
      const amount = `$${selectedPlan.price.toFixed(2)}`;
      document.getElementById('selectedPlan').textContent = selectedPlan.name;
      document.getElementById('summaryPlan').textContent = selectedPlan.name;
      document.getElementById('summaryBilling').textContent = selectedPlan.billingLabel;
      document.getElementById('checkoutPrice').innerHTML = amount + ' <small>USD</small>';
      document.getElementById('summaryAmount').textContent = amount;
      document.getElementById('orderFeatureSearch').textContent = selectedPlan.limits.searches === Infinity
        ? 'Unlimited searches per day'
        : `${selectedPlan.limits.searches} searches per day`;
      document.getElementById('orderFeatureMachine').textContent = `${selectedPlan.limits.machineViews} machine views ${selectedPlan.limits.machineViewsPeriod}`;
      document.getElementById('orderFeatureIntel').textContent = `${selectedPlan.limits.intelX} IntelX searches ${selectedPlan.limits.intelXPeriod}`;
      window.UnmaskedBlockchain.setPayment('crypto');
      openModal(checkout);
    }
    function setAuthMode(mode) {
      const signup = mode === 'signup';
      signin.dataset.mode = mode;
      authTitle.textContent = signup ? 'Create your account' : 'Welcome back';
      authName.autocomplete = 'username';
      authPassword.autocomplete = signup ? 'new-password' : 'current-password';
      authSubmit.textContent = signup ? 'Create account' : 'Log in';
      document.querySelectorAll('[data-auth-tab]').forEach(tab => tab.classList.toggle('active', tab.dataset.authTab === mode));
      clearAuthMessage();
    }
    function showDiscordPrompt() {
      toast.textContent = 'Opening Discord…';
      toast.classList.add('show');
      window.open(DISCORD_URL, '_blank', 'noopener,noreferrer');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }
    function applyTheme(theme) {
      const selected = ['obsidian', 'graphite', 'contrast', 'slate', 'fog'].includes(theme) ? theme : 'obsidian';
      document.documentElement.setAttribute('data-theme', selected);
      localStorage.setItem(THEME_KEY, selected);
      document.querySelectorAll('[data-theme-option]').forEach(card => card.classList.toggle('active', card.dataset.themeOption === selected));
    }
    function applyFont(font) {
      const selected = ['system', 'editorial', 'mono'].includes(font) ? font : 'system';
      document.documentElement.setAttribute('data-font', selected);
      localStorage.setItem(FONT_KEY, selected);
      document.querySelectorAll('[data-font-option]').forEach(card => card.classList.toggle('active', card.dataset.fontOption === selected));
    }
    
    function getSearchHistory() {
      try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
      catch { return []; }
    }
    function setSearchHistory(items) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 100)));
    }
    function addSearchHistory(tool, query) {
      const value = String(query || '').trim();
      if (!value || ['Overview','Cases','Themes','Graph Case File'].includes(tool)) return;
      const items = getSearchHistory().filter(item => !(item.tool === tool && item.query.toLowerCase() === value.toLowerCase()));
      items.unshift({ id: Date.now(), tool, query: value, at: new Date().toISOString() });
      setSearchHistory(items);
      renderOverviewHome();
    }
    function getCases() {
      try { return JSON.parse(localStorage.getItem(CASES_KEY) || '[]'); }
      catch { return []; }
    }
    function setCases(items) { localStorage.setItem(CASES_KEY, JSON.stringify(items)); }
    function formatTime(value) {
      try { return new Date(value).toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }); }
      catch { return ''; }
    }
    function detectSmartTool(raw) {
      const q = String(raw || '').trim();
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) return 'E-Mail';
      if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(q) || q.includes(':')) return 'IP Lookup';
      if (/^\+?[0-9][0-9 ()-]{7,}$/.test(q)) return 'Phone';
      if (/^\d{17,20}$/.test(q)) return 'Discord ID';
      return 'Username';
    }
    function renderOverviewHome() {
      const caseCount = document.getElementById('overviewCaseCount');
      const historyCount = document.getElementById('overviewHistoryCount');
      const recentCases = document.getElementById('overviewRecentCases');
      if (!caseCount || !historyCount || !recentCases) return;
      const cases = getCases();
      const history = getSearchHistory();
      caseCount.textContent = cases.length;
      historyCount.textContent = history.length;
      recentCases.innerHTML = cases.length ? cases.slice(0,4).map(item => `
        <button class="mini-row" type="button" data-case-id="${item.id}">
          <span class="mini-row-main"><strong>${escapeHtml(item.name)}</strong><small>${item.items?.length || 0} saved searches</small></span>
          <span class="mini-row-meta">${formatTime(item.updatedAt || item.createdAt)}</span>
        </button>`).join('') : '<div class="empty-state">No cases yet. Create one when you want to group searches.</div>';
      renderHistory();
    }
    function escapeHtml(value) {
      return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
    }
    function renderCases() {
      const list = document.getElementById('casesList');
      if (!list) return;
      const cases = getCases();
      list.innerHTML = cases.length ? cases.map(item => `
        <article class="case-card">
          <div class="case-card-top">
            <div><strong>${escapeHtml(item.name)}</strong><div class="case-meta">${item.items?.length || 0} saved searches · updated ${formatTime(item.updatedAt || item.createdAt)}</div></div>
            <div class="case-actions"><button class="small-btn" type="button" data-case-add="${item.id}">Add latest search</button><button class="small-btn" type="button" data-case-delete="${item.id}">Delete</button></div>
          </div>
        </article>`).join('') : '<div class="empty-state">No cases yet. Create your first case above.</div>';
    }
    function renderHistory() {
      const list = document.getElementById('historyList');
      if (!list) return;
      const history = getSearchHistory();
      list.innerHTML = history.length ? history.map(item => `
        <article class="history-item">
          <div><strong>${escapeHtml(item.query)}</strong><div class="history-meta">${escapeHtml(item.tool)} · ${formatTime(item.at)}</div></div>
          <div class="history-actions"><button class="small-btn" type="button" data-history-run="${item.id}">Run again</button></div>
        </article>`).join('') : '<div class="empty-state">No search history yet.</div>';
    }

    function switchTool(tool) {
      if (isSearching) return;
      activeTool = tool;
      const copy = toolCopy[tool] || ['This module is available in the workspace.', 'Enter a search value'];
      document.querySelectorAll('.tool-tab').forEach(item => item.classList.toggle('active', item.dataset.tool === tool));
      document.getElementById('toolTitle').textContent = tool;
      document.getElementById('toolDescription').textContent = copy[0];
      
      const isOverview = tool === 'Overview';
      const isThemes = tool === 'Themes';
      const isCases = tool === 'Cases';
      const isGraph = tool === 'Graph Case File';
      const isImageGeo = tool === 'Image GeoLocation';
      const isUniversal = tool === 'Universal Search';

      overviewPanel.hidden = !isOverview;
      casesPanel.hidden = !isCases;
      themesPanel.hidden = !isThemes;
      graphBuilderPanel.hidden = !isGraph;
      lookupPanel.hidden = isOverview || isCases || isThemes || isGraph;
      if (isOverview) renderOverviewHome();
      if (isCases) renderCases();

      if (isImageGeo) {
        toolSearchForm.hidden = true;
        imageDropzone.hidden = false;
      } else {
        toolSearchForm.hidden = false;
        imageDropzone.hidden = true;
      }
      
      if (isGraph) {
        initGraphCanvas();
      } else if (!lookupPanel.hidden) {
        toolInput.placeholder = copy[1];
        document.getElementById('lookupFormTitle').textContent = isUniversal ? 'Search every lookup' : 'Run a lookup';
        document.getElementById('lockedToolTitle').textContent = tool + ' requires access';
        refreshWorkspaceAccess();

        const currentTabState = tabSearchState[activeTool];
        if (currentTabState && hasSearchAccess()) {
          toolInput.value = currentTabState.query || '';
          renderResults(currentTabState.page || 1);
        } else {
          toolInput.value = '';
          resultsContainer.hidden = true;
          resultsGrid.innerHTML = '';
          discordDossierContainer.hidden = true;
          discordDossierContainer.innerHTML = '';
          machineViewContainer.hidden = true;
          machineViewContainer.innerHTML = '';
          resultsPagination.hidden = true;
        }
      }
      
      const workspace = document.querySelector('.tool-workspace');
      workspace.classList.remove('tool-refresh');
      requestAnimationFrame(() => workspace.classList.add('tool-refresh'));
    }

    let landingGraphNodes = [
      { id: 0, label: 'johndoe@gmail.com', type: 'IDENTITY', detail: 'DAISY1 / 12345', x: 230, y: 155, primary: true },
      { id: 1, label: 'MyHeritage (2017)', type: 'BREACH', detail: 'Pass: 12345', x: 85, y: 55 },
      { id: 2, label: 'Collection 1', type: 'LEAK', detail: 'Pass: 12345', x: 375, y: 55 },
      { id: 3, label: 'Dubsmash.com', type: 'ACCOUNT', detail: 'User: johndoee (NZ)', x: 95, y: 245 },
      { id: 4, label: '72.83.136.34', type: 'IP', detail: 'US / Atlanta Geo', x: 370, y: 245 },
      { id: 5, label: 'Stealer Logs', type: 'MALWARE', detail: 'Pass: 12345 (2024)', x: 230, y: 40 },
      { id: 6, label: 'Hautelook.com', type: 'EXPOSURE', detail: 'ZIP: 30096 (US)', x: 230, y: 265 }
    ];

    let landingGraphLinks = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 }
    ];

    let landingDraggedNode = null;

    function renderLandingGraph(svg) {
      svg.innerHTML = '';

      landingGraphLinks.forEach(l => {
        const source = landingGraphNodes.find(n => n.id === l.from);
        const target = landingGraphNodes.find(n => n.id === l.to);
        if (!source || !target) return;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-dasharray', '3 3');
        svg.appendChild(line);
      });

      landingGraphNodes.forEach(n => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.style.cursor = 'grab';

        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', n.x);
        c.setAttribute('cy', n.y);
        c.setAttribute('r', n.primary ? '18' : '12');
        c.setAttribute('fill', n.primary ? '#ffffff' : '#141815');
        c.setAttribute('stroke', '#ffffff');
        c.setAttribute('stroke-width', '1.5');

        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', n.x);
        t.setAttribute('y', n.y + (n.primary ? 28 : 22));
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('fill', '#e6ebe7');
        t.setAttribute('font-size', n.primary ? '11px' : '9.5px');
        t.setAttribute('font-family', 'ui-monospace, monospace');
        t.textContent = n.label;

        const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        sub.setAttribute('x', n.x);
        sub.setAttribute('y', n.y + (n.primary ? 40 : 33));
        sub.setAttribute('text-anchor', 'middle');
        sub.setAttribute('fill', '#7a847c');
        sub.setAttribute('font-size', '8px');
        sub.setAttribute('font-family', 'ui-monospace, monospace');
        sub.textContent = n.detail || n.type;

        g.appendChild(c);
        g.appendChild(t);
        g.appendChild(sub);

        g.onmousedown = (e) => {
          e.preventDefault();
          landingDraggedNode = n;
          g.style.cursor = 'grabbing';
        };

        svg.appendChild(g);
      });

      svg.onmousemove = (e) => {
        if (!landingDraggedNode) return;
        const rect = svg.getBoundingClientRect();
        landingDraggedNode.x = e.clientX - rect.left;
        landingDraggedNode.y = e.clientY - rect.top;
        renderLandingGraph(svg);
      };

      svg.onmouseup = () => { landingDraggedNode = null; };
      svg.onmouseleave = () => { landingDraggedNode = null; };
    }

    function initLandingGraph() {
      const svg = document.getElementById('landingGraphSvg');
      if (!svg) return;
      renderLandingGraph(svg);
    }

    let graphNodes = [
      { id: 1, label: 'johndoe@gmail.com', type: 'Email', x: 220, y: 180 },
      { id: 2, label: 'Dropbox (2012)', type: 'Breach', x: 80, y: 80 },
      { id: 3, label: '72.83.136.34', type: 'IP', x: 420, y: 100 },
      { id: 4, label: 'HackMaster973', type: 'Handle', x: 440, y: 280 },
      { id: 5, label: 'Stealer Log #4', type: 'Signal', x: 120, y: 300 }
    ];
    let graphLinks = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 3, to: 4 },
      { from: 1, to: 5 }
    ];
    let linkMode = false;
    let selectedNodeForLink = null;
    let draggedNode = null;

    function initGraphCanvas() {
      const svg = document.getElementById('graphSvg');
      renderGraphSvg(svg);

      document.getElementById('addNodeBtn').onclick = () => {
        const name = prompt('Enter Entity Label (e.g. username, email, IP):');
        if (!name) return;
        const type = prompt('Enter Type (e.g. Identity, IP, Breach, Signal):') || 'Entity';
        const id = Date.now();
        graphNodes.push({ id, label: name, type, x: 200 + Math.random() * 200, y: 150 + Math.random() * 100 });
        renderGraphSvg(svg);
      };

      document.getElementById('connectNodesBtn').onclick = () => {
        linkMode = !linkMode;
        selectedNodeForLink = null;
        const btn = document.getElementById('connectNodesBtn');
        const info = document.getElementById('graphStatusInfo');
        if (linkMode) {
          btn.style.background = '#ffffff';
          btn.style.color = '#000000';
          btn.style.fontWeight = '700';
          info.textContent = 'Link Mode active: Click first node, then click target node to create relationship.';
        } else {
          btn.style.background = '';
          btn.style.color = '';
          btn.style.fontWeight = '';
          info.textContent = "Click 'Add Node' to place entities, or drag nodes around.";
        }
      };

      document.getElementById('clearGraphBtn').onclick = () => {
        if (confirm('Clear all nodes in current graph?')) {
          graphNodes = [];
          graphLinks = [];
          renderGraphSvg(svg);
        }
      };
    }

    function renderGraphSvg(svg) {
      svg.innerHTML = '';

      graphLinks.forEach(link => {
        const source = graphNodes.find(n => n.id === link.from);
        const target = graphNodes.find(n => n.id === link.to);
        if (!source || !target) return;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.22)');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-dasharray', '4');
        svg.appendChild(line);
      });

      graphNodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.style.cursor = 'move';

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', node.type === 'Email' ? '#ffffff' : '#141815');
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '1.5');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 35);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#e6ebe7');
        text.setAttribute('font-size', '11px');
        text.setAttribute('font-family', 'ui-monospace, monospace');
        text.textContent = node.label;

        const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        sub.setAttribute('x', node.x);
        sub.setAttribute('y', node.y + 48);
        sub.setAttribute('text-anchor', 'middle');
        sub.setAttribute('fill', '#7a847c');
        sub.setAttribute('font-size', '9px');
        sub.setAttribute('font-family', 'ui-monospace, monospace');
        sub.textContent = node.type.toUpperCase();

        g.appendChild(circle);
        g.appendChild(text);
        g.appendChild(sub);

        g.onmousedown = (e) => {
          if (linkMode) {
            e.stopPropagation();
            if (!selectedNodeForLink) {
              selectedNodeForLink = node;
              circle.setAttribute('stroke', '#00ff66');
            } else if (selectedNodeForLink.id !== node.id) {
              graphLinks.push({ from: selectedNodeForLink.id, to: node.id });
              selectedNodeForLink = null;
              renderGraphSvg(svg);
            }
            return;
          }
          draggedNode = node;
        };

        svg.appendChild(g);
      });

      svg.onmousemove = (e) => {
        if (!draggedNode) return;
        const rect = svg.getBoundingClientRect();
        draggedNode.x = e.clientX - rect.left;
        draggedNode.y = e.clientY - rect.top;
        renderGraphSvg(svg);
      };

      svg.onmouseup = () => { draggedNode = null; };
      svg.onmouseleave = () => { draggedNode = null; };
    }

    function renderResults(page = 1) {
      const state = tabSearchState[activeTool];
      if (!state) return;
      state.page = page;
      const results = state.results || [];
      const query = (state.query || '').trim().toLowerCase();
      const resultTool = state.tool || activeTool;
      discordDossierContainer.hidden = true;
      discordDossierContainer.innerHTML = '';
      machineViewContainer.hidden = true;
      machineViewContainer.innerHTML = '';
      
      resultsGrid.innerHTML = '';
      if (results.length === 0) {
        resultsGrid.innerHTML = '<div class="result-empty">No public record results found for this query.</div>';
        resultsPagination.hidden = true;
        resultsContainer.hidden = false;
        return;
      }

      resultsContainer.hidden = false;
      const total = results.length;
      const totalPages = Math.ceil(total / PAGE_SIZE);
      const startIdx = (page - 1) * PAGE_SIZE;
      const pageItems = results.slice(startIdx, startIdx + PAGE_SIZE);

      pageItems.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'result-card';
        const absoluteIndex = startIdx + index + 1;
        const domain = escapeHtml(item.domain || 'record.source');
        
        let propsHtml = '';
        Object.entries(item).forEach(([key, val]) => {
          if (key === 'domain' || key === 'record_number') return;
          propsHtml += `
            <div class="result-prop">
              <span class="result-prop-key">${escapeHtml(key)}:</span>
              <span class="result-prop-val">${escapeHtml(String(val))}</span>
            </div>
          `;
        });

        card.innerHTML = `
          <div class="result-card-head">
            <span class="result-index">#${absoluteIndex}</span>
            <span class="result-domain">${domain}</span>
          </div>
          <div class="result-props">${propsHtml}</div>
        `;
        resultsGrid.appendChild(card);
      });

      renderPagination(totalPages, page);
    }

    function renderPagination(totalPages, activePage) {
      if (totalPages <= 1) {
        resultsPagination.hidden = true;
        return;
      }
      resultsPagination.hidden = false;
      resultsPagination.innerHTML = '';

      const prevBtn = document.createElement('button');
      prevBtn.className = 'page-btn';
      prevBtn.textContent = '‹ Prev';
      prevBtn.disabled = activePage === 1;
      prevBtn.addEventListener('click', () => renderResults(activePage - 1));
      resultsPagination.appendChild(prevBtn);

      const maxButtons = 7;
      let startPage = Math.max(1, activePage - 3);
      let endPage = Math.min(totalPages, startPage + maxButtons - 1);
      if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(1, endPage - maxButtons + 1);
      }

      for (let p = startPage; p <= endPage; p++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn' + (p === activePage ? ' active' : '');
        pageBtn.textContent = p;
        pageBtn.addEventListener('click', () => renderResults(p));
        resultsPagination.appendChild(pageBtn);
      }

      const nextBtn = document.createElement('button');
      nextBtn.className = 'page-btn';
      nextBtn.textContent = 'Next ›';
      nextBtn.disabled = activePage === totalPages;
      nextBtn.addEventListener('click', () => renderResults(activePage + 1));
      resultsPagination.appendChild(nextBtn);
    }

    function triggerDownload(url, filename) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function resultFileUrl(tool, query, preserveCase = false) {
      const folder = RESULT_FOLDERS[tool];
      if (!folder) throw new Error(`No assets/apis folder is configured for ${tool}.`);
      if (query === '.' || query === '..' || /[\\/\0]/.test(query)) {
        throw new Error('The query contains invalid filename characters.');
      }
      const filename = preserveCase ? query : query.toLowerCase();
      const relativePath = `assets/apis/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}.txt`;
      return new URL(relativePath, document.baseURI).href;
    }

    function parseResultText(text) {
      const metadata = {};
      const records = [];
      let current = null;

      const readField = line => {
        const match = /^([A-Za-z][A-Za-z0-9 _-]*):\s*(.*)$/.exec(line);
        if (!match) return null;
        return [match[1].trim().toLowerCase().replaceAll(' ', '_'), match[2].trim()];
      };

      text.replace(/^\uFEFF/, '').split(/\r?\n/).forEach(rawLine => {
        const line = rawLine.trim();
        const recordMatch = /^#(\d+)\s*$/.exec(line);

        if (recordMatch) {
          if (current) records.push(current);
          current = { record_number: recordMatch[1] };
          return;
        }

        if (current) {
          if (line.startsWith('┌─')) {
            current.domain = line.slice(2).trim() || 'record.source';
          } else if (line.startsWith('│')) {
            const field = readField(line.slice(1).trim());
            if (field) current[field[0]] = field[1];
          } else if (line.startsWith('└─')) {
            records.push(current);
            current = null;
          }
          return;
        }

        const field = readField(line);
        if (field) metadata[field[0]] = field[1];
      });

      if (current) records.push(current);
      return { metadata, records };
    }

    async function fetchResultFile(tool, query) {
      let response = await fetch(resultFileUrl(tool, query));
      if (!response.ok && query !== query.toLowerCase()) {
        response = await fetch(resultFileUrl(tool, query, true));
      }
      if (!response.ok) {
        if (response.status === 404) throw new Error('No saved results were found for this query.');
        throw new Error(`Could not load the result file (HTTP ${response.status}).`);
      }
      const parsed = parseResultText(await response.text());
      return {
        ...parsed,
        file: decodeURIComponent(new URL(response.url).pathname.split('/').pop() || '')
      };
    }

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function withMinimumDelay(promise, minimumMs) {
      const startedAt = Date.now();
      try {
        return await promise;
      } finally {
        await wait(Math.max(0, minimumMs - (Date.now() - startedAt)));
      }
    }

    async function executeLookup(query) {
      if (isSearching) return;
      const stateKey = activeTool;
      const targetTool = activeTool === 'Universal Search' ? detectSmartTool(query) : activeTool;
      const cleaned = (query || '').trim();
      if (!cleaned) return;
      addSearchHistory(targetTool, query);
      
      isSearching = true;
      toolInput.disabled = true;
      toolSubmitBtn.disabled = true;
      resultsContainer.hidden = true;
      previewLines.hidden = true;
      loadingState.hidden = false;

      const steps = [
        'Locating the matching file in assets/apis…',
        'Loading the saved result file…',
        'Parsing saved records…',
        'Formatting the results…'
      ];
      let stepIdx = 0;
      loadingStatus.textContent = steps[0];

      const interval = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
          loadingStatus.textContent = steps[stepIdx];
        }
      }, 700);

      try {
        const responseDelay = 3000 + Math.floor(Math.random() * 1001);
        const payload = await withMinimumDelay(fetchResultFile(targetTool, cleaned), responseDelay);
        const res = payload.records;

        tabSearchState[stateKey] = {
          query: query,
          results: res,
          page: 1,
          tool: targetTool,
          metadata: payload.metadata || {},
          sourceFile: payload.file || null
        };

        if (activeTool === stateKey) {
          resultsMetaQuery.textContent = 'Query: ' + (query || '—');
          resultsMetaCount.textContent = `${res.length} records found · ${targetTool}`;
          renderResults(1);
        }
      } catch (error) {
        tabSearchState[stateKey] = { query, results: [], page: 1, tool: targetTool };
        if (activeTool === stateKey) {
          discordDossierContainer.hidden = true;
          machineViewContainer.hidden = true;
          resultsMetaQuery.textContent = 'Query: ' + query;
          resultsMetaCount.textContent = `Query failed · ${targetTool}`;
          const hostingHint = window.location.protocol === 'file:'
            ? '<br><small>Publish the site or open it through a web server; browsers block local file requests.</small>'
            : '';
          resultsGrid.innerHTML = `<div class="result-empty">${escapeHtml(error.message)}${hostingHint}</div>`;
          resultsPagination.hidden = true;
          resultsContainer.hidden = false;
        }
      } finally {
        clearInterval(interval);
        isSearching = false;
        loadingState.hidden = true;
        toolInput.disabled = false;
        toolSubmitBtn.disabled = false;
      }
    }

    function processImageFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        alert('Please provide a valid image file.');
        return;
      }
      executeLookup(file.name);
    }

    imageDropzone.addEventListener('click', () => imageFileInput.click());
    imageFileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) {
        processImageFile(e.target.files[0]);
      }
    });

    imageDropzone.addEventListener('dragover', e => {
      e.preventDefault();
      imageDropzone.classList.add('dragover');
    });

    imageDropzone.addEventListener('dragleave', e => {
      e.preventDefault();
      imageDropzone.classList.remove('dragover');
    });

    imageDropzone.addEventListener('drop', e => {
      e.preventDefault();
      imageDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processImageFile(e.dataTransfer.files[0]);
      }
    });

    function handleLookupTrigger() {
      executeLookup(toolInput.value);
    }

    toolSearchForm.addEventListener('submit', e => {
      e.preventDefault();
      handleLookupTrigger();
    });

    toolSubmitBtn.addEventListener('click', () => {
      handleLookupTrigger();
    });

    accountButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navUserDropdown.classList.toggle('show');
    });

    window.addEventListener('click', () => {
      navUserDropdown.classList.remove('show');
    });

    window.UnmaskedBlockchain.init({ onGiftCardAction: showDiscordPrompt });
    document.querySelectorAll('.price-card [data-plan]').forEach(btn => btn.addEventListener('click', () => showCheckout(btn.dataset.plan)));
    document.querySelectorAll('[data-open-checkout]').forEach(btn => btn.addEventListener('click', () => showCheckout(btn.dataset.openCheckout)));
    document.querySelectorAll('[data-action="dashboard"]').forEach(btn => btn.addEventListener('click', requestDashboard));
    document.querySelectorAll('[data-auth]').forEach(btn => btn.addEventListener('click', () => { setAuthMode(btn.dataset.auth); openModal(signin); }));
    document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.authTab)));
    document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal-backdrop'))));
    document.querySelectorAll('.modal-backdrop').forEach(modal => modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); }));
    document.getElementById('dashboardClose').addEventListener('click', closeDashboard);
    
    document.getElementById('authForm').addEventListener('submit', async e => {
      e.preventDefault();
      clearAuthMessage();
      const mode = signin.dataset.mode || 'login';
      const username = authName.value.trim().toLowerCase();
      const password = authPassword.value;

      if (!/^[a-z0-9._-]{3,24}$/i.test(username)) {
        showAuthMessage('Username must be 3–24 characters and use letters, numbers, dots, dashes, or underscores.', 'error');
        return;
      }
      if (password.length < 6) {
        showAuthMessage('Password must contain at least 6 characters.', 'error');
        return;
      }

      authSubmit.disabled = true;
      authSubmit.textContent = mode === 'signup' ? 'Creating account…' : 'Signing in…';
      try {
        const accounts = getAccounts();
        const passwordHash = await hashPassword(password);
        if (mode === 'signup') {
          if (accounts.some(account => String(account.name || '').trim().toLowerCase() === username)) {
            showAuthMessage('This username is already taken.', 'error');
            return;
          }
          accounts.push({ name: authName.value.trim(), passwordHash });
          localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
          authPassword.value = '';
          setAuthMode('login');
          showAuthMessage('Account created. Log in to continue.', 'success');
          authPassword.focus();
        } else {
          const account = accounts.find(item => String(item.name || '').trim().toLowerCase() === username && item.passwordHash === passwordHash);
          if (!account) { showAuthMessage('Incorrect username or password.', 'error'); return; }
          const session = await window.UnmaskedAccess.createSession(account);
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          authPassword.value = '';
          updateAuthUI();
          closeModal(signin);
          toast.textContent = 'Logged in successfully.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2200);
        }
      } catch {
        showAuthMessage('Account storage is unavailable in this browser.', 'error');
      } finally {
        authSubmit.disabled = false;
        authSubmit.textContent = (signin.dataset.mode || 'login') === 'signup' ? 'Create account' : 'Log in';
      }
    });

    function logoutAccount() {
      localStorage.removeItem(SESSION_KEY);
      closeDashboard();
      updateAuthUI();
      toast.textContent = 'You have been logged out.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }

    async function hydrateSessionAccess() {
      const session = getSession();
      if (!session || typeof session.workspaceAccess === 'boolean') return;
      try {
        const hydratedSession = await window.UnmaskedAccess.createSession(session);
        localStorage.setItem(SESSION_KEY, JSON.stringify(hydratedSession));
        updateAuthUI();
      } catch {
        // Leave older sessions restricted if browser cryptography is unavailable.
      }
    }

    navDashboardAction.addEventListener('click', () => {
      navUserDropdown.classList.remove('show');
      requestDashboard();
    });
    navLogoutAction.addEventListener('click', logoutAccount);
    document.querySelectorAll('.tool-tab').forEach(tab => tab.addEventListener('click', () => switchTool(tab.dataset.tool)));
    document.querySelectorAll('[data-theme-option]').forEach(card => card.addEventListener('click', () => applyTheme(card.dataset.themeOption)));
    document.querySelectorAll('[data-font-option]').forEach(card => card.addEventListener('click', () => applyFont(card.dataset.fontOption)));

    document.getElementById('caseCreateForm').addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('caseNameInput');
      const name = input.value.trim();
      if (!name) return;
      const cases = getCases();
      cases.unshift({ id: Date.now(), name, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), items: [] });
      setCases(cases);
      input.value = '';
      renderCases();
      renderOverviewHome();
    });
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
      renderOverviewHome();
    });
    document.addEventListener('click', e => {
      const openTool = e.target.closest('[data-open-tool]');
      if (openTool) switchTool(openTool.dataset.openTool);
      const historyTarget = e.target.closest('[data-history-id], [data-history-run]');
      if (historyTarget) {
        const id = Number(historyTarget.dataset.historyId || historyTarget.dataset.historyRun);
        const item = getSearchHistory().find(entry => entry.id === id);
        if (item) { switchTool(item.tool); toolInput.value = item.query; if (hasSearchAccess()) executeLookup(item.query); }
      }
      const caseOpen = e.target.closest('[data-case-id]');
      if (caseOpen) switchTool('Cases');
      const addBtn = e.target.closest('[data-case-add]');
      if (addBtn) {
        const cases = getCases();
        const target = cases.find(item => item.id === Number(addBtn.dataset.caseAdd));
        const latest = getSearchHistory()[0];
        if (target && latest) {
          target.items = target.items || [];
          if (!target.items.some(item => item.id === latest.id)) target.items.unshift(latest);
          target.updatedAt = new Date().toISOString();
          setCases(cases);
          renderCases();
          renderOverviewHome();
        }
      }
      const deleteBtn = e.target.closest('[data-case-delete]');
      if (deleteBtn) {
        setCases(getCases().filter(item => item.id !== Number(deleteBtn.dataset.caseDelete)));
        renderCases();
        renderOverviewHome();
      }
    });
    
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const openModalEl = document.querySelector('.modal-backdrop.open');
      if (openModalEl) closeModal(openModalEl); else if (testDashboard.classList.contains('open')) closeDashboard();
    });

    applyTheme(localStorage.getItem(THEME_KEY) || 'obsidian');
    applyFont(localStorage.getItem(FONT_KEY) || 'system');
    initLandingGraph();
    initScrollReveals();
    switchTool('Universal Search');
    updateAuthUI();
    hydrateSessionAccess();
    renderOverviewHome();
