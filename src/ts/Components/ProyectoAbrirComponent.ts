import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, Imagenes, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IConfiguracionEmitter, IDestroyable } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { UtilProyectos } from "../Utilidades/UtilProyectos";

export class ProyectoAbrirComponent implements IDestroyable {
	private botonToggleAbrir: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private listaProyectosContainer: Phaser.GameObjects.Container[];
	private background: Phaser.GameObjects.Image;
	private sinProyectosTexto: Phaser.GameObjects.Text;
	private titulo: Phaser.GameObjects.Text;
	private paginaActual: number = 0;
	private botonSiguiente: Phaser.GameObjects.Image;
	private botonAnterior: Phaser.GameObjects.Image;
	private PROYECTOS_POR_PAGINA = 10;
	constructor(private escena: Phaser.Scene) {

	}

	private crearBotonToggleMenu() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleAbrir = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonToggleAbrir.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.hide();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleAbrir.setPosition(this.escena.cameras.main.width - this.botonToggleAbrir.displayWidth - 320, this.escena.cameras.main.centerY);

		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 220, 50, 'Abrir Proyecto', { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
	}

	private crearBotonAtras() {
		this.botonAtras = this.escena.add.image(this.escena.cameras.main.width - 300, 25, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
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
	}

	public show() {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.paginaActual = 0;
		this.crearPaginacion();
		this.mostrarProyectos();
	}

	private mostrarProyectos() {
		this.listaProyectosContainer?.forEach(x => x.destroy());
		this.listaProyectosContainer = [];
		const posX = this.escena.cameras.main.displayWidth - 300;
		let posY = 150;
		const listaProyectos = UtilProyectos.obtenerListadoProyectosGuardados();
		this.botonAnterior?.setVisible(this.paginaActual > 0);
		this.botonSiguiente?.setVisible(this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA < listaProyectos.length);
		if (listaProyectos.length === 0) {
			this.sinProyectosTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 280, this.escena.cameras.main.centerY - 25, 'No hay proyectos\nguardados', { fontFamily: 'monospace', fontSize: '28px', align: 'center' })
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3);
			return;
		}

		for (const [index, x] of listaProyectos.slice(this.PROYECTOS_POR_PAGINA * this.paginaActual, this.PROYECTOS_POR_PAGINA * (this.paginaActual + 1)).entries()) {
			const eliminarBoton = this.escena.add.image(0, 20, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
				.setOrigin(0)
				.setScale(0.50)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					eliminarBoton.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.sinProyectosTexto?.destroy();
					this.botonSiguiente?.destroy();
					this.botonAnterior?.destroy();
					this.listaProyectosContainer.forEach(x => x.destroy());
					this.listaProyectosContainer = [];
					UtilProyectos.eliminarProyecto(x.id);
					const cantidadProyectos = UtilProyectos.obtenerListadoProyectosGuardados().length;
					const maxPagina = Math.ceil(cantidadProyectos / this.PROYECTOS_POR_PAGINA) - 1;
					this.paginaActual = this.paginaActual > maxPagina ? maxPagina : this.paginaActual;
					this.crearPaginacion();
					this.mostrarProyectos();
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
			const texto = this.escena.add.text(40, 20, `${x.nombreProyecto}`, { fontFamily: 'monospace', fontSize: '28px' })
				.setOrigin(0, 0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						texto.clearTint();
						this.hide(x.id);
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, function () {
						this.setTint(0xb4caaf);
					})
					.on(Phaser.Input.Events.POINTER_OUT, function () {
						this.clearTint();
					});
			// Phaser.Display.Align.To.RightCenter(texto, imagen, 0, 15);

			// const imagenAbrir = this.escena.add.image(texto.x + texto.displayWidth + 25, 15, AtlasImagenes.Botones, AtlasBotonesImagenes.BotonRecargar)
			// 		.setOrigin(0)
			// 		.setScale(0.60)
			// 		// .setDisplaySize(60, 60)
			// 		.setDepth(ManejarDepthMainGame.profundidad3)
			// 		.setInteractive({ useHandCursor: true })
			// 		.on(Phaser.Input.Events.POINTER_UP, () => {
			// 			imagenAbrir.clearTint();
			// 			this.hide(x.id);
			// 			UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
			// 		})
			// 		.on(Phaser.Input.Events.POINTER_MOVE, function () {
			// 			this.setTint(0xb4caaf);
			// 		})
			// 		.on(Phaser.Input.Events.POINTER_OUT, function () {
			// 			this.clearTint();
			// 		});


			const graphics = this.escena.add.graphics().setDepth(-1);
			graphics.lineStyle(4, 0x000000, 1);
			graphics.strokeLineShape(new Phaser.Geom.Line(0, 75, 400, 75));
			const container = this.escena.add.container(posX, posY, [texto, graphics, eliminarBoton])
				.setDepth(ManejarDepthMainGame.profundidad3);
			this.listaProyectosContainer.push(container);
			posY += 75;
		}

	}

	private crearPaginacion() {
		const cantidadProyectos = UtilProyectos.obtenerListadoProyectosGuardados().length;
		if (!cantidadProyectos) {
			return;
		}
		this.botonSiguiente = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 950, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA >= cantidadProyectos) {
						return;
					}
					this.botonSiguiente.clearTint();
					this.paginaActual++;
					this.mostrarProyectos();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				})
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					if (this.paginaActual * this.PROYECTOS_POR_PAGINA + this.PROYECTOS_POR_PAGINA < cantidadProyectos) {
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
					this.mostrarProyectos();
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

	private hide(id?: number) {
		this.botonToggleAbrir.removeInteractive();
		const listaDestinos = [this.botonToggleAbrir.x + 320, this.background.x + 300, this.botonAtras.x + 300, this.titulo.x + 300, (this.sinProyectosTexto?.x || this.escena.cameras.main.displayWidth) + 300
					, this.botonSiguiente?.x + 300 || this.escena.cameras.main.displayWidth + 300, this.botonAnterior?.x + 300 || this.escena.cameras.main.displayWidth + 300
					, ...this.listaProyectosContainer.map(x => x.x + 300) ];
		this.escena.add.tween({
			targets: [this.botonToggleAbrir, this.background, this.botonAtras, this.titulo, this.sinProyectosTexto,
					this.botonSiguiente, this.botonAnterior,
					...this.listaProyectosContainer],
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleAbrir.destroy();
				this.botonAtras.destroy();
				this.sinProyectosTexto?.destroy();
				this.background.destroy();
				this.titulo.destroy();
				this.botonSiguiente?.destroy();
				this.botonAnterior?.destroy();
				this.listaProyectosContainer.forEach(x => x.destroy());
				this.listaProyectosContainer = [];
				this.escena.registry.events.emit(Eventos.ProyectoAbrir, id);
			}
		});
	}

	public destroy() {
		this.botonToggleAbrir.destroy();
		this.botonAtras.destroy();
		this.sinProyectosTexto?.destroy();
		this.background.destroy();
		this.titulo.destroy();
		this.botonSiguiente?.destroy();
		this.botonAnterior?.destroy();
		this.listaProyectosContainer.forEach(x => x.destroy());
		this.listaProyectosContainer = [];
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}


}