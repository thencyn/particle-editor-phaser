export enum Variables {
	MusicaEfectosActivada = 'VariableMusicaEfectosActivada',
	MusicaEfectosVolumen = 'VariableMusicaEfectosVolumen',
	MusicaVolumen = 'VariableMusicaVolumen',
	IdiomaSeleccionado = 'VariableIdiomaSeleccionado',
	EscenaLaunchMenu = 'VariableEscenaLaunchMenu',
	EscenaActual = 'VariableEscenaActual', // Esta variable se utiliza para controlar el giro de un dispositivo movil (vertical/horizontal), asi conoceremos que escena se debe pausar
	MensajeParametros = "VariableMensajeParametros",
}

export enum Eventos {
	MenuAbrirAyuda = "EventoMenuAbrirAyuda",
	MenuAbrirConfiguraciones = "EventoMenuAbrirConfiguraciones",
	CambiarIdioma = "EventoCambiarIdioma",

	MenuMostrar = "EventoMenuMostrarAtras", //Este evento se utiliza para mostrar el menu al volver hacia atras

	EmittersVerMenu = "EventoEmittersVerMenu",
	EmitterCrear = "EventoEmitterCrear",
	EmitterEliminar = "EventoEmitterEliminar",
	EmitterSeleccionar = "EventoEmitterSeleccionar",
	EmitterCambiarImagen = "EventoEmitterCambiarImagen",
	EmitterClonar = "EventoEmitterClonar",
	EmitterDeathZoneCrear = "EventoEmitterDeathZoneCrear",
	EmitterDeathZoneEliminar = "EventoEmitterDeathZoneEliminar",
	EmitterEmitZoneCrear = "EventoEmitterEmitZoneCrear",
	EmitterEmitZoneEliminar = "EventoEmitterEmitZoneEliminar",

	MenuProyectoNuevo = "EventoMenuProyectoNuevo",
	MenuProyectoGuardar = "EventoMenuProyectoGuardar",
	MenuProyectoAbrir = "EventoMenuProyectoAbrir",
	MenuExportar = "EventoMenuExportar",

	AbrirNuevoEjemplo = "EventoAbrirNuevoEjemplo",

	ProyectoAbrir = "EventoProyectoAbrir",
	ProyectoGuardado = "EventoProyectoGuardado",

	Exportar = "EventoExportar",
	Importar = "EventoImportar",
}

export enum TexturasManuales {
	FondoTransparente = "TexturasManualesFondoTransparente",
	FondoTransparenteOscuro = "TexturasManualesFondoTransparenteOscuro",
	Ayuda1 = "TexturasManualesAyuda1"
}


export enum Imagenes {
	BackgroundModal = "background-modal",
	ArrowDown = "arrow-down",
}


export enum AtlasImagenes {
	Botones = 'AtlasBotones',
	ImagenesVarias = 'AtlasImagenesVarias',
	Particulas = 'AtlasParticulas',
}

export const AtlasImagenesDetalles: {[Alias: string]: {NombreArchivoImagen: string, NombreArchivoAtlas: string, prefijoFrame: string, callbackObtenerFrame: (numeroFrame: number | string) => string }} = {
	'AtlasBotones': { NombreArchivoImagen: 'botones.png', NombreArchivoAtlas: 'botones_atlas.json', prefijoFrame: '', callbackObtenerFrame: (numeroFrame: string | number) => `${numeroFrame}` },
	'AtlasImagenesVarias': { NombreArchivoImagen: 'imagenes.png', NombreArchivoAtlas: 'imagenes_atlas.json', prefijoFrame: '', callbackObtenerFrame: (numeroFrame: string | number) => `${numeroFrame}` },
	'AtlasParticulas': { NombreArchivoImagen: 'particulas.png', NombreArchivoAtlas: 'particulas_atlas.json', prefijoFrame: '', callbackObtenerFrame: (numeroFrame: string | number) => `${numeroFrame}` },
};

export enum AtlasBotonesImagenes {
	Anterior = "anterior",
	Cerrar = 'cerrar',
	CerrarDisable = 'cerrar-disable',
	Siguiente = "siguiente",
	Recargar = "recargar",
	RecargarDisable = "recargar-disable",
	Configuracion = 'configuracion',
	FullScreen = "full-screen",
	FullScreenDisable = "full-screen-disable",
	Home = "home",
	HomeDisable = "home-disable",
	Informacion = 'informacion',
	Menu = "menu",
	MenuDisable = "menu-disable",
	MusicaEfectosOff = 'musica-efectos-off',
	MusicaEfectos = 'musica-efectos-on',
	MusicaOff = 'musica-off',
	MusicaOn = 'musica-on',
	SeleccionCircularMas = "seleccion-circular-mas",
	SeleccionCircularMenos = "seleccion-circular-menos",
	SeleccionCircularMasDisable = "seleccion-circular-mas-disable",
	SeleccionCircularMenosDisable = "seleccion-circular-menos-disable",
	Boton = "boton",
	BotonDisable = "boton-disable",
	Abrir = "abrir",
	Ejemplo = "ejemplo",
	Emitters = "emitters",
	Exportar = "exportar",
	Importar = "importar",
	Guardar = "guardar",
	Imagenes = "imagenes",
	Clonar = "clonar",
	Nuevo = "nuevo",
	NuevoDisable = "nuevo-disable",
	Circulo = "circulo",
	CirculoDisable = "circulo-disable",
	Elipse = "elipse",
	ElipseDisable = "elipse-disable",
	Linea = "linea",
	LineaDisable = "linea-disable",
	Rectangulo = "rectangulo",
	RectanguloDisable = "rectangulo-disable",
	Triangulo = "triangulo",
	TrianguloDisable = "triangulo-disable",
}

