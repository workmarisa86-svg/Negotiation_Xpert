/* Run with:  node tests/run-tests.js
   1) detector unit tests (EN/ES)   2) scenario data validation
   3) simulated playthroughs: a skilled bot must win every scenario in both languages,
      a careless bot must not. */
'use strict';
const path = require('path');
const assert = require('assert');
const root = path.join(__dirname, '..', 'js');
['i18n.js', 'glossary.js', 'detector.js', 'lines.js', 'engine.js'].forEach(f => require(path.join(root, f)));
const fs = require('fs');
fs.readdirSync(path.join(root, 'scenarios')).sort().forEach(f => require(path.join(root, 'scenarios', f)));
const NX = globalThis.NX;

let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; } catch (e) { fail++; console.log('FAIL', name, '\n   ', e.message); }
}

// ---------- 1. detector ----------
const D = NX.detector;
const cases = [
  ['en', 'It sounds like you have had a long day', 'labeling'],
  ['es', 'Parece que ha sido un día largo', 'labeling'],
  ['en', 'It seems like the timing is bad for you', 'labeling'],
  ['es', 'Suena como que estás muy ocupado', 'labeling'],
  ['en', 'How am I supposed to do that?', 'calibrated'],
  ['es', '¿Cómo se supone que haga eso?', 'calibrated'],
  ['en', 'What is the biggest challenge you face?', 'calibrated'],
  ['es', '¿Qué es lo más importante para ti?', 'calibrated'],
  ['en', 'Would it be a bad idea to try something different?', 'noOriented'],
  ['es', '¿Sería una mala idea probar algo distinto?', 'noOriented'],
  ['en', 'You are probably going to think I am cheap', 'accusationAudit'],
  ['es', 'Probablemente vas a pensar que soy tacaño', 'accusationAudit'],
  ['en', "So what I'm hearing is you need to sell today", 'summary'],
  ['es', 'Entonces lo que escucho es que necesitas vender hoy', 'summary'],
  ['en', 'I understand, that must be frustrating', 'empathy'],
  ['es', 'Entiendo, debe ser frustrante', 'empathy']
];
cases.forEach(([lang, text, tech]) => test(`detect ${tech} (${lang}): ${text}`, () => {
  const r = D.analyze(text, { lang });
  assert(r.techniques.includes(tech), JSON.stringify(r));
}));
const mistakes = [
  ['en', 'Why is it so expensive?', 'why'], ['es', '¿Por qué es tan caro?', 'why'],
  ['en', "Let's split the difference", 'split'], ['es', 'Partamos la diferencia', 'split'],
  ['en', 'This is a ridiculous rip-off', 'aggressive'], ['es', 'Esto es un robo, es ridículo', 'aggressive']
];
mistakes.forEach(([lang, text, m]) => test(`mistake ${m} (${lang})`, () => {
  assert(D.analyze(text, { lang }).mistakes.includes(m));
}));
test('no false "why" for Spanish "porque"', () => assert(!D.analyze('Porque necesito ahorrar', { lang: 'es' }).mistakes.includes('why')));
test('mirror EN', () => assert(D.analyze('end of the day?', { lang: 'en', prevLine: 'I need to sell these before the end of the day.' }).techniques.includes('mirroring')));
test('mirror ES', () => assert(D.analyze('¿antes del cierre?', { lang: 'es', prevLine: 'Tengo que venderlas antes del cierre.' }).techniques.includes('mirroring')));
test('numbers EN', () => assert.strictEqual(D.analyze('I can do 2,350', { lang: 'en', range: [0, 5000] }).meta.offer, 2350));
test('numbers ES thousands', () => assert.strictEqual(D.analyze('te ofrezco 1.200', { lang: 'es', range: [0, 5000] }).meta.offer, 1200));
test('numbers words ES', () => assert.strictEqual(D.analyze('veinticinco mil', { lang: 'es', range: [0, 90000] }).meta.offer, 25000));
test('numbers k', () => assert.strictEqual(D.analyze('how about 85k', { lang: 'en', range: [0, 200000] }).meta.offer, 85000));
test('time parse', () => assert.strictEqual(D.analyze('a las once y media', { lang: 'es', unit: 'time' }).meta.offer, 23.5));
test('accept', () => assert(D.analyze('Deal', { lang: 'en' }).meta.accept));
test('accept ES', () => assert(D.analyze('Trato hecho', { lang: 'es' }).meta.accept));
test('"de hecho" is not acceptance', () => assert(!D.analyze('De hecho, prefiero esperar un poco', { lang: 'es' }).meta.accept));

