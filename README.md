# Explorador de cámara · prototipo de visión

Interfaz para probar acceso a cámara y un recuadro visual de ejemplo en el navegador. **El recuadro es fijo: no hay un modelo de detección en este código.** La versión actual no envía fotos ni alertas a terceros.

## Probar

Desde este directorio, iniciar `python -m http.server 5500` y abrir `http://127.0.0.1:5500`. Permitir la cámara para ver la vista previa; el botón «Detener» libera la cámara.

## Por qué se retiró la integración de alertas

El ZIP anterior contenía capturas de cámara y credenciales de un servicio de mensajería, incluida una clave compartida en JavaScript público. Esa clave no ofrecía autenticación real porque cualquier visitante podía leerla. El ZIP se retira del estado actual y los datos quedan fuera del código navegable. **Las credenciales deben revocarse o rotarse; el historial de Git y copias previas pueden conservarlas.**

Para convertir esto en un detector real hacen falta un modelo evaluado, consentimiento para capturar imágenes, protección del endpoint, retención limitada y pruebas de errores. No usar el prototipo como sistema de vigilancia.
