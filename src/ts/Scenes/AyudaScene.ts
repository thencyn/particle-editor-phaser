import { AtlasBotonesImagenes, AtlasImagenes, AtlasImagenesDetalles, Imagenes, ManejarDepthMainGame, Sonidos, TexturasManuales, Variables } from "../Utilidades/Diccionario";
import { ObtenerTextoMultiIdioma } from "../Utilidades/MultiIdioma";
import { UtilSonido } from "../Utilidades/UtilSonido";
import PrincipalScene from "./PrincipalScene";


export default class AyudaScene extends Phaser.Scene {
	public static Name = "AyudaEscene";
	private fondoImagen: Phaser.GameObjects.Image;
	private cerrar: Phaser.GameObjects.Image;
	private fotoActualAyuda: Phaser.GameObjects.Image;
	private imagenesAyuda: string[] = [TexturasManuales.Ayuda1];
	private imagenIndexMostrando: number;
	public init() {
		this.imagenIndexMostrando = 0;
	}

	public preload(): void {
		// por implementar
	}

	public create(): void {
		this.add.image(0, 0, TexturasManuales.FondoTransparente)
			.setOrigin(0, 0)
			.setInteractive()
			.on(Phaser.Input.Events.POINTER_UP, () => {
				// if (!this.cerrandoEscena) {
				// 	this.cerrarEscena();
				// }
			});

		this.fondoImagen = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, Imagenes.BackgroundModal)
			.setDisplaySize(1475, 880)
			.setAlpha(1);
		this.cerrar = this.add.image(this.fondoImagen.x + (this.fondoImagen.displayWidth / 2), this.fondoImagen.y - (this.fondoImagen.displayHeight / 2), AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
			// .setScale(0.5)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				this.cerrar.setTint(0x66caff);
			})
			.on(Phaser.Input.Events.POINTER_OUT, () => {
				this.cerrar.clearTint();
			})
			.on(Phaser.Input.Events.POINTER_UP, () => {
				UtilSonido.reproducirSonidoEfecto(this, Sonidos.ApretarBoton);
				// this.registry.set(Variables.EscenaActual, this.registry.get(Variables.EscenaLaunchMenu));
				// this.scene.resume(this.registry.get(Variables.EscenaLaunchMenu));
				this.scene.resume(PrincipalScene.Name);
				this.scene.stop(AyudaScene.Name);
			});
		this.fotoActualAyuda = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, TexturasManuales.Ayuda1)
			// .setOrigin(0, 0)
			.setInteractive()
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.cambiarImagen(this.imagenIndexMostrando + 1);
			});
		// this.crearBotonSiguiente();
		// this.crearBotonAnterior();
	}

	crearBotonSiguiente() {
		this.add.image(this.cameras.main.centerX + (this.fondoImagen.displayWidth / 2), this.cameras.main.centerY, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				// this.cambiarImagen(this.imagenIndexMostrando + 1);
			});
	}

	crearBotonAnterior() {
		this.add.image(this.cameras.main.centerX - (this.fondoImagen.displayWidth / 2), this.cameras.main.centerY, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				// this.cambiarImagen(this.imagenIndexMostrando - 1);
			});
	}

	cambiarImagen(index: number) {
		// let nuevoIndex = index;
		// if (this.imagenIndexMostrando === nuevoIndex) {
		// 	return;
		// }

		// UtilSonido.reproducirSonidoEfecto(this, Sonidos.ApretarBoton);
		// if (nuevoIndex > this.imagenesAyuda.length - 1) {
		// 	nuevoIndex = 0;
		// }

		// if (nuevoIndex < 0) {
		// 	nuevoIndex = this.imagenesAyuda.length - 1;
		// }

		// // const moverIzquierda = this.imagenIndexMostrando < nuevoIndex;
		// this.imagenIndexMostrando = nuevoIndex;
		// // for (const iterator of this.carruselCirculosSeleccionado) {
		// // 	iterator.visible = false;
		// // }
		// // this.carruselCirculosSeleccionado[nuevoIndex].visible = true;

		// this.tweens.add({
		// 	targets: this.fotoActualAyuda,
		// 	duration: 500,
		// 	alpha: 0.1,
		// 	// x: moverIzquierda ? -1000 : 1500,
		// 	onStart: () => {
		// 		// this.bola.y = !incrementar ? 200 : 400;
		// 	},
		// 	onComplete: () => {
		// 		this.fotoActualAyuda.setTexture(this.imagenesAyuda[nuevoIndex]);
		// 		this.tweens.add({
		// 			targets: this.fotoActualAyuda,
		// 			duration: 500,
		// 			alpha: 1,
		// 			// x: this.cameras.main.centerX,
		// 			onStart: () => {
		// 				// this.fotoActualAyuda.x = moverIzquierda ? 1500 : -1000;
		// 				this.fotoActualAyuda.alpha = 0.1;
		// 			},
		// 			onComplete: () => {
		// 				//
		// 			}
		// 		});
		// 	}
		// });
	}

}