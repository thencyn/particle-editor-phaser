import { FileChooser } from "phaser3-rex-plugins/plugins/filechooser";
import EjemplosScene from "../Scenes/EjemplosScene";
import PrincipalScene from "../Scenes/PrincipalScene";
import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales, Variables } from "../Utilidades/Diccionario";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { files } from "jszip";
import { IGuardarConfiguracionProyectos } from "../Utilidades/Interfaces";

export class MenuComponent {
	private botonToggleMenu: Phaser.GameObjects.Image;
	private botonVerEmitters: Phaser.GameObjects.Image;
	private botonVerEmittersTexto: Phaser.GameObjects.Text;
	private botonVerEmittersArea: Phaser.GameObjects.Zone;

	private botonImagenes: Phaser.GameObjects.Image;
	private botonImagenesTexto: Phaser.GameObjects.Text;
	private botonImagenesArea: Phaser.GameObjects.Zone;

	private botonNuevo: Phaser.GameObjects.Image;
	private botonNuevoTexto: Phaser.GameObjects.Text;
	private botonNuevoArea: Phaser.GameObjects.Zone;

	private botonGuardar: Phaser.GameObjects.Image;
	private botonGuardarTexto: Phaser.GameObjects.Text;
	private botonGuardarArea: Phaser.GameObjects.Zone;

	private botonExportar: Phaser.GameObjects.Image;
	private botonExportarTexto: Phaser.GameObjects.Text;
	private botonExportarArea: Phaser.GameObjects.Zone;

	private botonEjemplos: Phaser.GameObjects.Image;
	private botonEjemplosTexto: Phaser.GameObjects.Text;
	private botonEjemplosArea: Phaser.GameObjects.Zone;

	private botonAbrir: Phaser.GameObjects.Image;
	private botonAbrirTexto: Phaser.GameObjects.Text;
	private botonAbrirArea: Phaser.GameObjects.Zone;

	private botonImportar: Phaser.GameObjects.Image;
	private botonImportarTexto: Phaser.GameObjects.Text;
	private botonImportarArea: Phaser.GameObjects.Zone;
	private botonImportarFileChooser: Phaser.GameObjects.Rectangle;
	private botonImportarRexFileChooser: FileChooser;

	private containerMenu: Phaser.GameObjects.Container;
	private mostrandoMenu: boolean = false;
	constructor(private escena: Phaser.Scene) {
		this.crearBotonToggleMenu();
		this.crearBotones();
	}

	private crearBotonToggleMenu() {
		this.botonToggleMenu = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.botonToggleMenu.clearTint();
				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
				if (this.mostrandoMenu) {
					this.ocultarMenu();
				} else {
					this.mostrarMenu();
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, function () {
				this.setTint(0xb4caaf);
			})
			.on(Phaser.Input.Events.POINTER_OUT, function () {
				this.clearTint();
			});
		this.botonToggleMenu.setPosition(this.escena.cameras.main.width - this.botonToggleMenu.displayWidth, this.escena.cameras.main.centerY);
	}

