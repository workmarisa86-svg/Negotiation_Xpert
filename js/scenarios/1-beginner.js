/* Beginner scenarios — everyday situations, small stakes, friendly counterparts.
   Scenario schema (see README): id, level, category, type ('deal'|'resolve'), register,
   unit, start, target, step, who, title, brief, goal, item, open, motives[], deal, nodeal, tip. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  NX.scenarios = NX.scenarios || [];
  const L = (en, es) => ({ en, es });

  NX.scenarios.push(
    {
      id: 'fruit-market', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 20, target: 12, step: 1,
      who: { name: 'Rosa', gender: 'f', role: L('Fruit vendor', 'Vendedora de frutas') },
      title: L('Mangos and avocados at the market', 'Mangos y aguacates en el mercado'),
      brief: L('It is late afternoon at an open-air market. You want a large bag of ripe mangos and avocados for a family dinner. Rosa has the best fruit in the row, and she knows it.',
        'Es media tarde en un mercado al aire libre. Quieres una bolsa grande de mangos y aguacates maduros para una cena familiar. Rosa tiene la mejor fruta del pasillo, y lo sabe.'),
      goal: L('Buy the full bag for {target} or less. Rosa opens at {start}.', 'Comprar la bolsa completa por {target} o menos. Rosa abre con {start}.'),
      item: L('the fruit', 'la fruta'),
      open: L('Good afternoon! The mangos are sweet as honey today. A big bag with avocados too? For you, {price}.', '¡Buenas tardes! Hoy los mangos están dulces como la miel. ¿Una bolsa grande con aguacates también? Para ti, {price}.'),
      motives: [
        L('Honestly? I want to close early today. My daughter has a school recital at six and I promised I would be there.', '¿La verdad? Quiero cerrar temprano hoy. Mi hija tiene un recital en la escuela a las seis y le prometí que estaría.'),
        L('These avocados are perfectly ripe right now. By tomorrow they will be too soft to sell, so they have to go today.', 'Estos aguacates están en su punto justo ahora. Mañana estarán demasiado blandos para venderlos, así que tienen que salir hoy.'),
        L('It has been a slow day. Rain in the morning kept everyone home, and I have twice the fruit I expected left over.', 'Ha sido un día flojo. La lluvia de la mañana dejó a todos en casa, y me sobra el doble de fruta de lo que esperaba.'),
        L('I like customers who come back every week. A regular is worth more to me than one big sale.', 'Me gustan los clientes que vuelven cada semana. Un cliente fijo vale más para mí que una venta grande.')
      ],
      deal: L('{price} it is. I\'ll throw in a couple of limes. Come back next week!', 'Quedamos en {price}. Te pongo un par de limones de regalo. ¡Vuelve la semana que viene!'),
      nodeal: L('No problem, dear. The fruit will be here if you change your mind.', 'No pasa nada, cariño. La fruta seguirá aquí si cambias de opinión.'),
      tip: L('Market vendors expect some bargaining, and they respond to warmth. Notice the time of day: what might Rosa want before closing? Try a label before you name any price.',
        'Los vendedores del mercado esperan cierto regateo y responden a la calidez. Fíjate en la hora: ¿qué podría querer Rosa antes de cerrar? Prueba una etiqueta antes de decir ningún precio.')
    },
    {
      id: 'artisan-market', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 85, target: 55, step: 1,
      who: { name: 'Mateo', gender: 'm', role: L('Ceramic artist', 'Ceramista') },
      title: L('Handmade crafts at the artisan fair', 'Artesanía en la feria de artesanos'),
      brief: L('At a weekend artisan fair, you fall for a set of hand-thrown ceramic bowls with a deep blue glaze. Mateo made them himself and is proud of the work.',
        'En una feria de artesanos de fin de semana, te enamoras de un juego de cuencos de cerámica hechos a mano, con un esmalte azul profundo. Mateo los hizo él mismo y está orgulloso de su trabajo.'),
      goal: L('Buy the set of four bowls for {target} or less. He asks {start}.', 'Comprar el juego de cuatro cuencos por {target} o menos. Pide {start}.'),
      item: L('the bowls', 'los cuencos'),
      open: L('Ah, you have a good eye. That glaze took me three firings to get right. The set of four is {price}.', 'Ah, tienes buen ojo. Ese esmalte me llevó tres hornadas conseguirlo. El juego de cuatro cuesta {price}.'),
      motives: [
        L('The truth is, the stall fee for this fair is due tonight and I\'m still a little short.', 'La verdad es que la cuota del puesto de esta feria vence esta noche y todavía me falta un poco.'),
        L('This is the last set from that glaze batch. I care more that it goes to someone who will actually use it than about squeezing out every dollar.', 'Es el último juego de esa tanda de esmalte. Me importa más que vaya a alguien que lo use de verdad que sacar hasta el último dólar.'),
        L('If you pay cash, I avoid the card fees. That matters on small pieces like these.', 'Si pagas en efectivo, me ahorro las comisiones de la tarjeta. Eso importa en piezas pequeñas como estas.'),
        L('Packing ceramics for the drive home is a nightmare. Every piece I sell here is one less to wrap.', 'Empacar cerámica para el viaje de vuelta es una pesadilla. Cada pieza que vendo aquí es una menos que envolver.')
      ],
      deal: L('{price}, cash. Let me wrap them carefully for you. Enjoy them.', '{price}, en efectivo. Déjame envolverlos con cuidado. Que los disfrutes.'),
      nodeal: L('I understand. Take my card in case you come back.', 'Lo entiendo. Llévate mi tarjeta por si vuelves.'),
      tip: L('Artisans are emotionally invested in their work. Respect the craft first; an accusation audit about your budget can open the door without insulting the art.',
        'Los artesanos tienen un vínculo emocional con su trabajo. Respeta primero el oficio; una auditoría de acusaciones sobre tu presupuesto puede abrir la puerta sin ofender la obra.')
    },
    {
      id: 'street-souvenir', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 40, target: 18, step: 1,
      who: { name: 'Karim', gender: 'm', role: L('Street vendor', 'Vendedor ambulante') },
      title: L('A souvenir from a street vendor', 'Un recuerdo de un vendedor ambulante'),
      brief: L('You are a tourist in a busy old-town square. A vendor is selling hand-carved wooden figurines, and one would make a perfect gift. Tourist prices are clearly in effect.',
        'Eres turista en una concurrida plaza del casco antiguo. Un vendedor ofrece figuras de madera talladas a mano, y una sería el regalo perfecto. Está claro que rigen los precios para turistas.'),
      goal: L('Buy the carved figurine for {target} or less. Karim starts at {start}.', 'Comprar la figura tallada por {target} o menos. Karim empieza con {start}.'),
      item: L('the figurine', 'la figura'),
      open: L('My friend! Hand carved, real olive wood. For you, special price: {price}.', '¡Amigo! Tallada a mano, madera de olivo auténtica. Para ti, precio especial: {price}.'),
      motives: [
        L('Okay, between us: the first price is for tourists. Locals pay much less, and I know it.', 'Bueno, entre nosotros: el primer precio es para turistas. Los locales pagan mucho menos, y lo sé.'),
        L('You are my first sale of the day. For us, the first sale brings luck, so I want to make it.', 'Eres mi primera venta del día. Para nosotros, la primera venta trae suerte, así que quiero hacerla.'),
        L('The clouds are coming. When it rains, the square empties and I pack up with nothing.', 'Vienen nubes. Cuando llueve, la plaza se vacía y recojo sin nada.'),
        L('My cousin carves these. I get them at a good price, so I have room to move.', 'Mi primo las talla. Las consigo a buen precio, así que tengo margen.')
      ],
      deal: L('{price}. Deal, my friend. It will bring you good luck.', '{price}. Trato hecho, amigo. Te traerá buena suerte.'),
      nodeal: L('Okay, okay. Maybe tomorrow, I am here every day.', 'Vale, vale. Quizás mañana, estoy aquí todos los días.'),
      tip: L('In tourist areas the first price is often double. A confident first offer is expected here, but wrap it in a technique so it does not feel like an insult.',
        'En zonas turísticas el primer precio suele ser el doble. Aquí se espera una primera oferta firme, pero envuélvela en una técnica para que no parezca un insulto.')
    },
    {
      id: 'garage-sale', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 60, target: 35, step: 1,
      who: { name: 'Mrs. Doyle', gender: 'f', role: L('Neighbor', 'Vecina') },
      title: L('A deal at the neighbor\'s garage sale', 'Una ganga en la venta de garaje de la vecina'),
      brief: L('Your neighbor is holding a garage sale on a Saturday morning. Among the lamps and books is a vintage record player in great condition, marked with a handwritten tag.',
        'Tu vecina organiza una venta de garaje un sábado por la mañana. Entre lámparas y libros hay un tocadiscos antiguo en muy buen estado, con una etiqueta escrita a mano.'),
      goal: L('Take the record player home for {target} or less. The tag says {start}.', 'Llevarte el tocadiscos por {target} o menos. La etiqueta dice {start}.'),
      item: L('the record player', 'el tocadiscos'),
      open: L('Oh, hello! That old thing still plays beautifully. I put {price} on it, I think that\'s fair.', '¡Ay, hola! Ese aparato todavía suena precioso. Le puse {price}, creo que es justo.'),
      motives: [
        L('We\'re moving into a much smaller apartment next week. There\'s simply no room for it.', 'Nos mudamos a un apartamento mucho más pequeño la semana que viene. Simplemente no hay sitio.'),
        L('Whatever doesn\'t sell today goes to the donation truck at two o\'clock. I\'d rather it went to a neighbor.', 'Lo que no se venda hoy se lo lleva el camión de donaciones a las dos. Prefiero que se lo quede un vecino.'),
        L('It was my husband\'s. He\'d be happy knowing someone would actually listen to music on it.', 'Era de mi marido. Le haría feliz saber que alguien va a escuchar música en él de verdad.'),
        L('I honestly have no idea what it\'s worth. I just picked a number.', 'Sinceramente no tengo idea de cuánto vale. Puse un número al azar.')
      ],
      deal: L('{price} it is. Let me find you a box for it, and the records underneath are yours too.', 'Quedamos en {price}. Déjame buscarte una caja, y los discos de abajo también son tuyos.'),
      nodeal: L('That\'s all right. Have a lovely weekend, dear.', 'No pasa nada. Que tengas un buen fin de semana, querido.'),
      tip: L('Garage sale prices are guesses, and the seller usually cares more about clearing space than profit. Ask questions about the story behind the item.',
        'Los precios de una venta de garaje son aproximados, y al vendedor suele importarle más hacer sitio que ganar dinero. Pregunta por la historia del objeto.')
    },
    {
      id: 'taxi-fare', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 45, target: 30, step: 1,
      who: { name: 'Samuel', gender: 'm', role: L('Taxi driver', 'Taxista') },
      title: L('Agreeing on a taxi fare before the ride', 'Acordar la tarifa del taxi antes del viaje'),
      brief: L('You land late at night in a city where taxis without meters are common. The ride downtown should take about thirty minutes. Better to agree on the fare before you get in.',
        'Aterrizas de noche en una ciudad donde son comunes los taxis sin taxímetro. El viaje al centro debería durar unos treinta minutos. Mejor acordar la tarifa antes de subir.'),
      goal: L('Agree on a fare of {target} or less before getting in. Samuel asks {start}.', 'Acordar una tarifa de {target} o menos antes de subir. Samuel pide {start}.'),
      item: L('the ride', 'el viaje'),
      open: L('Downtown? At this hour, {price}. Traffic, night rate, you know how it is.', '¿Al centro? A esta hora, {price}. El tráfico, la tarifa nocturna, ya sabe cómo es.'),
      motives: [
        L('I live on the east side of downtown. After this ride I\'m going home anyway.', 'Vivo en la zona este del centro. Después de este viaje me voy a casa de todos modos.'),
        L('Truthfully, the official taxis charge about thirty-two with the meter. I start high because many people agree.', 'La verdad, los taxis oficiales cobran unos treinta y dos con taxímetro. Empiezo alto porque mucha gente acepta.'),
        L('It\'s been a very slow night. I\'ve been waiting in this line for over an hour.', 'Ha sido una noche muy floja. Llevo más de una hora esperando en esta fila.'),
        L('If you pay in cash, I don\'t have to give a cut to the dispatch app.', 'Si paga en efectivo, no tengo que darle comisión a la aplicación.')
      ],
      deal: L('{price}. Okay, get in, I\'ll take the fast route.', '{price}. Bueno, suba, tomaré la ruta rápida.'),
      nodeal: L('Fine, try the next one. Good night.', 'Está bien, pruebe con el siguiente. Buenas noches.'),
      tip: L('Late-night fares are padded because tired travellers rarely push back. Stay friendly, and find out what the driver needs at the end of a long shift.',
        'Las tarifas nocturnas se inflan porque los viajeros cansados casi nunca protestan. Sé amable y descubre qué necesita el conductor al final de un turno largo.')
    },
    {
      id: 'used-bike', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 250, target: 180, step: 5,
      who: { name: 'Jordan', gender: 'm', role: L('Online marketplace seller', 'Vendedor en un mercado en línea') },
      title: L('A used bike from an online seller', 'Una bicicleta usada de un vendedor en línea'),
      brief: L('You found a used road bike on an online marketplace. You meet the seller outside their building to test-ride it. It is in decent shape, but the tires look worn.',
        'Encontraste una bicicleta de carretera usada en un mercado en línea. Quedas con el vendedor frente a su edificio para probarla. Está en buen estado, pero los neumáticos se ven gastados.'),
      goal: L('Buy the bike for {target} or less. The listing says {start}.', 'Comprar la bicicleta por {target} o menos. El anuncio dice {start}.'),
      item: L('the bike', 'la bicicleta'),
      open: L('Hey, you made it! So that\'s the bike. Like the listing says, {price}. It rides great.', '¡Hola, llegaste! Esa es la bici. Como dice el anuncio, {price}. Va de maravilla.'),
      motives: [
        L('I just bought an electric bike, so this one is sitting there taking up space.', 'Acabo de comprarme una bici eléctrica, así que esta solo está ocupando espacio.'),
        L('I\'m moving out on Saturday and I really don\'t want to carry it to the new place.', 'Me mudo el sábado y la verdad no quiero cargarla hasta el sitio nuevo.'),
        L('Yeah, the tires are due. I was going to replace them but never got around to it.', 'Sí, toca cambiar los neumáticos. Iba a cambiarlos pero nunca encontré el momento.'),
        L('Three other people messaged me, but none of them showed up. You\'re the first real buyer.', 'Me escribieron otras tres personas, pero ninguna vino. Eres el primer comprador de verdad.')
      ],
      deal: L('{price}. Sold. Let me grab the spare tube and the lock for you too.', '{price}. Vendida. Déjame traerte también la cámara de repuesto y el candado.'),
      nodeal: L('No worries. Someone else will grab it.', 'Sin problema. Alguien más se la llevará.'),
      tip: L('Online sellers often list high and expect offers. Point out what you notice without criticizing: a label like "It looks like the tires are due" works better than complaints.',
        'Los vendedores en línea suelen anunciar caro y esperan ofertas. Señala lo que observas sin criticar: una etiqueta como «Parece que toca cambiar los neumáticos» funciona mejor que una queja.')
    },
    {
      id: 'shoe-store', level: 'beginner', category: 'everyday', type: 'deal', register: 'casual',
      unit: 'usd', start: 120, target: 100, step: 1,
      who: { name: 'Mrs. Alvarez', gender: 'f', role: L('Owner of a family shoe store', 'Dueña de una zapatería familiar') },
      title: L('A small discount at a family shoe store', 'Un pequeño descuento en una zapatería familiar'),
      brief: L('A small, family-owned shoe store has the leather boots you have wanted for months. Chain stores do not discount, but the owner is behind the counter herself.',
        'Una pequeña zapatería familiar tiene las botas de cuero que llevas meses queriendo. Las cadenas no hacen descuentos, pero la dueña atiende ella misma el mostrador.'),
      goal: L('Get the boots for {target} or less. They are priced at {start}.', 'Conseguir las botas por {target} o menos. Cuestan {start}.'),
      item: L('the boots', 'las botas'),
      open: L('Those look wonderful on you. They\'re {price}, made in a small workshop, real quality.', 'Le quedan de maravilla. Cuestan {price}, hechas en un pequeño taller, calidad de verdad.'),
      motives: [
        L('That\'s the last pair in your size. Once the season ends I won\'t restock that model.', 'Es el último par de su talla. Cuando acabe la temporada no volveré a pedir ese modelo.'),
        L('What keeps a little store like mine open is people coming back. I\'d rather have a loyal customer than full price.', 'Lo que mantiene abierta una tienda pequeña como la mía es que la gente vuelva. Prefiero un cliente fiel que el precio completo.'),
        L('I need space for the spring shoes arriving next week, so the winter stock has to move.', 'Necesito espacio para el calzado de primavera que llega la semana que viene, así que el stock de invierno tiene que salir.'),
        L('My son keeps telling me to give discounts to people who leave reviews online.', 'Mi hijo no para de decirme que haga descuentos a quienes dejan reseñas en internet.')
      ],
      deal: L('{price}. Done. And do leave us a nice review, my son will be thrilled.', '{price}. Hecho. Y déjenos una buena reseña, mi hijo estará encantado.'),
      nodeal: L('Of course. Come back whenever you like.', 'Por supuesto. Vuelva cuando quiera.'),
      tip: L('A small discount is a big gesture for a family business. Show that you value the store; think about what you could offer besides money.',
        'Un pequeño descuento es un gran gesto para un negocio familiar. Demuestra que valoras la tienda; piensa en qué podrías ofrecer además del dinero.')
    },
    {
      id: 'roommate-chores', level: 'beginner', category: 'home', type: 'deal', register: 'casual',
      unit: 'count', unitLabel: L('of 10 weekly chores', 'de 10 tareas semanales'), start: 7, target: 5, step: 1, ackerman: false,
      who: { name: 'Alex', gender: 'm', role: L('Roommate', 'Compañero de piso') },
      title: L('Dividing chores with a roommate', 'Repartir las tareas con un compañero de piso'),
      brief: L('You and your roommate share an apartment with ten recurring weekly chores. Alex has proposed a split that leaves you with most of them, and you want a fair arrangement.',
        'Tú y tu compañero comparten un piso con diez tareas semanales fijas. Alex ha propuesto un reparto que te deja la mayoría, y quieres un acuerdo justo.'),
      goal: L('Agree to do {target} or fewer chores. Alex proposes {start}.', 'Acordar hacer {target} tareas o menos. Alex propone {start}.'),
      item: L('the chores', 'las tareas'),
      open: L('So I made a list. I think it makes sense if you take {price} and I take the rest. You\'re home more anyway.', 'Hice una lista. Creo que tiene sentido que tú hagas {price} y yo el resto. Total, tú pasas más tiempo en casa.'),
      motives: [
        L('Okay, real talk: I started a new job with night shifts. I\'m exhausted and I panicked about the chores.', 'Bueno, siendo sincero: empecé un trabajo nuevo con turnos de noche. Estoy agotado y me agobié con las tareas.'),
        L('I really hate cleaning the bathroom. But honestly, I\'d happily do all the cooking and grocery runs.', 'Odio limpiar el baño. Pero sinceramente, haría encantado toda la cocina y las compras.'),
        L('Last month I felt like I did more than my share, and I never said anything. I guess it built up.', 'El mes pasado sentí que hice más de lo que me tocaba, y nunca dije nada. Supongo que se fue acumulando.'),
        L('My parents are visiting in two weeks and I want the place to look good without us fighting.', 'Mis padres vienen de visita en dos semanas y quiero que el piso esté bien sin que nos peleemos.')
      ],
      deal: L('Okay, {price} for you and the rest for me. And I\'m on cooking duty. Deal.', 'Vale, {price} para ti y el resto para mí. Y yo me encargo de cocinar. Trato hecho.'),
      nodeal: L('Let\'s just talk about it another time, I guess.', 'Mejor lo hablamos en otro momento, supongo.'),
      tip: L('With people you live with, the relationship matters as much as the result. Uncover what is really behind the uneven split before you argue numbers.',
        'Con las personas con quienes convives, la relación importa tanto como el resultado. Descubre qué hay realmente detrás del reparto desigual antes de discutir números.')
    },
    {
      id: 'sibling-gametime', level: 'beginner', category: 'home', type: 'deal', register: 'casual',
      unit: 'mins', start: 30, target: 60, step: 5, ackerman: false,
      who: { name: 'Leo', gender: 'm', role: L('Younger brother (11)', 'Hermano menor (11 años)') },
      title: L('Trading video game time with a younger sibling', 'Negociar tiempo de videojuegos con un hermano menor'),
      brief: L('You and your younger brother share one game console. He guards it fiercely and has offered you a short daily slot. You would like a fairer share, without a family argument.',
        'Tú y tu hermano menor comparten una consola. Él la defiende con uñas y dientes y te ha ofrecido un turno diario corto. Te gustaría un reparto más justo, sin una pelea familiar.'),
      goal: L('Get at least {target} of console time. Leo offers {start}.', 'Conseguir al menos {target} de consola. Leo ofrece {start}.'),
      item: L('the console', 'la consola'),
      open: L('It\'s MY save file in there. You can have {price}. That\'s it.', 'Ahí está MI partida guardada. Puedes tener {price}. Y ya.'),
      motives: [
        L('...I\'m stuck on the castle level. I\'ve tried it like fifty times.', '...Estoy atascado en el nivel del castillo. Lo he intentado como cincuenta veces.'),
        L('Last time you played, you saved over my game by accident. I lost everything.', 'La última vez que jugaste, guardaste encima de mi partida sin querer. Perdí todo.'),
        L('My friends play online on Saturday mornings. That\'s the time I really care about.', 'Mis amigos juegan en línea los sábados por la mañana. Ese es el horario que de verdad me importa.'),
        L('Mom said if we fight about it again, nobody gets the console for a week.', 'Mamá dijo que si volvemos a pelear por eso, nadie tendrá la consola en una semana.')
      ],
      deal: L('Fine. {price} for you. But you help me with the castle, and never touch my save!', 'Vale. {price} para ti. ¡Pero me ayudas con el castillo y nunca tocas mi partida!'),
      nodeal: L('Whatever. I\'m telling Mom.', 'Como quieras. Se lo voy a decir a mamá.'),
      tip: L('Kids negotiate with feelings, not spreadsheets. Labels work beautifully with younger siblings, and you may have something he wants more than screen time.',
        'Los niños negocian con emociones, no con hojas de cálculo. Las etiquetas funcionan de maravilla con hermanos pequeños, y quizás tengas algo que él quiera más que tiempo de pantalla.')
    },
    {
      id: 'gym-late-fee', level: 'beginner', category: 'everyday', type: 'deal', register: 'service',
      unit: 'usd', start: 35, target: 0, step: 5, ackerman: false,
      who: { name: 'Priya', gender: 'f', role: L('Gym front desk associate', 'Recepcionista del gimnasio') },
      title: L('Getting a gym late fee waived', 'Conseguir que el gimnasio anule un recargo'),
      brief: L('Your card expired and the monthly gym payment bounced. A late fee appeared on your account. You have been a member for two years and have never missed a payment before.',
        'Tu tarjeta caducó y el pago mensual del gimnasio fue rechazado. Apareció un recargo en tu cuenta. Llevas dos años como socio y nunca habías dejado de pagar.'),
      goal: L('Get the late fee reduced to {target} (waived). It is currently {start}.', 'Conseguir que el recargo quede en {target} (anulado). Ahora es de {start}.'),
      item: L('the late fee', 'el recargo'),
      open: L('I see the late fee on your account, it\'s {price}. I can take that payment now if you like.', 'Veo el recargo en su cuenta, son {price}. Puedo cobrarlo ahora si quiere.'),
      motives: [
        L('Looking at your history... two years, never late once. That definitely counts for something.', 'Mirando su historial... dos años sin un solo retraso. Eso sin duda cuenta.'),
        L('Between us, my manager lets me give one courtesy waiver per member per year.', 'Entre nosotros, mi gerente me permite hacer una anulación de cortesía por socio al año.'),
        L('We\'re measured on member retention this quarter. Keeping happy members matters a lot to my review.', 'Este trimestre nos evalúan por la retención de socios. Que los socios estén contentos cuenta mucho para mi evaluación.'),
        L('Honestly, the system adds those fees automatically. Nobody actually decides them.', 'Sinceramente, el sistema añade esos recargos automáticamente. Nadie los decide de verdad.')
      ],
      deal: L('Done. I\'ve set the fee to {price}. Just update your card and you\'re all set.', 'Listo. He dejado el recargo en {price}. Solo actualice su tarjeta y todo en orden.'),
      nodeal: L('I understand. The fee will stay on the account for now.', 'Entiendo. El recargo seguirá en la cuenta por ahora.'),
      tip: L('Front-desk staff often have more discretion than they admit, but they need a reason to use it. Make the request easy to grant; a no-oriented question works well here.',
        'El personal de recepción suele tener más margen del que admite, pero necesita un motivo para usarlo. Haz que tu petición sea fácil de conceder; aquí funciona muy bien una pregunta orientada al «no».')
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
