import InputText from "phaser3-rex-plugins/plugins/gameobjects/dom/inputtext/InputText";
import { AtlasBotonesImagenes, AtlasImagenes, AtlasParticulas, Eventos, Imagenes, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IConfiguracionEmitter, IDestroyable, IImagenBackground } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { UtilProyectos } from "../Utilidades/UtilProyectos";

export class ProyectoGuardarComponent implements IDestroyable {
	private botonToggleGuardar: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private botonGuardar: Phaser.GameObjects.Image;
	private botonGuardarTexto: Phaser.GameObjects.Text;
	private botonGuardarComo: Phaser.GameObjects.Image;
	private botonGuardarComoTexto: Phaser.GameObjects.Text;
	private background: Phaser.GameObjects.Image;
	private nombreProyectoText: InputText;
	private tituloTexto: Phaser.GameObjects.Text;
	private idTexto: Phaser.GameObjects.Text;
	constructor(private escena: Phaser.Scene) {

	}

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

	public show(listaEmitters: IConfiguracionEmitter[], id?: number, nombreProyecto: string = 'Proyecto 1', listaImagenesBackground: IImagenBackground[] = null) {
		this.crearBotonToggleMenu();
		this.crearBotonAtras();
		let posY = 150;
		this.tituloTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 275, posY, 'Proyecto Id: ', {
				fontFamily: "Inter-Black", fontSize: 24, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 25;
		this.idTexto = this.escena.add.text(this.escena.cameras.main.displayWidth - 250, posY, `${id ? id : '--Sin Id--'}`, {
				fontFamily: "Inter-Black", fontSize: 24, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 50;
		this.nombreProyectoText = this.escena.add.rexInputText(this.escena.cameras.main.displayWidth - 275, posY, 250, 60, {
			text: nombreProyecto,
			fontSize: '24px',
			paddingLeft: '10px',
			color: '#ffffff',
			backgroundColor: '#000000',
			border: 1,
			borderColor: '#00ff99',
			borderRadius: '10px',
		})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 75;
		this.botonGuardar = this.escena.add.image(this.escena.cameras.main.displayWidth - 275, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setOrigin(0)
				.setDisplaySize(250, 60)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonGuardar.removeInteractive();
					this.botonGuardar.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					const proyectoGuardado = UtilProyectos.guardarProyecto(this.nombreProyectoText.text, listaEmitters, id, listaImagenesBackground);
					this.escena.registry.events.emit(Eventos.ProyectoGuardado, proyectoGuardado);
					this.hide();
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		this.botonGuardarTexto = this.escena.add.text(0, 0, 'Guardar', {
				fontFamily: "Inter-Black", fontSize: 44, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.botonGuardarTexto.setPosition(this.botonGuardar.x + (this.botonGuardar.displayWidth / 2) - (this.botonGuardarTexto.displayWidth / 2), this.botonGuardar.y + (this.botonGuardar.displayHeight / 2) - (this.botonGuardarTexto.displayHeight / 2));

		posY += 125;
		this.botonGuardarComo = this.escena.add.image(this.escena.cameras.main.displayWidth - 275, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setOrigin(0)
				.setDisplaySize(250, 60)
				.setVisible(!!id)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					this.botonGuardarComo.removeInteractive();
					this.botonGuardarComo.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					const proyectoGuardado = UtilProyectos.guardarProyecto(this.nombreProyectoText.text, listaEmitters, null, listaImagenesBackground);
					this.escena.registry.events.emit(Eventos.ProyectoGuardado, proyectoGuardado);
					this.hide();
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		this.botonGuardarComoTexto = this.escena.add.text(0, 0, 'Guardar Como', {
				fontFamily: "Inter-Black", fontSize: 32, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setOrigin(0)
			.setVisible(!!id)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.botonGuardarComoTexto.setPosition(this.botonGuardarComo.x + (this.botonGuardarComo.displayWidth / 2) - (this.botonGuardarComoTexto.displayWidth / 2), this.botonGuardarComo.y + (this.botonGuardarComo.displayHeight / 2) - (this.botonGuardarComoTexto.displayHeight / 2));
	}

	private hide() {
		this.botonToggleGuardar.removeInteractive();
		const listaDestinos = [this.botonToggleGuardar.x + 320, this.background.x + 300, this.botonAtras.x + 300, this.botonGuardar.x + 300, this.botonGuardarTexto.x + 300, this.nombreProyectoText.x + 300, this.tituloTexto.x + 300, this.idTexto.x + 300, this.botonGuardarComo.x + 300, this.botonGuardarComoTexto.x + 300];
		this.escena.add.tween({
			targets: [this.botonToggleGuardar, this.background, this.botonAtras, this.botonGuardar, this.botonGuardarTexto, this.nombreProyectoText, this.tituloTexto, this.idTexto, this.botonGuardarComo, this.botonGuardarComoTexto],
			x: {
				getEnd: (target, key, value, indexTweens) => {
					return listaDestinos[indexTweens];
				}
			},
			ease: 'Cubic',
			onComplete: () => {
				this.botonToggleGuardar.destroy();
				this.botonAtras.destroy();
				this.botonGuardar.destroy();
				this.botonGuardarTexto.destroy();
				this.botonGuardarComo.destroy();
				this.botonGuardarComoTexto.destroy();
				this.background.destroy();
				this.nombreProyectoText.destroy();
				this.tituloTexto.destroy();
				this.idTexto.destroy();
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleGuardar.destroy();
		this.botonAtras.destroy();
		this.botonGuardar.destroy();
		this.botonGuardarTexto.destroy();
		this.botonGuardarComo.destroy();
		this.botonGuardarComoTexto.destroy();
		this.background.destroy();
		this.nombreProyectoText.destroy();
		this.tituloTexto.destroy();
		this.idTexto.destroy();
		this.escena.registry.events.emit(Eventos.MenuMostrar, false);
	}


}