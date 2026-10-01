/* Medium scenarios — occasional situations; the counterpart pushes back and hides information. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  NX.scenarios = NX.scenarios || [];
  const L = (en, es) => ({ en, es });

  NX.scenarios.push(
    {
      id: 'used-car-private', level: 'medium', category: 'everyday', type: 'deal', register: 'business',
      unit: 'usd', start: 12500, target: 10500, step: 100,
      who: { name: 'Rick', gender: 'm', role: L('Private car seller', 'Vendedor particular de coches') },
      title: L('Buying a used car from a private seller', 'Comprar un coche usado a un particular'),
      brief: L('You are test-driving a seven-year-old sedan listed online. It drives well, but you noticed the brakes squeak and the service records stop two years ago. The seller is friendly but guarded.',
        'Estás probando un sedán de siete años anunciado en internet. Va bien, pero notaste que los frenos chirrían y el historial de mantenimiento se detiene hace dos años. El vendedor es amable pero reservado.'),
      goal: L('Buy the car for {target} or less. He is asking {start}.', 'Comprar el coche por {target} o menos. Pide {start}.'),
      item: L('the car', 'el coche'),
      open: L('So, she drives like a dream, right? I\'m asking {price}. I\'ve had a lot of calls about it.', 'Qué, va como la seda, ¿verdad? Pido {price}. He recibido muchas llamadas por él.'),
      motives: [
        L('Alright, honestly? I already bought my new car. I\'m paying insurance on two vehicles right now.', 'Bueno, ¿sinceramente? Ya compré mi coche nuevo. Ahora mismo estoy pagando el seguro de dos vehículos.'),
        L('The brakes will need pads soon, I know. And I skipped the last two services because life got busy.', 'Los frenos van a necesitar pastillas pronto, lo sé. Y me salté los dos últimos mantenimientos porque se me complicó la vida.'),
        L('"A lot of calls"... well, two calls. And one person didn\'t show up.', '«Muchas llamadas»... bueno, dos llamadas. Y una persona no vino.'),
        L('A dealer offered me nine thousand as a trade-in. I was hoping to do better than that on my own.', 'Un concesionario me ofreció nueve mil como parte de pago. Esperaba sacar más vendiéndolo yo.')
      ],
      deal: L('{price}. Alright, you\'ve got yourself a car. Let\'s do the paperwork.', '{price}. De acuerdo, ya tienes coche. Hagamos el papeleo.'),
      nodeal: L('Your call. Someone else will snap it up.', 'Tú decides. Otro se lo llevará.'),
      tip: L('Private sellers exaggerate demand. Use calibrated questions to test their claims, and labels to bring hidden problems into the open without accusing.',
        'Los vendedores particulares exageran la demanda. Usa preguntas calibradas para poner a prueba lo que dicen, y etiquetas para sacar a la luz problemas ocultos sin acusar.')
    },
    {
      id: 'car-dealership', level: 'medium', category: 'everyday', type: 'deal', register: 'business',
      unit: 'usd', start: 34900, target: 31000, step: 100,
      tactics: ['higherAuthority', 'nibble', 'deadline'],
      who: { name: 'Brad', gender: 'm', role: L('Dealership sales associate', 'Vendedor de concesionario') },
      title: L('A new car at a dealership full of sales tactics', 'Un coche nuevo en un concesionario lleno de tácticas'),
      brief: L('You want a new compact SUV. The dealership is busy, the salesperson is polished, and you can expect the classic moves: a manager in the back room, add-ons and urgency.',
        'Quieres un SUV compacto nuevo. El concesionario está lleno, el vendedor es muy hábil y puedes esperar las jugadas clásicas: un gerente en la trastienda, extras y urgencia.'),
      goal: L('Buy the SUV, out the door, for {target} or less. The sticker price is {start}.', 'Comprar el SUV, con todo incluido, por {target} o menos. El precio de lista es {start}.'),
      item: L('the SUV', 'el SUV'),
      open: L('This one\'s loaded and it won\'t last. Sticker is {price}, and that\'s already a great number.', 'Este viene completo y no va a durar. El precio de lista es {price}, y ya es una gran cifra.'),
      motives: [
        L('Between you and me, it\'s the last week of the quarter. The dealership gets a manufacturer bonus if we hit our number.', 'Entre tú y yo, es la última semana del trimestre. El concesionario recibe un bono del fabricante si llegamos a la meta.'),
        L('That color has been on the lot for ninety days. Every day it sits, it costs us money.', 'Ese color lleva noventa días en el patio. Cada día que pasa ahí, nos cuesta dinero.'),
        L('My manager can go lower than he says. He always starts by saying no.', 'Mi gerente puede bajar más de lo que dice. Siempre empieza diciendo que no.'),
        L('The extended warranty and paint protection are where we make most of our profit, honestly.', 'La garantía extendida y la protección de pintura son donde más ganamos, sinceramente.')
      ],
      deal: L('{price} out the door. Let me get the keys before my manager reconsiders.', '{price} con todo incluido. Déjame traer las llaves antes de que mi gerente lo piense dos veces.'),
      nodeal: L('Alright. But this price won\'t be here tomorrow.', 'Muy bien. Pero este precio no estará mañana.'),
      tip: L('Dealerships run on scripts: the absent manager, last-minute extras, "today only". Recognize each tactic, label it calmly, and keep the conversation on the total price.',
        'Los concesionarios funcionan con guiones: el gerente ausente, los extras de última hora, el «solo hoy». Reconoce cada táctica, etiquétala con calma y mantén la conversación en el precio total.')
    },
    {
      id: 'rent-renewal', level: 'medium', category: 'home', type: 'deal', register: 'business',
      unit: 'usdmo', start: 1950, target: 1800, step: 10, ackerman: false,
      who: { name: 'Mrs. Castellano', gender: 'f', role: L('Landlord', 'Propietaria') },
      title: L('Negotiating a rent renewal', 'Negociar la renovación del alquiler'),
      brief: L('Your lease is up for renewal and your landlord has proposed a sizable rent increase. You have been a reliable tenant for three years and would like to stay at your current rent.',
        'Tu contrato de alquiler se renueva y tu propietaria propone un aumento considerable. Llevas tres años siendo un inquilino fiable y te gustaría quedarte con el alquiler actual.'),
      goal: L('Renew at {target} per month or less. She proposes {start}.', 'Renovar por {target} al mes o menos. Ella propone {start}.'),
      item: L('the lease', 'el contrato'),
      open: L('Prices in the area have gone up a lot. For the renewal I\'m asking {price}. I think you\'ll find that\'s market rate.', 'Los precios en la zona han subido mucho. Para la renovación pido {price}. Verás que es el precio de mercado.'),
      motives: [
        L('My last tenant before you left the place in terrible shape. It took two months and a lot of money to fix.', 'El inquilino anterior dejó el piso en un estado terrible. Tardé dos meses y mucho dinero en arreglarlo.'),
        L('Every month the apartment sits empty costs me more than a small increase would earn.', 'Cada mes que el piso está vacío me cuesta más de lo que ganaría con un aumento pequeño.'),
        L('My property taxes went up, and I\'m worried about covering them this year.', 'Me subieron los impuestos de la propiedad y me preocupa poder pagarlos este año.'),
        L('You always pay on time and you fixed the leaky faucet yourself. I noticed.', 'Siempre pagas a tiempo y arreglaste tú mismo el grifo que goteaba. Lo noté.')
      ],
      deal: L('Alright. {price} per month, for another year. You\'re a good tenant.', 'De acuerdo. {price} al mes, por un año más. Eres un buen inquilino.'),
      nodeal: L('Then I\'ll have to list it at market rate. Let me know by the end of the month.', 'Entonces tendré que anunciarlo a precio de mercado. Avísame antes de fin de mes.'),
      tip: L('Landlords fear vacancy and bad tenants more than they love a small increase. Uncover their real costs and remind them, gently, what a reliable tenant is worth.',
        'Los propietarios temen más un piso vacío o un mal inquilino de lo que valoran un pequeño aumento. Descubre sus costos reales y recuérdale, con tacto, lo que vale un inquilino fiable.')
    },
    {
      id: 'car-repair-bill', level: 'medium', category: 'everyday', type: 'deal', register: 'business',
      unit: 'usd', start: 1450, target: 950, step: 10,
      who: { name: 'Gus', gender: 'm', role: L('Auto shop owner', 'Dueño del taller mecánico') },
      title: L('Disputing a high car repair bill', 'Disputar una factura de reparación excesiva'),
      brief: L('You took your car in for a brake job quoted at around $900. When you came to pick it up, the bill was much higher, with extra work you never approved.',
        'Llevaste tu coche para cambiar los frenos con un presupuesto de unos 900 $. Al recogerlo, la factura era mucho mayor, con trabajos extra que nunca aprobaste.'),
      goal: L('Pay {target} or less. The bill says {start}.', 'Pagar {target} o menos. La factura dice {start}.'),
      item: L('the bill', 'la factura'),
      open: L('Here you go. Brakes, rotors, a new caliper and fluids. Total is {price}. We found more than we expected.', 'Aquí tiene. Frenos, discos, una pinza nueva y líquidos. El total es {price}. Encontramos más de lo que esperábamos.'),
      motives: [
        L('Look... my mechanic should have called you before replacing the caliper. That\'s on us.', 'Mire... mi mecánico debió llamarle antes de cambiar la pinza. Eso es culpa nuestra.'),
        L('I can\'t take the parts back once they\'re installed. That\'s what worries me.', 'No puedo devolver las piezas una vez instaladas. Eso es lo que me preocupa.'),
        L('Online reviews are everything for a small shop. One bad review costs me more than this argument.', 'Las reseñas en internet lo son todo para un taller pequeño. Una mala reseña me cuesta más que esta discusión.'),
        L('Honestly, the labor hours are padded a bit. We bill by the book, not by the clock.', 'Sinceramente, las horas de mano de obra están algo infladas. Cobramos según el manual, no según el reloj.')
      ],
      deal: L('{price}, and I\'ll talk to my guy about calling customers first. Fair?', '{price}, y hablaré con mi mecánico para que llame primero a los clientes. ¿Justo?'),
      nodeal: L('Then the car stays here until the bill is settled.', 'Entonces el coche se queda aquí hasta que se pague la factura.'),
      tip: L('You have a strong point (you never approved the extra work) but anger will make the owner defend his staff. Label the situation, and let him own the mistake.',
        'Tienes un argumento sólido (nunca aprobaste el trabajo extra), pero el enfado hará que el dueño defienda a su equipo. Etiqueta la situación y deja que él asuma el error.')
    },
    {
      id: 'contractor-renovation', level: 'medium', category: 'home', type: 'deal', register: 'business',
      unit: 'usd', start: 28000, target: 22000, step: 250,
      who: { name: 'Elena', gender: 'f', role: L('General contractor', 'Contratista general') },
      title: L('Hiring a contractor for a renovation', 'Contratar a una contratista para una reforma'),
      brief: L('You want your kitchen renovated before the holidays. Elena\'s crew has excellent references, but her quote is well above your budget. You would rather hire her than the cheapest bidder.',
        'Quieres reformar la cocina antes de las fiestas. El equipo de Elena tiene excelentes referencias, pero su presupuesto supera con creces el tuyo. Prefieres contratarla a ella que al más barato.'),
      goal: L('Agree on {target} or less for the full job. Her quote is {start}.', 'Acordar {target} o menos por toda la obra. Su presupuesto es {start}.'),
      item: L('the renovation', 'la reforma'),
      open: L('I went through everything. To do this properly, with quality materials, it\'s {price}. And I\'m booked solid in spring.', 'Lo revisé todo. Para hacerlo bien, con materiales de calidad, son {price}. Y en primavera estoy completamente ocupada.'),
      motives: [
        L('Actually, a big project of mine just got postponed. I have a crew free for the next six weeks.', 'En realidad, un proyecto grande se me acaba de aplazar. Tengo un equipo libre durante las próximas seis semanas.'),
        L('About a third of that quote is the cabinet line I suggested. There are good options for much less.', 'Un tercio de ese presupuesto son los muebles que sugerí. Hay buenas opciones por mucho menos.'),
        L('I lose money when clients change their minds mid-project. A clear scope matters more to me than the top price.', 'Pierdo dinero cuando los clientes cambian de opinión a mitad de obra. Un alcance claro me importa más que el precio máximo.'),
        L('Projects in this neighborhood bring me referrals. A good photo of this kitchen is worth a lot to me.', 'Las obras en este barrio me traen recomendaciones. Una buena foto de esta cocina vale mucho para mí.')
      ],
      deal: L('{price}, with the scope we agreed in writing. We can start Monday.', '{price}, con el alcance que acordamos por escrito. Podemos empezar el lunes.'),
      nodeal: L('I understand. My quote stays valid for two weeks.', 'Lo entiendo. Mi presupuesto es válido durante dos semanas.'),
      tip: L('Contractors protect themselves from risk in their quotes. Learn what drives the price (scope, materials, scheduling) and solve their worries instead of only cutting their margin.',
        'Los contratistas se protegen del riesgo en sus presupuestos. Averigua qué determina el precio (alcance, materiales, calendario) y resuelve sus preocupaciones en lugar de solo recortar su margen.')
    },
    {
      id: 'wedding-vendor', level: 'medium', category: 'home', type: 'deal', register: 'business',
      unit: 'usd', start: 4800, target: 3600, step: 50,
      who: { name: 'Nadia', gender: 'f', role: L('Wedding photographer', 'Fotógrafa de bodas') },
      title: L('Negotiating with a wedding vendor', 'Negociar con un proveedor de boda'),
      brief: L('You love Nadia\'s photography, but her full-day wedding package is far over budget. Your wedding is on a Friday in late autumn.',
        'Te encanta el trabajo de Nadia, pero su paquete de boda de día completo supera con creces tu presupuesto. Tu boda es un viernes de finales de otoño.'),
      goal: L('Book her for {target} or less. Her package is {start}.', 'Contratarla por {target} o menos. Su paquete cuesta {start}.'),
      item: L('the package', 'el paquete'),
      open: L('Congratulations! My full-day package is {price}. That includes two photographers and an album.', '¡Enhorabuena! Mi paquete de día completo cuesta {price}. Incluye dos fotógrafos y un álbum.'),
      motives: [
        L('Friday dates in November are really hard for me to book. Most couples want Saturdays in summer.', 'Las fechas en viernes de noviembre son muy difíciles de cubrir para mí. La mayoría de parejas quiere sábados de verano.'),
        L('The printed album alone costs me almost eight hundred. Many couples never even open it.', 'Solo el álbum impreso me cuesta casi ochocientos. Muchas parejas ni siquiera lo abren.'),
        L('I\'m building a portfolio for a new style of venue. Your venue is exactly what I want to shoot.', 'Estoy creando un portafolio para un nuevo tipo de lugar. El tuyo es exactamente lo que quiero fotografiar.'),
        L('A couple cancelled on me last year after I turned other clients away. A firm booking with a deposit means a lot.', 'El año pasado una pareja me canceló después de que yo rechazara a otros clientes. Una reserva firme con anticipo significa mucho.')
      ],
      deal: L('{price}, booked. Send the deposit this week and the date is yours.', '{price}, reservado. Envía el anticipo esta semana y la fecha es tuya.'),
      nodeal: L('I understand. I hope your day is beautiful.', 'Lo entiendo. Espero que tu día sea precioso.'),
      tip: L('Creative vendors price their art, but their calendar is their real constraint. Off-peak dates, flexible deliverables and firm commitments all have value to them.',
        'Los proveedores creativos ponen precio a su arte, pero su calendario es su verdadera limitación. Las fechas fuera de temporada, las entregas flexibles y los compromisos firmes tienen valor para ellos.')
    },
    {
      id: 'remote-work', level: 'medium', category: 'work', type: 'deal', register: 'business',
      unit: 'dpw', start: 0, target: 3, step: 1, ackerman: false,
      who: { name: 'Mr. Lindqvist', gender: 'm', role: L('Your manager', 'Tu gerente') },
      title: L('Requesting to work remotely', 'Solicitar trabajar en remoto'),
      brief: L('Your commute takes three hours a day and your output has been strong. You want to work from home part of the week. Your manager is old-school and values visibility.',
        'Tu trayecto al trabajo te lleva tres horas al día y tu rendimiento ha sido excelente. Quieres trabajar desde casa parte de la semana. Tu jefe es de la vieja escuela y valora la presencia.'),
      goal: L('Agree to {target} or more of remote work. He currently allows {start}.', 'Acordar {target} o más de trabajo en remoto. Ahora permite {start}.'),
      item: L('remote work', 'el trabajo en remoto'),
      open: L('I know people like working from home, but I believe in teams being together. Right now the policy is {price}.', 'Sé que a la gente le gusta trabajar desde casa, pero creo en los equipos que están juntos. Ahora la política es {price}.'),
      motives: [
        L('Frankly, I tried remote work with a previous team and communication fell apart. I was the one who had to fix it.', 'Francamente, probé el trabajo remoto con un equipo anterior y la comunicación se vino abajo. Fui yo quien tuvo que arreglarlo.'),
        L('My director asks me where people are. If I can\'t answer, I look like I\'m not managing.', 'Mi director me pregunta dónde está la gente. Si no sé responder, parece que no gestiono.'),
        L('Two people on the team are interviewing elsewhere for remote jobs. I\'m worried about losing good people.', 'Dos personas del equipo están en entrevistas para trabajos remotos. Me preocupa perder buena gente.'),
        L('I don\'t doubt your work. Your numbers are among the best on the team.', 'No dudo de tu trabajo. Tus resultados están entre los mejores del equipo.')
      ],
      deal: L('Let\'s try {price} for three months, with clear check-ins. If it works, we keep it.', 'Probemos {price} durante tres meses, con seguimientos claros. Si funciona, lo mantenemos.'),
      nodeal: L('Let\'s revisit this next quarter.', 'Volvamos a hablarlo el próximo trimestre.'),
      tip: L('Managers resist remote work out of fear: losing control, looking bad to their boss. Find the fear, then propose a trial with safeguards that remove it.',
        'Los jefes se resisten al trabajo remoto por miedo: a perder el control, a quedar mal ante su superior. Encuentra el miedo y propón una prueba con garantías que lo elimine.')
    },
    {
      id: 'late-payment', level: 'medium', category: 'business', type: 'deal', register: 'business',
      unit: 'usd', start: 1000, target: 4000, step: 250, ackerman: false,
      who: { name: 'Greg', gender: 'm', role: L('Client, operations director', 'Cliente, director de operaciones') },
      title: L('Collecting a late payment from a client', 'Cobrar un pago atrasado a un cliente'),
      brief: L('You delivered a project for a client two months ago, invoiced $4,000 and have not been paid. You want the money without losing a client who has sent you good work.',
        'Entregaste un proyecto a un cliente hace dos meses, facturaste 4.000 $ y no has cobrado. Quieres el dinero sin perder a un cliente que te ha dado buenos encargos.'),
      goal: L('Collect {target} this week. He offers {start} now.', 'Cobrar {target} esta semana. Él ofrece {start} ahora.'),
      item: L('the payment', 'el pago'),
      open: L('Sorry, things have been hectic. I can probably get you {price} this week, and the rest... soon.', 'Perdona, todo ha sido una locura. Probablemente pueda darte {price} esta semana, y el resto... pronto.'),
      motives: [
        L('Okay, the truth is our finance team froze payments while we switch accounting systems.', 'Bueno, la verdad es que nuestro equipo financiero congeló los pagos mientras cambiamos de sistema contable.'),
        L('I can approve urgent payments myself if a vendor is critical. I just have to justify it.', 'Puedo aprobar pagos urgentes yo mismo si un proveedor es crítico. Solo tengo que justificarlo.'),
        L('Honestly, I\'m embarrassed. I promised you this would be paid a month ago.', 'Sinceramente, me da vergüenza. Te prometí que esto se pagaría hace un mes.'),
        L('We have another project coming up and I want you on it. I don\'t want this to sour things.', 'Tenemos otro proyecto en camino y te quiero en él. No quiero que esto estropee la relación.')
      ],
      deal: L('I\'ll push through {price} as an urgent payment today. You\'ll see it by Friday.', 'Hoy tramito {price} como pago urgente. Lo verás el viernes.'),
      nodeal: L('Let me see what I can do and get back to you.', 'Déjame ver qué puedo hacer y te digo algo.'),
      tip: L('Late payers are often embarrassed, not malicious. An accusation audit lets them save face, and calibrated questions reveal who can actually release the money.',
        'Quien paga tarde suele estar avergonzado, no actuar de mala fe. Una auditoría de acusaciones le permite quedar bien, y las preguntas calibradas revelan quién puede liberar el dinero.')
    },
    {
      id: 'scope-creep', level: 'medium', category: 'business', type: 'deal', register: 'business',
      unit: 'usd', start: 300, target: 1800, step: 50,
      who: { name: 'Priscilla', gender: 'f', role: L('Client, marketing manager', 'Cliente, gerente de marketing') },
      title: L('Scope creep: extra work without extra pay', 'Ampliación del alcance: trabajo extra sin pago extra'),
      brief: L('You are building a website for a fixed fee. The client keeps adding pages and features "while you\'re at it". The extra work is now worth about $1,800, and she has offered a token amount.',
        'Estás creando un sitio web por una tarifa fija. La clienta sigue añadiendo páginas y funciones «ya que estás». El trabajo extra vale ya unos 1.800 $, y te ofrece una cantidad simbólica.'),
      goal: L('Get paid {target} or more for the extra work. She offers {start}.', 'Cobrar {target} o más por el trabajo extra. Ella ofrece {start}.'),
      item: L('the extra work', 'el trabajo extra'),
      open: L('These are small things really, it shouldn\'t take long. I could add {price} as a thank-you.', 'En realidad son cositas, no debería llevarte mucho. Podría añadir {price} como agradecimiento.'),
      motives: [
        L('My boss keeps adding requests after every review meeting. I\'m just passing them along.', 'Mi jefe añade peticiones después de cada reunión de revisión. Yo solo las transmito.'),
        L('There\'s a separate budget line for website changes that I haven\'t touched yet.', 'Hay una partida aparte para cambios del sitio web que todavía no he tocado.'),
        L('The launch date is fixed for a trade show. If the site isn\'t ready, I\'m the one in trouble.', 'La fecha de lanzamiento está fijada para una feria. Si el sitio no está listo, la que tiene problemas soy yo.'),
        L('I didn\'t realize how much work these were. I don\'t really know how websites are built.', 'No me di cuenta de cuánto trabajo eran. La verdad no sé bien cómo se hacen los sitios web.')
      ],
      deal: L('Okay, {price} for the additions. I\'ll send a written change order today.', 'De acuerdo, {price} por las ampliaciones. Hoy envío una orden de cambio por escrito.'),
      nodeal: L('Let\'s just stick to the original scope then.', 'Entonces quedémonos con el alcance original.'),
      tip: L('Scope creep often comes from someone else above your client. Make the extra work visible, and help her get it approved, instead of making her the enemy.',
        'La ampliación del alcance suele venir de alguien por encima de tu cliente. Haz visible el trabajo extra y ayúdala a conseguir la aprobación, en lugar de convertirla en tu enemiga.')
    },
    {
      id: 'payment-plan', level: 'medium', category: 'home', type: 'deal', register: 'service',
      unit: 'usdmo', start: 600, target: 250, step: 10,
      who: { name: 'Mr. Hayes', gender: 'm', role: L('Hospital billing officer', 'Responsable de facturación del hospital') },
      title: L('A payment plan for a large, unexpected bill', 'Un plan de pagos para una factura grande e inesperada'),
      brief: L('An emergency procedure left you with a $7,200 hospital bill that insurance did not cover. You want to pay it, but not at a monthly amount that breaks your budget.',
        'Una intervención de urgencia te dejó una factura hospitalaria de 7.200 $ que el seguro no cubrió. Quieres pagarla, pero no con una cuota mensual que arruine tu presupuesto.'),
      goal: L('Agree on a monthly payment of {target} or less. They ask {start}.', 'Acordar una cuota mensual de {target} o menos. Piden {start}.'),
      item: L('the payment plan', 'el plan de pagos'),
      open: L('Our standard plan for a balance this size is {price} per month over twelve months.', 'Nuestro plan estándar para un saldo de este tamaño es de {price} al mes durante doce meses.'),
      motives: [
        L('Accounts that go to collections only recover a fraction for us. A steady payer is much better.', 'Las cuentas que pasan a cobranza solo nos recuperan una fracción. Alguien que paga con constancia es mucho mejor.'),
        L('We do have a financial assistance program. Most people never ask about it.', 'Tenemos un programa de ayuda económica. La mayoría de la gente nunca pregunta por él.'),
        L('I can extend plans up to thirty months without a supervisor if the patient is making a good-faith effort.', 'Puedo extender planes hasta treinta meses sin supervisor si el paciente demuestra buena fe.'),
        L('Honestly, the bill may include charges coded incorrectly. An itemized review often lowers the balance.', 'Sinceramente, la factura puede incluir cargos mal codificados. Una revisión detallada a menudo reduce el saldo.')
      ],
      deal: L('Alright. I\'ve set up the plan at {price} per month, with no interest.', 'De acuerdo. He configurado el plan en {price} al mes, sin intereses.'),
      nodeal: L('The standard plan remains available if you change your mind.', 'El plan estándar sigue disponible si cambia de opinión.'),
      tip: L('Billing departments would rather receive steady payments than send an account to collections. Ask what options exist; programs that nobody advertises often do.',
        'Los departamentos de facturación prefieren recibir pagos constantes antes que enviar una cuenta a cobranza. Pregunta qué opciones hay; suelen existir programas que nadie anuncia.')
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
