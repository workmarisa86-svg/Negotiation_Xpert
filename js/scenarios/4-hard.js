/* Hard scenarios — major life and career moments; skilled counterparts who use pressure tactics. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  NX.scenarios = NX.scenarios || [];
  const L = (en, es) => ({ en, es });

  NX.scenarios.push(
    {
      id: 'ask-raise', level: 'hard', category: 'work', type: 'deal', register: 'business',
      unit: 'usd', start: 77000, target: 84000, step: 500,
      tactics: ['higherAuthority', 'deadline', 'anchoring'],
      who: { name: 'Diane Mercer', gender: 'f', role: L('Your department head', 'Tu jefa de departamento') },
      title: L('Asking your boss for a raise', 'Pedir un aumento a tu jefa'),
      brief: L('You earn $75,000 and have taken on a team lead\'s workload since a colleague left. Market data says your role pays more. Your boss is experienced, busy and protective of her budget.',
        'Ganas 75.000 $ y has asumido la carga de trabajo de un líder de equipo desde que se fue un compañero. Los datos del mercado dicen que tu puesto se paga mejor. Tu jefa es experimentada, está ocupada y protege su presupuesto.'),
      goal: L('Reach an annual salary of {target} or more. She opens at {start}.', 'Lograr un salario anual de {target} o más. Ella abre con {start}.'),
      item: L('the raise', 'el aumento'),
      open: L('I appreciate your work, I do. Budgets are tight this year, but I can get you to {price}. That\'s above the standard increase.', 'Valoro tu trabajo, de verdad. Este año los presupuestos están ajustados, pero puedo llevarte a {price}. Eso está por encima del aumento estándar.'),
      motives: [
        L('Honestly, replacing you would cost us far more. Recruiting, training, six months of lost productivity.', 'Sinceramente, reemplazarte nos costaría mucho más. Selección, formación, seis meses de productividad perdida.'),
        L('There\'s an unfilled position in my budget since your colleague left. That money is sitting there.', 'Desde que se fue tu compañero hay una plaza vacante en mi presupuesto. Ese dinero está ahí.'),
        L('My own review depends on retaining top performers. Two people left my team last year and it was noticed.', 'Mi propia evaluación depende de retener a los mejores. El año pasado se fueron dos personas de mi equipo y se notó.'),
        L('HR has a band for your role that goes up to eighty-eight thousand. I just don\'t usually lead with that.', 'Recursos Humanos tiene una banda para tu puesto que llega a ochenta y ocho mil. Simplemente no suelo empezar por ahí.')
      ],
      deal: L('{price}. I\'ll put it through with HR this week. You\'ve earned it.', '{price}. Lo tramito con Recursos Humanos esta semana. Te lo has ganado.'),
      nodeal: L('Let\'s revisit this at the next review cycle.', 'Volvamos a hablarlo en el próximo ciclo de evaluación.'),
      tip: L('Your boss will use budget limits, higher approvals and timing to slow you down. Do not argue with them. Label the pressure, ask how she can make it work, and anchor with market value.',
        'Tu jefa usará los límites de presupuesto, las aprobaciones superiores y los tiempos para frenarte. No discutas con eso. Etiqueta la presión, pregunta cómo puede hacerlo funcionar y ancla con el valor de mercado.')
    },
    {
      id: 'job-offer', level: 'hard', category: 'work', type: 'deal', register: 'business',
      unit: 'usd', start: 92000, target: 105000, step: 1000,
      tactics: ['fakeDeadline', 'higherAuthority', 'anchoring'],
      who: { name: 'Kevin Park', gender: 'm', role: L('Hiring manager', 'Responsable de contratación') },
      title: L('Salary and benefits on a new job offer', 'Salario y beneficios en una nueva oferta de trabajo'),
      brief: L('After four rounds of interviews, you have an offer for a senior role. The base salary is lower than you hoped. The company clearly wants you, but the manager is a practiced negotiator.',
        'Tras cuatro rondas de entrevistas, tienes una oferta para un puesto sénior. El salario base es menor de lo que esperabas. La empresa claramente te quiere, pero el responsable es un negociador experimentado.'),
      goal: L('Agree on a base salary of {target} or more. The offer is {start}.', 'Acordar un salario base de {target} o más. La oferta es de {start}.'),
      item: L('the offer', 'la oferta'),
      open: L('We\'re excited to have you. The offer is a base of {price}, plus our standard benefits. We\'d love an answer by Friday.', 'Estamos encantados de contar contigo. La oferta es un salario base de {price}, más nuestros beneficios estándar. Nos encantaría tener una respuesta el viernes.'),
      motives: [
        L('Between us, this role has been open for five months. The team is exhausted covering for it.', 'Entre nosotros, este puesto lleva cinco meses vacante. El equipo está agotado cubriéndolo.'),
        L('Our second candidate withdrew last week. You\'re the only finalist left.', 'Nuestro segundo candidato se retiró la semana pasada. Eres el único finalista que queda.'),
        L('I have discretion up to the top of the band, which is above this offer. I start at the midpoint.', 'Tengo margen hasta el máximo de la banda, que está por encima de esta oferta. Empiezo por el punto medio.'),
        L('The Friday deadline is flexible. I just don\'t want this dragging into next quarter.', 'La fecha del viernes es flexible. Solo no quiero que esto se alargue al próximo trimestre.')
      ],
      deal: L('{price} base. I\'ll have HR send the revised offer this afternoon. Welcome aboard.', '{price} de base. Pediré a Recursos Humanos que envíe la oferta revisada esta tarde. Bienvenido al equipo.'),
      nodeal: L('I\'m sorry we couldn\'t make it work. The original offer stands until Friday.', 'Siento que no hayamos llegado a un acuerdo. La oferta original sigue en pie hasta el viernes.'),
      tip: L('You have the most leverage after the offer and before you sign. Expect a deadline and "budget limits". Ask calibrated questions about the range and the role\'s urgency.',
        'Tienes más poder justo después de la oferta y antes de firmar. Espera una fecha límite y «límites de presupuesto». Haz preguntas calibradas sobre la banda salarial y la urgencia del puesto.')
    },
    {
      id: 'freelance-rates', level: 'hard', category: 'business', type: 'deal', register: 'business',
      unit: 'usd', start: 6000, target: 8500, step: 100,
      tactics: ['flinch', 'anchoring', 'deadline'],
      who: { name: 'Victor Hale', gender: 'm', role: L('Client, agency owner', 'Cliente, dueño de agencia') },
      title: L('A client pushing back on your rates', 'Un cliente que discute tus tarifas'),
      brief: L('You quoted $8,500 for a brand identity project. The client loved your portfolio but says your rate is "way above market". He negotiates for a living.',
        'Presupuestaste 8.500 $ por un proyecto de identidad de marca. Al cliente le encantó tu portafolio, pero dice que tu tarifa está «muy por encima del mercado». Negociar es su profesión.'),
      goal: L('Agree on {target} or more. He offers {start}.', 'Acordar {target} o más. Él ofrece {start}.'),
      item: L('the project', 'el proyecto'),
      open: L('I\'ll be direct. I like your work, but {price} is what this is worth to us. Others quoted less.', 'Seré directo. Me gusta tu trabajo, pero {price} es lo que esto vale para nosotros. Otros presupuestaron menos.'),
      motives: [
        L('The truth is, our last designer missed every deadline. I can\'t afford that again with this client.', 'La verdad es que nuestro último diseñador incumplió todos los plazos. No puedo permitirme eso otra vez con este cliente.'),
        L('This brand is for our biggest account. If it impresses them, it\'s worth a lot more than your fee.', 'Esta marca es para nuestra cuenta más importante. Si los impresiona, vale mucho más que tu tarifa.'),
        L('"Others quoted less"... one other quote. And their portfolio wasn\'t close to yours.', '«Otros presupuestaron menos»... un solo presupuesto más. Y su portafolio no se acercaba al tuyo.'),
        L('I have a budget of nine thousand for this. I always try to come in under it.', 'Tengo un presupuesto de nueve mil para esto. Siempre intento quedarme por debajo.')
      ],
      deal: L('{price}. Fine. Send me the contract and let\'s get started.', '{price}. De acuerdo. Envíame el contrato y empecemos.'),
      nodeal: L('Then I guess we\'ll go with the other quote.', 'Entonces supongo que iremos con el otro presupuesto.'),
      tip: L('Price objections are often a test. Do not discount your work right away; find out what failure would cost him, and anchor your value to his risk.',
        'Las objeciones de precio suelen ser una prueba. No rebajes tu trabajo enseguida; averigua cuánto le costaría un fracaso y ancla tu valor a su riesgo.')
    },
    {
      id: 'client-leaving', level: 'hard', category: 'business', type: 'deal', register: 'business',
      unit: 'usdmo', start: 3500, target: 4700, step: 50,
      tactics: ['takeItOrLeaveIt', 'anchoring', 'deadline'],
      who: { name: 'Sandra Voss', gender: 'f', role: L('Client, chief financial officer', 'Cliente, directora financiera') },
      title: L('A client threatening to leave for a cheaper competitor', 'Un cliente amenaza con irse a un competidor más barato'),
      brief: L('Your agency\'s biggest client pays a $5,000 monthly retainer. Their new CFO says a competitor will do the same work for $3,500 and wants you to match it, or they leave.',
        'El mayor cliente de tu agencia paga una cuota mensual de 5.000 $. Su nueva directora financiera dice que un competidor hará el mismo trabajo por 3.500 $ y quiere que lo iguales, o se van.'),
      goal: L('Keep the retainer at {target} or more. She demands {start}.', 'Mantener la cuota en {target} o más. Ella exige {start}.'),
      item: L('the retainer', 'la cuota'),
      open: L('I\'ve reviewed every vendor. A competitor quoted us {price} a month for the same scope. Match it, or we move.', 'He revisado a todos los proveedores. Un competidor nos ofrece {price} al mes por el mismo alcance. Iguálelo, o nos vamos.'),
      motives: [
        L('My mandate from the board is to cut costs fifteen percent across vendors. I need to show savings.', 'Mi mandato del consejo es recortar un quince por ciento en proveedores. Necesito mostrar ahorros.'),
        L('Our marketing team would revolt if we switched. They love working with you.', 'Nuestro equipo de marketing se rebelaría si cambiáramos. Les encanta trabajar con ustedes.'),
        L('The competitor\'s quote excludes reporting and strategy calls. It isn\'t really the same scope.', 'El presupuesto del competidor no incluye informes ni reuniones de estrategia. En realidad no es el mismo alcance.'),
        L('Switching mid-campaign would cost us at least two months of momentum. I know that.', 'Cambiar a mitad de campaña nos costaría al menos dos meses de impulso. Lo sé.')
      ],
      deal: L('{price} a month, with a quarterly review. I can take that to the board.', '{price} al mes, con una revisión trimestral. Eso lo puedo presentar al consejo.'),
      nodeal: L('Then we\'ll begin the transition next month.', 'Entonces comenzaremos la transición el mes que viene.'),
      tip: L('A threat to leave is often a need to show savings. Label the pressure she is under, explore what "same scope" really means, and help her win internally without gutting your price.',
        'Una amenaza de irse suele ser la necesidad de mostrar ahorros. Etiqueta la presión que tiene, explora qué significa realmente «el mismo alcance» y ayúdala a ganar internamente sin destrozar tu precio.')
    },
    {
      id: 'house-multiple-offers', level: 'hard', category: 'home', type: 'deal', register: 'business',
      unit: 'usd', start: 545000, target: 520000, step: 1000,
      tactics: ['fakeDeadline', 'anchoring', 'higherAuthority'],
      who: { name: 'Lorraine Bishop', gender: 'f', role: L('Seller\'s real estate agent', 'Agente inmobiliaria del vendedor') },
      title: L('Buying a house with multiple offers', 'Comprar una casa con varias ofertas'),
      brief: L('You have found the home you want, listed at $525,000. The seller\'s agent says there are multiple offers and hints you will need to go well above asking.',
        'Encontraste la casa que quieres, anunciada en 525.000 $. La agente del vendedor dice que hay varias ofertas e insinúa que tendrás que pagar bastante por encima del precio pedido.'),
      goal: L('Win the house for {target} or less. The agent suggests {start}.', 'Conseguir la casa por {target} o menos. La agente sugiere {start}.'),
      item: L('the house', 'la casa'),
      open: L('We have strong interest. To be competitive, I\'d say you need to be around {price}. Best and final by tonight.', 'Hay mucho interés. Para ser competitivo, yo diría que necesitas estar en torno a {price}. Oferta final esta noche.'),
      motives: [
        L('The sellers already bought their next home. They\'re carrying two mortgages and want certainty above all.', 'Los vendedores ya compraron su próxima casa. Están pagando dos hipotecas y quieren certeza por encima de todo.'),
        L('Two of the other offers depend on selling their current homes first. The sellers hate that.', 'Dos de las otras ofertas dependen de vender primero sus casas actuales. A los vendedores eso no les gusta nada.'),
        L('A quick closing date matters to them almost as much as the price.', 'Una fecha de cierre rápida les importa casi tanto como el precio.'),
        L('One offer is higher, but it has a financing condition that makes them nervous.', 'Una oferta es más alta, pero tiene una condición de financiación que los pone nerviosos.')
      ],
      deal: L('I\'ll present {price} with your quick close. I think they\'ll accept. Congratulations, almost.', 'Presentaré {price} con tu cierre rápido. Creo que lo aceptarán. Enhorabuena, casi.'),
      nodeal: L('I\'ll let the sellers know you\'ve passed.', 'Les diré a los vendedores que te retiras.'),
      tip: L('In multiple-offer situations, price is only one lever. Find out what the sellers fear and value (certainty, timing) and you may win without overpaying.',
        'Cuando hay varias ofertas, el precio es solo una palanca. Descubre qué temen y valoran los vendedores (certeza, plazos) y podrías ganar sin pagar de más.')
    },
    {
      id: 'house-lowball', level: 'hard', category: 'home', type: 'deal', register: 'business',
      unit: 'usd', start: 410000, target: 465000, step: 1000,
      tactics: ['flinch', 'nibble', 'takeItOrLeaveIt'],
      who: { name: 'Martin Greaves', gender: 'm', role: L('Prospective buyer', 'Comprador interesado') },
      title: L('Selling your house to a lowball buyer', 'Vender tu casa a un comprador que ofrece muy poco'),
      brief: L('Your house is listed at $475,000. After weeks of showings, the first offer is far below asking, from a buyer who clearly wants the home but plays hardball.',
        'Tu casa está anunciada en 475.000 $. Tras semanas de visitas, la primera oferta está muy por debajo del precio, de un comprador que claramente quiere la casa pero juega duro.'),
      goal: L('Sell for {target} or more. He offers {start}.', 'Vender por {target} o más. Él ofrece {start}.'),
      item: L('the house', 'la casa'),
      open: L('Let\'s be realistic. The kitchen is dated and the market is cooling. I\'m offering {price}, cash-ready.', 'Seamos realistas. La cocina está anticuada y el mercado se está enfriando. Ofrezco {price}, con el dinero listo.'),
      motives: [
        L('My kids start at the school down the street in September. This location is the whole reason we\'re looking.', 'Mis hijos empiezan en el colegio de la esquina en septiembre. Esta ubicación es la razón por la que buscamos.'),
        L('We lost two other houses this spring by bidding too low. My wife is losing patience with me.', 'Perdimos otras dos casas esta primavera por ofrecer poco. Mi esposa está perdiendo la paciencia conmigo.'),
        L('My mortgage pre-approval actually goes up to four ninety.', 'Mi preaprobación hipotecaria en realidad llega a cuatrocientos noventa.'),
        L('The kitchen doesn\'t bother us much. We\'d redo it our way anyway.', 'La cocina no nos molesta mucho. De todas formas la reformaríamos a nuestro gusto.')
      ],
      deal: L('{price}. You drive a hard bargain. Let\'s sign.', '{price}. Negocias duro. Firmemos.'),
      nodeal: L('Then I guess we\'ll keep looking.', 'Entonces supongo que seguiremos buscando.'),
      tip: L('A lowball offer is an anchor, not an insult. Do not react to it; label it, find out why this house matters to the buyer, and let his own reasons pull the price up.',
        'Una oferta muy baja es un ancla, no un insulto. No reacciones; etiquétala, descubre por qué esta casa le importa al comprador y deja que sus propias razones suban el precio.')
    },
    {
      id: 'tough-supplier', level: 'hard', category: 'business', type: 'deal', register: 'business',
      unit: 'usd', start: 48000, target: 41000, step: 250,
      tactics: ['takeItOrLeaveIt', 'higherAuthority', 'anchoring'],
      who: { name: 'Henrik Dahl', gender: 'm', role: L('Supplier, sales director', 'Proveedor, director comercial') },
      title: L('A tough supplier who won\'t budge on price', 'Un proveedor duro que no cede en el precio'),
      brief: L('Your small company needs an annual supply of packaging materials. The supplier raised prices sharply and says the new price is non-negotiable.',
        'Tu pequeña empresa necesita un suministro anual de materiales de embalaje. El proveedor subió mucho los precios y dice que el nuevo precio no es negociable.'),
      goal: L('Sign the annual contract for {target} or less. He insists on {start}.', 'Firmar el contrato anual por {target} o menos. Él insiste en {start}.'),
      item: L('the contract', 'el contrato'),
      open: L('Material costs went up for everyone. The annual contract is {price}. That price is firm.', 'Los costos de materiales subieron para todos. El contrato anual cuesta {price}. Ese precio es firme.'),
      motives: [
        L('We lost a big customer this quarter. Our plant has unused capacity, and that\'s expensive.', 'Este trimestre perdimos un cliente grande. Nuestra planta tiene capacidad sin usar, y eso es caro.'),
        L('A multi-year commitment would let me justify a much better price to my finance team.', 'Un compromiso de varios años me permitiría justificar un precio mucho mejor ante mi equipo financiero.'),
        L('Paying upfront, or even quarterly, helps our cash flow more than you\'d think.', 'Pagar por adelantado, o incluso trimestralmente, ayuda a nuestro flujo de caja más de lo que crees.'),
        L('My bonus is tied to contract volume, not price. Losing your account would hurt me directly.', 'Mi bonificación depende del volumen de contratos, no del precio. Perder tu cuenta me afectaría directamente.')
      ],
      deal: L('{price} for the year, with quarterly payments. I\'ll get the paperwork over today.', '{price} por el año, con pagos trimestrales. Te envío la documentación hoy.'),
      nodeal: L('Then I wish you luck finding another supplier at short notice.', 'Entonces te deseo suerte buscando otro proveedor con tan poco tiempo.'),
      tip: L('"Firm" prices rarely are. Look for what the supplier values besides price (volume, commitment, payment terms) and trade those instead of fighting over the number.',
        'Los precios «firmes» casi nunca lo son. Busca lo que el proveedor valora además del precio (volumen, compromiso, condiciones de pago) e intercambia eso en lugar de pelear por la cifra.')
    },
    {
      id: 'promotion-rival', level: 'hard', category: 'work', type: 'resolve', register: 'business',
      tactics: ['higherAuthority', 'deadline'],
      who: { name: 'Ms. Reyes', gender: 'f', role: L('Director deciding the promotion', 'Directora que decide el ascenso') },
      title: L('Competing with a coworker for a promotion', 'Competir con un compañero por un ascenso'),
      brief: L('You and a well-liked coworker are both up for a senior role. The director meets you for a "conversation" before deciding. She has doubts about you, and will not say what they are.',
        'Tú y un compañero muy apreciado optan a un puesto sénior. La directora se reúne contigo para «conversar» antes de decidir. Tiene dudas sobre ti y no va a decir cuáles son.'),
      goal: L('Win the director\'s full support for your promotion.', 'Ganarte el apoyo total de la directora para tu ascenso.'),
      item: L('the promotion', 'el ascenso'),
      open: L('Thanks for coming in. Both of you are strong candidates. Honestly, your colleague has a lot of support on the team. Convince me.', 'Gracias por venir. Ambos son buenos candidatos. Sinceramente, tu compañero tiene mucho apoyo en el equipo. Convénceme.'),
      motives: [
        L('My concern with you is people management. You\'re brilliant individually, but I haven\'t seen you lead.', 'Mi duda contigo es la gestión de personas. Eres brillante individualmente, pero no te he visto liderar.'),
        L('This role reports to the executive team. I need someone who will make me look good in those rooms.', 'Este puesto reporta al comité ejecutivo. Necesito a alguien que me haga quedar bien en esas reuniones.'),
        L('What I really fear is choosing one of you and losing the other. I need whoever wins to keep the team together.', 'Lo que de verdad temo es elegir a uno de ustedes y perder al otro. Necesito que quien gane mantenga unido al equipo.'),
        L('Your colleague is popular, but he avoids hard decisions. That worries me more than I\'ve said.', 'Tu compañero es popular, pero evita las decisiones difíciles. Eso me preocupa más de lo que he dicho.')
      ],
      milestones: [
        L('Alright. I\'ll admit you\'ve thought about this more than I expected.', 'De acuerdo. Admito que lo has pensado más de lo que esperaba.'),
        L('If you really did lead the onboarding project, that changes my picture of you.', 'Si de verdad lideraste el proyecto de incorporación, eso cambia la imagen que tengo de ti.'),
        L('I like that you want your colleague to stay and grow. That\'s what a leader says.', 'Me gusta que quieras que tu compañero se quede y crezca. Eso es lo que dice un líder.')
      ],
      deal: L('You\'ve convinced me. I\'m recommending you for the role, with a plan to keep your colleague growing too.', 'Me has convencido. Te voy a recomendar para el puesto, con un plan para que tu compañero también siga creciendo.'),
      fail: L('I think we\'re done here. I\'ll let you know my decision.', 'Creo que hemos terminado. Te haré saber mi decisión.'),
      timeout: L('I need to think it over. I\'ll be in touch.', 'Necesito pensarlo. Te diré algo.'),
      tip: L('Never criticize your rival; it backfires. Uncover the director\'s doubts and fears, address them directly, and show you can lead the whole team, including your colleague.',
        'Nunca critiques a tu rival; se vuelve en tu contra. Descubre las dudas y los miedos de la directora, abórdalos directamente y demuestra que puedes liderar a todo el equipo, incluido tu compañero.')
    },
    {
      id: 'investor-equity', level: 'hard', category: 'business', type: 'deal', register: 'business',
      unit: 'pct', start: 35, target: 20, step: 1, ackerman: false,
      tactics: ['anchoring', 'fakeDeadline', 'takeItOrLeaveIt'],
      who: { name: 'Charles Whitmore', gender: 'm', role: L('Venture investor', 'Inversor de capital riesgo') },
      title: L('An investor who wants too much of your company', 'Un inversor que quiere demasiado de tu empresa'),
      brief: L('Your startup needs $1 million to grow. An experienced investor is interested, but his term sheet asks for a large share of the company. You want his money and his network, not his control.',
        'Tu startup necesita un millón de dólares para crecer. Un inversor experimentado está interesado, pero su propuesta pide una gran parte de la empresa. Quieres su dinero y sus contactos, no su control.'),
      goal: L('Give up {target} equity or less for the investment. He wants {start}.', 'Ceder {target} de participación o menos por la inversión. Él quiere {start}.'),
      item: L('the equity', 'la participación'),
      open: L('I like the team, I like the product. But it\'s early and risky. For one million, I need {price} of the company.', 'Me gusta el equipo, me gusta el producto. Pero es pronto y arriesgado. Por un millón, necesito el {price} de la empresa.'),
      motives: [
        L('My fund needs to deploy its remaining capital this year. I can\'t sit on it.', 'Mi fondo necesita invertir el capital que le queda este año. No puedo quedármelo parado.'),
        L('Two of my partners passed on a company like yours that later became huge. I don\'t want to repeat that.', 'Dos de mis socios rechazaron una empresa como la tuya que luego se hizo enorme. No quiero repetir eso.'),
        L('What I care about most is a board seat and information rights. The percentage is negotiable.', 'Lo que más me importa es un asiento en el consejo y derechos de información. El porcentaje es negociable.'),
        L('I\'ve heard another fund is circling you. I\'d rather lead this round than lose it.', 'He oído que otro fondo te está rondando. Prefiero liderar esta ronda que perderla.')
      ],
      deal: L('{price} for one million, with a board seat. Let\'s shake on it.', 'El {price} por un millón, con un asiento en el consejo. Démonos la mano.'),
      nodeal: L('Then I wish you the best. The offer expires at the end of the week.', 'Entonces te deseo lo mejor. La oferta vence al final de la semana.'),
      tip: L('Investors anchor high and create urgency. Find out what they really need (control, returns, timing) and give them that, rather than more of your company.',
        'Los inversores anclan alto y crean urgencia. Descubre qué necesitan realmente (control, rentabilidad, plazos) y dales eso, en lugar de más de tu empresa.')
    },
    {
      id: 'partnership-split', level: 'hard', category: 'business', type: 'deal', register: 'business',
      unit: 'pct', start: 40, target: 50, step: 1, ackerman: false,
      tactics: ['anchoring', 'goodCopBadCop'],
      who: { name: 'Olivia Grant', gender: 'f', role: L('Potential business partner', 'Posible socia de negocios') },
      title: L('Negotiating a partnership split', 'Negociar el reparto de una sociedad'),
      brief: L('You and Olivia want to launch a consulting firm together. You bring the clients; she brings the capital and operations experience. She has proposed an unequal split.',
        'Tú y Olivia quieren fundar juntas una consultora. Tú aportas los clientes; ella, el capital y la experiencia operativa. Ella ha propuesto un reparto desigual.'),
      goal: L('Secure {target} or more of the company. She offers you {start}.', 'Asegurar el {target} o más de la empresa. Ella te ofrece el {start}.'),
      item: L('the partnership', 'la sociedad'),
      open: L('I\'m putting in the money and the systems. I think {price} for you is generous, honestly.', 'Yo pongo el dinero y los sistemas. Sinceramente, creo que el {price} para ti es generoso.'),
      motives: [
        L('My last partnership ended badly. My partner stopped working but kept his share. I\'m terrified of that happening again.', 'Mi última sociedad terminó mal. Mi socio dejó de trabajar pero conservó su parte. Me aterra que vuelva a pasar.'),
        L('My husband is nervous about how much of our savings I\'m putting in. I need to show him I\'m protected.', 'Mi marido está nervioso por la cantidad de nuestros ahorros que voy a invertir. Necesito demostrarle que estoy protegida.'),
        L('Without your clients, this firm doesn\'t exist for the first two years. I know that.', 'Sin tus clientes, esta empresa no existe durante los dos primeros años. Lo sé.'),
        L('Honestly, I\'d accept an equal split if there were clear rules about what happens if someone stops contributing.', 'Sinceramente, aceptaría un reparto igual si hubiera reglas claras sobre qué pasa si alguien deja de aportar.')
      ],
      deal: L('{price} for you, with vesting and a clear exit clause. Partners.', 'El {price} para ti, con consolidación progresiva y una cláusula de salida clara. Socias.'),
      nodeal: L('Maybe we\'re not the right partners after all.', 'Quizás al final no somos las socias adecuadas.'),
      tip: L('In a partnership, how you negotiate predicts how you will work together. Uncover the fear behind her position, and solve it with structure rather than percentage points.',
        'En una sociedad, cómo negocias anticipa cómo trabajarán juntos. Descubre el miedo detrás de su posición y resuélvelo con estructura en lugar de con puntos porcentuales.')
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
