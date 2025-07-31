export class UtilFiguras {

		// Phaser.Geom.CIRCLE	0	Círculo
		// Phaser.Geom.ELLIPSE	1	Elipse
		// Phaser.Geom.LINE	2	Línea
		// Phaser.Geom.POINT	3	Punto
		// Phaser.Geom.POLYGON	4	Polígono
		// Phaser.Geom.RECTANGLE	5	Rectángulo
		// Phaser.Geom.TRIANGLE	6	Triángulo

	static obtenerInstanciaFigura<T extends Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line>(figura: T): T {
		const accionObtenerFigura = {
			[Phaser.Geom.CIRCLE]: () => {
				const auxRadio = (figura as any)._radius;
				const aux = <Phaser.Geom.Circle>(figura);
				return new Phaser.Geom.Circle(aux.x, aux.y, auxRadio);
			},
			[Phaser.Geom.RECTANGLE]: () => {
				const aux = <Phaser.Geom.Rectangle>(figura);
				return new Phaser.Geom.Rectangle(aux.x, aux.y, aux.width, aux.height);
			},
			[Phaser.Geom.ELLIPSE]: () => {
				const aux = <Phaser.Geom.Ellipse>(figura);
				return new Phaser.Geom.Ellipse(aux.x, aux.y, aux.width, aux.height);
			},
			[Phaser.Geom.TRIANGLE]: () => {
				const aux = <Phaser.Geom.Triangle>(figura);
				return new Phaser.Geom.Triangle(aux.x1, aux.y1, aux.x2, aux.y2, aux.x3, aux.y3);
			},
			[Phaser.Geom.LINE]: () => {
				const aux = <Phaser.Geom.Line>(figura);
				return new Phaser.Geom.Line(aux.x1, aux.y1, aux.x2, aux.y2);
			},
		};
		return accionObtenerFigura[figura.type]() as T;
	}

	static obtenerInstanciaFiguraPosicionRelativa<T extends Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line>(figura: T, emitter: {x: number, y: number}): T {
		const accionObtenerFigura = {
			[Phaser.Geom.CIRCLE]: () => {
				const auxRadio = (figura as any)._radius;
				const aux = <Phaser.Geom.Circle>(figura);
				return new Phaser.Geom.Circle(aux.x - emitter.x, aux.y - emitter.y, aux.radius)
			},
			[Phaser.Geom.RECTANGLE]: () => {
				const aux = <Phaser.Geom.Rectangle>(figura);
				return new Phaser.Geom.Rectangle(aux.x - emitter.x, aux.y - emitter.y, aux.width, aux.height);
			},
			[Phaser.Geom.ELLIPSE]: () => {
				const aux = <Phaser.Geom.Ellipse>(figura);
				return new Phaser.Geom.Ellipse(aux.x - emitter.x, aux.y - emitter.y, aux.width, aux.height);
			},
			[Phaser.Geom.TRIANGLE]: () => {
				const aux = <Phaser.Geom.Triangle>(figura);
				return new Phaser.Geom.Triangle(aux.x1 - emitter.x, aux.y1 - emitter.y, aux.x2 - emitter.x, aux.y2 - emitter.y, aux.x3 - emitter.x, aux.y3 - emitter.y);
			},
			[Phaser.Geom.LINE]: () => {
				const aux = <Phaser.Geom.Line>(figura);
				return new Phaser.Geom.Line(aux.x1 - emitter.x, aux.y1 - emitter.y, aux.x2 - emitter.x, aux.y2 - emitter.y);
			},
		};
		return accionObtenerFigura[figura.type]() as T;
	}

	static obtenerInstanciaFiguraPorPropiedades(figura: number, propiedades: { x: number, y: number, width?: number, height?: number, radio?: number, largoTriangle?: number, x2?: number, y2?: number }) {
		const accionObtenerFigura = {
			[Phaser.Geom.CIRCLE]: () => new Phaser.Geom.Circle(propiedades.x, propiedades.y, propiedades.radio),
			[Phaser.Geom.RECTANGLE]: () => new Phaser.Geom.Rectangle(propiedades.x, propiedades.y, propiedades.width, propiedades.height),
			[Phaser.Geom.ELLIPSE]: () => new Phaser.Geom.Ellipse(propiedades.x, propiedades.y, propiedades.width, propiedades.height),
			[Phaser.Geom.TRIANGLE]: () => Phaser.Geom.Triangle.BuildEquilateral(propiedades.x, propiedades.y, propiedades.largoTriangle),
			[Phaser.Geom.LINE]: () => new Phaser.Geom.Line(propiedades.x, propiedades.y, propiedades.x2, propiedades.y2),
			};
		return accionObtenerFigura[figura]();
	}
}