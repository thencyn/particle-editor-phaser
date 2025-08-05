import Phaser from "phaser";
import { UtilEjemplos } from "../Utilidades/UtilEjemplos";
import { IEjemploConfiguracion } from "../Utilidades/Interfaces";
import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos } from "../Utilidades/Diccionario";

export class BarraVisualizacionEjemplosComponent {
	private scrollablePanel: ScrollablePanel;
	private COLOR_PRIMARY = 0x004e2b;
	private COLOR_LIGHT = 0xa8a24f;
	private COLOR_DARK = 0x001c0f;
	private titulo: Phaser.GameObjects.Text;
	private botonCerrar: Phaser.GameObjects.Image;
	constructor(private escena: Phaser.Scene) {
		this.crearBarraVisualizacionEjemplos();
	}

	public show() {
		this.scrollablePanel.setVisible(true);
		this.titulo.setVisible(true);
		this.botonCerrar.setVisible(true);
	}

	public hide() {
		this.scrollablePanel.setVisible(false);
		this.titulo.setVisible(false);
		this.botonCerrar.setVisible(false);
	}

	private crearBarraVisualizacionEjemplos() {
		this.titulo = this.escena.add.text(1000, this.escena.cameras.main.displayHeight - 250, 'Lista Ejemplos', { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setVisible(false)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.botonCerrar = this.escena.add.image(1425, this.escena.cameras.main.displayHeight - 285, AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
							.setOrigin(0, 0)
							.setDepth(ManejarDepthMainGame.profundidad3)
							.setVisible(false)
							.setInteractive({ useHandCursor: true })
							.on(Phaser.Input.Events.POINTER_UP, () => {
								this.botonCerrar.clearTint();
								UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
								this.hide();
							})
							.on(Phaser.Input.Events.POINTER_MOVE, function () {
								this.setTint(0xb4caaf);
							})
							.on(Phaser.Input.Events.POINTER_OUT, function () {
								this.clearTint();
							});

		const data = UtilEjemplos.obtenerListadoEjemplosGuardados();
		this.scrollablePanel = this.escena.rexUI.add.scrollablePanel({
			x: 500,
			y: this.escena.cameras.main.displayHeight - 200,
			width: 700,
			height: 220,

			scrollMode: 1,

			background: this.escena.rexUI.add.roundRectangle(0, 0, 2, 2, 10, this.COLOR_PRIMARY),

			panel: {
				child: this.createPanel(data),

				mask: {
					padding: 1,
					// layer: this.add.layer()
				},
			},

			slider: {
				track: this.escena.rexUI.add.roundRectangle(0, 0, 20, 10, 10, this.COLOR_DARK),
				thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 13, this.COLOR_LIGHT),
			},

			scroller: true,
			// scroller: {
			// 	// pointerOutRelease: false
			// },

			mouseWheelScroller: {
				focus: false,
				speed: 1
			},
			// header: this.escena.add.text(0, 0, 'Lista Ejemplos'),
			space: {
				left: 10,
				right: 10,
				top: 50,
				bottom: 10,

				panel: 10,
				// slider: { left: 30, right: 30 },
			}
		})
		.setOrigin(0, 0)
		.setVisible(false)
		.layout();

		this.scrollablePanel.setPosition(
			(this.escena.cameras.main.displayWidth / 2) - (this.scrollablePanel.width / 2) + 100,
			this.escena.cameras.main.displayHeight - this.scrollablePanel.height - 5
		);
	}

	private createPanel(data: IEjemploConfiguracion[]) {
		const sizer = this.escena.rexUI.add.sizer({
			orientation: 'x',
			space: { item: 10 },
		})
			// .add(
			// 	createHeader(scene, data), // child
			// 	{ expand: true }
			// )
			.add(
				this.createTable(data, 1), // child
				{ expand: true }
			)
			// .add(
			// 	createTable(scene, data, 'skills', 1), // child
			// 	{ expand: true }
			// )
			// .add(
			// 	createTable(scene, data, 'items', 2), // child
			// 	{ expand: true }
			// )
		return sizer;
	}

	private createTable (listaEjemplos: IEjemploConfiguracion[], rows: number) {
		// const title = this.escena.rexUI.add.label({
		// 	orientation: 'x',
		// 	text: this.escena.add.text(800, 0, 'Lista Ejemplos'),
		// });
		const columns = Math.ceil(listaEjemplos.length / rows);
		const table = this.escena.rexUI.add.gridSizer({
			column: columns,
			row: rows,
			rowProportions: 1,
			space: { column: 10, row: 10 },
			name: 'listaEjemplos'  // Search this name to get table back
		});

		let r, c;
		// const iconSize = (rows === 1) ? 80 : 40;
		const iconSize = 140;
		for (let i = 0, cnt = listaEjemplos.length; i < cnt; i++) {
			r = i % rows;
			c = (i - r) / rows;
			table.add(
				this.createIcon(listaEjemplos[i], iconSize, iconSize),
				c,
				r,
				'top',
				0,
				true
			);
		}

		return this.escena.rexUI.add.sizer({
			orientation: 'y',
			space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
		}).addBackground(
			this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, 0x7b5e57, 1)
		)
		// .add(
		// 	title, // child
		// 	0, // proportion
		// 	'left', // align
		// 	0, // paddingConfig
		// 	true // expand
		// )
		.add(table, // child
			1, // proportion
			'center', // align
			0, // paddingConfig
			true // expand
		);
	}


	private createIcon(item: IEjemploConfiguracion, iconWidth: number, iconHeight: number) {
		const label = this.escena.rexUI.add.label({
			orientation: 'y',
			icon: this.escena.add.image(0, 0, item.aliasImagenPreview)
				.setDisplaySize(iconWidth, iconHeight)
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, async () => {
											UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
											const ejemploJson = await UtilEjemplos.obtenerJsonEjemploPorURL(item.url);
											this.escena.registry.events.emit(Eventos.AbrirNuevoEjemplo, ejemploJson);
										})
										.on(Phaser.Input.Events.POINTER_MOVE, () => {

										})
										.on(Phaser.Input.Events.POINTER_OUT, () => {

										}),
			// icon: scene.rexUI.add.roundRectangle(0, 0, iconWidth, iconHeight, 5, 0x7b5e57),
			// text: scene.add.text(0, 0, item.nombreEjemplo),
			space: { left: 3 }
		});
		return label;
	};

}