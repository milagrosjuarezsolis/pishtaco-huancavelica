/* =========================================================
   DATOS DEL SITIO: El Pishtaco de Huancavelica
   Todo sale del avance del grupo (PDF). Para corregir un texto,
   cámbialo aquí; no hace falta tocar app.js.
   ========================================================= */

const PIEZAS = [
  {
    numero: "01", medio: "Instagram", titulo: "El diario de María",
    texto: "Observaciones y anotaciones de María antes de desaparecer: casas abandonadas, huellas desconocidas, viviendas sin rastro de sus habitantes.",
    accion: "Lee y descubre a María.", motivacion: "¿Qué le ocurrió?",
    puente: "«Descubre qué ocurrió con María. Lee el cómic desde el enlace del perfil.»",
    tipo: "instagram",
    imagenes: [
      { src: "img/ig-1.jpg", w: 504, h: 703, alt: "Publicación del diario de María: Caso casa abandonada" },
      { src: "img/ig-2.jpg", w: 504, h: 636, alt: "Publicación del diario de María: Caso huellas desconocidas" },
      { src: "img/ig-3.jpg", w: 504, h: 656, alt: "Publicación del diario de María: Caso casa sin personas" }
    ]
  },
  {
    numero: "02", medio: "Cómic digital", titulo: "La historia principal",
    texto: "El origen de Atoq y la investigación de Gabriel hasta el rescate. El cómic se entiende por sí solo; los otros medios amplían la experiencia.",
    accion: "Sigue la investigación de Gabriel.", motivacion: "Conocer otras versiones.",
    puente: "«Escucha las voces del pueblo», al final del cómic.",
    tipo: "comic",
    enlace: { texto: "Leer el cómic", url: "https://canva.link/htt7pjhj9pbki0f" },
    imagenes: [
      { src: "img/portada-comic.jpg", w: 615, h: 922, alt: "Portada del cómic El Pishtaco de Huancavelica con Gabriel, María, Don Eusebio y el Pishtaco" },
      { src: "img/comic-1.jpg", w: 922, h: 1383, alt: "Página 1 del cómic: el nevado Huamanrazo y la cueva escondida" }
    ]
  },
  {
    numero: "03", medio: "Podcast", titulo: "Voces del pueblo",
    texto: "Testimonios ficticios de los habitantes y de las desapariciones. Aporta perspectivas que no se desarrollan en detalle en el cómic.",
    accion: "Escucha y relaciona testimonios.", motivacion: "Vivir la experiencia de María.",
    puente: "«Explora el intento de escape de María», en la descripción del episodio.",
    tipo: "lamina",
    imagenes: [
      { src: "img/hoja-habitantes.jpg", w: 1076, h: 717, alt: "Lámina de los habitantes de Huancavelica: adultos mayores, comerciante, campesinos, vendedora y jóvenes del pueblo" }
    ]
  },
  {
    numero: "04", medio: "Videojuego", titulo: "El sueño de María",
    texto: "Experimenta su lucha por salir de la cueva donde está atrapada. Ocurre durante su cautiverio, antes del rescate del cómic.",
    accion: "Explora e intenta escapar.", motivacion: "Reinterpretar el diario.",
    puente: "«Conoce a María antes de su desaparición», con acceso a su diario en Instagram.",
    tipo: "ancha",
    imagenes: [
      { src: "img/videojuego.jpg", w: 1600, h: 900, alt: "María con un farol dentro de la cueva, rodeada de huesos, con el Pishtaco detrás de ella" }
    ]
  }
];

