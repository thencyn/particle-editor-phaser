import Phaser from "phaser";
import { Sonidos, Variables } from "./Diccionario";

export class UtilSonido {
    static reproducirSonidoEfecto(escena: Phaser.Scene, sonido: Sonidos, config?: {
        rate?: number
    }) {
        const efectos = <boolean> escena.registry.get(Variables.MusicaEfectosActivada);
        if (efectos) {
            const volumen = <number> escena.registry.get(Variables.MusicaEfectosVolumen);
            escena.sound.play(sonido, { volume: volumen / 100, ...config });
        }
    }

	// static velocidadMusicaFondo(escena: Phaser.Scene, aumentar: boolean) {
	// 	const sonido = escena.sound.get(Sonidos.MusicaFondo);
	// 	if (sonido?.isPlaying) {
	// 		sonido.stop();
	// 		const volumen = <number> escena.registry.get(Variables.MusicaVolumen);
	// 		sonido.play({ loop: true, volume: volumen / 100, rate: aumentar ? 1.45 : 1 });
	// 	}
	// }

    // static detenerMusicaFondo(escena: Phaser.Scene) {
        // for (const element of [Sonidos.MusicOverworldHurryUpTheme, Sonidos.MusicOverworldTheme, Sonidos.MusicUndergroundTheme, Sonidos.MusicUndergroundHurryUpTheme]) {
        //     const sonido = escena.sound.get(element);
        //     if (sonido?.isPlaying) {
        //         sonido.stop();
        //     }
        // }
    // }
}



