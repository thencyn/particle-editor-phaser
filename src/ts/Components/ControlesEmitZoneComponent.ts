import Phaser from "phaser";

export class ControlesEmitZoneComponent extends Phaser.Events.EventEmitter {
	private valor: { quantity?: number, total?: number, yoyo?: boolean };
	public container: Phaser.GameObjects.Container;
	constructor(private escena: Phaser.Scene, quantity: number, total: number, yoyo: boolean = false) {
		super();
		this.valor = { quantity, total, yoyo };
		this.container = this.escena.add.container(0, 0);
		this.crearControles();
	}

	private setValor(nuevoValor: { quantity?: number, total?: number, yoyo?: boolean }) {
		this.valor = nuevoValor;
		this.emit("valorCambiado", this.valor);
	}

	getValor() {
		return this.valor;
	}


	private crearControles()  {
		let inicializacion = true;
		const config = {
			quantityMin: 1,
			quantityMax: 250,
			quantityRange: 250 - 1,
			quantityGap: 1,
			totalMin: 1,
			totalMax: 250,
			totalRange: 250 - 1,
			totalGap: 1,
		};

		let quantityValue = null;
		let totalValue = null;
		const quantityTexto = this.escena.add.text(210, 5, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				quantityValue++;
				quantitySlider.setValue(quantityValue, config.quantityMin, config.quantityMax);
				quantityTexto.text = `Qua: ${quantityValue}`;
				this.setValor({ quantity: quantityValue, total: totalValue, yoyo: yoyoToggleSwitch.value });
			});
		const quantitySlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 0,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.quantityRange) + config.quantityMin);
				quantityTexto.text = `Qua: ${value}`;
				quantityValue = value;
				if (!inicializacion) {
					this.setValor({ quantity: quantityValue, total: totalValue, yoyo: yoyoToggleSwitch.value });
				}
			},
			gap: config.quantityGap / config.quantityRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(this.valor.quantity, config.quantityMin, config.quantityMax)
		.layout();

		const totalTexto = this.escena.add.text(210, 35, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				totalValue++;
				totalSlider.setValue(totalValue, config.totalMin, config.totalMax);
				totalTexto.text = `Tot: ${totalValue}`;
				this.setValor({ quantity: quantityValue, total: totalValue, yoyo: yoyoToggleSwitch.value });
			});
		const totalSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 30,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.totalRange) + config.totalMin);
				totalTexto.text = `Tot: ${value}`;
				totalValue = value;
				if (!inicializacion) {
					this.setValor({ quantity: quantityValue, total: totalValue, yoyo: yoyoToggleSwitch.value });
				}
			},
			gap: config.totalGap / config.totalRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(this.valor.total, config.totalMin, config.totalMax)
		.layout();

		const yoyoToggleSwitch = this.escena.rexUI.add.toggleSwitch(0, 55, 40, 40, 0x039be5)
					.setOrigin(0)
					.setValue(this.valor.yoyo)
					.on('valuechange', (newValue) => {
						this.setValor({ quantity: quantityValue, total: totalValue, yoyo: newValue });
					});
		const yoyoToggleSwitchTexto = this.escena.add.text(60, 60, 'yoyo', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
		this.valor = { quantity: quantityValue, total: totalValue, yoyo: yoyoToggleSwitch.value };
		inicializacion = false;
		this.container.add([quantitySlider, quantityTexto, totalSlider, totalTexto, yoyoToggleSwitch, yoyoToggleSwitchTexto]);
	}
}
