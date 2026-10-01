/* Easy scenarios — common situations with a little more resistance. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  NX.scenarios = NX.scenarios || [];
  const L = (en, es) => ({ en, es });

  NX.scenarios.push(
    {
      id: 'phone-bill', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usdmo', start: 95, target: 65, step: 1,
      who: { name: 'Marcus', gender: 'm', role: L('Customer service agent', 'Agente de atención al cliente') },
      title: L('Lowering your phone and internet bill', 'Bajar tu factura de teléfono e internet'),
      brief: L('Your promotional rate expired and your phone and internet bundle jumped overnight. A competitor advertises a lower price, but switching is a hassle. You call your provider.',
        'Tu tarifa promocional venció y tu paquete de teléfono e internet subió de un día para otro. Un competidor anuncia un precio menor, pero cambiarse es un lío. Llamas a tu proveedor.'),
      goal: L('Bring the monthly bill down to {target} or less. It is now {start}.', 'Bajar la factura mensual a {target} o menos. Ahora es de {start}.'),
      item: L('the plan', 'el plan'),
      open: L('Thanks for holding. I see your promotion ended, so your bundle is now at the standard rate of {price}. How can I help?', 'Gracias por esperar. Veo que su promoción terminó, así que su paquete está ahora en la tarifa estándar de {price}. ¿En qué puedo ayudarle?'),
      motives: [
        L('I\'ll be honest, keeping an existing customer is much cheaper for us than finding a new one.', 'Le seré sincero: mantener a un cliente actual nos sale mucho más barato que conseguir uno nuevo.'),
        L('There are loyalty offers in my system that I\'m not supposed to mention unless the customer brings up leaving.', 'En mi sistema hay ofertas de fidelidad que se supone que no debo mencionar a menos que el cliente hable de irse.'),
        L('My team gets evaluated on how many customers we retain this month, and we\'re behind.', 'A mi equipo lo evalúan por cuántos clientes retenemos este mes, y vamos atrasados.'),
        L('You\'ve been with us six years. Accounts like yours are flagged as high value.', 'Lleva seis años con nosotros. Las cuentas como la suya están marcadas como de alto valor.')
      ],
      deal: L('Okay, I\'ve applied a loyalty plan: {price}, locked in for twelve months.', 'Listo, he aplicado un plan de fidelidad: {price}, fijo durante doce meses.'),
      nodeal: L('I understand. If you change your mind, we\'re here.', 'Entiendo. Si cambia de opinión, aquí estaremos.'),
      tip: L('Service agents follow scripts, but most have retention offers they only unlock for the right customer. Be warm, show you understand their constraints, and make it easy for them to help you.',
        'Los agentes siguen guiones, pero la mayoría tiene ofertas de retención que solo desbloquean para el cliente adecuado. Sé cordial, demuestra que entiendes sus limitaciones y pónselo fácil para ayudarte.')
    },
    {
      id: 'furniture-store', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 1400, target: 1100, step: 10,
      who: { name: 'Daniel', gender: 'm', role: L('Furniture salesperson', 'Vendedor de muebles') },
      title: L('A better price on furniture', 'Un mejor precio en muebles'),
      brief: L('You have found the perfect sofa at a large furniture store. The tag shows the full price. Salespeople here work on commission, and the end of the month is two days away.',
        'Encontraste el sofá perfecto en una gran tienda de muebles. La etiqueta muestra el precio completo. Los vendedores trabajan a comisión y faltan dos días para fin de mes.'),
      goal: L('Buy the sofa for {target} or less. The tag says {start}.', 'Comprar el sofá por {target} o menos. La etiqueta dice {start}.'),
      item: L('the sofa', 'el sofá'),
      open: L('Great choice, that\'s one of our best sellers. It\'s {price}, and delivery is available next week.', 'Excelente elección, es uno de nuestros más vendidos. Cuesta {price} y podemos entregarlo la semana que viene.'),
      motives: [
        L('That exact model is the floor sample. A new shipment in a different fabric arrives next month.', 'Ese modelo exacto es el de exposición. El mes que viene llega un pedido nuevo con otra tela.'),
        L('If I hit one more sale this month, I reach my bonus tier. So yes, I\'m motivated.', 'Si cierro una venta más este mes, alcanzo mi nivel de bonificación. Así que sí, estoy motivado.'),
        L('My manager has approved discounts of up to twenty percent on floor models. I usually start lower.', 'Mi gerente ha aprobado descuentos de hasta el veinte por ciento en modelos de exposición. Normalmente empiezo con menos.'),
        L('The warehouse is full. They\'d rather move stock than pay to store it.', 'El almacén está lleno. Prefieren mover el inventario antes que pagar por guardarlo.')
      ],
      deal: L('{price}. Let me write it up before my manager changes his mind.', '{price}. Déjeme hacer el pedido antes de que mi gerente cambie de opinión.'),
      nodeal: L('No problem. Here\'s my card if you decide to come back.', 'Sin problema. Aquí tiene mi tarjeta por si decide volver.'),
      tip: L('Commission and month-end targets create flexibility. Find out what the salesperson needs, and ask about the item itself; floor models and old stock often have room.',
        'Las comisiones y los objetivos de fin de mes crean flexibilidad. Averigua qué necesita el vendedor y pregunta por el producto; los modelos de exposición y el stock antiguo suelen tener margen.')
    },
    {
      id: 'defective-return', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 80, target: 240, step: 5, ackerman: false,
      who: { name: 'Hannah', gender: 'f', role: L('Store returns supervisor', 'Supervisora de devoluciones') },
      title: L('Returning a defective product', 'Devolver un producto defectuoso'),
      brief: L('The blender you bought three weeks ago for $240 stopped working. The store says opened items cannot be refunded, only partially credited. You have your receipt.',
        'La licuadora que compraste hace tres semanas por 240 $ dejó de funcionar. La tienda dice que los artículos abiertos no se reembolsan, solo se abonan parcialmente. Tienes tu recibo.'),
      goal: L('Get a refund of {target} (the full price). They offer {start}.', 'Conseguir un reembolso de {target} (el precio completo). Te ofrecen {start}.'),
      item: L('the refund', 'el reembolso'),
      open: L('I\'m sorry, our policy is no refunds on opened appliances. The most I can do is {price} in store credit.', 'Lo siento, nuestra política es no reembolsar electrodomésticos abiertos. Lo máximo que puedo hacer es {price} en crédito de tienda.'),
      motives: [
        L('Between us, that model has had several returns this month. We know there\'s a batch problem.', 'Entre nosotros, ese modelo ha tenido varias devoluciones este mes. Sabemos que hay un problema con un lote.'),
        L('The manufacturer reimburses us for defective units, so a refund doesn\'t actually cost the store.', 'El fabricante nos reembolsa las unidades defectuosas, así que un reembolso en realidad no le cuesta nada a la tienda.'),
        L('I had three angry customers before you. You\'re the first one who\'s been calm, and I appreciate it.', 'Tuve tres clientes enfadados antes que usted. Es la primera persona que mantiene la calma, y se lo agradezco.'),
        L('I can override the policy for defects, but I need to be able to justify it in the system.', 'Puedo saltarme la política en caso de defecto, pero necesito poder justificarlo en el sistema.')
      ],
      deal: L('Alright. I\'ve processed it as a defect: {price} back to your card.', 'De acuerdo. Lo he procesado como defecto: {price} de vuelta a su tarjeta.'),
      nodeal: L('I\'m sorry I couldn\'t do more. The credit offer stands.', 'Siento no poder hacer más. La oferta de crédito sigue en pie.'),
      tip: L('Rules like "no refunds" often have exceptions that staff can use if you give them a reason. Stay calm while others shout; it makes you the customer they want to help.',
        'Las reglas como «no hay reembolsos» suelen tener excepciones que el personal puede usar si le das un motivo. Mantén la calma mientras otros gritan; te convierte en el cliente al que quieren ayudar.')
    },
    {
      id: 'deadline-extension', level: 'easy', category: 'work', type: 'deal', register: 'business',
      unit: 'days', start: 1, target: 5, step: 1, ackerman: false,
      who: { name: 'Ms. Okafor', gender: 'f', role: L('Manager (or teacher)', 'Gerente (o profesora)') },
      title: L('Asking for a deadline extension', 'Pedir una prórroga de plazo'),
      brief: L('A major report is due Friday, but a family emergency cost you three days. Your manager is fair but strict about deadlines and has a reputation to protect with her own boss.',
        'Un informe importante vence el viernes, pero una emergencia familiar te hizo perder tres días. Tu jefa es justa pero estricta con los plazos y tiene una reputación que cuidar ante su propio jefe.'),
      goal: L('Get an extension of {target} or more. She offers {start}.', 'Conseguir una prórroga de {target} o más. Ella ofrece {start}.'),
      item: L('the deadline', 'el plazo'),
      open: L('I heard about your situation and I\'m sorry. I can give you {price}, but the deadline is important.', 'Me enteré de tu situación y lo siento. Puedo darte {price}, pero el plazo es importante.'),
      motives: [
        L('The truth is, the client meeting where we present this got moved to the following Thursday.', 'La verdad es que la reunión con el cliente donde presentamos esto se pasó al jueves siguiente.'),
        L('I\'m worried that if I give you extra time, the rest of the team will expect the same.', 'Me preocupa que si te doy más tiempo, el resto del equipo espere lo mismo.'),
        L('My director reviews quality more than dates. A rushed report would hurt me more than a late one.', 'Mi director se fija más en la calidad que en las fechas. Un informe apresurado me perjudicaría más que uno tardío.'),
        L('Last quarter someone missed a deadline without telling me, and I was the one who got blamed.', 'El trimestre pasado alguien incumplió un plazo sin avisarme, y la culpa me la llevé yo.')
      ],
      deal: L('Okay. {price}. Send me a short progress update midweek so I can keep my director informed.', 'De acuerdo. {price}. Envíame una breve actualización a mitad de semana para mantener informado a mi director.'),
      nodeal: L('Then let\'s stick to the original plan and do what we can.', 'Entonces mantengamos el plan original y hagamos lo que se pueda.'),
      tip: L('A manager\'s resistance usually protects something: fairness to the team, their own reputation. Address those fears directly and offer reassurance in return.',
        'La resistencia de un jefe suele proteger algo: la equidad con el equipo o su propia reputación. Aborda esos miedos directamente y ofrece tranquilidad a cambio.')
    },
    {
      id: 'teen-curfew', level: 'easy', category: 'home', type: 'deal', register: 'casual',
      unit: 'time', start: 22, target: 23.5, step: 0.25, ackerman: false,
      who: { name: 'Dad', gender: 'm', role: L('Your parent', 'Tu padre') },
      title: L('A teenager negotiating a later curfew', 'Un adolescente negocia una hora de llegada más tarde'),
      brief: L('You are seventeen. Your friends can stay out later than you on weekends, and a big concert is coming up. Your father worries, but he is open to a calm conversation.',
        'Tienes diecisiete años. Tus amigos pueden quedarse fuera más tarde que tú los fines de semana, y se acerca un gran concierto. Tu padre se preocupa, pero está abierto a una conversación tranquila.'),
      goal: L('Get a weekend curfew of {target} or later. It is currently {start}.', 'Conseguir una hora de llegada de {target} o más tarde los fines de semana. Ahora es a las {start}.'),
      item: L('the curfew', 'la hora de llegada'),
      open: L('We\'ve talked about this. Curfew is {price}. That\'s not changing just because of one concert.', 'Ya hablamos de esto. La hora de llegada es {price}. No va a cambiar por un concierto.'),
      motives: [
        L('Look... when I was your age, a friend of mine got into a car with someone who\'d been drinking. I still think about it.', 'Mira... cuando tenía tu edad, un amigo mío se subió al coche de alguien que había bebido. Todavía pienso en eso.'),
        L('What really bothers me is not knowing where you are. Last time your phone was off all night.', 'Lo que de verdad me molesta es no saber dónde estás. La última vez tuviste el teléfono apagado toda la noche.'),
        L('Your grades have been great this semester. I have noticed, even if I don\'t say it.', 'Tus notas han sido excelentes este semestre. Lo he notado, aunque no lo diga.'),
        L('Honestly, I can\'t fall asleep until I hear the front door. That\'s my issue, not yours.', 'Sinceramente, no puedo dormirme hasta que oigo la puerta. Ese es mi problema, no el tuyo.')
      ],
      deal: L('Alright. {price} on weekends. You text me when you leave, and your phone stays on. Deal?', 'Está bien. {price} los fines de semana. Me escribes al salir y el teléfono siempre encendido. ¿Trato?'),
      nodeal: L('We\'ll talk about it another time. For now, the rule stands.', 'Lo hablaremos en otro momento. Por ahora, la regla se mantiene.'),
      tip: L('Parents rarely care about the clock itself; they care about safety and trust. Discover the real worry and offer something that solves it.',
        'A los padres casi nunca les importa la hora en sí; les importa la seguridad y la confianza. Descubre la preocupación real y ofrece algo que la resuelva.')
    },
    {
      id: 'parent-screentime', level: 'easy', category: 'home', type: 'deal', register: 'casual',
      unit: 'hours', start: 4, target: 2, step: 0.5, ackerman: false,
      who: { name: 'Maya', gender: 'f', role: L('Your teenage daughter (14)', 'Tu hija adolescente (14 años)') },
      title: L('A parent negotiating screen time and chores', 'Un padre negocia tiempo de pantalla y tareas'),
      brief: L('You are the parent. Your fourteen-year-old spends hours on her phone and chores are being skipped. You want a daily limit she will actually respect, not one she resents.',
        'Eres el padre o la madre. Tu hija de catorce años pasa horas con el teléfono y se saltan las tareas de casa. Quieres un límite diario que realmente respete, no uno que le moleste.'),
      goal: L('Agree on {target} of screen time or less. Maya wants {start}.', 'Acordar {target} de pantalla o menos. Maya quiere {start}.'),
      item: L('screen time', 'el tiempo de pantalla'),
      open: L('Everyone I know gets at least {price}. And I do my homework. This isn\'t fair.', 'Todos mis amigos tienen al menos {price}. Y yo hago mis deberes. Esto no es justo.'),
      motives: [
        L('...My friends plan everything in the group chat. If I\'m offline, I miss everything and they forget me.', '...Mis amigos planean todo en el chat del grupo. Si estoy desconectada, me pierdo todo y se olvidan de mí.'),
        L('I use my phone to calm down after school. Some days are really hard and nobody asks.', 'Uso el teléfono para relajarme después de clase. Algunos días son muy difíciles y nadie pregunta.'),
        L('I don\'t mind chores. I just hate being told to do them right in the middle of something.', 'No me molestan las tareas. Solo odio que me digan que las haga justo en medio de algo.'),
        L('If I could have a little more on weekends, I honestly wouldn\'t care as much on school days.', 'Si pudiera tener un poco más los fines de semana, la verdad no me importaría tanto entre semana.')
      ],
      deal: L('Fine. {price} on school days, a bit more on weekends, and chores before dinner. I can live with that.', 'Vale. {price} entre semana, un poco más el fin de semana, y las tareas antes de cenar. Puedo vivir con eso.'),
      nodeal: L('Whatever. You never listen anyway.', 'Da igual. Total, nunca escuchas.'),
      tip: L('Teenagers push back hardest when they feel controlled. Labels and genuine questions about their world will get you further than rules and lectures.',
        'Los adolescentes se resisten más cuando se sienten controlados. Las etiquetas y las preguntas genuinas sobre su mundo te llevarán más lejos que las reglas y los sermones.')
    },
    {
      id: 'hotel-upgrade', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 80, target: 0, step: 5, ackerman: false,
      who: { name: 'Sofia', gender: 'f', role: L('Hotel front desk agent', 'Recepcionista de hotel') },
      title: L('Asking a hotel for a free upgrade', 'Pedir a un hotel una mejora gratuita'),
      brief: L('You arrive at a hotel for your anniversary weekend. Your standard room is booked, but you would love a suite with a view. The lobby is quiet tonight.',
        'Llegas a un hotel para tu fin de semana de aniversario. Tienes reservada una habitación estándar, pero te encantaría una suite con vistas. El vestíbulo está tranquilo esta noche.'),
      goal: L('Get the suite upgrade for {target} (free). The nightly upgrade costs {start}.', 'Conseguir la mejora a suite por {target} (gratis). La mejora cuesta {start} por noche.'),
      item: L('the upgrade', 'la mejora'),
      open: L('Welcome! I have your standard king. We do have suites available tonight for an extra {price} per night.', '¡Bienvenido! Tengo su habitación estándar. Esta noche tenemos suites disponibles por {price} adicionales por noche.'),
      motives: [
        L('Honestly, we\'re only at sixty percent occupancy tonight. Those suites will sit empty.', 'Sinceramente, esta noche solo estamos al sesenta por ciento de ocupación. Esas suites se quedarán vacías.'),
        L('An anniversary? Front desk can use complimentary upgrades for special occasions, at our discretion.', '¿Un aniversario? En recepción podemos dar mejoras de cortesía para ocasiones especiales, a nuestra discreción.'),
        L('Guest reviews are a big deal for us this quarter. A happy anniversary couple tends to write nice ones.', 'Las reseñas de los huéspedes son muy importantes este trimestre. Una pareja feliz de aniversario suele escribir buenas.'),
        L('Most guests either demand things or say nothing. You\'re making my evening easier.', 'La mayoría de los huéspedes exige cosas o no dice nada. Usted me está haciendo la noche más fácil.')
      ],
      deal: L('I\'ve moved you to the corner suite, at {price} extra. Happy anniversary.', 'Le he cambiado a la suite de la esquina, con {price} adicionales. Feliz aniversario.'),
      nodeal: L('Of course. Your standard room is ready. Enjoy your stay.', 'Por supuesto. Su habitación estándar está lista. Disfrute de su estancia.'),
      tip: L('Upgrades cost the hotel almost nothing on a quiet night, but staff need a good reason and a pleasant guest. Ask, do not demand, and make it easy to say yes.',
        'Una mejora casi no le cuesta nada al hotel en una noche tranquila, pero el personal necesita un buen motivo y un huésped agradable. Pide, no exijas, y haz que sea fácil decir que sí.')
    },
    {
      id: 'gym-cancel', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 150, target: 0, step: 10, ackerman: false,
      who: { name: 'Tyler', gender: 'm', role: L('Gym membership advisor', 'Asesor de membresías del gimnasio') },
      title: L('Canceling a gym membership', 'Cancelar una membresía de gimnasio'),
      brief: L('You are moving to another city and need to cancel your gym membership. The contract mentions an early termination fee, and the advisor is trained to keep members at all costs.',
        'Te mudas a otra ciudad y necesitas cancelar tu membresía. El contrato menciona una penalización por cancelación anticipada, y el asesor está entrenado para retener socios a toda costa.'),
      goal: L('Cancel with a termination fee of {target}. They want {start}.', 'Cancelar con una penalización de {target}. Piden {start}.'),
      item: L('the cancellation', 'la cancelación'),
      open: L('I\'m sorry to hear you want to leave! Before we cancel, have you seen our pause option? Otherwise, the early termination fee is {price}.', '¡Siento que quiera irse! Antes de cancelar, ¿conoce nuestra opción de pausa? Si no, la penalización por cancelación anticipada es de {price}.'),
      motives: [
        L('Our contract actually allows free cancellation if you move more than twenty-five miles away. I\'m just supposed to offer alternatives first.', 'En realidad, nuestro contrato permite cancelar gratis si se muda a más de cuarenta kilómetros. Solo se supone que primero ofrezca alternativas.'),
        L('I get a bonus for every member I save, so I have to try. I hope you understand.', 'Recibo una bonificación por cada socio que retengo, así que tengo que intentarlo. Espero que lo entienda.'),
        L('If you have something showing your new address, I can process it as a relocation.', 'Si tiene algo que muestre su nueva dirección, puedo tramitarlo como traslado.'),
        L('My manager is tired of complaints about cancellations online. Quiet, friendly exits are better for everyone.', 'Mi gerente está cansado de las quejas por cancelaciones en internet. Una salida tranquila y amistosa es mejor para todos.')
      ],
      deal: L('Okay. I\'ve processed it as a relocation. Your fee is {price}, and your membership ends this month.', 'Listo. Lo he tramitado como traslado. Su penalización es de {price} y su membresía termina este mes.'),
      nodeal: L('Then I\'ll leave the account as it is for now.', 'Entonces dejaré la cuenta como está por ahora.'),
      tip: L('Retention advisors are rewarded for keeping you, so expect several offers. Stay friendly but focused; a no-oriented question helps you hold your position without a fight.',
        'A los asesores de retención los premian por retenerte, así que espera varias ofertas. Mantente cordial pero enfocado; una pregunta orientada al «no» te ayuda a sostener tu posición sin pelear.')
    },
    {
      id: 'airline-fee', level: 'easy', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 200, target: 0, step: 25, ackerman: false,
      who: { name: 'Grace', gender: 'f', role: L('Airline reservations agent', 'Agente de reservas de la aerolínea') },
      title: L('Getting an airline to waive a change fee', 'Conseguir que la aerolínea anule un cargo por cambio'),
      brief: L('A work conflict means you need to move your flight two days later. Your ticket carries a change fee, and the agent has already said the fare rules are strict.',
        'Un conflicto laboral te obliga a mover tu vuelo dos días después. Tu billete tiene un cargo por cambio, y la agente ya dijo que las reglas de la tarifa son estrictas.'),
      goal: L('Get the change fee reduced to {target}. It is {start}.', 'Conseguir que el cargo por cambio quede en {target}. Es de {start}.'),
      item: L('the change fee', 'el cargo por cambio'),
      open: L('I can move you to Thursday\'s flight. With your fare type, there\'s a change fee of {price}.', 'Puedo pasarle al vuelo del jueves. Con su tipo de tarifa, hay un cargo por cambio de {price}.'),
      motives: [
        L('The Thursday flight is actually overbooked on the original date. Moving you helps us too.', 'En realidad, el vuelo de la fecha original tiene sobreventa. Cambiarle también nos ayuda.'),
        L('You have frequent flyer status. Agents can waive fees once a year for status members.', 'Usted tiene estatus de viajero frecuente. Los agentes podemos anular cargos una vez al año para socios con estatus.'),
        L('There was a schedule adjustment on your original flight of forty minutes. That technically allows a free change.', 'Hubo un ajuste de horario de cuarenta minutos en su vuelo original. Técnicamente eso permite un cambio gratuito.'),
        L('I\'ve been yelled at all day. A polite caller really does get my best effort.', 'Me han gritado todo el día. Una persona amable de verdad recibe mi mejor esfuerzo.')
      ],
      deal: L('Done. You\'re on Thursday\'s flight, and the change fee is {price}.', 'Hecho. Está en el vuelo del jueves y el cargo por cambio es de {price}.'),
      nodeal: L('I understand. Your original booking remains unchanged.', 'Entiendo. Su reserva original sigue sin cambios.'),
      tip: L('Airline agents can find exceptions when they want to: schedule changes, status, overbooking. Be the caller they want to help, and ask what options exist.',
        'Los agentes de aerolíneas encuentran excepciones cuando quieren: cambios de horario, estatus, sobreventa. Sé la persona a la que quieren ayudar y pregunta qué opciones existen.')
    },
    {
      id: 'shared-fence', level: 'easy', category: 'home', type: 'deal', register: 'casual',
      unit: 'pct', start: 70, target: 50, step: 5, ackerman: false,
      who: { name: 'Mr. Brennan', gender: 'm', role: L('Next-door neighbor', 'Vecino de al lado') },
      title: L('Sharing the cost of a shared fence', 'Compartir el costo de una cerca compartida'),
      brief: L('A storm damaged the fence between your yard and your neighbor\'s. A contractor quoted the repair. Your neighbor suggests you pay most of it, since your dog "caused half the wear".',
        'Una tormenta dañó la cerca entre tu jardín y el de tu vecino. Un contratista presupuestó la reparación. Tu vecino sugiere que pagues la mayor parte, ya que tu perro «causó la mitad del desgaste».'),
      goal: L('Pay {target} or less of the repair. He proposes you pay {start}.', 'Pagar {target} o menos de la reparación. Él propone que pagues {start}.'),
      item: L('the repair', 'la reparación'),
      open: L('I think it\'s only fair you cover {price} of it. Your dog has been digging under that fence for years.', 'Creo que lo justo es que cubras el {price}. Tu perro lleva años escarbando debajo de esa cerca.'),
      motives: [
        L('My retirement budget is tight this year. Unexpected costs like this really stress me out.', 'Este año mi presupuesto de jubilado está muy justo. Los gastos inesperados como este me estresan mucho.'),
        L('To be fair, the storm did most of the damage. The digging is more of an old annoyance.', 'Para ser justos, la tormenta hizo la mayor parte del daño. Lo de escarbar es más bien una molestia antigua.'),
        L('I\'d actually like a taller fence for privacy. I was going to ask you about that.', 'En realidad me gustaría una cerca más alta para tener privacidad. Te lo iba a preguntar.'),
        L('My late wife planted those roses along the fence. I just want it fixed before spring.', 'Mi difunta esposa plantó esas rosas a lo largo de la cerca. Solo quiero que esté arreglada antes de la primavera.')
      ],
      deal: L('Alright, {price} for you, and the rest is on me. Let\'s call the contractor together.', 'De acuerdo, el {price} para ti y el resto lo pongo yo. Llamemos juntos al contratista.'),
      nodeal: L('Well, I suppose we\'ll leave it broken for now.', 'Bueno, supongo que la dejaremos rota por ahora.'),
      tip: L('With neighbors, you will live with the relationship long after the fence is fixed. Look for the worry behind the blame, and keep the tone warm.',
        'Con los vecinos, la relación sigue mucho después de arreglar la cerca. Busca la preocupación detrás de la culpa y mantén un tono cálido.')
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