const PERSONAJES = [
  {
    id: "atoq", nombre: "Atoq", rol: "Antes de la transformación",
    img: "img/cuerpo-atoq.jpg", cara: "img/cara-atoq.jpg",
    texto: "Conocido por estudiar los antiguos conocimientos y rituales de las montañas. Era inteligente y respetaba las tradiciones, pero había perdido a las personas que amaba y tenía una obsesión: quería vencer a la muerte.",
    datos: { "Expresiones": "Serenidad, curiosidad, dolor, obsesión, desafío, temor", "Lenguaje corporal": "Estudia, desafía", "Vestuario": "Túnica oscura, manta de lana, sandalias", "Objetos": "Bolsa de tela, apuntes" }
  },
  {
    id: "supay", nombre: "Supay", rol: "Divinidad del mundo de los muertos",
    img: "img/cuerpo-supay.jpg", cara: "img/cuerpo-supay.jpg", cubrir: true,
    texto: "Antigua divinidad vinculada al mundo de los muertos. Atoq la invoca en la cámara ceremonial; aparece en el ritual y lo condena.",
    datos: { "Aparece en": "La cámara ceremonial del Huamanrazo", "Papel": "Castiga a Atoq: su cuerpo muere y su espíritu queda atrapado entre dos mundos" }
  },
  {
    id: "pishtaco", nombre: "El Pishtaco", rol: "Apariencia sobrenatural",
    img: "img/cuerpo-pishtaco.jpg", cara: "img/cara-pishtaco.jpg",
    texto: "El espíritu de Atoq, atrapado entre el mundo de los vivos y los muertos. Desaparece personas para obtener su grasa y esencia vital, y prepara el ritual para recuperar un cuerpo humano.",
    datos: { "Gestos y expresiones": "Frialdad, engaño, cálculo, desprecio, amenaza, ira contenida", "Lenguaje corporal": "Acecha, manipula", "Vestuario": "Sombrero negro, abrigo oscuro, botas gastadas", "Rasgos": "Manos alargadas, rostro demacrado" }
  },
  {
    id: "eusebio", nombre: "Don Eusebio", rol: "Huancavelica",
    img: "img/cuerpo-eusebio.jpg", cara: "img/cara-eusebio.jpg",
    texto: "Descubrió la existencia del Pishtaco y pactó con él para conseguir la vida eterna. Colabora con el ritual, engaña a Gabriel y lo guía a la cueva.",
    datos: { "Expresiones": "Neutral, cordialidad, cálculo, ambición, inquietud, temor", "Lenguaje corporal": "Estudia, guía", "Vestuario": "Chaqueta gris, chaleco de lana, zapatos gastados", "Objetos": "Libreta con mapa, cinta de María" }
  },
  {
    id: "maria", nombre: "María Quispe", rol: "Huancavelica, 1963",
    img: "img/cuerpo-maria.jpg", cara: "img/cara-maria.jpg",
    texto: "Desaparece en 1963 tras encontrarse con el Pishtaco y Don Eusebio. Queda cautiva en la cueva del Huamanrazo para el último ritual. Su diario se cuenta en Instagram.",
    datos: { "Expresiones": "Neutral, atención, temor, tristeza, firmeza, alivio", "Lenguaje corporal": "Cautela, protección", "Vestuario": "Blusa clara, manta de lana, pollera azul, zapatos sencillos", "Detalles": "Trenzas y cintas, bolsa de tela" }
  },
  {
    id: "gabriel", nombre: "Gabriel Quispe", rol: "Detective · Huancavelica",
    img: "img/cuerpo-gabriel.jpg", cara: "img/cara-gabriel.jpg",
    texto: "Hermano de María. Dos años después regresa para buscarla, sigue las pistas hasta la cueva, rompe la piedra negra y la rescata.",
    datos: { "Expresiones": "Neutral, sospecha, miedo, tristeza, determinación, alivio", "Lenguaje corporal": "Investiga, protege", "Vestuario": "Abrigo marrón, camisa clara, pantalón gris, zapatos de cuero", "Objetos": "Libreta, fotografía, maleta" }
  },
  {
    id: "habitantes", nombre: "Habitantes", rol: "Personajes secundarios",
    img: "img/hoja-habitantes.jpg", cubrir: true, soloTarjeta: true,
    texto: "La gente de Huancavelica y sus comunidades. Sus testimonios forman el podcast «Voces del pueblo».",
    datos: { "Personajes": "Adulto mayor, comerciante, campesino, joven del pueblo, adulta mayor, vendedora, campesina, joven del pueblo", "Objetos cotidianos": "Canastas, mantas, costales, cántaro" }
  }
];

