/* Negotiation Xpert — browser speech recognition (push-to-talk) and speech synthesis.
   Uses only built-in Web Speech APIs; degrades gracefully to typing. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  const SR = root.SpeechRecognition || root.webkitSpeechRecognition;
  const synth = root.speechSynthesis;
  const LOCALE = { en: 'en-US', es: 'es-ES' };

  // ---------- recognition ----------
  let rec = null, listening = false, finalText = '', handlers = {};
  function supported() { return !!SR; }

  function start(lang, h) {
    if (!SR) { h.onError && h.onError('unsupported'); return false; }
    if (listening) return true;
    stopSpeaking();
    handlers = h || {};
    finalText = '';
    try {
      rec = new SR();
      rec.lang = LOCALE[lang] || 'en-US';
      rec.interimResults = true;
      rec.continuous = true;
      rec.maxAlternatives = 1;
      rec.onresult = e => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) finalText += (finalText ? ' ' : '') + r[0].transcript.trim();
          else interim += r[0].transcript;
        }
        handlers.onInterim && handlers.onInterim((finalText + ' ' + interim).trim());
      };
      rec.onerror = e => {
        const code = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'denied' : (e.error === 'no-speech' ? 'nothing' : e.error);
        handlers.onError && handlers.onError(code);
      };
      rec.onend = () => {
        listening = false;
        const txt = finalText.trim();
        handlers.onEnd && handlers.onEnd(txt);
      };
      rec.start();
      listening = true;
      handlers.onStart && handlers.onStart();
      return true;
    } catch (err) {
      listening = false;
      handlers.onError && handlers.onError('failed');
      return false;
    }
  }
  function stop() {
    if (rec && listening) { try { rec.stop(); } catch (e) { /* already stopped */ } }
  }
  function abort() {
    if (rec) { try { rec.onend = null; rec.abort(); } catch (e) { /* ignore */ } }
    listening = false;
  }

  // ---------- synthesis ----------
  let voices = [];
  function loadVoices() { voices = synth ? synth.getVoices() : []; }
  if (synth) { loadVoices(); if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', loadVoices); else synth.onvoiceschanged = loadVoices; }

  const FEMALE = /female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|susan|hazel|helena|laura|paulina|monica|mónica|sabina|lucia|lucía|elena|catherine|allison|ava|serena|kate|salli|joanna|kendra|kimberly|ivy|penelope|lupe|conchita|marisol|sofia|sofía|ximena|dalia|elvira|jenny|aria|emma|libby|sonia|natasha|google us english|google español de estados unidos|amélie|ines|inés|esperanza|valeria|camila|renata|francisca|catalina|larissa|nora/i;
  const MALE = /\bmale\b|daniel|alex\b|fred|david|mark|jorge|diego|juan|carlos|pablo|enrique|miguel|rishi|aaron|tom\b|oliver|george|guy|ryan|eric|alvaro|álvaro|raul|raúl|gonzalo|jamie|arthur|thomas|antonio|federico|tomas|tomás|andrew|brian|christopher|roger|google uk english male/i;

  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

  function pickVoice(lang, gender, seed) {
    const pref = lang === 'es' ? 'es' : 'en';
    const pool = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(pref));
    if (!pool.length) return null;
    const want = gender === 'f' ? FEMALE : MALE;
    const avoid = gender === 'f' ? MALE : FEMALE;
    let matched = pool.filter(v => want.test(v.name) && !avoid.test(v.name.replace(want, '')));
    if (!matched.length) matched = pool.filter(v => !avoid.test(v.name));
    if (!matched.length) matched = pool;
    return matched[hash(seed || '') % matched.length];
  }

  function speak(text, opts) {
    if (!synth || !text) return;
    opts = opts || {};
    try {
      const u = new SpeechSynthesisUtterance(text.replace(/\(.*?\)/g, ''));
      u.lang = LOCALE[opts.lang] || 'en-US';
      const v = pickVoice(opts.lang, opts.gender, opts.seed);
      if (v) u.voice = v;
      const h = hash(opts.seed || 'x');
      // distinct characters still sound different when only one voice is installed
      u.pitch = (opts.gender === 'f' ? 1.08 : 0.9) + ((h % 7) - 3) * 0.03;
      u.rate = opts.rate || (0.96 + ((h >> 3) % 5) * 0.02);
      if (opts.onend) u.onend = opts.onend;
      synth.speak(u);
    } catch (e) { /* synthesis unavailable */ }
  }
  function stopSpeaking() { if (synth) { try { synth.cancel(); } catch (e) { /* ignore */ } } }

  NX.speech = {
    supported, start, stop, abort, speak, stopSpeaking,
    get listening() { return listening; },
    get canSpeak() { return !!synth; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
