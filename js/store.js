/* Negotiation Xpert — persistence (localStorage), statistics aggregation and credentials. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  const L = (en, es) => ({ en, es });
  // Every key is prefixed "negotiation-": the github.io origin (and its localStorage) is shared with other apps.
  const KEY = { settings: 'negotiation-settings', history: 'negotiation-history', ach: 'negotiation-achievements' };
  const LEGACY = { settings: 'nx.settings.v1', history: 'nx.history.v1', ach: 'nx.achievements.v1' };

  // One-time move of data saved by versions up to 1.1.0 under the old key names.
  try {
    Object.keys(KEY).forEach(k => {
      const old = localStorage.getItem(LEGACY[k]);
      if (old !== null) {
        if (localStorage.getItem(KEY[k]) === null) localStorage.setItem(KEY[k], old);
        localStorage.removeItem(LEGACY[k]);
      }
    });
  } catch (e) { /* storage unavailable */ }

  function read(k, fallback) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }

  const settings = Object.assign({ lang: null, theme: null, mode: 'coach', voice: true }, read(KEY.settings, {}));
  function saveSettings() { write(KEY.settings, settings); }

  let history = read(KEY.history, []);
  let earned = read(KEY.ach, {});

  // ---------- credentials ----------
  const LEVELS = ['beginner', 'easy', 'medium', 'hard', 'impossible'];
  const ACH = [
    { id: 'first_session', icon: 'flag', name: L('Opening Session', 'Sesión inaugural'), desc: L('Complete your first negotiation.', 'Completa tu primera negociación.') },
    { id: 'first_mirror', icon: 'refresh', name: L('First Mirror', 'Primer reflejo'), desc: L('Use mirroring in a negotiation.', 'Usa el reflejo en una negociación.') },
    { id: 'first_label', icon: 'message', name: L('First Label', 'Primera etiqueta'), desc: L('Name a counterpart\'s emotion with a label.', 'Nombra la emoción de una contraparte con una etiqueta.') },
    { id: 'no_oriented', icon: 'compass', name: L('The Power of No', 'El poder del no'), desc: L('Ask a "no"-oriented question.', 'Haz una pregunta orientada al «no».') },
    { id: 'audit', icon: 'shield', name: L('Clearing the Air', 'Despejar el ambiente'), desc: L('Deliver an accusation audit.', 'Haz una auditoría de acusaciones.') },
    { id: 'calibrated_10', icon: 'search', name: L('Calibrated Inquirer', 'Indagador calibrado'), desc: L('Ask 10 calibrated questions in total.', 'Haz 10 preguntas calibradas en total.') },
    { id: 'thats_right', icon: 'check', name: L('Breakthrough', 'Punto de quiebre'), desc: L('Get a counterpart to say "That\'s right."', 'Consigue que una contraparte diga «Así es».') },
    { id: 'ackerman', icon: 'scale', name: L('Ackerman Method', 'Método Ackerman'), desc: L('Complete a full Ackerman offer sequence.', 'Completa una secuencia de ofertas Ackerman.') },
    { id: 'composure', icon: 'eye', name: L('Composure', 'Compostura'), desc: L('Finish a negotiation of 5+ exchanges without a mistake.', 'Termina una negociación de 5 o más intercambios sin errores.') },
    { id: 'distinction', icon: 'award', name: L('Distinction', 'Distinción'), desc: L('Score 90 or higher.', 'Obtén 90 puntos o más.') },
    { id: 'unassisted', icon: 'target', name: L('Unassisted', 'Sin asistencia'), desc: L('Achieve the objective in Challenge Mode.', 'Logra el objetivo en Modo Desafío.') },
    { id: 'bilingual', icon: 'globe', name: L('Bilingual Practitioner', 'Negociador bilingüe'), desc: L('Complete negotiations in both English and Spanish.', 'Completa negociaciones en inglés y en español.') },
    { id: 'pattern', icon: 'key', name: L('Pattern Recognition', 'Reconocimiento de patrones'), desc: L('Correctly identify 5 tactics used against you.', 'Identifica correctamente 5 tácticas usadas contra ti.') },
    { id: 'lvl_beginner', icon: 'seal', name: L('Beginner Level Complete', 'Nivel Principiante completado'), desc: L('Achieve the objective in every Beginner scenario.', 'Logra el objetivo en todos los escenarios de Principiante.'), level: 'beginner' },
    { id: 'lvl_easy', icon: 'seal', name: L('Easy Level Complete', 'Nivel Fácil completado'), desc: L('Achieve the objective in every Easy scenario.', 'Logra el objetivo en todos los escenarios de Fácil.'), level: 'easy' },
    { id: 'lvl_medium', icon: 'seal', name: L('Medium Level Complete', 'Nivel Intermedio completado'), desc: L('Achieve the objective in every Medium scenario.', 'Logra el objetivo en todos los escenarios de Intermedio.'), level: 'medium' },
    { id: 'lvl_hard', icon: 'seal', name: L('Hard Level Complete', 'Nivel Difícil completado'), desc: L('Achieve the objective in every Hard scenario.', 'Logra el objetivo en todos los escenarios de Difícil.'), level: 'hard' },
    { id: 'lvl_impossible', icon: 'seal', name: L('Impossible Level Complete', 'Nivel Imposible completado'), desc: L('Achieve the objective in every Impossible scenario.', 'Logra el objetivo en todos los escenarios de Imposible.'), level: 'impossible' },
    { id: 'crisis', icon: 'shield', name: L('Crisis Negotiator', 'Negociador de crisis'), desc: L('Bring a Crisis & Hostage scenario to a safe outcome.', 'Lleva un escenario de Crisis y rehenes a un desenlace seguro.') },
    { id: 'value_10k', icon: 'chart', name: L('Value Creator', 'Creador de valor'), desc: L('Save or gain $10,000 across all negotiations.', 'Ahorra o gana 10.000 $ en total.') },
    { id: 'sessions_25', icon: 'clock', name: L('Seasoned Practitioner', 'Profesional experimentado'), desc: L('Complete 25 negotiations.', 'Completa 25 negociaciones.') },
    { id: 'master', icon: 'award', name: L('Master Negotiator', 'Negociador maestro'), desc: L('Defeat the Final Boss.', 'Vence al Jefe Final.') }
  ];

  function techTotal(t) { return history.reduce((s, h) => s + ((h.techCounts && h.techCounts[t] && h.techCounts[t].n) || 0), 0); }

  function checkAchievements() {
    const fresh = [];
    const give = id => { if (!earned[id]) { earned[id] = Date.now(); fresh.push(id); } };
    const any = fn => history.some(fn);
    if (history.length) give('first_session');
    if (techTotal('mirroring')) give('first_mirror');
    if (techTotal('labeling')) give('first_label');
    if (techTotal('noOriented')) give('no_oriented');
    if (techTotal('accusationAudit')) give('audit');
    if (techTotal('calibrated') >= 10) give('calibrated_10');
    if (any(h => h.thatsRight)) give('thats_right');
    if (any(h => h.ackerman)) give('ackerman');
    if (any(h => h.turns >= 5 && h.mistakesTotal === 0)) give('composure');
    if (any(h => h.score >= 90)) give('distinction');
    if (any(h => h.mode === 'challenge' && h.won)) give('unassisted');
    if (any(h => h.lang === 'en') && any(h => h.lang === 'es')) give('bilingual');
    if (history.reduce((s, h) => s + ((h.spot && h.spot.right) || 0), 0) >= 5) give('pattern');
    LEVELS.forEach(lv => {
      const ids = (NX.scenarios || []).filter(s => s.level === lv).map(s => s.id);
      if (ids.length && ids.every(id => any(h => h.scenarioId === id && h.won))) give('lvl_' + lv);
    });
    if (any(h => h.category === 'crisis' && h.won)) give('crisis');
    if (history.reduce((s, h) => s + (h.money ? h.saved : 0), 0) >= 10000) give('value_10k');
    if (history.length >= 25) give('sessions_25');
    if (any(h => h.scenarioId === 'final-boss' && h.won)) give('master');
    if (fresh.length) write(KEY.ach, earned);
    return fresh;
  }

  function record(report) {
    const entry = Object.assign({}, report);
    history.push(entry);
    if (history.length > 1000) history = history.slice(-1000);
    write(KEY.history, history);
    return checkAchievements();
  }

  function reset() {
    history = []; earned = {};
    write(KEY.history, history); write(KEY.ach, earned);
  }

  // ---------- aggregation for the dashboard ----------
  function aggregate() {
    const out = { played: history.length, won: 0, lost: 0, saved: 0, scoreSum: 0, byLevel: {}, byCat: {}, byScenario: {}, tech: {}, mistakes: {}, timeline: [] };
    history.forEach(h => {
      if (h.won) out.won++; else out.lost++;
      if (h.money) out.saved += h.saved || 0;
      out.scoreSum += h.score;
      const bump = (obj, k) => { obj[k] = obj[k] || { n: 0, w: 0 }; obj[k].n++; if (h.won) obj[k].w++; };
      bump(out.byLevel, h.level);
      bump(out.byCat, h.category);
      const s = out.byScenario[h.scenarioId] = out.byScenario[h.scenarioId] || { n: 0, best: 0, sum: 0, w: 0 };
      s.n++; s.sum += h.score; s.best = Math.max(s.best, h.score); if (h.won) s.w++;
      Object.keys(h.techCounts || {}).forEach(k => {
        const v = h.techCounts[k];
        if (k.startsWith('x_')) { out.mistakes[k.slice(2)] = (out.mistakes[k.slice(2)] || 0) + v.n; return; }
        const t = out.tech[k] = out.tech[k] || { n: 0, q: 0 };
        t.n += v.n; t.q += v.q;
      });
      out.timeline.push({ score: h.score, date: h.date, id: h.scenarioId, won: h.won });
    });
    out.avg = out.played ? Math.round(out.scoreSum / out.played) : 0;
    out.rate = out.played ? Math.round(out.won / out.played * 100) : 0;
    return out;
  }

  function bestScore(id) {
    let b = null;
    history.forEach(h => { if (h.scenarioId === id && (b === null || h.score > b)) b = h.score; });
    return b;
  }

  NX.store = {
    settings, saveSettings, record, reset, aggregate, bestScore, checkAchievements,
    get history() { return history; }, get earned() { return earned; }, ACH
  };
})(typeof window !== 'undefined' ? window : globalThis);
