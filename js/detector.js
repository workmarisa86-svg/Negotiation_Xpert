/* Negotiation Xpert — technique & mistake detector (English / Spanish).
   Pure functions, no DOM. Works in the browser (window.NX) and in Node (tests). */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};

  // ---------- text helpers ----------
  const CONTRACTIONS = [[/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bwhat's\b/g, 'what is'], [/\bit's\b/g, 'it is'],
    [/\bthat's\b/g, 'that is'], [/\bi'll\b/g, 'i will'], [/\byou'll\b/g, 'you will'], [/\bdon't\b/g, 'do not'], [/\bcan't\b/g, 'cannot'],
    [/\bwon't\b/g, 'will not'], [/\bi've\b/g, 'i have'], [/\blet's\b/g, 'lets'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'],
    [/\bisn't\b/g, 'is not'], [/\bdidn't\b/g, 'did not'], [/\bi'd\b/g, 'i would'], [/\byou'd\b/g, 'you would'], [/\bhow's\b/g, 'how is']];
  function fold(s) {
    let r = String(s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[¿¡]/g, ' ')
      .replace(/[“”"«»]/g, ' ')
      .replace(/’/g, "'");
    for (const [re, rep] of CONTRACTIONS) r = r.replace(re, rep);
    return r;
  }
  function words(s) {
    return fold(s).replace(/[^a-z0-9'ñ\s]/g, ' ').split(/\s+/).filter(Boolean);
  }
  function has(text, list) {
    for (const p of list) if (text.indexOf(p) !== -1) return p;
    return null;
  }
  function startsWithAny(text, list) {
    for (const p of list) if (text.startsWith(p)) return p;
    return null;
  }

  const STOP = new Set(('a an the and or but so to of in on at for with is are was were be been it this that these those i you he she we they ' +
    'my your our their me us them do does did have has had will would can could should just very really not no yes ok okay well ' +
    'el la los las un una unos unas y o pero de del en a al con por para es son era fue ser esta este eso esto ese esa lo le les me te se ' +
    'mi tu su nuestro yo tu el ella nosotros ellos que como muy si no ya bien pues').split(/\s+/));

  // ---------- phrase lists (accent-folded) ----------
  const P = {
    label: [
      'it seems like', 'it seems that', 'it seems you', 'seems like', 'it sounds like', 'sounds like', 'it looks like', 'looks like you',
      'it feels like', 'i sense', 'you seem', 'i get the sense', 'i get the feeling', 'it appears', 'i\'m guessing you', 'it must feel',
      'parece que', 'pareces', 'pareciera que', 'suena como', 'suena a que', 'suena que', 'da la impresion', 'tengo la impresion',
      'se nota que', 'se ve que', 'me da la sensacion', 'siento que estas', 'parece como si'
    ],
    calibratedStrong: [
      'how am i supposed to', 'how am i going to', 'what would it take', 'what would need to', 'what needs to happen', 'how can we', 'how could we',
      'how would we', 'what is the biggest', 'what\'s the biggest', 'what is most important', 'what\'s most important', 'what matters most',
      'what\'s driving', 'what is driving', 'what are we trying', 'how would you like', 'what happens if', 'how does this affect', 'what makes this',
      'how do we', 'what would help', 'what\'s the challenge', 'what is the challenge', 'how would that work', 'what\'s important to you',
      'como se supone que', 'como voy a', 'que haria falta', 'que tendria que pasar', 'que necesita pasar', 'como podemos', 'como podriamos',
      'como haríamos', 'como hariamos', 'que es lo mas importante', 'cual es el mayor', 'cual es el principal', 'que te preocupa', 'que le preocupa',
      'que estamos tratando', 'como te gustaria', 'como le gustaria', 'que pasa si', 'como afecta', 'que te ayudaria', 'que le ayudaria', 'como funcionaria',
      'que te importa', 'que le importa', 'que lo hace', 'que hace que'
    ],
    calibratedStart: ['how ', 'what ', 'como ', 'que ', 'cual ', 'cuales '],
    calibratedWeakStart: ['how much', 'what time', 'what is the price', 'what\'s the price', 'cuanto', 'que precio', 'que hora'],
    noOriented: [
      'would it be a bad idea', 'is it a bad idea', 'would it be crazy', 'would it be ridiculous', 'is it ridiculous', 'are you against',
      'are you opposed', 'would you be opposed', 'would you be against', 'have you given up', 'is now a bad time', 'is this a bad time',
      'would you object', 'do you disagree', 'would you mind', 'would it hurt', 'is it unreasonable', 'would it be unreasonable', 'is that a bad idea',
      'would that be a bad idea', 'would it be terrible', 'would it be out of line',
      'seria una mala idea', 'es una mala idea', 'es mala idea', 'seria mala idea', 'estas en contra', 'esta en contra', 'te opondrias',
      'se opondria', 'seria ridiculo', 'es ridiculo si', 'es un mal momento', 'has renunciado', 'ha renunciado', 'seria descabellado',
      'te importaria', 'le importaria', 'seria irrazonable', 'seria terrible', 'te molestaria', 'le molestaria', 'seria un problema si'
    ],
    audit: [
      'you\'re probably going to think', 'you are probably going to think', 'you\'re probably thinking', 'you probably think', 'you might think',
      'you may think', 'you might feel', 'you may feel', 'this may sound', 'this might sound', 'this is going to sound', 'i know this sounds',
      'i know this will sound', 'i know this is going to sound', 'i\'m sure you think', 'you\'re going to think', 'you\'ll probably think',
      'you might be thinking', 'i may come across', 'i know i\'m going to sound', 'you probably feel', 'you\'re probably tired of',
      'probablemente vas a pensar', 'probablemente va a pensar', 'probablemente pienses', 'probablemente piense', 'quizas pienses', 'quiza pienses',
      'quizas piense', 'seguramente pensaras', 'seguramente pensara', 'se que esto va a sonar', 'se que esto suena', 'esto puede sonar',
      'esto va a sonar', 'puede que sientas', 'puede que sienta', 'puede que pienses', 'puede que piense', 'vas a pensar que', 'va a pensar que',
      'seguro piensas', 'seguro piensa', 'quizas sientas', 'probablemente estes cansado', 'probablemente este cansado'
    ],
    summary: [
      'so what i\'m hearing', 'what i\'m hearing is', 'what i hear is', 'let me make sure i understand', 'let me see if i understand', 'if i understand correctly',
      'if i understand you', 'so you\'re saying', 'so you are saying', 'to summarize', 'to sum up', 'in other words', 'what matters most to you is',
      'so for you', 'let me recap', 'so the real issue', 'so basically you', 'correct me if i\'m wrong', 'if i\'ve got this right',
      'entonces lo que escucho', 'lo que escucho es', 'lo que oigo es', 'dejame ver si entiendo', 'dejeme ver si entiendo', 'a ver si entiendo',
      'si entiendo bien', 'si te entiendo bien', 'si le entiendo bien', 'o sea que', 'entonces dices que', 'entonces usted dice', 'en resumen',
      'resumiendo', 'en otras palabras', 'lo que te importa es', 'lo que le importa es', 'corrigeme si me equivoco', 'corrijame si me equivoco',
      'para resumir', 'entonces para ti', 'entonces para usted'
    ],
    empathy: [
      'i understand', 'i can see', 'that must be', 'that must have', 'i hear you', 'i appreciate', 'makes sense', 'that\'s tough', 'that is tough',
      'i can imagine', 'i\'m sorry', 'i am sorry', 'that sounds hard', 'i get it', 'i see where you', 'fair enough', 'i respect', 'thank you for',
      'that\'s understandable', 'totally understandable', 'i know it\'s', 'take your time', 'nobody wants', 'we both want', 'i want to help',
      'entiendo', 'comprendo', 'me imagino', 'debe ser', 'debe haber sido', 'tiene sentido', 'te escucho', 'le escucho', 'aprecio', 'agradezco',
      'lo siento', 'lo lamento', 'es comprensible', 'es entendible', 'te entiendo', 'le entiendo', 'respeto', 'gracias por', 'tomate tu tiempo',
      'tomese su tiempo', 'nadie quiere', 'los dos queremos', 'ambos queremos', 'quiero ayudar', 'me pongo en tu lugar', 'me pongo en su lugar'
    ],
    why: ['why ', 'why?', 'por que ', 'porque no', 'por que?'],
    split: [
      'split the difference', 'meet in the middle', 'meet halfway', 'meet you halfway', 'meet you in the middle', 'split it', 'halfway point', 'go halfway',
      'partir la diferencia', 'partimos la diferencia', 'partamos la diferencia', 'dividir la diferencia', 'dividamos la diferencia', 'a mitad de camino',
      'en el medio', 'en la mitad', 'mitad y mitad', 'quedamos en el medio', 'ni tu ni yo'
    ],
    aggressive: [
      'ridiculous', 'stupid', 'idiot', 'rip off', 'ripoff', 'rip-off', 'take it or leave it', 'shut up', 'you must', 'are you crazy', 'insane',
      'liar', 'you\'re lying', 'you are lying', 'pathetic', 'nonsense', 'i demand', 'or else', 'robbery', 'thief', 'cheat', 'damn', 'hell',
      'useless', 'incompetent', 'dumb', 'last warning', 'i don\'t care', 'calm down', 'give up', 'no chance', 'you will regret', 'shut it',
      'ridiculo', 'estupido', 'idiota', 'tomalo o dejalo', 'tomelo o dejelo', 'callate', 'callese', 'estas loco', 'esta loco',
      'es una broma', 'mentiroso', 'mientes', 'miente', 'patetico', 'tonterias', 'exijo', 'o si no', 'ladron', 'robo', 'tramposo',
      'inutil', 'incompetente', 'me da igual', 'ultima advertencia', 'absurdo', 'calmate', 'calmese', 'tranquilizate', 'rindete', 'rindase', 'no tienes opcion', 'no tienes salida', 'te vas a arrepentir'
    ],
    accept: [
      'deal', 'it\'s a deal', 'agreed', 'i accept', 'i\'ll take it', 'i will take it', 'let\'s do it', 'sounds good', 'you got a deal', 'that works', 'yes',
      'yeah', 'sure', 'fine', 'okay', 'ok', 'alright', 'all right', 'perfect',
      'trato hecho', 'acepto', 'de acuerdo', 'esta bien', 'vale', 'si', 'hecho', 'perfecto', 'me lo llevo', 'hagamoslo', 'cerramos', 'claro', 'listo', 'va'
    ],
    acceptStrong: ['deal', 'agreed', 'i accept', 'i\'ll take it', 'i will take it', 'let\'s do it', 'you got a deal', 'that works', 'it\'s a deal',
      'trato hecho', 'acepto', 'de acuerdo', 'me lo llevo', 'hagamoslo', 'cerramos'],
    walk: [
      'walk away', 'i\'ll pass', 'i will pass', 'no deal', 'i\'ll go elsewhere', 'go somewhere else', 'forget it', 'i\'m leaving', 'i am leaving', 'goodbye',
      'not interested', 'i\'m out', 'i\'ll look elsewhere',
      'me voy', 'no hay trato', 'lo dejo', 'olvidalo', 'olvidelo', 'adios', 'no me interesa', 'buscare en otro lado', 'me retiro'
    ],
    precise: []
  };
  for (const k of Object.keys(P)) P[k] = P[k].map(x => fold(x));

  // ---------- number parsing ----------
  const EN_NUM = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
    thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40,
    fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, half: 0.5 };
  const ES_NUM = { cero: 0, uno: 1, una: 1, un: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11,
    doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiuno: 21,
    veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29,
    treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100, ciento: 100, doscientos: 200,
    trescientos: 300, cuatrocientos: 400, quinientos: 500, seiscientos: 600, setecientos: 700, ochocientos: 800, novecientos: 900 };
  const MULT = { hundred: 100, thousand: 1000, grand: 1000, k: 1000, million: 1e6, millions: 1e6, mil: 1000, millon: 1e6, millones: 1e6 };

  // Converts spelled-out numbers into digits so one regex can read them.
  function wordsToDigits(text) {
    const toks = text.split(/\s+/);
    const out = [];
    let cur = null; // {val, part}
    const flush = () => { if (cur) { out.push(String(cur.total + cur.part)); cur = null; } };
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i].replace(/[^a-z0-9ñ.,:%$-]/g, '');
      const n = EN_NUM[t] !== undefined ? EN_NUM[t] : ES_NUM[t];
      if (n !== undefined && !(t === 'un' || t === 'una' || t === 'half') ) {
        if (!cur) cur = { total: 0, part: 0 };
        cur.part += n;
        continue;
      }
      if ((t === 'y' || t === 'and') && cur && i + 1 < toks.length) {
        const nx = toks[i + 1];
        if (EN_NUM[nx] !== undefined || ES_NUM[nx] !== undefined) continue;
      }
      if (cur && (t === 'hundred')) { cur.part = (cur.part || 1) * 100; continue; }
      if (cur && (t === 'thousand' || t === 'mil' || t === 'grand')) { cur.total += (cur.part || 1) * 1000; cur.part = 0; continue; }
      if (cur && (t === 'million' || t === 'millones' || t === 'millon')) { cur.total += (cur.part || 1) * 1e6; cur.part = 0; continue; }
      if (!cur && (t === 'mil') && !/\d$/.test(out[out.length - 1] || '')) { cur = { total: 1000, part: 0 }; continue; }
      flush();
      out.push(toks[i]);
    }
    flush();
    return out.join(' ');
  }

  // Returns every numeric value mentioned in the text (in plain units).
  function parseNumbers(raw, lang) {
    let text = fold(raw).replace(/\$/g, ' ').replace(/(\d)\s*%/g, '$1 ');
    text = wordsToDigits(text);
    const nums = [];
    const re = /(\d[\d.,]*)\s*(k\b|thousand|grand|mil\b|million(?:s)?|millon(?:es)?)?/g;
    let m;
    while ((m = re.exec(text))) {
      let s = m[1].replace(/[.,]$/, '');
      let v;
      if (lang === 'es') {
        if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
        else if (/^\d+,\d{1,2}$/.test(s)) s = s.replace(',', '.');
        else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
        else s = s.replace(/,/g, '.');
      } else {
        if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
        else if (/^\d+,\d{1,2}$/.test(s)) s = s.replace(',', '.');
        else s = s.replace(/,/g, '');
      }
      v = parseFloat(s);
      if (isNaN(v)) continue;
      const mult = m[2] ? (MULT[m[2]] || (m[2].startsWith('million') || m[2].startsWith('millon') ? 1e6 : 1)) : 1;
      v *= mult;
      // "1.5 million" style handled; "a half"/"y media" handled for small values
      const tail = text.slice(re.lastIndex, re.lastIndex + 12);
      if (/^\s*(and a half|y medio|y media)/.test(tail)) v += 0.5;
      nums.push({ value: v, raw: m[0], index: m.index });
    }
    return nums;
  }

  // Parses a clock time (returns hours as decimal, 24h, e.g. 23.5) — used for curfew style scenarios.
  function parseTimes(raw) {
    const t = wordsToDigits(fold(raw));
    const res = [];
    if (/midnight|medianoche/.test(t)) res.push(24);
    const re = /(\d{1,2})(?:[:.\s](\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?|de la noche|de la tarde)?/g;
    let m;
    while ((m = re.exec(t))) {
      let h = parseInt(m[1], 10);
      if (h > 24) continue;
      let min = m[2] ? parseInt(m[2], 10) : 0;
      if (min >= 60) continue;
      const after = t.slice(re.lastIndex, re.lastIndex + 14);
      if (!m[2] && /^\s*(y media|thirty|30|and a half|y cuarto|fifteen|quarter)/.test(after)) {
        min = /cuarto|fifteen|quarter/.test(after) ? 15 : 30;
      }
      const suf = m[3] || '';
      if (/p|noche|tarde/.test(suf) && h < 12) h += 12;
      else if (!/a/.test(suf) && h >= 7 && h <= 11) h += 12; // curfews are evenings
      else if (h === 12 && !/p/.test(suf)) h = 24;
      if (h <= 12 && h >= 1 && !suf) h += 12;
      res.push(h + min / 60);
    }
    return res;
  }

  // ---------- mirroring ----------
  function lastContentWords(line, n) {
    const ws = words(line);
    const out = [];
    for (let i = ws.length - 1; i >= 0 && out.length < n; i--) {
      if (!STOP.has(ws[i]) && ws[i].length > 2) out.unshift(ws[i]);
    }
    return out;
  }
  function detectMirror(utter, prevLine) {
    if (!prevLine) return null;
    const u = words(utter);
    if (!u.length || u.length > 9) return null;
    const tail = words(prevLine).slice(-6); // last few words, any type
    const key = lastContentWords(prevLine, 3);
    if (!key.length) return null;
    const uset = new Set(u);
    const matchedKey = key.filter(k => uset.has(k));
    // consecutive overlap with the tail
    let best = 0;
    for (let i = 0; i < u.length; i++) {
      for (let j = 0; j < tail.length; j++) {
        let k = 0;
        while (i + k < u.length && j + k < tail.length && u[i + k] === tail[j + k]) k++;
        if (k > best) best = k;
      }
    }
    const lastKey = key[key.length - 1];
    if (matchedKey.length >= 1 && (uset.has(lastKey) || best >= 2)) {
      const exact = u.length <= 5 && (u.length - matchedKey.length) <= 2;
      return { words: matchedKey, exact };
    }
    return null;
  }

  // ---------- main analysis ----------
  /* ctx: { lang, prevLine (counterpart's last line, same language), unit ('usd'|'time'|...) } */
  function analyze(text, ctx) {
    ctx = ctx || {};
    const t = fold(String(text).replace(/[¿¡]/g, '. ')).replace(/[^a-z0-9'ñ\s:.,%$?!;-]/g, ' ').replace(/\s+/g, ' ').trim();
    const f = ' ' + words(text).join(' ') + ' ';
    const wc = words(text).length;
    const tech = [];
    const mistakes = [];
    const meta = {};

    let mirror = null;
    for (const pl of (ctx.prevLines || [ctx.prevLine])) { mirror = detectMirror(text, pl); if (mirror) break; }
    if (mirror) { tech.push('mirroring'); meta.mirror = mirror; }

    if (has(f, P.label)) tech.push('labeling');
    if (has(f, P.noOriented)) tech.push('noOriented');
    if (has(f, P.audit)) tech.push('accusationAudit');
    if (has(f, P.summary)) tech.push('summary');

    // calibrated questions: open how/what questions (anywhere at clause start)
    const clauses = t.split(/[.?!;,]|\bbut\b|\bpero\b|\band\b|\by\b|\bso\b|\bentonces\b/).map(s => s.trim()).filter(Boolean);
    // English how/what phrases are unambiguous anywhere; Spanish que/como only open a question at clause start
    const strongCal = clauses.some(c => P.calibratedStrong.some(p => c.startsWith(p) || (/^(how|what)\b/.test(p) && c.indexOf(' ' + p) !== -1)));
    const calStart = clauses.some(c => startsWithAny(c + ' ', P.calibratedStart) && !startsWithAny(c, ['what if i', 'que si', 'what a ', 'que bien', 'que pena', 'que lastima', 'how about', 'what about', 'que tal', 'what i am hearing', 'what i hear', 'lo que']));
    if (strongCal) { tech.push('calibrated'); meta.calStrong = true; }
    else if (calStart) {
      tech.push('calibrated');
      meta.calWeak = !!clauses.find(c => startsWithAny(c, P.calibratedWeakStart));
    }

    if (has(f, P.empathy) && !tech.includes('labeling') && !tech.includes('summary')) tech.push('empathy');

    // mistakes
    const whyHit = clauses.some(c => /^(why|por que)\b/.test(c)) || / why (did|do|would|are|is|won't|can't|not) /.test(f) || / por que (no|lo|me|te|nos|esta|es|hay) /.test(f);
    if (whyHit && !tech.includes('noOriented')) mistakes.push('why');
    if (has(f, P.split)) mistakes.push('split');
    if (tech.includes('summary') && !strongCal) tech.splice(tech.indexOf('calibrated') >>> 0, tech.includes('calibrated') ? 1 : 0);
    const aggr = has(f, P.aggressive.map(a => ' ' + a + ' ')) || has(f, P.aggressive.filter(a => a.indexOf(' ') !== -1));
    const shouting = /[A-Z]{5,}/.test(text.replace(/[^A-Za-z ]/g, '')) && text === text.toUpperCase();
    const bangs = (text.match(/!/g) || []).length >= 2;
    if (aggr || shouting || bangs) { mistakes.push('aggressive'); meta.aggrWord = aggr; }

    // offers
    let offer = null;
    if (ctx.unit === 'time') {
      const ts = parseTimes(text);
      if (ts.length) offer = ts[ts.length - 1];
    } else {
      const nums = parseNumbers(text, ctx.lang).map(n => n.value);
      if (nums.length) {
        const r = ctx.range;
        const ok = r ? nums.filter(v => v >= r[0] && v <= r[1]) : nums;
        if (ok.length) offer = ok[ok.length - 1];
      }
    }
    if (offer !== null) meta.offer = offer;
    if (has(f, [' waive', ' for free', ' no charge', ' remove the fee', ' drop the fee', ' remove it', ' gratis', ' sin costo', ' sin cargo', ' condon', ' anular', ' anule', ' quitar el cargo', ' quitar el recargo', ' eliminar el recargo', ' eliminar el cargo', ' perdonar', ' cancel the fee', ' free upgrade', ' complimentary', ' de cortesia', ' sin coste'])) meta.zero = true;

    // accept / walk-away intent
    const acceptStrong = has(f, P.acceptStrong.map(a => ' ' + a + ' '));
    const acceptSoft = wc <= 5 && has(f, P.accept.map(a => ' ' + a + ' '));
    if ((acceptStrong || acceptSoft) && !has(f, [' no ', ' not ', ' nunca ', ' never ', ' no deal ', ' no hay trato ', ' cannot ', ' will not ', ' do not '])) meta.accept = true;
    if (has(f, P.walk.map(w => ' ' + w + ' '))) { meta.walk = true; meta.accept = false; }
    if (meta.accept && tech.includes('calibrated')) meta.accept = false;

    meta.wordCount = wc;
    return { techniques: uniq(tech), mistakes: uniq(mistakes), meta };
  }

  function uniq(a) { return Array.from(new Set(a)); }

  // Is the number "precise" (non-round) — a credibility signal in final offers.
  function isPrecise(v) {
    if (v >= 1000) return Math.round(v) % 100 !== 0;
    if (v >= 100) return Math.round(v) % 5 !== 0;
    return Math.round(v * 100) % 100 !== 0 || Math.round(v) % 5 !== 0;
  }

  NX.detector = { analyze, parseNumbers, parseTimes, detectMirror, lastContentWords, fold, words, isPrecise };
  if (typeof module !== 'undefined' && module.exports) module.exports = NX.detector;
})(typeof window !== 'undefined' ? window : globalThis);
