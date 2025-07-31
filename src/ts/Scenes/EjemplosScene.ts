import { AtlasBotonesImagenes, AtlasImagenes, Eventos, Imagenes, ManejarDepthMainGame, Sonidos } from "../Utilidades/Diccionario";
import { UtilEjemplos } from "../Utilidades/UtilEjemplos";
import { UtilSonido } from "../Utilidades/UtilSonido";
import PrincipalScene from "./PrincipalScene";

export default class EjemplosScene extends Phaser.Scene {
	public static Name = "EjemplosScene";
	private background: Phaser.GameObjects.Image;
	private botonCerrar: Phaser.GameObjects.Image;

	public init() {}

	public preload() {
		// const listaEjemplos = UtilEjemplos.obtenerListadoEjemplosGuardados();
		// for(const value of listaEjemplos) {
		// 	this.load.image(value.aliasImagenPreview, value.urlImagenPreview);
        // }
	}

	public create() {
		this.background = this.add.image(100, 100, Imagenes.BackgroundModal)
					.setOrigin(0)
					.setDisplaySize(1800, 950)
					.setDepth(ManejarDepthMainGame.profundidad1);
		this.botonCerrar = this.add.image(this.background.x + this.background.displayWidth, this.background.y, AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonCerrar.clearTint();
						UtilSonido.reproducirSonidoEfecto(this, Sonidos.Menu);
						this.background.destroy();
						this.botonCerrar.destroy();
						// this.limpiarImagenesMemoria();
						this.scene.resume(PrincipalScene.Name);
						this.scene.stop(EjemplosScene.Name);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
		this.crearGrillaEjemplos();
	}

	private crearGrillaEjemplos() {
		const listaEjemplos = UtilEjemplos.obtenerListadoEjemplosGuardados();
		// const grillaEjemplos = this.add.grid(100, 100, 1800, 900, 300, 300, 0x000000, 0, 0xff0000, 0.5)
		// 	.setOrigin(0)
		// 	.setDepth(ManejarDepthMainGame.profundidad2);
		// const graphics = this.add.graphics()
		// 		.setDepth(ManejarDepthMainGame.profundidad2)
		// 		.lineStyle(6, 0xf8e59d, 1)
		// 		.fillStyle(0x000000, 0.5);
		let posX = 110;
		let posY = 110;
		// const container = this.add.container(posX, posY, graphics)
		// 		.setDepth(ManejarDepthMainGame.profundidad3);
		for (const [index, element] of listaEjemplos.entries()) {
			const ejemploImagen = this.add.image(10, 10, element.aliasImagenPreview)
				.setOrigin(0)
				.setDisplaySize(220, 160);
			const ejemploURL = this.add.image(10, 10, AtlasImagenes.Botones, AtlasBotonesImagenes.Home)
				.setScale(0.5)
				.setOrigin(0)
				.setVisible(!!element.urlEjemploOriginal)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, async () => {
							UtilSonido.reproducirSonidoEfecto(this, Sonidos.Menu);
							window.open(element.urlEjemploOriginal, '_blank');
							// if (element.urlEjemploOriginal) {
							// 	window.open(element.urlEjemploOriginal, '_blank');
							// } else {
							// 	this.registry.events.emit(Eventos.MenuAbrirAyuda, element.nombreEjemplo);
							// }
						})
				.on(Phaser.Input.Events.POINTER_MOVE, () => {

				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {

				});
			const nombreEjemplo = this.add.text(10, 170, element.nombreEjemplo, { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#000', fontStyle: 'bold' })
				.setOrigin(0);
			const area = this.add.zone(0, 0, 240, 220)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, async () => {
							UtilSonido.reproducirSonidoEfecto(this, Sonidos.Menu);
							const ejemploJson = await UtilEjemplos.obtenerJsonEjemploPorURL(element.url);
							this.registry.events.emit(Eventos.AbrirNuevoEjemplo, ejemploJson);
							// this.limpiarImagenesMemoria();
							this.scene.resume(PrincipalScene.Name);
							this.scene.stop(EjemplosScene.Name);
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});
			const graphics = this.add.graphics()
				.setDepth(ManejarDepthMainGame.profundidad2)
				.lineStyle(6, 0xf8e59d, 1)
				.fillStyle(0x000000, 0.5);
			graphics.strokeRectShape(area.getBounds());
			// container.add([nombreEjemplo, area, ejemploImagen]);
			const container = this.add.container(posX, posY, [nombreEjemplo, area, ejemploImagen, ejemploURL, graphics])
				.setDepth(ManejarDepthMainGame.profundidad3);
			posX += 250;
			if ((index + 1) % 7 === 0) {
				posX = 110;
				posY += 230;

			}
		}
	}

	// private limpiarImagenesMemoria() {
	// 	const listaEjemplos = UtilEjemplos.obtenerListadoEjemplosGuardados();
	// 	for (const element of listaEjemplos) {
	// 		this.textures.remove(element.aliasImagenPreview);
	// 	}
	// }

}