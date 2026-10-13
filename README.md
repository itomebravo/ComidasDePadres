# NSN 24h · Noticias Sin Niños

Web de una sola página (HTML + CSS + JS estático, sin build) para anunciar las comidas de padres del grupo.

## Cómo actualizarla para cada quedada

Solo hay que editar **`data.js`**: fecha y hora de la reserva, sitio del previo, restaurante, sitio de después, fichas y titulares del rótulo. Al terminar una quedada, añade una línea en `hemeroteca`.

La web cambia sola según la hora del día de la quedada: el rótulo de última hora, la fase marcada como «AHORA» en la escaleta y el semáforo del estado de los menores.

## Despliegue en Vercel

1. Sube estos ficheros a la raíz del repo `ComidasDePadres`.
2. En Vercel: *Add New → Project → Import* el repo.
3. *Framework Preset*: **Other**. Sin comando de build ni directorio de salida. *Deploy*.

## Imágenes

Van en la carpeta `img/` con estos nombres exactos (PNG o cambia la extensión en `index.html` / `data.js`). Si una imagen no existe, la web muestra un emoji en su lugar, así que se puede publicar ya sin ellas.

| Fichero | Dónde sale | Formato recomendado |
|---|---|---|
| `img/presentadora.png` | Portada | Horizontal 4:3 (p. ej. 1200×900) |
| `img/corresponsal.png` | Conexión en directo | Horizontal 4:3 |
| `img/pitu-carli.png` | Ficha | Cuadrada (1024×1024) |
| `img/euge-fran.png` | Ficha | Cuadrada |
| `img/anuar-pau.png` | Ficha | Cuadrada |
| `img/naza-nacho.png` | Ficha | Cuadrada |

### Estilo común (para que todas casen)

> Ilustración tipo caricatura editorial, colores vivos, trazo limpio, sombreado suave, estética de informativo de televisión: azul marino profundo, rojo intenso y amarillo como colores de acento. Expresiones exageradas y divertidas, sin texto ni logotipos en la imagen.

### Prompt 1 · Presentadora (`presentadora.png`, 4:3)

> Caricatura de una presentadora de telediario en un plató de televisión moderno, sentada tras la mesa de noticias, con traje elegante y expresión de máxima seriedad informativa mientras sostiene unos papeles. Detrás, una gran pantalla muestra un icono de cubiertos y una copa de vino. Sobre la mesa, discretamente, un vaso de vermut con una aceituna. Iluminación de plató, fondo azul marino con detalles rojos y amarillos. Estilo caricatura editorial, colores vivos, sin texto ni logotipos. Formato horizontal 4:3.

### Prompt 2 · Corresponsal (`corresponsal.png`, 4:3)

> Caricatura de un reportero de televisión con gabardina y micrófono, de pie en una calle del centro de Santander junto a la puerta de un restaurante, con expresión dramática de estar cubriendo una noticia histórica. Al fondo, a través del cristal, se ve una mesa larga de adultos riendo y brindando sin ningún niño. Tarde soleada de otoño. Estilo caricatura editorial, colores vivos, toques de azul marino, rojo y amarillo, sin texto ni logotipos. Formato horizontal 4:3.

### Prompts 3 a 6 · Fichas de las parejas (cuadradas)

Lo mejor es usar una herramienta que acepte foto de referencia (ChatGPT, Gemini…): sube una foto de la pareja y usa el prompt. Sin foto saldrá una pareja genérica.

**Pitu & Carli** — «Los Puntuales (según ellos)»
> A partir de la foto adjunta, crea una caricatura divertida de esta pareja, manteniendo sus rasgos reconocibles. Van corriendo por la calle con cara de prisa, uno abrazado a una botella gigante de agua con gas llena de burbujas y el otro con el móvil en la mano escribiendo «estamos aparcando». Fondo azul marino liso con un marco tipo rótulo de informativo. Estilo caricatura editorial, colores vivos, plano medio, sin texto. Formato cuadrado.

**Euge & Fran** — «La Sobremesa Infinita»
> A partir de la foto adjunta, crea una caricatura divertida de esta pareja, manteniendo sus rasgos reconocibles. Uno de ellos abraza con cariño una columna del restaurante con los ojos cerrados y cara de felicidad, mientras el otro brinda con una copa levantando un dedo como diciendo «una más»; al fondo un camarero apila las sillas. Fondo azul marino liso con un marco tipo rótulo de informativo. Estilo caricatura editorial, colores vivos, plano medio, sin texto. Formato cuadrado.

**Anuar & Pau** — «Los Negociadores»
> A partir de la foto adjunta, crea una caricatura divertida de esta pareja, manteniendo sus rasgos reconocibles. Uno habla por el móvil con gesto de negociador profesional, como cerrando un gran acuerdo, y el otro le hace el gesto de «pide una hora más» con complicidad. Fondo azul marino liso con un marco tipo rótulo de informativo. Estilo caricatura editorial, colores vivos, plano medio, sin texto. Formato cuadrado.

**Naza & Nacho** — «Los Organizadores»
> A partir de la foto adjunta, crea una caricatura divertida de esta pareja, manteniendo sus rasgos reconocibles. Él sujeta un portátil enseñando orgulloso una web en la pantalla y ella sostiene una carpeta de planificación y un bolígrafo, los dos con cara de tenerlo todo bajo control. A un lado, una botella de tequila con una señal de prohibido y Nacho mirándola de reojo con resignación. Fondo azul marino liso con un marco tipo rótulo de informativo. Estilo caricatura editorial, colores vivos, plano medio, sin texto. Formato cuadrado.

Consejo: genera las seis en la misma conversación y pide al principio «mantén exactamente el mismo estilo en todas las imágenes».
