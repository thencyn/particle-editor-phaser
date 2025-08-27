import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";

export class MenuImagenesComponent implements IDestroyable {
	private botonToggleImagenes: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private titulo: Phaser.GameObjects.Text;
	private containerOpciones: Phaser.GameObjects.Container;

	constructor(private escena: Phaser.Scene) {	}

	private crearBotonToggleMenu() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleImagenes = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonToggleImagenes.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.hide();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleImagenes.setPosition(this.escena.cameras.main.width - this.botonToggleImagenes.displayWidth - 320, this.escena.cameras.main.centerY);
		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 220, 40, 'Imágenes', { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
	}

	private crearBotonAtras() {
		this.botonAtras = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonAtras.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.destroy();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonAtras.setPosition(this.escena.cameras.main.width - 300, 25);
	}

	public show() {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.crearBotones();

	}

	private crearBotones() {
			let posY = 0;
			const botonImagenesEmitter = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Imagenes)
				.setOrigin(0);
			const botonImagenesEmitterTexto = this.escena.add.text(0, 0, 'Emitter', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonImagenesEmitterTexto, botonImagenesEmitter, 10);
			const botonImagenesEmitterArea = this.escena.add.zone(0, posY, 225, botonImagenesEmitter.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonImagenesEmitter.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.botonToggleImagenes.destroy();
							this.botonAtras.destroy();
							this.background.destroy();
							this.titulo.destroy();
							this.containerOpciones.destroy();
							this.escena.registry.events.emit(Eventos.ImagenesEmitterAbrir);
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});

			posY += botonImagenesEmitter.displayHeight + 25;
			const botonImagenesBackground = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Imagenes)
				.setOrigin(0);
			const botonImagenesBackgroundTexto = this.escena.add.text(0, 0, 'BackGround', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonImagenesBackgroundTexto, botonImagenesBackground, 10);
			const botonImagenesBackgroundArea = this.escena.add.zone(0, posY, 225, botonImagenesBackground.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonImagenesBackground.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.botonToggleImagenes.destroy();
							this.botonAtras.destroy();
							this.background.destroy();
							this.titulo.destroy();
							this.containerOpciones.destroy();
							this.escena.registry.events.emit(Eventos.ImagenesBackGroundAbrir);
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});

			this.containerOpciones = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, 200)
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.containerOpciones.add([
									botonImagenesEmitter, botonImagenesEmitterTexto, botonImagenesEmitterArea,
									botonImagenesBackground, botonImagenesBackgroundTexto, botonImagenesBackgroundArea,
								]);
		}

	private hide() {
		this.botonToggleImagenes.removeInteractive();
		const listaDestinos = [this.botonToggleImagenes.x + 320, this.botonAtras.x + 300, this.background.x + 300, this.titulo.x + 300, this.containerOpciones.x + 300];
		this.escena.add.tween({
			targets: [this.botonToggleImagenes, this.botonAtras, this.background, this.titulo, this.containerOpciones],
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleImagenes.destroy();
				this.botonAtras.destroy();
				this.background.destroy();
				this.titulo.destroy();
				this.containerOpciones.destroy();
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleImagenes.destroy();
		this.botonAtras.destroy();
		this.background.destroy();
		this.titulo.destroy();
		this.containerOpciones.destroy();
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}
}