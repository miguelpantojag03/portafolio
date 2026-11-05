---
titulo: 'PrestaLab'
resumen: 'Préstamo de equipos del laboratorio de la universidad: API en Spring Boot y app web en React.'
orden: 2
area: 'Backend y web'
stack:
  ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Flyway', 'Docker', 'React', 'GitHub Actions']
contexto: 'Proyecto de la universidad'
rol: 'Diseño y desarrollo del backend, el frontend y el despliegue'
fecha: 'Octubre de 2026'
fechaIso: '2026-10'
enlaces:
  - texto: 'Código en GitHub'
    url: 'https://github.com/miguelpantojag03/PRESTALAB'
---

## El problema

El laboratorio presta equipos a los estudiantes, y alguien tiene que saber qué está prestado, a quién y hasta cuándo. PrestaLab lo resuelve con un sistema completo: el estudiante consulta el catálogo y pide un préstamo, el administrador lo aprueba o lo rechaza, y el sistema marca los vencidos a medianoche y manda un recordatorio a las 8:00 del día anterior.

## Mi papel

Diseñé y construí la API, la app web, las pruebas, los contenedores y el pipeline de integración continua. Documenté cada decisión de arquitectura en un ADR.

## Decisiones técnicas

### API sin estado con JWT

**Decidí** una API REST sin sesión en el servidor: el login devuelve un token firmado que vence en 60 minutos.

**Descarté** la versión anterior, con vistas Thymeleaf y sesión HTTP.

**Por qué:** con sesión, cada cliente tendría que manejar cookies y CSRF, y escalar a más de una instancia obligaría a compartir las sesiones.

### Las reglas del préstamo viven en la entidad y en la base de datos

Un préstamo no tiene `setEstado`: cada transición es un método (`aprobar`, `rechazar`, `devolver`, `marcarVencido`) que verifica el estado de origen. Como dos administradores pueden aprobar al mismo tiempo, un trigger de PostgreSQL aplica las mismas reglas: la base de datos tiene la última palabra.

### Login que no revela quién está registrado

Correo inexistente, contraseña incorrecta y cuenta inactiva responden igual. Si el correo no existe, el servidor compara la contraseña contra un hash de relleno, para que las dos respuestas tarden lo mismo y nadie pueda adivinar qué correos están registrados por el tiempo de respuesta.

### Arquitectura en capas que se verifica sola

Las 15 dependencias permitidas entre paquetes están escritas como pruebas con ArchUnit. Si un controlador importa un repositorio "por esta vez", el build falla.

## Arquitectura

1. **Navegador** Estudiantes y administrador del laboratorio.
2. **nginx + React** Sirve la app web y reenvía /api al backend. Un solo origen, sin CORS.
3. **API REST (Spring Boot)** 19 endpoints con JWT, tareas programadas a las 00:00 y 08:00 y correos por SMTP.
4. **PostgreSQL 16** Migraciones con Flyway y un trigger que protege las reglas del préstamo.

## Resultado

- 19 endpoints documentados en Swagger UI, con errores en formato estándar (RFC 9457).
- Pruebas en cuatro niveles: dominio, arquitectura, capa web e integración con PostgreSQL real en Testcontainers. El CI exige 80 % de cobertura en dominio y servicios.
- GitHub Actions corre las pruebas, compila el frontend y levanta los cuatro contenedores para ejecutar la colección de Postman con Newman.
- Siete ADR que explican cada decisión y la alternativa descartada.

## Qué aprendí

Escribir un ADR antes de programar me obligó a nombrar la alternativa que descartaba. Varias veces, al escribirla, cambié de opinión.
