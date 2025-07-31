export enum Idiomas {
	Espanol = 0,
	Ingles = 1,
	Portugues  = 2,
}

export enum TextosAplicacion {
	SeleccionarScene_BotonComenzar = "SeleccionarScene_BotonComenzar",
	SeleccionarScene_BotonAleatorio = "SeleccionarScene_BotonAleatorio",
	SeleccionarScene_TextoSeleccione = "SeleccionarScene_TextoSeleccione",
	SeleccionRapidaScene_BotonAleatorio = "SeleccionRapidaScene_BotonAleatorio",
	SeleccionRapidaScene_SusNumeros = "SeleccionRapidaScene_SusNumeros",
	FooterScene_TextoSaldo = "FooterScene_TextoSaldo",
	MainGameScene_BotonLanzar = "MainGameScene_BotonLanzar",
	MainGameScene_ApuestaPorLinea = "MainGameScene_ApuestaPorLinea",
	MainGameScene_CantidadLineas = "MainGameScene_CantidadLineas",
	ConfiguracionScene_SeleccionarIdioma = "ConfiguracionScene_SeleccionarIdioma",
	ConfiguracionScene_VolumenMusica = "ConfiguracionScene_VolumenMusica",
	ConfiguracionScene_VolumenEfectos = "ConfiguracionScene_VolumenMusicaEfectos",
	ConfiguracionScene_Vibracion = "ConfiguracionScene_Vibracion",
	AyudaScene_Ayuda1Titulo = "AyudaScene_Ayuda1Titulo",
	AyudaScene_Ayuda1Detalle = "AyudaScene_Ayuda1Detalle",
	AyudaScene_Ayuda2Titulo = "AyudaScene_Ayuda2Titulo",
	AyudaScene_Ayuda2Detalle = "AyudaScene_Ayuda2Detalle",
	AyudaScene_Ayuda3Titulo = "AyudaScene_Ayuda3Titulo",
	AyudaScene_Ayuda3Detalle = "AyudaScene_Ayuda3Detalle",
	AyudaScene_Ayuda4Titulo = "AyudaScene_Ayuda4Titulo",
	AyudaScene_Ayuda4Detalle = "AyudaScene_Ayuda4Detalle",
	AyudaScene_Ayuda5Titulo = "AyudaScene_Ayuda5Titulo",
	AyudaScene_Ayuda5Detalle = "AyudaScene_Ayuda5Detalle",
	AyudaScene_Ayuda6Titulo = "AyudaScene_Ayuda6Titulo",
	AyudaScene_Ayuda6Detalle = "AyudaScene_Ayuda6Detalle",
	AyudaScene_Ayuda7Titulo = "AyudaScene_Ayuda7Titulo",
	AyudaScene_Ayuda7Detalle = "AyudaScene_Ayuda7Detalle",
	AyudaScene_Ayuda8Titulo = "AyudaScene_Ayuda8Titulo",
	AyudaScene_Ayuda8Detalle = "AyudaScene_Ayuda8Detalle",
}

