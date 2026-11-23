/**
 * Datos personales y textos del sitio. Edita aquí sin tocar componentes.
 * Los proyectos viven en src/content/proyectos/*.md.
 */

export const perfil = {
  nombre: 'Miguel Ángel Pantoja Guerra',
  nombreCorto: 'Miguel Pantoja',
  rol: 'Estudiante de Ingeniería de Software',
  ciudad: 'Pasto, Colombia',
  email: 'miguelpantojag03@gmail.com',
  github: 'https://github.com/miguelpantojag03',
  linkedin: 'https://www.linkedin.com/in/miguel-%C3%A1ngel-pantoja-guerra-b5a0b5428',
  universidad: 'Universidad Cooperativa de Colombia',
  semestre: 'quinto semestre',
  grado: 'mayo de 2028',

  /** Frase de qué hace: una línea, con hechos. */
  queHago: 'Construyo apps completas: del reloj al servidor.',
  disponibilidad: 'Disponible para proyectos freelance, remoto o presencial.',

  /**
   * WhatsApp con indicativo y sin espacios ni «+», por ejemplo '573001234567'.
   * Si queda vacío, los botones de «Solicitar un proyecto» llevan al formulario de contacto.
   */
  whatsapp: '573215671241',

  /** Descripción para buscadores y redes (máx. ~155 caracteres). */
  descripcion:
    'Miguel Ángel Pantoja, estudiante de Ingeniería de Software en Pasto, Colombia. Apps para reloj, móvil, web y videojuegos. Disponible para freelance.',
} as const;

/** Sobre mí: párrafos en primera persona. */
export const historia: string[] = [
  'Soy de Pasto. Desde pequeño me la pasaba en el computador, y aprendí HTML y CSS por mi cuenta antes de saber que eso se podía estudiar.',
  'Hoy estudio Ingeniería de Software en la Universidad Cooperativa de Colombia. Me gusta entender el sistema completo: la pantalla que alguien toca, la API que responde y la base de datos que guarda todo. Por eso mis proyectos van del reloj al servidor, y hasta un videojuego.',
  'Fuera del código, juego fútbol y lo veo siempre que puedo.',
];

/** Lo que estoy haciendo ahora. Actualízalo cada mes o dos. */
export const ahoraMismo = {
  actualizado: 'Noviembre de 2026',
  items: [
    'Cursando el quinto semestre de Ingeniería de Software.',
    'Preparando HP para probarlo en un reloj Wear OS de verdad.',
    'Ampliando Ascua con nuevas zonas de la ciudad.',
  ],
};

export type ItemTrayectoria = {
  fecha: string;
  /** Fecha en formato ISO para <time datetime>. */
  iso: string;
  titulo: string;
  detalle: string;
  /** Si es true, todavía no pasó (grado estimado). */
  previsto?: boolean;
};

/** Trayectoria: de lo más reciente a lo más antiguo. */
export const trayectoria: ItemTrayectoria[] = [
  {
    fecha: 'Mayo de 2028',
    iso: '2028-05',
    titulo: 'Grado como ingeniero de software',
    detalle: 'Fecha estimada. Universidad Cooperativa de Colombia.',
    previsto: true,
  },
  {
    fecha: 'Segundo semestre de 2026',
    iso: '2026-10',
    titulo: 'Quinto semestre y cuatro proyectos',
    detalle:
      'Construí HP (reloj y teléfono), PrestaLab (API y web), Kalma (app móvil con IA) y Ascua (videojuego en Unity).',
  },
  {
    fecha: 'Segundo semestre de 2024',
    iso: '2024-08',
    titulo: 'Empecé Ingeniería de Software',
    detalle: 'Universidad Cooperativa de Colombia, en Pasto.',
  },
  {
    fecha: '2023 a 2024',
    iso: '2023',
    titulo: 'Dos semestres de Ingeniería Ambiental',
    detalle:
      'Universidad de Nariño. Después me cambié a Ingeniería de Software para dedicarme a lo que siempre me gustó: programar.',
  },
  // Curso del SENA: completa y descomenta cuando tengas los datos.
  // {
  //   fecha: 'AAAA',
  //   iso: 'AAAA',
  //   titulo: 'Curso de programación en el SENA',
  //   detalle: 'Nombre del curso, duración y qué aprendí.',
  // },
  {
    fecha: 'Desde pequeño',
    iso: '2010',
    titulo: 'HTML y CSS por mi cuenta',
    detalle: 'Mis primeras páginas, antes de entrar a la universidad.',
  },
];

