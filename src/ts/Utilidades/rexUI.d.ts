// rexUI.d.ts

import * as Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

declare module 'phaser' {
	interface Scene {
		rexUI: RexUIPlugin;
		rexFileChooser: FileChooser;
	}
}