export const TextosMultidioma: {[Alias: string]: {TextosMulti: string[] }} = {
	'SeleccionarScene_BotonComenzar': { TextosMulti: ['Comenzar', 'Start', 'Começar'] },
	'SeleccionarScene_BotonAleatorio': { TextosMulti: ['Aleatorio', 'Random', 'Aleatório'] },
	'SeleccionarScene_BotonSeleccionRapida': { TextosMulti: ['Rapida', 'Fast', 'Velozes'] },
	'SeleccionarScene_TextoSeleccione': { TextosMulti: ['Seleccione sus numeros', 'Select your numbers', 'Selecione seus números'] },
	'SeleccionRapidaScene_BotonAleatorio': { TextosMulti: ['Azar', 'Random', 'Aleatório'] },
	'SeleccionRapidaScene_SusNumeros': { TextosMulti: ['TUS NÚMEROS', 'Your Numbers', 'Seus números'] },
	'FooterScene_TextoSaldo': { TextosMulti: ['Saldo', 'Balance', 'Equilíbrio'] },
	'MainGameScene_BotonLanzar': { TextosMulti: ['Lanzar', 'Throw', 'Lançar'] },
	'MainGameScene_ApuestaPorLinea': { TextosMulti: ['Por Línea', 'Per Line', 'Por Linha'] },
	'MainGameScene_CantidadLineas': { TextosMulti: ['Líneas', 'Lines', 'Linhas'] },
	'ConfiguracionScene_SeleccionarIdioma': { TextosMulti: ['Idioma', 'Language', 'Idioma'] },
	'ConfiguracionScene_VolumenMusica': { TextosMulti: ['Música', 'Music', 'Música'] },
	'ConfiguracionScene_VolumenMusicaEfectos': { TextosMulti: ['Efectos', 'Effects', 'Efeitos'] },
	'ConfiguracionScene_Vibracion': { TextosMulti: ['Vibración', 'Vibrate', 'Vibrate'] },
	'AyudaScene_Ayuda1Titulo': { TextosMulti: ['Información del Juego', 'How to play', 'Como jogar'] },
	'AyudaScene_Ayuda1Detalle': { TextosMulti: [
		`Enchanted Illusions es un  Raspes electrónico  que presenta:
•   5 Rodillos
•   9 líneas de apuestas fijas
•   Sustitución del símbolo “comodín”
•   Giros gratis`, // -------------------
		`INGLES`, `PORTUGUES`] },
	'AyudaScene_Ayuda2Titulo': { TextosMulti: ['Cómo Jugar', '', ''] },
	'AyudaScene_Ayuda2Detalle': { TextosMulti: [
		`-	Debes elegir el monto que quieres apostar por línea el cual puede ser $50,
$100, $200, $500, $1.000 o $2.000. Como en total son 9 líneas de apuestas
fijas, el monto a pagar será el que seleccionaste por línea y se multiplica
por 9 (el total de líneas). Si elegiste un monto por línea de $100 tu monto
a pagar por ese lanzamiento será $900 ($100 x 9)

-	Luego debes hacer click en el circulo azul que se encuentra en el centro
para comenzar a jugar.

-	Además, puedes:
            •	Haciendo click en APUESTA MÁXIMA configura el nivel de apuesta para
            una ronda de juego hasta el máximo nivel $18.000
            •	Haciendo click en AUTO JUEGO puedes configurar las rondas de juego
            automáticas
	`, // -------------------
		`INGLES`, `PORTUGUES`]
	},
	'AyudaScene_Ayuda3Titulo': { TextosMulti: ['Premio', '', ''] },
	'AyudaScene_Ayuda3Detalle': { TextosMulti: [
		`-	Las combinaciones ganadoras pagan sólo cuando ocurren en una de las líneas
de apuesta fijas una combinación ganadora paga el monto indicado en la Tabla
de Premios.
-	Sólo se paga la combinación ganadora mayor presente en una línea de apuesta.
-	Las combinaciones ganadoras presentes en una línea de apuesta pagan de
izquierda a derecha y en sucesión comenzando desde el primer rodillo.
-	Los símbolos “comodín” reemplazan a cualquier figura excepto el
“Libro Encantado”
`,// -------------------
		`INGLES`, 'PORTUGUES'
	]},
	'AyudaScene_Ayuda4Titulo': { TextosMulti: ['Libro Encantado', '', ''] },
	'AyudaScene_Ayuda4Detalle': { TextosMulti: [
		`Además, existe la posibilidad de ganar Juegos gratis:
• Los juegos gratis se activan con 3 “Libro Encantado” pudiendo estar
o no en una línea de premiación. Y entrega 5 juegos gratis.
• Las rondas de juegos gratis utilizan el mismo Valor Apuesta que la
ronda en la que se obtuvo.
• Los juegos gratis son automáticos.
`,// -------------------
		`INGLES`, `PORTUGUES`
	]},
	'AyudaScene_Ayuda5Titulo': { TextosMulti: ['Wilds (“Comodín”)', '', ''] },
	'AyudaScene_Ayuda5Detalle': { TextosMulti: [
		`• Los símbolos Wild sustituyen todos los símbolos excepto al
“Libro Encantado”
• La sustitución Wild paga la combinación ganadora más alta en una
línea de pago tal y como se presenta en la Tabla de Premios.
• Todos los símbolos Wild son acumulativos es decir si aparece
más de uno reemplazan a todas las figuras posibles en cada línea
de premiación.
`,// -------------------
		`INGLES`, `PORTUGUES`
	]},
	'AyudaScene_Ayuda6Titulo': { TextosMulti: ['Información – Botones', '', ''] },
	'AyudaScene_Ayuda6Detalle': { TextosMulti: [
		`• Total Apuesta: Muestra el valor total de la apuesta en pesos
• Por Línea: Muestra el monto por línea seleccionado
• Saldo:  Muestra el monto de saldo en unidades de efectivo
• Auto juego: Permite programar una cantidad determinada de
juegos automáticos que realizará el sistema.
• Apuesta Máxima: configura la apuesta al máximo permitido.
• Hora: Muestra la hora actual`,// -------------------
		`INGLES`, `PORTUGUES`
	]},

	'AyudaScene_Ayuda7Titulo': { TextosMulti: ['Tabla de Premios', '', ''] },
	'AyudaScene_Ayuda7Detalle': { TextosMulti: [
		`El porcentaje de pago al apostador para este juego es de 52.17%`,// -------------------
		`INGLES`, `PORTUGUES`
	]},

	'AyudaScene_Ayuda8Titulo': { TextosMulti: ['Información adicional', '', ''] },
	'AyudaScene_Ayuda8Detalle': { TextosMulti: [
		`El pago de los premios se efectuará de la siguiente forma:

Todos los premios serán abonados automáticamente en la cuenta
virtual de juegos del apostador o apostadora en la AVP, dándose
por pagados los premios en ese momento para todos los efectos
que haya lugar.

Para los efectos del inciso 2° del Artículo 10° del D.S. N° 152 de
1980, del Ministerio de Hacienda, se entenderá que son premios
mayores aquellos superiores a   $3.000.000.-
		`,// -------------------
		`INGLES`, `PORTUGUES`
	]},
}

export function ObtenerTextoMultiIdioma(idioma: Idiomas, tipoTexto: TextosAplicacion) {
	return TextosMultidioma[tipoTexto].TextosMulti[idioma];
}