export type Tecnologia = {
  nombre: string;
  /** Slugs de proyectos en src/content/proyectos donde la usé. */
  proyectos?: string[];
  nota?: string;
};

/**
 * Habilidades contadas por evidencia, no por porcentaje.
 * "enProyectos": tecnologías que aparecen en un proyecto publicado aquí.
 * "fueraDeProyectos": las he usado, pero no en estos cuatro proyectos.
 * "aprendiendo": lo que estoy aprendiendo ahora (si queda vacío, no se muestra).
 */
export const tecnologias: {
  enProyectos: Tecnologia[];
  fueraDeProyectos: Tecnologia[];
  aprendiendo: Tecnologia[];
} = {
  enProyectos: [
    { nombre: 'Java', proyectos: ['prestalab'] },
    { nombre: 'Spring Boot', proyectos: ['prestalab'] },
    { nombre: 'Kotlin y Jetpack Compose', proyectos: ['hp'] },
    { nombre: 'Wear OS', proyectos: ['hp'] },
    { nombre: 'TypeScript', proyectos: ['kalma'] },
    { nombre: 'React', proyectos: ['prestalab'] },
    { nombre: 'React Native y Expo', proyectos: ['kalma'] },
    { nombre: 'C# y Unity', proyectos: ['ascua'] },
    { nombre: 'PostgreSQL', proyectos: ['prestalab', 'hp', 'kalma'] },
    { nombre: 'Supabase', proyectos: ['hp', 'kalma'] },
    { nombre: 'Docker', proyectos: ['prestalab'] },
    { nombre: 'Postman', proyectos: ['prestalab'] },
    { nombre: 'Git, GitHub y GitHub Actions', proyectos: ['prestalab', 'hp', 'kalma', 'ascua'] },
    { nombre: 'HTML y CSS', nota: 'Este portafolio' },
  ],
  fueraDeProyectos: [
    { nombre: 'Python' },
    { nombre: 'Django' },
    { nombre: 'MySQL' },
    { nombre: 'Tailwind CSS' },
    { nombre: 'Vercel' },
    { nombre: 'AWS' },
  ],
  aprendiendo: [],
};

/** Cómo trabajo: hábitos que se pueden comprobar en los repositorios. */
export const formaDeTrabajo = [
  {
    titulo: 'Escribo las decisiones',
    texto:
      'Cada decisión importante queda escrita con la alternativa que descarté y por qué. PrestaLab tiene siete ADR; Kalma, más de 80 decisiones de diseño.',
  },
  {
    titulo: 'Construyo por fases',
    texto:
      'Primero algo que funcione de punta a punta, luego capas. Cada fase termina en un commit que se puede probar.',
  },
  {
    titulo: 'Pruebo lo que puede romperse',
    texto:
      'Pruebas de dominio, de arquitectura y de integración con una base de datos real. También pruebo el contraste de colores y la seguridad entre cuentas.',
  },
];

export type Servicio = {
  id: 'automatizaciones' | 'tiendas' | 'web' | 'movil' | 'medida';
  titulo: string;
  /** La necesidad del negocio, en sus palabras. */
  problema: string;
  /** Qué incluye: cosas concretas. */
  incluye: string[];
  /** Dónde se ve que lo sé hacer (opcional). */
  prueba?: { texto: string; href?: string };
};

