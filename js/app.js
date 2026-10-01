/* Negotiation Xpert — application shell, views and interaction. */
(function () {
  'use strict';
  const NX = window.NX;
  const { i18n, engine, glossary, store, speech } = NX;
  const icon = NX.icon;
  const t = (k, p) => i18n.t(k, p);
  const S = store.settings;

  const CAT_ICON = { everyday: 'bag', home: 'home', work: 'briefcase', business: 'layers', crisis: 'shield', expert: 'target' };
  const MISTAKE_TERM = { why: 'whyQuestions', split: 'splitDifference', aggressive: 'aggressiveTone', raiseFast: 'raisingTooQuickly', yesFast: 'yesTooFast', caved: 'deadlinePressure', pay: 'proofOfLife', overpay: 'concession' };
  const TECH_TERM = { mirroring: 'mirroring', labeling: 'labeling', calibrated: 'calibrated', noOriented: 'noOriented', accusationAudit: 'accusationAudit', empathy: 'tacticalEmpathy', summary: 'summary', ackerman: 'ackerman' };

  const state = {
    filters: { level: 'all', cat: 'all' },
    pending: null, game: null, report: null, newAch: [],
    latest: null, hint: null, tab: 'chat', badge: false,
    gloss: { q: '', cat: 'all', open: new Set() },
    busy: false, playToken: 0, micMode: null, micDownAt: 0, notice: null
  };

  // ---------- helpers ----------
  const $ = (sel, el) => (el || document).querySelector(sel);
  const lang = () => i18n.lang;
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = o => (o ? (o[lang()] !== undefined ? o[lang()] : o.en) : '');
  const fmtV = (v, sc) => engine.fmt(v, sc.unit, lang(), sc.unitLabel);
  const scText = (sc, key) => engine.fill(L(sc[key]), sc.type === 'deal' ? { start: fmtV(sc.start, sc), target: fmtV(sc.target, sc), price: fmtV(sc.start, sc) } : {});
  const initials = name => name.replace(/["“”]/g, '').replace(/^(Mrs?\.|Ms\.|Mr\.|Captain|Minister)\s+/i, '').split(/[\s-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const lvVar = lv => `--lvc: var(--lv-${lv})`;
  const money = v => '$' + new Intl.NumberFormat(lang() === 'es' ? 'es-MX' : 'en-US', { maximumFractionDigits: 0 }).format(v || 0);
  const fold = s => NX.detector.fold(s);

  function termName(id, inline) {
    const g = glossary.get(id);
    if (!g) return id;
    return L(inline ? g.inline : g.name);
  }
  function termToggle(id) {
    return `<button class="term-btn" type="button" data-term="${id}" aria-expanded="false" aria-label="${esc(t('glos.explain'))}: ${esc(termName(id))}">${icon('chevronDown')}</button>`;
  }
  function rich(str) {
    const src = esc(str);
    const html = src.replace(/\[\[(\w+)\]\]/g, (m, id, off) => {
      let name = termName(id, true);
      const before = src.slice(0, off);
      if (!before.trim() || /[.!?:]\s*$/.test(before)) name = name.replace(/^([«“"]?)(\p{L})/u, (mm, q, c) => q + c.toUpperCase());
      return `<span class="term">${esc(name)}</span>${termToggle(id)}`;
    });
    return `<div class="rich-block"><div class="rich">${html}</div><div class="term-panels"></div></div>`;
  }
  function termPanel(id) {
    const g = glossary.get(id);
    if (!g) return '';
    return `<div class="term-panel" data-term="${id}"><h4>${esc(L(g.name))}${g.against ? ` <span class="against">${icon('alert')}${esc(t('glos.against'))}</span>` : ''}</h4>${defGrid(g)}</div>`;
  }
  function defGrid(g) {
    return `<dl class="def-grid">
      <div><dt>${t('glos.what')}</dt><dd>${esc(L(g.what))}</dd></div>
      <div><dt>${t('glos.when')}</dt><dd>${esc(L(g.when))}</dd></div>
      <div><dt>${t('glos.mistake')}</dt><dd>${esc(L(g.mistake))}</dd></div>
      <div><dt>${t('glos.example')}</dt><dd class="ex">${esc(L(g.example))}</dd></div></dl>`;
  }
  function techChip(id, bad) {
    const term = bad ? MISTAKE_TERM[id] : (TECH_TERM[id] || id);
    return `<span class="tech-chip${bad ? ' bad' : ''}">${esc(termName(term))}${termToggle(term)}</span>`;
  }

  // ---------- theme & language ----------
  const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function effectiveTheme() { return S.theme || (mq && mq.matches ? 'dark' : 'light'); }
  function applyTheme() {
    if (S.theme) document.documentElement.dataset.theme = S.theme; else delete document.documentElement.dataset.theme;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', effectiveTheme() === 'dark' ? '#0A1120' : '#F4F5F7');
  }
  function setLang(l) {
    if (l === lang()) return;
    if (speech.listening) speech.abort();
    speech.stopSpeaking();
    i18n.lang = l; S.lang = l; store.saveSettings();
    document.documentElement.lang = l;
    renderShell();
    route();
  }

  // ---------- shell ----------
  const NAV = [
    { href: '#/', key: 'nav.scenarios', icon: 'grid', match: r => r === '' || r === 'brief' || r === 'play' || r === 'report' },
    { href: '#/glossary', key: 'nav.glossary', icon: 'book', match: r => r === 'glossary' },
    { href: '#/stats', key: 'nav.stats', icon: 'chart', match: r => r === 'stats' },
    { href: '#/credentials', key: 'nav.achievements', icon: 'award', match: r => r === 'credentials' }
  ];
  function renderShell() {
    document.title = t('app.name') + ' · ' + t('app.tagline');
    const navLinks = NAV.map(n => `<a href="${n.href}" data-nav="${n.key}">${icon(n.icon)}<span>${t(n.key)}</span></a>`).join('');
    $('#app').innerHTML = `
      <header class="topbar"><div class="topbar-inner">
        <a class="brand" href="#/" aria-label="${t('app.name')}">
          <span class="brand-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18V6l8 12V6"/><path d="M14 6l6 12M20 6l-6 12"/></svg></span>
          <span class="brand-text"><span class="brand-name">${t('app.name')}</span><span class="brand-tag">${t('app.tagline')}</span></span>
        </a>
        <nav class="nav" aria-label="Main">${navLinks}</nav>
        <div class="top-actions">
          <div class="lang-switch" data-lang="${lang()}" role="group" aria-label="${t('lang.toggle')}">
            <span class="thumb"></span>
            <button type="button" data-lang-set="en" aria-pressed="${lang() === 'en'}" lang="en">EN</button>
            <button type="button" data-lang-set="es" aria-pressed="${lang() === 'es'}" lang="es">ES</button>
          </div>
          <button class="icon-btn" type="button" id="themeBtn" aria-label="${t('theme.toggle')}" title="${t('theme.toggle')}">${icon(effectiveTheme() === 'dark' ? 'sun' : 'moon')}</button>
        </div>
      </div></header>
      <main class="main" id="main" tabindex="-1"></main>
      <nav class="tabbar" aria-label="Main">${navLinks}</nav>
      <div class="toasts" id="toasts" aria-live="polite"></div>`;
  }
  function markNav(r) {
    document.querySelectorAll('[data-nav]').forEach(a => {
      const n = NAV.find(x => x.key === a.dataset.nav);
      a.classList.toggle('active', n.match(r));
      if (n.match(r)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  // ---------- router ----------
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, query] = h.split('?');
    const parts = path.split('/');
    return { name: parts[0] || '', arg: parts[1], query: new URLSearchParams(query || '') };
  }
  function route() {
    const r = parseHash();
    if (r.name !== 'play' && speech.listening) speech.abort();
    if (r.name !== 'play') { state.playToken++; }
    document.body.classList.toggle('in-play', r.name === 'play');
    markNav(r.name);
    const main = $('#main');
    switch (r.name) {
      case 'brief': renderBrief(main, r.arg, r.query.get('r') === '1'); break;
      case 'play': if (state.game) renderPlay(main); else location.hash = '#/'; break;
      case 'report': if (state.report) renderReport(main); else location.hash = '#/'; break;
      case 'glossary': renderGlossary(main); break;
      case 'stats': renderStats(main); break;
      case 'credentials': renderCredentials(main); break;
      default: renderHome(main);
    }
  }
  function go(h) { if (location.hash === h) route(); else location.hash = h; window.scrollTo(0, 0); }

  // ---------- home ----------
  function filtered() {
    return NX.scenarios.filter(s => (state.filters.level === 'all' || s.level === state.filters.level) && (state.filters.cat === 'all' || s.category === state.filters.cat));
  }
  function renderHome(main) {
    const levels = engine.LEVEL_ORDER, cats = engine.CATEGORIES;
    const levelChips = [`<button class="chip" data-f-level="all" aria-pressed="${state.filters.level === 'all'}">${t('filter.all')}</button>`]
      .concat(levels.map(l => `<button class="chip" data-f-level="${l}" aria-pressed="${state.filters.level === l}" title="${esc(t('level.' + l + '.d'))}"><span class="dot ${l}"></span>${t('level.' + l)}</button>`)).join('');
    const catChips = [`<button class="chip" data-f-cat="all" aria-pressed="${state.filters.cat === 'all'}">${t('filter.all')}</button>`]
      .concat(cats.map(c => `<button class="chip" data-f-cat="${c}" aria-pressed="${state.filters.cat === c}">${icon(CAT_ICON[c])}${t('cat.' + c)}</button>`)).join('');
    main.innerHTML = `<div class="view">
      <section class="hero">
        <div class="hero-copy">
          <div class="eyebrow">${t('home.eyebrow')}</div>
          <h1>${t('home.title')}</h1>
          <p>${t('home.sub')}</p>
        </div>
        <aside class="card coach-card">
          <div class="coach-head"><div class="monogram">IC</div><div><div class="coach-name">${t('coach.name')}</div><div class="coach-role">${t('coach.title')}</div></div></div>
          <blockquote>${t('coach.welcome')}</blockquote>
          <p class="coach-bio">${t('coach.bio')}</p>
        </aside>
      </section>
      <section class="card toolbar" aria-label="Filters">
        <div class="toolbar-row">
          <span class="toolbar-label">${t('filter.mode')}</span>
          <div class="segmented" role="group">
            <button type="button" data-mode="coach" aria-pressed="${S.mode === 'coach'}">${icon('message')}${t('mode.coach')}</button>
            <button type="button" data-mode="challenge" aria-pressed="${S.mode === 'challenge'}">${icon('target')}${t('mode.challenge')}</button>
          </div>
          <span class="mode-desc">${t(S.mode === 'coach' ? 'mode.coach.desc' : 'mode.challenge.desc')}</span>
          <span class="spacer"></span>
          <button class="btn" type="button" id="randomBtn" title="${esc(t('btn.randomTitle'))}">${icon('shuffle')}${t('btn.random')}</button>
        </div>
        <div class="toolbar-row"><span class="toolbar-label">${t('filter.level')}</span><div class="chips">${levelChips}</div></div>
        <div class="toolbar-row"><span class="toolbar-label">${t('filter.category')}</span><div class="chips">${catChips}</div></div>
      </section>
      <div id="scGrid"></div>
    </div>`;
    renderGrid();
  }
  function renderGrid() {
    const list = filtered();
    const el = $('#scGrid');
    if (!el) return;
    if (!list.length) { el.innerHTML = `<div class="card empty">${t('home.empty')}</div>`; return; }
    el.innerHTML = `<div class="result-count">${t('home.count', { n: list.length })}</div><div class="grid">${list.map(card).join('')}</div>`;
  }
  function card(sc) {
    const best = store.bestScore(sc.id);
    const figs = sc.type === 'deal'
      ? `<div class="sc-figs"><div><div class="fig-label">${t('card.opening')}</div><div class="fig-val">${esc(fmtV(sc.start, sc))}</div></div><div><div class="fig-label">${t('card.target')}</div><div class="fig-val" style="color:var(--accent)">${esc(fmtV(sc.target, sc))}</div></div></div>`
      : `<div class="sc-figs"><div><div class="fig-label">${t('card.goal')}</div><div class="fig-val">${icon('shield')}</div></div></div>`;
    return `<article class="card sc-card" style="${lvVar(sc.level)}" data-open="${sc.id}" tabindex="0" role="button" aria-label="${esc(L(sc.title))}">
      <div class="sc-meta"><span class="sc-level"><span class="dot ${sc.level}"></span>${t('level.' + sc.level)}</span><span class="sc-cat">${icon(CAT_ICON[sc.category])}${t('cat.' + sc.category)}</span></div>
      <h3>${esc(L(sc.title))}</h3>
      <p>${esc(L(sc.brief))}</p>
      <div class="sc-foot">
        <div>${figs}<div class="sc-best" style="margin-top:10px">${best === null ? esc(t('card.new')) : `${esc(t('card.best'))}: <b>${best}</b>`}</div></div>
        <span class="sc-go" aria-hidden="true">${icon('arrowRight')}</span>
      </div>
    </article>`;
  }
  function randomPick() {
    const pool = NX.scenarios.filter(s => state.filters.level === 'all' || s.level === state.filters.level);
    const sc = pool[Math.floor(Math.random() * pool.length)];
    go('#/brief/' + sc.id + '?r=1');
  }

  // ---------- briefing ----------
  function renderBrief(main, id, random) {
    const base = NX.scenarios.find(s => s.id === id);
    if (!base) { location.hash = '#/'; return; }
    if (!state.pending || state.pending.scenario.id !== id || state.pending.random !== random) {
      state.pending = engine.create(base, { mode: S.mode, lang: lang(), random });
      state.pending.random = random;
    }
    const sc = state.pending.scenario;
    const figures = sc.type === 'deal'
      ? `<div><div class="fig-label">${t('brief.opening')}</div><div class="figure-big num">${esc(fmtV(sc.start, sc))}</div></div>
         <div><div class="fig-label">${t('brief.target')}</div><div class="figure-big accent num">${esc(fmtV(sc.target, sc))}</div></div>`
      : '';
    main.innerHTML = `<div class="view">
      <a class="back-link" href="#/">${icon('arrowLeft')}${t('brief.back')}</a>
      <div class="brief">
        <section class="card brief-main" style="${lvVar(sc.level)}">
          <div class="tags"><span class="tag"><span class="dot ${sc.level}"></span>${t('level.' + sc.level)}</span><span class="tag">${icon(CAT_ICON[sc.category])}${t('cat.' + sc.category)}</span></div>
          <h1>${esc(L(sc.title))}</h1>
          <div class="brief-block"><div class="section-title">${t('brief.situation')}</div><p>${esc(L(sc.brief))}</p></div>
          <div class="brief-block"><div class="section-title">${t('brief.counterpart')}</div>
            <div class="counterpart"><div class="avatar" style="${lvVar(sc.level)}">${esc(initials(sc.who.name))}</div><div><div class="cp-name">${esc(sc.who.name)}</div><div class="cp-role">${esc(L(sc.who.role))}</div></div></div>
          </div>
          ${random ? `<div class="brief-block note">${icon('shuffle')}<span>${t('brief.randomized')}</span></div>` : ''}
        </section>
        <aside class="brief-side">
          <div class="card figures">${figures}<div class="objective"><div class="fig-label" style="margin-bottom:4px">${t('brief.goal')}</div>${esc(scText(sc, 'goal'))}</div></div>
          <div class="card tip-card"><div class="coach-head"><div class="monogram sm">IC</div><div><div class="fig-label">${t('brief.coachTip')}</div><div style="font-weight:600">${t('coach.name')}</div></div></div><p>${esc(L(sc.tip))}</p></div>
          <div class="card start-card">
            <div class="fig-label">${t('brief.mode')}</div>
            <div class="segmented" role="group" style="align-self:flex-start">
              <button type="button" data-mode="coach" aria-pressed="${S.mode === 'coach'}">${icon('message')}${t('mode.coach')}</button>
              <button type="button" data-mode="challenge" aria-pressed="${S.mode === 'challenge'}">${icon('target')}${t('mode.challenge')}</button>
            </div>
            <span class="mode-desc">${t(S.mode === 'coach' ? 'mode.coach.desc' : 'mode.challenge.desc')}</span>
            <button class="btn btn-primary btn-lg" type="button" id="beginBtn">${icon('play')}${t('brief.begin')}</button>
            <div class="note">${icon('mic')}<span>${t(speech.supported() ? 'brief.voiceNote' : 'play.micUnsupported')}</span></div>
          </div>
        </aside>
      </div>
    </div>`;
  }
  function begin() {
    const g = state.pending;
    if (!g) return;
    g.setMode(S.mode);
    state.game = g; state.pending = null;
    state.report = null; state.latest = null; state.hint = null; state.tab = 'chat'; state.badge = false; state.notice = null; state.busy = false;
    g.start();
    state.spokenUpTo = 0;
    go('#/play');
  }

  // ---------- play ----------
  function renderPlay(main) {
    const g = state.game, sc = g.scenario;
    const coach = g.mode === 'coach';
    main.innerHTML = `<div class="view">
      <div class="mobile-tabs"><div class="segmented" role="tablist">
        <button type="button" data-tab="chat" aria-pressed="${state.tab === 'chat'}">${icon('message')}${t('play.conversation')}</button>
        <button type="button" data-tab="coach" aria-pressed="${state.tab === 'coach'}">${icon('user')}${t('play.coach')}${state.badge ? '<span class="badge"></span>' : ''}</button>
        <button type="button" data-tab="status" aria-pressed="${state.tab === 'status'}">${icon('chart')}${t('play.status')}</button>
      </div></div>
      <div class="play" id="play" data-tab="${state.tab}" style="${lvVar(sc.level)}">
        <section class="card chat" aria-label="${t('play.conversation')}">
          <div class="chat-head">
            <div class="avatar sm" style="${lvVar(sc.level)}">${esc(initials(sc.who.name))}</div>
            <div class="grow"><div class="chat-title">${esc(sc.who.name)}<span class="chat-role"> · ${esc(L(sc.who.role))}</span></div><div class="chat-sub">${esc(L(sc.title))}</div></div>
            <span class="turns" id="turns"></span>
            <button class="icon-btn" type="button" id="voiceBtn" aria-pressed="${S.voice}" title="${t(S.voice ? 'play.voiceOn' : 'play.voiceOff')}" aria-label="${t(S.voice ? 'play.voiceOn' : 'play.voiceOff')}">${icon(S.voice ? 'volume' : 'volumeOff')}</button>
            <button class="btn btn-sm" type="button" id="endBtn">${icon('flag')}<span>${t('play.end')}</span></button>
          </div>
          <div class="messages" id="messages" aria-live="polite"></div>
          <div class="composer" id="composer"></div>
        </section>
        <aside class="side" id="side"></aside>
      </div>
    </div>`;
    renderMessages();
    renderComposer();
    renderSide();
    updateTurns();
    // speak lines that have not been spoken yet (e.g. the opening line)
    speakNew();
  }
  function updateTurns() {
    const el = $('#turns'); if (!el || !state.game) return;
    const s = state.game.snapshot();
    el.textContent = t('play.turn', { n: Math.min(s.turn + 1, s.maxTurns), max: s.maxTurns });
  }
  function msgHTML(e, idx) {
    const g = state.game, sc = g.scenario;
    if (e.who === 'me') {
      return `<div class="msg me" data-i="${idx}"><div><div class="msg-who">${t('play.you')}</div><div class="bubble">${esc(e.text)}</div></div></div>`;
    }
    const text = g.render(e, lang());
    if (isNarrative(e)) return `<div class="outcome-msg" data-i="${idx}">${esc(text)}</div>`;
    const flags = [];
    if (e.reveal) flags.push(`<span class="msg-flag flag-reveal">${icon('key')}${t('play.reveal')}</span>`);
    if (e.thatsRight) flags.push(`<span class="msg-flag flag-tr">${icon('check')}${t('play.thatsRight')}</span>`);
    if (e.milestone) flags.push(`<span class="msg-flag flag-mile">${icon('flag')}${t('play.milestone')} ${e.milestone}/3</span>`);
    let tacticRow = '';
    if (e.tactic) {
      const term = { deadline: 'deadlinePressure', fakeDeadline: 'deadlinePressure', mirrorBack: 'mirroring', labelBack: 'labeling', calibratedBack: 'calibrated', auditBack: 'accusationAudit' }[e.tactic] || e.tactic;
      const reveal = !(e.quiz && !e.quiz.answered);
      tacticRow = `<div class="rich-block"><div class="msg-tags"><span class="msg-flag flag-tactic">${icon('alert')}${t('play.tacticUsed')}${reveal ? ': ' + esc(termName(term)) : ''}</span>${reveal ? termToggle(term) : ''}</div><div class="term-panels"></div></div>`;
    }
    let html = `<div class="msg" data-i="${idx}"><div class="avatar sm" style="${lvVar(sc.level)}">${esc(initials(sc.who.name))}</div><div><div class="msg-who">${esc(sc.who.name)}</div><div class="bubble">${esc(text)}</div>${flags.length ? `<div class="msg-tags">${flags.join('')}</div>` : ''}${tacticRow}</div></div>`;
    if (e.quiz) html += quizHTML(e.quiz, idx);
    return html;
  }
  function isNarrative(e) {
    const sc = state.game.scenario;
    return e.t === sc.fail || e.t === sc.timeout || (sc.type === 'resolve' && e.outcome) || (sc.register === 'crisis' && e.t === sc.nodeal);
  }
  function quizHTML(q, idx) {
    const name = id => termName(id);
    const opts = q.options.map(o => {
      let cls = '';
      if (q.answered) cls = o === q.correct ? 'right' : (o === q.guess ? 'wrong' : '');
      return `<button type="button" data-quiz="${idx}" data-guess="${o}" class="${cls}" ${q.answered ? 'disabled' : ''}>${esc(name(o))}</button>`;
    }).join('');
    const res = q.answered ? `<div class="quiz-res ${q.guess === q.correct ? 'r-strong' : 'r-mistake'}">${esc(t(q.guess === q.correct ? 'play.spotRight' : 'play.spotWrong', { name: name(q.correct) }))}</div>` : '';
    return `<div class="quiz" data-q="${idx}"><div class="quiz-q">${icon('eye')}${t('play.spotTitle')}</div><div class="quiz-opts">${opts}</div>${res}</div>`;
  }
  function renderMessages() {
    const el = $('#messages'); if (!el) return;
    const tr = state.game.transcript || state.game.state.transcript;
    el.innerHTML = tr.map((e, i) => msgHTML(e, i)).join('');
    el.scrollTop = el.scrollHeight;
  }
  function appendMsg(e, idx) {
    const el = $('#messages'); if (!el) return;
    el.insertAdjacentHTML('beforeend', msgHTML(e, idx));
    el.scrollTop = el.scrollHeight;
  }
  function showTyping(on) {
    const el = $('#messages'); if (!el) return;
    const ex = $('#typing');
    if (on && !ex) { el.insertAdjacentHTML('beforeend', `<div class="msg" id="typing"><div class="avatar sm" style="${lvVar(state.game.scenario.level)}">${esc(initials(state.game.scenario.who.name))}</div><div class="bubble typing"><span></span><span></span><span></span></div></div>`); el.scrollTop = el.scrollHeight; }
    if (!on && ex) ex.remove();
  }
  function speakEntry(e) {
    if (!S.voice || !speech.canSpeak) return;
    const sc = state.game.scenario;
    if (isNarrative(e)) return;
    speech.speak(state.game.render(e, lang()), { lang: lang(), gender: sc.who.gender, seed: sc.id, rate: sc.register === 'crisis' ? 0.95 : undefined });
  }
  function speakNew() {
    const tr = state.game.state.transcript;
    for (let i = state.spokenUpTo || 0; i < tr.length; i++) if (tr[i].who === 'them') speakEntry(tr[i]);
    state.spokenUpTo = tr.length;
  }

  function renderComposer() {
    const el = $('#composer'); if (!el) return;
    const g = state.game;
    if (g.state.ended) {
      el.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><span style="font-weight:600">${t('play.complete')}</span><button class="btn btn-primary" type="button" id="toReport">${icon('chart')}${t('play.viewReview')}</button></div>`;
      return;
    }
    const sup = speech.supported();
    const notice = state.notice ? `<div class="notice">${esc(t(state.notice))}</div>` : (!sup ? `<div class="notice">${esc(t('play.micUnsupported'))}</div>` : '');
    el.innerHTML = `${notice}
      <div class="interim" id="interim">${sup ? esc(t('play.spaceHint')) : ''}</div>
      <div class="composer-row">
        <button class="mic${sup ? '' : ' disabled'}" type="button" id="micBtn" aria-label="${t('play.hold')}" title="${t('play.hold')}" ${sup ? '' : 'disabled'}>${icon('mic')}</button>
        <form class="text-row" id="textForm" autocomplete="off">
          <input class="input" id="textInput" type="text" placeholder="${esc(t('play.typePlaceholder'))}" aria-label="${esc(t('play.typePlaceholder'))}" lang="${lang()}">
          <button class="btn btn-primary send" type="submit" aria-label="${t('play.send')}" title="${t('play.send')}">${icon('send')}</button>
        </form>
      </div>
      <div class="composer-foot">
        <span class="mic-hint">${icon('globe')}${lang() === 'es' ? 'Español (es-ES)' : 'English (en-US)'}</span>
        ${g.mode === 'coach' ? `<button class="btn btn-ghost btn-sm" type="button" id="hintBtn">${icon('bulb')}${t('play.hint')}</button>` : ''}
      </div>`;
  }

  function renderSide() {
    const el = $('#side'); if (!el) return;
    const g = state.game, sc = g.scenario, s = g.snapshot();
    const coach = g.mode === 'coach';
    let status = '';
    if (sc.type === 'deal') {
      const f = v => (v - sc.start) / (sc.target - sc.start);
      const span = Math.max(1.25, ...(s.lastOffer !== null ? [f(s.lastOffer)] : [1]));
      const pct = v => Math.max(0, Math.min(100, f(v) / span * 100));
      status = `<div class="card panel">
        <div class="section-title">${t('play.position')}</div>
        <div class="position-row"><div class="pos-val">${esc(fmtV(s.position, sc))}</div>
          <div class="pos-target"><div class="fig-label">${t('play.yourTarget')}</div><div class="fig-val">${esc(fmtV(sc.target, sc))}</div></div></div>
        <div class="track" role="img" aria-label="${esc(t('play.position'))}">
          <div class="track-fill" style="width:${pct(s.position)}%"></div>
          <div style="position:absolute;top:-4px;bottom:-4px;width:1px;background:var(--accent);left:${100 / span}%"></div>
          ${s.lastOffer !== null ? `<div class="track-mark me" style="left:${pct(s.lastOffer)}%" title="${esc(t('play.lastOffer'))}"></div>` : ''}
          <div class="track-mark" style="left:${pct(s.position)}%"></div>
        </div>
        <div class="track-ends"><span>${esc(fmtV(sc.start, sc))}</span><span>${s.lastOffer !== null ? esc(t('play.lastOffer')) + ': ' + esc(fmtV(s.lastOffer, sc)) : ''}</span></div>
        ${coach ? meters(s, false) : ''}
      </div>`;
    } else {
      status = `<div class="card panel">
        <div class="section-title">${t('play.progress')}</div>
        <div class="pos-val num">${s.progress}%</div>
        <div class="meter"><div class="bar progress"><i style="width:${s.progress}%"></i></div></div>
        ${coach ? meters(s, true) : ''}
      </div>`;
    }
    const revealed = g.state.transcript.filter(e => e.reveal);
    const slots = Array.from({ length: s.reveals }, (_, i) => `<i class="${i < s.revealed ? 'on' : ''}"></i>`).join('');
    const hidden = `<div class="card panel">
      <div class="section-title">${icon('key')}${t('play.revealed')}</div>
      <div class="reveal-slots" aria-hidden="true">${slots}</div>
      <div class="meter-top" style="margin-top:8px"><span>${t('play.revealedCount', { n: s.revealed, total: s.reveals })}</span></div>
      ${revealed.length ? `<div class="reveals">${revealed.map(e => `<div class="reveal-item">${icon('check')}<span>${esc(g.render(e, lang()))}</span></div>`).join('')}</div>` : ''}
    </div>`;
    el.innerHTML = `<div class="status-panels">${status}${hidden}</div>${coachPanel()}`;
  }
  function meters(s) {
    return `<div class="meter"><div class="meter-top"><span>${t('play.trust')}</span><b>${s.trust}</b></div><div class="bar"><i style="width:${s.trust}%"></i></div></div>
      <div class="meter"><div class="meter-top"><span>${t('play.tension')}</span><b>${s.tension}</b></div><div class="bar tension"><i style="width:${s.tension}%"></i></div></div>`;
  }
  function suggestBox(label, sug) {
    if (!sug) return '';
    const phrase = L(sug.phrase);
    const usable = !/\[/.test(phrase);
    const term = TECH_TERM[sug.tech] || sug.tech;
    return `<div class="suggest rich-block"><div class="suggest-label">${esc(label)} · <span class="term" style="text-transform:none;letter-spacing:0">${esc(termName(term))}</span>${termToggle(term)}</div>
      <div class="term-panels"></div>
      <div class="suggest-phrase">“${esc(phrase)}”</div>
      ${usable && !state.game.state.ended ? `<button class="btn btn-sm" type="button" data-use="${esc(phrase)}">${icon('quote')}${t('play.useHint')}</button>` : ''}</div>`;
  }
  function coachPanel() {
    const g = state.game;
    if (g.mode !== 'coach') {
      return `<div class="card coach-panel"><div class="challenge-note">${icon('target')}<span>${t('play.challengeNote')}</span></div></div>`;
    }
    const head = `<div class="coach-panel-head"><div class="monogram sm">IC</div><div class="grow"><div style="font-weight:600">${t('coach.name')}</div><div class="coach-role">${t('coach.title')}</div></div></div>`;
    let body = '';
    const fb = state.latest && state.latest.coach;
    if (fb) body += feedbackHTML(state.latest, true);
    if (state.hint) body += `<div class="hint-pop">${suggestBox(t('play.hintTitle'), state.hint)}</div>`;
    if (!fb && !state.hint) body = `<p class="coach-empty">${t('play.coachEmpty')}</p>`;
    return `<div class="card coach-panel" aria-live="polite">${head}${body}</div>`;
  }
  function feedbackHTML(me, withSuggest) {
    const fb = me.coach;
    const chips = fb.tech.map(x => techChip(x)).concat(fb.mistakes.map(m => techChip(m, true))).join('');
    const notes = fb.notes.map(k => rich(t(k, fb.params))).join('');
    const good = fb.rating === 'excellent' || fb.rating === 'strong';
    return `<div class="fb">
      ${withSuggest ? `<div class="fb-line">“${esc(me.text)}”</div>` : ''}
      <div class="rich-block"><div class="fb-tech"><span class="pill r-${fb.rating}">${t('rating.' + fb.rating)}</span>${chips}</div><div class="term-panels"></div></div>
      <div class="fb-notes">${notes}</div>
      ${withSuggest ? suggestBox(t(good ? 'play.next' : 'play.better'), fb.suggest) : ''}
    </div>`;
  }

  async function submit(text) {
    const g = state.game;
    text = (text || '').trim();
    if (!g || g.state.ended || !text || state.busy) return;
    state.busy = true;
    state.hint = null;
    speech.stopSpeaking();
    const before = g.state.transcript.length;
    const res = g.say(text, lang());
    if (!res) { state.busy = false; return; }
    const token = ++state.playToken;
    const tr = g.state.transcript;
    // my line first
    appendMsg(tr[before], before);
    const input = $('#textInput'); if (input) input.value = '';
    state.latest = res.me;
    if (state.tab !== 'coach' && g.mode === 'coach') state.badge = true;
    renderSide();
    updateBadge();
    for (let i = before + 1; i < tr.length; i++) {
      showTyping(true);
      await wait(Math.min(1100, 380 + g.render(tr[i], lang()).length * 6));
      if (token !== state.playToken) return;
      showTyping(false);
      appendMsg(tr[i], i);
      if (tr[i].who === 'them') speakEntry(tr[i]);
    }
    state.spokenUpTo = tr.length;
    updateTurns();
    renderSide();
    state.busy = false;
    if (res.ended) finishGame();
    else { const inp = $('#textInput'); if (inp && !isTouch()) inp.focus(); }
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const isTouch = () => window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  function updateBadge() {
    const b = document.querySelector('[data-tab="coach"]');
    if (!b) return;
    const has = b.querySelector('.badge');
    if (state.badge && !has) b.insertAdjacentHTML('beforeend', '<span class="badge"></span>');
    if (!state.badge && has) has.remove();
  }
  function finishGame() {
    const g = state.game;
    if (!g.state.result || g.recorded) { renderComposer(); return; }
    g.recorded = true;
    state.report = g.state.result;
    state.newAch = store.record(Object.assign({}, state.report));
    renderComposer();
    renderSide();
    if (state.newAch.length > 3) setTimeout(() => toast('award', t('toast.ach'), t('toast.many', { n: state.newAch.length })), 600);
    else state.newAch.forEach((id, i) => setTimeout(() => toastAch(id), 600 + i * 500));
  }

  // ---------- microphone ----------
  function micStart() {
    if (!state.game || state.game.state.ended || state.busy) return;
    const btn = $('#micBtn'), interim = $('#interim');
    const ok = speech.start(lang(), {
      onStart: () => { btn && btn.classList.add('listening'); if (interim) { interim.classList.add('live'); interim.textContent = t(state.micMode === 'toggle' ? 'play.tapStop' : 'play.listening'); } },
      onInterim: txt => { const it = $('#interim'); if (it) { it.classList.add('live'); it.textContent = txt; } },
      onError: code => {
        const it = $('#interim');
        if (code === 'denied') { state.notice = 'play.micDenied'; renderComposer(); }
        else if (code === 'nothing' && it) { it.classList.remove('live'); it.textContent = t('play.micNothing'); }
      },
      onEnd: txt => {
        const b = $('#micBtn'); b && b.classList.remove('listening');
        state.micMode = null;
        const it = $('#interim');
        if (txt) { if (it) { it.classList.remove('live'); it.textContent = ''; } submit(txt); }
        else if (it && it.textContent === t('play.listening')) { it.classList.remove('live'); it.textContent = t('play.micNothing'); }
      }
    });
    if (!ok && !speech.supported()) { state.notice = 'play.micUnsupported'; renderComposer(); }
  }
  function micStop() { speech.stop(); }

  // ---------- report ----------
  function renderReport(main) {
    const r = state.report, g = state.game, sc = g.scenario;
    const circ = 2 * Math.PI * 64;
    const off = circ * (1 - r.score / 100);
    const outcomeKey = 'outcome.' + r.outcome;
    const kpis = [];
    if (sc.type === 'deal') {
      kpis.push(kpi(t('report.final'), r.finalValue !== null ? fmtV(r.finalValue, sc) : '—', `${t('report.target')}: ${fmtV(sc.target, sc)}`));
      kpis.push(kpi(t('report.opening'), fmtV(sc.start, sc), ''));
      if (r.money && r.outcome === 'deal') kpis.push(kpi(t(sc.dir < 0 ? 'report.saved' : 'report.gained'), money(r.saved), sc.unit === 'usdmo' ? (lang() === 'es' ? '12 meses' : '12 months') : ''));
    } else {
      kpis.push(kpi(t('play.progress'), r.progress + '%', ''));
    }
    kpis.push(kpi(t('report.revealed'), `${r.revealed}/${r.reveals}`, ''));
    kpis.push(kpi(t('report.thatsRight'), t(r.thatsRight ? 'yes' : 'no'), ''));
    if (r.spot.total) kpis.push(kpi(t('report.spot'), `${r.spot.right}/${r.spot.total}`, ''));

    const techs = Object.keys(r.techCounts).filter(k => !k.startsWith('x_'));
    const mist = Object.keys(r.techCounts).filter(k => k.startsWith('x_'));
    const techHTML = techs.length || mist.length
      ? `<div class="rich-block"><div class="tech-list">${techs.map(k => `<span class="tech-chip">${esc(termName(TECH_TERM[k] || k))}<span class="tech-count">×${r.techCounts[k].n}</span>${termToggle(TECH_TERM[k] || k)}</span>`).join('')}${mist.map(k => `<span class="tech-chip bad">${esc(termName(MISTAKE_TERM[k.slice(2)]))}<span class="tech-count">×${r.techCounts[k].n}</span>${termToggle(MISTAKE_TERM[k.slice(2)])}</span>`).join('')}</div><div class="term-panels"></div></div>`
      : `<p style="color:var(--muted)">${t('report.noTech')}</p>`;
    const missed = r.missed.length ? `<ul class="list">${r.missed.map(m => `<li>${icon('chevronRight')}<div>${rich(t(m.key, m.p))}</div></li>`).join('')}</ul>` : `<p style="color:var(--muted)">${t('report.noneMissed')}</p>`;
    const bd = ['outcome', 'technique', 'variety', 'relationship'].map(k => {
      const max = { outcome: 50, technique: 30, variety: 10, relationship: 10 }[k];
      return `<div class="bd-row"><span>${t('b.' + k)}</span><div class="bar"><i style="width:${r.breakdown[k] / max * 100}%"></i></div><b>${r.breakdown[k]}/${max}</b></div>`;
    }).join('');
    const lesson = sc.category === 'crisis' ? `<section class="card lesson"><div class="section-title">${icon('shield')}${t('report.lesson')}</div><p>${esc(L(NX.crisisLesson))}</p></section>` : '';
    const safety = sc.endNotes ? `<section class="card lesson" style="border-left-color:var(--good)"><div class="section-title">${icon('info')}${t('report.safety')}</div><ul class="list">${sc.endNotes.map(n => `<li>${icon('check')}<div>${esc(L(n))}</div></li>`).join('')}</ul></section>` : '';
    const ach = state.newAch.length ? `<section class="card" style="padding:22px;margin-bottom:18px"><div class="section-title">${icon('award')}${t('report.newAch')}</div><div class="ach-earned">${state.newAch.map(id => { const a = store.ACH.find(x => x.id === id); return `<span class="ach-mini">${icon(a.icon)}${esc(L(a.name))}</span>`; }).join('')}</div></section>` : '';
    const transcript = g.state.transcript.map(e => {
      if (e.who === 'me') {
        return `<div class="tr-row me"><div class="tr-who">${t('play.you')}</div><div><div class="tr-text">${esc(e.text)}</div>${e.coach ? `<div class="tr-coach">${feedbackHTML(e, false)}${suggestBox(t(e.coach.rating === 'excellent' || e.coach.rating === 'strong' ? 'play.next' : 'play.better'), e.coach.suggest)}</div>` : ''}</div></div>`;
      }
      const flag = e.tactic ? ` <span class="msg-flag flag-tactic">${icon('alert')}${esc(termName({ deadline: 'deadlinePressure', fakeDeadline: 'deadlinePressure', mirrorBack: 'mirroring', labelBack: 'labeling', calibratedBack: 'calibrated', auditBack: 'accusationAudit' }[e.tactic] || e.tactic))}</span>` : (e.reveal ? ` <span class="msg-flag flag-reveal">${icon('key')}${t('play.reveal')}</span>` : (e.thatsRight ? ` <span class="msg-flag flag-tr">${icon('check')}${t('play.thatsRight')}</span>` : ''));
      return `<div class="tr-row"><div class="tr-who">${esc(sc.who.name)}</div><div><div class="tr-text">${esc(g.render(e, lang()))}${flag}</div></div></div>`;
    }).join('');

    main.innerHTML = `<div class="view">
      <a class="back-link" href="#/">${icon('arrowLeft')}${t('report.back')}</a>
      <section class="card report-head" style="${lvVar(sc.level)}">
        <div class="ring" role="img" aria-label="${t('report.score')} ${r.score}/100">
          <svg viewBox="0 0 148 148"><circle class="ring-bg" cx="74" cy="74" r="64" fill="none" stroke-width="8"/><circle class="ring-fg" cx="74" cy="74" r="64" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-off="${off}"/></svg>
          <div class="ring-val"><div><b>${r.score}</b><span>${t('report.score')}</span></div></div>
        </div>
        <div class="report-title">
          <div class="eyebrow">${t('report.title')}</div>
          <h1>${esc(L(sc.title))}</h1>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
            <span class="status ${r.won ? 'ok' : 'no'}">${icon(r.won ? 'check' : 'x')}${t(r.won ? 'report.won' : 'report.lost')}</span>
            <span class="tag"><span class="dot ${sc.level}"></span>${t('level.' + sc.level)}</span>
            <span class="tag">${icon('flag')}${t(outcomeKey)}</span>
            <span class="tag">${icon(r.mode === 'coach' ? 'message' : 'target')}${t('mode.' + r.mode)}</span>
          </div>
        </div>
      </section>
      <div class="kpis">${kpis.join('')}</div>
      ${ach}
      <div class="report-grid">
        <section class="card"><div class="section-title">${t('report.breakdown')}</div><div class="breakdown">${bd}</div></section>
        <section class="card"><div class="section-title">${t('report.techniques')}</div>${techHTML}</section>
      </div>
      <section class="card" style="padding:22px;margin-bottom:18px"><div class="section-title">${t('report.missed')}</div>${missed}</section>
      ${lesson}${safety}
      <section class="card transcript"><div class="section-title">${t('report.transcript')}</div>${transcript}</section>
      <div class="report-actions">
        <button class="btn btn-primary" type="button" id="replayBtn">${icon('refresh')}${t('report.replay')}</button>
        <a class="btn" href="#/">${icon('grid')}${t('report.back')}</a>
        <a class="btn btn-ghost" href="#/stats">${icon('chart')}${t('nav.stats')}</a>
      </div>
    </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { const fg = $('.ring-fg'); if (fg) fg.style.strokeDashoffset = fg.dataset.off; }));
  }
  function kpi(label, val, sub) {
    return `<div class="card kpi"><div class="fig-label">${esc(label)}</div><div class="fig-val num">${esc(val)}</div>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}</div>`;
  }

  // ---------- glossary ----------
  function sortName(g) { return fold(L(g.name)).replace(/[^a-z0-9ñ ]/g, '').trim(); }
  function renderGlossary(main) {
    const cats = ['all'].concat(glossary.categories);
    main.innerHTML = `<div class="view">
      <div class="page-head"><div><div class="eyebrow">${t('nav.glossary')}</div><h1>${t('glos.title')}</h1><p>${t('glos.sub')}</p></div></div>
      <div class="glossary-tools">
        <div class="search-wrap">${icon('search')}<input class="input" id="glosSearch" type="search" placeholder="${esc(t('glos.search'))}" aria-label="${esc(t('glos.search'))}" value="${esc(state.gloss.q)}"></div>
        <div class="chips">${cats.map(c => `<button class="chip" data-gcat="${c}" aria-pressed="${state.gloss.cat === c}">${t('glos.cat.' + c)}</button>`).join('')}</div>
      </div>
      <p class="note" style="margin-bottom:8px"><span class="against">${icon('alert')}${t('glos.against')}</span><span>${t('glos.againstHint')}</span></p>
      <div id="glosList"></div>
    </div>`;
    renderGlossList();
  }
  function renderGlossList() {
    const el = $('#glosList'); if (!el) return;
    const q = fold(state.gloss.q.trim());
    const items = glossary.terms
      .filter(g => state.gloss.cat === 'all' || g.cat === state.gloss.cat)
      .filter(g => !q || [g.name, g.what, g.example].some(o => fold(L(o)).includes(q) || fold(o.en).includes(q)))
      .sort((a, b) => sortName(a).localeCompare(sortName(b), lang()));
    if (!items.length) { el.innerHTML = `<div class="card empty">${t('glos.none')}</div>`; return; }
    let html = '', letter = '';
    items.forEach(g => {
      const l = sortName(g)[0].toUpperCase();
      if (l !== letter) { letter = l; html += `<div class="letter">${letter}</div>`; }
      const open = state.gloss.open.has(g.id);
      html += `<div class="term-item${open ? ' open' : ''}" id="term-${g.id}">
        <button class="term-row" type="button" data-gterm="${g.id}" aria-expanded="${open}">
          <div class="grow"><div class="t-name">${esc(L(g.name))}</div><div class="t-cat">${t('glos.cat.' + g.cat)}</div></div>
          ${g.against ? `<span class="against">${icon('alert')}${t('glos.against')}</span>` : ''}
          <span class="chev">${icon('chevronDown')}</span>
        </button>
        ${open ? `<div class="term-body">${defGrid(g)}</div>` : ''}
      </div>`;
    });
    el.innerHTML = html;
  }

  // ---------- statistics ----------
  function renderStats(main) {
    const a = store.aggregate();
    const tiles = [
      [t('stats.played'), a.played], [t('stats.won'), a.won], [t('stats.lost'), a.lost],
      [t('stats.rate'), a.played ? a.rate + '%' : '—'], [t('stats.avg'), a.played ? a.avg : '—'], [t('stats.saved'), money(a.saved)]
    ].map(([l, v]) => `<div class="card kpi"><div class="fig-label">${esc(l)}</div><div class="fig-val num">${esc(v)}</div></div>`).join('');
    const empty = !a.played;
    const lvRows = engine.LEVEL_ORDER.map(l => hbar(`<span class="dot ${l}"></span>${t('level.' + l)}`, a.byLevel[l])).join('');
    const catRows = engine.CATEGORIES.map(c => hbar(`${icon(CAT_ICON[c])}${t('cat.' + c)}`, a.byCat[c])).join('');
    const techKeys = Object.keys(a.tech).sort((x, y) => a.tech[y].n - a.tech[x].n);
    const maxT = Math.max(1, ...techKeys.map(k => a.tech[k].n));
    const techRows = techKeys.length ? techKeys.map(k => {
      const v = a.tech[k], eff = Math.round(v.q / v.n * 100);
      return `<div class="hbar" title="${esc(termName(TECH_TERM[k] || k))}: ${v.n} ${t('stats.uses')}, ${eff}% ${t('stats.effect')}"><span class="hbar-label">${esc(termName(TECH_TERM[k] || k))}</span><div class="hbar-track"><div class="hbar-fill" style="width:${v.n / maxT * 100}%"></div></div><span class="hbar-val">${v.n}<small>${eff}% ${t('stats.effect')}</small></span></div>`;
    }).join('') : `<p style="color:var(--muted)">${t('stats.noData')}</p>`;
    const mKeys = Object.keys(a.mistakes).sort((x, y) => a.mistakes[y] - a.mistakes[x]);
    const maxM = Math.max(1, ...mKeys.map(k => a.mistakes[k]));
    const mRows = mKeys.length ? mKeys.map(k => `<div class="hbar"><span class="hbar-label">${esc(termName(MISTAKE_TERM[k]))}</span><div class="hbar-track"><div class="hbar-fill" style="width:${a.mistakes[k] / maxM * 100}%;background:var(--bad)"></div></div><span class="hbar-val">${a.mistakes[k]}</span></div>`).join('') : `<p style="color:var(--muted)">${t(a.played ? 'stats.noMistakes' : 'stats.noData')}</p>`;
    const scIds = Object.keys(a.byScenario).sort((x, y) => a.byScenario[y].n - a.byScenario[x].n);
    const table = scIds.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>${t('stats.scenario')}</th><th class="n">${t('stats.plays')}</th><th class="n">${t('stats.won')}</th><th class="n">${t('stats.best')}</th><th class="n">${t('stats.avgScore')}</th></tr></thead><tbody>${scIds.map(id => {
      const sc = NX.scenarios.find(s => s.id === id); const v = a.byScenario[id];
      return `<tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span class="dot ${sc ? sc.level : ''}"></span>${esc(sc ? L(sc.title) : id)}</span></td><td class="n">${v.n}</td><td class="n">${v.w}</td><td class="n">${v.best}</td><td class="n">${Math.round(v.sum / v.n)}</td></tr>`;
    }).join('')}</tbody></table></div>` : `<p style="color:var(--muted)">${t('stats.noData')}</p>`;
    main.innerHTML = `<div class="view">
      <div class="page-head"><div><div class="eyebrow">${t('nav.stats')}</div><h1>${t('stats.title')}</h1><p>${t('stats.sub')}</p></div></div>
      ${empty ? `<div class="card empty" style="margin-bottom:18px">${t('stats.empty')}</div>` : ''}
      <div class="stats-kpis">${tiles}</div>
      <div class="stats-grid">
        <section class="card wide"><div class="section-title">${t('stats.progress')}</div>${lineChart(a.timeline)}</section>
        <section class="card"><div class="section-title">${t('stats.byLevel')}</div>${lvRows}</section>
        <section class="card"><div class="section-title">${t('stats.byCat')}</div>${catRows}</section>
        <section class="card"><div class="section-title">${t('stats.techUsage')}</div>${techRows}</section>
        <section class="card"><div class="section-title">${t('stats.mistakes')}</div>${mRows}</section>
        <section class="card wide"><div class="section-title">${t('stats.byScenario')}</div>${table}</section>
      </div>
      <div class="stats-foot"><button class="btn btn-danger" type="button" id="resetBtn">${icon('trash')}${t('stats.reset')}</button></div>
    </div>`;
    bindChart();
  }
  function hbar(label, v) {
    const n = v ? v.n : 0, w = v ? v.w : 0, rate = n ? Math.round(w / n * 100) : 0;
    return `<div class="hbar" title="${n ? t('stats.wonOf', { w, n }) : t('stats.noData')}"><span class="hbar-label">${label}</span><div class="hbar-track"><div class="hbar-fill" style="width:${rate}%"></div></div><span class="hbar-val">${n ? rate + '%' : '—'}<small>${n ? t('stats.wonOf', { w, n }) : t('stats.noData')}</small></span></div>`;
  }
  function lineChart(tl) {
    if (!tl.length) return `<p style="color:var(--muted)">${t('stats.noData')}</p>`;
    const pts = tl.slice(-40);
    const mainW = ($('#main') && $('#main').clientWidth) || 800;
    const W = Math.max(300, Math.min(1180, mainW - (window.innerWidth <= 600 ? 76 : 92))), H = 220, pl = 34, pr = 12, pt = 12, pb = 26;
    const x = i => pl + (pts.length === 1 ? (W - pl - pr) / 2 : i * (W - pl - pr) / (pts.length - 1));
    const y = v => pt + (1 - v / 100) * (H - pt - pb);
    const grid = [0, 25, 50, 75, 100].map(v => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/>`).join('');
    const axis = [0, 50, 100].map(v => `<text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join('');
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.score).toFixed(1)}`).join(' ');
    const avg = pts.map((p, i) => { const s = pts.slice(Math.max(0, i - 4), i + 1); return s.reduce((a, b) => a + b.score, 0) / s.length; });
    const avgLine = avg.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const dots = pts.map((p, i) => `<circle class="chart-dot${p.won ? ' won' : ''}" cx="${x(i)}" cy="${y(p.score)}" r="4"/>`).join('');
    state.chart = { pts, x, y, W, H, pl, pr };
    return `<div class="legend"><span><i></i>${t('stats.score')}</span><span><i class="avg"></i>${t('stats.moving')}</span></div>
      <div class="chart-wrap" id="chartWrap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t('stats.progress'))}">
        <g class="chart-grid">${grid}</g><g class="chart-axis">${axis}</g>
        <line class="chart-cross" id="cross" y1="${pt}" y2="${H - pb}" x1="-10" x2="-10"/>
        <path class="chart-line avg" d="${avgLine}"/><path class="chart-line" d="${line}"/>${dots}
        <rect x="${pl}" y="0" width="${W - pl - pr}" height="${H}" fill="transparent" id="chartHit"/>
      </svg><div class="tooltip" id="tip"></div></div>`;
  }
  function bindChart() {
    const hit = $('#chartHit'), wrap = $('#chartWrap'), tip = $('#tip'), cross = $('#cross');
    if (!hit || !state.chart) return;
    const c = state.chart;
    const move = ev => {
      const svg = hit.ownerSVGElement, r = svg.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width * c.W;
      let best = 0, bd = Infinity;
      c.pts.forEach((p, i) => { const d = Math.abs(c.x(i) - px); if (d < bd) { bd = d; best = i; } });
      const p = c.pts[best], sc = NX.scenarios.find(s => s.id === p.id);
      cross.setAttribute('x1', c.x(best)); cross.setAttribute('x2', c.x(best));
      tip.innerHTML = `<div>${t('stats.session')} ${best + 1} · ${esc(sc ? L(sc.title) : '')}</div><div>${t('stats.score')}: <b>${p.score}</b> · ${esc(new Date(p.date).toLocaleDateString(lang() === 'es' ? 'es-ES' : 'en-US'))}</div>`;
      tip.style.left = (c.x(best) / c.W * r.width) + 'px';
      tip.style.top = (c.y(p.score) / c.H * r.height) + 'px';
      tip.classList.add('show');
    };
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerdown', move);
    hit.addEventListener('pointerleave', () => { tip.classList.remove('show'); cross.setAttribute('x1', -10); cross.setAttribute('x2', -10); });
  }

  // ---------- credentials ----------
  function renderCredentials(main) {
    const earned = store.earned, total = store.ACH.length, n = Object.keys(earned).length;
    const dfmt = ts => new Date(ts).toLocaleDateString(lang() === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    main.innerHTML = `<div class="view">
      <div class="page-head"><div><div class="eyebrow">${t('nav.achievements')}</div><h1>${t('ach.title')}</h1><p>${t('ach.sub')}</p></div>
        <div class="ach-progress"><span class="num" style="font-size:13px;color:var(--text-2)">${t('ach.progress', { n, total })}</span><div class="bar"><i style="width:${n / total * 100}%"></i></div></div></div>
      <div class="ach-grid">${store.ACH.map((a, i) => {
        const on = !!earned[a.id];
        return `<article class="cert${on ? '' : ' locked'}"><div class="cert-seal">${icon(on ? a.icon : 'lock')}</div><h3>${esc(L(a.name))}</h3><p>${esc(L(a.desc))}</p>
          <div class="cert-foot"><span>${t('ach.id')} NX-${String(i + 1).padStart(3, '0')}</span><span>${on ? esc(t('ach.earned', { date: dfmt(earned[a.id]) })) : t('ach.locked')}</span></div></article>`;
      }).join('')}</div>
    </div>`;
  }

  // ---------- modal & toast ----------
  function confirmModal(title, body, okLabel, danger) {
    return new Promise(resolve => {
      const back = document.createElement('div');
      back.className = 'modal-back';
      back.innerHTML = `<div class="card modal" role="dialog" aria-modal="true" aria-labelledby="mTitle"><h3 id="mTitle">${esc(title)}</h3><p>${esc(body)}</p>
        <div class="modal-actions"><button class="btn" type="button" data-m="0">${t('stats.cancel')}</button><button class="btn ${danger ? 'btn-solid-danger' : 'btn-primary'}" type="button" data-m="1">${esc(okLabel)}</button></div></div>`;
      const close = v => { back.remove(); document.removeEventListener('keydown', onKey); resolve(v); };
      const onKey = e => { if (e.key === 'Escape') close(false); };
      back.addEventListener('click', e => { if (e.target === back) close(false); const b = e.target.closest('[data-m]'); if (b) close(b.dataset.m === '1'); });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(back);
      back.querySelector('[data-m="1"]').focus();
    });
  }
  function toastAch(id) {
    const a = store.ACH.find(x => x.id === id); if (a) toast(a.icon, t('toast.ach'), L(a.name));
  }
  function toast(ic, small, text) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${icon(ic)}<div><small>${esc(small)}</small>${esc(text)}</div>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .4s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 450); }, 4200);
  }

  // ---------- events ----------
  document.addEventListener('click', async e => {
    const tgt = e.target;
    const langBtn = tgt.closest('[data-lang-set]');
    if (langBtn) return setLang(langBtn.dataset.langSet);
    if (tgt.closest('#themeBtn')) {
      S.theme = effectiveTheme() === 'dark' ? 'light' : 'dark'; store.saveSettings(); applyTheme();
      $('#themeBtn').innerHTML = icon(effectiveTheme() === 'dark' ? 'sun' : 'moon');
      return;
    }
    const termBtn = tgt.closest('.term-btn');
    if (termBtn) {
      const block = termBtn.closest('.rich-block');
      const panels = block && block.querySelector(':scope > .term-panels');
      if (!panels) return;
      const id = termBtn.dataset.term;
      const ex = panels.querySelector(`.term-panel[data-term="${id}"]`);
      block.querySelectorAll(`.term-btn[data-term="${id}"]`).forEach(b => b.setAttribute('aria-expanded', ex ? 'false' : 'true'));
      if (ex) ex.remove(); else panels.insertAdjacentHTML('beforeend', termPanel(id));
      return;
    }
    const fl = tgt.closest('[data-f-level]');
    if (fl) { state.filters.level = fl.dataset.fLevel; document.querySelectorAll('[data-f-level]').forEach(b => b.setAttribute('aria-pressed', b === fl)); renderGrid(); return; }
    const fc = tgt.closest('[data-f-cat]');
    if (fc) { state.filters.cat = fc.dataset.fCat; document.querySelectorAll('[data-f-cat]').forEach(b => b.setAttribute('aria-pressed', b === fc)); renderGrid(); return; }
    const md = tgt.closest('[data-mode]');
    if (md) {
      S.mode = md.dataset.mode; store.saveSettings();
      document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === S.mode));
      document.querySelectorAll('.mode-desc').forEach(d => { d.textContent = t(S.mode === 'coach' ? 'mode.coach.desc' : 'mode.challenge.desc'); });
      return;
    }
    if (tgt.closest('#randomBtn')) return randomPick();
    const open = tgt.closest('[data-open]');
    if (open) return go('#/brief/' + open.dataset.open);
    if (tgt.closest('#beginBtn')) return begin();
    const tab = tgt.closest('[data-tab]');
    if (tab && tab.closest('.mobile-tabs')) {
      state.tab = tab.dataset.tab;
      if (state.tab === 'coach') state.badge = false;
      document.querySelectorAll('.mobile-tabs [data-tab]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === state.tab));
      $('#play').dataset.tab = state.tab;
      updateBadge();
      if (state.tab === 'chat') { const m = $('#messages'); if (m) m.scrollTop = m.scrollHeight; }
      return;
    }
    if (tgt.closest('#voiceBtn')) {
      S.voice = !S.voice; store.saveSettings(); if (!S.voice) speech.stopSpeaking();
      const b = $('#voiceBtn'); b.innerHTML = icon(S.voice ? 'volume' : 'volumeOff'); b.setAttribute('aria-pressed', S.voice);
      b.title = t(S.voice ? 'play.voiceOn' : 'play.voiceOff'); b.setAttribute('aria-label', b.title);
      return;
    }
    if (tgt.closest('#hintBtn')) {
      state.hint = state.game.hint(); renderSide();
      if (window.innerWidth <= 900) { state.tab = 'coach'; $('#play').dataset.tab = 'coach'; document.querySelectorAll('.mobile-tabs [data-tab]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === 'coach')); }
      return;
    }
    const use = tgt.closest('[data-use]');
    if (use) {
      const inp = $('#textInput'); if (inp) { inp.value = use.dataset.use; if (window.innerWidth <= 900) { state.tab = 'chat'; $('#play').dataset.tab = 'chat'; document.querySelectorAll('.mobile-tabs [data-tab]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === 'chat')); } inp.focus(); }
      return;
    }
    if (tgt.closest('#endBtn')) {
      const ok = await confirmModal(t('play.end'), t('play.endConfirm'), t('play.end'), false);
      if (ok && state.game && !state.game.state.ended) {
        state.playToken++; state.busy = false;
        speech.abort(); speech.stopSpeaking();
        state.game.finish();
        finishGame();
        go('#/report');
      }
      return;
    }
    if (tgt.closest('#toReport')) { speech.stopSpeaking(); return go('#/report'); }
    const qb = tgt.closest('[data-quiz]');
    if (qb) {
      const idx = +qb.dataset.quiz, e2 = state.game.state.transcript[idx];
      if (e2 && e2.quiz && !e2.quiz.answered) {
        state.game.spot(qb.dataset.guess, e2.quiz);
        const old = document.querySelector(`.msg[data-i="${idx}"]`), oldQ = document.querySelector(`.quiz[data-q="${idx}"]`);
        if (old && oldQ) { oldQ.remove(); old.outerHTML = msgHTML(e2, idx); }
        renderSide();
      }
      return;
    }
    if (tgt.closest('#replayBtn')) {
      const sc = state.game.scenario;
      state.pending = null;
      return go('#/brief/' + sc.id + (state.game.random ? '?r=1' : ''));
    }
    const gt = tgt.closest('[data-gterm]');
    if (gt) {
      const id = gt.dataset.gterm;
      if (state.gloss.open.has(id)) state.gloss.open.delete(id); else state.gloss.open.add(id);
      renderGlossList();
      return;
    }
    const gc = tgt.closest('[data-gcat]');
    if (gc) { state.gloss.cat = gc.dataset.gcat; document.querySelectorAll('[data-gcat]').forEach(b => b.setAttribute('aria-pressed', b === gc)); renderGlossList(); return; }
    if (tgt.closest('#resetBtn')) {
      const ok = await confirmModal(t('stats.resetTitle'), t('stats.resetBody'), t('stats.confirm'), true);
      if (ok) { store.reset(); route(); }
    }
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.sc-card')) { e.preventDefault(); go('#/brief/' + e.target.dataset.open); return; }
    if (e.code === 'Space' && !e.repeat && document.body.classList.contains('in-play') && !e.target.closest('input, textarea, button, [contenteditable]') && speech.supported()) {
      e.preventDefault(); state.micMode = 'hold'; micStart();
    }
  });
  document.addEventListener('keyup', e => {
    if (e.code === 'Space' && state.micMode === 'hold' && speech.listening) { e.preventDefault(); micStop(); }
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'textForm') { e.preventDefault(); const inp = $('#textInput'); submit(inp ? inp.value : ''); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'glosSearch') { state.gloss.q = e.target.value; renderGlossList(); }
  });
  // push-to-talk: hold to speak, or tap once to start and tap again to stop
  document.addEventListener('pointerdown', e => {
    const mic = e.target.closest('#micBtn');
    if (!mic || mic.disabled) return;
    e.preventDefault();
    if (speech.listening) { micStop(); return; }
    state.micDownAt = Date.now();
    state.micMode = 'hold';
    try { mic.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    micStart();
  });
  const micRelease = e => {
    if (!e.target.closest || !e.target.closest('#micBtn') || state.micMode !== 'hold') return;
    if (Date.now() - state.micDownAt < 350) {
      state.micMode = 'toggle';
      const it = $('#interim'); if (it && speech.listening) it.textContent = t('play.tapStop');
    } else micStop();
  };
  document.addEventListener('pointerup', micRelease);
  document.addEventListener('pointercancel', micRelease);
  document.addEventListener('contextmenu', e => { if (e.target.closest && e.target.closest('#micBtn')) e.preventDefault(); });
  if (mq && mq.addEventListener) mq.addEventListener('change', () => { if (!S.theme) { applyTheme(); const b = $('#themeBtn'); if (b) b.innerHTML = icon(effectiveTheme() === 'dark' ? 'sun' : 'moon'); } });
  window.addEventListener('hashchange', route);

  // ---------- boot ----------
  i18n.lang = S.lang || ((navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en');
  document.documentElement.lang = i18n.lang;
  applyTheme();
  renderShell();
  route();
})();
