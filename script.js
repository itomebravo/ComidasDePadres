(function () {
  "use strict";
  var Q = window.QUEDADA;
  var TZ = "Europe/Madrid";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Imágenes con fallback a emoji ---------- */
  function fallbackImg(img) {
    var emoji = img.getAttribute("data-fallback") || "📺";
    var div = document.createElement("div");
    div.className = "fallback";
    div.textContent = emoji;
    img.replaceWith(div);
  }
  function wireImg(img) {
    if (img.complete && img.naturalWidth === 0) fallbackImg(img);
    else img.addEventListener("error", function () { fallbackImg(img); });
  }
  document.querySelectorAll("img[data-fallback]").forEach(wireImg);

  /* ---------- Datos fijos ---------- */
  var reserva = new Date(Q.reserva);
  var inicioPrevio = new Date(reserva.getTime() - 60 * 60 * 1000);       // 1 h antes
  var inicioDespues = new Date(reserva.getTime() + 165 * 60 * 1000);     // 2h45 después
  var finDia = new Date(reserva.getTime() + 9 * 60 * 60 * 1000);         // ~23:45

  var fechaLarga = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: TZ }).format(reserva);
  $("fechaLarga").textContent = fechaLarga;
  $("edicion").textContent = Q.edicion;

  $("previoHora").textContent = Q.previo.hora;
  $("previoLugar").textContent = Q.previo.lugar;
  $("previoNota").textContent = Q.previo.nota;
  $("restHora").textContent = Q.restaurante.hora;
  $("restNombre").textContent = Q.restaurante.nombre;
  $("restMapa").href = Q.restaurante.mapa;
  $("despuesLugar").textContent = Q.despues.lugar;
  $("despuesNota").textContent = Q.despues.nota;

  /* ---------- Fichas ---------- */
  var fichas = $("fichas");
  Q.parejas.forEach(function (p) {
    var art = document.createElement("article");
    art.className = "ficha";
    art.innerHTML =
      '<div class="ficha-img"><img alt="" loading="lazy"></div>' +
      '<div class="ficha-body">' +
        "<h3></h3><p class=\"alias\"></p>" +
        "<dl>" +
          "<dt>Especialidad</dt><dd class=\"esp\"></dd>" +
          "<dt>Frase típica</dt><dd class=\"fra\"></dd>" +
          "<dt>Riesgo de irse pronto</dt><dd><div class=\"riesgo\"><i></i></div></dd>" +
        "</dl>" +
      "</div>";
    var img = art.querySelector("img");
    img.alt = "Caricatura de " + p.nombres;
    img.setAttribute("data-fallback", p.emoji || "🙂");
    img.src = p.imagen;
    art.querySelector("h3").textContent = p.nombres;
    art.querySelector(".alias").textContent = p.alias;
    art.querySelector(".esp").textContent = p.especialidad;
    art.querySelector(".fra").textContent = p.frase;
    var bar = art.querySelector(".riesgo i");
    bar.style.width = (p.riesgoFuga || 0) + "%";
    art.querySelector(".riesgo").title = (p.riesgoFuga || 0) + "%";
    fichas.appendChild(art);
    wireImg(img);
  });

  /* ---------- Ticker ---------- */
  var ticker = $("ticker");
  var items = Q.titulares.map(function (t) { return "<span></span>"; }).join("");
  ticker.innerHTML = items + items; // duplicado para bucle continuo
  ticker.querySelectorAll("span").forEach(function (s, i) {
    s.textContent = Q.titulares[i % Q.titulares.length];
  });
  requestAnimationFrame(function () {
    var px = ticker.scrollWidth / 2;
    ticker.style.animationDuration = Math.max(30, px / 70) + "s";
  });

  /* ---------- Hemeroteca ---------- */
  var hem = $("hemerotecaList");
  if (!Q.hemeroteca || !Q.hemeroteca.length) {
    hem.innerHTML = '<div class="hem-vacia">📼 Archivo en proceso de digitalización. Las crónicas de esta edición se publicarán cuando los protagonistas recuperen la memoria (previsiblemente el lunes).</div>';
  } else {
    Q.hemeroteca.slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; }).forEach(function (h) {
      var d = document.createElement("div");
      d.className = "hem-item";
      var t = document.createElement("time");
      t.textContent = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(new Date(h.fecha + "T12:00:00"));
      var s = document.createElement("div");
      s.innerHTML = "<strong></strong> — <span></span>";
      s.querySelector("strong").textContent = h.sitio;
      s.querySelector("span").textContent = h.titular;
      d.appendChild(t); d.appendChild(s);
      hem.appendChild(d);
    });
  }

  /* ---------- Reloj, cuenta atrás y estado ---------- */
  var clockFmt = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: TZ });
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var fases = document.querySelectorAll(".fase");
  var luces = document.querySelectorAll(".luz");

  function setSemaforo(color, titulo, texto, tituloColor) {
    luces.forEach(function (l) { l.classList.toggle("on", l.classList.contains(color)); });
    $("estadoTitulo").textContent = titulo;
    $("estadoTitulo").style.color = tituloColor;
    $("estadoTexto").textContent = texto;
  }

  function faseActual(now) {
    if (now < inicioPrevio) return "antes";
    if (now < reserva) return "previo";
    if (now < inicioDespues) return "comida";
    if (now < finDia) return "despues";
    return "fin";
  }

  var ultimaFase = null;
  function tick() {
    var now = new Date();
    $("clock").textContent = clockFmt.format(now);

    // Cuenta atrás hasta la reserva
    var diff = reserva - now;
    var cd = $("countdown");
    if (diff > 0) {
      var s = Math.floor(diff / 1000);
      $("cdD").textContent = Math.floor(s / 86400);
      $("cdH").textContent = pad(Math.floor(s % 86400 / 3600));
      $("cdM").textContent = pad(Math.floor(s % 3600 / 60));
      $("cdS").textContent = pad(s % 60);
    }

    var f = faseActual(now);
    if (f === ultimaFase) return;
    ultimaFase = f;

    var orden = ["previo", "comida", "despues"];
    fases.forEach(function (el) {
      var nombre = el.getAttribute("data-fase");
      el.classList.toggle("activa", nombre === f);
      el.classList.toggle("pasada", f === "fin" || orden.indexOf(nombre) < orden.indexOf(f) && orden.indexOf(f) > -1);
    });

    var bt = $("breakingText");
    if (f === "antes") {
      bt.textContent = "Ocho padres planean escapar de sus hijos durante una tarde entera";
      setSemaforo("ambar", "EN ESPERA", "Los menores siguen en sus domicilios habituales. Entrega a los abuelos prevista para el día de autos.", "#ffb000");
    } else if (f === "previo") {
      bt.textContent = "Los primeros fugados ya han sido vistos con una caña en la mano";
      $("cdLabel").textContent = "La reserva es en";
      setSemaforo("verde", "TODO EN ORDEN", "Los menores se encuentran bajo custodia de los abuelos. Último parte: merendando.", "#2ecc71");
    } else if (f === "comida") {
      cd.classList.add("done");
      $("cdLabel").textContent = "🍽️ Comida en curso. Se ruega no molestar.";
      bt.textContent = "Confirmado: los padres ya están sentados en " + Q.restaurante.nombre + " y nadie les ha pedido agua";
      setSemaforo("verde", "TODO EN ORDEN", "Los abuelos informan de que «se están portando muy bien». Fuentes independientes no lo confirman.", "#2ecc71");
    } else if (f === "despues") {
      cd.classList.add("done");
      $("cdLabel").textContent = "🍸 Fase de prórroga activada. Duración: desconocida.";
      bt.textContent = "La sobremesa entra en su fase más crítica: alguien ha dicho «una y nos vamos»";
      setSemaforo("ambar", "VIGILANCIA", "Los abuelos han empezado a preguntar «a qué hora pensáis venir». Se recomienda no leer el WhatsApp.", "#ffb000");
    } else {
      cd.classList.add("done");
      $("cdLabel").textContent = "📼 Fin de la emisión. Gracias por su audiencia.";
      bt.textContent = "Fin de la emisión: los menores han sido devueltos a sus legítimos propietarios";
      setSemaforo("roja", "MENORES DE VUELTA", "La operación ha concluido. Los niños han regresado con energía renovada. Los padres, no tanto.", "#ff3b30");
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Barras de probabilidad animadas ---------- */
  var probs = document.querySelector(".probs");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { probs.classList.add("visible"); obs.disconnect(); } });
    }, { threshold: 0.3 }).observe(probs);
  } else { probs.classList.add("visible"); }

  /* ---------- Botón de pánico ---------- */
  var mensajes = [
    ["Todo controlado", "Los niños están viendo dibujos. Los abuelos también. Nadie sabe ya quién vigila a quién."],
    ["Sin novedad en el frente", "Han comido todo. Bueno, el postre. Bueno, el postre dos veces."],
    ["Línea ocupada", "La abuela está hablando con la vecina de lo bien que se portan sus nietos. Inténtelo más tarde (mucho más tarde)."],
    ["Mensaje del abuelo", "«Estamos en el parque. Volved cuando queráis, que aquí mandamos nosotros.»"],
    ["Parte oficial", "Cero heridos, una rodilla raspada sin importancia y tres galletas no autorizadas. Situación estable."],
    ["Buzón de voz", "«Ha llamado a los abuelos. Ahora mismo no podemos atenderle porque estamos malcriando a sus hijos.»"],
    ["Aviso importante", "Si llamas, te van a contar que se han portado fenomenal… y te van a pedir que los traigas más a menudo. Cuelga mientras puedas."],
    ["Diagnóstico NSN", "Tus hijos están perfectamente. Lo que tú tienes se llama culpa de padre. Tratamiento: otra ronda."]
  ];
  var ultimo = -1;
  var modal = $("modal");
  $("panicBtn").addEventListener("click", function () {
    var i;
    do { i = Math.floor(Math.random() * mensajes.length); } while (i === ultimo && mensajes.length > 1);
    ultimo = i;
    $("modalTitle").textContent = "";
    $("modalText").textContent = "";
    modal.hidden = false;
    setTimeout(function () {
      $("modalTitle").textContent = mensajes[i][0];
      $("modalText").textContent = mensajes[i][1];
    }, 1100);
    $("modalClose").focus();
  });
  function cerrar() { modal.hidden = true; $("panicBtn").focus(); }
  $("modalClose").addEventListener("click", cerrar);
  modal.addEventListener("click", function (e) { if (e.target === modal) cerrar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) cerrar(); });
})();
