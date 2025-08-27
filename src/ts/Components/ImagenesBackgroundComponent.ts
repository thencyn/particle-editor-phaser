import { FileChooser } from "phaser3-rex-plugins/plugins/filechooser";
import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable, IImagenBackground } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { UtilImagenes } from "../Utilidades/UtilImagenes";
import InputText from "phaser3-rex-plugins/plugins/inputtext";

export class ImagenesBackgroundComponent implements IDestroyable {
	private botonToggleEmitters: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private sinImagenesTexto: Phaser.GameObjects.Text;
	private titulo: Phaser.GameObjects.Text;
	private botonAgregarImagen: Phaser.GameObjects.Image;
	private listaImagenesContainer: Phaser.GameObjects.Container[];
	private paginaActual: number = 0;
	private botonSiguiente: Phaser.GameObjects.Image;
	private botonAnterior: Phaser.GameObjects.Image;
	private PROYECTOS_POR_PAGINA = 10;
	private mostrandoDetalles: boolean = false;
	private containerDetalles: Phaser.GameObjects.Container;
	private listaImagenesUtilizadas: IImagenBackground[]
	constructor(private escena: Phaser.Scene) {
	}

	private crearObjetos() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleEmitters = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.mostrandoDetalles) {
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

		this.botonAtras = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.mostrandoDetalles) {
					this.botonAtras.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.botonToggleEmitters.destroy();
					this.background.destroy();
					this.botonAtras.destroy();
					this.titulo.destroy();
					this.sinImagenesTexto?.destroy();
					this.botonAgregarImagen.destroy();
					this.botonSiguiente?.destroy();
					this.botonAnterior?.destroy();
					this.listaImagenesContainer?.forEach(x => x.destroy());
					this.listaImagenesContainer = [];
					this.escena.registry.events.emit(Eventos.MenuImagenes);
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonAtras.setPosition(this.escena.cameras.main.width - 300, 25);

		this.botonAgregarImagen = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 25, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMas)
				.setOrigin(0)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (!this.mostrandoDetalles) {
						this.botonAgregarImagen.clearTint();
						// UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.escena.rexFileChooser.open({ accept: '.png' }).then(async (res) => {
							if (res.files.length) {
								const listaImagenes = await UtilImagenes.obtenerListadoIndexDB();
								const file = res.files[0];
								const nombreArchivo = file.name.slice(0, -4).toLowerCase();
								if (listaImagenes.includes(nombreArchivo)) {
									alert('❌ La imagen ya se encuentra ingresada previamente. Renombre el archivo si desea ingresarlo.');
									return;
								} else if (this.escena.textures.getTextureKeys().map(x => x.toLowerCase()).includes(nombreArchivo)) {
									alert('❌ El archivo tiene un nombre no admitido. Si estas actualizando una imágen prueba con actualizar la página.');
									return;
								} else if (Object.values(AtlasParticulas).includes(nombreArchivo)) {
									alert('❌ El archivo tiene un nombre no admitido.');
									return;
								} else if (file.size > 1024 * 1000 * 5) {
									alert('❌ El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.');
									return;
								}
								const reader = new FileReader();
								reader.onload = () => {
									const base64 = reader.result as string;
									UtilImagenes.guardarImagenIndexDB(nombreArchivo, file.size, base64);
									this.escena.textures.addBase64(nombreArchivo, base64).once(Phaser.Textures.Events.ADD, (key) => {
										alert("✔️ imagen guardada correctamente.");
										this.botonSiguiente?.destroy();
										this.botonAnterior?.destroy();
										this.crearPaginacion();
										this.mostrarImagenes();
									});
								};
								reader.readAsDataURL(file);
							}
						});
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 290, 100, `Imágenes Background`, { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
	}

	private async mostrarImagenes() {
		this.listaImagenesContainer?.forEach(x => x.destroy());
		this.listaImagenesContainer = [];
		this.sinImagenesTexto?.destroy();
		const posX = this.escena.cameras.main.displayWidth - 300;
		let posY = 175;
		const listaImagenesFull = await UtilImagenes.obtenerListadoCompletoIndexDB();
		this.botonAnterior?.setVisible(this.paginaActual > 0);
		this.botonSiguiente?.setVisible(this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA < listaImagenesFull.length);
		if (listaImagenesFull.length === 0) {
			this.sinImagenesTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 280, this.escena.cameras.main.centerY - 25, 'No hay imágenes\nguardadas', { fontFamily: 'monospace', fontSize: '28px', align: 'center' })
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3);
			return;
		}

		for (const [index, x] of listaImagenesFull.slice(this.PROYECTOS_POR_PAGINA * this.paginaActual, this.PROYECTOS_POR_PAGINA * (this.paginaActual + 1)).entries()) {
			const eliminarBoton = this.escena.add.image(250, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
				.setOrigin(0)
				.setScale(0.70)
				.setDepth(ManejarDepthMainGame.profundidad4)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, async () => {
					if (!this.mostrandoDetalles) {
						eliminarBoton.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.sinImagenesTexto?.destroy();
						this.botonSiguiente?.destroy();
						this.botonAnterior?.destroy();
						this.listaImagenesContainer.forEach(x => x.destroy());
						this.listaImagenesContainer = [];
						UtilImagenes.eliminarImagenIndexDB(x.nombre);
						// this.escena.textures.remove(x.nombre);
						const cantidadImagenes = (await UtilImagenes.obtenerListadoIndexDB()).length;
						const maxPagina = Math.ceil(cantidadImagenes / this.PROYECTOS_POR_PAGINA) - 1;
						this.paginaActual = this.paginaActual > maxPagina ? maxPagina : this.paginaActual;
						this.crearPaginacion();
						this.mostrarImagenes();
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
			const imagen = this.escena.add.image(0, 0, x.nombre)
				.setOrigin(0)
				.setDisplaySize(60, 60);
			if (this.listaImagenesUtilizadas.map(x => x.key).includes(x.nombre)) {
				imagen.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						if (!this.mostrandoDetalles) {
							UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
							this.escena.registry.events.emit(Eventos.ImagenesBackGroundQuitar, x.nombre);
						}
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {
						imagen.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {
						imagen.clearTint();
					});
			}
			const textoNombre = this.escena.add.text(70, 0, `${x.nombre.slice(0, 12)}${x.nombre.length > 12 ? '...' : ''}`, { fontFamily: 'monospace', fontSize: '24px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3);
			const textoSize = this.escena.add.text(65, 25, `${(x.peso / 1024).toFixed(2)} KB`, { fontFamily: 'monospace', fontSize: '24px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3);
			const botonImagenesBackgroundArea = this.escena.add.zone(70, -5, 155, 55)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.mostrarDetalles(x.nombre);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {
						textoNombre.setTint(0xb4caaf);
						textoSize.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {
						textoNombre.clearTint();
						textoSize.clearTint();
					});
			const textoUtilizada = this.escena.add.text(0, 0, `✔️`, { fontFamily: 'monospace', fontSize: '48px' })
					.setVisible(this.listaImagenesUtilizadas.map(x => x.key).includes(x.nombre))
					.setOrigin(0, 0);
			textoUtilizada.setPosition(imagen.x + (imagen.displayWidth / 2) - (textoUtilizada.displayWidth / 2), imagen.y + (imagen.displayHeight / 2) - (textoUtilizada.displayHeight / 2));
			const graphics = this.escena.add.graphics().setDepth(-1);
			graphics.lineStyle(4, 0x000000, 1);
			graphics.strokeLineShape(new Phaser.Geom.Line(0, 70, 400, 70));
			const container = this.escena.add.container(posX, posY, [textoNombre, textoSize, graphics, eliminarBoton, imagen, botonImagenesBackgroundArea, textoUtilizada])
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.listaImagenesContainer.push(container);
			posY += 75;
		}
	}

	private async crearPaginacion() {
		const cantidadImagenes = (await UtilImagenes.obtenerListadoIndexDB()).length;
		if (!cantidadImagenes) {
			return;
		}
		this.botonSiguiente = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 950, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (!this.mostrandoDetalles) {
						if (this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA >= cantidadImagenes) {
							return;
						}
						this.botonSiguiente.clearTint();
						this.paginaActual++;
						this.mostrarImagenes();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					if (this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA < cantidadImagenes) {
						this.botonSiguiente.setTint(0xb4caaf);
					}
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});

		this.botonAnterior = this.escena.add.image(this.escena.cameras.main.displayWidth - 300, 950, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (!this.mostrandoDetalles) {
						if (this.paginaActual === 0) {
							return;
						}
						this.botonAnterior.clearTint();
						this.paginaActual--;
						this.mostrarImagenes();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					}
				})
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					if (this.paginaActual > 0) {
						this.botonAnterior.setTint(0xb4caaf);
					}
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
	}

	public show(listaImagenesUtilizadas: IImagenBackground[]) {
		this.listaImagenesUtilizadas = listaImagenesUtilizadas;
		this.crearObjetos();
		this.paginaActual = 0;
		this.crearPaginacion();
		this.mostrarImagenes();
	}

	public update(listaImagenesUtilizadas: IImagenBackground[]) {
		this.listaImagenesUtilizadas = listaImagenesUtilizadas;
		this.mostrarImagenes();
	}

	private hide() {
		this.botonToggleEmitters.removeInteractive();
		const listaDestinos = [this.botonToggleEmitters.x + 320, this.background.x + 300, this.botonAtras.x + 300, this.titulo.x + 300, (this.sinImagenesTexto?.x || this.escena.cameras.main.displayWidth) + 300, this.botonAgregarImagen.x + 300,
				this.botonSiguiente?.x + 300, this.botonAnterior?.x + 300, ...this.listaImagenesContainer?.map(x => x.x + 300)];
		this.escena.add.tween({
			targets: [this.botonToggleEmitters, this.background, this.botonAtras, this.titulo, this.sinImagenesTexto, this.botonAgregarImagen, this.botonSiguiente, this.botonAnterior, ...this.listaImagenesContainer],
			// x: this.botonToggleEmitters.x + 320,
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleEmitters.destroy();
				this.background.destroy();
				this.botonAtras.destroy();
				this.titulo.destroy();
				this.sinImagenesTexto?.destroy();
				this.botonAgregarImagen.destroy();
				this.botonSiguiente?.destroy();
				this.botonAnterior?.destroy();
				this.listaImagenesContainer?.forEach(x => x.destroy());
				this.listaImagenesContainer = [];
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleEmitters.destroy();
		this.background.destroy();
		this.botonAtras.destroy();
		this.titulo.destroy();
		this.sinImagenesTexto?.destroy();
		this.botonAgregarImagen.destroy();
		this.botonSiguiente?.destroy();
		this.botonAnterior?.destroy();
		this.listaImagenesContainer?.forEach(x => x.destroy());
		this.listaImagenesContainer = [];
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}

	public get isShowingDetails() {
		return this.mostrandoDetalles;
	}

	public ocultarDetalles() {
		this.mostrandoDetalles = false;
		this.containerDetalles?.destroy();
	}

	private mostrarDetalles(nombreImagen: string) {
		this.mostrandoDetalles = true;
		const detalles = this.listaImagenesUtilizadas.find(x => x.key === nombreImagen);
		this.containerDetalles?.destroy();
		let posY = 0;
		const background = this.escena.add.image(10, posY, TexturasManuales.FondoTransparenteOscuro)
				.setOrigin(0)
				.setDisplaySize(800, 400);
		const cerrar = this.escena.add.image(800, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					cerrar.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					cerrar.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					this.containerDetalles.destroy();
					this.mostrandoDetalles = false;
				});
		posY += 25;
		const titulo = this.escena.add.text(20, posY, `Imagen: ${nombreImagen}`, { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);

		posY += 75;
		const posXTexto = this.escena.add.text(200, posY, `X`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const posXInput = this.escena.add.rexInputText(225, posY - 5, 80, 35, { text: `${detalles?.x || '0'}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (inputText.text !== '-' && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		const posYTexto = this.escena.add.text(450, posY, `Y`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const posYInput = this.escena.add.rexInputText(475, posY - 5, 80, 35, { text: `${detalles?.y || '0'}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (inputText.text !== '-' && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		posY += 50;
		const originXTexto = this.escena.add.text(110, posY, `Origin X`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const originXInput = this.escena.add.rexInputText(225, posY - 5, 80, 35, { text: `${detalles?.originX || '0'}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!inputText.text.startsWith('0.') && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		const originYTexto = this.escena.add.text(360, posY, `Origin Y`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const originYInput = this.escena.add.rexInputText(475, posY - 5, 80, 35, { text: `${detalles?.originY || '0'}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!inputText.text.startsWith('0.') && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		posY += 50;
		const displaySizeTexto = this.escena.add.text(85, posY, `Activar Display Size:`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const displaySizeSwitch = this.escena.rexUI.add.toggleSwitch(displaySizeTexto.displayWidth + 80, posY - 17, 60, 60, 0x039be5)
					.setOrigin(0)
					.setValue(detalles?.activarDisplaySize || false)
					.on('valuechange', (newValue) => { });

		posY += 45;
		const anchoTexto = this.escena.add.text(150, posY, `Ancho`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const anchoInput = this.escena.add.rexInputText(225, posY - 5, 80, 35, { text: `${detalles?.ancho || this.escena.cameras.main.displayWidth}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		const altoTexto = this.escena.add.text(415, posY, `Alto`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const altoInput = this.escena.add.rexInputText(475, posY - 5, 80, 35, { text: `${detalles?.alto || this.escena.cameras.main.displayHeight}`, fontSize: '20px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		posY += 35;
		const validacion = this.escena.add.text(25, posY, '', { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		posY += 35;
		const botonAceptar = this.escena.add.image(285, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setOrigin(0, 0)
				.setDisplaySize(200, 60)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					botonAceptar.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					botonAceptar.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					if (posXTexto.text === '' || posXTexto.text === '-') {
						validacion.setText('❌ Posición X inválida.');
						return;
					}
					if (posYTexto.text === '' || posYTexto.text === '-') {
						validacion.setText('❌ Posición Y inválida.');
						return;
					}
					if (originXInput.text === '' || !['0', '0.5', '1'].includes(originXInput.text)) {
						validacion.setText('❌ Origin X inválido (0, 0.5, 1).');
						return;
					}
					if (originYInput.text === '' || !['0', '0.5', '1'].includes(originYInput.text)) {
						validacion.setText('❌ Origin Y inválido (0, 0.5, 1).');
						return;
					}
					if (displaySizeSwitch.value) {
						if (!anchoInput.text || Number(anchoInput.text) <= 0) {
							validacion.setText('❌ Ancho inválido.');
							return;
						}
						if (!altoInput.text || Number(altoInput.text) <= 0) {
							validacion.setText('❌ Alto inválido.');
							return;
						}
					}
					validacion.setText('✔️ Validación exitosa.');
					const datos: IImagenBackground = {
						key: nombreImagen,
						x: Number(posXInput.text),
						y: Number(posYInput.text),
						originX: Number(originXInput.text),
						originY: Number(originYInput.text),
						activarDisplaySize: displaySizeSwitch.value,
						ancho: anchoInput.text ? +anchoInput.text : null,
						alto: altoInput.text ? +altoInput.text : null,
					};
					this.escena.registry.events.emit(Eventos.ImagenesBackGroundEstablecer, datos);
				});
		const botonAceptaTexto = this.escena.add.text(0, 0, `Aceptar`, { fontFamily: 'monospace', fontSize: '36px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		botonAceptaTexto.setPosition(botonAceptar.x + (botonAceptar.displayWidth / 2) - (botonAceptaTexto.displayWidth / 2), botonAceptar.y + (botonAceptar.displayHeight / 2) - (botonAceptaTexto.displayHeight / 2));
		// Phaser.Display.Align.In.Center(botonAceptaTexto, botonAceptar);

		this.containerDetalles = this.escena.add.container(this.escena.cameras.main.centerX - 400, this.escena.cameras.main.centerY - 300, [background, cerrar, titulo,
			posXTexto, posXInput, posYTexto, posYInput,
			originXTexto, originXInput, originYTexto, originYInput,
			displaySizeTexto, displaySizeSwitch,
			anchoTexto, anchoInput, altoTexto, altoInput,
			validacion,
			botonAceptar, botonAceptaTexto,
		])
				.setDepth(ManejarDepthMainGame.profundidad3);
	}


}