// x / y en porcentaje sobre la imagen del mapa
const LUGARES = [
  { id: "nevado", x: 45.6, y: 6.5, titulo: "Nevado Huamanrazo", tipo: "Lugar",
    texto: "En la Cordillera de Chonta, región de Huancavelica. Allí comenzó una antigua historia. Para los habitantes, las montañas eran lugares sagrados donde habitaban fuerzas que había que respetar." },
  { id: "maria", x: 33, y: 29, titulo: "María · 1963", tipo: "Personaje", img: "img/cara-maria.jpg",
    texto: "La ruta roja muestra el camino de María. Desaparece tras encontrarse con el Pishtaco y Eusebio." },
  { id: "cueva", x: 58, y: 24.5, titulo: "Cueva del Pishtaco", tipo: "Lugar",
    texto: "Una cueva escondida entre las rocas. Entre aquellas montañas existía un lugar al que nadie se atrevía a acercarse después del anochecer." },
  { id: "camara", x: 80, y: 17, titulo: "Cámara ceremonial", tipo: "Interior de la cueva", img: "img/escenario-cueva.jpg",
    texto: "Piedra negra, vasijas, velas y hojas de coca. Aquí Atoq invocó a Supay, y aquí el Pishtaco prepara el ritual para recuperar un cuerpo humano." },
  { id: "cautiverio", x: 92.4, y: 23.4, titulo: "Cautiverio de María", tipo: "Interior de la cueva",
    texto: "Gabriel encontró a María encerrada y descubrió que sería utilizada en el último ritual. Rompió la piedra negra y escapó con ella." },
  { id: "casa-atoq", x: 2.9, y: 34.9, titulo: "Casa de Atoq", tipo: "Lugar · El origen", img: "img/escenario-casa-atoq.jpg",
    texto: "Una pequeña casa de piedra y adobe cerca de las comunidades de las faldas del Huamanrazo. Allí Atoq vivía y estudiaba los rituales de las montañas." },
  { id: "gabriel", x: 49.5, y: 35.5, titulo: "Gabriel", tipo: "Personaje", img: "img/cara-gabriel.jpg",
    texto: "La ruta azul muestra el recorrido de Gabriel. Regresa e investiga la desaparición de su hermana María." },
  { id: "supay", x: 3.3, y: 46.4, titulo: "Supay", tipo: "Divinidad", img: "img/cuerpo-supay.jpg",
    texto: "Antigua divinidad vinculada al mundo de los muertos. Aparece en el ritual y condena a Atoq." },
  { id: "eusebio", x: 60.4, y: 48.1, titulo: "Casa de Don Eusebio", tipo: "Lugar", img: "img/cara-eusebio.jpg",
    texto: "Don Eusebio pactó con el Pishtaco. Engaña a Gabriel y lo guía hacia la cueva." },
  { id: "comunidades", x: 3.6, y: 71.6, titulo: "Comunidades rurales", tipo: "Lugar",
    texto: "Habitantes, viajeros y testimonios. De aquí salen las voces del podcast: los relatos de la gente sobre el Pishtaco y las desapariciones." },
  { id: "pueblo", x: 41.3, y: 72.3, titulo: "Pueblo de Huancavelica", tipo: "Lugar",
    texto: "Aquí regresa Gabriel, dos años después, para buscar a María. Desde el pueblo, el camino principal sube hacia el Huamanrazo." },
  { id: "quebradas", x: 81, y: 74.2, titulo: "Quebradas y caminos", tipo: "Lugar",
    texto: "Los caminos que suben hacia el nevado Huamanrazo, siguiendo la ruta de los que se atreven a buscar la cueva." },
  { id: "transformacion", x: 12, y: 87, titulo: "Transformación de Atoq", tipo: "Momento clave", img: "img/cara-pishtaco.jpg",
    texto: "Atoq (humano) → El Pishtaco (tras el ritual). Su cuerpo murió, pero su espíritu quedó atrapado entre el mundo de los vivos y los muertos." }
];

