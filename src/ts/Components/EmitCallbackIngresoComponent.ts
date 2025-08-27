import InputText from "phaser3-rex-plugins/plugins/gameobjects/dom/inputtext/InputText";
import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { UtilSonido } from "../Utilidades/UtilSonido";

export class EmitCallbackIngresoComponent {

	private background: Phaser.GameObjects.Image;
	private cerrar: Phaser.GameObjects.Image;
	private mostrando = false;
	private titulo: Phaser.GameObjects.Text;
	private validacionTextoEmitCallback: Phaser.GameObjects.Text;
	private emitCallbackTextBox: InputText;
	private botonAceptar: Phaser.GameObjects.Image;
	private botonAceptaTexto: Phaser.GameObjects.Text;

	constructor(private escena: Phaser.Scene) {	}

	public show(valorActualEmitCallback: string) {
		if (this.mostrando) return;
		this.mostrando = true;
		this.background = this.escena.add.image(this.escena.cameras.main.centerX, this.escena.cameras.main.centerY, TexturasManuales.FondoTransparenteOscuro)
				.setDisplaySize(800, 600)
				.setDepth(ManejarDepthMainGame.profundidad2);
		this.cerrar = this.escena.add.image(this.background.x + (this.background.displayWidth / 2), this.background.y - (this.background.displayHeight / 2), AtlasImagenes.Botones, AtlasBotonesImagenes.Cerrar)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					this.cerrar.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					this.cerrar.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					this.hide();
				});
		const posX = this.background.x - (this.background.displayWidth / 2) + 20;
		let posY = this.background.y - (this.background.displayHeight / 2) + 20;
		this.titulo = this.escena.add.text(posX, posY, `EmitCallback: (particle, emitter)`, { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 55;
		this.emitCallbackTextBox = this.escena.add.rexInputText(posX, posY, 750, 430, {
			text: valorActualEmitCallback,
			fontSize: '24px',
			paddingLeft: '10px',
			color: '#ffffff',
			backgroundColor: '#000000',
			border: 1,
			borderColor: '#00ff99',
			borderRadius: '10px',
			inputType: 'textarea',
		})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 435;
		this.validacionTextoEmitCallback = this.escena.add.text(posX + 3, posY, '', { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		this.botonAceptar = this.escena.add.image(0, 0, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				// .setOrigin(0)
				.setDisplaySize(190, 60)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					this.botonAceptar.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					this.botonAceptar.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					this.guardar();
					// this.hide();
				});
		this.botonAceptar.setPosition(this.background.x + (this.background.displayWidth / 2) - (this.botonAceptar.displayWidth / 2) - 20, this.background.y + (this.background.displayHeight / 2) - (this.botonAceptar.displayHeight / 2) - 20);
		this.botonAceptaTexto = this.escena.add.text(0, 0, `Aceptar`, { fontFamily: 'monospace', fontSize: '36px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		Phaser.Display.Align.In.Center(this.botonAceptaTexto, this.botonAceptar);
	}


	private guardar() {
		this.validacionTextoEmitCallback.setText('');
		const emitCallbackFormula = this.emitCallbackTextBox.text.trim();
		if (emitCallbackFormula && !this.validarFormula(emitCallbackFormula)) {
			this.validacionTextoEmitCallback.setText('❌ Fórmula inválida');
			return;
		} else if (!emitCallbackFormula) {
			this.escena.registry.events.emit(Eventos.EmitterEmitCallbackGrabar, emitCallbackFormula)
			this.validacionTextoEmitCallback.setText('⚠️ Se omite fórmula.');
		} else {
			this.escena.registry.events.emit(Eventos.EmitterEmitCallbackGrabar, emitCallbackFormula)
			this.validacionTextoEmitCallback.setText('✔️ Fórmula válida.');
		}
	}

	private validarFormula(strFormula: string): boolean {
		try {
			const parametros = ['particle', 'emitter'];
			const func = new Function(
				...parametros,
				strFormula
			);
			// const mockParticle = { lifeT: 0.5 };
			const mockParticle = {
				accelerationX: 0,
				accelerationY: 0,
				alpha: 1,
				angle: 0,
				bounce: 0,
				life: 5000,
				lifeCurrent: 5000,
				lifeT: 0,
				maxVelocityX: 10000,
				maxVelocityY: 10000,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				velocityX: 0,
				velocityY: 0,
				x: 0,
				y: 0,
				worldPosition: { x: 0, y: 0 },
			};
			const mockEmitter = {
				acceleration: false,
				active: true,
				config: {
				frame: "star-1",
				frequency: 10,
				gravityX: 0,
				gravityY: 180,
				lifespan: 4500,
				quantity: 4,
				rotate: {start: 0, end: 360},
				scale: {start: 0.5, end: 1},
				sortOrderAsc: false,
				speedX: {min: -500, max: 500},
				speedY: {min: -500, max: 500},
				},
				frequency: 10,
				gravityX: 0,
				gravityY: 180,
				ignoreDestroy: false,
				maxAliveParticles: 0,
				maxParticles: 0,
				moveTo: false,
				particleBringToTop: true,
				renderFlags: 15,
				state: 0,
				stopAfter: 0,
				timeScale: 1,
				tintFill: false,
				trackVisible: false,
				w: 0,
				x: 1024,
				y: 576,
				z: 0,
				_depth: -1
			}
			const result = func(mockParticle, mockEmitter);
			return true;
		} catch (e) {
			return false;
		}
	}

	public get isShowing() {
		return this.mostrando;
	}

	public hide() {
		this.background.destroy();
		this.cerrar.destroy();
		this.titulo.destroy();
		this.emitCallbackTextBox.destroy();
		this.botonAceptar.destroy();
		this.botonAceptaTexto.destroy();
		this.validacionTextoEmitCallback.destroy();
		this.mostrando = false;
		this.escena.registry.events.emit(Eventos.MenuMostrar, true);
	}
}
