import { Imagenes, Variables, AtlasImagenes, AtlasImagenesDetalles, Sonidos, SonidosDetalles, Eventos, TexturasManuales, ManejarDepthMainGame } from "../Utilidades/Diccionario";
import AyudaScene from "./AyudaScene";
import PrincipalScene from "./PrincipalScene";
import PresentacionScene from "./PresentacionScene";
import { UtilDispositivo } from "../Utilidades/UtilDispositivo";
import EjemplosScene from "./EjemplosScene";
import { UtilEjemplos } from "../Utilidades/UtilEjemplos";
import { UtilImagenes } from "../Utilidades/UtilImagenes";

export default class PreloaderScene extends Phaser.Scene {
	public static Name = "PreloaderScene";
	public init() {
		// this.add.image(0, 0, Imagenes.BackgroundLoading).setOrigin(0, 0);
	}

	public async preload() {
		this.addProgressBar();

		this.load.path = "assets/";

        for(const value of Object.values(Imagenes)) {
			// if (![Imagenes.BackgroundLoading, Imagenes.LogoJuegoLoading].includes(value)) {
				this.load.image(value, `${value}.png`);
			// }
        }

		// for(const value in SpriteImagenes) {
		// 	const spriteDetalle = SpriteImagenesDetalles[SpriteImagenes[value]];
		// 	this.load.spritesheet(SpriteImagenes[value], spriteDetalle.NombreArchivo, {
		// 		frameWidth: spriteDetalle.AnchoFrame,
		// 		frameHeight: spriteDetalle.AltoFrame,
		// 		endFrame: spriteDetalle.FrameFinal
		// 	});
		// }

		for(const value of Object.values(AtlasImagenes)) {
			const spriteDetalle = AtlasImagenesDetalles[value];
			this.load.atlas(value, spriteDetalle.NombreArchivoImagen, spriteDetalle.NombreArchivoAtlas);
		}

		// for(const value in AtlasSprite) {
		// 	const spriteDetalle = AtlasSpriteDetalles[AtlasSprite[value]];
		// 	this.load.multiatlas(AtlasSprite[value], spriteDetalle.NombreArchivoAtlas, 'assets');
		// 	// this.load.atlas(AtlasSprite[value], spriteDetalle.NombreArchivoImagen, spriteDetalle.NombreArchivoAtlas);
		// }

		for(const value of Object.values(Sonidos)) {
			this.load.audio(value, SonidosDetalles[value].NombreArchivo);
		}

		// for(const value in AtlasAnimaciones) {
		// 	const animacionDetalle = AtlasAnimacionesDetalles[AtlasAnimaciones[value]];
		// 	if (typeof animacionDetalle.NombreAnimacion === "string") {
		// 		this.load.animation(animacionDetalle.NombreAnimacion, animacionDetalle.NombreArchivoAtlas);
		// 	} else {
		// 		this.load.animation(animacionDetalle.NombreArchivoAtlas.slice(0, -5));
		// 		// for (const item of animacionDetalle.NombreAnimacion) {
		// 		// 	this.load.animation(item, animacionDetalle.NombreArchivoAtlas);
		// 		// }
		// 	}
		// }

		const listaEjemplos = UtilEjemplos.obtenerListadoEjemplosGuardados();
		for(const value of listaEjemplos) {
			this.load.image(value.aliasImagenPreview, value.urlImagenPreview);
        }

		const listaImagenes = UtilImagenes.obtenerListadoCompleto();
		for (const element of listaImagenes) {
			this.textures.addBase64(element.nombre, element.imagenBase64);
		}

		const listaImagenesBackground = await UtilImagenes.obtenerListadoCompletoIndexDB();
		for (const element of listaImagenesBackground) {
			this.textures.addBase64(element.nombre, element.imagenBase64);
		}
	}

	public create(): void {
		this.registry.set(Variables.MusicaEfectosActivada, true);
		this.registry.set(Variables.MusicaEfectosVolumen, 15);
		// this.registry.set(Variables.MusicaVolumen, 15);
		this.registry.set(Variables.IdiomaSeleccionado, 0);

		// this.sound.play(Sonidos.MusicaFondo, { loop: true, volume: 15 / 100 });
		this.crearTexturas();
		this.crearTexturasConTextoAyuda();

		this.registry.events.on(Eventos.MenuAbrirAyuda, (nombreEscena: string) => {
			this.registry.set(Variables.EscenaActual, AyudaScene.Name);
			this.scene.launch(AyudaScene.Name);
		});

		// this.registry.events.on(Eventos.MenuAbrirEjemplos, () => {
		// 	this.scene.pause(PrincipalScene.Name);
		// 	this.registry.set(Variables.EscenaActual, EjemplosScene.Name);
		// 	this.scene.launch(EjemplosScene.Name);
		// });

		this.registry.events.on(Eventos.CambiarIdioma, (nombreEscena: string) => {

			// if (nombreEscena === PrincipalScene.Name) {
			// 	const auxSeleccionRapidaScene = <PrincipalScene> this.scene.get(PrincipalScene.Name);
			// 	if (auxSeleccionRapidaScene?.scene.settings.visible) {
			// 		// auxSeleccionRapidaScene.cambioTextosIdioma();
			// 	}
			// }
		});

		const callbackEventoResize = () => {
			const ancho = window.innerWidth;
			const alto = window.innerHeight;
			if (alto < ancho) {
				document.getElementById('rotar-dispositivo')!.style.display = 'none';
				this.scene.resume(this.registry.get(Variables.EscenaActual));
				// this.game.scene.resume;
			} else {
				if (this.scale.isFullscreen) {
					this.scale.stopFullscreen();
				}
				document.getElementById('rotar-dispositivo')!.style.display = 'block';
				this.scene.pause(this.registry.get(Variables.EscenaActual));
			}
		};

		this.scale.on(Phaser.Scale.Events.RESIZE, (gameSize: any, baseSize: any, displaySize: any, resolution: any) => {
			callbackEventoResize();
		});

		this.scene.start(PresentacionScene.Name);
		callbackEventoResize();
	}

