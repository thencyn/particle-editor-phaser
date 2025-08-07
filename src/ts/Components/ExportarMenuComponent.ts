import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";

export class ExportarMenuComponent implements IDestroyable {
	private botonToggleGuardar: Phaser.GameObjects.Image;
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

		this.botonToggleGuardar = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonToggleGuardar.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.hide();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleGuardar.setPosition(this.escena.cameras.main.width - this.botonToggleGuardar.displayWidth - 320, this.escena.cameras.main.centerY);
		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 220, 40, 'Exportar', { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
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

	public show(indexSeleccionado: number) {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.crearBotones(indexSeleccionado);

	}

	private crearBotones(indexSeleccionado: number) {
			let posY = 0;
			const botonExportarProyecto = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
				.setOrigin(0);
			const botonExportarProyectoTexto = this.escena.add.text(0, 0, 'Proyecto', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonExportarProyectoTexto, botonExportarProyecto, 10);
			const botonExportarProyectoArea = this.escena.add.zone(0, posY, 225, botonExportarProyecto.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonExportarProyecto.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.escena.registry.events.emit(Eventos.Exportar, 'proyecto');
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});

			posY += botonExportarProyecto.displayHeight + 25;
			const botonExportarProyectoJS = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
				.setOrigin(0);
			const botonExportarProyectoJSTexto = this.escena.add.text(0, 0, 'Proyecto JS', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonExportarProyectoJSTexto, botonExportarProyectoJS, 10);
			const botonExportarProyectoJSArea = this.escena.add.zone(0, posY, 225, botonExportarProyectoJS.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonExportarProyectoJS.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.escena.registry.events.emit(Eventos.Exportar, 'proyectojs');
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});


			posY += botonExportarProyectoJS.displayHeight + 75;
			const botonExportarEmittersClipboard = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
				.setOrigin(0);
			const botonExportarEmittersClipboardTexto = this.escena.add.text(0, 0, 'Emitters\nClipboard', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonExportarEmittersClipboardTexto, botonExportarEmittersClipboard, 10);
			const botonExportarEmittersClipboardArea = this.escena.add.zone(0, posY, 225, botonExportarEmittersClipboard.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonExportarEmittersClipboard.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.escena.registry.events.emit(Eventos.Exportar, 'emitters');
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});

			posY += botonExportarEmittersClipboard.displayHeight + 25;
			const botonExportarEmitterSeleccionado = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
				.setOrigin(0);
			const botonExportarEmitterSeleccionadoTexto = this.escena.add.text(0, 0, `Emitter ${indexSeleccionado + 1}\nClipboard`, { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
				.setOrigin(0, 0);
			Phaser.Display.Align.To.RightCenter(botonExportarEmitterSeleccionadoTexto, botonExportarEmitterSeleccionado, 10);
			const botonExportarEmitterSeleccionadoArea = this.escena.add.zone(0, posY, 225, botonExportarEmitterSeleccionado.displayHeight)
						.setOrigin(0)
						.setInteractive({ useHandCursor: true })
						.on(Phaser.Input.Events.POINTER_UP, () => {
							botonExportarEmitterSeleccionado.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.escena.registry.events.emit(Eventos.Exportar, 'emitter');
						})
						.on(Phaser.Input.Events.POINTER_MOVE, () => {

						})
						.on(Phaser.Input.Events.POINTER_OUT, () => {

						});

			this.containerOpciones = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, 200)
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.containerOpciones.add([
									botonExportarProyecto, botonExportarProyectoTexto, botonExportarProyectoArea,
									botonExportarProyectoJS, botonExportarProyectoJSTexto, botonExportarProyectoJSArea,
									botonExportarEmittersClipboard, botonExportarEmittersClipboardTexto, botonExportarEmittersClipboardArea,
									botonExportarEmitterSeleccionado, botonExportarEmitterSeleccionadoTexto, botonExportarEmitterSeleccionadoArea,
								]);
		}

	private hide() {
		this.botonToggleGuardar.removeInteractive();
		const listaDestinos = [this.botonToggleGuardar.x + 320, this.botonAtras.x + 300, this.background.x + 300, this.titulo.x + 300, this.containerOpciones.x + 300];
		this.escena.add.tween({
			targets: [this.botonToggleGuardar, this.botonAtras, this.background, this.titulo, this.containerOpciones],
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleGuardar.destroy();
				this.botonAtras.destroy();
				this.background.destroy();
				this.titulo.destroy();
				this.containerOpciones.destroy();
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleGuardar.destroy();
		this.botonAtras.destroy();
		this.background.destroy();
		this.titulo.destroy();
		this.containerOpciones.destroy();
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}
}