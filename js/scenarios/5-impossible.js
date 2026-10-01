/* Impossible scenarios — crises and expert opponents. One wrong move makes things worse.
   Crisis content is deliberately non-graphic: the focus is calm, tactical empathy and safe outcomes. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  NX.scenarios = NX.scenarios || [];
  const L = (en, es) => ({ en, es });

  NX.scenarios.push(
    {
      id: 'kidnap-ransom', level: 'impossible', category: 'crisis', type: 'deal', register: 'crisis',
      unit: 'usd', start: 2000000, target: 150000, step: 5000, spot: true,
      tactics: ['deadline', 'higherAuthority', 'takeItOrLeaveIt', 'anchoring'],
      who: { name: '"El Jefe"', gender: 'm', role: L('Kidnapper (by phone)', 'Secuestrador (por teléfono)') },
      title: L('Kidnapping for ransom abroad', 'Secuestro con rescate en el extranjero'),
      brief: L('Your brother was taken while working abroad. Working alongside a specialist team, you are the family\'s voice on the phone. The kidnappers want money; your priority is bringing him home safely. Stay calm, build a relationship, and never let emotion drive the numbers.',
        'Secuestraron a tu hermano mientras trabajaba en el extranjero. Junto a un equipo especializado, eres la voz de la familia al teléfono. Los secuestradores quieren dinero; tu prioridad es traerlo a casa sano y salvo. Mantén la calma, construye una relación y nunca dejes que la emoción decida las cifras.'),
      goal: L('Secure his safe release for {target} or less. They demand {start}.', 'Lograr su liberación segura por {target} o menos. Exigen {start}.'),
      item: L('the release', 'la liberación'),
      open: L('Listen carefully. We have your brother. He is fine, for now. The price is {price}. You have forty-eight hours.', 'Escucha con atención. Tenemos a tu hermano. Está bien, por ahora. El precio es {price}. Tienes cuarenta y ocho horas.'),
      motives: [
        L('...Fine. You can hear him for ten seconds. Then you know I keep my word.', '...Está bien. Puedes oírlo diez segundos. Así sabrás que cumplo mi palabra.'),
        L('The men I work with are getting nervous. The longer this takes, the harder they are to control. I want this over too.', 'Los hombres con los que trabajo se están poniendo nerviosos. Cuanto más dure esto, más difícil es controlarlos. Yo también quiero que termine.'),
        L('We thought he worked for a big company. Now we know he is a teacher. Nobody is coming with millions.', 'Pensábamos que trabajaba para una gran empresa. Ahora sabemos que es profesor. Nadie va a venir con millones.'),
        L('Keeping someone costs money. Food, places to hide, people. Every week I lose.', 'Retener a alguien cuesta dinero. Comida, escondites, gente. Cada semana pierdo.')
      ],
      deal: L('{price}. Exactly as we agreed. He will be released at the agreed place, unharmed. Do not make me regret this.', '{price}. Exactamente como acordamos. Será liberado en el lugar acordado, sin daño. No hagas que me arrepienta.'),
      nodeal: L('You are not serious. The line goes dead. The specialist team takes over the contact.', 'No vas en serio. La línea se corta. El equipo especializado toma el control del contacto.'),
      fail: L('Enough! The caller hangs up. The specialist team takes over; it will take days to rebuild contact.', '¡Basta! El que llama cuelga. El equipo especializado toma el control; tardarán días en recuperar el contacto.'),
      endNotes: [
        L('Real kidnap-for-ransom cases are handled with law enforcement and professional crisis consultants. Families should never negotiate alone.', 'Los casos reales de secuestro con rescate se gestionan con las autoridades y consultores profesionales en crisis. Las familias nunca deben negociar solas.'),
        L('Always insist on proof of life before discussing any payment.', 'Exige siempre una prueba de vida antes de hablar de cualquier pago.'),
        L('Professionals use slow, decreasing offers so kidnappers believe the family has reached its true limit.', 'Los profesionales usan ofertas lentas y decrecientes para que los secuestradores crean que la familia ha llegado a su límite real.')
      ],
      tip: L('Speak slowly. Ask for proof of life. Label the caller\'s pressure without accepting it, and remember: kidnappers want a deal, and patience is on your side. Expect deadlines and threats designed to make you panic.',
        'Habla despacio. Pide una prueba de vida. Etiqueta la presión de quien llama sin aceptarla, y recuerda: los secuestradores quieren un acuerdo, y la paciencia juega a tu favor. Espera plazos y amenazas pensados para que entres en pánico.')
    },
    {
      id: 'virtual-kidnap-scam', level: 'impossible', category: 'crisis', type: 'resolve', register: 'crisis', noPay: true, spot: true,
      tactics: ['deadline', 'goodCopBadCop', 'labelBack'],
      who: { name: 'Unknown caller', gender: 'm', role: L('Caller claiming to hold your relative', 'Persona que dice retener a tu familiar') },
      title: L('Virtual kidnapping scam', 'Estafa de secuestro virtual'),
      brief: L('Your phone rings from an unknown number. A frantic voice claims your niece has been kidnapped and demands an immediate transfer. You hear crying in the background. Stay calm, gain time, gather information, and figure out the truth.',
        'Tu teléfono suena desde un número desconocido. Una voz alterada afirma que tu sobrina ha sido secuestrada y exige una transferencia inmediata. Se oye llanto de fondo. Mantén la calma, gana tiempo, reúne información y descubre la verdad.'),
      goal: L('Stay calm, gather information and expose the scam without sending money.', 'Mantener la calma, reunir información y desenmascarar la estafa sin enviar dinero.'),
      item: L('the call', 'la llamada'),
      open: L('Listen to me! We have your niece! If you hang up or call anyone, she pays for it. Go to the store now and buy gift cards. Now!', '¡Escúchame! ¡Tenemos a tu sobrina! Si cuelgas o llamas a alguien, ella lo pagará. Ve a la tienda ahora y compra tarjetas de regalo. ¡Ya!'),
      motives: [
        L('Her name? She... she\'s your niece, that\'s all you need to know! Stop asking questions!', '¿Su nombre? Ella... es tu sobrina, ¡es todo lo que necesitas saber! ¡Deja de hacer preguntas!'),
        L('Where is she? In a car... in a house. It doesn\'t matter where! (You can hear other phones ringing and voices in the background, like a busy office.)', '¿Dónde está? En un coche... en una casa. ¡No importa dónde! (Se oyen otros teléfonos y voces de fondo, como en una oficina concurrida.)'),
        L('You can\'t talk to her, she\'s... she\'s sedated. Just stay on the line and do NOT call anyone else.', 'No puedes hablar con ella, está... está sedada. Quédate en la línea y NO llames a nadie más.'),
        L('Fine, the price is lower. Just send it now, any amount, gift cards or a transfer, I don\'t care.', 'Está bien, el precio es menor. Solo envíalo ya, cualquier cantidad, tarjetas de regalo o transferencia, me da igual.')
      ],
      milestones: [
        L('Okay, okay, calm down! Just... just listen to what I say.', '¡Vale, vale, cálmate! Solo... solo escucha lo que te digo.'),
        L('Why do you keep asking things? Just get the money!', '¿Por qué sigues preguntando cosas? ¡Solo consigue el dinero!'),
        L('Stop stalling! You have... you have five minutes! (The caller sounds unsure now.)', '¡Deja de ganar tiempo! Tienes... ¡tienes cinco minutos! (Quien llama suena inseguro ahora.)')
      ],
      deal: L('While keeping the caller talking, a family member reaches your niece on another phone: she is safe at school. When you calmly ask the caller her name one more time, the line goes dead. It was a scam.',
        'Mientras mantienes hablando a quien llama, un familiar localiza a tu sobrina en otro teléfono: está a salvo en la escuela. Cuando preguntas con calma su nombre una vez más, la línea se corta. Era una estafa.'),
      fail: L('In the panic, you followed their instructions and sent money. Your niece was safe at school the whole time. It was a scam.', 'En el pánico, seguiste sus instrucciones y enviaste dinero. Tu sobrina estuvo a salvo en la escuela todo el tiempo. Era una estafa.'),
      timeout: L('The caller hangs up abruptly. Moments later, your niece texts you from school. She is fine. It was a scam.', 'Quien llama cuelga de repente. Momentos después, tu sobrina te escribe desde la escuela. Está bien. Era una estafa.'),
      endNotes: [
        L('Slow down. Scammers rely on panic and urgency; real kidnappings for ransom are rare and rarely demand gift cards or instant transfers.', 'Ve más despacio. Los estafadores dependen del pánico y la urgencia; los secuestros reales con rescate son poco frecuentes y casi nunca exigen tarjetas de regalo o transferencias inmediatas.'),
        L('Ask questions only the real person could answer, or ask to speak with them directly. Scammers avoid specifics.', 'Haz preguntas que solo la persona real podría responder, o pide hablar directamente con ella. Los estafadores evitan los detalles.'),
        L('Try to contact your relative on another phone, or have someone else do it, while you keep the caller talking.', 'Intenta contactar a tu familiar desde otro teléfono, o pide a otra persona que lo haga, mientras mantienes hablando a quien llama.'),
        L('Never share personal details such as your relative\'s name or location. Scammers fish for information.', 'Nunca compartas datos personales como el nombre o la ubicación de tu familiar. Los estafadores buscan información.'),
        L('Do not send money, gift cards, cryptocurrency or wire transfers.', 'No envíes dinero, tarjetas de regalo, criptomonedas ni transferencias.'),
        L('Report the call to local police and your country\'s fraud reporting service, even after you confirm your relative is safe.', 'Denuncia la llamada a la policía local y al servicio de denuncias de fraude de tu país, incluso después de confirmar que tu familiar está a salvo.'),
        L('Agree on a family code word in advance for emergencies.', 'Acuerden de antemano una palabra clave familiar para emergencias.')
      ],
      tip: L('Panic is the scammer\'s main tool. Breathe, speak slowly, and use calibrated questions they cannot answer: her name, where she is, proof she is with them. Never offer money.',
        'El pánico es la principal herramienta del estafador. Respira, habla despacio y usa preguntas calibradas que no pueda responder: su nombre, dónde está, una prueba de que está con ellos. Nunca ofrezcas dinero.')
    },
    {
      id: 'bank-hostages', level: 'impossible', category: 'crisis', type: 'resolve', register: 'crisis', spot: true,
      tactics: ['deadline', 'higherAuthority', 'calibratedBack'],
      who: { name: 'Danny', gender: 'm', role: L('Nervous bank robber', 'Atracador de banco nervioso') },
      title: L('Bank robbery with hostages', 'Atraco a un banco con rehenes'),
      brief: L('A robbery went wrong when police arrived quickly. A frightened man is inside the bank with six customers and staff. You are the negotiator on the phone. Nobody has been hurt. Keep it that way.',
        'Un atraco salió mal cuando la policía llegó rápido. Un hombre asustado está dentro del banco con seis clientes y empleados. Eres el negociador al teléfono. Nadie ha resultado herido. Que siga así.'),
      goal: L('Calm the situation and get everyone out safely, including Danny.', 'Calmar la situación y lograr que todos salgan a salvo, incluido Danny.'),
      item: L('the situation', 'la situación'),
      open: L('Who is this? Tell those cops to back off! I want a car, and I want it now, or nobody leaves!', '¿Quién habla? ¡Diles a esos policías que se alejen! Quiero un coche, y lo quiero ya, ¡o nadie sale de aquí!'),
      motives: [
        L('This was supposed to take two minutes. Nobody was supposed to be here. I just needed money for my mom\'s treatment.', 'Esto iba a durar dos minutos. Se suponía que no habría nadie. Solo necesitaba dinero para el tratamiento de mi madre.'),
        L('I\'ve never done anything like this. I don\'t want anybody hurt. I just don\'t know how to get out of this.', 'Nunca he hecho nada así. No quiero que nadie salga herido. Simplemente no sé cómo salir de esto.'),
        L('One of the women in here is pregnant. She keeps holding her stomach. It\'s freaking me out.', 'Una de las mujeres aquí está embarazada. No para de agarrarse la barriga. Me está asustando.'),
        L('I have a daughter. She\'s six. I don\'t want her seeing me on the news like this.', 'Tengo una hija. Tiene seis años. No quiero que me vea en las noticias así.')
      ],
      milestones: [
        L('...Okay. Okay. I\'m listening. Just don\'t trick me.', '...Vale. Vale. Te escucho. Solo no me engañes.'),
        L('Fine. The pregnant woman and the old man can go. That\'s good faith, right?', 'Está bien. La mujer embarazada y el anciano pueden salir. Eso es buena fe, ¿no?'),
        L('The two tellers can go too. I don\'t... I don\'t want to keep them here anymore.', 'Los dos cajeros también pueden irse. No... ya no quiero tenerlos aquí.')
      ],
      deal: L('Everyone else walks out. Danny follows your instructions, comes out slowly with empty hands, and is taken into custody without incident. Nobody is hurt.',
        'Todos los demás salen. Danny sigue tus instrucciones, sale despacio con las manos vacías y queda bajo custodia sin incidentes. Nadie resulta herido.'),
      fail: L('Danny stops answering. The tactical team takes over the scene. The crisis drags on for hours and becomes far more dangerous.', 'Danny deja de responder. El equipo táctico toma el control. La crisis se alarga durante horas y se vuelve mucho más peligrosa.'),
      timeout: L('Danny goes quiet and the call ends. The standoff continues, with more uncertainty than before.', 'Danny se queda en silencio y la llamada termina. El enfrentamiento continúa, con más incertidumbre que antes.'),
      endNotes: [
        L('Professional crisis negotiators slow everything down: time reduces emotion and increases the chance of a peaceful end.', 'Los negociadores profesionales de crisis ralentizan todo: el tiempo reduce la emoción y aumenta la probabilidad de un final pacífico.'),
        L('If you are ever caught in a situation like this, stay calm, follow instructions, avoid eye contact and sudden moves, and let professionals do the negotiating.', 'Si alguna vez te ves en una situación así, mantén la calma, sigue las instrucciones, evita el contacto visual y los movimientos bruscos, y deja que los profesionales negocien.')
      ],
      tip: L('A frightened person cannot think. Lower the temperature first with labels and a calm, slow voice. Never threaten, never argue, and look for small wins, one person at a time.',
        'Una persona asustada no puede pensar. Baja primero la temperatura con etiquetas y una voz calmada y pausada. Nunca amenaces, nunca discutas, y busca pequeños logros, una persona a la vez.')
    },
    {
      id: 'bus-standoff', level: 'impossible', category: 'crisis', type: 'resolve', register: 'crisis', spot: true,
      tactics: ['deadline', 'goodCopBadCop', 'labelBack'],
      who: { name: 'Viktor', gender: 'm', role: L('Man who took control of a bus', 'Hombre que tomó el control de un autobús') },
      title: L('A hijacked bus standoff', 'Un autobús secuestrado'),
      brief: L('A man has taken control of a city bus with fourteen passengers and stopped it on a bridge. He says he has been ignored by everyone and wants to be heard. You have a phone line to him.',
        'Un hombre tomó el control de un autobús urbano con catorce pasajeros y lo detuvo en un puente. Dice que todos lo han ignorado y quiere que lo escuchen. Tienes una línea telefónica con él.'),
      goal: L('Get every passenger released and end the standoff peacefully.', 'Lograr que liberen a todos los pasajeros y terminar el enfrentamiento de forma pacífica.'),
      item: L('the passengers', 'los pasajeros'),
      open: L('Finally someone calls! For two years nobody listened. Now everybody listens, eh? Nobody gets off this bus until I say so.', '¡Por fin alguien llama! Durante dos años nadie escuchó. Ahora todos escuchan, ¿eh? Nadie baja de este autobús hasta que yo lo diga.'),
      motives: [
        L('The company fired me after the accident. It wasn\'t my fault. I lost my job, my apartment, everything.', 'La empresa me despidió tras el accidente. No fue culpa mía. Perdí el trabajo, el piso, todo.'),
        L('I wrote letters. I went to the offices. They laughed at me. I just want someone to admit what they did.', 'Escribí cartas. Fui a las oficinas. Se rieron de mí. Solo quiero que alguien admita lo que hicieron.'),
        L('There\'s a kid here with his grandmother. He keeps looking at me. I don\'t want him to be scared of me.', 'Aquí hay un niño con su abuela. No deja de mirarme. No quiero que me tenga miedo.'),
        L('I haven\'t slept in two days. I\'m so tired. I don\'t even know how this ends anymore.', 'No he dormido en dos días. Estoy tan cansado. Ya ni sé cómo termina esto.')
      ],
      milestones: [
        L('...You\'re the first one who asked me what happened. The first one.', '...Eres el primero que me pregunta qué pasó. El primero.'),
        L('Okay. The grandmother and the boy can get off. And the woman with the baby.', 'Vale. La abuela y el niño pueden bajar. Y la mujer con el bebé.'),
        L('Half of them can go. I\'ll keep the doors open. I\'m not a monster.', 'La mitad pueden irse. Dejaré las puertas abiertas. No soy un monstruo.')
      ],
      deal: L('All passengers walk off the bus. With your promise that his story will be heard by an official review, Viktor steps off calmly and surrenders. Nobody is hurt.',
        'Todos los pasajeros bajan del autobús. Con tu promesa de que su historia será escuchada en una revisión oficial, Viktor baja con calma y se entrega. Nadie resulta herido.'),
      fail: L('Viktor throws the phone down. Contact is lost and the tactical team prepares to intervene. The situation becomes far more dangerous.', 'Viktor tira el teléfono. Se pierde el contacto y el equipo táctico se prepara para intervenir. La situación se vuelve mucho más peligrosa.'),
      timeout: L('Viktor stops answering. The standoff continues into the night.', 'Viktor deja de contestar. El enfrentamiento continúa durante la noche.'),
      endNotes: [
        L('Many crisis situations are driven by a need to be heard. Being listened to without judgment is often what finally ends them.', 'Muchas crisis nacen de la necesidad de ser escuchado. Ser escuchado sin juicio es a menudo lo que finalmente las termina.')
      ],
      tip: L('This man wants to be heard more than anything else. Let him tell his story. Mirrors and labels will do more than any promise, and never make a promise you cannot keep.',
        'Este hombre quiere ser escuchado más que nada. Déjale contar su historia. Los reflejos y las etiquetas lograrán más que cualquier promesa, y nunca prometas lo que no puedas cumplir.')
    },
    {
      id: 'pirates-ransom', level: 'impossible', category: 'crisis', type: 'deal', register: 'crisis',
      unit: 'usd', start: 8000000, target: 1200000, step: 50000, spot: true,
      tactics: ['deadline', 'higherAuthority', 'anchoring', 'takeItOrLeaveIt'],
      who: { name: 'Captain Abdi', gender: 'm', role: L('Pirate negotiator (by satellite phone)', 'Negociador pirata (por teléfono satelital)') },
      title: L('Pirates holding a cargo ship crew', 'Piratas retienen a la tripulación de un carguero'),
      brief: L('A cargo ship owned by a small shipping company was seized off the coast. The twenty-two crew members are unharmed. You negotiate for the company. Pirate groups expect long negotiations; panic and big offers only make them demand more.',
        'Un carguero de una pequeña naviera fue capturado frente a la costa. Los veintidós tripulantes están ilesos. Tú negocias por la empresa. Los grupos piratas esperan negociaciones largas; el pánico y las ofertas grandes solo hacen que pidan más.'),
      goal: L('Secure the crew\'s safe release for {target} or less. They demand {start}.', 'Lograr la liberación segura de la tripulación por {target} o menos. Exigen {start}.'),
      item: L('the crew', 'la tripulación'),
      open: L('Your ship is ours. Your crew is healthy. Our price is {price}. Insurance will pay, we know this.', 'Tu barco es nuestro. Tu tripulación está sana. Nuestro precio es {price}. El seguro pagará, lo sabemos.'),
      motives: [
        L('The crew can speak to you tomorrow on this phone. They are fed. We are not animals.', 'La tripulación podrá hablar contigo mañana por este teléfono. Comen. No somos animales.'),
        L('This ship is costing us. Fuel, guards, food for twenty-two men. Every week it costs more.', 'Este barco nos cuesta. Combustible, guardias, comida para veintidós hombres. Cada semana cuesta más.'),
        L('The men on the ship, they are young. They are bored and restless. It is not easy to keep them calm.', 'Los hombres en el barco son jóvenes. Están aburridos e inquietos. No es fácil mantenerlos tranquilos.'),
        L('We heard your company is small. Not one of the big ones. Maybe the insurance is not so big either.', 'Oímos que tu empresa es pequeña. No es una de las grandes. Quizás el seguro tampoco sea tan grande.')
      ],
      deal: L('{price}. It is done. Drop-off as agreed, and the crew sails home. You negotiate like an old man of the sea.', '{price}. Está hecho. La entrega como acordamos, y la tripulación vuelve a casa. Negocias como un viejo lobo de mar.'),
      nodeal: L('Then we wait. We are patient. The call ends.', 'Entonces esperamos. Somos pacientes. La llamada termina.'),
      fail: L('You insult us. We will not call again for many weeks. The crew\'s ordeal is extended.', 'Nos insultas. No volveremos a llamar en muchas semanas. El calvario de la tripulación se alarga.'),
      endNotes: [
        L('Real piracy cases are negotiated by specialist response consultants working with insurers and governments. They typically last weeks or months.', 'Los casos reales de piratería los negocian consultores especializados junto con aseguradoras y gobiernos. Suelen durar semanas o meses.'),
        L('Slow, small, decreasing offers and regular proof of life are standard practice to protect the crew.', 'Las ofertas lentas, pequeñas y decrecientes, y las pruebas de vida periódicas, son práctica habitual para proteger a la tripulación.')
      ],
      tip: L('Pirates treat this as a business. Show patience, ask for proof of life, and let them reveal their costs. Large jumps in your offer tell them to wait for more.',
        'Los piratas lo tratan como un negocio. Muestra paciencia, pide pruebas de vida y deja que revelen sus costos. Los saltos grandes en tu oferta les dicen que esperen más.')
    },
    {
      id: 'hostile-takeover', level: 'impossible', category: 'business', type: 'deal', register: 'business',
      unit: 'usdsh', start: 42, target: 55, step: 0.5, ackerman: false, spot: true,
      tactics: ['anchoring', 'fakeDeadline', 'takeItOrLeaveIt', 'goodCopBadCop'],
      who: { name: 'Gideon Kral', gender: 'm', role: L('CEO of the acquiring conglomerate', 'Consejero delegado del conglomerado comprador') },
      title: L('A corporate hostile takeover', 'Una adquisición hostil'),
      brief: L('You are the CEO of a mid-sized technology company. A ruthless conglomerate has made an unsolicited bid and is threatening to go directly to your shareholders. You must protect your company\'s value and your people.',
        'Eres la persona al frente de una empresa tecnológica mediana. Un conglomerado implacable ha lanzado una oferta no solicitada y amenaza con ir directamente a tus accionistas. Debes proteger el valor de tu empresa y a tu gente.'),
      goal: L('Secure a price of {target} per share or more. Their bid is {start}.', 'Lograr un precio de {target} por acción o más. Su oferta es de {start}.'),
      item: L('the company', 'la empresa'),
      open: L('Let\'s not waste time. {price} a share is a premium. Accept it, or I take it to your shareholders on Monday.', 'No perdamos el tiempo. {price} por acción es una prima. Acéptelo, o el lunes se lo presento a sus accionistas.'),
      motives: [
        L('My board wants this deal closed before our annual meeting. Failing would be... visible.', 'Mi consejo quiere este acuerdo cerrado antes de nuestra junta anual. Fracasar sería... muy visible.'),
        L('Your engineering team is what we\'re really buying. If they walk out after the deal, it\'s worthless to us.', 'Lo que de verdad compramos es su equipo de ingeniería. Si se marchan tras el acuerdo, no nos sirve de nada.'),
        L('A shareholder vote is expensive, slow and uncertain. I\'d much prefer a friendly agreement.', 'Una votación de accionistas es cara, lenta e incierta. Preferiría con mucho un acuerdo amistoso.'),
        L('Our analysts value your company well above my bid. Everybody starts low.', 'Nuestros analistas valoran su empresa muy por encima de mi oferta. Todos empiezan bajo.')
      ],
      deal: L('{price} per share, with retention guarantees for your team. Have your lawyers call mine.', '{price} por acción, con garantías de permanencia para su equipo. Que sus abogados llamen a los míos.'),
      nodeal: L('Then we\'ll see what your shareholders think.', 'Entonces veremos qué opinan sus accionistas.'),
      tip: L('Expect every pressure tactic in the book. Do not react; name the tactics calmly, find what the acquirer truly needs, and make walking away expensive for them.',
        'Espera todas las tácticas de presión posibles. No reacciones; nombra las tácticas con calma, descubre qué necesita realmente el comprador y haz que retirarse le salga caro.')
    },
    {
      id: 'trade-deal', level: 'impossible', category: 'expert', type: 'deal', register: 'business',
      unit: 'pct', start: 25, target: 10, step: 1, ackerman: false, spot: true,
      tactics: ['anchoring', 'higherAuthority', 'deadline', 'takeItOrLeaveIt'],
      who: { name: 'Minister Halvorsen', gender: 'f', role: L('Foreign trade delegate', 'Delegada comercial extranjera') },
      title: L('An international trade deal', 'Un acuerdo comercial internacional'),
      brief: L('You lead your country\'s delegation in talks over agricultural tariffs. Your farmers face a punishing import tariff. The other delegation is experienced, formal and under political pressure at home.',
        'Lideras la delegación de tu país en unas negociaciones sobre aranceles agrícolas. Tus agricultores enfrentan un arancel de importación muy duro. La otra delegación es experimentada, formal y está bajo presión política en su país.'),
      goal: L('Reduce the tariff to {target} or less. They propose {start}.', 'Reducir el arancel al {target} o menos. Ellos proponen el {start}.'),
      item: L('the tariff', 'el arancel'),
      open: L('Our position is clear. The tariff remains at {price}. Our parliament will accept nothing less.', 'Nuestra posición es clara. El arancel se mantiene en el {price}. Nuestro parlamento no aceptará menos.'),
      motives: [
        L('Elections are in eight months. Our farmers vote, and they are frightened of cheap imports.', 'Las elecciones son dentro de ocho meses. Nuestros agricultores votan, y temen las importaciones baratas.'),
        L('Our technology sector badly wants access to your market. That is the deal my government truly needs.', 'Nuestro sector tecnológico quiere desesperadamente acceder a su mercado. Ese es el acuerdo que mi gobierno realmente necesita.'),
        L('A phased reduction over several years would be much easier to present at home.', 'Una reducción gradual durante varios años sería mucho más fácil de presentar en casa.'),
        L('If these talks fail, our opposition will say I came home empty-handed. Personally, I cannot afford that.', 'Si estas conversaciones fracasan, la oposición dirá que volví con las manos vacías. Personalmente, no puedo permitírmelo.')
      ],
      deal: L('A tariff of {price}, phased in, with access for our technology firms. Let us draft the communiqué.', 'Un arancel del {price}, aplicado gradualmente, con acceso para nuestras empresas tecnológicas. Redactemos el comunicado.'),
      nodeal: L('Then these talks are suspended.', 'Entonces estas conversaciones quedan suspendidas.'),
      tip: L('Diplomats negotiate for an audience back home. Help your counterpart find a story she can sell: phasing, linked concessions, face-saving language.',
        'Los diplomáticos negocian para una audiencia en su país. Ayuda a tu contraparte a encontrar una historia que pueda vender: gradualidad, concesiones vinculadas, un lenguaje que le permita quedar bien.')
    },
    {
      id: 'labor-strike', level: 'impossible', category: 'work', type: 'resolve', register: 'crisis', tension0: 55, spot: true,
      tactics: ['deadline', 'goodCopBadCop', 'labelBack'],
      who: { name: 'Frank Delgado', gender: 'm', role: L('Union leader', 'Líder sindical') },
      title: L('Ending a factory labor strike', 'Poner fin a una huelga en una fábrica'),
      brief: L('Workers at a factory have been on strike for three weeks. Management and union are furious with each other. You are the mediator, meeting the union leader. Get both sides back to a deal.',
        'Los trabajadores de una fábrica llevan tres semanas en huelga. La dirección y el sindicato están furiosos entre sí. Eres el mediador y te reúnes con el líder sindical. Consigue que ambas partes vuelvan a un acuerdo.'),
      goal: L('Rebuild trust and get the union to agree to return to the table.', 'Reconstruir la confianza y lograr que el sindicato acepte volver a la mesa.'),
      item: L('the strike', 'la huelga'),
      open: L('Mediator? You\'re on their payroll, aren\'t you? My people haven\'t had a real raise in six years. We\'re not going back until they pay.', '¿Mediador? Te paga la empresa, ¿verdad? Mi gente lleva seis años sin un aumento real. No volvemos hasta que paguen.'),
      motives: [
        L('It\'s not only the money. Two of our guys were hurt on the line last year and management called it "carelessness".', 'No es solo el dinero. Dos compañeros se lesionaron en la línea el año pasado y la dirección lo llamó «descuido».'),
        L('Families are running out of savings. Some of my members are scared. But if I back down now, I lose them.', 'Las familias se están quedando sin ahorros. Algunos de mis afiliados tienen miedo. Pero si cedo ahora, los pierdo.'),
        L('We\'d accept a smaller raise if safety improvements were guaranteed in writing.', 'Aceptaríamos un aumento menor si las mejoras de seguridad quedaran garantizadas por escrito.'),
        L('The plant manager humiliated me in front of my members. I need some respect back.', 'El director de planta me humilló delante de mis afiliados. Necesito recuperar algo de respeto.')
      ],
      milestones: [
        L('...Fine. I\'ll hear you out. But I\'m not promising anything.', '...Está bien. Te escucharé. Pero no prometo nada.'),
        L('If safety goes in writing, I could take something to my members.', 'Si la seguridad queda por escrito, podría llevar algo a mis afiliados.'),
        L('I\'m willing to sit down with management, if they show up with respect.', 'Estoy dispuesto a sentarme con la dirección, si vienen con respeto.')
      ],
      deal: L('Frank agrees to return to the table with a framework: phased raises, written safety commitments and a joint committee. The strike is suspended while talks resume.',
        'Frank acepta volver a la mesa con un marco: aumentos graduales, compromisos de seguridad por escrito y un comité conjunto. La huelga se suspende mientras se retoman las conversaciones.'),
      fail: L('Frank walks out. The strike hardens, and both sides dig in for a long fight.', 'Frank se marcha. La huelga se endurece y ambas partes se atrincheran para una larga lucha.'),
      timeout: L('Frank ends the meeting. Talks stall for another week.', 'Frank termina la reunión. Las conversaciones se estancan otra semana.'),
      tip: L('Both sides feel disrespected. Before any terms, the union leader needs to feel heard. Uncover what matters beyond money, and help him save face with his members.',
        'Ambas partes se sienten despreciadas. Antes de cualquier condición, el líder sindical necesita sentirse escuchado. Descubre lo que importa más allá del dinero y ayúdale a quedar bien ante sus afiliados.')
    },
    {
      id: 'impossible-seller', level: 'impossible', category: 'expert', type: 'deal', register: 'business',
      unit: 'usd', start: 95000, target: 62000, step: 500, spot: true, tacticEvery: 2,
      tactics: ['anchoring', 'fakeDeadline', 'takeItOrLeaveIt', 'flinch', 'nibble'],
      who: { name: 'Vance Ostrowski', gender: 'm', role: L('Aggressive seller', 'Vendedor agresivo') },
      title: L('The Impossible Seller', 'El Vendedor Imposible'),
      brief: L('You want to buy a fully equipped food truck to launch your business. The seller is a high-pressure dealmaker who uses every aggressive tactic: extreme anchors, fake deadlines and ultimatums. Recognize each one without taking the bait.',
        'Quieres comprar un food truck totalmente equipado para lanzar tu negocio. El vendedor es un negociador de alta presión que usa todas las tácticas agresivas: anclajes extremos, plazos falsos y ultimátums. Reconoce cada una sin morder el anzuelo.'),
      goal: L('Buy the truck for {target} or less. He demands {start}.', 'Comprar el camión por {target} o menos. Él exige {start}.'),
      item: L('the food truck', 'el food truck'),
      open: L('This truck is a money machine. {price}, and I\'m doing you a favor. I have three buyers lined up.', 'Este camión es una máquina de hacer dinero. {price}, y te estoy haciendo un favor. Tengo tres compradores esperando.'),
      motives: [
        L('...The "three buyers" are more like one, and his financing fell through last week.', '...Los «tres compradores» son más bien uno, y su financiación se cayó la semana pasada.'),
        L('I\'m opening a restaurant next month. I need this cash for the lease deposit by the fifteenth.', 'Abro un restaurante el mes que viene. Necesito este dinero para el depósito del local antes del día quince.'),
        L('The truck needs a new generator soon. Any inspection will find it.', 'El camión necesitará pronto un generador nuevo. Cualquier inspección lo detectará.'),
        L('Truth is, I paid fifty-five for it three years ago. Anything above sixty is a win for me.', 'La verdad es que pagué cincuenta y cinco por él hace tres años. Cualquier cosa por encima de sesenta es una victoria para mí.')
      ],
      deal: L('{price}. You\'re tougher than you look. Cash by Friday and the keys are yours.', '{price}. Eres más duro de lo que pareces. Efectivo antes del viernes y las llaves son tuyas.'),
      nodeal: L('Your loss. Somebody else will be cashing in with this truck.', 'Tú te lo pierdes. Otro hará dinero con este camión.'),
      tip: L('Every line from this seller is designed to rattle you. Spot each tactic, label it calmly, and never move your number because of pressure alone.',
        'Cada frase de este vendedor está pensada para desestabilizarte. Identifica cada táctica, etiquétala con calma y nunca muevas tu cifra solo por la presión.')
    },
    {
      id: 'final-boss', level: 'impossible', category: 'expert', type: 'deal', register: 'business',
      unit: 'usd', start: 2400000, target: 1600000, step: 10000, spot: true, tacticEvery: 1, maxTurns: 20,
      tactics: ['auditBack', 'mirrorBack', 'labelBack', 'anchoring', 'calibratedBack', 'fakeDeadline', 'takeItOrLeaveIt', 'goodCopBadCop'],
      who: { name: 'Seraphine Voss-Laurent', gender: 'f', role: L('Master negotiator', 'Negociadora maestra') },
      title: L('Final Boss: the Master Negotiator', 'Jefe Final: la Negociadora Maestra'),
      brief: L('You want to acquire the software licensing rights a rival firm controls. Their negotiator is a legend who knows every technique you know and will use them on you: mirrors, labels, calibrated questions, audits and every pressure play. Recognize each move, and stay one step ahead.',
        'Quieres adquirir los derechos de licencia de software que controla una empresa rival. Su negociadora es una leyenda que conoce todas las técnicas que tú conoces y las usará contigo: reflejos, etiquetas, preguntas calibradas, auditorías y todas las jugadas de presión. Reconoce cada movimiento y mantente un paso por delante.'),
      goal: L('Acquire the licensing rights for {target} or less. She opens at {start}.', 'Adquirir los derechos de licencia por {target} o menos. Ella abre con {start}.'),
      item: L('the license', 'la licencia'),
      open: L('A pleasure. I\'ve heard good things about you. Let\'s be efficient: the rights are {price}. I suspect you knew that already.', 'Un placer. He oído cosas buenas de ti. Seamos eficientes: los derechos cuestan {price}. Sospecho que ya lo sabías.'),
      motives: [
        L('...Very well. My company is pivoting away from this product line. Maintaining it costs us.', '...Muy bien. Mi empresa está abandonando esta línea de producto. Mantenerla nos cuesta dinero.'),
        L('You\'re good. My CEO wants the sale booked this fiscal year; that\'s my real deadline, not yours.', 'Eres bueno. Mi consejero delegado quiere la venta contabilizada en este ejercicio; ese es mi plazo real, no el tuyo.'),
        L('The only other interested party wants an exclusivity clause my legal team refuses to sign.', 'La única otra parte interesada quiere una cláusula de exclusividad que mi equipo legal se niega a firmar.'),
        L('Off the record: my internal valuation was one point five. I opened high because I always do.', 'Extraoficialmente: mi valoración interna era de uno coma cinco. Abrí alto porque siempre lo hago.')
      ],
      deal: L('{price}. Well played. It has been a long time since someone saw every move coming. We have a deal.', '{price}. Bien jugado. Hacía mucho que nadie veía venir cada movimiento. Tenemos un acuerdo.'),
      nodeal: L('A pity. I\'d hoped for a worthier ending. Good day.', 'Una lástima. Esperaba un final más digno. Buen día.'),
      tip: L('She will mirror you, label you and ask you calibrated questions. Name what she is doing (silently or aloud), do not fill her silences, and keep your own techniques varied and precise.',
        'Te reflejará, te etiquetará y te hará preguntas calibradas. Nombra lo que está haciendo (en silencio o en voz alta), no llenes sus silencios y mantén tus propias técnicas variadas y precisas.')
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