	public update(): void {
		// preload handles updates to the progress bar, so nothing should be needed here.
	}

	/**
	 * Adds a progress bar to the display, showing the percentage of assets loaded and their name.
	 */
	private addProgressBar(): void {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;
		const posY = height / 2 + 100;
		/** Customizable. This text color will be used around the progress bar. */
		const outerTextColor = '#ffffff';

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0xd6bf6c, 0.8);
		progressBox.fillRect(width / 4, posY - 30, width / 2, 50);

		const loadingText = this.make.text({
			x: width / 2,
			y: posY - 50,
			text: "Cargando...",
			style: {
				font: "20px monospace",
				color: outerTextColor
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		const percentText = this.make.text({
			x: width / 2,
			y: posY - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				color: "#ffffff"
			}
		});
		percentText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: posY + 50,
			text: "",
			style: {
				font: "18px monospace",
				color: outerTextColor
			}
		});

		assetText.setOrigin(0.5, 0.5);

		this.load.on("progress", (value: number) => {
			percentText.setText(parseInt(value * 100 + "", 10) + "%");
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((width / 4) + 10, (posY) - 30 + 10, (width / 2 - 10 - 10) * value, 30);
		});

		this.load.on("fileprogress", (file: Phaser.Loader.File) => {
			assetText.setText('Cargando recurso: ' + file.key);
		});

		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}

	private crearTexturas() {
		let texturaFondo = this.make.renderTexture({ width: this.cameras.main.displayWidth, height: this.cameras.main.displayHeight }, false);
		texturaFondo.fill(0xffffff, 0.2, 0, 0, this.cameras.main.displayWidth, this.cameras.main.displayHeight);
		texturaFondo.saveTexture(TexturasManuales.FondoTransparente);

		texturaFondo = this.make.renderTexture({ width: this.cameras.main.displayWidth, height: this.cameras.main.displayHeight }, false);
		texturaFondo.fill(0x000000, 0.5, 0, 0, this.cameras.main.displayWidth, this.cameras.main.displayHeight);
		texturaFondo.saveTexture(TexturasManuales.FondoTransparenteOscuro);
	}

	private crearTexturasConTextoAyuda() {
		const anchoTextura = 1400;
		const titulosAlingX = 675;
		const detalleAlingX = 50;
		// const linea = this.add.graphics();
		// linea.lineStyle(8, 0x80effc, 1);
		// linea.visible = false;
		// linea.strokeRectShape(new Phaser.Geom.Rectangle(0, 0, anchoTextura, 400));

		let texturaAyuda1 = this.make.renderTexture({ width: anchoTextura, height: 840 }, false);
		// let imagen = this.add.image(0, 0, Imagenes.Ayuda1).setVisible(false).setOrigin(0, 0);
		// texturaAyuda1.draw(imagen, 300, 325);

		let text = this.add.text(0, 0, 'Advertencia', { fontFamily: 'Inter-Black', fontSize: 48, fontStyle: 'bold', color: '#000000'})
			.setOrigin(0.5, 0);
		texturaAyuda1.draw(text, titulosAlingX, 30);
		let textCantidad = this.add.text(0, 0, '1 de 1', { fontFamily: 'Inter-Black', fontSize: 24, fontStyle: 'bold', color: '#000000'})
			.setOrigin(0.5, 0);
		texturaAyuda1.draw(textCantidad, titulosAlingX, 90);
		const textoAuxStr = `El uso excesivo de emitters y efectos visuales puede generar una alta carga de
procesamiento gráfico. Esto podría provocar sobrecalentamiento en notebooks
o PCs con recursos limitados.

Para una experiencia óptima, se recomienda:
    ◾️ Moderar la cantidad de efectos activos simultáneamente.
    ◽️ Cerrar otras aplicaciones exigentes mientras se ejecuta la aplicación.
    ◾️ Vigilar la temperatura de la CPU y GPU.

El rendimiento varía según el dispositivo. ¡Úsalo con precaución!
`;
		let textoAux = this.add.text(0, 0, textoAuxStr, { fontFamily: 'Inter-Black', fontSize: 40, fontStyle: 'bold', color: '#000000'});
		texturaAyuda1.draw(textoAux, detalleAlingX, 130);
		texturaAyuda1.saveTexture(TexturasManuales.Ayuda1);

	}
}
