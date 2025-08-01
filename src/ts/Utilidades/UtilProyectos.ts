import JSZip from "jszip";
import { IConfiguracionEmitter, IGuardarConfiguracionProyectos, IGuardarConfiguracionEmitter, IProyectosBasicosConfiguracion, IMemoria, IDeathZone, IEmitZone } from "./Interfaces";
import { UtilFiguras } from "./UtilFiguras";

export class UtilProyectos {
	static guardarProyecto(nombreProyecto: string, datosProyecto: IConfiguracionEmitter[], idProyecto?: number) {
		const listaProyectos = <IGuardarConfiguracionProyectos[]> (localStorage.getItem('proyectos') ? JSON.parse(localStorage.getItem('proyectos') || '[]') : []);
		const proyecto: IGuardarConfiguracionProyectos = {
			nombreProyecto,
			id: idProyecto || Date.now(),
			fecha: new Date(),
			listaEmitters: datosProyecto.map(x => ({
				configAdicional: x.configAdicional,
				texture: x.texture,
				frame: x.frame,
				frameCycle: x.frameCycle,
				memoria: x.memoria,
			}))
		};
		listaProyectos.some(x => x.id === proyecto.id) ?
			listaProyectos.splice(listaProyectos.findIndex(x => x.id === proyecto.id), 1, proyecto) :
			listaProyectos.push(proyecto);
		localStorage.setItem('proyectos', JSON.stringify(listaProyectos));
		return <IProyectosBasicosConfiguracion> {
			nombreProyecto: proyecto.nombreProyecto,
			id: proyecto.id,
			fecha: proyecto.fecha,
		};
	}

	static obtenerListadoProyectosGuardados() {
		const listaProyectos = <IGuardarConfiguracionProyectos[]> (localStorage.getItem('proyectos') ? JSON.parse(localStorage.getItem('proyectos') || '[]') : []);
		return listaProyectos.map(x => (<IProyectosBasicosConfiguracion> {
			nombreProyecto: x.nombreProyecto,
			id: x.id,
			fecha: new Date(x.fecha),
		})).sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
	}

	static leerProyecto(idProyecto: number) {
		const listaProyectos = <IGuardarConfiguracionProyectos[]> (localStorage.getItem('proyectos') ? JSON.parse(localStorage.getItem('proyectos') || '[]') : []);
		return listaProyectos.find(x => x.id === idProyecto) || null;
	}

	static eliminarProyecto(idProyecto: number) {
		const listaProyectos = <IGuardarConfiguracionProyectos[]> (localStorage.getItem('proyectos') ? JSON.parse(localStorage.getItem('proyectos') || '[]') : []);
		localStorage.setItem('proyectos', JSON.stringify(listaProyectos.filter(x => x.id !== idProyecto)));
	}

