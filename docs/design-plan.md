# Plan de diseño: Cancha

Portafolio de Miguel Ángel Pantoja Guerra, estudiante de Ingeniería de Software en Pasto, Colombia.

## Historia de la dirección

1. **Negros y Blancos** (primera versión): el carnaval de Pasto, con un hero partido en negro y blanco. Miguel la descartó por "muy básica".
2. **Carroza**: magenta, amarillo y violeta del carnaval. Descartada: "los colores están muy feos".
3. **Cancha** (actual): Miguel pidió el azul como color principal, el verde como segundo y un sitio mucho más interactivo.

De las versiones anteriores quedan la tipografía, la retícula, la escritura y el sistema de componentes. Cambiaron el color y el hero.

## Concepto

Miguel juega y ve fútbol, y se define como full stack: sabe un poco de todo y conecta las partes. En la cancha, ese es el **10**, el volante que conecta la defensa con el ataque.

- **El inicio es una pizarra táctica.** Cada proyecto ocupa una posición: Ascua de delantero, HP y Kalma por las bandas, PrestaLab en la defensa (el backend es la base). Miguel es el 10, en el medio. Al elegir una posición se dibuja el pase y aparece el proyecto.
- **Azul cobalto** es la camiseta: botones, apellidos, barridos al pasar el puntero.
- **Verde cancha** es el campo y los resaltes: la posición elegida, lo que está "en vivo".
- **El fútbol se queda en el hero, la 404 ("Fuera de lugar") y el easter egg.** El resto del sitio es sobrio, para que el reclutador lea hechos.

## Tokens

### Color

| Token | Día | Noche | Rol | Contraste |
|---|---|---|---|---|
| `--fondo` | `#E6EEFF` hielo | `#081634` azul noche | Fondo de página | |
| `--superficie` | `#C9DAFF` | `#10265A` | Tarjetas, formulario | |
| `--tinta` | `#0A1F44` marino | `#E6EEFF` | Texto principal | 13,96:1 / 15,36:1 |
| `--tinta-suave` | `#34507F` | `#9FB4E0` | Texto secundario | 6,94:1 / 8,58:1 (sobre superficie: 5,75 / 6,97) |
| `--accion` | `#1D3FE0` azul | `#7C9BFF` azul claro | Botón principal, enlaces, chips activos | 6,35:1 / 6,80:1 |
| `--sobre-accion` | `#E6EEFF` | `#081634` | Texto sobre `--accion` | 6,35:1 / 6,80:1 |
| `--resalte` / `--exito` | `#047A4A` verde | `#34D399` verde vivo | Estados, foco de tarjetas | 4,64:1 / 9,30:1 |
| `--error` | `#B3261E` | `#FF8A80` | Errores del formulario | 5,61:1 / 7,83:1 |
| `--cancha` | `#0B7A4B` / `#0A6E44` | igual | Franjas del campo | Líneas `#D4FBE8`: 4,81:1 |

Regla: en Día, el verde (`#047A4A`) nunca va como texto sobre `--superficie` (3,85:1); ahí solo es fondo o borde.
Sin blanco ni negro puros en ningún tema (pedido explícito del cliente).

### Tipografía

Una sola familia: **Archivo** variable (peso 100–900, ancho 62–125 %), autoalojada.

| Paso | Tamaño | Uso | Ancho / peso / interlineado |
|---|---|---|---|
| Cartel | `min(15cqi, 7.4rem)` | Nombre en el hero | 100–125 % (sigue al puntero) / 900 / 0,96 |
| 5 | `clamp(2.25rem, 6vw, 5.4rem)` | Nombre de proyecto | 125 % / 850 / 0,92 |
| 4 | `clamp(2rem, 4vw, 2.5rem)` | Títulos de sección | 115 % / 800 / 1,0 |
| 3 | `clamp(1.5rem, 3vw, 1.875rem)` | Subtítulos, "qué hago" | 110 % / 750 / 1,15 |
| 2 | 1,375rem | Entradillas | 100 % / 500 / 1,35 |
| 1 | 1,0625rem | Texto | 100 % / 400 / 1,6 |
| 0 | 0,8125rem | Notas | 100 % / 500 / 1,45 |

Escala de cuarta justa (1,333) desde 17 px. Medida del texto: 64ch.

### Espaciado, forma y movimiento

- Espaciado base 4 px: `--e-1` (4 px) a `--e-10` (144 px).
- Radios por jerarquía: botones y chips en píldora; tarjetas 20 px; imágenes 10 px.
- Movimiento: `--dur-corta` 160 ms, `--dur-media` 320 ms, `--dur-larga` 900 ms; `--curva` para salidas y `--curva-rebote` para lo que responde a una acción. Todo se apaga con `prefers-reduced-motion`.

## Interacciones

| Interacción | Qué muestra | Accesible por |
|---|---|---|
| Elegir una posición en la cancha | El proyecto que juega ahí, con su enlace | Botones reales, flechas del teclado, región `aria-live` |
| Arrastrar al 10 | El pase se recalcula en vivo | Decorativo (`aria-hidden`); la información está en los botones |
| Nombre elástico | El ancho de la letra sigue al puntero | Solo con puntero fino y sin movimiento reducido |
| Filtro por tecnología | Qué proyectos usan cada tecnología; los demás se atenúan | Botones con `aria-pressed` y conteo en `role="status"` |
| Barrido de tarjetas | La tarjeta se llena de azul al pasar o al enfocar | También con `:focus-within` |
| Trayectoria con scroll | La línea se enciende al bajar | Mejora progresiva (`animation-timeline: view()`) |
| Escribir «gol» | El balón entra al arco | Sorpresa; avisa también con texto |

## Mapa del sitio

```
/                      Inicio: hero con cancha, proyectos, cómo trabajo, sobre mí, trayectoria, contacto
/proyectos/[slug]      Caso de estudio (hp, prestalab, ascua, kalma)
/cv                    CV en HTML, listo para imprimir
/mensaje-enviado       Resultado del formulario sin JavaScript
/404                   "Fuera de lugar"
/api/contacto          Función serverless del formulario
```

## Wireframe del inicio

```
Escritorio                                         Móvil
┌───────────────────────────┬──────────────────┐   ┌──────────────┐
│ ● Estudiante · Pasto       │  ┌────────────┐  │   │ ● Estudiante │
│ MIGUEL                     │  │  [Ascua]   │  │   │ MIGUEL       │
│ ÁNGEL                      │  │[HP]    [K] │  │   │ ÁNGEL        │
│ PANTOJA   (azul)           │  │    (10)    │  │   │ PANTOJA      │
│ GUERRA    (azul)           │  │ [PrestaLab]│  │   │ GUERRA       │
│ Construyo apps completas…  │  └────────────┘  │   │ (Escríbeme)  │
│ (Escríbeme) (Ver mi CV)    │  Jugada elegida  │   │ [cancha]     │
└───────────────────────────┴──────────────────┘   │ Jugada       │
                                                    └──────────────┘
```

Alineación a la izquierda en todo el sitio: un solo borde de lectura para quien escanea.

## Principios

1. **La cancha es la audacia.** El resto del sitio es tipografía y tarjetas sobrias.
2. **Cada interacción enseña algo real.** El pase lleva a un proyecto, el filtro cuenta tecnologías; nada se mueve solo por moverse.
3. **Cada tecnología apunta a un proyecto.** Nada de barras ni porcentajes.
4. **Hechos, no adjetivos.** Nada de "apasionado por la tecnología".
5. **Funciona sin JavaScript y con teclado.**
