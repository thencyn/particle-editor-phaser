import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable, IEmitZone } from "../Utilidades/Interfaces";
import { UtilFiguras } from "../Utilidades/UtilFiguras";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { ControlesEmitZoneComponent } from "./ControlesEmitZoneComponent";
import { FiguraControlesComponent } from "./FiguraControlesComponent";

export class EmitZoneComponent implements IDestroyable {
	private botonToggleEmitZone: Phaser.GameObjects.Image;
	private botonNuevaEmitZone: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private titulo: Phaser.GameObjects.Text;
	private sinEmitZonesTexto: Phaser.GameObjects.Text;
	private MAXIMO_EMITZONE = 4;
	private listaContainerEmitZones: Phaser.GameObjects.Container[] = [];
	private esVisible: boolean = false;

	constructor(private escena: Phaser.Scene) {

	}

	private crearBotonToggleMenu() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleEmitZone = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonToggleEmitZone.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.hide();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleEmitZone.setPosition(this.escena.cameras.main.width - this.botonToggleEmitZone.displayWidth - 320, this.escena.cameras.main.centerY);

		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 270, 110, 'Emit Zones', { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
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

	private crearBotonNuevo() {
		this.botonNuevaEmitZone = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 25, AtlasImagenes.Botones, this.listaContainerEmitZones.length < this.MAXIMO_EMITZONE ? AtlasBotonesImagenes.SeleccionCircularMas : AtlasBotonesImagenes.SeleccionCircularMasDisable)
			.setOrigin(0)
			.setInteractive({ useHandCursor: true })
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonNuevaEmitZone.clearTint();
				this.sinEmitZonesTexto.setVisible(false);
				if (this.listaContainerEmitZones.length < this.MAXIMO_EMITZONE) {
					this.crearEmitZone(true, this.listaContainerEmitZones.length);
					this.botonNuevaEmitZone.setFrame(this.listaContainerEmitZones.length < this.MAXIMO_EMITZONE ? AtlasBotonesImagenes.SeleccionCircularMas : AtlasBotonesImagenes.SeleccionCircularMasDisable);
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				if (this.listaContainerEmitZones.length < this.MAXIMO_EMITZONE) {
					this.botonNuevaEmitZone.setTint(0xb4caaf);
				}
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
	}

	private crearEmitZone(nueva: boolean, indexActual: number = this.listaContainerEmitZones.length, tipo: 'edge' | 'random' = 'edge', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line = new Phaser.Geom.Rectangle(1000, 250, 100, 100), quantity: number = 32, total: number = 32, yoyo: boolean = false) {
		let figuraSeleccionada = figura.type;
		let mostrandocontrolesFigura = true;
		const titulo = this.escena.add.text(50, 2, `Zone ${indexActual + 1} ${tipo}`, { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const borrar = this.escena.add.image(10, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
			.setOrigin(0)
			.setScale(0.4)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				borrar.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.escena.registry.events.emit(Eventos.EmitterEmitZoneEliminar, indexActual);
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});

		const detalles = this.escena.add.image(265, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Configuracion)
			.setOrigin(0)
			.setScale(0.4)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				detalles.removeInteractive();
				detalles.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				const containerorigen = mostrandocontrolesFigura ? containerControlesFigura.container : containerControlesEmitZone.container;
				const containerdestino = !mostrandocontrolesFigura ? containerControlesFigura.container : containerControlesEmitZone.container;
				this.escena.tweens.chain({
					tweens: [
						{
							targets: containerorigen,
							scaleX: 0,
							duration: 250,
							onComplete: () => {
								containerorigen.setVisible(false);
							}
						},
						{
							targets: containerdestino,
							scaleX: 1,
							duration: 250,
							onStart: () => {
								containerdestino.setVisible(true);
								containerdestino.setScale(0, 1);
							},
							onComplete: () => {
								mostrandocontrolesFigura = !mostrandocontrolesFigura;
								detalles.setInteractive({ useHandCursor: true });
							}
						}
					]
				});
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});

		const tipoEmitZone = this.escena.rexUI.add.toggleSwitch(210, -5, 40, 40, 0x039be5)
			.setOrigin(0)
			.setValue(tipo === 'edge')
			.on('valuechange', (newValue) => {
				titulo.setText(`Zone ${indexActual + 1} ${newValue ? 'edge' : 'random'}`);
				this.escena.registry.events.emit(Eventos.EmitterEmitZoneCrear, false, indexActual, newValue ? 'edge' : 'random', UtilFiguras.obtenerInstanciaFiguraPorPropiedades(figuraSeleccionada, containerControlesFigura.getValor()), containerControlesEmitZone.getValor().quantity, containerControlesEmitZone.getValor().total, containerControlesEmitZone.getValor().yoyo);
			});

		const rect = this.escena.add.image(5, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.RECTANGLE ? AtlasBotonesImagenes.Rectangulo : AtlasBotonesImagenes.RectanguloDisable)
			.setOrigin(0)
			.setScale(0.75)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				rect.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				rect.setFrame(AtlasBotonesImagenes.Rectangulo);
				circle.setFrame(AtlasBotonesImagenes.CirculoDisable);
				elipse.setFrame(AtlasBotonesImagenes.ElipseDisable);
				triangle.setFrame(AtlasBotonesImagenes.TrianguloDisable);
				linea.setFrame(AtlasBotonesImagenes.LineaDisable);
				figuraSeleccionada = Phaser.Geom.RECTANGLE;
				containerControlesFigura.updateControls(new Phaser.Geom.Rectangle(1000, 250, 100, 100));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const circle = this.escena.add.image(65, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.CIRCLE ? AtlasBotonesImagenes.Circulo : AtlasBotonesImagenes.CirculoDisable)
			.setOrigin(0)
			.setScale(0.75)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				circle.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				rect.setFrame(AtlasBotonesImagenes.RectanguloDisable);
				circle.setFrame(AtlasBotonesImagenes.Circulo);
				elipse.setFrame(AtlasBotonesImagenes.ElipseDisable);
				triangle.setFrame(AtlasBotonesImagenes.TrianguloDisable);
				linea.setFrame(AtlasBotonesImagenes.LineaDisable);
				figuraSeleccionada = Phaser.Geom.CIRCLE;
				containerControlesFigura.updateControls(new Phaser.Geom.Circle(1000, 250, 50));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const elipse = this.escena.add.image(125, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.ELLIPSE ? AtlasBotonesImagenes.Elipse : AtlasBotonesImagenes.ElipseDisable)
			.setOrigin(0)
			.setScale(0.75)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				elipse.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				rect.setFrame(AtlasBotonesImagenes.RectanguloDisable);
				circle.setFrame(AtlasBotonesImagenes.CirculoDisable);
				elipse.setFrame(AtlasBotonesImagenes.Elipse);
				triangle.setFrame(AtlasBotonesImagenes.TrianguloDisable);
				linea.setFrame(AtlasBotonesImagenes.LineaDisable);
				figuraSeleccionada = Phaser.Geom.ELLIPSE;
				containerControlesFigura.updateControls(new Phaser.Geom.Ellipse(1000, 250, 100, 50));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const triangle = this.escena.add.image(185, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.TRIANGLE ? AtlasBotonesImagenes.Triangulo : AtlasBotonesImagenes.TrianguloDisable)
			.setOrigin(0)
			.setScale(0.75)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				triangle.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				rect.setFrame(AtlasBotonesImagenes.RectanguloDisable);
				circle.setFrame(AtlasBotonesImagenes.CirculoDisable);
				elipse.setFrame(AtlasBotonesImagenes.ElipseDisable);
				triangle.setFrame(AtlasBotonesImagenes.Triangulo);
				linea.setFrame(AtlasBotonesImagenes.LineaDisable);
				figuraSeleccionada = Phaser.Geom.TRIANGLE;
				containerControlesFigura.updateControls(Phaser.Geom.Triangle.BuildEquilateral(1000, 250, 100));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const linea = this.escena.add.image(245, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.LINE ? AtlasBotonesImagenes.Linea : AtlasBotonesImagenes.LineaDisable)
			.setOrigin(0)
			.setScale(0.75)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				linea.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				rect.setFrame(AtlasBotonesImagenes.RectanguloDisable);
				circle.setFrame(AtlasBotonesImagenes.CirculoDisable);
				elipse.setFrame(AtlasBotonesImagenes.ElipseDisable);
				triangle.setFrame(AtlasBotonesImagenes.TrianguloDisable);
				linea.setFrame(AtlasBotonesImagenes.Linea);
				figuraSeleccionada = Phaser.Geom.LINE;
				containerControlesFigura.updateControls(new Phaser.Geom.Line(800, 250, 1200, 250));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});

		let containerControlesFigura = new FiguraControlesComponent(this.escena, figura)
			.on("valorCambiado", (nuevoValor) => {
				this.escena.registry.events.emit(Eventos.EmitterEmitZoneCrear, false, indexActual, tipoEmitZone.value ? 'edge' : 'random', UtilFiguras.obtenerInstanciaFiguraPorPropiedades(figuraSeleccionada, nuevoValor), containerControlesEmitZone.getValor().quantity, containerControlesEmitZone.getValor().total, containerControlesEmitZone.getValor().yoyo);
			});
		// containerControlesFigura.container.setVisible(false);
		let containerControlesEmitZone = new ControlesEmitZoneComponent(this.escena, quantity, total)
			.on("valorCambiado", (nuevoValor) => {
				this.escena.registry.events.emit(Eventos.EmitterEmitZoneCrear, false, indexActual, tipoEmitZone.value ? 'edge' : 'random', UtilFiguras.obtenerInstanciaFiguraPorPropiedades(figuraSeleccionada, containerControlesFigura.getValor()), nuevoValor.quantity, nuevoValor.total, nuevoValor.yoyo);
			});
		containerControlesEmitZone.container.setVisible(false);
		const graphics: Phaser.GameObjects.Graphics = this.escena.add.graphics({ lineStyle: { width: 6, color: 0xfff29d } });
		graphics.strokeLineShape(new Phaser.Geom.Line(0, 210, 350, 210));
		const posY = 175 + (this.listaContainerEmitZones.length * 220);
		const container = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, posY)
			.setDepth(ManejarDepthMainGame.profundidad3);
		container.add([titulo, rect, circle, elipse, triangle, linea, borrar, detalles, tipoEmitZone, containerControlesFigura.container.setY(85), containerControlesEmitZone.container.setY(85), graphics]);
		this.listaContainerEmitZones.push(container);
		if (nueva) {
			this.escena.registry.events.emit(Eventos.EmitterEmitZoneCrear, true, indexActual, tipoEmitZone.value ? 'edge' : 'random',
				new Phaser.Geom.Rectangle(containerControlesFigura.getValor().x, containerControlesFigura.getValor().y, containerControlesFigura.getValor().width, containerControlesFigura.getValor().height),
				containerControlesEmitZone.getValor().quantity, containerControlesEmitZone.getValor().total, containerControlesEmitZone.getValor().yoyo);
		}
	}

	public show(listaEmitZones: IEmitZone[]) {
		this.esVisible = true;
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.crearBotonNuevo();
		this.sinEmitZonesTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 280, this.escena.cameras.main.centerY, 'No se encontraron\nEmit Zones', { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setVisible(listaEmitZones.length === 0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		if (listaEmitZones?.length > 0) {
			this.mostrarEmitZones(listaEmitZones);
		}
	}

	public update(listaEmitZones: IEmitZone[]) {
		this.listaContainerEmitZones.forEach(container => container.destroy());
		this.listaContainerEmitZones = [];
		this.sinEmitZonesTexto.setVisible(listaEmitZones.length === 0);
		if (listaEmitZones?.length > 0) {
			this.mostrarEmitZones(listaEmitZones);
		}
	}

	public ocultarSiEsVisible() {
		if (this.esVisible) {
			this.hide();
		}
	}

	private mostrarEmitZones(listaEmitZones: IEmitZone[]) {
		for (const item of listaEmitZones) {
			this.crearEmitZone(false, this.listaContainerEmitZones.length, item.tipo, item.figura, item.quantity, item.total, item.yoyo);
		}
	}

	private hide() {
		this.esVisible = false;
		this.botonToggleEmitZone.removeInteractive();
		this.escena.add.tween({
			targets: [this.botonToggleEmitZone, this.background, this.botonNuevaEmitZone, this.botonAtras, this.titulo, ...this.listaContainerEmitZones],
			x: 2200,
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleEmitZone.destroy();
				this.botonNuevaEmitZone.destroy();
				this.background.destroy();
				this.botonAtras.destroy();
				this.titulo.destroy();
				this.sinEmitZonesTexto.destroy();
				this.listaContainerEmitZones.forEach(container => container.destroy());
				this.listaContainerEmitZones = [];
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.esVisible = false;
		this.botonToggleEmitZone.destroy();
		this.botonNuevaEmitZone.destroy();
		this.background.destroy();
		this.botonAtras.destroy();
		this.titulo.destroy();
		this.sinEmitZonesTexto.destroy();
		this.listaContainerEmitZones.forEach(container => container.destroy());
		this.listaContainerEmitZones = [];
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}
}