/** Lo que hago para negocios: cada servicio con su necesidad, qué incluye y dónde se ve. */
export const servicios: Servicio[] = [
  {
    id: 'automatizaciones',
    titulo: 'Automatizaciones',
    problema: 'Pierdes horas en tareas repetitivas: copiar datos, armar reportes, mandar recordatorios.',
    incluye: [
      'Reportes que se arman solos desde tus datos',
      'Recordatorios y avisos automáticos por correo',
      'Tareas programadas que corren cada día o cada hora',
      'Conectar tus hojas de cálculo con otras herramientas',
    ],
    prueba: {
      texto: 'PrestaLab marca préstamos vencidos y envía recordatorios solo',
      href: '/proyectos/prestalab',
    },
  },
  {
    id: 'tiendas',
    titulo: 'Software para tiendas',
    problema: 'Llevas el inventario en un cuaderno o en Excel y no sabes bien qué vendiste ni qué te falta.',
    incluye: [
      'Inventario con alertas de productos por agotarse',
      'Registro de ventas y cierre de caja',
      'Reportes de lo más vendido por día, semana o mes',
      'Usuarios con permisos: dueño, cajero, bodega',
    ],
    prueba: {
      texto: 'PrestaLab: catálogo, préstamos y roles de administrador',
      href: '/proyectos/prestalab',
    },
  },
  {
    id: 'web',
    titulo: 'Páginas web para negocios',
    problema: 'Tus clientes te buscan en internet y no te encuentran, o tu página no funciona en el celular.',
    incluye: [
      'Página rápida que se ve bien en celular',
      'Catálogo de productos o servicios',
      'Botón de WhatsApp y formulario de contacto',
      'Lista para aparecer en Google',
    ],
    prueba: { texto: 'Esta misma página la hice yo, de cero' },
  },
  {
    id: 'movil',
    titulo: 'Apps móviles',
    problema: 'Quieres que tus clientes o tu equipo tengan tu servicio en el bolsillo.',
    incluye: [
      'App para Android e iOS',
      'Inicio de sesión y datos guardados en la nube',
      'Notificaciones',
      'Funciones con inteligencia artificial si las necesitas',
    ],
    prueba: { texto: 'Kalma: app móvil con IA', href: '/proyectos/kalma' },
  },
  {
    id: 'medida',
    titulo: 'Sistemas a la medida',
    problema: 'Tu negocio funciona distinto y ningún programa de los que existen te sirve.',
    incluye: [
      'Reservas, citas, préstamos o pedidos',
      'Panel de administración con reportes',
      'Base de datos segura y copias de respaldo',
      'Documentación para que no dependas de mí',
    ],
    prueba: { texto: 'Mira cómo documento cada decisión', href: '/proyectos/prestalab' },
  },
];

export type Testimonio = { nombre: string; relacion: string; texto: string };

/** Trabajo en equipo: lo que dicen mis compañeros de proyectos. Textos tal como los escribieron. */
export const testimonios: Testimonio[] = [
  {
    nombre: 'Joan Mosquera',
    relacion: 'Compañero de proyectos académicos',
    texto:
      'He tenido la oportunidad de compartir diferentes proyectos académicos con él y puedo destacar su responsabilidad, compromiso y dedicación como estudiante de Ingeniería de Software. Es una persona que demuestra interés por aprender, busca soluciones a los problemas y se esfuerza por entregar trabajos de calidad. En equipo, se caracteriza por ser colaborador, escuchar las ideas de los demás y aportar soluciones que ayudan a alcanzar los objetivos propuestos.',
  },
  {
    nombre: 'Santiago Ortega',
    relacion: 'Compañero de Ingeniería de Software',
    texto:
      'Como compañero de Ingeniería de Software, considero que es una persona perseverante, responsable y orientada al cumplimiento de sus objetivos. Se destaca por su capacidad de aprendizaje, pensamiento lógico y disposición para asumir nuevos retos. Al trabajar en equipo, mantiene una actitud respetuosa, participa activamente en las actividades y está dispuesto a escuchar diferentes puntos de vista. Su compromiso y actitud positiva contribuyen a generar un buen ambiente de trabajo y al desarrollo exitoso de los proyectos. Es un compañero comprometido, creativo y con buena capacidad para trabajar en equipo.',
  },
  {
    nombre: 'Juan Camilo Rosero',
    relacion: 'Compañero de proyectos académicos',
    texto:
      'Durante los proyectos académicos ha demostrado habilidades para analizar problemas, aportar ideas y encontrar soluciones desde el área de la programación y el desarrollo de software. Además, tiene una buena disposición para aprender cosas nuevas, compartir conocimientos y apoyar a sus compañeros cuando es necesario. Es alguien con quien se puede trabajar de manera organizada y responsable.',
  },
];

export type Pasatiempo = {
  id: 'futbol' | 'barca' | 'videojuegos' | 'viajar';
  titulo: string;
  texto: string;
  enlace?: { texto: string; href: string };
};

/** Fuera del código: lo que me gusta cuando no estoy programando. */
export const pasatiempos: Pasatiempo[] = [
  {
    id: 'futbol',
    titulo: 'Fútbol',
    texto: 'Lo juego y lo veo siempre que puedo. Por eso este portafolio es una cancha.',
  },
  {
    id: 'barca',
    titulo: 'FC Barcelona',
    texto: 'Soy fanático del Barça. Por eso mi personaje lleva la camiseta blaugrana.',
  },
  {
    id: 'videojuegos',
    titulo: 'Videojuegos',
    texto: 'Me gusta mucho jugarlos, y también hacerlos.',
    enlace: { texto: 'Mira Ascua, mi videojuego', href: '/proyectos/ascua' },
  },
  {
    id: 'viajar',
    titulo: 'Conocer lugares nuevos',
    texto: 'Me gusta viajar y descubrir sitios que no conozco.',
  },
];
