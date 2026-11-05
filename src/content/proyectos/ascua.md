---
titulo: 'Ascua'
resumen: 'Juego narrativo en 3D: con un farol y poca energía, decides qué barrios de la ciudad salvar.'
orden: 3
area: 'Videojuegos'
stack: ['Unity 6', 'C#', 'URP', 'Cinemachine', 'Shaders HLSL']
contexto: 'Materia de Interfaces'
rol: 'Diseño del juego, programación y escritura de la historia'
fecha: 'Octubre de 2026'
fechaIso: '2026-10'
portada:
  src: '../../assets/proyectos/ascua/plaza.png'
  alt: 'El personaje con su farol en la plaza de noche; arriba, el reloj de la noche y la esperanza de La Plaza y El Mercado.'
galeria:
  - src: '../../assets/proyectos/ascua/dialogo.png'
    alt: 'Diálogo con Mina, una de las vecinas de la ciudad.'
    pie: 'Las vecinas y vecinos recuerdan lo que hiciste en noches anteriores.'
  - src: '../../assets/proyectos/ascua/combate.png'
    alt: 'Combate contra criaturas de sombra con un combo de luz.'
    pie: 'Combate de luz contra las sombras.'
  - src: '../../assets/proyectos/ascua/tejado.png'
    alt: 'El personaje sobre un tejado, con la ciudad a oscuras abajo.'
    pie: 'Salto, trepar y esquivar para moverse entre barrios.'
enlaces:
  - texto: 'Código en GitHub'
    url: 'https://github.com/miguelpantojag03/ASQUA'
---

## La idea

Una ciudad se apaga un poco cada noche. Llevas la última fuente de luz, un farol con energía limitada, y tienes que decidir qué barrios iluminar y cuáles dejar a la Penumbra. Las vecinas y vecinos que salvas recuerdan lo que hiciste; los que abandonas, también.

Ascua empezó como _Últimas Luces_, un juego web en TypeScript. Lo pasé a Unity para tener un mundo en 3D, cámara libre y combate.

## Mi papel

Diseñé las mecánicas, escribí la historia y los diálogos y programé los sistemas del juego en C#.

## Decisiones técnicas

### Escenas generadas por código

**Decidí** que la ciudad, los barrios y los personajes se generen con un script de C#.

**Descarté** armar las escenas a mano en el editor de Unity.

**Por qué:** una escena generada se puede reconstruir desde cero, revisar con un validador y regenerar sin abrir el editor. Cuando algo se rompe, sé exactamente qué cambió.

### Probar el juego sin jugarlo a mano

Una prueba automática juega una noche completa a cuatro veces la velocidad, toma capturas en momentos clave y escribe un reporte con la esperanza de cada barrio y el tiempo de cada frame. Así compruebo que una noche se puede terminar después de cada cambio.

### Combate legible

Como mucho dos enemigos pueden atacar al mismo tiempo. Los demás esperan su turno, avisan antes de atacar con un destello y el jugador puede fijar un objetivo. La dificultad sale de las decisiones, no del caos en pantalla.

## Arquitectura

1. **Constructor de escenas** Código C# que genera la ciudad, los barrios y los personajes desde el editor o por consola.
2. **Validador** Revisa la escena generada: 170 comprobaciones antes de jugar.
3. **Sistemas del juego** Noche y Penumbra, esperanza por barrio, misiones, diálogos, combate y audio.
4. **Prueba automática** Juega una noche acelerada, toma capturas y mide el tiempo de cada frame.

## Resultado

- 139 scripts de C#: noche y Penumbra, misiones, diálogos con memoria, combate, clima, audio, diario y modo foto.
- Cuatro noches de contenido y un validador que pasa 170 de 170 comprobaciones.
- En la prueba automática, el juego tarda 1,28 ms por frame en promedio (1,56 ms en el percentil 95).
- Panel de accesibilidad dentro del juego.

## Qué aprendí

En un juego, la interfaz también es la historia: la barra de esperanza de cada barrio dice más que un diálogo. Aprendí a diseñar información que se entiende en medio segundo, mientras el jugador está ocupado.
