/* Negotiation Xpert — the reusable negotiation engine.
   Every scenario is plain data; this file turns that data into a living counterpart.
   No DOM access: the UI calls create(), start(), say(), hint(), spot(), finish(). */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};

  // ---------- difficulty tuning ----------
  const LEVELS = {
    beginner:   { trust0: 40, tension0: 10, base: 0.50, limitF: 1.25, varReq: 1, gain: 1.4, pain: 0.6, reveal: [45, 54, 63], thatsRight: 52, maxTurns: 14, tacticEvery: 0 },
    easy:       { trust0: 35, tension0: 15, base: 0.42, limitF: 1.15, varReq: 2, gain: 1.2, pain: 0.8, reveal: [47, 57, 67], thatsRight: 56, maxTurns: 14, tacticEvery: 0 },
    medium:     { trust0: 30, tension0: 20, base: 0.33, limitF: 1.10, varReq: 3, gain: 1.05, pain: 1.0, reveal: [50, 61, 71], thatsRight: 60, maxTurns: 16, tacticEvery: 0 },
    hard:       { trust0: 25, tension0: 30, base: 0.25, limitF: 1.06, varReq: 3, gain: 0.95, pain: 1.3, reveal: [52, 63, 74], thatsRight: 63, maxTurns: 16, tacticEvery: 3 },
    impossible: { trust0: 20, tension0: 40, base: 0.15, limitF: 1.02, varReq: 4, gain: 0.85, pain: 1.7, reveal: [54, 65, 76], thatsRight: 66, maxTurns: 18, tacticEvery: 2 }
  };
  const LEVEL_ORDER = ['beginner', 'easy', 'medium', 'hard', 'impossible'];
  const CATEGORIES = ['everyday', 'home', 'work', 'business', 'crisis', 'expert'];

  // trust / tension / progress effect of each technique (before difficulty scaling)
  const TECH = {
    mirroring:       { trust: 7, tension: -3, prog: 8 },
    labeling:        { trust: 9, tension: -8, prog: 10 },
    calibrated:      { trust: 7, tension: -2, prog: 8 },
    noOriented:      { trust: 8, tension: -4, prog: 8 },
    accusationAudit: { trust: 8, tension: -7, prog: 9 },
    empathy:         { trust: 4, tension: -4, prog: 4 },
    summary:         { trust: 5, tension: -5, prog: 6 }
  };
  const DOOR_OPENERS = ['mirroring', 'labeling', 'calibrated', 'noOriented', 'accusationAudit', 'summary'];
  const CORE = ['mirroring', 'labeling', 'calibrated', 'noOriented', 'accusationAudit', 'summary', 'ackerman'];
  const MISTAKE = {
    why:        { trust: -6, tension: 10 },
    aggressive: { trust: -12, tension: 20 },
    split:      { trust: -4, tension: 6 },
    raiseFast:  { trust: -2, tension: 2 },
    yesFast:    { trust: 0, tension: 0 },
    caved:      { trust: -3, tension: 3 },
    pay:        { trust: -4, tension: 6 },
    overpay:    { trust: 0, tension: 0 }
  };
  const RATING_VALUE = { excellent: 1, strong: 0.8, good: 0.6, weak: 0.3, mistake: 0 };
  const RATING_MULT = { excellent: 1.35, strong: 1, good: 0.75, weak: 0.4, mistake: 0.3 };
  const RATINGS = ['mistake', 'weak', 'good', 'strong', 'excellent'];
  const ACK_STEPS = [0.65, 0.85, 0.95, 1.0];

  // ---------- units & formatting ----------
  const UNITS = {
    usd:   { money: true },
    usdmo: { money: true, annual: 12, suffix: { en: '/mo', es: '/mes' } },
    usdsh: { money: true, cents: true, suffix: { en: '/share', es: '/acción' } },
    pct:   { suffix: { en: '%', es: '%' }, tight: true },
    days:  { suffix: { en: ' days', es: ' días' }, one: { en: ' day', es: ' día' } },
    dpw:   { suffix: { en: ' days/week', es: ' días/semana' }, one: { en: ' day/week', es: ' día/semana' } },
    mins:  { suffix: { en: ' min/day', es: ' min/día' } },
    hours: { suffix: { en: ' h/day', es: ' h/día' } },
    count: { suffix: { en: '', es: '' } },
    time:  {}
  };
  function fmt(v, unit, lang, custom) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    const u = UNITS[unit] || UNITS.count;
    const loc = lang === 'es' ? 'es-MX' : 'en-US';
    if (unit === 'time') {
      let h = Math.floor(v + 1e-6), m = Math.round((v - h) * 60);
      if (m === 60) { h++; m = 0; }
      const mm = String(m).padStart(2, '0');
      if (lang === 'es') return (h % 24 === 0 ? '00' : String(h % 24)) + ':' + mm;
      const hh = h % 12 === 0 ? 12 : h % 12;
      return hh + ':' + mm + (h % 24 >= 12 ? ' PM' : ' AM');
    }
    if (u.money) {
      const digits = (u.cents || (v < 100 && Math.round(v) !== v)) ? 2 : 0;
      const s = '$' + new Intl.NumberFormat(loc, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
      return s + (u.suffix ? u.suffix[lang] : '');
    }
    const num = new Intl.NumberFormat(loc, { maximumFractionDigits: 2 }).format(v);
    const suf = custom ? ' ' + custom[lang] : (v === 1 && u.one ? u.one[lang] : (u.suffix ? u.suffix[lang] : ''));
    return num + suf;
  }

  // ---------- small utils ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function roundTo(v, step) { return Math.round(v / step) * step; }
  function fill(str, params) {
    return String(str).replace(/\{(\w+)\}/g, (m, k) => (params && params[k] !== undefined ? params[k] : m));
  }

  // Render a stored line ({t:{en,es}, p:{...}}) in a language.
  function renderLine(entry, lang, sc) {
    const p = {};
    const params = entry.p || {};
    for (const k in params) {
      const v = params[k];
      if (k === 'price' || k === 'offer' || k === 'target' || k === 'start') p[k] = fmt(v, sc.unit, lang, sc.unitLabel);
      else if (v && typeof v === 'object' && v.en !== undefined) p[k] = v[lang];
      else p[k] = v;
    }
    if (sc.item) p.item = sc.item[lang];
    if (sc.who) p.name = sc.who.name;
    const raw = entry.t && entry.t[lang] !== undefined ? entry.t[lang] : entry.t;
    return fill(raw, p);
  }

  // ---------- scenario preparation (randomization) ----------
  function prepare(base, opts, rng) {
    const sc = Object.assign({}, base);
    sc.level = base.level;
    const lv = LEVELS[sc.level];
    if (sc.type === 'deal') {
      const step = sc.step || 1;
      if (opts.random && UNITS[sc.unit] && UNITS[sc.unit].money) {
        const k = 1 + (rng() * 0.24 - 0.12);
        sc.start = roundTo(base.start * k, step);
        sc.target = roundTo(base.target * k, step);
        if (base.limit !== undefined) sc.limit = roundTo(base.limit * k, step);
        if (sc.start === sc.target) sc.start += step * (base.start > base.target ? 1 : -1);
      }
      sc.dir = sc.target > sc.start ? 1 : -1; // +1: player wants a higher number
      sc.limitF = base.limit !== undefined ? (sc.limit - sc.start) / (sc.target - sc.start) : (base.limitF || lv.limitF);
    }
    const motives = base.motives || [];
    sc.motivesChosen = opts.random ? shuffle(motives, rng).slice(0, 3) : motives.slice(0, 3);
    return sc;
  }

  // ---------- engine ----------
  function create(baseScenario, options) {
    const opts = Object.assign({ mode: 'coach', lang: 'en', random: false, rng: Math.random }, options || {});
    const rng = opts.rng;
    const sc = prepare(baseScenario, opts, rng);
    const lv = LEVELS[sc.level];
    const reg = NX.lines.registers[sc.register || 'casual'];
    const T = NX.lines.TACTICS;
    const tacticStyle = sc.register === 'crisis' ? 'crisis' : 'biz';
    const lastPick = {};

    const st = {
      turn: 0, trust: lv.trust0, tension: sc.tension0 !== undefined ? sc.tension0 : lv.tension0, progress: 0,
      revealed: 0, thatsRight: false, cpF: 0, offers: [], offerVals: [], ack: { step: 0, done: false, precise: false },
      used: {}, ratings: [], primaries: [], transcript: [], ended: false, result: null, walkUsed: false,
      lastCall: false, lastTactic: null, tacticIdx: 0, quiz: null, spot: { right: 0, total: 0 }, hints: 0,
      handled: 0, tacticsSeen: 0, milestones: 0, deal: null, maxTurns: sc.maxTurns || lv.maxTurns,
      warned: false, lang: opts.lang
    };

    function pick(key, pool) {
      const arr = pool || reg[key] || NX.lines.registers.business[key] || [];
      if (!arr.length) return { en: '...', es: '...' };
      let i = Math.floor(rng() * arr.length);
      if (arr.length > 1 && lastPick[key] === i) i = (i + 1) % arr.length;
      lastPick[key] = i;
      return arr[i];
    }

    // f-space helpers: 0 = counterpart's opening, 1 = player's target
    const toF = x => (x - sc.start) / (sc.target - sc.start);
    const fromF = f => {
      const step = sc.step || 1;
      let x = roundTo(sc.start + f * (sc.target - sc.start), step);
      return Math.round(x * 100) / 100;
    };
    const distinct = () => Object.keys(st.used).filter(k => CORE.includes(k)).length;

    function unlock() {
      const tn = clamp((st.trust - lv.trust0) / (86 - lv.trust0), 0, 1);
      const nRev = Math.max(1, sc.motivesChosen.length);
      const p = clamp(0.55 * tn + 0.3 * (st.revealed / nRev) + (st.thatsRight ? 0.15 : 0), 0, 1);
      const cap = clamp((distinct() + 0.5) / lv.varReq, 0, 1);
      return lv.base + (1 - lv.base) * Math.min(p, cap);
    }
    const availF = () => sc.limitF * unlock();
    const cpValue = () => fromF(st.cpF);

    function themLine(t, p, extra) {
      const e = Object.assign({ who: 'them', t, p: p || {} }, extra || {});
      st.transcript.push(e);
      return e;
    }
    function lastThem() {
      for (let i = st.transcript.length - 1; i >= 0; i--) if (st.transcript[i].who === 'them') return st.transcript[i];
      return null;
    }
    function offerRange() {
      if (sc.type !== 'deal') return null;
      const lo = Math.min(sc.start, sc.target), hi = Math.max(sc.start, sc.target);
      const span = Math.max(hi - lo, sc.step || 1);
      const pad = Math.max(span * 1.6, Math.abs(sc.target) * 0.45);
      return [Math.max(0, lo - pad), hi + pad];
    }

    // ----- Ackerman tracking -----
    function ackRatio(x) {
      if (!sc.target) return null;
      return sc.dir < 0 ? x / sc.target : 2 - x / sc.target;
    }
    function ackerTrack(x) {
      if (sc.ackerman === false || !UNITS[sc.unit] || !UNITS[sc.unit].money) return null;
      const r = ackRatio(x);
      if (r === null) return null;
      const near = i => Math.abs(r - ACK_STEPS[i]) <= 0.045;
      if (st.ack.done) return null;
      if (near(st.ack.step)) {
        st.ack.step++;
        if (st.ack.step === 4) {
          st.ack.done = true;
          st.ack.precise = NX.detector.isPrecise(x);
          return { step: 4, done: true, precise: st.ack.precise };
        }
        return { step: st.ack.step };
      }
      if (near(0)) { st.ack.step = 1; return { step: 1 }; }
      return null;
    }

    // ----- best next move (used for hints and "try instead") -----
    function nextMove(avoid) {
      const used = st.used;
      const lt = lastThem();
      const echo = lt ? { en: mirrorOf(renderLine(lt, 'en', sc)), es: mirrorOf(renderLine(lt, 'es', sc)) } : null;
      const crisis = sc.register === 'crisis';
      const cand = [];
      if (st.tension >= 50) cand.push('labelTension');
      if (st.turn <= 1 && !used.accusationAudit) cand.push('audit');
      if (st.revealed < sc.motivesChosen.length) cand.push(st.turn % 2 ? 'calibrated' : 'label', 'mirror', 'noOriented');
      if (st.revealed >= 1 && !st.thatsRight) cand.unshift('summary');
      if (sc.type === 'deal' && (st.revealed >= Math.min(2, sc.motivesChosen.length) || st.turn >= 6)) cand.unshift('ackerman');
      if (sc.type !== 'deal' && st.progress >= 60) cand.push('noOriented', 'summary');
      cand.push('calibrated', 'label', 'mirror');
      let choice = cand.find(c => c !== avoid && !(c === 'mirror' && !echo) && !(c === 'audit' && used.accusationAudit)) || 'calibrated';
      if (choice === 'ackerman' && (sc.ackerman === false || !UNITS[sc.unit].money || !sc.target)) choice = 'noOfferGeneric';
      const S = NX.coachPhrases;
      switch (choice) {
        case 'labelTension': return { tech: 'labeling', phrase: crisis ? S.labelCrisis : S.labelTension };
        case 'audit': return { tech: 'accusationAudit', phrase: crisis ? S.auditCrisis : (sc.register === 'business' ? S.auditBiz : S.audit) };
        case 'label': return { tech: 'labeling', phrase: crisis ? S.labelCrisis2 : S.label };
        case 'mirror': return { tech: 'mirroring', phrase: { en: echo.en + '?', es: '¿' + echo.es + '?' } };
        case 'noOriented': return { tech: 'noOriented', phrase: crisis ? S.noCrisis : S.no };
        case 'summary': return { tech: 'summary', phrase: S.summary };
        case 'ackerman': {
          const idx = st.ack.done ? 3 : st.ack.step;
          const ratio = ACK_STEPS[idx];
          let x = sc.dir < 0 ? sc.target * ratio : sc.target * (2 - ratio);
          if (idx === 3) x = preciseNear(sc.target);
          else x = roundTo(x, sc.step || 1);
          const p = { en: fmt(x, sc.unit, 'en'), es: fmt(x, sc.unit, 'es') };
          const tpl = idx === 0 ? S.ack1 : (idx === 3 ? S.ack4 : S.ackMid);
          return { tech: 'ackerman', phrase: { en: fill(tpl.en, { x: p.en }), es: fill(tpl.es, { x: p.es }) }, step: idx + 1 };
        }
        case 'noOfferGeneric': return { tech: 'noOriented', phrase: S.noDeal };
        default: return { tech: 'calibrated', phrase: crisis ? S.calCrisis : S.calibrated[st.turn % S.calibrated.length] };
      }
    }
    function preciseNear(t) {
      const s = sc.dir < 0 ? -1 : 1;
      if (t >= 1000) { const u = Math.pow(10, Math.floor(Math.log10(t)) - 2); return Math.round(t + s * 0.37 * u); }
      if (t >= 100) return Math.round(t) + s * 3;
      return Math.round((t + s * 0.15) * 100) / 100;
    }
    function mirrorOf(line) {
      const w = NX.detector.lastContentWords(line, 3);
      const all = line.replace(/[¿?¡!.,;:"]/g, '').trim().split(/\s+/);
      // last 2–3 words of the sentence, ending on a content word
      let end = all.length;
      while (end > 0 && !w.includes(NX.detector.fold(all[end - 1]).replace(/[^a-z0-9ñ']/g, ''))) end--;
      if (end === 0) end = all.length;
      return all.slice(Math.max(0, end - 3), end).join(' ').replace(/^\w/, c => c.toLowerCase());
    }

    // ----- start -----
    function start() {
      const p = sc.type === 'deal' ? { price: sc.start } : {};
      themLine(sc.open, p, { open: true });
      return { lines: st.transcript.slice(), state: snapshot() };
    }

    // ----- rating -----
    function rate(a, ctx) {
      const notes = [];
      let rating = 'weak';
      const techs = a.techniques;
      let any = false;
      const setR = r => { if (!any || RATINGS.indexOf(r) > RATINGS.indexOf(rating)) rating = r; any = true; };
      if (techs.includes('mirroring')) { setR(a.meta.mirror.exact ? 'excellent' : 'strong'); notes.push(a.meta.mirror.exact ? 'n.mirror.exact' : 'n.mirror'); }
      if (techs.includes('labeling')) { const hot = st.tension >= 40 || ctx.afterTactic; setR(hot ? 'excellent' : 'strong'); notes.push(hot ? 'n.label.tension' : 'n.label'); }
      if (techs.includes('calibrated')) {
        if (a.meta.calStrong) { setR(st.turn > 1 ? 'excellent' : 'strong'); notes.push('n.calStrong'); }
        else if (a.meta.calWeak) { setR('good'); notes.push('n.calWeak'); }
        else { setR('good'); notes.push('n.cal'); }
      }
      if (techs.includes('noOriented')) { const ex = a.meta.offer !== undefined || st.tension >= 35; setR(ex ? 'excellent' : 'strong'); notes.push('n.no'); }
      if (techs.includes('accusationAudit')) { const early = st.turn <= 2; setR(early ? 'excellent' : 'strong'); notes.push(early ? 'n.audit.early' : 'n.audit'); }
      if (techs.includes('empathy')) { setR('good'); notes.push('n.empathy'); }
      if (techs.includes('summary')) { setR(ctx.thatsRight ? 'excellent' : 'good'); notes.push(ctx.thatsRight ? 'n.summary.tr' : (ctx.revealedBefore ? 'n.summary.yr' : 'n.summary.early')); }
      if (ctx.ack) {
        if (ctx.ack.done) { setR('excellent'); notes.push('n.ackDone'); if (ctx.ack.precise) notes.push('n.precise'); else notes.push('n.notPrecise'); }
        else { setR('strong'); notes.push('n.ackStep'); }
      } else if (ctx.offer && !techs.length) {
        if (ctx.firstOffer && ctx.offerF >= 1.15) { setR('good'); notes.push('n.anchorStrong'); }
        else if (ctx.firstOffer && ctx.offerF < 0.7) { setR('weak'); notes.push('n.anchorWeak'); }
        else { setR('weak'); notes.push('n.offerPlain'); }
      } else if (ctx.offer && ctx.firstOffer && ctx.offerF >= 1.15) notes.push('n.anchorStrong');
      if (ctx.accept) { setR(ctx.acceptF >= 1 ? 'good' : 'weak'); notes.push(ctx.acceptF >= 1 ? 'n.accept.good' : 'n.accept.short'); }
      if (ctx.walk) { setR(ctx.strategicWalk ? 'good' : 'weak'); notes.push('n.walk'); }
      const doorCount = techs.filter(t => DOOR_OPENERS.includes(t)).length;
      if (doorCount >= 2 && rating !== 'excellent') { rating = RATINGS[RATINGS.indexOf(rating) + 1]; notes.push('n.combo'); }
      if (ctx.repeat) notes.push('n.repeat');
      if (ctx.handled) notes.push('n.handled');
      if (!any && !notes.length && !a.mistakes.length) notes.push('n.none');
      if (a.mistakes.length) {
        rating = 'mistake';
        for (const m of a.mistakes) notes.push('m.' + m);
      }
      return { rating, notes };
    }

    function primaryOf(techs) {
      const order = ['summary', 'accusationAudit', 'labeling', 'noOriented', 'calibrated', 'mirroring', 'empathy'];
      return order.find(t => techs.includes(t)) || null;
    }

    // ----- a player turn -----
    function say(text, lang) {
      if (st.ended) return null;
      lang = lang || st.lang;
      st.lang = lang;
      text = String(text || '').trim();
      if (!text) return null;
      st.turn++;
      const prevLines = [];
      for (let i = st.transcript.length - 1; i >= 0 && st.transcript[i].who !== 'me'; i--) {
        if (st.transcript[i].who === 'them') prevLines.push(renderLine(st.transcript[i], lang, sc));
      }
      const prevLine = prevLines[0] || '';
      const afterTactic = !!st.lastTactic;
      const a = NX.detector.analyze(text, { lang, prevLine, prevLines, unit: sc.unit, range: offerRange() });
      if (a.meta.offer !== undefined && (a.techniques.includes('mirroring') || a.meta.wordCount <= 4) && !a.meta.accept && sc.unit !== 'time') {
        const echoed = prevLines.some(pl => NX.detector.parseNumbers(pl, lang).some(n => Math.abs(n.value - a.meta.offer) < 1e-6));
        if (echoed) { // repeating their number back is a mirror, not an offer
          delete a.meta.offer;
          if (!a.techniques.includes('mirroring')) { a.techniques.unshift('mirroring'); a.meta.mirror = { words: [], exact: true }; }
        }
      }
      if (a.meta.offer === undefined && a.meta.zero && sc.type === 'deal' && sc.target === 0) a.meta.offer = 0;
      const ctx = { afterTactic };
      const out = [];
      const me = { who: 'me', text, lang, turn: st.turn };
      st.transcript.push(me);

      // --- offer bookkeeping ---
      let offerF = null;
      if (a.meta.offer !== undefined && sc.type === 'deal') {
        offerF = toF(a.meta.offer);
        ctx.offer = true;
        ctx.offerF = offerF;
        ctx.firstOffer = st.offers.length === 0;
        const prevO = st.offers.length ? st.offers[st.offers.length - 1] : null;
        const x = a.meta.offer;
        ctx.ack = ackerTrack(x);
        if (ctx.ack) st.used.ackerman = (st.used.ackerman || 0) + 1;
        const cpX = cpValue();
        const beyond = (x - cpX) * sc.dir < 0; // worse for the player than what they already offered
        if (beyond && st.offers.length && offerF < st.cpF - 1e-9) a.mistakes.push('overpay');
        else if (prevO !== null) {
          const prevX = st.offerVals[st.offerVals.length - 1];
          const base = Math.abs(sc.target) || Math.abs(sc.start - sc.target);
          const stepV = (x - prevX) * -sc.dir;
          const gapV = (cpX - prevX) * -sc.dir;
          const rel = stepV / base;
          const ackStep = ctx.ack && ctx.ack.step > 1;
          if (!ackStep && (rel > 0.25 || (gapV > 0 && stepV > 0.6 * gapV && rel > 0.08))) a.mistakes.push('raiseFast');
          if (afterTactic && rel > 0.1 && !ackStep && !a.mistakes.includes('raiseFast')) a.mistakes.push('caved');
        } else if (offerF <= st.cpF + 1e-9 && st.turn <= 3) {
          a.mistakes.push('yesFast');
        }
        st.offerVals.push(x);
        st.offers.push(offerF);
      } else if (a.meta.offer !== undefined && sc.noPay) {
        a.mistakes.push('pay');
      }
      if (a.meta.accept && sc.type === 'deal' && offerF === null) {
        ctx.accept = true;
        ctx.acceptF = st.cpF;
        if (st.turn <= 2 && st.cpF < 0.3) a.mistakes.push('yesFast');
      }
      if (a.meta.walk) { ctx.walk = true; ctx.strategicWalk = st.trust >= 40 && sc.type === 'deal' && availF() > st.cpF + 0.05; }

      // repetition (same primary technique three times running)
      const primary = primaryOf(a.techniques);
      const n = st.primaries.length;
      ctx.repeat = !!primary && n >= 2 && st.primaries[n - 1] === primary && st.primaries[n - 2] === primary;
      if (afterTactic && a.techniques.some(t => DOOR_OPENERS.includes(t)) && !a.mistakes.includes('caved') && !a.mistakes.includes('raiseFast')) {
        ctx.handled = true; st.handled++;
      }

      // --- reveal / that's right eligibility (computed before trust update) ---
      const door = a.techniques.some(t => DOOR_OPENERS.includes(t)) && !a.mistakes.includes('aggressive');
      ctx.revealedBefore = st.revealed > 0;
      const trEligible = a.techniques.includes('summary') && st.revealed >= 1 && !st.thatsRight && !a.mistakes.length;

      // --- trust / tension updates ---
      const levelIdx = LEVEL_ORDER.indexOf(sc.level);
      const repF = ctx.repeat ? (levelIdx >= 2 ? 0.35 : 0.7) : 1;
      let preRating = 'strong';
      a.techniques.forEach(t => {
        const d = TECH[t]; if (!d) return;
        const w = (t === primary ? 1 : 0.5) * repF;
        st.trust += d.trust * lv.gain * w;
        st.tension += d.tension * lv.gain * w;
        if (sc.type !== 'deal') st.progress += d.prog * lv.gain * w * 1.15;
        st.used[t] = (st.used[t] || 0) + 1;
      });
      if (ctx.handled) st.trust += 3 * lv.gain;
      if (ctx.ack) st.trust += 2;
      a.mistakes.forEach(m => {
        const d = MISTAKE[m];
        st.trust += d.trust * lv.pain;
        st.tension += d.tension * lv.pain;
        if (sc.type !== 'deal') st.progress -= (m === 'pay' ? 15 : 4) * lv.pain;
        st.used['x_' + m] = (st.used['x_' + m] || 0) + 1;
      });
      if (!a.techniques.length && !a.mistakes.length && !ctx.offer && !ctx.accept && !ctx.walk) {
        st.trust -= 1;
        st.tension += (sc.register === 'crisis' ? 4 : 2) * lv.pain;
      }
      st.primaries.push(primary);

      // --- counterpart reaction ---
      let revealedNow = false, trNow = false;
      if (a.mistakes.includes('aggressive')) out.push(themLine(pick('aggressive')));
      else if (a.mistakes.includes('why')) out.push(themLine(pick('why')));
      else if (a.mistakes.includes('split')) out.push(themLine(pick('split')));

      if (!a.mistakes.includes('aggressive')) {
        if (trEligible && st.trust >= lv.thatsRight - 8) {
          st.thatsRight = true; trNow = true; ctx.thatsRight = true;
          st.trust += 12; st.tension -= 10; if (sc.type !== 'deal') st.progress += 20;
          out.push(themLine(pick('thatsRight'), {}, { thatsRight: true }));
        } else if (a.techniques.includes('summary') && !trEligible && !a.mistakes.length) {
          out.push(themLine(pick('youreRight')));
        } else if (door && st.revealed < sc.motivesChosen.length && st.trust >= lv.reveal[st.revealed]) {
          const m = sc.motivesChosen[st.revealed];
          st.revealed++; revealedNow = true;
          st.trust += 4; if (sc.type !== 'deal') st.progress += 12;
          out.push(themLine(m, {}, { reveal: st.revealed }));
        } else if (primary && !a.mistakes.length) {
          if (ctx.repeat && levelIdx >= 2) out.push(themLine(pick('repeat')));
          else out.push(themLine(pick(primary === 'accusationAudit' ? 'audit' : primary === 'mirroring' ? 'mirror' : primary === 'labeling' ? 'label' : primary)));
        }
      }
      clampState();

      // --- deal mechanics ---
      if (sc.type === 'deal') dealStep(a, ctx, out, offerF, revealedNow || trNow, primary, a.meta.offer);
      else resolveStep(a, ctx, out);

      // --- crisis / patience failure ---
      if (!st.ended && st.tension >= 100) {
        out.push(themLine(sc.fail || pick('leave'), {}, { end: true }));
        endGame(sc.type === 'deal' ? 'nodeal' : 'failed');
      }

      // --- pressure tactics used against the player ---
      st.lastTactic = null;
      st.quiz = null;
      if (!st.ended && sc.tactics && sc.tactics.length) {
        const every = sc.tacticEvery || lv.tacticEvery || 3;
        if (st.turn % every === 0) injectTactic(text, out);
      }

      // --- turn limit ---
      if (!st.ended && st.turn >= st.maxTurns - 2 && !st.warned) { st.warned = true; ctx.turnsLeft = st.maxTurns - st.turn; }
      if (!st.ended && st.turn > st.maxTurns) {
        out.push(themLine(sc.type === 'deal' ? pick('leave') : (sc.timeout || pick('leave')), {}, { end: true }));
        endGame(sc.type === 'deal' ? 'nodeal' : 'unresolved');
      }

      // --- coach feedback ---
      const r = rate(a, ctx);
      if (ctx.turnsLeft) r.notes.push('n.turnsLeft');
      if (revealedNow) r.notes.push('n.reveal');
      if (ctx.varietyCap) r.notes.push('n.varietyCap');
      if (ctx.insulted) r.notes.push('n.insult');
      const avoid = primary === 'mirroring' ? 'mirror' : primary === 'labeling' ? 'label' : primary;
      let sug = nextMove(avoid);
      const mfix = a.mistakes[0] && NX.coachPhrases.fix[a.mistakes[0]];
      if (mfix) sug = { tech: mfix.tech, phrase: mfix.phrase };
      me.coach = { rating: r.rating, tech: a.techniques.concat(ctx.ack ? ['ackerman'] : []), mistakes: a.mistakes.slice(), notes: r.notes,
        suggest: sug, params: { n: ctx.ack ? ctx.ack.step : 0, left: ctx.turnsLeft || 0, req: lv.varReq } };
      st.ratings.push(r.rating);
      return { me, lines: out, state: snapshot(), ended: st.ended, result: st.result, quiz: st.quiz };
    }

    function clampState() {
      st.trust = clamp(st.trust, 0, 100);
      st.tension = clamp(st.tension, 0, 100);
      st.progress = clamp(st.progress, 0, 100);
    }

    function dealStep(a, ctx, out, offerF, momentum, primary, rawOffer) {
      const av = availF();
      if (ctx.walk) {
        if (!st.walkUsed && av > st.cpF + 0.05 && st.trust >= 38 && !st.lastCall) {
          st.walkUsed = true; st.lastCall = true;
          st.cpF = st.cpF + (av - st.cpF) * 0.85;
          out.push(themLine(pick('final'), { price: cpValue() }, { finalOffer: true }));
        } else {
          out.push(themLine(sc.nodeal || pick('leave'), {}, { end: true }));
          endGame('nodeal');
        }
        return;
      }
      if (offerF !== null) {
        const x = Math.round(rawOffer * 100) / 100;
        if (offerF <= st.cpF + 1e-9) {
          out.push(themLine(pick('accept'), { price: x }));
          return closeDeal(x, out);
        }
        const stretch = (st.ack.done && st.ack.precise) ? 0.1 : (st.ack.done ? 0.04 : 0);
        if (offerF <= av + stretch) {
          const close = offerF - st.cpF < 0.12 || st.ack.done || (st.offers.length >= 3 && st.turn >= 5) || (sc.level === 'beginner' && st.trust >= 60) || st.lastCall;
          if (close) {
            out.push(themLine(pick('accept'), { price: x }));
            return closeDeal(x, out);
          }
          st.cpF = st.cpF + (offerF - st.cpF) * 0.55;
          if (Math.abs(cpValue() - x) < (sc.step || 1) * 0.75) {
            out.push(themLine(pick('accept'), { price: x }));
            return closeDeal(x, out);
          }
          out.push(themLine(pick('counter'), { price: cpValue() }));
          return;
        }
        const extreme = offerF > sc.limitF * 1.6 && st.trust < 50 && LEVEL_ORDER.indexOf(sc.level) >= 2 && !a.techniques.length;
        if (extreme) {
          ctx.insulted = true; st.tension = clamp(st.tension + 8, 0, 100); st.trust = clamp(st.trust - 4, 0, 100);
          out.push(themLine(pick('insulted')));
        }
        if (st.lastCall) {
          out.push(themLine(sc.nodeal || pick('leave'), {}, { end: true }));
          return endGame('nodeal');
        }
        st.cpF = st.cpF + (av - st.cpF) * 0.35;
        out.push(themLine(pick('reject'), { offer: x, price: cpValue() }));
        return;
      }
      if (ctx.accept) {
        const x = cpValue();
        out.push(themLine(pick('accept'), { price: x }));
        return closeDeal(x, out);
      }
      const goodTurn = momentum || (primary && !a.mistakes.length && st.turn % 2 === 0);
      if (goodTurn && av > st.cpF + 0.05) {
        st.cpF = st.cpF + (av - st.cpF) * 0.4;
        out.push(themLine(pick('concede'), { price: cpValue() }));
        return;
      }
      if (!out.length) out.push(themLine(pick('neutral'), { price: cpValue() }));
      if (st.turn === st.maxTurns && !st.lastCall) {
        st.lastCall = true;
        st.cpF = Math.max(st.cpF, av * 0.9);
        out.push(themLine(pick('final'), { price: cpValue() }, { finalOffer: true }));
      }
    }

    function closeDeal(x, out) {
      st.deal = x;
      out.push(themLine(sc.deal, { price: x }, { end: true, outcome: true }));
      endGame('deal');
    }

    function resolveStep(a, ctx, out) {
      const marks = [25, 50, 75];
      while (st.milestones < 3 && st.progress >= marks[st.milestones]) {
        const m = sc.milestones && sc.milestones[st.milestones];
        st.milestones++;
        if (m) out.push(themLine(m, {}, { milestone: st.milestones }));
      }
      if (st.progress >= 100) {
        if (distinct() >= lv.varReq) {
          out.push(themLine(sc.deal, {}, { end: true, outcome: true }));
          endGame('resolved');
          return;
        }
        st.progress = 92;
        ctx.varietyCap = true;
      }
      if (!out.length) out.push(themLine(pick('neutralR')));
    }

    function injectTactic(playerText, out) {
      const ids = sc.tactics;
      const id = ids[st.tacticIdx % ids.length];
      st.tacticIdx++;
      const pool = T[id] && (T[id][tacticStyle] || T[id].biz);
      if (!pool) return;
      const echoWords = playerText.replace(/[¿?¡!.,;:"]/g, '').trim().split(/\s+/).slice(-3).join(' ');
      const e = themLine(pick('t_' + id, pool), { price: sc.type === 'deal' ? cpValue() : '', echo: echoWords }, { tactic: id });
      out.push(e);
      st.lastTactic = id;
      st.tacticsSeen++;
      if (sc.spot) {
        const pool2 = ['deadline', 'takeItOrLeaveIt', 'anchoring', 'higherAuthority', 'flinch', 'nibble', 'goodCopBadCop', 'mirrorBack', 'labelBack', 'calibratedBack', 'auditBack', 'fakeDeadline'];
        const canon = x => ({ mirrorBack: 'mirroring', labelBack: 'labeling', calibratedBack: 'calibrated', auditBack: 'accusationAudit', fakeDeadline: 'deadline' }[x] || x);
        const correct = canon(id);
        const others = shuffle(pool2.map(canon).filter((v, i, arr) => v !== correct && arr.indexOf(v) === i), rng).slice(0, 3);
        st.quiz = { id: st.tacticsSeen, correct, options: shuffle([correct].concat(others), rng), answered: false };
        e.quiz = st.quiz;
      }
    }

    function spot(guess) {
      const q = st.quiz || (lastThem() && lastThem().quiz);
      if (!q || q.answered) return null;
      q.answered = true;
      q.guess = guess;
      st.spot.total++;
      const ok = guess === q.correct;
      if (ok) { st.spot.right++; st.trust = clamp(st.trust + 2, 0, 100); }
      return { correct: ok, answer: q.correct };
    }

    function hint() { st.hints++; return nextMove(null); }

    function endGame(outcome) {
      st.ended = true;
      st.result = buildReport(outcome);
    }

    function finish() { // player pressed "End negotiation"
      if (!st.ended) endGame(sc.type === 'deal' ? 'nodeal' : 'unresolved');
      return st.result;
    }

    // ----- report & scoring -----
    function buildReport(outcome) {
      let f = 0, won = false, saved = 0, finalValue = null;
      if (outcome === 'deal') {
        finalValue = st.deal;
        f = toF(st.deal);
        won = f >= 0.85;
        if (UNITS[sc.unit] && UNITS[sc.unit].money) saved = Math.abs(st.deal - sc.start) * (UNITS[sc.unit].annual || 1) * (sc.moneyScale || 1);
        if (f < 0) saved = 0;
      } else if (outcome === 'resolved') { f = 1; won = true; }
      else if (sc.type !== 'deal') f = st.progress / 100 * 0.6;

      const outcomeScore = outcome === 'deal' ? (f >= 1 ? 45 + Math.min(5, (f - 1) * 25) : Math.max(0, f) * 45)
        : outcome === 'resolved' ? 50 : outcome === 'failed' ? 0 : Math.max(0, f) * 30;
      const avgQ = st.ratings.length ? st.ratings.reduce((s, r) => s + RATING_VALUE[r], 0) / st.ratings.length : 0;
      const spotRate = st.spot.total ? st.spot.right / st.spot.total : null;
      const techScore = 30 * (spotRate === null ? avgQ : 0.7 * avgQ + 0.3 * spotRate);
      const varietyScore = 10 * Math.min(1, distinct() / 5);
      const relScore = outcome === 'failed' ? 0 : (st.trust / 100) * 6 + ((100 - st.tension) / 100) * 4;
      const score = Math.round(clamp(outcomeScore + techScore + varietyScore + relScore, 0, 100));

      const techCounts = {};
      st.transcript.filter(e => e.who === 'me' && e.coach).forEach(e => {
        e.coach.tech.forEach(t => {
          techCounts[t] = techCounts[t] || { n: 0, q: 0 };
          techCounts[t].n++;
          techCounts[t].q += RATING_VALUE[e.coach.rating === 'mistake' ? 'weak' : e.coach.rating];
        });
        e.coach.mistakes.forEach(m => {
          const k = 'x_' + m;
          techCounts[k] = techCounts[k] || { n: 0, q: 0 };
          techCounts[k].n++;
        });
      });

      const missed = [];
      const left = sc.motivesChosen.length - st.revealed;
      if (left > 0) missed.push({ key: 'miss.reveals', p: { n: left } });
      if (!st.thatsRight) missed.push({ key: 'miss.thatsRight' });
      if (sc.type === 'deal' && sc.ackerman !== false && UNITS[sc.unit].money && sc.target && !st.ack.done) missed.push({ key: 'miss.ackerman' });
      if (!st.used.accusationAudit) missed.push({ key: 'miss.audit' });
      if (!st.used.labeling) missed.push({ key: 'miss.label' });
      if (!st.used.mirroring) missed.push({ key: 'miss.mirror' });
      if (!st.used.calibrated) missed.push({ key: 'miss.calibrated' });
      if (st.tacticsSeen && st.handled < st.tacticsSeen) missed.push({ key: 'miss.tactics', p: { n: st.tacticsSeen - st.handled } });
      if (outcome === 'deal' && f < 1) missed.push({ key: 'miss.target' });

      return {
        scenarioId: sc.id, level: sc.level, category: sc.category, type: sc.type, unit: sc.unit,
        outcome, won, f, finalValue, start: sc.start, target: sc.target, saved: Math.round(saved), money: !!(UNITS[sc.unit] && UNITS[sc.unit].money),
        score, breakdown: { outcome: Math.round(outcomeScore), technique: Math.round(techScore), variety: Math.round(varietyScore), relationship: Math.round(relScore) },
        techCounts, missed, spot: Object.assign({}, st.spot), handled: st.handled, tacticsSeen: st.tacticsSeen,
        thatsRight: st.thatsRight, revealed: st.revealed, reveals: sc.motivesChosen.length, ackerman: st.ack.done,
        turns: st.turn, mode: opts.mode, lang: st.lang, hints: st.hints, progress: Math.round(st.progress),
        mistakesTotal: st.ratings.filter(r => r === 'mistake').length, date: Date.now()
      };
    }

    function snapshot() {
      return {
        turn: st.turn, maxTurns: st.maxTurns, trust: Math.round(st.trust), tension: Math.round(st.tension), progress: Math.round(st.progress),
        revealed: st.revealed, reveals: sc.motivesChosen.length, thatsRight: st.thatsRight,
        position: sc.type === 'deal' ? cpValue() : null, lastOffer: st.offerVals.length ? st.offerVals[st.offerVals.length - 1] : null,
        ended: st.ended, ack: st.ack.step, distinct: distinct(), varReq: lv.varReq
      };
    }

    return {
      scenario: sc, state: st, start, say, hint, spot, finish, snapshot,
      render: (entry, lang) => renderLine(entry, lang, sc)
    };
  }

  NX.engine = { create, LEVELS, LEVEL_ORDER, CATEGORIES, UNITS, fmt, renderLine, fill, TECH, CORE };
  if (typeof module !== 'undefined' && module.exports) module.exports = NX.engine;
})(typeof window !== 'undefined' ? window : globalThis);
