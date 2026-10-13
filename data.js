/* ============================================================
   NSN 24h · Noticias Sin Niños
   ------------------------------------------------------------
   ESTE ES EL ÚNICO FICHERO QUE HAY QUE TOCAR PARA CADA QUEDADA.
   Cambia fecha, sitios y titulares, haz push y Vercel lo publica.
   ============================================================ */

window.QUEDADA = {
  edicion: "Edición especial sábado",

  // Hora de la reserva (formato ISO con zona horaria de España)
  reserva: "2026-10-17T14:45:00+02:00",

  previo: {
    hora: "13:45",          // hora aproximada
    lugar: "Por confirmar", // p. ej. "Bar La Conveniente"
    nota: "Se comunicará por el grupo. Fuentes no oficiales apuntan a una terraza cercana."
  },

  restaurante: {
    nombre: "El Cadelo",
    ciudad: "Santander",
    hora: "14:45",
    mapa: "https://www.google.com/maps/search/?api=1&query=El+Cadelo+Santander"
  },

  despues: {
    lugar: "Por decidir sobre la marcha",
    nota: "Hasta que el cuerpo aguante o suene el primer teléfono de los abuelos."
  },

  // Fichas de los protagonistas. La imagen es opcional: si no existe, sale el emoji.
  parejas: [
    {
      nombres: "Pitu & Carli",
      alias: "Los Puntuales (según ellos)",
      imagen: "img/pitu-carli.png",
      emoji: "⏰",
      especialidad: "Llegar «en cinco minutos» desde hace veinte.",
      frase: "«Estamos aparcando.»",
      riesgoFuga: 35
    },
    {
      nombres: "Euge & Fran",
      alias: "La Sobremesa Infinita",
      imagen: "img/euge-fran.png",
      emoji: "🍷",
      especialidad: "Pedir «la última» tres veces seguidas.",
      frase: "«Venga, una y nos vamos.»",
      riesgoFuga: 10
    },
    {
      nombres: "Anuar & Pau",
      alias: "Los Negociadores",
      imagen: "img/anuar-pau.png",
      emoji: "📱",
      especialidad: "Ampliar el horario de recogida con los abuelos por WhatsApp sin que nadie se entere.",
      frase: "«Tranquilos, que me dan hasta las nueve.»",
      riesgoFuga: 25
    },
    {
      nombres: "Naza & Nacho",
      alias: "Los Organizadores",
      imagen: "img/naza-nacho.png",
      emoji: "📋",
      especialidad: "Montar una web para una comida. Sí, en serio.",
      frase: "«¿Habéis visto la web?»",
      riesgoFuga: 45
    }
  ],

  // Titulares del rótulo inferior (ticker)
  titulares: [
    "Cuatro parejas de Santander logran coordinar sus agendas por primera vez sin necesidad de un mediador",
    "Los abuelos confirman que tienen «todo controlado» mientras buscan en Google cómo poner una película",
    "Expertos advierten: hablar del colegio durante la comida reduce la diversión un 80%",
    "Se espera una sobremesa de duración indeterminada en la zona del Cadelo",
    "Detectado un grupo de padres terminando un plato caliente sin interrupciones",
    "La DGT recomienda no planificar la vuelta a casa antes de las 20:00",
    "Un padre consigue terminar una frase completa sin que nadie le llame «papá»"
  ],

  // Hemeroteca: añade aquí las quedadas pasadas cuando termine cada una
  // Ejemplo: { fecha: "2026-10-17", sitio: "El Cadelo", titular: "Sobremesa récord de 6 horas" }
  hemeroteca: []
};
