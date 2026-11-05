---
titulo: 'HP: Health Points'
resumen: 'Tu tiempo en pantalla como una barra de vida, con el reloj como mando.'
orden: 1
area: 'Reloj, móvil y nube'
stack: ['Kotlin', 'Jetpack Compose', 'Wear OS', 'Room', 'WorkManager', 'Supabase']
contexto: 'Materia Diseño de Interfaces'
rol: 'Diseño y desarrollo de las dos apps y la base de datos'
fecha: 'Octubre de 2026'
fechaIso: '2026-10'
portada:
  src: '../../assets/proyectos/hp/reloj-hud.png'
  alt: 'Pantalla redonda del reloj: barra de vida casi llena, 84 de 120 HP, 1 h 24 min restantes y un monstruo rosado en la esquina.'
galeria:
  - src: '../../assets/proyectos/hp/telefono-panel.png'
    alt: 'Panel principal en el teléfono con la barra de vida del día y la lista de monstruos.'
    pie: 'El panel del teléfono: la vida del día y las apps que la gastan.'
  - src: '../../assets/proyectos/hp/reloj-monstruos.png'
    alt: 'Lista de monstruos en el reloj, cada uno con el tiempo que le queda.'
    pie: 'En el reloj, cada app adictiva es un monstruo con su propio límite.'
  - src: '../../assets/proyectos/hp/telefono-ia.png'
    alt: 'Sugerencia del coach en el teléfono para ajustar un límite, con botones para aceptar o rechazar.'
    pie: 'El coach sugiere; tú decides.'
enlaces:
  - texto: 'Código en GitHub'
    url: 'https://github.com/miguelpantojag03/DESCONECTA'
---

## El problema

Las apps de bienestar digital muestran estadísticas que casi nadie revisa. HP convierte el tiempo en pantalla en un juego: tienes una barra de vida diaria, donde cada punto es un minuto, y cada app adictiva es un monstruo con su propio límite. El reloj muestra cuánta vida te queda sin que tengas que sacar el teléfono, que es justo lo que quieres usar menos.

## Mi papel

Diseñé y construí las dos apps (reloj y teléfono), el sistema de diseño que comparten y la base de datos en Supabase.

## Decisiones técnicas

### El reloj no se conecta a internet

**Decidí** que el reloj hable solo con el teléfono, a través de la Wearable Data Layer.

**Descarté** la primera versión, en la que el reloj se vinculaba con un código de seis dígitos y se conectaba directo a Supabase por Wi‑Fi.

**Por qué:** así ahorra batería y el reloj nunca guarda credenciales.

### El juego no depende de la red

El conteo de vida y el bloqueo de apps corren en el teléfono y funcionan sin conexión. Lo que se presta para trampas (sumar experiencia, usar "Revivir" o canjear objetos) lo valida el servidor con funciones RPC, y el inventario se recalcula desde un registro de eventos.

### Sincronización con cola y reintentos

Room guarda una copia de todas las tablas y una cola de cambios pendientes. WorkManager los sube con reintentos y espera exponencial. Si hay conflicto, gana el cambio más reciente, salvo en el inventario, que siempre sale de los eventos.

### IA por reglas en vez de un modelo de lenguaje

El coach usa reglas y 300 frases escritas a mano. Siempre responde, no necesita internet y cada sugerencia tiene un botón "¿Por qué?". Nunca cambia un límite sin que lo apruebes.

## Arquitectura

1. **Reloj (Wear OS)** Muestra la vida, los monstruos y el inventario. No se conecta a internet.
2. **Wearable Data Layer** Sincroniza el estado entre el reloj y el teléfono.
3. **Teléfono (Android)** Motor del juego, bloqueo de apps, caché en Room y cola de cambios con WorkManager.
4. **Supabase** PostgreSQL con RLS, funciones RPC anti-trampas y Realtime.

## Resultado

- Dos APK de release, teléfono y reloj, firmados con la misma clave para que se reconozcan entre sí.
- 60 pantallas documentadas con capturas: 32 del teléfono y 28 del reloj.
- Probado en emuladores de teléfono y reloj, y la app del teléfono en un Samsung real. Falta probar el reloj en un dispositivo físico; la lista de verificación está en el README del repositorio.

## Qué aprendí

Un reloj cambia las reglas: pantalla redonda, batería limitada y nada de teclado. Tuve que decidir qué es lo único importante en cada pantalla y mover todo lo demás al teléfono.
