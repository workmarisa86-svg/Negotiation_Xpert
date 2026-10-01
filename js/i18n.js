/* Negotiation Xpert — interface text, coach feedback and coach phrases (English / Spanish).
   Coach text may contain [[termId]] markers; the UI renders those as a term name with an
   expandable glossary explanation. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};

  const en = {
    'app.name': 'Negotiation Xpert',
    'app.tagline': 'Executive negotiation training',
    'nav.scenarios': 'Scenarios', 'nav.glossary': 'Glossary', 'nav.stats': 'Statistics', 'nav.achievements': 'Credentials',
    'theme.toggle': 'Toggle light or dark theme', 'lang.toggle': 'Switch language', 'menu': 'Menu',

    'coach.name': 'Iris Calloway',
    'coach.title': 'Your negotiation coach',
    'coach.bio': 'Twenty years across crisis response and corporate dealmaking. Calm under pressure, precise with words, and entirely on your side.',
    'coach.welcome': 'Every negotiation is a conversation about what people need. Speak out loud, listen closely, and I will show you what is working and what to try next.',

    'home.eyebrow': 'Voice-based practice',
    'home.title': 'Practise the conversations that matter.',
    'home.sub': 'Fifty realistic negotiations, from a market stall to a crisis call. Speak your lines, read the room, and get precise feedback from your coach.',
    'home.count': '{n} scenarios',
    'home.empty': 'No scenarios match these filters.',

    'filter.level': 'Difficulty', 'filter.category': 'Category', 'filter.all': 'All', 'filter.mode': 'Mode',
    'mode.coach': 'Coach Mode', 'mode.challenge': 'Challenge Mode',
    'mode.coach.desc': 'Live feedback after every line, with hints.',
    'mode.challenge.desc': 'No coaching until the full review at the end.',
    'btn.random': 'Random', 'btn.randomTitle': 'Pick a random scenario (within the selected difficulty) with randomized prices and motivations',
    'btn.start': 'Start', 'btn.brief': 'View briefing',

    'level.beginner': 'Beginner', 'level.easy': 'Easy', 'level.medium': 'Medium', 'level.hard': 'Hard', 'level.impossible': 'Impossible',
    'level.beginner.d': 'Everyday situations, small stakes, a friendly counterpart.',
    'level.easy.d': 'Common situations with a little more resistance.',
    'level.medium.d': 'Occasional situations; they push back and hide information.',
    'level.hard.d': 'Major life and career moments; skilled, pressuring counterparts.',
    'level.impossible.d': 'Crises and expert opponents; one wrong move makes it worse.',

    'cat.everyday': 'Everyday Buying', 'cat.home': 'Home & Family', 'cat.work': 'Work & Career',
    'cat.business': 'Freelance & Business', 'cat.crisis': 'Crisis & Hostage', 'cat.expert': 'Expert Challenges',

    'card.opening': 'Opening', 'card.target': 'Target', 'card.best': 'Best score', 'card.new': 'Not yet played', 'card.goal': 'Goal',

    'brief.situation': 'Situation', 'brief.counterpart': 'Counterpart', 'brief.goal': 'Your objective', 'brief.opening': 'Their opening position',
    'brief.target': 'Your target', 'brief.coachTip': 'Coach’s preparation note', 'brief.begin': 'Begin negotiation', 'brief.back': 'Back',
    'brief.randomized': 'Randomized: prices and hidden motivations vary on this run.', 'brief.mode': 'Session mode',
    'brief.voiceNote': 'Hold the microphone button and speak. You can always type instead.',

    'play.position': 'Their position', 'play.yourTarget': 'Your target', 'play.lastOffer': 'Your last offer',
    'play.trust': 'Rapport', 'play.tension': 'Tension', 'play.progress': 'Resolution',
    'play.revealed': 'Hidden information', 'play.revealedCount': '{n} of {total} uncovered',
    'play.turn': 'Exchange {n} of {max}', 'play.coach': 'Coach', 'play.coachEmpty': 'Speak or type your first line. I will comment on each one.',
    'play.hint': 'Hint', 'play.end': 'End', 'play.endConfirm': 'End this negotiation now? It will be scored as it stands.',
    'play.typePlaceholder': 'Type your reply…', 'play.send': 'Send',
    'play.hold': 'Hold to speak', 'play.listening': 'Listening… release to send', 'play.processing': 'Processing…',
    'play.micUnsupported': 'Speech recognition is not available in this browser. Type your replies instead (Chrome, Edge and Safari support voice).',
    'play.micDenied': 'Microphone access was blocked. Allow it in your browser settings, or type your replies.',
    'play.micNothing': 'I did not catch that. Try again, a little closer to the microphone.',
    'play.voiceOn': 'Voice on', 'play.voiceOff': 'Voice off',
    'play.tacticUsed': 'Tactic used on you', 'play.spotTitle': 'Which technique is being used on you?',
    'play.spotRight': 'Correct: {name}.', 'play.spotWrong': 'Not quite. That was {name}.',
    'play.thatsRight': 'Breakthrough: “That’s right”', 'play.reveal': 'Hidden information revealed', 'play.milestone': 'Progress',
    'play.better': 'Try instead', 'play.next': 'Next move', 'play.challengeNote': 'Challenge Mode: coaching is hidden until the final review.',
    'play.you': 'You', 'play.hintTitle': 'Coach’s hint', 'play.status': 'Status', 'play.conversation': 'Conversation',
    'play.detected': 'Detected', 'play.nothing': 'No technique', 'play.useHint': 'Use this phrase',

    'rating.excellent': 'Excellent', 'rating.strong': 'Strong', 'rating.good': 'Good', 'rating.weak': 'Weak', 'rating.mistake': 'Mistake',

    'report.title': 'Negotiation review', 'report.score': 'Score', 'report.outcome': 'Outcome',
    'report.won': 'Objective achieved', 'report.lost': 'Objective not achieved',
    'outcome.deal': 'Agreement reached', 'outcome.nodeal': 'No agreement', 'outcome.resolved': 'Resolved safely',
    'outcome.failed': 'Situation escalated', 'outcome.unresolved': 'Unresolved',
    'report.final': 'Final', 'report.target': 'Target', 'report.opening': 'Opening', 'report.saved': 'Saved vs. opening', 'report.gained': 'Gained vs. opening',
    'report.techniques': 'Techniques used', 'report.missed': 'Missed opportunities', 'report.transcript': 'Annotated transcript',
    'report.breakdown': 'Score breakdown', 'b.outcome': 'Outcome', 'b.technique': 'Technique quality', 'b.variety': 'Variety', 'b.relationship': 'Relationship',
    'report.replay': 'Replay', 'report.back': 'All scenarios', 'report.spot': 'Tactics identified', 'report.newAch': 'Credentials earned',
    'report.lesson': 'Coach’s debrief', 'report.safety': 'Real-world safety guidance', 'report.noneMissed': 'Nothing significant. A complete performance.',
    'report.noTech': 'No techniques detected in this session.', 'report.uses': '{n}×', 'report.progressReached': 'Resolution reached: {n}%',
    'report.vsTarget': 'vs. target', 'report.revealed': 'Hidden information uncovered', 'report.thatsRight': '“That’s right” moment',
    'yes': 'Yes', 'no': 'No',

    'miss.reveals': '{n} hidden motivation(s) stayed hidden. More [[labeling]] and a well-placed [[calibrated]] would have surfaced them.',
    'miss.thatsRight': 'You never reached [[thatsRight]]. Summarize their situation and feelings once you understand them.',
    'miss.ackerman': 'You did not use [[ackerman]]. A planned sequence of shrinking offers protects your target.',
    'miss.audit': 'No [[accusationAudit]]. Opening by naming the negatives defuses resistance early.',
    'miss.label': 'No [[labeling]]. Naming emotions is the fastest way to lower tension.',
    'miss.mirror': 'No [[mirroring]]. Repeating a few key words keeps them talking at almost no cost.',
    'miss.calibrated': 'No [[calibrated]]. “How” and “What” questions let them solve your problem.',
    'miss.tactics': '{n} pressure tactic(s) went unanswered. Respond to pressure with a label or calibrated question, not a concession.',
    'miss.target': 'The agreement landed short of your target. Hold your number longer and let silence work.',

    'glos.title': 'Glossary & technique library', 'glos.sub': 'Every technique, tactic and term used in training, in plain language.',
    'glos.search': 'Search terms…', 'glos.cat.all': 'All', 'glos.cat.core': 'Core techniques', 'glos.cat.bargain': 'Bargaining',
    'glos.cat.tactics': 'Opponent tactics', 'glos.cat.mistakes': 'Common mistakes', 'glos.cat.concepts': 'Key concepts',
    'glos.what': 'What it means', 'glos.when': 'When to use it', 'glos.mistake': 'Common mistake', 'glos.example': 'Example phrase',
    'glos.against': 'Used against you', 'glos.againstHint': 'Opponents use this on you in Hard, Impossible and Final Boss scenarios.', 'glos.none': 'No terms match your search.',
    'glos.explain': 'Show explanation',

    'stats.title': 'Statistics', 'stats.sub': 'Your performance history, saved privately in this browser.',
    'stats.played': 'Played', 'stats.won': 'Won', 'stats.lost': 'Lost', 'stats.rate': 'Success rate', 'stats.saved': 'Money saved or gained', 'stats.avg': 'Average score',
    'stats.byLevel': 'Success rate by difficulty', 'stats.byCat': 'Success rate by category', 'stats.byScenario': 'Scores by scenario',
    'stats.techUsage': 'Technique usage and effectiveness', 'stats.progress': 'Score over time', 'stats.mistakes': 'Mistakes made',
    'stats.reset': 'Reset statistics', 'stats.resetTitle': 'Reset all statistics?', 'stats.resetBody': 'This permanently deletes your history, scores and credentials from this browser. It cannot be undone.',
    'stats.cancel': 'Cancel', 'stats.confirm': 'Delete everything', 'stats.empty': 'No sessions yet. Complete a negotiation to see your statistics.',
    'stats.scenario': 'Scenario', 'stats.plays': 'Plays', 'stats.best': 'Best', 'stats.avgScore': 'Average', 'stats.uses': 'uses', 'stats.effect': 'effectiveness',
    'stats.score': 'Score', 'stats.session': 'Session', 'stats.wonOf': '{w} of {n} won', 'stats.noData': 'No sessions', 'stats.moving': '5-session average',

    'ach.title': 'Credentials', 'ach.sub': 'Professional milestones earned through practice.', 'ach.earned': 'Earned {date}', 'ach.locked': 'Not yet earned',
    'ach.id': 'Credential no.', 'ach.progress': '{n} of {total} earned', 'toast.ach': 'Credential earned',
    'common.close': 'Close', 'common.of': 'of'
  };

  const es = {
    'app.name': 'Negotiation Xpert',
    'app.tagline': 'Entrenamiento ejecutivo en negociación',
    'nav.scenarios': 'Escenarios', 'nav.glossary': 'Glosario', 'nav.stats': 'Estadísticas', 'nav.achievements': 'Credenciales',
    'theme.toggle': 'Cambiar entre tema claro y oscuro', 'lang.toggle': 'Cambiar idioma', 'menu': 'Menú',

    'coach.name': 'Iris Calloway',
    'coach.title': 'Tu coach de negociación',
    'coach.bio': 'Veinte años entre la gestión de crisis y las negociaciones corporativas. Serena bajo presión, precisa con las palabras y completamente de tu lado.',
    'coach.welcome': 'Toda negociación es una conversación sobre lo que la gente necesita. Habla en voz alta, escucha con atención y te mostraré qué funciona y qué probar después.',

    'home.eyebrow': 'Práctica por voz',
    'home.title': 'Practica las conversaciones que importan.',
    'home.sub': 'Cincuenta negociaciones realistas, desde un puesto del mercado hasta una llamada de crisis. Di tus frases, lee la situación y recibe retroalimentación precisa de tu coach.',
    'home.count': '{n} escenarios',
    'home.empty': 'Ningún escenario coincide con estos filtros.',

    'filter.level': 'Dificultad', 'filter.category': 'Categoría', 'filter.all': 'Todos', 'filter.mode': 'Modo',
    'mode.coach': 'Modo Coach', 'mode.challenge': 'Modo Desafío',
    'mode.coach.desc': 'Retroalimentación tras cada frase, con pistas.',
    'mode.challenge.desc': 'Sin coaching hasta la revisión completa al final.',
    'btn.random': 'Aleatorio', 'btn.randomTitle': 'Elegir un escenario aleatorio (dentro de la dificultad seleccionada) con precios y motivaciones aleatorios',
    'btn.start': 'Comenzar', 'btn.brief': 'Ver informe',

    'level.beginner': 'Principiante', 'level.easy': 'Fácil', 'level.medium': 'Intermedio', 'level.hard': 'Difícil', 'level.impossible': 'Imposible',
    'level.beginner.d': 'Situaciones cotidianas, poco en juego, una contraparte amable.',
    'level.easy.d': 'Situaciones comunes con algo más de resistencia.',
    'level.medium.d': 'Situaciones ocasionales; la contraparte se resiste y oculta información.',
    'level.hard.d': 'Momentos clave de la vida y la carrera; contrapartes hábiles que presionan.',
    'level.impossible.d': 'Crisis y oponentes expertos; un paso en falso lo empeora todo.',

    'cat.everyday': 'Compras cotidianas', 'cat.home': 'Hogar y familia', 'cat.work': 'Trabajo y carrera',
    'cat.business': 'Freelance y negocios', 'cat.crisis': 'Crisis y rehenes', 'cat.expert': 'Desafíos expertos',

    'card.opening': 'Apertura', 'card.target': 'Objetivo', 'card.best': 'Mejor puntuación', 'card.new': 'Sin jugar', 'card.goal': 'Meta',

    'brief.situation': 'Situación', 'brief.counterpart': 'Contraparte', 'brief.goal': 'Tu objetivo', 'brief.opening': 'Su posición inicial',
    'brief.target': 'Tu objetivo', 'brief.coachTip': 'Nota de preparación de tu coach', 'brief.begin': 'Iniciar negociación', 'brief.back': 'Volver',
    'brief.randomized': 'Aleatorio: los precios y las motivaciones ocultas cambian en esta partida.', 'brief.mode': 'Modo de sesión',
    'brief.voiceNote': 'Mantén pulsado el botón del micrófono y habla. Siempre puedes escribir.',

    'play.position': 'Su posición', 'play.yourTarget': 'Tu objetivo', 'play.lastOffer': 'Tu última oferta',
    'play.trust': 'Sintonía', 'play.tension': 'Tensión', 'play.progress': 'Resolución',
    'play.revealed': 'Información oculta', 'play.revealedCount': '{n} de {total} descubiertas',
    'play.turn': 'Intercambio {n} de {max}', 'play.coach': 'Coach', 'play.coachEmpty': 'Di o escribe tu primera frase. Comentaré cada una.',
    'play.hint': 'Pista', 'play.end': 'Terminar', 'play.endConfirm': '¿Terminar esta negociación ahora? Se puntuará tal como está.',
    'play.typePlaceholder': 'Escribe tu respuesta…', 'play.send': 'Enviar',
    'play.hold': 'Mantén pulsado para hablar', 'play.listening': 'Escuchando… suelta para enviar', 'play.processing': 'Procesando…',
    'play.micUnsupported': 'El reconocimiento de voz no está disponible en este navegador. Escribe tus respuestas (Chrome, Edge y Safari admiten voz).',
    'play.micDenied': 'Se bloqueó el acceso al micrófono. Permítelo en la configuración del navegador o escribe tus respuestas.',
    'play.micNothing': 'No te escuché bien. Inténtalo de nuevo, un poco más cerca del micrófono.',
    'play.voiceOn': 'Voz activada', 'play.voiceOff': 'Voz desactivada',
    'play.tacticUsed': 'Táctica usada contra ti', 'play.spotTitle': '¿Qué técnica están usando contigo?',
    'play.spotRight': 'Correcto: {name}.', 'play.spotWrong': 'No exactamente. Era {name}.',
    'play.thatsRight': 'Punto de quiebre: «Así es»', 'play.reveal': 'Información oculta revelada', 'play.milestone': 'Avance',
    'play.better': 'Prueba con', 'play.next': 'Siguiente paso', 'play.challengeNote': 'Modo Desafío: el coaching se muestra solo en la revisión final.',
    'play.you': 'Tú', 'play.hintTitle': 'Pista de tu coach', 'play.status': 'Estado', 'play.conversation': 'Conversación',
    'play.detected': 'Detectado', 'play.nothing': 'Sin técnica', 'play.useHint': 'Usar esta frase',

    'rating.excellent': 'Excelente', 'rating.strong': 'Sólido', 'rating.good': 'Bien', 'rating.weak': 'Débil', 'rating.mistake': 'Error',

    'report.title': 'Revisión de la negociación', 'report.score': 'Puntuación', 'report.outcome': 'Resultado',
    'report.won': 'Objetivo logrado', 'report.lost': 'Objetivo no logrado',
    'outcome.deal': 'Acuerdo alcanzado', 'outcome.nodeal': 'Sin acuerdo', 'outcome.resolved': 'Resuelto con seguridad',
    'outcome.failed': 'La situación se agravó', 'outcome.unresolved': 'Sin resolver',
    'report.final': 'Final', 'report.target': 'Objetivo', 'report.opening': 'Apertura', 'report.saved': 'Ahorro frente a la apertura', 'report.gained': 'Ganancia frente a la apertura',
    'report.techniques': 'Técnicas utilizadas', 'report.missed': 'Oportunidades perdidas', 'report.transcript': 'Transcripción comentada',
    'report.breakdown': 'Desglose de la puntuación', 'b.outcome': 'Resultado', 'b.technique': 'Calidad técnica', 'b.variety': 'Variedad', 'b.relationship': 'Relación',
    'report.replay': 'Repetir', 'report.back': 'Todos los escenarios', 'report.spot': 'Tácticas identificadas', 'report.newAch': 'Credenciales obtenidas',
    'report.lesson': 'Análisis de tu coach', 'report.safety': 'Recomendaciones de seguridad reales', 'report.noneMissed': 'Nada significativo. Una actuación completa.',
    'report.noTech': 'No se detectaron técnicas en esta sesión.', 'report.uses': '{n}×', 'report.progressReached': 'Resolución alcanzada: {n}%',
    'report.vsTarget': 'frente al objetivo', 'report.revealed': 'Información oculta descubierta', 'report.thatsRight': 'Momento «Así es»',
    'yes': 'Sí', 'no': 'No',

    'miss.reveals': '{n} motivación(es) oculta(s) no salieron a la luz. Más [[labeling]] y alguna [[calibrated]] bien colocada las habrían revelado.',
    'miss.thatsRight': 'Nunca llegaste a un [[thatsRight]]. Resume su situación y sus emociones cuando las entiendas.',
    'miss.ackerman': 'No usaste el [[ackerman]]. Una secuencia planificada de ofertas decrecientes protege tu objetivo.',
    'miss.audit': 'Sin [[accusationAudit]]. Empezar nombrando lo negativo desactiva la resistencia desde el principio.',
    'miss.label': 'Sin [[labeling]]. Nombrar emociones es la forma más rápida de bajar la tensión.',
    'miss.mirror': 'Sin [[mirroring]]. Repetir unas palabras clave mantiene a la otra parte hablando casi sin coste.',
    'miss.calibrated': 'Ninguna [[calibrated]]. Las preguntas con «cómo» y «qué» hacen que la otra parte resuelva tu problema.',
    'miss.tactics': '{n} táctica(s) de presión quedaron sin respuesta. Responde a la presión con una etiqueta o una pregunta calibrada, no con una concesión.',
    'miss.target': 'El acuerdo quedó por debajo de tu objetivo. Sostén tu cifra más tiempo y deja que el silencio trabaje.',

    'glos.title': 'Glosario y biblioteca de técnicas', 'glos.sub': 'Cada técnica, táctica y término del entrenamiento, en lenguaje claro.',
    'glos.search': 'Buscar términos…', 'glos.cat.all': 'Todos', 'glos.cat.core': 'Técnicas clave', 'glos.cat.bargain': 'Regateo',
    'glos.cat.tactics': 'Tácticas del oponente', 'glos.cat.mistakes': 'Errores comunes', 'glos.cat.concepts': 'Conceptos clave',
    'glos.what': 'Qué significa', 'glos.when': 'Cuándo usarlo', 'glos.mistake': 'Error común', 'glos.example': 'Frase de ejemplo',
    'glos.against': 'Usada contra ti', 'glos.againstHint': 'Los oponentes la usan contra ti en los escenarios Difícil, Imposible y Jefe Final.', 'glos.none': 'Ningún término coincide con tu búsqueda.',
    'glos.explain': 'Mostrar explicación',

    'stats.title': 'Estadísticas', 'stats.sub': 'Tu historial de rendimiento, guardado de forma privada en este navegador.',
    'stats.played': 'Jugadas', 'stats.won': 'Ganadas', 'stats.lost': 'Perdidas', 'stats.rate': 'Tasa de éxito', 'stats.saved': 'Dinero ahorrado o ganado', 'stats.avg': 'Puntuación media',
    'stats.byLevel': 'Tasa de éxito por dificultad', 'stats.byCat': 'Tasa de éxito por categoría', 'stats.byScenario': 'Puntuaciones por escenario',
    'stats.techUsage': 'Uso y eficacia de las técnicas', 'stats.progress': 'Puntuación a lo largo del tiempo', 'stats.mistakes': 'Errores cometidos',
    'stats.reset': 'Restablecer estadísticas', 'stats.resetTitle': '¿Restablecer todas las estadísticas?', 'stats.resetBody': 'Esto elimina de forma permanente tu historial, puntuaciones y credenciales de este navegador. No se puede deshacer.',
    'stats.cancel': 'Cancelar', 'stats.confirm': 'Eliminar todo', 'stats.empty': 'Aún no hay sesiones. Completa una negociación para ver tus estadísticas.',
    'stats.scenario': 'Escenario', 'stats.plays': 'Partidas', 'stats.best': 'Mejor', 'stats.avgScore': 'Media', 'stats.uses': 'usos', 'stats.effect': 'eficacia',
    'stats.score': 'Puntuación', 'stats.session': 'Sesión', 'stats.wonOf': '{w} de {n} ganadas', 'stats.noData': 'Sin sesiones', 'stats.moving': 'Media de 5 sesiones',

    'ach.title': 'Credenciales', 'ach.sub': 'Hitos profesionales obtenidos con la práctica.', 'ach.earned': 'Obtenida el {date}', 'ach.locked': 'Aún no obtenida',
    'ach.id': 'Credencial n.º', 'ach.progress': '{n} de {total} obtenidas', 'toast.ach': 'Credencial obtenida',
    'common.close': 'Cerrar', 'common.of': 'de'
  };

  // Coach feedback notes (keys produced by the engine)
  const notes = {
    en: {
      'n.mirror.exact': 'Clean [[mirroring]]. Repeating their last few words invites them to keep talking, and they usually reveal more than a direct question would get.',
      'n.mirror': 'That works as [[mirroring]], but shorter is stronger: repeat only their last one to three key words, with a curious, upward tone.',
      'n.label': 'Good [[labeling]]. Naming what they seem to feel shows you understand them without agreeing or arguing.',
      'n.label.tension': 'Excellent [[labeling]], at exactly the right moment. Naming an emotion when pressure is high takes the heat out of it: people calm down once they feel heard.',
      'n.calStrong': 'Strong [[calibrated]]. An open “how” or “what” question asks them to solve your problem and gives them a sense of control.',
      'n.cal': 'An open question, which is good. Sharpen it into a fuller [[calibrated]] by pointing it at their challenge or constraints.',
      'n.calWeak': 'Questions about price or quantity are closed questions in disguise. A [[calibrated]] that explores their situation uncovers far more.',
      'n.no': 'Well-built [[noOriented]]. Saying “no” makes people feel safe and in control, so they relax and engage.',
      'n.audit.early': 'Excellent [[accusationAudit]]. Naming the negatives up front, before they can, takes the sting out of them.',
      'n.audit': 'A useful [[accusationAudit]]. It works best at the very start, or just before you deliver bad news or a low offer.',
      'n.empathy': 'This shows [[tacticalEmpathy]]. Make it more powerful by turning it into a label: “It sounds like…” lands better than “I understand.”',
      'n.summary.tr': 'You earned a [[thatsRight]]. A summary that captures both their situation and their feelings creates a real breakthrough: they now feel understood.',
      'n.summary.yr': 'You summarized, but you got “you’re right” instead of [[thatsRight]]. That often means “please stop talking.” Include their feelings and motives, not only the facts.',
      'n.summary.early': 'A [[summary]] works best once you know their motives. Uncover hidden information first with labels and calibrated questions.',
      'n.ackStep': '[[ackerman]] step {n} of 4. Keep your increments shrinking so each move signals you are approaching your limit.',
      'n.ackDone': 'You completed the [[ackerman]] sequence. Shrinking increments make your final number feel like a genuine limit.',
      'n.precise': 'Ending on a [[preciseNumber]] makes it sound calculated and final.',
      'n.notPrecise': 'Tip: finish the sequence on a [[preciseNumber]]. Round numbers invite more haggling.',
      'n.anchorStrong': 'A strong opening [[anchoring]]. An ambitious first number pulls the whole negotiation toward your side.',
      'n.anchorWeak': 'Your first offer sat close to their position, which is weak [[anchoring]]. You gave away room you could have used.',
      'n.offerPlain': 'A bare number with no framing. Wrap offers in a technique, such as a [[noOriented]], and follow the [[ackerman]] pattern.',
      'n.accept.good': 'You closed at or beyond your target. Well timed.',
      'n.accept.short': 'You accepted short of your target. Before saying yes, test it with a [[calibrated]] such as “How am I supposed to do that?”',
      'n.walk': 'Walking away is your [[batna]] in action. Use it only when you are truly prepared to leave: it can produce a final offer, or end the talks.',
      'n.combo': 'Combining techniques in one line made the move stronger.',
      'n.repeat': 'Same technique several times in a row. Skilled counterparts notice patterns, so vary your approach.',
      'n.handled': 'You answered pressure with a technique instead of a concession. That is how you neutralize [[deadlinePressure]] and similar tactics.',
      'n.none': 'No technique detected. Every line is a chance to build trust or gather information.',
      'n.reveal': 'Hidden information revealed. This is your [[leverage]]; use it in your next moves.',
      'n.turnsLeft': 'Only {left} exchanges left. Time to move toward a close.',
      'n.varietyCap': 'They are almost there, but not fully persuaded. At this level you need at least {req} different core techniques.',
      'n.insult': 'That offer felt insulting because there was no rapport yet. An [[extremeAnchor]] needs trust, or an [[accusationAudit]], first.',
      'm.why': '[[whyQuestions]] sound accusatory and put people on the defensive. Rephrase with “What” or “How.”',
      'm.split': '[[splitDifference]] rewards whoever opened most extreme and usually leaves you worse off.',
      'm.aggressive': 'That came across as an [[aggressiveTone]]. Pressure raises defenses; calm, curious language lowers them.',
      'm.raiseFast': 'You were [[raisingTooQuickly]]. Big jumps signal plenty of room left, so they will keep pushing.',
      'm.yesFast': '[[yesTooFast]]. Agreeing early leaves value on the table and can make the other side wonder what they missed.',
      'm.caved': 'You conceded right after a pressure tactic. Recognize the tactic, label it, and hold your number.',
      'm.overpay': 'You offered more than they were already asking for. Always check their latest number before making a [[concession]].',
      'm.pay': 'Never send money or share payment details under pressure. Here, payment is exactly what the other side wants.'
    },
    es: {
      'n.mirror.exact': 'Un [[mirroring]] limpio. Repetir sus últimas palabras le invita a seguir hablando, y normalmente revela más de lo que conseguiría una pregunta directa.',
      'n.mirror': 'Funciona como [[mirroring]], pero más corto es más eficaz: repite solo sus últimas una a tres palabras clave, con tono curioso y ascendente.',
      'n.label': 'Buen [[labeling]]. Nombrar lo que parece sentir demuestra que lo entiendes sin darle la razón ni discutir.',
      'n.label.tension': 'Excelente [[labeling]], justo en el momento adecuado. Nombrar una emoción cuando la presión es alta la desactiva: la gente se calma cuando se siente escuchada.',
      'n.calStrong': 'Una sólida [[calibrated]]. Una pregunta abierta con «cómo» o «qué» le pide que resuelva tu problema y le da sensación de control.',
      'n.cal': 'Una pregunta abierta, y eso está bien. Conviértela en una [[calibrated]] más afinada orientándola a sus retos o limitaciones.',
      'n.calWeak': 'Las preguntas sobre precio o cantidad son preguntas cerradas disfrazadas. Una [[calibrated]] que explore su situación revela mucho más.',
      'n.no': 'Una [[noOriented]] bien construida. Decir «no» hace que la gente se sienta segura y con el control, así que se relaja y participa.',
      'n.audit.early': 'Excelente [[accusationAudit]]. Nombrar lo negativo de entrada, antes que la otra parte, le quita toda su fuerza.',
      'n.audit': 'Una [[accusationAudit]] útil. Funciona mejor al principio o justo antes de dar una mala noticia o una oferta baja.',
      'n.empathy': 'Esto muestra [[tacticalEmpathy]]. Hazlo más potente convirtiéndolo en una etiqueta: «Parece que…» funciona mejor que «Entiendo».',
      'n.summary.tr': 'Conseguiste un [[thatsRight]]. Un resumen que recoge su situación y sus emociones crea un verdadero punto de quiebre: ahora se siente comprendido.',
      'n.summary.yr': 'Resumiste, pero obtuviste un «tienes razón» en lugar de un [[thatsRight]]. A menudo significa «deja de hablar». Incluye sus emociones y motivos, no solo los hechos.',
      'n.summary.early': 'Un [[summary]] funciona mejor cuando ya conoces sus motivos. Descubre primero la información oculta con etiquetas y preguntas calibradas.',
      'n.ackStep': 'Paso {n} de 4 del [[ackerman]]. Mantén incrementos cada vez menores para que cada movimiento indique que te acercas a tu límite.',
      'n.ackDone': 'Completaste la secuencia del [[ackerman]]. Los incrementos decrecientes hacen que tu cifra final parezca un límite real.',
      'n.precise': 'Terminar con un [[preciseNumber]] hace que suene calculado y definitivo.',
      'n.notPrecise': 'Consejo: termina la secuencia con un [[preciseNumber]]. Las cifras redondas invitan a seguir regateando.',
      'n.anchorStrong': 'Un sólido [[anchoring]] de apertura. Una primera cifra ambiciosa inclina toda la negociación hacia tu lado.',
      'n.anchorWeak': 'Tu primera oferta quedó muy cerca de su posición: un [[anchoring]] débil. Cediste margen que podrías haber usado.',
      'n.offerPlain': 'Una cifra sin ningún encuadre. Envuelve tus ofertas en una técnica, como una [[noOriented]], y sigue el patrón del [[ackerman]].',
      'n.accept.good': 'Cerraste en tu objetivo o por encima. Buen momento.',
      'n.accept.short': 'Aceptaste por debajo de tu objetivo. Antes de decir que sí, prueba con una [[calibrated]] como «¿Cómo se supone que haga eso?».',
      'n.walk': 'Retirarte es tu [[batna]] en acción. Úsalo solo cuando de verdad estés dispuesto a irte: puede provocar una oferta final o terminar la negociación.',
      'n.combo': 'Combinar técnicas en una misma frase reforzó el movimiento.',
      'n.repeat': 'La misma técnica varias veces seguidas. Las contrapartes hábiles detectan patrones, así que varía tu enfoque.',
      'n.handled': 'Respondiste a la presión con una técnica en lugar de una concesión. Así se neutraliza la [[deadlinePressure]] y otras tácticas similares.',
      'n.none': 'No se detectó ninguna técnica. Cada frase es una oportunidad para generar confianza u obtener información.',
      'n.reveal': 'Información oculta revelada. Este es tu [[leverage]]; úsalo en tus próximos movimientos.',
      'n.turnsLeft': 'Solo quedan {left} intercambios. Es momento de avanzar hacia el cierre.',
      'n.varietyCap': 'Está a punto de ceder, pero no del todo convencido. En este nivel necesitas al menos {req} técnicas clave distintas.',
      'n.insult': 'Esa oferta resultó ofensiva porque aún no había sintonía. Un [[extremeAnchor]] necesita confianza, o una [[accusationAudit]], antes.',
      'm.why': 'Las [[whyQuestions]] suenan acusatorias y ponen a la gente a la defensiva. Reformúlalas con «qué» o «cómo».',
      'm.split': '[[splitDifference]] premia a quien abrió de forma más extrema y suele dejarte en peor posición.',
      'm.aggressive': 'Eso sonó con un [[aggressiveTone]]. La presión levanta defensas; un lenguaje sereno y curioso las baja.',
      'm.raiseFast': 'Estás [[raisingTooQuickly]]. Los saltos grandes indican que queda mucho margen, así que seguirán presionando.',
      'm.yesFast': '[[yesTooFast]]. Aceptar pronto deja valor sobre la mesa y puede hacer que la otra parte se pregunte qué se le escapó.',
      'm.caved': 'Cediste justo después de una táctica de presión. Reconoce la táctica, etiquétala y sostén tu cifra.',
      'm.overpay': 'Ofreciste más de lo que ya te pedían. Revisa siempre su última cifra antes de hacer una [[concession]].',
      'm.pay': 'Nunca envíes dinero ni compartas datos de pago bajo presión. Aquí, el pago es exactamente lo que busca la otra parte.'
    }
  };

  const L = (en, es) => ({ en, es });
  NX.coachPhrases = {
    labelTension: L('It sounds like you’re under a lot of pressure right now.', 'Parece que estás bajo mucha presión en este momento.'),
    labelCrisis: L('It sounds like you feel nobody has been listening to you.', 'Parece que sientes que nadie te ha estado escuchando.'),
    labelCrisis2: L('It seems like things got out of control faster than you expected.', 'Parece que las cosas se salieron de control más rápido de lo que esperabas.'),
    audit: L('You’re probably going to think I’m being unreasonable, and that this is going to be a hassle.', 'Probablemente vas a pensar que estoy siendo poco razonable y que esto va a ser una molestia.'),
    auditBiz: L('You’re probably going to think my position is unrealistic, and that I don’t appreciate what you bring to the table.', 'Probablemente vas a pensar que mi posición no es realista y que no valoro lo que aportas.'),
    auditCrisis: L('You probably think I’m just stalling, or that nobody here cares what happens to you.', 'Probablemente pienses que solo estoy ganando tiempo o que a nadie aquí le importa lo que te pase.'),
    label: L('It seems like there’s more going on here than you’ve told me.', 'Parece que hay algo más detrás de esto de lo que me has contado.'),
    no: L('Would it be a bad idea to look at this from a different angle?', '¿Sería una mala idea verlo desde otro ángulo?'),
    noCrisis: L('Would it be a bad idea to make sure nobody gets hurt while we work this out?', '¿Sería una mala idea asegurarnos de que nadie salga lastimado mientras lo resolvemos?'),
    noDeal: L('Are you against finding something that works for both of us?', '¿Estás en contra de buscar algo que funcione para los dos?'),
    summary: L('So what I’m hearing is that [summarize their situation and how they feel about it]. Is that it?', 'Entonces lo que escucho es que [resume su situación y cómo se siente al respecto]. ¿Es así?'),
    calibrated: [
      L('How am I supposed to do that?', '¿Cómo se supone que haga eso?'),
      L('What’s the biggest challenge for you here?', '¿Cuál es el mayor reto para ti en esto?'),
      L('What would need to happen for this to work for both of us?', '¿Qué tendría que pasar para que esto funcione para los dos?')
    ],
    calCrisis: L('What do you need right now so that everyone gets through this safely?', '¿Qué necesitas ahora mismo para que todos salgamos de esto a salvo?'),
    ack1: L('Would it be a bad idea if I offered {x}?', '¿Sería una mala idea si te ofrezco {x}?'),
    ackMid: L('I hear you. How about {x}? I’m really stretching here.', 'Te entiendo. ¿Qué tal {x}? Ya me estoy estirando bastante.'),
    ack4: L('{x}. That’s honestly everything I’ve got.', '{x}. Sinceramente, es todo lo que tengo.'),
    fix: {
      why: { tech: 'calibrated', phrase: L('What makes this the right number for you?', '¿Qué hace que esta sea la cifra adecuada para ti?') },
      aggressive: { tech: 'labeling', phrase: L('It seems like we’re both getting frustrated. Can we take a step back?', 'Parece que los dos nos estamos frustrando. ¿Podemos dar un paso atrás?') },
      split: { tech: 'calibrated', phrase: L('How am I supposed to do that?', '¿Cómo se supone que haga eso?') },
      raiseFast: { tech: 'calibrated', phrase: L('How am I supposed to do that? (then hold your number)', '¿Cómo se supone que haga eso? (y luego sostén tu cifra)') },
      yesFast: { tech: 'calibrated', phrase: L('We’re close. How can we make it work a little better for me?', 'Estamos cerca. ¿Cómo podemos hacer que funcione un poco mejor para mí?') },
      caved: { tech: 'labeling', phrase: L('It sounds like you’re working against a tight deadline.', 'Parece que trabajas con una fecha límite muy ajustada.') },
      overpay: { tech: 'calibrated', phrase: L('That works for me. How soon can we finalize it?', 'Eso me funciona. ¿Qué tan pronto podemos cerrarlo?') },
      pay: { tech: 'calibrated', phrase: L('How do I know my family member is with you? I need to speak with them first.', '¿Cómo sé que mi familiar está contigo? Primero necesito hablar con él.') }
    }
  };

  // Crisis debrief shown in every Crisis & Hostage report
  NX.crisisLesson = L(
    'In a crisis, the person on the other end is usually overwhelmed, frightened or desperate, and a frightened brain cannot negotiate. Calm, slow speech, labels that name what they feel, and open questions lower the emotional temperature so they can think again. Every minute of calm conversation is a minute in which nobody gets hurt, more options appear, and trust builds. Professional negotiators never argue, never threaten and never rush: they listen until the other side feels understood, then help them choose the safe way out.',
    'En una crisis, la persona al otro lado suele estar desbordada, asustada o desesperada, y un cerebro asustado no puede negociar. Hablar con calma y despacio, usar etiquetas que nombran lo que siente y hacer preguntas abiertas baja la temperatura emocional para que vuelva a pensar con claridad. Cada minuto de conversación serena es un minuto en el que nadie sale lastimado, aparecen más opciones y se construye confianza. Los negociadores profesionales nunca discuten, nunca amenazan y nunca apresuran: escuchan hasta que la otra parte se siente comprendida y luego la ayudan a elegir la salida segura.'
  );

  let lang = 'en';
  function t(key, params) {
    const dict = lang === 'es' ? es : en;
    let s = dict[key] !== undefined ? dict[key] : (notes[lang][key] !== undefined ? notes[lang][key] : (en[key] !== undefined ? en[key] : key));
    if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (params[k] !== undefined ? params[k] : m));
    return s;
  }
  NX.i18n = {
    t, dict: { en, es }, notes,
    get lang() { return lang; },
    set lang(v) { lang = v === 'es' ? 'es' : 'en'; }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = NX.i18n;
})(typeof window !== 'undefined' ? window : globalThis);