	static async exportarProyectoJS(nombreProyecto: string, listaEmitters: ({
					x: number,
					y: number,
					texture: string,
					configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig,
					memoria: IMemoria,
					listaDeathZones: IDeathZone[],
					listaEmitZones: IEmitZone[],
					emitZoneAbsolutoX: number,
					emitZoneAbsolutoY: number,
				})[]) {
		const zip = new JSZip();
		const imageResponse = await fetch('/assets/particulas.png');
		const imageBlob = await imageResponse.blob();
		const imageArrayBuffer = await imageBlob.arrayBuffer();
		zip.file("assets/particulas.png", imageArrayBuffer);
		const imageAtlasResponse = await fetch('/assets/particulas_atlas.json');
		const imageAtlasJson = await imageAtlasResponse.json();
		zip.file("assets/particulas_atlas.json", JSON.stringify(imageAtlasJson, null, 2));
		// const phaserjsResponse = await fetch('/assets/descarga/phaser.min.js');
		// const phaserjsBlob = await phaserjsResponse.blob();
		// const phaserjsArrayBuffer = await phaserjsBlob.arrayBuffer();
		// zip.file("phaser.min.js", phaserjsArrayBuffer);
		const htmlContent = `
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Particle Editor Phaser</title>
		<script src="https://cdn.jsdelivr.net/npm/phaser@v3.90.0/dist/phaser.min.js"></script>
		<script type="module" src="./main.js"></script>
	</head>
	<body>
		<div id="phaser-example"></div>
	</body>
</html>`;
		zip.file("index.html", htmlContent);
		const jsContent = `
class Example extends Phaser.Scene {
    preload () {
        this.load.path = "assets/";
        this.load.atlas('AtlasParticulas', 'particulas.png', 'particulas_atlas.json');
    }

    create () {
        ${this.emitterToString(listaEmitters)}
    }
}

const config = {
    type: Phaser.AUTO,
    width: 2048,
	height: 1152,
    backgroundColor: '#494a4a',
    parent: 'phaser-example',
	title: "Particle Editor Phaser",
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
    scene: Example
};

const game = new Phaser.Game(config);
`;
		zip.file("main.js", jsContent);

		const blob = await zip.generateAsync({ type: "blob" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = `${nombreProyecto}.zip`;
		a.click();
	}

	static exportarProyecto(datosProyecto: IConfiguracionEmitter[], datosBasicosProyecto: IProyectosBasicosConfiguracion) {
		const proyecto: IGuardarConfiguracionProyectos = {
			nombreProyecto: datosBasicosProyecto?.nombreProyecto || 'Proyecto 1',
			id: datosBasicosProyecto?.id || Date.now(),
			fecha: datosBasicosProyecto?.fecha || new Date(),
			listaEmitters: datosProyecto.map(x => ({
				configAdicional: x.configAdicional,
				texture: x.texture,
				frame: x.frame,
				frameCycle: x.frameCycle,
				memoria: x.memoria,
			}))
		};
		const proyectoJSON = JSON.stringify(proyecto, null, 2);
		const blob = new Blob([proyectoJSON], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${proyecto.nombreProyecto}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	static async exportarEmitters(listaEmitters: ({
					x: number,
					y: number,
					texture: string,
					configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig,
					memoria: IMemoria,
					listaDeathZones: IDeathZone[],
					listaEmitZones: IEmitZone[],
					emitZoneAbsolutoX: number,
					emitZoneAbsolutoY: number,
				})[]) {
		try {
			await navigator.clipboard.writeText(this.emitterToString(listaEmitters));

			alert('Texto copiado al portapapeles');
		} catch (err) {
			alert('Error al copiar texto');
		}
	}

	private static emitterToString(listaEmitters: ({
					x: number,
					y: number,
					texture: string,
					configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig,
					memoria: IMemoria,
					listaDeathZones: IDeathZone[],
					listaEmitZones: IEmitZone[],
					emitZoneAbsolutoX: number,
					emitZoneAbsolutoY: number,
				})[]) {
		const objectToJSString = (obj, saltoLinea: boolean) => {
			// const entries = Object.entries(obj).map(([key, value]) => {
			// 	return `${key}: ${valueToJSString(value, ['color', 'tint'].includes(key))}`;
			// });
			const prioridad = ['frame', 'lifespan', 'frequency', 'quantity', 'blendMode', 'gravityX', 'gravityY', 'speedX', 'speedY', 'speed', 'angle', 'scale', 'rotate', 'tint', 'color'];
			const entries = [
				...prioridad
					.filter(prop => prop in obj)
					.map(prop => `${prop}: ${valueToJSString(obj[prop], ['color', 'tint'].includes(prop))}`),
				...Object.entries(obj)
					.filter(([key]) => !prioridad.includes(key))
					.map(([key, value]) => `${key}: ${valueToJSString(value, ['color', 'tint'].includes(key))}`)
			];
			return `{${saltoLinea ? '\n' : ' '}${entries.join(`,${saltoLinea ? '\n' : ' '}`)}${saltoLinea ? '\n' : ' '}}`;
		}

		const valueToJSString = (value, hexa: boolean = false) => {
			if (typeof value === "string") {
				return `"${value}"`;
			}

			if (Array.isArray(value)) {
				const items = value.map((item) => valueToJSString(item, hexa));
				return `[${items.join(`,`)}]`;
			}

			if (typeof value === "object" && value !== null) {
				return objectToJSString(value, false);
			}
			return !hexa ? String(value) : `0x${value.toString(16).padStart(6, '0')}`;
		};

		let textoTotal = '';
		let bokehTexto = '';
		let gravityWellTexto = '';
		for (const [index, item] of listaEmitters.entries()) {
			if (item.listaDeathZones.length > 0) {
				item.configParticle.deathZone = item.listaDeathZones.map(zone => ({
					type: zone.tipo,
					source: zone.figura
				}));
			}
			if (item.listaEmitZones.length > 0) {
				item.configParticle.emitZone = item.listaEmitZones.map(zone => ({
					type: zone.tipo,
					quantity: zone.quantity,
					total: zone.total,
					yoyo: zone.yoyo,
					// source: zone.figura
					source: UtilFiguras.obtenerInstanciaFiguraPosicionRelativa(zone.figura, {x: item.emitZoneAbsolutoX, y: item.emitZoneAbsolutoY})
				}));
			}

			let propiedadesTexto = objectToJSString(item.configParticle, true);
			if (item.listaDeathZones.length > 0 || item.listaEmitZones.length > 0) {
				propiedadesTexto = this.transformaFigura(propiedadesTexto);
			}
			let resetEmitter = '';
			if (item.memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none' && item.memoria.stopAfterDuration.stopAfterDuration_reset) {
				resetEmitter = `.on('complete', () => emitter${ index + 1 }.start())`;
			}
			const textoEmitterCompleto = `const emitter${ index + 1 } = this.add.particles(${item.x}, ${item.y}, '${item.texture}', ${propiedadesTexto})${resetEmitter};`;
			bokehTexto = '';
			if (item.memoria.bokeh.bokeh_activado) {
				bokehTexto = `\nconst bokeh${ index + 1 } = emitter${ index + 1 }.postFX.addBokeh(${item.memoria.bokeh.bokeh_radius},${item.memoria.bokeh.bokeh_amount},${item.memoria.bokeh.bokeh_contrast})`;
			}
			gravityWellTexto = '';
			if (item.memoria.gravityWell.gravityWell_activado) {
				gravityWellTexto += `\nconst gravityWell${ index + 1 } = emitter${ index + 1 }.createGravityWell({x: ${item.memoria.gravityWell.gravityWell_x}, y: ${item.memoria.gravityWell.gravityWell_y}, power: ${item.memoria.gravityWell.gravityWell_power}, epsilon: ${item.memoria.gravityWell.gravityWell_epsilon}, gravity: ${item.memoria.gravityWell.gravityWell_gravity}});`;
			}
			textoTotal += `${textoEmitterCompleto}${bokehTexto}${gravityWellTexto}\n\n`;
		}
		return textoTotal;
	}

	private static transformaFigura(str: string) {
		const reglas = [
			{
				tipo: /{ type: 5, x: (.*?), y: (.*?), width: (.*?), height: (.*?) }/g,
				reemplazo: (_, x, y, w, h) => `new Phaser.Geom.Rectangle(${x}, ${y}, ${w}, ${h})`
			},
			{
				tipo: /{ type: 0, x: (.*?), y: (.*?), _radius: (.*?)\,.*? }/g,
				reemplazo: (_, x, y, r) => `new Phaser.Geom.Circle(${x}, ${y}, ${r})`
			},
			{
				tipo: /{ type: 1, x: (.*?), y: (.*?), width: (.*?), height: (.*?) }/g,
				reemplazo: (_, x, y, w, h) => `new Phaser.Geom.Ellipse(${x}, ${y}, ${w}, ${h})`
			},
			{
				tipo: /{ type: 6, x1: (.*?), y1: (.*?), x2: (.*?), y2: (.*?), x3: (.*?), y3: (.*?) }/g,
				reemplazo: (_, x1, y1, x2, y2, x3, y3) => `new Phaser.Geom.Triangle(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})`
			},
			{
				tipo: /{ type: 2, x1: (.*?), y1: (.*?), x2: (.*?), y2: (.*?) }/g,
				reemplazo: (_, x1, y1, x2, y2) => `new Phaser.Geom.Line(${x1}, ${y1}, ${x2}, ${y2})`
			},
		];

		let jsonLike = str;

		// Reemplazos por reglas
		for (const regla of reglas) {
			// jsonLike = jsonLike.replace(regla.tipo, (_, ...grupos) => regla.reemplazo(_, ...grupos));
			jsonLike = jsonLike.replace(regla.tipo, regla.reemplazo);
		}

		// Formateo multilínea del array
		jsonLike = jsonLike.replace(/deathZone:\s*\[/, 'deathZone: [\n  ');
		jsonLike = jsonLike.replace(/emitZone:\s*\[/, 'emitZone: [\n  ');
		jsonLike = jsonLike.replace(/},\s*{/g, '},\n  {');
		// jsonLike = jsonLike.replace(/\]\s*$/, '\n]');
		jsonLike = jsonLike.replace(
					/(deathZone:\s*\[)(.*?)(\])/s,
					(_, inicio, contenido, cierre) => {
						return `${inicio}${contenido}\n${cierre}`;
					}
		);
		jsonLike = jsonLike.replace(
					/(emitZone:\s*\[)(.*?)(\])/s,
					(_, inicio, contenido, cierre) => {
						return `${inicio}${contenido}\n${cierre}`;
					}
		);

		return jsonLike;
	}
}

