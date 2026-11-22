# Rodaya

Landing page académica de Rodaya, plataforma para alquilar equipos audiovisuales entre estudiantes. Basada en el mock-up de la landing (sección 4.3.2 del informe). HTML, CSS y JavaScript sin dependencias. El catálogo, los propietarios, los precios y los testimonios son datos de demostración.

## Ejecutar

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor HTTP estático. Las fuentes (Poppins e Inter) y las fotos se cargan desde internet; si una foto no carga, se muestra una ilustración de respaldo.

## Estructura

- `index.html`: secciones de la landing y diálogos (ficha del equipo con simulador de reserva, ingreso y registro).
- `styles.css`: guía visual de Rodaya (azul #1D4ED8, naranja #C2410C, Poppins e Inter), animaciones y diseño responsive.
- `main.js`: catálogo, filtros, búsqueda, favoritos, simulador de reserva, calculadora, carrusel, preguntas frecuentes y formulario.

## Funcionalidades e historias de usuario

| HU | Funcionalidad |
| --- | --- |
| HU01 | Hero con "Buscar equipos" (catálogo) y "Publicar mi equipo" ("Gana con tu equipo") |
| HU02 | "Cómo funciona" con pestañas "Quiero alquilar" y "Quiero publicar" |
| HU03 | Calculadora con deslizador: ingreso bruto, comisión de 10 %, neto mensual y por ciclo; valida días vacíos |
| HU04 | "Tarifas y garantía" con "Ver ejemplo" y "¿Cuándo recupero mi garantía?" |
| HU05 | Preguntas frecuentes: al abrir una se cierra la anterior |
| HU06 | Formulario de contacto con validación de correo, contador de caracteres y confirmación |
| HU07 | Carrusel de testimonios con reproducción automática, puntos y vuelta al primero |
| HU08 | Catálogo con fotos, filtros por categoría, orden, precio por hora o día, favoritos y "Ver detalle" |
| Extra | Búsqueda rápida en el hero, simulador de reserva (horas o días, garantía 20 %), menú activo según la sección, botón "volver arriba" y animaciones al hacer scroll (se desactivan con "reducir movimiento") |

## Fotos

Fotos con licencia libre, enlazadas desde sus sitios. Para que no dependan de internet, descárgalas en una carpeta `img/` y cambia las URL en `index.html` y `main.js`.

| Uso | Autor | Fuente |
| --- | --- | --- |
| Hero | Oleg Brovchenko | https://unsplash.com/photos/5rC0gmRR7G0 |
| Cámara | Vanilla Bear Films | https://unsplash.com/photos/rDvbY_7YZT8 |
| Lente | Dima Solomin | https://unsplash.com/photos/wHt2rhKOAp8 |
| Luces con softbox | Pexels | https://www.pexels.com/photo/7383646/ |
| Micrófono shotgun | Naomi August | https://unsplash.com/photos/sOJGap513II |
| Gimbal | William Bayreuther | https://unsplash.com/photos/UqlWfdDiEIM |
| Micrófono inalámbrico | Philipp M. | https://unsplash.com/photos/daSwn4uD8Q0 |

## Publicación

En el repositorio abre **Settings → Pages**, selecciona **Deploy from a branch** y elige `main` y `/(root)`.

[Diseño de Rodaya en Figma](https://www.figma.com/design/IsAf1QO8am9suBYBniVmui/Rodaya-%E2%80%93-UX-UI-TB1?node-id=0-1&p=f)
