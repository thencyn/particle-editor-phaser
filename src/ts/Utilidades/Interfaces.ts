export interface IConfiguracionAdicional {
	tipoSpeedSeleccionada: 'No' | 'SpeedAngle' | 'SpeedXY';
	tipoScaleSeleccionada: 'No' | 'Scale' | 'ScaleXY';
	velocidadAngleActivado: boolean;
	alphaActivado: boolean;
	rotateActivado: boolean;
	accelerationXActivada: boolean;
	accelerationYActivada: boolean;
	posicionXActivada: boolean;
	posicionYActivada: boolean;
	speedXSeleccionada: 'Unica' | 'Transition' | 'Random';
	speedYSeleccionada: 'Unica' | 'Transition' | 'Random';
	speedSeleccionada: 'Unica' | 'Transition' | 'Random';
	angleSeleccionada: 'Transition' | 'Random';
	scaleSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	scaleXSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	scaleYSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	alphaSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	rotateSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	accelerationXSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	accelerationYSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Avanzado';
	posicionXSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Puntos' | 'Interpolacion';
	posicionYSeleccionada: 'Unica' | 'Transition' | 'Random' | 'Puntos' | 'Interpolacion';
	listaDeathZones: IDeathZone[];
	//La lista de zonas de emisión se guarda con los puntos absolutos de la pantalla, pero se pintan relativos al emitter
	// y se pinta con un objeto graphics que es absoluto a la pantalla
	// por lo que se debe cambiar el graphics al mover el emitter
	listaEmitZones: IEmitZone[];
	emitZoneAbsolutoX: number;
	emitZoneAbsolutoY: number;
	listaPropiedadesFunction: IAdvancedFormula[];
	emitCallbackFunctionStr: string;
	movimiento?: IMovimiento;
}

export interface IConfiguracionEmitter {
	emitter: Phaser.GameObjects.Particles.ParticleEmitter;
	configAdicional: IConfiguracionAdicional;
	configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;
	graphicsBounds: Phaser.GameObjects.Graphics;
	texture?: string;
	frame: string[];
	frameCycle: boolean;
	bokeh?: Phaser.FX.Bokeh;
	memoria: IMemoria;
	gravityWell?: Phaser.GameObjects.Particles.GravityWell;
	gravityWellPunto?: Phaser.GameObjects.Arc;
	graphicsDeathZone: Phaser.GameObjects.Graphics;
	graphicsEmitZone: Phaser.GameObjects.Graphics; //La zona guardada tiene los puntos de la pantalla y se deben cambiar por los puntos relativos al emitter
	movimientoTween?: Phaser.Tweens.Tween;
}

export interface IEjemploConfiguracion {
	nombreEjemplo: string;
	idEjemplo: number;
	url: string;
	descripcion: string;
	tagPropiedadesUtilizadas?: string[];
	urlImagenPreview: string;
	aliasImagenPreview: string;
	urlEjemploOriginal?: string;
	// listaEmitters?: IGuardarConfiguracionEmitter[];
}

export interface IProyectosBasicosConfiguracion {
	nombreProyecto: string;
	id: number;
	fecha: Date;
}

export interface IGuardarConfiguracionProyectos {
	nombreProyecto: string;
	id: number;
	fecha: Date;
	listaEmitters: IGuardarConfiguracionEmitter[];
	listaImagenesBackground?: IImagenBackground[];
}

export interface IGuardarConfiguracionEmitter {
	configAdicional: IConfiguracionAdicional;
	texture?: string;
	frame: string[];
	frameCycle: boolean;
	memoria: IMemoria;
}

export interface IMovimiento {
	movimientoActivado: boolean;
	yoyo: boolean;
	repeat: number;
	xPoint?: number;
	xDuration: number;
	xEase: string;
	xActivar: boolean;
	yPoint?: number;
	yDuration: number;
	yEase: string;
	yActivar: boolean;
}


export interface IConfiguracionGeneral {
	listaImagenesBackground: IImagenBackground[];
}
export interface IImagenBackground {
	key: string;
	x: number;
	y: number;
	originX: number;
	originY: number;
	activarDisplaySize: boolean;
	ancho?: number;
	alto?: number;
}

export interface IDestroyable {
	destroy(): void;
}

export interface IImagenCompleto {
	nombre: string;
	peso: number;
	fecha: Date;
	imagenBase64: string;
}