// Galería: miniatura (mini) para la cuadrícula y la imagen grande solo al abrirla
const GALERIA = [
  { id: "comic", nombre: "Cómic", imagenes: [
    { mini: "img/mini/portada-comic.jpg", grande: "img/portada-comic.jpg", w: 615, h: 922, pie: "Portada del cómic digital" },
    { mini: "img/mini/comic-1.jpg", grande: "img/comic-1.jpg", w: 922, h: 1383, pie: "Página 1: el nevado Huamanrazo y la cueva escondida" },
    { mini: "img/mini/comic-2.jpg", grande: "img/comic-2.jpg", w: 922, h: 1383, pie: "Página 2: Atoq y su obsesión por vencer la muerte" }
  ]},
  { id: "escenarios", nombre: "Escenarios", imagenes: [
    { mini: "img/mini/escenario-cueva.jpg", grande: "img/escenario-cueva.jpg", w: 1076, h: 717, pie: "La cueva del Huamanrazo: entrada, pasadizo y cámara ceremonial" },
    { mini: "img/mini/escenario-casa-atoq.jpg", grande: "img/escenario-casa-atoq.jpg", w: 1045, h: 964, pie: "La casa de Atoq, antes de la transformación" },
    { mini: "img/mini/videojuego.jpg", grande: "img/videojuego.jpg", w: 1600, h: 900, pie: "El sueño de María: atrapada en la cueva" }
  ]},
  { id: "laminas", nombre: "Láminas", imagenes: [
    { mini: "img/mini/mapa.jpg", grande: "img/mapa.jpg", w: 1536, h: 1024, pie: "Mapa del universo narrativo" },
    { mini: "img/mini/hoja-habitantes.jpg", grande: "img/hoja-habitantes.jpg", w: 1076, h: 717, pie: "Habitantes de Huancavelica: propuesta de vestuario" }
  ]},
  { id: "diario", nombre: "Diario de María", imagenes: [
    { mini: "img/mini/ig-perfil.jpg", grande: "img/ig-perfil.jpg", w: 503, h: 960, pie: "Perfil «El Diario de María» en Instagram" },
    { mini: "img/mini/ig-1.jpg", grande: "img/ig-1.jpg", w: 504, h: 703, pie: "Caso: casa abandonada" },
    { mini: "img/mini/ig-2.jpg", grande: "img/ig-2.jpg", w: 504, h: 636, pie: "Caso: huellas desconocidas" },
    { mini: "img/mini/ig-3.jpg", grande: "img/ig-3.jpg", w: 504, h: 656, pie: "Caso: casa sin personas" }
  ]}
];

const ESCENAS = [
  { lugar: "Origen · Cámara ceremonial", titulo: "El ritual", correcta: "atoq",
    pregunta: "¿Quién, obsesionado con vencer la muerte, invocó a Supay para obtener la vida eterna?",
    pista: "Busca a quien estudiaba los rituales de las montañas.",
    revela: "Atoq encontró una antigua cámara ceremonial en las faldas del Huamanrazo y realizó el ritual." },
  { lugar: "Origen · Cámara ceremonial", titulo: "El castigo", correcta: "supay",
    pregunta: "¿Quién apareció en el ritual y condenó a Atoq?",
    pista: "Es una divinidad vinculada al mundo de los muertos.",
    revela: "Supay lo castigó: su cuerpo murió y su espíritu quedó atrapado entre dos mundos." },
  { lugar: "Huancavelica · Años después", titulo: "Las desapariciones", correcta: "pishtaco",
    pregunta: "¿En quién se convirtió Atoq, y quién empezó a desaparecer personas para obtener su grasa y esencia vital?",
    pista: "Lleva sombrero negro y un abrigo oscuro.",
    revela: "El Pishtaco comenzó a desaparecer personas en las comunidades." },
  { lugar: "Casa de Don Eusebio", titulo: "El pacto", correcta: "eusebio",
    pregunta: "¿Quién descubrió la existencia del Pishtaco y pactó con él para conseguir la vida eterna?",
    pista: "Lleva una libreta con un mapa.",
    revela: "Don Eusebio hizo el pacto y empezó a colaborar con el ritual." },
  { lugar: "Camino al Huamanrazo · 1963", titulo: "La desaparición", correcta: "maria",
    pregunta: "¿Quién desapareció después de encontrarse con el Pishtaco y Don Eusebio?",
    pista: "Su diario se publica en Instagram.",
    revela: "María Quispe desapareció en 1963. Fue llevada a la cueva para el último ritual." },
  { lugar: "Cueva del Huamanrazo · Dos años después", titulo: "El rescate", correcta: "gabriel",
    pregunta: "¿Quién siguió las pistas hasta la cueva, rompió la piedra negra y escapó con María?",
    pista: "Es detective y hermano de María.",
    revela: "Gabriel destruyó el ritual. La cueva se derrumbó y Eusebio y el Pishtaco desaparecieron." }
];
