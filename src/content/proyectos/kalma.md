---
titulo: 'Kalma'
resumen: 'Diario de síntomas por voz: dictas 10 segundos y Kalma busca los patrones para tu médico.'
orden: 4
area: 'Móvil e IA'
stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Supabase', 'Gemini']
contexto: 'Materia Diseño de Interfaces'
rol: 'Investigación, diseño de la interfaz y desarrollo de la app'
fecha: 'Octubre de 2026'
fechaIso: '2026-10'
enlaces:
  - texto: 'Código en GitHub'
    url: 'https://github.com/miguelpantojag03/Kalma'
---

## El problema

Las personas con migraña o molestias digestivas llegan al médico sin datos: no recuerdan qué comieron ni cómo durmieron la semana del dolor. Llevar un diario funciona, pero nadie lo llena. Kalma lo reduce a un audio de 10 segundos: lo dictas, la app lo convierte en datos, busca patrones entre hábitos y síntomas y arma un reporte de una página para el médico.

Kalma no diagnostica, no receta y no reemplaza al médico.

## Mi papel

Definí las personas y el guion de pruebas, diseñé la interfaz y su sistema de diseño y construí la app con sus cuentas en Supabase.

## Decisiones técnicas

### App nativa en vez de web

**Decidí** construir Kalma con Expo y React Native.

**Descarté** el primer prototipo, una web progresiva en React y Vite.

**Por qué:** registrar en 10 segundos necesita notificaciones locales, vibración, voz nativa y la hoja de compartir del sistema para mandar el reporte por WhatsApp. En una web móvil nada de eso es confiable.

### La IA nunca es el único camino

El dictado lo entiende Google Gemini a través de una función de Supabase que guarda la llave, así que la llave nunca viaja en la app. Si no hay conexión o la IA falla, un analizador local en el celular hace el trabajo. En ambos casos, la persona revisa y corrige lo que se entendió antes de guardar.

### Contraste que se prueba, no que se supone

El verde de la marca con texto blanco daba 3,54:1 y no pasaba WCAG AA. El botón principal usa una variante más oscura (5,16:1), y una prueba automática verifica el contraste de cada par de colores.

### Datos de ejemplo que nunca tocan la nube

El modo demo trae 45 días de datos de una persona ficticia, guardados en un espacio aparte del celular que nunca se sincroniza. Un script crea dos cuentas de prueba y comprueba que ninguna puede leer ni escribir los datos de la otra.

## Arquitectura

1. **App (Expo / React Native)** Registro por voz, calendario, patrones y reporte. Funciona sin conexión.
2. **Analizador local** Entiende el dictado en el celular cuando no hay internet o la IA falla.
3. **Función de Supabase** Guarda la llave de Gemini fuera de la app y le pasa el texto dictado.
4. **Supabase (PostgreSQL)** 11 tablas con RLS: cada persona solo ve sus datos.

## Resultado

- 84 decisiones de diseño documentadas, cada una con su principio, la alternativa descartada y cómo se valida.
- Guion de prueba de usabilidad listo para cinco participantes, con tareas cronometradas y el cuestionario SUS.
- APK instalable para hacer las pruebas en un Android real.

## Qué aprendí

Diseñar para salud es diseñar para el peor día de alguien. Cada pantalla tenía que funcionar con dolor de cabeza, poca batería y sin internet.
