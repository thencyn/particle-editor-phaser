import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDeathZone, IDestroyable } from "../Utilidades/Interfaces";
import { UtilFiguras } from "../Utilidades/UtilFiguras";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { FiguraControlesComponent } from "./FiguraControlesComponent";

export class DeathZoneComponent implements IDestroyable {
	private botonToggleDeathZone: Phaser.GameObjects.Image;
	private botonNuevaDeathZone: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private titulo: Phaser.GameObjects.Text;
	private sinDeathZonesTexto: Phaser.GameObjects.Text;
	private MAXIMO_DEATHZONE = 4;
	private listaContainerDeathZones: Phaser.GameObjects.Container[] = [];

	constructor(private escena: Phaser.Scene) {

	}

	private crearBotonToggleMenu() {
		this.background = this.escena.add.image(this.escena.cameras.main.displayWidth - 309, -50, TexturasManuales.FondoTransparenteOscuro)
					.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad2)

		this.botonToggleDeathZone = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonToggleDeathZone.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					this.hide();
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleDeathZone.setPosition(this.escena.cameras.main.width - this.botonToggleDeathZone.displayWidth - 320, this.escena.cameras.main.centerY);

		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 270, 110, 'Death Zones', { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
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
		this.botonNuevaDeathZone = this.escena.add.image(this.escena.cameras.main.displayWidth - 75, 25, AtlasImagenes.Botones, this.listaContainerDeathZones.length < this.MAXIMO_DEATHZONE ? AtlasBotonesImagenes.SeleccionCircularMas : AtlasBotonesImagenes.SeleccionCircularMasDisable)
			.setOrigin(0)
			.setInteractive({ useHandCursor: true })
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonNuevaDeathZone.clearTint();
				this.sinDeathZonesTexto.setVisible(false);
				if (this.listaContainerDeathZones.length < this.MAXIMO_DEATHZONE) {
					this.crearDeathZone(true, this.listaContainerDeathZones.length);
					this.botonNuevaDeathZone.setFrame(this.listaContainerDeathZones.length < this.MAXIMO_DEATHZONE ? AtlasBotonesImagenes.SeleccionCircularMas : AtlasBotonesImagenes.SeleccionCircularMasDisable);
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				if (this.listaContainerDeathZones.length < this.MAXIMO_DEATHZONE) {
					this.botonNuevaDeathZone.setTint(0xb4caaf);
				}
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
	}

	private crearDeathZone(nueva: boolean, indexActual: number = this.listaContainerDeathZones.length, tipo: 'onEnter' | 'onLeave' = 'onEnter', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle = new Phaser.Geom.Rectangle(1000, 250, 100, 100)) {
		// const indexActual = this.listaContainerDeathZones.length;
		let figuraSeleccionada = figura.type;
		const titulo = this.escena.add.text(50, 2, `Zone ${indexActual + 1} ${tipo}`, { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0);
		const borrar = this.escena.add.image(10, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.SeleccionCircularMenos)
			.setOrigin(0)
			.setScale(0.4)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				borrar.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				this.escena.registry.events.emit(Eventos.EmitterDeathZoneEliminar, indexActual);
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
			// const toggleSwitch0 = this.escena.add.rexToggleSwitch(200, 300, 100, 100, 0x039be5);
		const tipoDeathZone = this.escena.rexUI.add.toggleSwitch(210, -5, 40, 40, 0x039be5)
			.setOrigin(0)
			.setValue(tipo === 'onEnter')
			.on('valuechange', (newValue) => {
				titulo.setText(`Zone ${indexActual + 1} ${newValue ? 'onEnter' : 'onLeave'}`);
				this.escena.registry.events.emit(Eventos.EmitterDeathZoneCrear, false, indexActual, newValue ? 'onEnter' : 'onLeave', UtilFiguras.obtenerInstanciaFiguraPorPropiedades(figuraSeleccionada, containerControles.getValor()));
			});

		const rect = this.escena.add.image(30, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.RECTANGLE ? AtlasBotonesImagenes.Rectangulo : AtlasBotonesImagenes.RectanguloDisable)
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
				figuraSeleccionada = Phaser.Geom.RECTANGLE;
				containerControles.updateControls(new Phaser.Geom.Rectangle(1000, 250, 100, 100));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const circle = this.escena.add.image(90, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.CIRCLE ? AtlasBotonesImagenes.Circulo : AtlasBotonesImagenes.CirculoDisable)
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
				figuraSeleccionada = Phaser.Geom.CIRCLE;
				containerControles.updateControls(new Phaser.Geom.Circle(1000, 250, 50));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const elipse = this.escena.add.image(150, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.ELLIPSE ? AtlasBotonesImagenes.Elipse : AtlasBotonesImagenes.ElipseDisable)
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
				figuraSeleccionada = Phaser.Geom.ELLIPSE;
				containerControles.updateControls(new Phaser.Geom.Ellipse(1000, 250, 100, 50));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		const triangle = this.escena.add.image(210, 30, AtlasImagenes.Botones, figuraSeleccionada === Phaser.Geom.TRIANGLE ? AtlasBotonesImagenes.Triangulo : AtlasBotonesImagenes.TrianguloDisable)
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
				figuraSeleccionada = Phaser.Geom.TRIANGLE;
				containerControles.updateControls(Phaser.Geom.Triangle.BuildEquilateral(1000, 250, 100));
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});

		let containerControles = new FiguraControlesComponent(this.escena, figura)
			.on("valorCambiado", (nuevoValor) => {
				this.escena.registry.events.emit(Eventos.EmitterDeathZoneCrear, false, indexActual, tipoDeathZone.value ? 'onEnter' : 'onLeave', UtilFiguras.obtenerInstanciaFiguraPorPropiedades(figuraSeleccionada, nuevoValor));
			});
		const graphics: Phaser.GameObjects.Graphics = this.escena.add.graphics({ lineStyle: { width: 6, color: 0xfff29d } });
		graphics.strokeLineShape(new Phaser.Geom.Line(0, 210, 350, 210));
		const posY = 175 + (this.listaContainerDeathZones.length * 220);
		const container = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, posY)
			.setDepth(ManejarDepthMainGame.profundidad3);
		container.add([titulo, rect, circle, elipse, triangle, borrar, tipoDeathZone, containerControles.container.setY(85), graphics]);
		this.listaContainerDeathZones.push(container);
		if (nueva) {
			this.escena.registry.events.emit(Eventos.EmitterDeathZoneCrear, true, indexActual, tipoDeathZone.value ? 'onEnter' : 'onLeave', new Phaser.Geom.Rectangle(containerControles.getValor().x, containerControles.getValor().y, containerControles.getValor().width, containerControles.getValor().height));
		}
	}

	public show(listaDeathZones: IDeathZone[]) {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		this.crearBotonNuevo();
		this.sinDeathZonesTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 280, this.escena.cameras.main.centerY, 'No se encontraron\nDeath Zones', { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setVisible(listaDeathZones.length === 0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		if (listaDeathZones?.length > 0) {
			this.mostrarDeathZones(listaDeathZones);
		}
	}

	public update(listaDeathZones: IDeathZone[]) {
		this.listaContainerDeathZones.forEach(container => container.destroy());
		this.listaContainerDeathZones = [];
		this.sinDeathZonesTexto.setVisible(listaDeathZones.length === 0);
		if (listaDeathZones?.length > 0) {
			this.mostrarDeathZones(listaDeathZones);
		}
	}

	public mostrarDeathZones(listaDeathZones: IDeathZone[]) {
		for (const item of listaDeathZones) {
			this.crearDeathZone(false, this.listaContainerDeathZones.length, item.tipo, item.figura);
		}
	}

	private hide() {
		this.botonToggleDeathZone.removeInteractive();
		this.escena.add.tween({
			targets: [this.botonToggleDeathZone, this.background, this.botonNuevaDeathZone, this.botonAtras, this.titulo, ...this.listaContainerDeathZones],
			x: 2200,
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleDeathZone.destroy();
				this.botonNuevaDeathZone.destroy();
				this.background.destroy();
				this.botonAtras.destroy();
				this.titulo.destroy();
				this.sinDeathZonesTexto.destroy();
				this.listaContainerDeathZones.forEach(container => container.destroy());
				this.listaContainerDeathZones = [];
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleDeathZone.destroy();
		this.botonNuevaDeathZone.destroy();
		this.background.destroy();
		this.botonAtras.destroy();
		this.titulo.destroy();
		this.sinDeathZonesTexto.destroy();
		this.listaContainerDeathZones.forEach(container => container.destroy());
		this.listaContainerDeathZones = [];
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}
}