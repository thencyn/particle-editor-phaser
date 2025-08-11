import { AtlasImagenes, AtlasImagenesVarias, AtlasParticulas, Imagenes } from "../Utilidades/Diccionario";
import PrincipalScene from "./PrincipalScene";
import { configuracion } from '../Config/config';


export default class PresentacionScene extends Phaser.Scene {
	public static Name = "SplashScreen";
	public preload(): void {
		//
	}

	public create(): void {
		this.add.text(this.cameras.main.displayWidth - 300, this.cameras.main.displayHeight - 40, `Version: ${configuracion.version}`, { fontSize: '32px', color: '#ffffff', fontStyle: 'bold' });
		this.add.text(25, this.cameras.main.displayHeight - 40, `Version Phaser: ${Phaser.VERSION}`, { fontSize: '32px', color: '#ffffff', fontStyle: 'bold' });
		this.verEstrellas();
		this.efectoLogo();
	}

	private loadMainMenu(): void {
		this.cameras.main.fadeOut(500, 0, 0, 0);
		this.scene.start(PrincipalScene.Name);
	}

	private verEstrellas() {
		const lista = this.add.group(null!, { key: AtlasImagenes.Particulas, frame: AtlasParticulas.Star1, repeat: 17 });
		(<Phaser.GameObjects.Sprite[]> lista.getChildren()).forEach((item, index) => {
			const posicion = Phaser.Utils.Array.GetRandom(['U', 'D', 'L', 'R']);
			const obtenerCoordendas =  {
				'U': () => ({ x: Phaser.Math.Between(0, this.cameras.main.displayWidth), y: -100 }),
				'D': () => ({ x: Phaser.Math.Between(0, this.cameras.main.displayWidth), y: this.cameras.main.displayHeight + 100 }),
				'L': () => ({ x: -100, y: Phaser.Math.Between(0, this.cameras.main.displayHeight) }),
				'R': () => ({ x: this.cameras.main.displayWidth + 100, y: Phaser.Math.Between(0, this.cameras.main.displayHeight) }),
			};
			const { x: posX, y: posY } = obtenerCoordendas[posicion]();
			item.setPosition(posX, posY);
			item.setFrame(Phaser.Utils.Array.GetRandom([AtlasParticulas.FuegoAmarillo, AtlasParticulas.FuegoAzul, AtlasParticulas.FuegoRojo, AtlasParticulas.FuegoVerde, AtlasParticulas.FuegoBlanco]));
			item.setBlendMode(Phaser.BlendModes.ADD);
		});

		const circle = new Phaser.Geom.Circle(this.cameras.main.centerX, this.cameras.main.centerY + 30, 100);
		this.tweens.chain({
			tweens:[
				{
					targets: lista.getChildren(),
					ease: 'Quintic.easeInOut',
					duration: 1250,
					x: circle.x,
					y: circle.y,
					angle: 720,
					// delay: 1000 * item,
				},
				{
					targets: circle,
					radius: 200,
					ease: 'Quintic.easeInOut',
					duration: 750,
					// repeat: -1,
					onStart: () => {
						Phaser.Actions.PlaceOnCircle(lista.getChildren(), circle);
					},
					onUpdate: () => {
						Phaser.Actions.RotateAroundDistance(lista.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
					}
				},
				{
					targets: circle,
					radius: 300,
					ease: 'Quintic.easeInOut',
					duration: 750,
					onUpdate: () => {
						Phaser.Actions.RotateAroundDistance(lista.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
					}
				},
				{
					targets: circle,
					radius: 400,
					ease: 'Quintic.easeInOut',
					duration: 750,
					onUpdate: () => {
						Phaser.Actions.RotateAroundDistance(lista.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
					}
				},
				{
					targets: circle,
					radius: 1500,
					ease: 'Quintic.easeInOut',
					duration: 1250,
					onUpdate: () =>
					{
						Phaser.Actions.RotateAroundDistance(lista.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
					},
				}
			],
		});
	}

	private efectoLogo() {
		const imagen = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 30, AtlasImagenes.ImagenesVarias, AtlasImagenesVarias.Logo)
			.setScale(0, 0)
			.setAlpha(0.5);
		this.tweens.add({
			targets: imagen,
			alpha: 1,
			scale: 1,
			ease: 'Bounce.easeOut',
			duration: 5000,
			onComplete: () => {
				this.loadMainMenu();
			}
		});
	}
}
