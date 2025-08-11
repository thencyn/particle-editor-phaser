import InputText from "phaser3-rex-plugins/plugins/gameobjects/dom/inputtext/InputText";
import { AtlasBotonesImagenes, AtlasImagenes, Eventos, ManejarDepthMainGame, Sonidos, TexturasManuales } from "../Utilidades/Diccionario";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { IAdvancedFormula, propiedadesAdvancedFormulaArray, typePropiedadesAdvancedFormula } from "../Utilidades/Interfaces";

export class PropiedadesIngresoAvanzadoComponent {

	private background: Phaser.GameObjects.Image;
	private cerrar: Phaser.GameObjects.Image;
	private botonPropiedadSiguiente: Phaser.GameObjects.Image;
	private botonPropiedadAnterior: Phaser.GameObjects.Image;
	private mostrando = false;
	private titulo: Phaser.GameObjects.Text;
	private propiedadNombre: Phaser.GameObjects.Text;
	private textoOnEmit: Phaser.GameObjects.Text;
	private validacionTextoOnEmit: Phaser.GameObjects.Text;
	private textoOnUpdate: Phaser.GameObjects.Text;
	private validacionTextoOnUpdate: Phaser.GameObjects.Text;
	private onEmitTextBox: InputText;
	private onUpdateTextBox: InputText;
	private botonAceptar: Phaser.GameObjects.Image;
	private botonAceptaTexto: Phaser.GameObjects.Text;
	private propiedadSeleccionada: string;
	private listaPropiedadesFunction: IAdvancedFormula[];
	// private COLOR_PRIMARY = 0x004e2b;
	// private COLOR_LIGHT = 0xa8a24f;
	// private COLOR_DARK = 0x001c0f;

	constructor(private escena: Phaser.Scene) {	}

