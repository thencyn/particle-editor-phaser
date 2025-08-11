# 🎆 Particle Editor Phaser

**Particle Editor Phaser** es una herramienta visual para crear, editar y exportar partículas para tus proyectos en **Phaser 3**, el popular framework de desarrollo de juegos en HTML5.

Una de las ventajas de este programa es lo fácil que resulta comparar el efecto de distintas propiedades en un emitter. ¿No sabes cuál es la diferencia entre tint y color? Simple: clona tu emitter, aplica tint a uno y color al otro, y podrás ver la diferencia al instante. También puedes revisar el ejemplo incluido que muestra este caso específico.

**[Demo](https://thencyn.github.io/particle-editor-phaser/)**

### Parámetros de entrada

| Parámetro | Descripción | Ejemplo | Valor mínimo |
|-----------|-------------|---------|--------------|
| `color`   | Cambia el color de fondo usando un código hexadecimal (sin `#`). | `color=000000` → fondo negro | — |
| `width`   | Define el ancho de la ventana. | `width=2048` | **1600** |
| `height`  | Define la altura de la ventana. | `height=1152` | **1024** |


## ✨ Características principales

- 🔧 **Editor visual en tiempo real**: Modifica propiedades de las partículas y observa los cambios al instante, sin necesidad de recompilar tu aplicación.
- 🎨 **Soporte para múltiples opciones de partículas**: Incluye propiedades como velocidad y ángulo, velocidad x e y, aceleración, gravedad, escale, alpha, rotate, blend mode, entre muchas otras.
- 🧪 **Pruebas y ejemplos integrados**: Incluye ejemplos listos para cargar y experimentar con diferentes efectos visuales.
- 📁 **Proyectos con múltiples *emitters***: Permite añadir y configurar múltiples *emitters* en un mismo proyecto.
- 💾 **Guardar y cargar proyectos**: Guarda tus proyectos directamente en el almacenamiento local del navegador para retomarlos más adelante. También puedes exportarlos como archivos .json e importarlos nuevamente cuando lo necesites o en otro navegador.
- 📤 **Exportación fácil**: Exporta tus configuraciones como código de partículas compatible con Phaser 3.

## 🚀 ¿Por qué usarlo?

- Acelera el proceso de creación de efectos de partículas.
- Evita los ciclos repetitivos de pruebas de efectos de partículas.

## 📦 Exportación

Puedes exportar tus efectos de 4 distintas formas:

- Archivo .json del proyecto con todos los emitters. Ideal para respaldar tu trabajo y reutilizarlo dentro de esta misma aplicación.
- Proyecto JavaScript básico, preparado para ser ejecutado directamente en el navegador.
- Fragmento de código para Phaser 3 del emitter seleccionado, listo para copiar y pegar en tu juego.
- Fragmento de código para Phaser 3 con todos los emitters del proyecto, también listo para integrar en tu juego.

## ⚠️ Advertencia de rendimiento

> El uso excesivo de *emitters* y efectos visuales puede causar un aumento considerable en el consumo de recursos del sistema, lo que podría provocar sobrecalentamiento, especialmente en notebooks sin GPU dedicada. Se recomienda vigilar la temperatura de tu GP4 y CPU.

## 🛠 Tecnologías

- [Phaser 3](https://phaser.io/)
- TypeScript
- Webpack

---

¡Empieza a crear efectos sorprendentes para tus juegos con **Particle Editor Phaser**! 🚀