export enum AtlasImagenesVarias {
	Logo = 'logo',
}

export enum AtlasParticulas {
	Auto = 'auto',
	Baba = 'baba',
	Bomb = 'bomb',
	Burbuja01 = 'burbuja-01',
	Burbuja02 = 'burbuja-02',
	Caja = 'caja',
	CartaDiamante = 'carta-diamante',
	CartaTrebol = 'carta-trebol',
	CartaPica = 'carta-pica',
	CartaCorazon = 'carta-corazon',
	CartaDorso = 'carta-dorso',
	CartaFrente = 'carta-frente',
	Challa1 = 'challa-1',
	Challa2 = 'challa-2',
	Cloud01 = 'cloud-01',
	Cloud02 = 'cloud-02',
	CuadradoAzul = 'cuadrado-azul',
	CuadradoLila = 'cuadrado-lila',
	CuadradoResaltado = 'cuadrado-resaltado',
	CuadradoRojo = 'cuadrado-rojo',
	CuadradoVerde = 'cuadrado-verde',
	Elefante = 'elefante',
	Estrella = 'estrella',
	FuegoAmarillo = 'fuego-amarillo',
	FuegoAzul = 'fuego-azul',
	FuegoBlanco = 'fuego-blanco',
	FuegoBrillante = 'fuego-brillante',
	FuegoRojo = 'fuego-rojo',
	FuegoVerde = 'fuego-verde',
	Gema1 = 'gema-1',
	Gema2 = 'gema-2',
	Gema3 = 'gema-3',
	Gema4 = 'gema-4',
	Hoja1 = 'hoja-1',
	Luz = 'luz',
	Match300 = 'match3-00',
	Match301 = 'match3-01',
	Match302 = 'match3-02',
	Match303 = 'match3-03',
	Match304 = 'match3-04',
	Match305 = 'match3-05',
	Match306 = 'match3-06',
	Match307 = 'match3-07',
	Match308 = 'match3-08',
	Match309 = 'match3-09',
	Match310 = 'match3-10',
	Match311 = 'match3-11',
	Match312 = 'match3-12',
	Match313 = 'match3-13',
	Match314 = 'match3-14',
	Match315 = 'match3-15',
	Match316 = 'match3-16',
	Match317 = 'match3-17',
	Match318 = 'match3-18',
	Match319 = 'match3-19',
	Match320 = 'match3-20',
	Match321 = 'match3-21',
	Match322 = 'match3-22',
	Match323 = 'match3-23',
	Match324 = 'match3-24',
	Match325 = 'match3-25',
	Match326 = 'match3-26',
	Match327 = 'match3-27',
	Match328 = 'match3-28',
	Match329 = 'match3-29',
	Match330 = 'match3-30',
	Match331 = 'match3-31',
	Match332 = 'match3-32',
	Match333 = 'match3-33',
	Match334 = 'match3-34',
	Match335 = 'match3-35',
	Match336 = 'match3-36',
	Metal = 'metal',
	Moneda = 'moneda',
	MonsterRed = 'monster-red',
	MonsterYellow = 'monster-yellow',
	NieveChica01 = 'nieve-chica-01',
	NieveChica02 = 'nieve-chica-02',
	NieveChica03 = 'nieve-chica-03',
	NieveChica04 = 'nieve-chica-04',
	NieveChica05 = 'nieve-chica-05',
	NieveChica06 = 'nieve-chica-06',
	NieveGrande01 = 'nieve-grande-01',
	NieveGrande02 = 'nieve-grande-02',
	NieveGrande03 = 'nieve-grande-03',
	NieveGrande04 = 'nieve-grande-04',
	NieveGrande05 = 'nieve-grande-05',
	NieveGrande06 = 'nieve-grande-06',
	Rain = 'rain',
	Smoke = 'smoke',
	Star1 = 'star-1',
	Star2 = 'star-2',
	Star3 = 'star-3',
	Star4 = 'star-4',
	Tumbleweed = 'tumbleweed',
}

export enum Sonidos {
	ApretarBoton = 'SonidoApretarBoton',
	Menu = 'SonidoMenu',
	Error = 'SonidoError',
	NegarAccion = 'SonidoNegarAccion',
}

export const SonidosDetalles: {[Alias: string]: {NombreArchivo: string}} = {
	'SonidoApretarBoton': { NombreArchivo: 'sonidos/apretar-boton.mp3' },
	'SonidoMenu': { NombreArchivo: 'sonidos/menu.mp3' },
	'SonidoError': { NombreArchivo: 'sonidos/error.mp3' },
	'SonidoNegarAccion': { NombreArchivo: 'sonidos/negar-accion.mp3' },
};


export enum Ejemplos {
	GravityWell = 'EjemploGravityWell',
}



export const ManejarDepthMainGame = {
	profundidad0: 0,
	profundidad1: 10,
	profundidad2: 20,
	profundidad3: 30,
	profundidad4: 40,
	profundidad5: 50,
	profundidad6: 60,
	profundidad7: 70,
}
