import Phaser from "phaser";

export class FiguraControlesComponent extends Phaser.Events.EventEmitter {
	private valor: { x: number, y: number, width?: number, height?: number, radio?: number, largoTriangle?: number, x2?: number, y2?: number };
	public container: Phaser.GameObjects.Container;
	constructor(private escena: Phaser.Scene, private figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line) {
		super();
		this.valor = { x: 0, y: 0, width: 0, height: 0, radio: 0, x2: 0, y2: 0 };
		this.container = this.escena.add.container(0, 0);
		if (figura instanceof Phaser.Geom.Rectangle) {
			this.crearControlesRectangulo();
		} else if (figura instanceof Phaser.Geom.Circle) {
			this.crearControlesCirculo();
		} else if (figura instanceof Phaser.Geom.Ellipse) {
			this.crearControlesElipse();
		} else if (figura instanceof Phaser.Geom.Triangle) {
			this.crearControlesTriangle();
		} else if (figura instanceof Phaser.Geom.Line) {
			this.crearControlesLinea();
		}
	}

	private setValor(nuevoValor: { x: number, y: number, width?: number, height?: number, radio?: number, largoTriangle?: number, x2?: number, y2?: number }) {
		this.valor = nuevoValor;
		this.emit("valorCambiado", this.valor);
	}

	getValor() {
		return this.valor;
	}

	public updateControls(figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line) {
		this.figura = figura;
		this.container.removeAll(true);
		// const aux = <Phaser.Geom.Triangle>this.figura;
		// Phaser.Geom.Triangle.
		if (figura instanceof Phaser.Geom.Rectangle) {
			this.crearControlesRectangulo();
		} else if (figura instanceof Phaser.Geom.Circle) {
			this.crearControlesCirculo();
		} else if (figura instanceof Phaser.Geom.Ellipse) {
			this.crearControlesElipse();
		} else if (figura instanceof Phaser.Geom.Triangle) {
			this.crearControlesTriangle();
		} else if (figura instanceof Phaser.Geom.Line) {
			this.crearControlesLinea();
		}

		this.setValor(this.valor);
	}

	private crearControlesRectangulo()  {
		let inicializacion = true;
		const config = {
			xMin: -200,
			xMax: 2048,
			xRange: 2048 - -200,
			xGap: 10,
			yMin: -200,
			yMax: 1152,
			yRange: 1152 - -200,
			yGap: 10,
			widthMin: 10,
			widthMax: 2048,
			widthRange: 2048 - 10,
			widthGap: 10,
			heightMin: 10,
			heightMax: 2048,
			heightRange: 2048 - 10,
			heightGap: 10,
		};
		const auxFigura = <Phaser.Geom.Rectangle> this.figura;
		let posXValue = null;
		let posYValue = null;
		let posWidthValue = null;
		let posHeightValue = null;
		const posXTexto = this.escena.add.text(210, 5, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posXValue += 10;
				posXSlider.setValue(posXValue, config.xMin, config.xMax);
				posXTexto.text = `X: ${posXValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posXSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 0,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.xRange) + config.xMin);
				posXTexto.text = `X: ${value}`;
				posXValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.xGap / config.xRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x, config.xMin, config.xMax)
		.layout();

		const posYTexto = this.escena.add.text(210, 35, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posYValue += 10;
				posYSlider.setValue(posYValue, config.yMin, config.yMax);
				posYTexto.text = `Y: ${posYValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posYSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 30,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.yRange) + config.yMin);
				posYTexto.text = `Y: ${value}`;
				posYValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.yGap / config.yRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y, config.yMin, config.yMax)
		.layout();