export interface IImagenBasico {
	nombre: string;
	peso: number;
	fecha: Date;
}

export interface IDeathZone {
	figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle
	tipo: 'onEnter' | 'onLeave'
}
export interface IEmitZone {
	figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line
	tipo: 'edge' | 'random'
	quantity: number
	total: number
	yoyo: boolean
}

export const propiedadesAdvancedFormulaArray = ['accelerationX', 'accelerationY', 'scale', 'scaleX', 'scaleY', 'rotate', 'alpha'];
export type typePropiedadesAdvancedFormula = 'accelerationX' | 'accelerationY' | 'scale' | 'scaleX' | 'scaleY' | 'rotate' | 'alpha';
export interface IAdvancedFormula {
	propiedadFormula: typePropiedadesAdvancedFormula;
	onEmitFormula: string;
	onUpdateFormula: string;
}

export interface IMemoria {
	expandirPaginasUtilizadas: boolean
	x: number
	y: number
	lifespan: number
	frequency: number
	quantity: number
	gravityX: number
	gravityY: number
	tipoSpeedSeleccionada: 'No' | 'SpeedAngle' | 'SpeedXY'
	tipoScaleSeleccionada: 'No' | 'Scale' | 'ScaleXY'
	blendMode: string
	maxVelocityX: number
	maxVelocityY: number
	advance: number
	hold: number
	particleBringToTop?: boolean
	sortProperty: string
	sortOrderAsc: boolean
	timeScale: number
	moveToActivar: boolean
	moveToX: number
	moveToY: number
	emitCallbackActivar: boolean
	bounce: number
	speed: Speed
	angle: Angle
	speedX: SpeedX
	speedY: SpeedY
	accelerationX: AccelerationX
	accelerationY: AccelerationY
	posicionX: PosicionX
	posicionY: PosicionY
	scale: Scale
	scaleX: ScaleX
	scaleY: ScaleY
	colorTint: ColorTint
	alpha: Alpha
	rotate: Rotate
	bounds: Bounds
	bokeh: Bokeh
	gravityWell: GravityWell
	deathZone: DeathZone
	emitZone: EmitZone
	stopAfterDuration: StopAfterDuration
	follow: Follow
}

export interface Speed {
	speed_unica: number
	speed_start: number
	speed_end: number
	speed_steps: number
	speed_min: number
	speed_max: number
}

export interface Angle {
	angle_activado: boolean
	angle_start: number
	angle_end: number
	angle_steps: number
	angle_min: number
	angle_max: number
}

export interface SpeedX {
	speedX_unica: number
	speedX_start: number
	speedX_end: number
	speedX_steps: number
	speedX_min: number
	speedX_max: number
}

export interface SpeedY {
	speedY_unica: number
	speedY_start: number
	speedY_end: number
	speedY_steps: number
	speedY_min: number
	speedY_max: number
}

export interface AccelerationX {
	accelerationX_activado: boolean
	accelerationX_unica: number
	accelerationX_start: number
	accelerationX_end: number
	accelerationX_steps: number
	accelerationX_transitionEaseAuxInt: number
	accelerationX_transitionEase: string
	accelerationX_min: number
	accelerationX_max: number
	accelerationX_onEmitActivado: boolean
	accelerationX_onUpdateActivado: boolean
}

export interface AccelerationY {
	accelerationY_activado: boolean
	accelerationY_unica: number
	accelerationY_start: number
	accelerationY_end: number
	accelerationY_steps: number
	accelerationY_transitionEaseAuxInt: number
	accelerationY_transitionEase: string
	accelerationY_min: number
	accelerationY_max: number
	accelerationY_onEmitActivado: boolean
	accelerationY_onUpdateActivado: boolean
}

export interface PosicionX {
	posicionX_activada: boolean
	posicionX_unica: number
	posicionX_start: number
	posicionX_end: number
	posicionX_steps: number
	posicionX_transitionEaseAuxInt: number
	posicionX_transitionEase: string
	posicionX_transitionRandom: boolean
	posicionX_min: number
	posicionX_max: number
	posicionX_puntos: string
	posicionX_interpolacionPuntos: string
	posicionX_interpolacionTipo: 'linear' | 'bezier' | 'catmull'
}

