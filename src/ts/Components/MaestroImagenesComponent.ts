import { FileChooser } from "phaser3-rex-plugins/plugins/filechooser";
import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { UtilImagenes } from "../Utilidades/UtilImagenes";

export class MaestroImagenesComponent implements IDestroyable {
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
				this.botonToggleEmitters.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.hide();
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

		this.botonAgregarImagen = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 25, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMas)
				.setOrigin(0)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonAgregarImagen.clearTint();
					// UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					// (this.escena.plugins.get('rexFileChooser') as any).open({ accept: '.png' }).then((res) => {
					this.escena.rexFileChooser.open({ accept: '.png' }).then((res) => {
						if (res.files.length) {
							const listaImagenes = UtilImagenes.obtenerListado();
                            const file = res.files[0];
							const nombreArchivo = file.name.slice(0, -4).toLowerCase();
							if (listaImagenes.map(x => x.nombre).includes(nombreArchivo)) {
								alert('❌ La imagen ya se encuentra ingresada previamente. Renombre el archivo si desea ingresarlo.');
								return;
							} else if (this.escena.textures.getTextureKeys().map(x => x.toLowerCase()).includes(nombreArchivo)) {
								alert('❌ El archivo tiene un nombre no admitido. Si estas actualizando una imágen prueba con actualizar la página.');
								return;
							} else if (Object.values(AtlasParticulas).includes(nombreArchivo)) {
								alert('❌ El archivo tiene un nombre no admitido.');
								return;
							} else if (file.size > 1024 * 100) {
								alert('❌ El archivo es demasiado grande. El tamaño máximo permitido es de 100 KB.');
								return;
							}
							const reader = new FileReader();
							reader.onload = () => {
								const base64 = reader.result as string;
								UtilImagenes.guardarImagen(nombreArchivo, file.size, base64);
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

				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 290, 100, `Maestro Imágenes`, { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
	}

	private mostrarImagenes() {
		this.listaImagenesContainer?.forEach(x => x.destroy());
		this.listaImagenesContainer = [];
		this.sinImagenesTexto?.destroy();
		const posX = this.escena.cameras.main.displayWidth - 300;
		let posY = 175;
		const listaImagenesFull = UtilImagenes.obtenerListadoCompleto();
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
				.on(Phaser.Input.Events.POINTER_UP, () => {
					eliminarBoton.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.sinImagenesTexto?.destroy();
					this.botonSiguiente?.destroy();
					this.botonAnterior?.destroy();
					this.listaImagenesContainer.forEach(x => x.destroy());
					this.listaImagenesContainer = [];
					UtilImagenes.eliminarImagen(x.nombre);
					// this.escena.textures.remove(x.nombre);
					const cantidadImagenes = UtilImagenes.obtenerListado().length;
					const maxPagina = Math.ceil(cantidadImagenes / this.PROYECTOS_POR_PAGINA) - 1;
					this.paginaActual = this.paginaActual > maxPagina ? maxPagina : this.paginaActual;
					this.crearPaginacion();
					this.mostrarImagenes();
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
			const textoNombre = this.escena.add.text(70, 0, `${x.nombre.slice(0, 12)}${x.nombre.length > 12 ? '...' : ''}`, { fontFamily: 'monospace', fontSize: '24px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3);
			const textoSize = this.escena.add.text(65, 25, `${(x.peso / 1024).toFixed(2)} KB`, { fontFamily: 'monospace', fontSize: '24px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3);

			const graphics = this.escena.add.graphics().setDepth(-1);
			graphics.lineStyle(4, 0x000000, 1);
			graphics.strokeLineShape(new Phaser.Geom.Line(0, 70, 400, 70));
			const container = this.escena.add.container(posX, posY, [textoNombre, textoSize, graphics, eliminarBoton, imagen])
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.listaImagenesContainer.push(container);
			posY += 75;
		}
	}

	private crearPaginacion() {
		const cantidadImagenes = UtilImagenes.obtenerListado().length;
		if (!cantidadImagenes) {
			return;
		}
		this.botonSiguiente = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 950, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA >= cantidadImagenes) {
						return;
					}
					this.botonSiguiente.clearTint();
					this.paginaActual++;
					this.mostrarImagenes();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
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
					if (this.paginaActual === 0) {
						return;
					}
					this.botonAnterior.clearTint();
					this.paginaActual--;
					this.mostrarImagenes();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
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

	public show() {
		this.crearObjetos();
		this.paginaActual = 0;
		this.crearPaginacion();
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
}