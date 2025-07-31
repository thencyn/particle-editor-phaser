import { AtlasBotonesImagenes, AtlasImagenes, AtlasImagenesDetalles, Eventos, Sonidos, TexturasManuales, Variables } from "../Utilidades/Diccionario";
import { UtilDispositivo } from "../Utilidades/UtilDispositivo";
import { UtilSonido } from "../Utilidades/UtilSonido";

export default class MenuScene extends Phaser.Scene {
	public static Name = "MenuScene";
	//Esta escena no se esta utilizando todavia
	private botonMenu: Phaser.GameObjects.Image;
	private botonMusica: Phaser.GameObjects.Image;
	private botonMusicaEfectos: Phaser.GameObjects.Image;
	private botonConfiguracion: Phaser.GameObjects.Image;
	private botonAyuda: Phaser.GameObjects.Image;
	private botonVibrar: Phaser.GameObjects.Image;
	private cerrandoEscena = false;
	public init() {
		this.cerrandoEscena = false;
	}

	public preload(): void {
	}

	public create(): void {
		this.add.image(0, 0, TexturasManuales.FondoTransparente)
			.setOrigin(0, 0)
			.setInteractive()
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.cerrandoEscena) {
					this.cerrarEscena();
				}
			});

		this.crearBotonMenu();
		// this.crearBotonMusica();
		this.crearBotonMusicaEfectos();
		this.crearBotonAyuda();
		this.crearBotonConfiguraciones();
		const container = this.add.container(this.cameras.main.width + 50, 150);
		if (this.botonVibrar) {
			container.add([this.botonMusica, this.botonMusicaEfectos, this.botonAyuda, this.botonConfiguracion, this.botonVibrar]);
		} else {
			container.add([this.botonMusica, this.botonMusicaEfectos, this.botonAyuda, this.botonConfiguracion]);
		}
		this.add.tween({
			targets: [container],
			// y: 150,
			x: this.cameras.main.width - 200,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
		});
	}

	crearBotonMenu() {
		this.botonMenu = this.add.image(this.cameras.main.width - 110, 20, AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.Menu))
			// .setScale(0.5)
			.setOrigin(0)
			.setDepth(2)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				if (!this.cerrandoEscena) {
					this.cerrarEscena();
				}
			})
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				this.botonMenu.setTint(0x66caff);
			})
			.on(Phaser.Input.Events.POINTER_OUT, () => {
				this.botonMenu.clearTint();
			});
	}

	// crearBotonMusica() {
	// 	const fnSonidoActivo = () => {
	// 		const sonido = this.sound.get(Sonidos.MusicaFondo);
	// 		return sonido?.isPlaying;
	// 	};

	// 	const musicaVolumen = <number> this.registry.get(Variables.MusicaVolumen);
	// 	this.botonMusica = this.add.image(130, 300, AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaOn))
	// 		.setDepth(2)
	// 		// .setDisplaySize(45, 45)
	// 		.setInteractive({ useHandCursor: true })
	// 		.on(Phaser.Input.Events.POINTER_MOVE, () => {
	// 			this.botonMusica.setTint(0x66caff);
	// 		})
	// 		.on(Phaser.Input.Events.POINTER_OUT, () => {
	// 			this.botonMusica.clearTint();
	// 		});

	// 	this.botonMusica.on(Phaser.Input.Events.POINTER_UP, () => {
	// 		const sonido = this.sound.get(Sonidos.MusicaFondo);
	// 		if (!sonido) {
	// 			this.sound.play(Sonidos.MusicaFondo, { loop: true, volume: musicaVolumen / 100 });
	// 			this.botonMusica.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaOn));
	// 		}else if (sonido?.isPlaying) {
	// 			this.botonMusica.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaOff));
	// 			sonido.stop();
	// 		} else {
	// 			sonido.play({loop: true, volume: musicaVolumen / 100});
	// 			this.botonMusica.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaOn));
	// 		}
	// 	});

	// 	if (!fnSonidoActivo()) {
	// 		this.botonMusica.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaOff));
	// 	}
	// }

	crearBotonMusicaEfectos() {
		const efectosSonido = <boolean> this.registry.get(Variables.MusicaEfectosActivada);
		this.botonMusicaEfectos = this.add.image(130, 200, AtlasImagenes.Botones, efectosSonido ? AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaEfectos) : AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaEfectosOff))
			.setDepth(2)
			// .setDisplaySize(45, 45)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				const efectosSonidoActivados = <boolean> this.registry.get(Variables.MusicaEfectosActivada);
				this.registry.set(Variables.MusicaEfectosActivada, !efectosSonidoActivados);
				UtilSonido.reproducirSonidoEfecto(this, Sonidos.ApretarBoton);
				if (!efectosSonidoActivados) {
					// this.botonMusicaEfectos.clearTint();
					this.botonMusicaEfectos.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaEfectos));
				} else {
					// this.botonMusicaEfectos.setTint(0xff504d);
					this.botonMusicaEfectos.setTexture(AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.MusicaEfectosOff));
				}
			});

		this.botonMusicaEfectos.on(Phaser.Input.Events.POINTER_MOVE, () => {
			this.botonMusicaEfectos.setTint(0x66caff);
		});
		this.botonMusicaEfectos.on(Phaser.Input.Events.POINTER_OUT, () => {
			// const efectosSonido = <boolean> this.registry.get(Variables.MusicaEfectosActivada);
			this.botonMusicaEfectos.clearTint();
			// if (<boolean> this.registry.get(Variables.MusicaEfectosActivada)) {
			// 	this.botonMusicaEfectos.clearTint();
			// } else {
			// 	this.botonMusicaEfectos.setTint(0xff504d);
			// }
		});
	}

	crearBotonAyuda() {
		this.botonAyuda = this.add.image(130, 100, AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.Informacion))
			.setDepth(2)
			// .setDisplaySize(45, 45)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.cerrarEscena(true);
			})
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				this.botonAyuda.setTint(0x66caff);
			})
			.on(Phaser.Input.Events.POINTER_OUT, () => {
				this.botonAyuda.clearTint();
			});
	}

	crearBotonConfiguraciones() {
		this.botonConfiguracion = this.add.image(130, 0, AtlasImagenes.Botones, AtlasImagenesDetalles[AtlasImagenes.Botones].callbackObtenerFrame(AtlasBotonesImagenes.Configuracion))
			.setDepth(2)
			// .setDisplaySize(45, 45)
			.setInteractive({ useHandCursor: true })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.cerrarEscena(false, true);
			})
			.on(Phaser.Input.Events.POINTER_MOVE, () => {
				this.botonConfiguracion.setTint(0x66caff);
			})
			.on(Phaser.Input.Events.POINTER_OUT, () => {
				this.botonConfiguracion.clearTint();
			});
	}

	cerrarEscena(enviarEventoVerAyuda = false, enviarEventoVerConfiguraciones = false) {
		this.cerrandoEscena = true;
        UtilSonido.reproducirSonidoEfecto(this, Sonidos.Menu);
		const container = this.add.container(this.cameras.main.width - 200, 150);
		if (this.botonVibrar) {
			container.add([this.botonMusica, this.botonMusicaEfectos, this.botonAyuda, this.botonConfiguracion, this.botonVibrar]);
		} else {
			container.add([this.botonMusica, this.botonMusicaEfectos, this.botonAyuda, this.botonConfiguracion]);
		}
		this.add.tween({
			targets: [container],
			// y: -300,
			x: this.cameras.main.width + 50,
			ease: 'Cubic', //'Cubic', 'Elastic', 'Bounce', 'Back'
			onComplete: () => {
				this.scene.stop(MenuScene.Name);
				if (enviarEventoVerAyuda) {
					this.registry.events.emit(Eventos.MenuAbrirAyuda, this.registry.get(Variables.EscenaLaunchMenu)); // el 2do parametro no se si se utilizara en algun momento
				} else if (enviarEventoVerConfiguraciones) {
					this.registry.events.emit(Eventos.MenuAbrirConfiguraciones, this.registry.get(Variables.EscenaLaunchMenu)); // el 2do parametro no se si se utilizara en algun momento
				} else {
					this.scene.resume(this.registry.get(Variables.EscenaLaunchMenu));
				}
			}
		});
	}
}
