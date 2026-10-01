/* Negotiation Xpert — reusable counterpart dialogue, grouped by "register".
   Scenarios pick a register; scenario-specific lines (opening, hidden motivations,
   outcomes) live in the scenario data. Placeholders: {price} {offer} {item} {name}. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  const L = (en, es) => ({ en, es });

  const casual = {
    mirror: [
      L('Yeah... I mean, it\'s just how things are for me right now. I\'ve got my reasons.', 'Sí... o sea, así están las cosas para mí ahora mismo. Tengo mis razones.'),
      L('Right, exactly. It\'s been one of those weeks, honestly.', 'Exacto. Ha sido una de esas semanas, la verdad.'),
      L('Mm-hm. Well, let me put it this way: it\'s not as simple as it looks.', 'Ajá. Bueno, digámoslo así: no es tan simple como parece.')
    ],
    label: [
      L('Ha... yeah, you noticed. It\'s been a bit much lately.', 'Ja... sí, se nota. Últimamente ha sido mucho.'),
      L('That\'s... actually pretty accurate. Most people don\'t pick up on that.', 'Eso... la verdad es bastante acertado. Casi nadie se da cuenta.'),
      L('I guess it does. I didn\'t think it showed.', 'Supongo que sí. No pensé que se notara.')
    ],
    calibrated: [
      L('Hmm. Good question. Let me think about what would actually work for me.', 'Mmm. Buena pregunta. Déjame pensar qué me funcionaría de verdad.'),
      L('Well... I suppose that depends on a couple of things.', 'Bueno... supongo que depende de un par de cosas.'),
      L('I hadn\'t really thought about it that way.', 'No lo había pensado de esa forma.')
    ],
    noOriented: [
      L('No, no, not a bad idea at all. Go on.', 'No, no, para nada es mala idea. Dime.'),
      L('No... I\'m not against it. Tell me what you have in mind.', 'No... no estoy en contra. Cuéntame qué tienes en mente.')
    ],
    audit: [
      L('Ha! No, I don\'t think that. You seem reasonable.', '¡Ja! No, no pienso eso. Pareces una persona razonable.'),
      L('Well, now that you said it, I can\'t really think that, can I?', 'Bueno, ya que lo dices, ya no puedo pensarlo, ¿verdad?')
    ],
    empathy: [
      L('Thanks. I appreciate you saying that.', 'Gracias. Te agradezco que lo digas.'),
      L('Yeah, well... thanks.', 'Sí, bueno... gracias.')
    ],
    thatsRight: [
      L('That\'s right. That\'s exactly it.', 'Eso es. Exactamente eso.'),
      L('That\'s right... wow, yes. That\'s the whole thing.', 'Así es... vaya, sí. Ese es todo el asunto.')
    ],
    youreRight: [
      L('You\'re right, you\'re right... anyway.', 'Tienes razón, tienes razón... en fin.'),
      L('Sure, you\'re right. So, what do you want to do?', 'Claro, tienes razón. Entonces, ¿qué quieres hacer?')
    ],
    why: [
      L('Why? Because that\'s what it is. I don\'t have to explain myself.', '¿Por qué? Porque así es. No tengo que darte explicaciones.'),
      L('What do you mean, why? Are you saying I\'m being unfair?', '¿Cómo que por qué? ¿Me estás diciendo que soy injusto?')
    ],
    aggressive: [
      L('Whoa, okay. There\'s no need to talk to me like that.', 'Oye, tranquilo. No hace falta hablarme así.'),
      L('Hey, I\'m trying to be nice here. Don\'t make me regret it.', 'Oye, estoy intentando ser amable. No hagas que me arrepienta.')
    ],
    split: [
      L('Split it? Then I\'m the one losing out. No, let\'s not do that.', '¿Partirlo a la mitad? Entonces salgo perdiendo yo. No, mejor no.'),
      L('Meeting in the middle sounds fair, but your middle isn\'t my middle.', 'Quedar en el medio suena justo, pero tu medio no es mi medio.')
    ],
    neutral: [
      L('Like I said, {price} is what I\'m asking.', 'Como te dije, {price} es lo que pido.'),
      L('I hear you, but {price} is a fair price.', 'Te entiendo, pero {price} es un precio justo.'),
      L('So... {price}. What do you say?', 'Entonces... {price}. ¿Qué dices?')
    ],
    neutralR: [
      L('I don\'t know. I still feel the same about it.', 'No sé. Sigo pensando lo mismo.'),
      L('Okay... but I\'m not convinced yet.', 'Vale... pero todavía no me convences.')
    ],
    counter: [
      L('Hmm. I can\'t do that, but I could go to {price}.', 'Mmm. Eso no puedo, pero podría dejarlo en {price}.'),
      L('You\'re close. How about {price}?', 'Estás cerca. ¿Qué tal {price}?')
    ],
    reject: [
      L('{offer}? Oh, no, I can\'t go that low. {price}, maybe.', '¿{offer}? Ay, no, tan bajo no puedo. {price}, quizás.'),
      L('That\'s too far for me. The best I can do right now is {price}.', 'Eso es demasiado para mí. Lo mejor que puedo hacer ahora es {price}.')
    ],
    accept: [
      L('Alright, {price}. You\'ve got yourself a deal.', 'Está bien, {price}. Trato hecho.'),
      L('{price}... okay, fine. Deal.', '{price}... vale, de acuerdo. Trato hecho.')
    ],
    concede: [
      L('Look, for you, I could do {price}.', 'Mira, para ti, podría dejarlo en {price}.'),
      L('Okay, okay. {price}. How does that sound?', 'Vale, vale. {price}. ¿Qué te parece?')
    ],
    final: [
      L('Wait, wait. Don\'t go. {price}, and that\'s really my last offer.', 'Espera, espera. No te vayas. {price}, y es de verdad mi última oferta.')
    ],
    leave: [
      L('Okay, well. Maybe another time.', 'Bueno, pues. Quizás en otra ocasión.')
    ],
    insulted: [
      L('Come on, now that\'s a little insulting.', 'Vamos, eso ya es un poco ofensivo.')
    ],
    repeat: [
      L('Why do you keep saying it like that? It\'s a little strange.', '¿Por qué lo dices siempre así? Es un poco raro.')
    ]
  };

  const service = {
    mirror: [
      L('Yes, that\'s our standard policy. I do have some flexibility in certain cases, though.', 'Sí, es nuestra política estándar. Aunque tengo cierta flexibilidad en algunos casos.'),
      L('Right. Let me check what I\'m seeing on my screen here...', 'Correcto. Déjeme revisar lo que veo aquí en mi pantalla...'),
      L('Exactly. It\'s the way the system is set up, unfortunately.', 'Exacto. Así está configurado el sistema, lamentablemente.')
    ],
    label: [
      L('Honestly? Yes. It\'s been a long shift, and most calls aren\'t this pleasant.', '¿Sinceramente? Sí. Ha sido un turno largo y la mayoría de las llamadas no son tan agradables.'),
      L('I appreciate you noticing. My hands are tied on a lot of things.', 'Le agradezco que lo note. Tengo las manos atadas en muchas cosas.')
    ],
    calibrated: [
      L('Let me see what options I have available for you.', 'Déjeme ver qué opciones tengo disponibles para usted.'),
      L('That\'s a fair question. Let me look into it.', 'Es una pregunta justa. Déjeme revisarlo.')
    ],
    noOriented: [
      L('No, that\'s not a bad idea. Let me see what I can do.', 'No, no es mala idea. Déjeme ver qué puedo hacer.'),
      L('No, I\'m not against that at all.', 'No, para nada estoy en contra.')
    ],
    audit: [
      L('Oh, no, not at all. You\'ve been very polite.', 'Oh, no, para nada. Ha sido usted muy amable.'),
      L('Ha, no, believe me, I\'ve heard much worse today.', 'Ja, no, créame, hoy he escuchado cosas mucho peores.')
    ],
    empathy: [
      L('Thank you. I really do want to help you.', 'Gracias. De verdad quiero ayudarle.'),
      L('I appreciate your patience.', 'Agradezco su paciencia.')
    ],
    thatsRight: [
      L('That\'s right. That\'s exactly the situation.', 'Así es. Esa es exactamente la situación.'),
      L('That\'s right. You understand how it works here.', 'Así es. Usted entiende cómo funciona esto.')
    ],
    youreRight: [
      L('You\'re right. Is there anything else I can help you with?', 'Tiene razón. ¿Hay algo más en lo que pueda ayudarle?')
    ],
    why: [
      L('Why? Because that\'s the policy. I don\'t make the rules.', '¿Por qué? Porque es la política. Yo no pongo las reglas.'),
      L('I\'m not sure what you want me to say. That\'s just how it is.', 'No sé qué quiere que le diga. Así son las cosas.')
    ],
    aggressive: [
      L('Sir or ma\'am, I need you to keep this respectful, or I\'ll have to end the call.', 'Necesito que mantengamos el respeto, o tendré que terminar la llamada.'),
      L('I understand you\'re upset, but speaking to me like that won\'t change the policy.', 'Entiendo que esté molesto, pero hablarme así no va a cambiar la política.')
    ],
    split: [
      L('I\'m afraid I can\'t just split amounts. I need a reason I can put in the system.', 'Me temo que no puedo simplemente partir cantidades. Necesito un motivo que pueda poner en el sistema.')
    ],
    neutral: [
      L('What I can offer right now is {price}.', 'Lo que puedo ofrecerle ahora es {price}.'),
      L('According to the system, it\'s {price}.', 'Según el sistema, son {price}.')
    ],
    neutralR: [
      L('I understand. Unfortunately, I still have the same options in front of me.', 'Entiendo. Lamentablemente, sigo teniendo las mismas opciones.')
    ],
    counter: [
      L('I can\'t authorize that, but I can do {price}.', 'No puedo autorizar eso, pero puedo hacer {price}.'),
      L('Let me try something... the system will accept {price}.', 'Déjeme intentar algo... el sistema acepta {price}.')
    ],
    reject: [
      L('{offer} isn\'t something I\'m able to approve. The best I have is {price}.', '{offer} no es algo que pueda aprobar. Lo mejor que tengo es {price}.')
    ],
    accept: [
      L('Okay. I\'ve applied it: {price}. You\'ll see it on your account.', 'Listo. Lo he aplicado: {price}. Lo verá en su cuenta.'),
      L('Done. {price} it is. Thank you for your patience.', 'Hecho. Quedamos en {price}. Gracias por su paciencia.')
    ],
    concede: [
      L('Let me check with my supervisor... okay, I can offer {price}.', 'Déjeme consultarlo con mi supervisor... bien, puedo ofrecerle {price}.'),
      L('I found an option: {price}. That\'s a special adjustment.', 'Encontré una opción: {price}. Es un ajuste especial.')
    ],
    final: [
      L('Before you go, there\'s a retention option I can apply: {price}. That\'s the lowest in my system.', 'Antes de que se vaya, hay una opción de retención: {price}. Es lo mínimo que me permite el sistema.')
    ],
    leave: [
      L('I understand. Thank you for calling.', 'Entiendo. Gracias por llamar.')
    ],
    insulted: [
      L('That\'s not a realistic number for us, I\'m afraid.', 'Me temo que esa cifra no es realista para nosotros.')
    ],
    repeat: [
      L('I feel like we\'re going in circles.', 'Siento que estamos dando vueltas en círculo.')
    ]
  };

  const business = {
    mirror: [
      L('Yes. And frankly, there\'s more context behind that than you might expect.', 'Sí. Y, francamente, hay más contexto detrás de eso de lo que imaginas.'),
      L('That\'s right. Let me give you a bit of background.', 'Así es. Déjame darte un poco de contexto.'),
      L('Exactly. Our position is based on some real constraints.', 'Exacto. Nuestra posición se basa en limitaciones reales.')
    ],
    label: [
      L('I\'ll be candid: you\'re reading the situation well.', 'Seré franco: estás leyendo bien la situación.'),
      L('That\'s a fair observation. There is some pressure on my side.', 'Es una observación justa. Hay cierta presión de mi lado.')
    ],
    calibrated: [
      L('That\'s a good question. Let me think about what would make this work.', 'Buena pregunta. Déjame pensar qué haría que esto funcione.'),
      L('Fair. It depends on what matters to each of us.', 'Justo. Depende de lo que nos importe a cada uno.')
    ],
    noOriented: [
      L('No, it\'s not a bad idea. I\'m listening.', 'No, no es mala idea. Te escucho.'),
      L('No, I\'m not opposed to exploring that.', 'No, no me opongo a explorarlo.')
    ],
    audit: [
      L('I appreciate the honesty. No, I don\'t see you that way.', 'Aprecio la honestidad. No, no te veo así.'),
      L('Well, that clears the air. Let\'s talk.', 'Bueno, eso aclara el ambiente. Hablemos.')
    ],
    empathy: [
      L('Thank you. I appreciate that.', 'Gracias. Lo aprecio.'),
      L('Understood. Let\'s keep going.', 'Entendido. Sigamos.')
    ],
    thatsRight: [
      L('That\'s right. That\'s exactly where I am.', 'Así es. Ahí es exactamente donde estoy.'),
      L('That\'s right. You\'ve clearly done your homework.', 'Así es. Está claro que hiciste tu tarea.')
    ],
    youreRight: [
      L('You\'re right. So, where does that leave us?', 'Tienes razón. Entonces, ¿dónde nos deja eso?')
    ],
    why: [
      L('Why? Because that\'s our position. I don\'t need to justify it.', '¿Por qué? Porque esa es nuestra posición. No necesito justificarla.'),
      L('I don\'t appreciate being put on the spot like that.', 'No me gusta que me pongan contra la pared así.')
    ],
    aggressive: [
      L('If that\'s your tone, we may not be the right fit.', 'Si ese es tu tono, quizás no somos compatibles.'),
      L('Let\'s keep this professional, please.', 'Mantengamos esto profesional, por favor.')
    ],
    split: [
      L('Splitting the difference just rewards the more extreme opening. I\'d rather talk value.', 'Partir la diferencia solo premia a quien abrió más extremo. Prefiero hablar de valor.')
    ],
    neutral: [
      L('Our position is {price}.', 'Nuestra posición es {price}.'),
      L('I understand, but {price} reflects the value here.', 'Entiendo, pero {price} refleja el valor real.')
    ],
    neutralR: [
      L('Understood, but I don\'t see a reason to change course yet.', 'Entendido, pero todavía no veo motivo para cambiar de rumbo.')
    ],
    counter: [
      L('I can\'t meet that, but I can move to {price}.', 'No puedo llegar a eso, pero puedo moverme a {price}.'),
      L('Let\'s say {price}. That\'s a real move on my part.', 'Digamos {price}. Es un movimiento real de mi parte.')
    ],
    reject: [
      L('{offer} doesn\'t work for us. {price} is where I can be.', '{offer} no nos funciona. Puedo estar en {price}.'),
      L('That\'s not a number I can take back to my side. {price}.', 'Esa no es una cifra que pueda presentar a los míos. {price}.')
    ],
    accept: [
      L('{price}. Agreed. Let\'s put it in writing.', '{price}. De acuerdo. Pongámoslo por escrito.'),
      L('Alright, {price}. We have a deal.', 'Muy bien, {price}. Tenemos un acuerdo.')
    ],
    concede: [
      L('Given what you\'ve said, I can move to {price}.', 'Dado lo que has dicho, puedo moverme a {price}.'),
      L('I\'ll be flexible: {price}.', 'Seré flexible: {price}.')
    ],
    final: [
      L('Hold on. Before we walk away from this: {price}. That\'s my final position.', 'Un momento. Antes de abandonar esto: {price}. Es mi posición final.')
    ],
    leave: [
      L('Then I think we\'re done here. Good luck.', 'Entonces creo que hemos terminado. Suerte.')
    ],
    insulted: [
      L('That number tells me you\'re not serious.', 'Esa cifra me dice que no vas en serio.')
    ],
    repeat: [
      L('I notice you keep using the same move. I\'ve seen that before.', 'Noto que sigues usando el mismo recurso. Ya lo he visto antes.')
    ]
  };

  const crisis = {
    mirror: [
      L('Yeah. That\'s right. Nobody listens. Nobody ever listens.', 'Sí. Así es. Nadie escucha. Nadie escucha nunca.'),
      L('...Yeah. You heard me. That\'s how it is.', '...Sí. Me oíste. Así son las cosas.'),
      L('That\'s what I said. Do you understand what I\'m dealing with here?', 'Eso dije. ¿Entiendes con lo que estoy lidiando aquí?')
    ],
    label: [
      L('...Yeah. Yeah, I am. This wasn\'t supposed to go like this.', '...Sí. Sí, lo estoy. Esto no tenía que salir así.'),
      L('You don\'t know... okay, maybe you do. A little.', 'Tú no sabes... bueno, quizás sí. Un poco.')
    ],
    calibrated: [
      L('How? I... I don\'t know. Let me think.', '¿Cómo? Yo... no sé. Déjame pensar.'),
      L('What do I want? I want this to be over, that\'s what.', '¿Qué quiero? Quiero que esto se acabe, eso quiero.')
    ],
    noOriented: [
      L('No... no, that\'s not a bad idea. Maybe.', 'No... no, no es mala idea. Tal vez.'),
      L('No. I\'m not against that. Keep talking.', 'No. No estoy en contra. Sigue hablando.')
    ],
    audit: [
      L('...Yeah, I figured you\'d think that. But you\'re still talking to me.', '...Sí, ya imaginaba que pensarías eso. Pero sigues hablando conmigo.'),
      L('Huh. At least you\'re honest.', 'Vaya. Al menos eres honesto.')
    ],
    empathy: [
      L('Don\'t pretend you care. ...But okay.', 'No finjas que te importa. ...Pero está bien.'),
      L('Yeah. Well. Thanks, I guess.', 'Sí. Bueno. Gracias, supongo.')
    ],
    thatsRight: [
      L('...That\'s right. That\'s right. Finally someone gets it.', '...Así es. Así es. Por fin alguien lo entiende.')
    ],
    youreRight: [
      L('Yeah, yeah, you\'re right. Just stop talking and do something.', 'Sí, sí, tienes razón. Deja de hablar y haz algo.')
    ],
    why: [
      L('Why?! Don\'t question me! You don\'t get to ask me why!', '¡¿Por qué?! ¡No me cuestiones! ¡Tú no me preguntas por qué!'),
      L('I don\'t owe you any explanations.', 'No te debo ninguna explicación.')
    ],
    aggressive: [
      L('Don\'t you threaten me! You\'re making this worse!', '¡No me amenaces! ¡Lo estás empeorando!'),
      L('That\'s it. I\'m done listening to you.', 'Se acabó. Ya no te escucho.')
    ],
    split: [
      L('This isn\'t a market. Don\'t haggle with me like that.', 'Esto no es un mercado. No regatees conmigo así.')
    ],
    neutral: [
      L('{price}. That\'s what I said. Don\'t waste my time.', '{price}. Eso es lo que dije. No me hagas perder el tiempo.'),
      L('The number is {price}. The clock is ticking.', 'La cifra es {price}. El tiempo corre.')
    ],
    neutralR: [
      L('Talk is cheap. What are you actually going to do?', 'Hablar es fácil. ¿Qué vas a hacer de verdad?'),
      L('I\'m still waiting. Don\'t play games with me.', 'Sigo esperando. No juegues conmigo.')
    ],
    counter: [
      L('No. But... {price}. Maybe.', 'No. Pero... {price}. Tal vez.'),
      L('{price}. That\'s my number now.', '{price}. Esa es mi cifra ahora.')
    ],
    reject: [
      L('{offer}?! You think this is a joke? {price}.', '¿{offer}? ¿Crees que esto es una broma? {price}.')
    ],
    accept: [
      L('{price}. Fine. We do this carefully, exactly as agreed.', '{price}. Está bien. Lo hacemos con cuidado, exactamente como acordamos.')
    ],
    concede: [
      L('...Okay. {price}. But no tricks.', '...Está bien. {price}. Pero sin trucos.')
    ],
    final: [
      L('Wait! Don\'t hang up. {price}. Last chance.', '¡Espera! No cuelgues. {price}. Última oportunidad.')
    ],
    leave: [
      L('That\'s it. This conversation is over.', 'Se acabó. Esta conversación terminó.')
    ],
    insulted: [
      L('You insult me with that number.', 'Me insultas con esa cifra.')
    ],
    repeat: [
      L('Stop repeating everything I say! Are you playing with me?', '¡Deja de repetir todo lo que digo! ¿Estás jugando conmigo?')
    ]
  };

  /* Pressure tactics a counterpart can use against the player. Shown in the
     transcript with a "Tactic used on you" marker. */
  const TACTICS = {
    deadline: {
      biz: [L('I need an answer today. After that, this offer is gone.', 'Necesito una respuesta hoy. Después de eso, esta oferta desaparece.'),
            L('I have another meeting in ten minutes, so let\'s wrap this up.', 'Tengo otra reunión en diez minutos, así que cerremos esto.')],
      crisis: [L('You have ten minutes. After that, I stop picking up.', 'Tienes diez minutos. Después de eso, dejo de contestar.')]
    },
    takeItOrLeaveIt: {
      biz: [L('{price}. Take it or leave it.', '{price}. Lo tomas o lo dejas.')],
      crisis: [L('{price}. No more talking. Yes or no.', '{price}. No hay más que hablar. Sí o no.')]
    },
    anchoring: {
      biz: [L('Honestly, similar deals have gone for far more than {price}. I\'m being generous.', 'Sinceramente, acuerdos similares se han cerrado muy por encima de {price}. Estoy siendo generoso.')],
      crisis: [L('Others have paid triple. {price} is a gift.', 'Otros han pagado el triple. {price} es un regalo.')]
    },
    higherAuthority: {
      biz: [L('I\'d have to run anything lower past my partner, and they won\'t like it.', 'Cualquier cosa por debajo tendría que consultarla con mi socio, y no le va a gustar.')],
      crisis: [L('It\'s not up to me. The others decide. And they\'re not patient.', 'No depende de mí. Los otros deciden. Y no son pacientes.')]
    },
    flinch: {
      biz: [L('Ooh. Wow. That number genuinely hurts to hear.', 'Uf. Vaya. Esa cifra de verdad duele oírla.')],
      crisis: [L('What? Are you serious? That\'s nothing!', '¿Qué? ¿Hablas en serio? ¡Eso no es nada!')]
    },
    nibble: {
      biz: [L('And of course, you\'d cover the extra fees on top of that, right?', 'Y por supuesto, tú cubrirías los costos extra encima de eso, ¿verdad?')],
      crisis: [L('And you\'ll add something extra for the trouble.', 'Y añadirás algo extra por las molestias.')]
    },
    goodCopBadCop: {
      biz: [L('Personally, I\'d love to help you, but my boss would never sign off on that.', 'Personalmente me encantaría ayudarte, pero mi jefe nunca aprobaría eso.')],
      crisis: [L('I\'m the reasonable one here. The others want to stop talking to you.', 'Yo soy el razonable aquí. Los otros quieren dejar de hablar contigo.')]
    },
    // the master negotiator turns your own techniques around
    mirrorBack: { biz: [L('{echo}?', '¿{echo}?')], crisis: [L('{echo}?', '¿{echo}?')] },
    labelBack: {
      biz: [L('It seems like you\'re under real pressure to close this today.', 'Parece que tienes mucha presión por cerrar esto hoy.')],
      crisis: [L('It sounds like you\'re scared. You should be.', 'Suena a que tienes miedo. Deberías tenerlo.')]
    },
    calibratedBack: {
      biz: [L('How am I supposed to accept that?', '¿Cómo se supone que acepte eso?')],
      crisis: [L('How am I supposed to trust you?', '¿Cómo se supone que confíe en ti?')]
    },
    auditBack: {
      biz: [L('You probably think I\'m going to squeeze you on every detail. I\'m not that kind of person.', 'Probablemente pienses que voy a apretarte en cada detalle. No soy ese tipo de persona.')],
      crisis: [L('You probably think I\'m a monster. I\'m not.', 'Probablemente pienses que soy un monstruo. No lo soy.')]
    },
    fakeDeadline: {
      biz: [L('My offer expires at five o\'clock sharp. There\'s another buyer waiting.', 'Mi oferta vence a las cinco en punto. Hay otro comprador esperando.')],
      crisis: [L('In five minutes the price doubles.', 'En cinco minutos el precio se duplica.')]
    }
  };

  NX.lines = { registers: { casual, service, business, crisis }, TACTICS };
  if (typeof module !== 'undefined' && module.exports) module.exports = NX.lines;
})(typeof window !== 'undefined' ? window : globalThis);
