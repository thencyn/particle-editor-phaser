import 'phaser';
import PreloaderScene from './ts/Scenes/PreloaderScene';
import SpiralCurvePlugin from 'phaser3-rex-plugins/plugins/spiralcurve-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import FileChooserPlugin from 'phaser3-rex-plugins/plugins/filechooser-plugin.js';

// import { Game, Types } from "phaser";
// import { Game } from "phaser";

import EjemplosScene from './ts/Scenes/EjemplosScene';
import PresentacionScene from './ts/Scenes/PresentacionScene';
import PrincipalScene from './ts/Scenes/PrincipalScene';
import MenuScene from './ts/Scenes/MenuScene';
import AyudaScene from './ts/Scenes/AyudaScene';
import { configuracion } from './ts/Config/config';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const gameConfig: Phaser.Types.Core.GameConfig = {
    // width: 800,
	// height: 600,
	width: 2048,
	height: 1152,
	type: Phaser.AUTO,
	//pixelArt: true,
	backgroundColor: '#000000',
	// backgroundColor: '#ffffff',
	parent: "phaser-game",
	title: "Particle Editor Phaser",
	// maxLights: 5,
	// physics: {
	// 	default: 'arcade',
	// 	arcade: {
	// 		gravity: {
	// 			y: 800
	// 		},
	// 		debug: true
	// 	}
	// },
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
	dom: {
        createContainer: true
    },
	banner: true,
	plugins: {
		global: [
			{
				key: 'rexSpiralCurve',
				plugin: SpiralCurvePlugin,
				start: true
			},
			{
				key: 'rexInputTextPlugin',
				plugin: InputTextPlugin,
				start: true
			},
			{
				key: 'rexFileChooser',
				plugin: FileChooserPlugin,
				start: true
			}
		],
		scene: [
			{
				key: 'rexUI',
				plugin: UIPlugin,
				mapping: 'rexUI'
			},
        ],
	}
	// banner: {
	// 	hidePhaser: true,
	// 	text: '#fff00f',
	// 	background: [
	// 		'#16a085',
	// 		'#2ecc71',
	// 		'#e74c3c',
	// 		'#000000',
	// 	]
	// },
};

// export default new Game(config);
export default class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);

		this.scene.add(PreloaderScene.Name, PreloaderScene);
		this.scene.add(PresentacionScene.Name, PresentacionScene);
		this.scene.add(PrincipalScene.Name, PrincipalScene);
		this.scene.add(EjemplosScene.Name, EjemplosScene);
		this.scene.add(MenuScene.Name, MenuScene);
		this.scene.add(AyudaScene.Name, AyudaScene);
		this.scene.start(PreloaderScene.Name);
		console.log(`version ${configuracion.version}`);
	}
}


window.onload = (): void => {
	const url = new URL(document.URL);
	const searchParams = new URLSearchParams(url.search);
	const color = `#${searchParams.get('color') || '000000'}`;
	const width = !Number(searchParams.get('width')) ? 2048 : Number(searchParams.get('width'));
	const height = !Number(searchParams.get('height')) ? 1152 : Number(searchParams.get('height'));

	// console.log({ a: Number(searchParams.get('width')), b: !Number('aa'), c: !Number(null), d: !Number(undefined), e: !Number(undefined), });
	gameConfig.backgroundColor = color;
	gameConfig.width = width < 1600 ? 1600 : width;
	gameConfig.height = height < 1024 ? 1024 : height;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	new Game(gameConfig);
	// Uncomment the following two lines if you want the game to scale to fill the entire page, but keep the game ratio.
	//resize();
	//window.addEventListener("resize", resize, true);
	// // loadFont("Inter-Black", "assets/font/Inter-Black.woff2");
	// getParametros();
};

function loadFont(name: string, url: string) {
	// const newFont = new FontFace(name, `url(${url})`);
	// newFont.load().then(function (loaded) {
	// 	document.fonts.add(loaded);
	// }).catch(function (error) {
	// 	return error;
	// });
}

// function getParametros() {
// 	const url = new URL(document.URL);
// 	const searchParams = new URLSearchParams(url.search);
// }