// ---------- 2. scenario validation ----------
const S = NX.scenarios || [];
const LV = NX.engine.LEVEL_ORDER;
test('scenario ids unique', () => {
  const ids = S.map(s => s.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});
const bi = (o, name) => { assert(o && typeof o.en === 'string' && typeof o.es === 'string' && o.en && o.es, name + ' must have en+es'); };
S.forEach(s => test('valid data: ' + s.id, () => {
  assert(LV.includes(s.level), 'level');
  assert(NX.engine.CATEGORIES.includes(s.category), 'category ' + s.category);
  assert(['deal', 'resolve'].includes(s.type), 'type');
  assert(NX.lines.registers[s.register], 'register ' + s.register);
  ['title', 'brief', 'goal', 'open', 'deal', 'tip', 'item'].forEach(k => bi(s[k], k));
  bi(s.who.role, 'who.role'); assert(s.who.name && s.who.gender, 'who');
  assert(s.motives && s.motives.length >= 3, 'motives >= 3');
  s.motives.forEach((m, i) => bi(m, 'motive ' + i));
  if (s.type === 'deal') {
    assert(typeof s.start === 'number' && typeof s.target === 'number' && s.start !== s.target, 'prices');
    assert(NX.engine.UNITS[s.unit], 'unit');
    if (s.nodeal) bi(s.nodeal, 'nodeal');
  } else {
    assert(s.milestones && s.milestones.length === 3, 'milestones');
    s.milestones.forEach((m, i) => bi(m, 'milestone ' + i));
  }
  if (s.fail) bi(s.fail, 'fail');
  if (s.endNotes) s.endNotes.forEach((m, i) => bi(m, 'endNote ' + i));
  // placeholders in EN and ES must match
  const ph = str => (str.match(/\{\w+\}/g) || []).sort().join();
  ['open', 'goal', 'deal'].forEach(k => assert.strictEqual(ph(s[k].en), ph(s[k].es), 'placeholders differ in ' + k));
  (s.tactics || []).forEach(t => assert(NX.lines.TACTICS[t], 'tactic ' + t));
}));
test('glossary terms bilingual', () => {
  NX.glossary.terms.forEach(g => ['name', 'what', 'when', 'mistake', 'example'].forEach(k => bi(g[k], g.id + '.' + k)));
});
test('every [[term]] used by the coach exists in the glossary', () => {
  const ids = new Set(NX.glossary.terms.map(g => g.id));
  const all = JSON.stringify(NX.i18n.notes) + JSON.stringify(NX.i18n.dict);
  (all.match(/\[\[(\w+)\]\]/g) || []).forEach(m => assert(ids.has(m.slice(2, -2)), 'missing term ' + m));
});

// ---------- 3. simulated players ----------
function seeded(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const P = {
  en: {
    audit: "You're probably going to think I'm being difficult, and that this will be a hassle.",
    label: ['It sounds like this has been a stressful time for you.', 'It seems like you have a lot riding on this.', 'It looks like you care a lot about doing this right.'],
    cal: ["What's the biggest challenge for you here?", 'How can we make this work for both of us?', 'What would need to happen for you to feel good about this?'],
    no: 'Would it be a bad idea to talk about what you really need?',
    summary: "So what I'm hearing is that you're under real pressure and you want to be treated fairly. Is that it?",
    ack: x => `Would it be a bad idea if I offered ${x}?`, ackMid: x => `I understand. I could stretch to ${x}.`, ackEnd: x => `${x}. That is honestly everything I have.`,
    accept: 'Deal.'
  },
  es: {
    audit: 'Probablemente vas a pensar que estoy siendo difícil y que esto será una molestia.',
    label: ['Parece que ha sido una época estresante para ti.', 'Parece que tienes mucho en juego con esto.', 'Suena como que te importa mucho hacerlo bien.'],
    cal: ['¿Cuál es el mayor reto para ti en esto?', '¿Cómo podemos hacer que esto funcione para los dos?', '¿Qué tendría que pasar para que te sientas bien con esto?'],
    no: '¿Sería una mala idea hablar de lo que realmente necesitas?',
    summary: 'Entonces lo que escucho es que estás bajo mucha presión y quieres que te traten con justicia. ¿Es así?',
    ack: x => `¿Sería una mala idea si te ofrezco ${x}?`, ackMid: x => `Entiendo. Podría estirarme hasta ${x}.`, ackEnd: x => `${x}. Sinceramente es todo lo que tengo.`,
    accept: 'Trato hecho.'
  }
};
function numStr(v, lang) { // speak numbers plainly, as speech recognition would
  const r = Math.round(v * 100) / 100;
  return lang === 'es' ? String(r).replace('.', ',') : String(r);
}
function timeStr(v) { const h = Math.floor(v), m = Math.round((v - h) * 60); return `${h > 12 ? h - 12 : h}:${String(m).padStart(2, '0')} pm`; }

function goodBot(sc, lang, seed) {
  const g = NX.engine.create(sc, { lang, rng: seeded(seed), random: seed > 1 });
  g.start();
  const p = P[lang];
  let i = 0, res, ackIdx = 0;
  const s = g.scenario;
  const money = s.type === 'deal' && NX.engine.UNITS[s.unit].money && s.target && s.ackerman !== false;
  const ratios = [0.65, 0.85, 0.95, 1.0];
  while (!g.state.ended && i < 40) {
    const st = g.snapshot();
    const lt = g.state.transcript.filter(e => e.who === 'them').pop();
    let line;
    if (g.state.quiz && !g.state.quiz.answered) g.spot(g.state.quiz.correct);
    const ready = s.type === 'deal' && (st.revealed >= st.reveals && st.thatsRight || st.turn >= 9);
    if (i === 0) line = p.audit;
    else if (ready) {
      if (money) {
        if (ackIdx < 4) {
          const r = ratios[ackIdx];
          let x = s.dir < 0 ? s.target * r : s.target * (2 - r);
          if (ackIdx === 3) x = s.dir < 0 ? s.target - (s.target >= 1000 ? 37 : s.target >= 100 ? 3 : 0.15) : s.target + (s.target >= 1000 ? 37 : s.target >= 100 ? 3 : 0.15);
          else x = Math.round(x / (s.step || 1)) * (s.step || 1);
          const xs = numStr(x, lang);
          line = ackIdx === 0 ? p.ack(xs) : ackIdx === 3 ? p.ackEnd(xs) : p.ackMid(xs);
          ackIdx++;
        } else line = p.accept;
      } else {
        // non-money deals: ask for the target, then accept
        if (ackIdx < 2) { const x = s.unit === 'time' ? timeStr(s.target) : numStr(s.target, lang); line = p.ack(x); ackIdx++; }
        else line = p.accept;
      }
    } else if (st.tension >= 45) line = p.label[i % 3];
    else if (st.revealed >= 1 && !st.thatsRight && (st.revealed >= st.reveals || i >= 6)) line = p.summary;
    else {
      const k = i % 4;
      if (k === 1) line = p.label[(i >> 2) % 3];
      else if (k === 2) line = p.cal[(i >> 2) % 3];
      else if (k === 3 && lt) {
        const txt = g.render(lt, lang);
        const w = txt.replace(/[¿?¡!.,;:"]/g, '').trim().split(/\s+/).slice(-2).join(' ');
        line = (lang === 'es' ? '¿' : '') + w + '?';
      } else line = p.no;
    }
    res = g.say(line, lang);
    i++;
  }
  if (process.env.TRACE === sc.id + ':' + lang + ':' + seed) {
    g.state.transcript.forEach(e => console.log(e.who === 'me' ? 'ME: ' + e.text + '  [' + e.coach.rating + ' ' + e.coach.tech + ' ' + e.coach.mistakes + ']' : '   ' + (e.tactic ? '(' + e.tactic + ') ' : '') + g.render(e, lang)));
  }
  return g.state.result;
}
const BAD = {
  en: ['Why is it so expensive?', 'That is ridiculous.', "Let's split the difference.", 'Why would I accept that?', 'This is a rip-off.', 'Fine.'],
  es: ['¿Por qué es tan caro?', 'Eso es ridículo.', 'Partamos la diferencia.', '¿Por qué aceptaría eso?', 'Esto es un robo.', 'Vale.']
};
function badBot(sc, lang) {
  const g = NX.engine.create(sc, { lang, rng: seeded(7) });
  g.start();
  let i = 0;
  while (!g.state.ended && i < 40) { g.say(BAD[lang][i % BAD[lang].length], lang); i++; }
  if (!g.state.ended) g.finish();
  return g.state.result;
}

// A player who only ever uses one technique should not beat Medium or above.
function oneTrickBot(sc, lang) {
  const g = NX.engine.create(sc, { lang, rng: seeded(3) });
  g.start();
  const lab = P[lang].label;
  let i = 0;
  while (!g.state.ended && i < 40) {
    let line = lab[i % 3];
    if (i >= 9 && sc.type === 'deal') line = i === 9 ? P[lang].ack(sc.unit === 'time' ? timeStr(sc.target) : numStr(sc.target, lang)) : P[lang].accept;
    g.say(line, lang); i++;
  }
  if (!g.state.ended) g.finish();
  return g.state.result;
}
const summary = [];
S.forEach(sc => {
  ['en', 'es'].forEach(lang => {
    test(`skilled player wins: ${sc.id} [${lang}]`, () => {
      const r = goodBot(sc, lang, 1);
      summary.push([sc.level, sc.id, lang, r.outcome, r.score, r.turns]);
      assert(r.won, `outcome=${r.outcome} f=${r.f.toFixed(2)} score=${r.score} turns=${r.turns}`);
      assert(r.score >= 60, 'score ' + r.score);
    });
    test(`skilled player wins randomized: ${sc.id} [${lang}]`, () => {
      const r = goodBot(sc, lang, 99);
      assert(r.won, `outcome=${r.outcome} f=${r.f.toFixed(2)} score=${r.score}`);
    });
    if (LV.indexOf(sc.level) >= 2) test(`one-trick player does not win: ${sc.id} [${lang}]`, () => {
      const r = oneTrickBot(sc, lang);
      assert(!r.won, `outcome=${r.outcome} f=${r.f.toFixed(2)} score=${r.score}`);
    });
    test(`careless player does not win: ${sc.id} [${lang}]`, () => {
      const r = badBot(sc, lang);
      assert(!r.won && r.score < 50, `outcome=${r.outcome} score=${r.score}`);
    });
  });
});

// ---------- 4. installable app (PWA) ----------
const rootDir = path.join(__dirname, '..');
const stamp = require(path.join(rootDir, 'tools', 'stamp-sw.js'));
const swSrc = fs.readFileSync(stamp.swPath, 'utf8');
const assets = stamp.assetsOf(swSrc);
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
test('every precached file exists', () => assets.filter(a => a !== './').forEach(a => assert(fs.existsSync(path.join(rootDir, a)), 'missing ' + a)));
test('every local file used by index.html is precached for offline use', () => {
  const refs = (html.match(/(?:src|href)="([^"#:]+)"/g) || []).map(m => './' + m.split('"')[1]);
  refs.forEach(r => assert(assets.includes(r), r + ' is not in sw.js ASSETS'));
});
test('manifest is valid and its icons are precached', () => {
  const m = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.webmanifest'), 'utf8'));
  ['name', 'short_name', 'start_url', 'display', 'icons'].forEach(k => assert(m[k], 'manifest.' + k));
  assert(m.icons.some(i => i.sizes === '192x192') && m.icons.some(i => i.sizes === '512x512') && m.icons.some(i => i.purpose === 'maskable'), 'icon sizes');
  m.icons.forEach(i => assert(assets.includes('./' + i.src), i.src + ' not precached'));
});
test('sw.js VERSION was bumped for the current files (run: node tools/stamp-sw.js)', () => {
  const cur = stamp.current(swSrc);
  assert.strictEqual(cur.build, stamp.computeBuild(swSrc), 'sw.js is stale: run node tools/stamp-sw.js');
});
test('every interface string exists in English and Spanish', () => {
  const { en, es } = NX.i18n.dict;
  Object.keys(en).forEach(k => assert(es[k] !== undefined, 'missing es: ' + k));
  Object.keys(es).forEach(k => assert(en[k] !== undefined, 'missing en: ' + k));
});

if (process.argv.includes('-v')) summary.forEach(r => console.log(r.join('\t')));
console.log(`\n${pass} passed, ${fail} failed  (${S.length} scenarios)`);
process.exit(fail ? 1 : 0);
