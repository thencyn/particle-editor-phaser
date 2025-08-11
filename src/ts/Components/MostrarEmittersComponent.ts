import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, Imagenes, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IConfiguracionEmitter, IDestroyable } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";

export class MostrarEmittersComponent implements IDestroyable {
	private botonToggleEmitters: Phaser.GameObjects.Image;
	private botonNuevoEmitter: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private listaEmitterContainer: Phaser.GameObjects.Container[];
	private bloquearCierre: boolean = false;
	constructor(private escena: Phaser.Scene) {

	}

	private crearBotonToggleMenu() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleEmitters = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.bloquearCierre) {
					this.botonToggleEmitters.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.hide();
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleEmitters.setPosition(this.escena.cameras.main.width - this.botonToggleEmitters.displayWidth - 320, this.escena.cameras.main.centerY);
	}

	private crearBotonAtras() {
		this.botonAtras = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.bloquearCierre) {
					this.botonAtras.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.destroy();
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonAtras.setPosition(this.escena.cameras.main.width - 300, 25);
	}

	public show(listaEmitters: IConfiguracionEmitter[], emitterSleccionado: number) {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.botonNuevoEmitter = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 25, AtlasImagenes.Botones, listaEmitters.length < 10 ? AtlasBotonesImagenes.SeleccionCircularMas : AtlasBotonesImagenes.SeleccionCircularMasDisable)
				.setOrigin(0)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonNuevoEmitter.clearTint();
					if (listaEmitters.length < 10) {
						this.escena.registry.events.emit(Eventos.EmitterCrear);
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		this.mostrarEmitters(listaEmitters, emitterSleccionado);
	}

	public actualizarEmitters(listaEmitters: IConfiguracionEmitter[], emitterSleccionado: number) {
		this.listaEmitterContainer.forEach(x => x.destroy());
		this.mostrarEmitters(listaEmitters, emitterSleccionado);
	}

	private hide() {
		this.botonToggleEmitters.removeInteractive();
		const listaDestinos = [this.botonToggleEmitters.x + 320, this.background.x + 300, this.botonNuevoEmitter.x + 300, this.botonAtras.x + 300, ...this.listaEmitterContainer.map(x => x.x + 300)];
		this.escena.add.tween({
			targets: [this.botonToggleEmitters, this.background, this.botonNuevoEmitter, this.botonAtras, ...this.listaEmitterContainer],
			// x: this.botonToggleEmitters.x + 320,
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleEmitters.destroy();
				this.botonNuevoEmitter.destroy();
				this.background.destroy();
				this.botonAtras.destroy();
				this.listaEmitterContainer.forEach(x => x.destroy());
				this.listaEmitterContainer = [];
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleEmitters.destroy();
		this.botonNuevoEmitter.destroy();
		this.background.destroy();
		this.botonAtras.destroy();
		this.listaEmitterContainer.forEach(x => x.destroy());
		this.listaEmitterContainer = [];
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}

	private mostrarEmitters(listaEmitters: IConfiguracionEmitter[], emitterSleccionado: number) {
		this.listaEmitterContainer = [];
		const posX = this.escena.cameras.main.displayWidth - 300;
		let posY = 150;
		for (const [index, element] of listaEmitters.entries()) {
			const imagen = this.escena.add.image(0, 0, element.texture, element.frame[0])
				.setOrigin(0)
				.setDisplaySize(50, 50)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						texto.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.seleccionarImagenEmitter(index, element.frame, element.frameCycle);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
			const texto = this.escena.add.text(55, 15, `Emitter ${index + 1}`, { fontFamily: 'monospace', fontSize: '22px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						texto.clearTint();
						if (index !== emitterSleccionado) {
							this.escena.registry.events.emit(Eventos.EmitterSeleccionar, index);
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						}
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
			// Phaser.Display.Align.To.RightCenter(texto, imagen, 0, 15);

			const imagenBorrar = this.escena.add.image(texto.x + texto.displayWidth + 5, 10, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
					.setOrigin(0)
					.setScale(0.55)
					.setVisible(listaEmitters.length > 1)
					// .setDisplaySize(60, 60)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						imagenBorrar.clearTint();
						if (listaEmitters.length > 1) {
							this.escena.registry.events.emit(Eventos.EmitterEliminar, index);
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						}
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});

			const imagenClonar = this.escena.add.image(texto.x + texto.displayWidth + 50, 10, AtlasImagenes.Botones, AtlasBotonesImagenes.Clonar)
					.setOrigin(0)
					.setScale(0.55)
					.setVisible(listaEmitters.length < 10)
					// .setDisplaySize(60, 60)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						imagenBorrar.clearTint();
						this.escena.registry.events.emit(Eventos.EmitterClonar, index);
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});

			const imagenExportar = this.escena.add.image(texto.x + texto.displayWidth + 95, 10, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
					.setOrigin(0)
					.setScale(0.55)
					.setVisible(listaEmitters.length < 10)
					// .setDisplaySize(60, 60)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						imagenExportar.clearTint();
						this.escena.registry.events.emit(Eventos.Exportar, 'emitter', index);
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});

			const graphics = this.escena.add.graphics().setDepth(-1);
			graphics.lineStyle(4, 0x000000, 1);
			graphics.strokeLineShape(new Phaser.Geom.Line(0, 75, 400, 75));
			// graphics.fillStyle(0xffffff, 1);
			// graphics.fillRoundedRect(0, 0, 300, 100, 32);
			// graphics.strokeRectShape(imagen.getBounds());
			if (emitterSleccionado === index) {
				graphics.lineStyle(4, 0x00ff00, 1);
				graphics.strokeLineShape(new Phaser.Geom.Line(texto.x, texto.y + texto.displayHeight, texto.x + texto.displayWidth, texto.y + texto.displayHeight));
				// graphics.strokeRectShape(new Phaser.Geom.Rectangle(texto.x, texto.y, texto.x + texto.displayWidth, texto.y));
			}

			const container = this.escena.add.container(posX, posY, [imagen, texto, imagenBorrar, imagenClonar, imagenExportar, graphics])
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.listaEmitterContainer.push(container);

			posY += 75;
		}
	}

	private seleccionarImagenEmitter(index: number, listaFramesActuales: string[], cycleActual: boolean) {
		this.bloquearCierre = true;

		const background = this.escena.add.image(this.escena.cameras.main.centerX, this.escena.cameras.main.centerY, Imagenes.BackgroundModal)
			.setDisplaySize(1050, 775)
			.setDepth(ManejarDepthMainGame.profundidad2);
		const botonCerrar = this.escena.add.image(background.x + background.displayWidth / 2, background.y - background.displayHeight / 2, AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				botonCerrar.clearTint();
				this.bloquearCierre = false;
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				listaImagenes.forEach(x => x.destroy());
				listaGraphics.forEach(x => x.destroy());
				background.destroy();
				botonAceptar.destroy();
				botonAceptarTexto.destroy();
				cycleSwitch.destroy();
				cycleTexto.destroy();
				botonCerrar.destroy();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const listaImagenes: Phaser.GameObjects.Image[] = [];
		const listaGraphics: Phaser.GameObjects.Graphics[] = [];
		let posx = background.x - background.displayWidth / 2 + 50;
		let posy = background.y - background.displayHeight / 2 + 40;

		for(const frame of Object.values(AtlasParticulas)) {
			const estaSeleccionado = listaFramesActuales.includes(frame);
			const borde = this.escena.add.graphics().setDepth(ManejarDepthMainGame.profundidad3);
			borde.lineStyle(8, 0x00ff00);
			borde.strokeRect(posx, posy, 75, 75);
			borde.setVisible(estaSeleccionado);
			// imagen.setData('borde', borde);

			const imagen = this.escena.add.image(posx, posy, AtlasImagenes.Particulas, frame)
				.setOrigin(0)
				.setDisplaySize(75, 75)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.setData('seleccionada', estaSeleccionado)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					imagen.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					const seleccionada = imagen.getData('seleccionada');
					imagen.setData('seleccionada', !seleccionada);
					borde.setVisible(!seleccionada);
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});


			posx += 80;
			if (posx > background.x + background.displayWidth / 2 - 90) {
				posx = background.x - background.displayWidth / 2 + 50;
				posy += 80;
			}
			listaImagenes.push(imagen);
			listaGraphics.push(borde);
		}

		posy += 80;
		const cycleTexto = this.escena.add.text(this.escena.cameras.main.centerX - 70, posy + 15, 'Cycle', {
				fontFamily: "Inter-Black", fontSize: 48, fontStyle: 'bold', color: '#000000', align: 'center'
			})
			.setDepth(ManejarDepthMainGame.profundidad3);
		const cycleSwitch = this.escena.rexUI.add.toggleSwitch(this.escena.cameras.main.centerX - 150, posy, 80, 80, 0x039be5)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setValue(cycleActual)
					.on('valuechange', (newValue) => {

					});

		posy += 150;
		const botonAceptar = this.escena.add.image(this.escena.cameras.main.centerX, posy, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					const listaFramesSeleccionados = listaImagenes.filter(x => x.getData('seleccionada')).map(x => x.frame.name);
					if (listaFramesSeleccionados.length > 0) {
						botonAceptar.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						listaImagenes.forEach(x => x.destroy());
						listaGraphics.forEach(x => x.destroy());
						background.destroy();
						botonAceptar.destroy();
						botonAceptarTexto.destroy();
						botonCerrar.destroy();
						this.escena.registry.events.emit(Eventos.EmitterCambiarImagen, index, listaFramesSeleccionados, cycleSwitch.value);
						cycleSwitch.destroy();
						cycleTexto.destroy();
						this.bloquearCierre = false;
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		const botonAceptarTexto = this.escena.add.text(0, 0, 'Aceptar', {
				fontFamily: "Inter-Black", fontSize: 64, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setDepth(ManejarDepthMainGame.profundidad3);
		Phaser.Display.Align.In.Center(botonAceptarTexto, botonAceptar);
	}
}