export interface PosicionY {
	posicionY_activada: boolean
	posicionY_unica: number
	posicionY_start: number
	posicionY_end: number
	posicionY_steps: number
	posicionY_transitionEaseAuxInt: number
	posicionY_transitionEase: string
	posicionY_transitionRandom: boolean
	posicionY_min: number
	posicionY_max: number
	posicionY_puntos: string
	posicionY_interpolacionPuntos: string
	posicionY_interpolacionTipo: 'linear' | 'bezier' | 'catmull'
}

export interface Scale {
	scale_unica: number
	scale_start: number
	scale_end: number
	scale_steps: number
	scale_transitionEaseAuxInt: number
	scale_transitionEase: string
	scale_min: number
	scale_max: number
	scale_onEmitActivado: boolean
	scale_onUpdateActivado: boolean
}

export interface ScaleX {
	scaleX_unica: number
	scaleX_start: number
	scaleX_end: number
	scaleX_steps: number
	scaleX_transitionEaseAuxInt: number
	scaleX_transitionEase: string
	scaleX_min: number
	scaleX_max: number
	scaleX_onEmitActivado: boolean
	scaleX_onUpdateActivado: boolean
}

export interface ScaleY {
	scaleY_unica: number
	scaleY_start: number
	scaleY_end: number
	scaleY_steps: number
	scaleY_transitionEaseAuxInt: number
	scaleY_transitionEase: string
	scaleY_min: number
	scaleY_max: number
	scaleY_onEmitActivado: boolean
	scaleY_onUpdateActivado: boolean
}

export interface ColorTint {
	colorTint_seleccionado: 'color' | 'tint' | 'ninguno'
	colorTint_color: string
	colorTint_colorEaseAuxInt: number
	colorTint_colorEase: string
	colorTint_tint: string
}

export interface Alpha {
	alpha_activado: boolean
	alpha_unica: number
	alpha_start: number
	alpha_end: number
	alpha_steps: number
	alpha_transitionEaseAuxInt: number
	alpha_transitionEase: string
	alpha_min: number
	alpha_max: number
	alpha_onEmitActivado: boolean
	alpha_onUpdateActivado: boolean
}

export interface Rotate {
	rotate_activado: boolean
	rotate_unica: number
	rotate_start: number
	rotate_end: number
	rotate_steps: number
	rotate_transitionEaseAuxInt: number
	rotate_transitionEase: string
	rotate_min: number
	rotate_max: number
	rotate_onEmitActivado: boolean
	rotate_onUpdateActivado: boolean
}

export interface Bounds {
	bounds_activado: boolean
	bounds_mostrar: boolean
	bounds_color: number
	bounds_x: number
	bounds_y: number
	bounds_width: number
	bounds_height: number
}

export interface Bokeh {
	bokeh_activado: boolean
	bokeh_radius: number
	bokeh_amount: number
	bokeh_contrast: number
}

export interface GravityWell {
	gravityWell_activado: boolean
	gravityWell_mostrarPunto: boolean
	gravityWell_x: number
	gravityWell_y: number
	gravityWell_power: number
	gravityWell_epsilon: number
	gravityWell_gravity: number
}

export interface StopAfterDuration {
	stopAfterDuration_tipo: 'none' | 'stopAfter' | 'duration'
	stopAfterDuration_stopAfter: number
	stopAfterDuration_duration: number
	stopAfterDuration_reset: boolean
}

export interface Follow {
	follow_imagen: Phaser.Types.Math.Vector2Like
	follow_offsetX: number
	follow_offsetY: number
}


export interface DeathZone {
	deathZone_activado: boolean
	deathZone_mostrar: boolean
	deathZone_color: number
}

export interface EmitZone {
	emitZone_activado: boolean
	emitZone_mostrar: boolean
	emitZone_color: number
}

export const LISTA_EASES = [ 'Back.in', 'Back.inOut', 'Back.out', 'Bounce.in', 'Bounce.inOut', 'Bounce.out', 'Circ.in', 'Circ.inOut', 'Circ.out', 'Cubic.in', 'Cubic.inOut', 'Cubic.out', 'Expo.in', 'Expo.inOut', 'Expo.out', 'Linear', 'Quad.in', 'Quad.inOut', 'Quad.out', 'Quart.in', 'Quart.inOut', 'Quart.out', 'Quint.in', 'Quint.inOut', 'Quint.out', 'Sine.in', 'Sine.inOut', 'Sine.out'];


