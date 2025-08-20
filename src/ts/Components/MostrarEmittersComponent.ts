import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, Imagenes, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IConfiguracionEmitter, IDestroyable } from "../Utilidades/Interfaces";
import { UtilImagenes } from "../Utilidades/UtilImagenes";
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
		let posY = 150;
		for (const [index, element] of listaEmitters.entries()) {
			const imagen = this.escena.add.image(0, 10, element.texture, element.frame[0])
				.setOrigin(0)
				.setDisplaySize(50, 50)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						if (!this.bloquearCierre) {
							texto.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.seleccionarImagenEmitter(index, element.frame.length > 0 ? element.frame : [element.texture], element.frameCycle);
						}
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
			const texto = this.escena.add.text(50, 20, `Emitter ${index + 1}`, { fontFamily: 'monospace', fontSize: '28px' })
				.setOrigin(0)
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
			const posX = 170 //texto.x + texto.displayWidth;
			const imagenBorrar = this.escena.add.image(posX + 45, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
					.setOrigin(0)
					.setScale(0.55)
					.setVisible(listaEmitters.length > 1)
					// .setDisplaySize(60, 60)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						imagenBorrar.clearTint();
						if (listaEmitters.length > 1 && !this.bloquearCierre) {
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

			const imagenClonar = this.escena.add.image(posX + 90, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Clonar)
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

			const imagenExportar = this.escena.add.image(posX + 45, 45, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
					.setOrigin(0)
					.setScale(0.55)
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
			const imagenConfiguraciones = this.escena.add.image(posX + 90, 45, AtlasImagenes.Botones, AtlasBotonesImagenes.Configuracion)
					.setOrigin(0)
					.setScale(0.55)
					// .setDisplaySize(60, 60)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						if (!this.bloquearCierre) {
							imagenConfiguraciones.clearTint();
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.botonToggleEmitters.destroy();
							this.botonNuevoEmitter.destroy();
							this.background.destroy();
							this.botonAtras.destroy();
							this.listaEmitterContainer.forEach(x => x.destroy());
							this.listaEmitterContainer = [];
							this.escena.registry.events.emit(Eventos.EmitterDetallesVerMenu, index);
						}
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
			const graphics = this.escena.add.graphics().setDepth(-1);
			graphics.lineStyle(4, 0x000000, 1);
			graphics.strokeLineShape(new Phaser.Geom.Line(0, imagenConfiguraciones.y + imagenConfiguraciones.displayHeight + 5, 400, imagenConfiguraciones.y + imagenConfiguraciones.displayHeight + 5));
			// graphics.fillStyle(0xffffff, 1);
			// graphics.fillRoundedRect(0, 0, 300, 100, 32);
			// graphics.strokeRectShape(imagen.getBounds());
			if (emitterSleccionado === index) {
				graphics.lineStyle(4, 0x00ff00, 1);
				graphics.strokeLineShape(new Phaser.Geom.Line(texto.x, texto.y + texto.displayHeight, texto.x + texto.displayWidth, texto.y + texto.displayHeight));
				// graphics.strokeRectShape(new Phaser.Geom.Rectangle(texto.x, texto.y, texto.x + texto.displayWidth, texto.y));
			}

			const container = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, posY, [imagen, texto, imagenBorrar, imagenClonar, imagenExportar, graphics, imagenConfiguraciones])
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.listaEmitterContainer.push(container);
			posY += 95;
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
				misImagenesBoton.destroy();
				misImagenesTexto.destroy();
				misImagenesArea.destroy();
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
		let posY = background.y - background.displayHeight / 2 + 40;

		for(const frame of Object.values(AtlasParticulas)) {
			const estaSeleccionado = listaFramesActuales.includes(frame);
			const borde = this.escena.add.graphics().setDepth(ManejarDepthMainGame.profundidad3);
			borde.lineStyle(8, 0x00ff00);
			borde.strokeRect(posx, posY, 75, 75);
			borde.setVisible(estaSeleccionado);
			// imagen.setData('borde', borde);

			const imagen = this.escena.add.image(posx, posY, AtlasImagenes.Particulas, frame)
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
				posY += 80;
			}
			listaImagenes.push(imagen);
			listaGraphics.push(borde);
		}

		posY += 80;
		const cycleTexto = this.escena.add.text(this.escena.cameras.main.centerX - 70, posY + 15, 'Cycle', { fontFamily: "Inter-Black", fontSize: 48, fontStyle: 'bold', color: '#000000', align: 'center' })
			.setDepth(ManejarDepthMainGame.profundidad3);
		const cycleSwitch = this.escena.rexUI.add.toggleSwitch(this.escena.cameras.main.centerX - 150, posY, 80, 80, 0x039be5)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setValue(cycleActual)
					.on('valuechange', (newValue) => {

					});

		const existenImagenes = UtilImagenes.obtenerListado().length > 0;
		const misImagenesTexto = this.escena.add.text(0, 0, 'Mis Imagenes', { fontFamily: "Inter-Black", fontSize: 36, fontStyle: 'bold', color: '#758199', align: 'center'  })
			.setOrigin(0, 0)
			.setVisible(existenImagenes)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const misImagenesBoton = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setVisible(existenImagenes)
			.setDepth(ManejarDepthMainGame.profundidad3);
		misImagenesTexto.setPosition(background.x + (background.displayWidth / 2) - misImagenesTexto.displayWidth - misImagenesBoton.displayWidth - 10, posY + 25);
		misImagenesBoton.setPosition(background.x + (background.displayWidth / 2) - misImagenesBoton.displayWidth - 10, posY + 5);
		const misImagenesArea = this.escena.add.zone(misImagenesTexto.x, posY, misImagenesTexto.displayWidth + misImagenesBoton.displayWidth + 10, misImagenesBoton.displayHeight)
							.setOrigin(0)
							.setVisible(existenImagenes)
							.setInteractive({ useHandCursor: true })
							.on(Phaser.Input.Events.POINTER_UP, () => {
								misImagenesBoton.clearTint();
								misImagenesTexto.clearTint();
								UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
								this.escena.input.resetCursor();
								UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
								listaImagenes.forEach(x => x.destroy());
								listaGraphics.forEach(x => x.destroy());
								background.destroy();
								botonAceptar.destroy();
								botonAceptarTexto.destroy();
								cycleSwitch.destroy();
								cycleTexto.destroy();
								misImagenesBoton.destroy();
								misImagenesTexto.destroy();
								misImagenesArea.destroy();
								botonCerrar.destroy();
								this.seleccionarImagenUsuarioEmitter(index, listaFramesActuales, cycleActual);
							})
							.on(Phaser.Input.Events.POINTER_MOVE, () => {
								misImagenesBoton.setTint(0xb4caaf);
								misImagenesTexto.setColor('#282c34');
							})
							.on(Phaser.Input.Events.POINTER_OUT, () => {
								misImagenesBoton.clearTint();
								misImagenesTexto.setColor('#758199');
							});

		const botonAceptar = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
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
						this.escena.registry.events.emit(Eventos.EmitterCambiarImagen, index, listaFramesSeleccionados, cycleSwitch.value, 'Sistema');
						cycleSwitch.destroy();
						cycleTexto.destroy();
						misImagenesBoton.destroy();
						misImagenesTexto.destroy();
						misImagenesArea.destroy();
						this.bloquearCierre = false;
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		botonAceptar.setPosition(this.escena.cameras.main.centerX, background.y + (background.displayHeight / 2) + (botonAceptar.displayHeight / 2) + 10);
		const botonAceptarTexto = this.escena.add.text(0, 0, 'Aceptar', {
				fontFamily: "Inter-Black", fontSize: 64, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setDepth(ManejarDepthMainGame.profundidad3);
		Phaser.Display.Align.In.Center(botonAceptarTexto, botonAceptar);
	}

	private seleccionarImagenUsuarioEmitter(index: number, listaFramesActuales: string[], cycleActual: boolean) {
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
				imagenesBoton.destroy();
				imagenesTexto.destroy();
				imagenesArea.destroy();
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
		let posY = background.y - background.displayHeight / 2 + 40;
		const listaImagenesUsuario = UtilImagenes.obtenerListadoCompleto();
		for(const imagenUsuario of listaImagenesUsuario) {
			const estaSeleccionado = listaFramesActuales.includes(imagenUsuario.nombre);
			const borde = this.escena.add.graphics().setDepth(ManejarDepthMainGame.profundidad3);
			borde.lineStyle(8, 0x00ff00);
			borde.strokeRect(posx, posY, 75, 75);
			borde.setVisible(estaSeleccionado);
			const imagen = this.escena.add.image(posx, posY, imagenUsuario.nombre)
				.setOrigin(0)
				.setDisplaySize(75, 75)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.setData('seleccionada', estaSeleccionado)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					imagen.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					const seleccionada = imagen.getData('seleccionada');
					for (const img of listaImagenes) {
						img.setData('seleccionada', false);
					}
					for (const borde of listaGraphics) {
						borde.setVisible(false);
					}
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
				posY += 80;
			}
			listaImagenes.push(imagen);
			listaGraphics.push(borde);
		}


		const imagenesTexto = this.escena.add.text(0, 0, 'Imagenes', { fontFamily: "Inter-Black", fontSize: 36, fontStyle: 'bold', color: '#758199', align: 'center'  })
			.setOrigin(0, 0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const imagenesBoton = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const auxPosY = background.y + (background.displayHeight / 2) - imagenesBoton.displayHeight - 10;
		imagenesTexto.setPosition(background.x - (background.displayWidth / 2) + imagenesBoton.displayWidth + 10, auxPosY + 20);
		imagenesBoton.setPosition(background.x - (background.displayWidth / 2) + 10, auxPosY);
		const imagenesArea = this.escena.add.zone(imagenesBoton.x, auxPosY, imagenesTexto.displayWidth + imagenesBoton.displayWidth + 10, imagenesBoton.displayHeight)
							.setOrigin(0)
							.setInteractive({ useHandCursor: true })
							.on(Phaser.Input.Events.POINTER_UP, () => {
								imagenesBoton.clearTint();
								imagenesTexto.clearTint();
								UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
								this.escena.input.resetCursor();
								UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
								listaImagenes.forEach(x => x.destroy());
								listaGraphics.forEach(x => x.destroy());
								background.destroy();
								botonAceptar.destroy();
								botonAceptarTexto.destroy();
								imagenesBoton.destroy();
								imagenesTexto.destroy();
								imagenesArea.destroy();
								botonCerrar.destroy();
								this.seleccionarImagenEmitter(index, listaFramesActuales, cycleActual);
							})
							.on(Phaser.Input.Events.POINTER_MOVE, () => {
								imagenesBoton.setTint(0xb4caaf);
								imagenesTexto.setColor('#282c34');
							})
							.on(Phaser.Input.Events.POINTER_OUT, () => {
								imagenesBoton.clearTint();
								imagenesTexto.setColor('#758199');
							});

		const botonAceptar = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					const framesSeleccionado = listaImagenes.find(x => x.getData('seleccionada'))?.texture.key;
					if (framesSeleccionado) {
						botonAceptar.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						listaImagenes.forEach(x => x.destroy());
						listaGraphics.forEach(x => x.destroy());
						background.destroy();
						botonAceptar.destroy();
						botonAceptarTexto.destroy();
						botonCerrar.destroy();
						this.escena.registry.events.emit(Eventos.EmitterCambiarImagen, index, [framesSeleccionado], false, 'Usuario');
						imagenesBoton.destroy();
						imagenesTexto.destroy();
						imagenesArea.destroy();
						this.bloquearCierre = false;
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		botonAceptar.setPosition(this.escena.cameras.main.centerX, background.y + (background.displayHeight / 2) + (botonAceptar.displayHeight / 2) + 10);
		const botonAceptarTexto = this.escena.add.text(0, 0, 'Aceptar', {
				fontFamily: "Inter-Black", fontSize: 64, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setDepth(ManejarDepthMainGame.profundidad3);
		Phaser.Display.Align.In.Center(botonAceptarTexto, botonAceptar);
	}
}