	public show(propiedad: string, valorActualOnEmit: string, valorActualOnUpdate: string, listaPropiedadesFunction: IAdvancedFormula[]) {
		if (this.mostrando) return;
		this.mostrando = true;
		this.propiedadSeleccionada = propiedad;
		this.listaPropiedadesFunction = listaPropiedadesFunction;
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
		const posY = this.background.y - (this.background.displayHeight / 2) + 20;
		this.titulo = this.escena.add.text(posX, posY, `Propiedad:`, { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.propiedadNombre = this.escena.add.text(posX + 280, posY, `${propiedad}`, { fontFamily: 'monospace', fontSize: '40px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.botonPropiedadAnterior = this.escena.add.image(posX + 230, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Anterior)
				.setOrigin(0)
				.setScale(0.65)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					this.botonPropiedadAnterior.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					this.botonPropiedadAnterior.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					const index = propiedadesAdvancedFormulaArray.indexOf(this.propiedadSeleccionada);
					if (index > 0) {
						this.propiedadSeleccionada = propiedadesAdvancedFormulaArray[index - 1];
					} else {
						this.propiedadSeleccionada = propiedadesAdvancedFormulaArray[propiedadesAdvancedFormulaArray.length - 1];
					}
					this.propiedadNombre.setText(this.propiedadSeleccionada);
					this.botonPropiedadSiguiente.setPosition(this.propiedadNombre.x +  this.propiedadNombre.displayWidth + 10, posY);
					this.validacionTextoOnEmit.setText('');
					this.validacionTextoOnUpdate.setText('');
					this.leerPropiedades();
				});
		this.botonPropiedadSiguiente = this.escena.add.image(this.propiedadNombre.x +  this.propiedadNombre.displayWidth + 10, posY, AtlasImagenes.Botones, AtlasBotonesImagenes.Siguiente)
				.setOrigin(0)
				.setScale(0.65)
				.setInteractive({ useHandCursor: true })
				.setDepth(ManejarDepthMainGame.profundidad3)
				.on(Phaser.Input.Events.POINTER_MOVE, () => {
					this.botonPropiedadSiguiente.setTint(0x66caff);
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					this.botonPropiedadSiguiente.clearTint();
				})
				.on(Phaser.Input.Events.POINTER_UP, () => {
					UtilSonido.reproducirSonidoEfecto(this.escena, Sonidos.ApretarBoton);
					const index = propiedadesAdvancedFormulaArray.indexOf(this.propiedadSeleccionada);
					if (index < propiedadesAdvancedFormulaArray.length - 1) {
						this.propiedadSeleccionada = propiedadesAdvancedFormulaArray[index + 1];
					} else {
						this.propiedadSeleccionada = propiedadesAdvancedFormulaArray[0];
					}
					this.propiedadNombre.setText(this.propiedadSeleccionada);
					this.botonPropiedadSiguiente.setPosition(this.propiedadNombre.x +  this.propiedadNombre.displayWidth + 10, posY);
					this.validacionTextoOnEmit.setText('');
					this.validacionTextoOnUpdate.setText('');
					this.leerPropiedades();
				});
		// this.escena.rexUI.add.simpleDropDownList(this.crearEstiloDropDown())
        //     // .resetDisplayContent('-- Select --')
		// 	.setOrigin(0)
        //     .setOptions(propiedadesAdvancedFormulaArray.map(p => ({ text: p, value: p })))
		// 	.setValue(propiedad)
        //     .setPosition(posX + 200, posY)
		// 	.setDepth(ManejarDepthMainGame.profundidad7)
        //     .layout();

		this.textoOnEmit = this.escena.add.text(posX, posY + 75, `onEmit: (particle, key, value)`, { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.onEmitTextBox = this.escena.add.rexInputText(posX, posY + 110, 750, 120, {
			text: valorActualOnEmit,
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
		this.validacionTextoOnEmit = this.escena.add.text(posX + 3, posY + 235, '', { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);

		this.textoOnUpdate = this.escena.add.text(posX, posY + 270, `onUpdate: (particle, key, t, value)`, { fontFamily: 'monospace', fontSize: '28px', align: 'center', color: '#ffffff', fontStyle: 'bold' })
			.setOrigin(0)
			.setDepth(ManejarDepthMainGame.profundidad3);
		this.onUpdateTextBox = this.escena.add.rexInputText(posX, posY + 305, 750, 180, {
			text: valorActualOnUpdate,
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
		this.validacionTextoOnUpdate = this.escena.add.text(posX + 3, posY + 495, '', { fontFamily: 'monospace', fontSize: '20px', align: 'center', color: '#ffffff' })
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
		this.leerPropiedades();
	}

	// private crearEstiloDropDown() {
	// 	return {
    //         label: {
    //             space: { left: 10, right: 10, top: 10, bottom: 10 },
    //             background: {
    //                 color: this.COLOR_PRIMARY
    //             },
    //             text: {
    //                 fixedWidth: 150
    //             },
    //         },

    //         button: {
    //             space: { left: 10, right: 10, top: 10, bottom: 10 },
    //             background: {
    //                 color: this.COLOR_DARK,
    //                 strokeWidth: 0,
    //                 'hover.strokeColor': 0xffffff,
    //                 'hover.strokeWidth': 2,
    //             },
    //             text: {
    //                 fontSize: 20
    //             },
    //         }
    //     }
	// }

	private leerPropiedades() {
		const propiedadesFunction = this.listaPropiedadesFunction.find(x => x.propiedadFormula === this.propiedadSeleccionada);
		this.onEmitTextBox.text = propiedadesFunction?.onEmitFormula || '';
		this.onUpdateTextBox.text = propiedadesFunction?.onUpdateFormula || '';
	}

	private guardar() {
		this.validacionTextoOnEmit.setText('');
		this.validacionTextoOnUpdate.setText('');
		const onEmitFormula = this.onEmitTextBox.text.trim();
		let flagInvalidas = false;
		if (onEmitFormula && !this.validarFormula(onEmitFormula, 'onEmit')) {
			// alert('❌ La fórmula de onEmit no es válida. Debe devolver un número finito.');
			this.validacionTextoOnEmit.setText('❌ Fórmula inválida. Debe devolver un número finito.');
			flagInvalidas = true;
		} else if (!onEmitFormula) {
			this.validacionTextoOnEmit.setText('⚠️ Se omite fórmula para onEmit.');
		} else {
			this.validacionTextoOnEmit.setText('✔️ Fórmula válida.');
		}

		const onUpdateFormula = this.onUpdateTextBox.text.trim();
		if (onUpdateFormula && !this.validarFormula(onUpdateFormula, 'onUpdate')) {
			// alert('❌ La fórmula de onUpdate no es válida. Debe devolver un número finito.');
			this.validacionTextoOnUpdate.setText('❌ Fórmula inválida. Debe devolver un número finito.');
			flagInvalidas = true;
		} else if (!onUpdateFormula) {
			this.validacionTextoOnUpdate.setText('⚠️ Se omite fórmula para onUpdate.');
		} else {
			this.validacionTextoOnUpdate.setText('✔️ Fórmula válida.');
		}

		if (flagInvalidas) return;


		let propiedadesFunction = this.listaPropiedadesFunction.find(x => x.propiedadFormula === this.propiedadSeleccionada);
		//Esto funciona porque esta por parametro (como todo en javascript)
		if (!propiedadesFunction) {
			propiedadesFunction = {
				propiedadFormula: this.propiedadSeleccionada as typePropiedadesAdvancedFormula,
				onEmitFormula,
				onUpdateFormula
			};
			this.listaPropiedadesFunction.push(propiedadesFunction);
		} else {
			propiedadesFunction.onEmitFormula = onEmitFormula;
			propiedadesFunction.onUpdateFormula = onUpdateFormula;
		}
		this.escena.registry.events.emit(Eventos.FormulasAvanzadasGuardar, this.propiedadSeleccionada);
		// alert('✔️ Fórmulas guardadas correctamente. ✅');
		// this.hide();
	}

	private validarFormula(strFormula: string, tipo: 'onEmit' | 'onUpdate'): boolean {
		try {
			const parametros = tipo === 'onEmit' ? ['particle', 'key', 'value'] : ['particle', 'key', 't', 'value'];
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
			const result = tipo === 'onEmit' ? func(mockParticle, 'scaleX', undefined) : func(mockParticle, 'scaleX', 0.5, 1);
			return typeof result === 'number' && isFinite(result);
		} catch (e) {
			return false;
		}
	}

	public isShowing() {
		return this.mostrando;
	}

	private hide() {
		this.background.destroy();
		this.cerrar.destroy();
		this.titulo.destroy();
		this.propiedadNombre.destroy();
		this.textoOnEmit.destroy();
		this.textoOnUpdate.destroy();
		this.onEmitTextBox.destroy();
		this.onUpdateTextBox.destroy();
		this.botonAceptar.destroy();
		this.botonAceptaTexto.destroy();
		this.botonPropiedadAnterior.destroy();
		this.botonPropiedadSiguiente.destroy();
		this.validacionTextoOnEmit.destroy();
		this.validacionTextoOnUpdate.destroy();
		this.mostrando = false;
		this.escena.registry.events.emit(Eventos.MenuMostrar, true);
	}
}
