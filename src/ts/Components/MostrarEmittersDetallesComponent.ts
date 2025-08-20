import InputText from "phaser3-rex-plugins/plugins/inputtext";
import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { IDestroyable, IMovimiento, LISTA_EASES, propiedadesAdvancedFormulaArray } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";

export class MostrarEmittersDetallesComponent implements IDestroyable {
	private botonToggleEmitters: Phaser.GameObjects.Image;
	private background: Phaser.GameObjects.Image;
	private botonAtras: Phaser.GameObjects.Image;
	private titulo: Phaser.GameObjects.Text;
	private movimientoContainer: Phaser.GameObjects.Container;
	private indexEmitter: number;

	constructor(private escena: Phaser.Scene) {

	}

	private crearObjetos(indexEmitter: number) {
		this.indexEmitter = indexEmitter;
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

		this.titulo = this.escena.add.text(this.escena.cameras.main.displayWidth - 215, 40, `Emitter ${indexEmitter + 1}`, { fontFamily: 'monospace', fontSize: '36px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
	}

	private crearObjetosMovimiento(movimiento?: IMovimiento) {
		let posY = 0;
		const movimientoSwitch = this.escena.rexUI.add.toggleSwitch(0, posY - 15, 60, 60, 0x039be5)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setValue(movimiento?.movimientoActivado ?? false)
					.on('valuechange', (newValue) => {

					});
		const titulo = this.escena.add.text(75, posY, `Movimiento`, { fontFamily: 'monospace', fontSize: '32px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 50;
		const yoyoTexto = this.escena.add.text(0, posY, `Yoyo:`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const yoyoSwitch = this.escena.rexUI.add.toggleSwitch(yoyoTexto.displayWidth + 5, posY - 10, 40, 40, 0x039be5)
					.setOrigin(0)
					.setDepth(ManejarDepthMainGame.profundidad3)
					.setValue(movimiento?.yoyo ?? false)
					.on('valuechange', (newValue) => { });
		const inputRepeatTexto = this.escena.add.text(125, posY, `Repeat:`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputRepeatTextBox = this.escena.add.rexInputText(220, posY, 60, 26, { text: `${movimiento?.repeat ?? '-1'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 2, })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (inputText.text !== '-' && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				} else if (inputText.text.startsWith('-') && inputText.text.length === 2) {
					inputText.text = '-1';
				}
			});

		posY += 35;
		const inputPosX = this.escena.add.text(150, posY, `X`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputPosY = this.escena.add.text(235, posY, `Y`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 25;
		const inputPosPoint = this.escena.add.text(0, posY, `Point`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputPosPointX = this.escena.add.rexInputText(125, posY, 60, 26, { text: `${movimiento?.xPoint ?? '0'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (inputText.text !== '-' && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});
		const inputPosPointY = this.escena.add.rexInputText(215, posY, 60, 26, { text: `${movimiento?.yPoint ?? '0'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 4 })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (inputText.text !== '-' && !/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		posY += 35;
		const inputPosDuration = this.escena.add.text(0, posY, `Duration`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputPosDurationX = this.escena.add.rexInputText(125, posY, 60, 26, { text: `${movimiento?.xDuration ?? '5000'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 5 })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});
		const inputPosDurationY = this.escena.add.rexInputText(215, posY, 60, 26, { text: `${movimiento?.yDuration ?? '5000'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 5 })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3)
			.on('textchange', (inputText: InputText, e) => {
				inputText.text = inputText.text.trim()
				if (!/^-?\d+(\.\d+)?$/.test(inputText.text)) {
					inputText.text = '';
				}
			});

		posY += 35;
		const inputPosEase = this.escena.add.text(0, posY, `Ease`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputPosEaseX = this.escena.add.rexInputText(115, posY, 80, 26, { text: `${movimiento?.xEase ?? 'Linear'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 20, autoComplete: 'off' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		const inputPosEaseY = this.escena.add.rexInputText(205, posY, 80, 26, { text: `${movimiento?.yEase ?? 'Linear'}`, fontSize: '16px', paddingLeft: '10px', color: '#ffffff', backgroundColor: '#000000', border: 1, borderColor: '#00ff99', borderRadius: '10px', maxLength: 20, autoComplete: 'off' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		posY += 35;
		const inputPosActivar = this.escena.add.text(0, posY, `Activar`, { fontFamily: 'monospace', fontSize: '24px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		const inputPosActivarX = this.escena.rexUI.add.toggleSwitch(135, posY -10, 40, 40, 0x039be5)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setValue(movimiento?.xActivar ?? false)
				.on('valuechange', (newValue) => { });
		const inputPosActivarY = this.escena.rexUI.add.toggleSwitch(225, posY - 10, 40, 40, 0x039be5)
				.setOrigin(0)
				.setDepth(ManejarDepthMainGame.profundidad3)
				.setValue(movimiento?.yActivar ?? false)
				.on('valuechange', (newValue) => { });

		posY += 35;
		const validacion = this.escena.add.text(0, posY, '', { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		posY += 35;
		const botonGuardar = this.escena.add.image(140, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Boton)
				.setOrigin(0)
				.setDisplaySize(150, 50)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					botonGuardar.clearTint();
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.Menu);
					if (movimientoSwitch.value) {
						if (inputRepeatTextBox.text === '' || inputRepeatTextBox.text === '-') {
							validacion.setText('❌ Repeat inválido.');
							return;
						}
						if (!inputPosActivarX.value && !inputPosActivarY.value) {
							validacion.setText('❌ Debe activar un mvto.');
							return;
						}
						if (inputPosActivarX.value) {
							if (inputPosPointX.text === '' || inputPosPointX.text === '-') {
								validacion.setText('❌ Point X inválido.');
								return;
							}
							if (inputPosDurationX.text === '') {
								validacion.setText('❌ Duration X inválido.');
								return;
							}
							if (inputPosEaseX.text) {
								const index = LISTA_EASES.findIndex(x => x.toUpperCase() === inputPosEaseX.text.toUpperCase());
								if (index === -1) {
									validacion.setText('❌ Ease X inválido.');
									return;
								} else {
									inputPosEaseX.text = LISTA_EASES[index];
								}
							}
						}

						if (inputPosActivarY.value) {
							if (inputPosPointY.text === '' || inputPosPointY.text === '-') {
								validacion.setText('❌ Point Y inválido.');
								return;
							}
							if (inputPosDurationY.text === '') {
								validacion.setText('❌ Duration Y inválido.');
								return;
							}
							if (inputPosEaseY.text) {
								const index = LISTA_EASES.findIndex(x => x.toUpperCase() === inputPosEaseY.text.toUpperCase());
								if (index === -1) {
									validacion.setText('❌ Ease Y inválido.');
									return;
								} else {
									inputPosEaseY.text = LISTA_EASES[index];
								}
							}
						}
					}
					validacion.setText('✔️ Validación exitosa.');
					const movimiento: IMovimiento = {
						movimientoActivado: movimientoSwitch.value,
						yoyo: yoyoSwitch.value,
						repeat: +inputRepeatTextBox.text,
						xPoint: inputPosPointX.text ? +inputPosPointX.text : null,
						yPoint: inputPosPointY.text ? +inputPosPointY.text : null,
						xDuration: +inputPosDurationX.text,
						yDuration: +inputPosDurationY.text,
						xEase: inputPosEaseX.text,
						yEase: inputPosEaseY.text,
						xActivar: inputPosActivarX.value,
						yActivar: inputPosActivarY.value
					};
					this.escena.registry.events.emit(Eventos.EmitterMovimientoGuardar, this.indexEmitter, movimiento);
				})
				.on(Phaser.Input.Events.POINTER_MOVE, function () {
					this.setTint(0xb4caaf);
				})
				.on(Phaser.Input.Events.POINTER_OUT, function () {
					this.clearTint();
				});
		const botonGuardarTexto = this.escena.add.text(0, 0, 'Guardar', {
				fontFamily: "Inter-Black", fontSize: 32, fontStyle: 'bold', color: '#ffffff', align: 'center'
			})
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		botonGuardarTexto.setPosition(botonGuardar.x + (botonGuardar.displayWidth / 2) - (botonGuardarTexto.displayWidth / 2), botonGuardar.y + (botonGuardar.displayHeight / 2) - (botonGuardarTexto.displayHeight / 2));
		posY += 60;
		const graphics = this.escena.add.graphics().setDepth(-1);
		graphics.lineStyle(4, 0x000000, 1);
		graphics.strokeLineShape(new Phaser.Geom.Line(0, posY, 400, posY));

		this.movimientoContainer = this.escena.add.container(this.escena.cameras.main.displayWidth - 300, 120, [movimientoSwitch, titulo, yoyoTexto, yoyoSwitch, inputRepeatTexto, inputRepeatTextBox,
							inputPosX, inputPosY, inputPosPoint, inputPosDuration, inputPosEase, inputPosActivar,
							inputPosPointX, inputPosPointY, inputPosDurationX, inputPosDurationY, inputPosEaseX, inputPosEaseY, inputPosActivarX, inputPosActivarY, botonGuardar, botonGuardarTexto, graphics, validacion
						])
				.setDepth(ManejarDepthMainGame.profundidad3);
	}

	public show(indexEmitter: number, movimiento: IMovimiento) {
		this.crearObjetos(indexEmitter);
		this.crearObjetosMovimiento(movimiento);
	}

	private hide() {
		this.botonToggleEmitters.removeInteractive();
		const listaDestinos = [this.botonToggleEmitters.x + 320, this.background.x + 300, this.botonAtras.x + 300, this.titulo.x + 300, this.movimientoContainer.x + 300];
		this.escena.add.tween({
			targets: [this.botonToggleEmitters, this.background, this.botonAtras, this.titulo, this.movimientoContainer],
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
				this.movimientoContainer.destroy();
				this.escena.registry.events.emit(Eventos.MenuMostrar, true);
			}
		});
	}

	public destroy() {
		this.botonToggleEmitters.destroy();
		this.background.destroy();
		this.botonAtras.destroy();
		this.titulo.destroy();
		this.movimientoContainer.destroy();
		this.escena.registry.events.emit(Eventos.EmittersVerMenu, false);
	}
}