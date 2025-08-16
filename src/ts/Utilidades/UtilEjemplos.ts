import { Ejemplos } from "./Diccionario";
import { IEjemploConfiguracion, IGuardarConfiguracionEmitter, IGuardarConfiguracionProyectos } from "./Interfaces";

export class UtilEjemplos {
	static obtenerListadoEjemplosGuardados() : IEjemploConfiguracion[] {
		return [
			{
				nombreEjemplo: 'EmitZones Multiples\nFiguras',
				idEjemplo: 1,
				tagPropiedadesUtilizadas: ['EmitZone', 'scale'],
				url: './assets/ejemplos/01-emit-zones.json',
				descripcion: 'Ejemplo de EmitZones Multiples Figuras',
				urlImagenPreview: 'ejemplos/01-emit-zones.png',
				aliasImagenPreview: '01-emit-zones',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/add-emit-zone',
			},
			{
				nombreEjemplo: 'Speed Angle',
				idEjemplo: 2,

				tagPropiedadesUtilizadas: ['speed', 'angle', 'rotate', 'scale'],
				url: './assets/ejemplos/02-speed-angle.json',
				descripcion: 'Ejemplo de Speed + Angle Creando Multiples Figuras',
				urlImagenPreview: 'ejemplos/02-speed-angle.png',
				aliasImagenPreview: '02-speed-angle',
			},
			{
				nombreEjemplo: 'Bring to Top',
				idEjemplo: 3,
				tagPropiedadesUtilizadas: ['speed', 'angle', 'scale'],
				url: './assets/ejemplos/03-bring-to-top.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/03-bring-to-top.png',
				aliasImagenPreview: '03-bring-to-top',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/bring-to-top'
			},
			{
				nombreEjemplo: 'Emit Zone stopAfter\nLoop',
				idEjemplo: 4,
				tagPropiedadesUtilizadas: ['EmitZone', 'scale', 'stopAfter'],
				url: './assets/ejemplos/04-emit-zone-loop.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/04-emit-zone-loop.png',
				aliasImagenPreview: '04-emit-zone-loop',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/emit-zone-loop'
			},
			{
				nombreEjemplo: 'Emit Zone Duration\nLoop',
				idEjemplo: 5,
				tagPropiedadesUtilizadas: ['EmitZone', 'speed', 'scale', 'duration'],
				url: './assets/ejemplos/05-emitter-duration.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/05-emitter-duration.png',
				aliasImagenPreview: '05-emitter-duration',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/emitter-duration'
			},
			{
				nombreEjemplo: 'Emit Zone Total vs 1',
				idEjemplo: 6,
				tagPropiedadesUtilizadas: ['EmitZone', 'speed', 'scale', 'stopAfter'],
				url: './assets/ejemplos/06-emit-zone-vs.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/06-emit-zone-vs.png',
				aliasImagenPreview: '06-emit-zone-vs',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Emit Zone Total',
				idEjemplo: 7,
				tagPropiedadesUtilizadas: ['EmitZone', 'speed', 'scale'],
				url: './assets/ejemplos/07-emitter-zone-total.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/07-emitter-zone-total.png',
				aliasImagenPreview: '07-emitter-zone-total',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/emitter-zone-total'
			},
			{
				nombreEjemplo: 'Fire Effects',
				idEjemplo: 8,
				tagPropiedadesUtilizadas: ['speed', 'angle', 'scale', 'color'],
				url: './assets/ejemplos/08-fire-effects.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/08-fire-effects.png',
				aliasImagenPreview: '08-fire-effects',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/fire-effects'
			},
			{
				nombreEjemplo: 'Gravity Well',
				idEjemplo: 9,
				tagPropiedadesUtilizadas: ['maxVelocityX', 'maxVelocityY', 'scale', 'GravityWell', 'EmitZone', 'posicionX', 'posicionY'],
				url: './assets/ejemplos/09-gravity-well.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/09-gravity-well.png',
				aliasImagenPreview: '09-gravity-well',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/gravity-processor'
			},
			{
				nombreEjemplo: 'Interpolation 01',
				idEjemplo: 10,
				tagPropiedadesUtilizadas: ['speed', 'scale', 'posicionX'],
				url: './assets/ejemplos/10-interpolation-01.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/10-interpolation-01.png',
				aliasImagenPreview: '10-interpolation-01',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/interpolation-ease'
			},
			{
				nombreEjemplo: 'Interpolation 02',
				idEjemplo: 11,
				tagPropiedadesUtilizadas: ['speed', 'scale', 'posicionX'],
				url: './assets/ejemplos/11-interpolation-02.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/11-interpolation-02.png',
				aliasImagenPreview: '11-interpolation-02',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Interpolation 03',
				idEjemplo: 12,
				tagPropiedadesUtilizadas: ['speed', 'scale', 'posicionY', 'duration', 'alpha'],
				url: './assets/ejemplos/12-interpolation-03.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/12-interpolation-03.png',
				aliasImagenPreview: '12-interpolation-03',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Death Zones\nMultiples',
				idEjemplo: 13,
				tagPropiedadesUtilizadas: ['speed', 'scale', 'DeathZones'],
				url: './assets/ejemplos/13-multiple-death-zones.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/13-multiple-death-zones.png',
				aliasImagenPreview: '13-multiple-death-zones',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/multiple-death-zones'
			},
			{
				nombreEjemplo: 'Particle Bounds\n& Bounce',
				idEjemplo: 14,
				tagPropiedadesUtilizadas: ['speed', 'scale', 'rotate', 'bounds'],
				url: './assets/ejemplos/14-particle-bounds-bounce.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/14-particle-bounds-bounce.png',
				aliasImagenPreview: '14-particle-bounds-bounce',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/particle-bounds'
			},
			{
				nombreEjemplo: 'Random Array',
				idEjemplo: 15,
				tagPropiedadesUtilizadas: ['scale', 'posicionX'],
				url: './assets/ejemplos/15-random-array.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/15-random-array.png',
				aliasImagenPreview: '15-random-array',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/random-array'
			},
			{
				nombreEjemplo: 'Random Array',
				idEjemplo: 16,
				tagPropiedadesUtilizadas: ['scale', 'posicionX', 'posicionY'],
				url: './assets/ejemplos/16-start-end.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/16-start-end.png',
				aliasImagenPreview: '16-start-end',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/start-end'
			},
			{
				nombreEjemplo: 'Start End Random\nAdvance',
				idEjemplo: 17,
				tagPropiedadesUtilizadas: ['scale', 'posicionX', 'sortProperty', 'advance'],
				url: './assets/ejemplos/17-start-end-random.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/17-start-end-random.png',
				aliasImagenPreview: '17-start-end-random',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/start-end-random'
			},
			{
				nombreEjemplo: 'Start End Step\nCycle Frame',
				idEjemplo: 18,
				tagPropiedadesUtilizadas: ['scale', 'posicionX', 'rotate', 'cycleFrame'],
				url: './assets/ejemplos/18-step-emitter-cycle-frame.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/18-step-emitter-cycle-frame.png',
				aliasImagenPreview: '18-step-emitter-cycle-frame',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/stepped-emitter'
			},
			{
				nombreEjemplo: 'EmitZone Yoyo',
				idEjemplo: 19,
				tagPropiedadesUtilizadas: ['scale', 'EmitZone', 'rotate'],
				url: './assets/ejemplos/19-emit-zone-yoyo.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/19-emit-zone-yoyo.png',
				aliasImagenPreview: '19-emit-zone-yoyo',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/stepped-emitter-with-yoyo'
			},
			{
				nombreEjemplo: 'Start End Ease',
				idEjemplo: 20,
				tagPropiedadesUtilizadas: ['posicionX', 'posicionY', 'rotate'],
				url: './assets/ejemplos/20-start-end-ease.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/20-start-end-ease.png',
				aliasImagenPreview: '20-start-end-ease',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/start-end-ease'
			},
			{
				nombreEjemplo: 'Color vs Tint',
				idEjemplo: 21,
				tagPropiedadesUtilizadas: ['speedX', 'speedY', 'rotate', 'scale', 'color', 'tint'],
				url: './assets/ejemplos/21-color-vs-tint.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/21-color-vs-tint.png',
				aliasImagenPreview: '21-color-vs-tint',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Multiples Emitter\n& EmitZone',
				idEjemplo: 22,
				tagPropiedadesUtilizadas: ['emitZone', 'scale'],
				url: './assets/ejemplos/22-multiples-emitters-emitzones.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/22-multiples-emitters-emitzones.png',
				aliasImagenPreview: '22-multiples-emitters-emitzones',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Multiples Emitter\nNieve',
				idEjemplo: 23,
				tagPropiedadesUtilizadas: ['speedX', 'speedY', 'posicionX', 'rotate', 'scale'],
				url: './assets/ejemplos/23-multiples-emitter-nieve.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/23-multiples-emitter-nieve.png',
				aliasImagenPreview: '23-multiples-emitter-nieve',
				urlEjemploOriginal: 'https://cragl.cs.gmu.edu/teaching/cs325/phaser-1.1.6/examples/_site/view_full.html?d=particles&f=snow.js&t=snow'
			},
			{
				nombreEjemplo: 'Multiples Emitter',
				idEjemplo: 24,
				tagPropiedadesUtilizadas: ['speedX', 'speedY', 'color', 'emitZone', 'scale'],
				url: './assets/ejemplos/24-multiples-emitters.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/24-multiples-emitters.png',
				aliasImagenPreview: '24-multiples-emitters',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Multiples EmitZone\n& DeathZone',
				idEjemplo: 25,
				tagPropiedadesUtilizadas: ['speedX', 'speedY', 'deathZone', 'emitZone', 'scale', 'rotate'],
				url: './assets/ejemplos/25-multiple-emit-death-zone.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/25-multiple-emit-death-zone.png',
				aliasImagenPreview: '25-multiple-emit-death-zone',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Scale vs ScaleXY',
				idEjemplo: 26,
				tagPropiedadesUtilizadas: ['hold', 'scale', 'scaleXY'],
				url: './assets/ejemplos/26-scale-vs-scalexy.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/26-scale-vs-scalexy.png',
				aliasImagenPreview: '26-scale-vs-scalexy',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'MoveTo',
				idEjemplo: 27,
				tagPropiedadesUtilizadas: ['moveToX', 'moveToY', 'scale', 'posicionX', 'rotate', 'sortProperty', 'emitZone'],
				url: './assets/ejemplos/27-move-to.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/27-move-to.png',
				aliasImagenPreview: '27-move-to',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Vortex Advanced\nBy Samme',
				idEjemplo: 28,
				tagPropiedadesUtilizadas: ['moveToX', 'moveToY', 'scaleX', 'scaleY', 'rotate', 'alpha', 'emitZone'],
				url: './assets/ejemplos/28-vortex.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/28-vortex.png',
				aliasImagenPreview: '28-vortex',
				urlEjemploOriginal: 'https://codepen.io/samme/pen/eYygPXj'
			},
			{
				nombreEjemplo: 'Confeti By Samme',
				idEjemplo: 29,
				tagPropiedadesUtilizadas: ['speed', 'posicionX', 'scaleX', 'scaleY', 'rotate'],
				url: './assets/ejemplos/29-confeti.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/29-confeti.png',
				aliasImagenPreview: '29-confeti',
				urlEjemploOriginal: 'https://codepen.io/samme/pen/YzbLYXq'
			},
			{
				nombreEjemplo: 'Carta retroceso\nOnEmit & OnUpdate',
				idEjemplo: 30,
				tagPropiedadesUtilizadas: ['accelerationX', 'posicionY', 'scale', 'alpha', 'rotate'],
				url: './assets/ejemplos/30-carta-retroceso.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/30-carta-retroceso.png',
				aliasImagenPreview: '30-carta-retroceso',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'EmitCallback',
				idEjemplo: 31,
				tagPropiedadesUtilizadas: ['scaleX', 'scaleY', 'speed', 'emitCallback', 'rotate'],
				url: './assets/ejemplos/31-emitcallback.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/31-emitcallback.png',
				aliasImagenPreview: '31-emitcallback',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'TimeScale',
				idEjemplo: 32,
				tagPropiedadesUtilizadas: ['scale', 'timeScale', 'emitZone'],
				url: './assets/ejemplos/32-time-scale.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/32-time-scale.png',
				aliasImagenPreview: '32-time-scale',
				urlEjemploOriginal: ''
			},
			{
				nombreEjemplo: 'Movimiento Tweens',
				idEjemplo: 33,
				tagPropiedadesUtilizadas: ['scale', 'speed', 'alpha', 'particleBringToTop'],
				url: './assets/ejemplos/33-movimiento-tweens.json',
				descripcion: '',
				urlImagenPreview: 'ejemplos/33-movimiento-tweens.png',
				aliasImagenPreview: '33-movimiento-tweens',
				urlEjemploOriginal: 'https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/tween-xy'
			},
		];
	}

	static obtenerJsonEjemploPorURL(url: string) {
		return new Promise<IGuardarConfiguracionEmitter[]>((resolve, reject) => {
			fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('No se pudo cargar el archivo JSON');
				}
				return response.json(); // convierte la respuesta a objeto JS
			})
			.then((data) => {
				// console.log("Contenido del JSON:", data);
				const retorno: IGuardarConfiguracionEmitter[] = data;
				return resolve(retorno)
			})
			.catch((error) => {
				console.error("Error al leer el JSON:", error);
			});
		});
	}




}