	private crearBotones() {
		let posY = 0;
		this.botonVerEmitters = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Emitters)
			.setOrigin(0);
		this.botonVerEmittersTexto = this.escena.add.text(0, 0, 'Emitters', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonVerEmittersTexto, this.botonVerEmitters, 10);
		this.botonVerEmittersArea = this.escena.add.zone(0, posY, 225, this.botonVerEmitters.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonVerEmitters.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.escena.registry.events.emit(Eventos.EmittersVerMenu);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonVerEmitters.displayHeight + 25;
		this.botonImagenes = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Imagenes)
			.setVisible(false)
			.setOrigin(0);
		this.botonImagenesTexto = this.escena.add.text(0, 0, 'Imagenes', { fontFamily: 'monospace', fontSize: '32px' })
			.setVisible(false)
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonImagenesTexto, this.botonImagenes, 10);
		this.botonImagenesArea = this.escena.add.zone(0, posY, 225, this.botonImagenes.displayHeight)
					.setOrigin(0)
					.setVisible(false)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonImagenes.clearTint();
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});


		posY += this.botonImagenes.displayHeight + 75;
		this.botonNuevo = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Nuevo)
			.setOrigin(0);
		this.botonNuevoTexto = this.escena.add.text(0, 0, 'Nuevo', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonNuevoTexto, this.botonNuevo, 10);
		this.botonNuevoArea = this.escena.add.zone(0, posY, 225, this.botonNuevo.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonNuevo.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.escena.registry.events.emit(Eventos.MenuProyectoNuevo);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonNuevo.displayHeight + 25;
		this.botonGuardar = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Guardar)
			.setOrigin(0);
		this.botonGuardarTexto = this.escena.add.text(0, 0, 'Guardar', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonGuardarTexto, this.botonGuardar, 10);
		this.botonGuardarArea = this.escena.add.zone(0, posY, 225, this.botonGuardar.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonGuardar.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.escena.registry.events.emit(Eventos.MenuProyectoGuardar);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonGuardar.displayHeight + 25;
		this.botonExportar = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Exportar)
			.setOrigin(0);
		this.botonExportarTexto = this.escena.add.text(0, 0, 'Exportar', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonExportarTexto, this.botonExportar, 10);
		this.botonExportarArea = this.escena.add.zone(0, posY, 225, this.botonExportar.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonExportar.clearTint();
						this.escena.registry.events.emit(Eventos.MenuExportar);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonExportar.displayHeight + 75;
		this.botonEjemplos = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Ejemplo)
			.setOrigin(0);
		this.botonEjemplosTexto = this.escena.add.text(0, 0, 'Ejemplos', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonEjemplosTexto, this.botonEjemplos, 10);
		this.botonEjemplosArea = this.escena.add.zone(0, posY, 225, this.botonEjemplos.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonEjemplos.clearTint();
						// this.escena.registry.events.emit(Eventos.MenuAbrirEjemplos);
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						//FIXME: ARREGLAR EL PUNTERO DEL MOUSE
						// this.botonEjemplosArea.input.cursor = 'default';
						this.escena.scene.pause(PrincipalScene.Name);
						this.escena.registry.set(Variables.EscenaActual, EjemplosScene.Name); //NO se si sera necesario

						this.escena.scene.launch(EjemplosScene.Name);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonEjemplos.displayHeight + 25;
		this.botonAbrir = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Abrir)
			.setOrigin(0);
		this.botonAbrirTexto = this.escena.add.text(0, 0, 'Abrir', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonAbrirTexto, this.botonAbrir, 10);
		this.botonAbrirArea = this.escena.add.zone(0, posY, 225, this.botonAbrir.displayHeight)
					.setOrigin(0)
					.setInteractive({ useHandCursor: true })
					.on(Phaser.Input.Events.POINTER_UP, () => {
						this.botonAbrir.clearTint();
						UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
						this.escena.registry.events.emit(Eventos.MenuProyectoAbrir);
					})
					.on(Phaser.Input.Events.POINTER_MOVE, () => {

					})
					.on(Phaser.Input.Events.POINTER_OUT, () => {

					});

		posY += this.botonAbrir.displayHeight + 25;
		this.botonImportar = this.escena.add.image(0, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Importar)
			.setOrigin(0);
		this.botonImportarTexto = this.escena.add.text(0, 0, 'Importar', { fontFamily: 'monospace', fontSize: '32px' })
			.setOrigin(0, 0);
		Phaser.Display.Align.To.RightCenter(this.botonImportarTexto, this.botonImportar, 10);
		this.botonImportarArea = this.escena.add.zone(0, posY, 500, this.botonImportar.displayHeight)
					.setOrigin(0)
					// .setInteractive({ useHandCursor: true })
					// .on(Phaser.Input.Events.POINTER_MOVE, () => {
					// 	this.botonImportarArea.input.cursor = 'pointer';
					// })
					// .on(Phaser.Input.Events.POINTER_OUT, () => {
					// 	this.botonImportarArea.input.cursor = 'default';
					// })
					;

					// .setInteractive({ useHandCursor: true });
		// 			.on(Phaser.Input.Events.POINTER_UP, () => {
		// 				this.botonImportar.clearTint();
		// 				UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);

		// 				// (this.escena.plugins.get('rexFileChooser') as any).open()
		// 				// 	.then(result => {

		// 				// 		// const files = result.files;
		// 				// 		// if (files.length) {
		// 				// 		// 	console.log(files[0])
		// 				// 		// }
		// 				// 	});

		// 				// const fileChooser = new FileChooser( scene: this.escena, x: 1000, y: 250);
		// 				// this.escena.registry.events.emit(Eventos.MenuProyectoImportar);


		// 				// this.escena.plugins.get('rexfilechooserplugin').open({ accept: 'image/*' })
		// 				// 	.then(function (result) {
		// 				// 		var files = result.files;
		// 				// 		if (files.length) {
		// 				// 			console.log(files[0])
		// 				// 		}
		// 				// 	})
		// 			})
		// 			.on(Phaser.Input.Events.POINTER_MOVE, () => {

		// 			})
		// 			.on(Phaser.Input.Events.POINTER_OUT, () => {

		// 			});


		this.botonImportarFileChooser = this.escena.add.rectangle(0, posY, 250, this.botonImportar.displayHeight).setStrokeStyle(2, 0x7b5e57)
			.setOrigin(0, 0);
		this.botonImportarRexFileChooser = this.escena.add.rexFileChooser({
			accept: '.json'
		}).syncTo(this.botonImportarFileChooser)
			.setInteractive({ useHandCursor: true })
			.on('change', (res) => {
				if (res.files.length > 0) {
					const file = res.files[0];
					file.text().then(content => {
						const proyecto: IGuardarConfiguracionProyectos = JSON.parse(content);
						//Faltan muchas validaciones para el archivo JSON
						this.escena.registry.events.emit(Eventos.Importar, proyecto);
					});
				}
			});

		const background = this.escena.add.image(-10, -300, TexturasManuales.FondoTransparenteOscuro)
			.setDisplaySize(400, this.escena.cameras.main.displayHeight + 100)
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad2)

		this.containerMenu = this.escena.add.container(this.escena.cameras.main.displayWidth + 200, 200)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.containerMenu.add([background,
								this.botonVerEmitters, this.botonVerEmittersTexto, this.botonVerEmittersArea,
								this.botonImagenes, this.botonImagenesTexto, this.botonImagenesArea,
								this.botonNuevo, this.botonNuevoTexto, this.botonNuevoArea,
								this.botonGuardar, this.botonGuardarTexto, this.botonGuardarArea,
								this.botonExportar, this.botonExportarTexto, this.botonExportarArea,
								this.botonEjemplos, this.botonEjemplosTexto,this.botonEjemplosArea,
								this.botonAbrir, this.botonAbrirTexto,this.botonAbrirArea,
								this.botonImportar, this.botonImportarTexto, this.botonImportarFileChooser, this.botonImportarRexFileChooser,
								this.botonImportarArea
							]);
	}

	private mostrarMenu() {
		this.mostrandoMenu = true;
		this.escena.add.tween({
			targets: this.botonToggleMenu,
			// y: 150,
			x: this.botonToggleMenu.x - 320,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
			onComplete: () => {
				this.botonToggleMenu.setTexture(AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente);
			}
		});

		this.escena.add.tween({
			targets: this.containerMenu,
			// y: 150,
			x: this.escena.cameras.main.displayWidth - 300,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
		});
	}

	private ocultarMenu() {
		this.mostrandoMenu = false;
		this.escena.add.tween({
			targets: this.botonToggleMenu,
			// y: 150,
			x: this.botonToggleMenu.x + 320,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
			onComplete: () => {
				this.botonToggleMenu.setTexture(AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior);
			}
		});

		this.escena.add.tween({
			targets: this.containerMenu,
			// y: 150,
			x: this.escena.cameras.main.displayWidth + 300,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
		});
	}

	public showButtonMenu(conEfecto: boolean = false) {
		this.botonToggleMenu.setFrame(AtlasBotonesImagenes.Anterior);
		this.botonToggleMenu.setPosition(this.escena.cameras.main.width - this.botonToggleMenu.displayWidth + (conEfecto ? 320 : 0), this.escena.cameras.main.centerY);
		this.botonToggleMenu.setVisible(true);
		if (conEfecto) {
			this.escena.add.tween({
				targets: this.botonToggleMenu,
				x: this.escena.cameras.main.displayWidth - this.botonToggleMenu.displayWidth,
				ease: 'Cubic',
				duration: 500
			});
		}
	}

	public hideFullMenu() {
		this.botonToggleMenu.setVisible(false);
		if (this.mostrandoMenu) {
			this.mostrandoMenu = false;
			this.containerMenu.setPosition(this.escena.cameras.main.displayWidth + 300, this.containerMenu.y);
			this.botonToggleMenu.setPosition(this.botonToggleMenu.x + 320, this.botonToggleMenu.y);
		}
	}

	public showFullMenu() {
		this.mostrandoMenu = true;
		this.botonToggleMenu.setFrame(AtlasBotonesImagenes.Siguiente);
		this.botonToggleMenu.setVisible(true);
		this.containerMenu.setPosition(this.escena.cameras.main.displayWidth - 300, this.containerMenu.y);
		this.botonToggleMenu.setPosition(this.botonToggleMenu.x - 320, this.botonToggleMenu.y);
	}

}