		const posWidthTexto = this.escena.add.text(210, 65, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posWidthValue += 10;
				posWidthSlider.setValue(posWidthValue, config.widthMin, config.widthMax);
				posWidthTexto.text = `W: ${posWidthValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posWidthSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 60,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.widthRange) + config.widthMin);
				posWidthTexto.text = `W: ${value}`;
				posWidthValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.widthGap / config.widthRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.width, config.widthMin, config.widthMax)
		.layout();

		const posHeightTexto = this.escena.add.text(210, 95, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posHeightValue += 10;
				posHeightSlider.setValue(posHeightValue, config.heightMin, config.heightMax);
				posHeightTexto.text = `H: ${posHeightValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posHeightSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 90,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.heightRange) + config.heightMin);
				posHeightTexto.text = `H: ${value}`;
				posHeightValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.heightGap / config.heightRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.height, config.heightMin, config.heightMax)
		.layout();
		this.valor = { x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue };

		inicializacion = false;
		this.container.add([posXSlider, posXTexto, posYSlider, posYTexto, posWidthSlider, posWidthTexto, posHeightSlider, posHeightTexto]);
	}

	private crearControlesCirculo()  {
		let inicializacion = true;
		const config = {
			xMin: -200,
			xMax: 2048,
			xRange: 2048 - -200,
			xGap: 10,
			yMin: -200,
			yMax: 1152,
			yRange: 1152 - -200,
			yGap: 10,
			radioMin: 10,
			radioMax: 600,
			radioRange: 600 - 10,
			radioGap: 10,
		};
		const auxFigura = <Phaser.Geom.Circle> this.figura;
		let posXValue = null;
		let posYValue = null;
		let radioValue = null;
		const posXTexto = this.escena.add.text(210, 20, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posXValue += 10;
				posXSlider.setValue(posXValue, config.xMin, config.xMax);
				posXTexto.text = `X: ${posXValue}`;
				this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
			});
		const posXSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 15,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.xRange) + config.xMin);
				posXTexto.text = `X: ${value}`;
				posXValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.xGap / config.xRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x, config.xMin, config.xMax)
		.layout();

		const posYTexto = this.escena.add.text(210, 50, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posYValue += 10;
				posYSlider.setValue(posYValue, config.yMin, config.yMax);
				posYTexto.text = `Y: ${posYValue}`;
				this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
			});
		const posYSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 45,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.yRange) + config.yMin);
				posYTexto.text = `Y: ${value}`;
				posYValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.yGap / config.yRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y, config.yMin, config.yMax)
		.layout();

		const radioTexto = this.escena.add.text(210, 80, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				radioValue += 10;
				radioSlider.setValue(radioValue, config.radioMin, config.radioMax);
				radioTexto.text = `R: ${radioValue}`;
				this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
			});
		const radioSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 75,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.radioRange) + config.radioMin);
				radioTexto.text = `R: ${value}`;
				radioValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, radio: radioValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.radioGap / config.radioRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.radius, config.radioMin, config.radioMax)
		.layout();

		this.valor = { x: posXValue, y: posYValue, radio: radioValue };
		inicializacion = false;
		this.container.add([posXSlider, posXTexto, posYSlider, posYTexto, radioSlider, radioTexto]);
	}

	private crearControlesElipse()  {
		let inicializacion = true;
		const config = {
			xMin: -200,
			xMax: 2048,
			xRange: 2048 - -200,
			xGap: 10,
			yMin: -200,
			yMax: 1152,
			yRange: 1152 - -200,
			yGap: 10,
			widthMin: 10,
			widthMax: 2048,
			widthRange: 2048 - 10,
			widthGap: 10,
			heightMin: 10,
			heightMax: 1152,
			heightRange: 1152 - 10,
			heightGap: 10,
		};
		const auxFigura = <Phaser.Geom.Rectangle> this.figura;
		let posXValue = null;
		let posYValue = null;
		let posWidthValue = null;
		let posHeightValue = null;
		const posXTexto = this.escena.add.text(210, 5, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posXValue += 10;
				posXSlider.setValue(posXValue, config.xMin, config.xMax);
				posXTexto.text = `X: ${posXValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posXSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 0,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.xRange) + config.xMin);
				posXTexto.text = `X: ${value}`;
				posXValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.xGap / config.xRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x, config.xMin, config.xMax)
		.layout();

		const posYTexto = this.escena.add.text(210, 35, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posYValue += 10;
				posYSlider.setValue(posYValue, config.yMin, config.yMax);
				posYTexto.text = `Y: ${posYValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posYSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 30,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.yRange) + config.yMin);
				posYTexto.text = `Y: ${value}`;
				posYValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.yGap / config.yRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y, config.yMin, config.yMax)
		.layout();

		const posWidthTexto = this.escena.add.text(210, 65, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posWidthValue += 10;
				posWidthSlider.setValue(posWidthValue, config.widthMin, config.widthMax);
				posWidthTexto.text = `W: ${posWidthValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posWidthSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 60,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.widthRange) + config.widthMin);
				posWidthTexto.text = `W: ${value}`;
				posWidthValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.widthGap / config.widthRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.width, config.widthMin, config.widthMax)
		.layout();

		const posHeightTexto = this.escena.add.text(210, 95, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posHeightValue += 10;
				posHeightSlider.setValue(posHeightValue, config.heightMin, config.heightMax);
				posHeightTexto.text = `H: ${posHeightValue}`;
				this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
			});
		const posHeightSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 90,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.heightRange) + config.heightMin);
				posHeightTexto.text = `H: ${value}`;
				posHeightValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.heightGap / config.heightRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.height, config.heightMin, config.heightMax)
		.layout();
		this.valor = { x: posXValue, y: posYValue, width: posWidthValue, height: posHeightValue };

		inicializacion = false;
		this.container.add([posXSlider, posXTexto, posYSlider, posYTexto, posWidthSlider, posWidthTexto, posHeightSlider, posHeightTexto]);
	}

	private crearControlesTriangle()  {
		let inicializacion = true;
		const config = {
			xMin: -200,
			xMax: 2048,
			xRange: 2048 - -200,
			xGap: 10,
			yMin: -200,
			yMax: 1152,
			yRange: 1152 - -200,
			yGap: 10,
			largoTriangleMin: 10,
			largoTriangleMax: 1000,
			largoTriangleRange: 1000 - 10,
			largoTriangleGap: 10,
		};
		const auxFigura = <Phaser.Geom.Triangle> this.figura;
		let posXValue = null;
		let posYValue = null;
		let largoTriangleValue = null;
		const posXTexto = this.escena.add.text(210, 20, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posXValue += 10;
				posXSlider.setValue(posXValue, config.xMin, config.xMax);
				posXTexto.text = `X: ${posXValue}`;
				this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
			});
		const posXSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 15,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.xRange) + config.xMin);
				posXTexto.text = `X: ${value}`;
				posXValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.xGap / config.xRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x1, config.xMin, config.xMax)
		.layout();

		const posYTexto = this.escena.add.text(210, 50, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				posYValue += 10;
				posYSlider.setValue(posYValue, config.yMin, config.yMax);
				posYTexto.text = `Y: ${posYValue}`;
				this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
			});
		const posYSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 45,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.yRange) + config.yMin);
				posYTexto.text = `Y: ${value}`;
				posYValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.yGap / config.yRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y1, config.yMin, config.yMax)
		.layout();

		const largoTriangleTexto = this.escena.add.text(210, 80, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				largoTriangleValue += 10;
				largoTriangleSlider.setValue(largoTriangleValue, config.largoTriangleMin, config.largoTriangleMax);
				largoTriangleTexto.text = `W: ${largoTriangleValue}`;
				this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
			});
		const largoTriangleSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 75,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.largoTriangleRange) + config.largoTriangleMin);
				largoTriangleTexto.text = `W: ${value}`;
				largoTriangleValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, largoTriangle: largoTriangleValue });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.largoTriangleGap / config.largoTriangleRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x2 - auxFigura.x3, config.largoTriangleMin, config.largoTriangleMax)
		.layout();

		this.valor = { x: posXValue, y: posYValue, largoTriangle: largoTriangleValue };
		inicializacion = false;
		this.container.add([posXSlider, posXTexto, posYSlider, posYTexto, largoTriangleSlider, largoTriangleTexto]);
	}

	private crearControlesLinea()  {
		let inicializacion = true;
		const config = {
			xMin: -200,
			xMax: 2048,
			xRange: 2048 - -200,
			xGap: 10,
			yMin: -200,
			yMax: 1152,
			yRange: 1152 - -200,
			yGap: 10,
			x2Min: -200,
			x2Max: 2048,
			x2Range: 2048 - -200,
			x2Gap: 10,
			y2Min: -200,
			y2Max: 1152,
			y2Range: 1152 - -200,
			y2Gap: 10,
		};
		const auxFigura = <Phaser.Geom.Line> this.figura;
		let posXValue = null;
		let posYValue = null;
		let posX2Value = null;
		let posY2Value = null;
		const posXTexto = this.escena.add.text(210, 5, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					posXValue += 10;
					posXSlider.setValue(posXValue, config.xMin, config.xMax);
					posXTexto.text = `X: ${posXValue}`;
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
				});
		const posXSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 0,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.xRange) + config.xMin);
				posXTexto.text = `X: ${value}`;
				posXValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.xGap / config.xRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x1, config.xMin, config.xMax)
		.layout();

		const posYTexto = this.escena.add.text(210, 35, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					posYValue += 10;
					posYSlider.setValue(posYValue, config.yMin, config.yMax);
					posYTexto.text = `Y: ${posYValue}`;
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
				});
		const posYSlider = this.escena.rexUI.add.slider({
			x: 0,
			y: 30,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.yRange) + config.yMin);
				posYTexto.text = `Y: ${value}`;
				posYValue = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.yGap / config.yRange,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y1, config.yMin, config.yMax)
		.layout();

		const posX2Texto = this.escena.add.text(210, 65, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					posX2Value += 10;
					posX2Slider.setValue(posX2Value, config.x2Min, config.x2Max);
					posX2Texto.text = `X2: ${posX2Value}`;
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
				});
		const posX2Slider = this.escena.rexUI.add.slider({
			x: 0,
			y: 60,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.x2Range) + config.x2Min);
				posX2Texto.text = `X2: ${value}`;
				posX2Value = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.x2Gap / config.x2Range,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.x2, config.x2Min, config.x2Max)
		.layout();

		const posY2Texto = this.escena.add.text(210, 95, '', {align: 'center', fontFamily: 'monospace', fontSize: '20px', color: '#ffffff', fontStyle: 'bold' })
				.setInteractive({ useHandCursor: true })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					posY2Value += 10;
					posY2Slider.setValue(posY2Value, config.y2Min, config.y2Max);
					posY2Texto.text = `Y2: ${posY2Value}`;
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
				});
		const posY2Slider = this.escena.rexUI.add.slider({
			x: 0,
			y: 90,
			width: 200,
			height: 30,
			orientation: 'x',

			track: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0x004c29),
			thumb: this.escena.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaba552),

			valuechangeCallback: (value) => {
				value = Math.round((value * config.y2Range) + config.y2Min);
				posY2Texto.text = `Y2: ${value}`;
				posY2Value = value;
				if (!inicializacion) {
					this.setValor({ x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value });
					// this.escena.registry.events.emit(Eventos.EmitterDeathZone, false, indexDeathZone, obtenerTipo(), new Phaser.Geom.Rectangle(posXValue, posYValue, posWidthValue, posHeightValue));
				}
			},
			gap: config.y2Gap / config.y2Range,
			space: {
				top: 4,
				bottom: 4
			},
			input: 'drag', // 'drag'|'click'
		}).setOrigin(0)
		.setValue(auxFigura.y2, config.y2Min, config.y2Max)
		.layout();
		this.valor = { x: posXValue, y: posYValue, x2: posX2Value, y2: posY2Value };

		inicializacion = false;
		this.container.add([posXSlider, posXTexto, posYSlider, posYTexto, posX2Slider, posX2Texto, posY2Slider, posY2Texto]);
	}
}
