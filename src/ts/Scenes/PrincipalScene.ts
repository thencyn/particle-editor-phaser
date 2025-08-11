import { ProyectoGuardarComponent } from "../Components/ProyectoGuardarComponent";
import { MenuComponent } from "../Components/MenuComponent";
import { MostrarEmittersComponent } from "../Components/MostrarEmittersComponent";
import { AtlasBotonesImagenes, AtlasImagenes, AtlasImagenesVarias, AtlasParticulas, Eventos, Imagenes, Sonidos, Variables } from "../Utilidades/Diccionario";
import { IConfiguracionAdicional, IConfiguracionEmitter, IDestroyable, IGuardarConfiguracionEmitter, IGuardarConfiguracionProyectos, IMemoria, IProyectosBasicosConfiguracion, propiedadesAdvancedFormulaArray, typePropiedadesAdvancedFormula } from "../Utilidades/Interfaces";
import { UtilSonido } from "../Utilidades/UtilSonido";
import { ProyectoAbrirComponent } from "../Components/ProyectoAbrirComponent";
import { UtilProyectos } from "../Utilidades/UtilProyectos";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { DeathZoneComponent } from "../Components/DeathZoneComponent";
import { EmitZoneComponent } from "../Components/EmitZoneComponent";
import { UtilFiguras } from "../Utilidades/UtilFiguras";
import { ExportarMenuComponent } from "../Components/ExportarMenuComponent";
import { UtilEjemplos } from "../Utilidades/UtilEjemplos";
import { BarraVisualizacionEjemplosComponent } from "../Components/BarraVisualizacionEjemplosComponent";
import AyudaScene from "./AyudaScene";
import { PropiedadesIngresoAvanzadoComponent } from "../Components/PropiedadesIngresoAvanzadoComponent";


export default class PrincipalScene extends Phaser.Scene {
	public static Name = "PrincipalScene";
	private COLOR_MAIN = 0x424242;
	private COLOR_LIGHT = 0x6d6d6d;
	private COLOR_DARK = 0x1b1b1b;
	private menuComponent: MenuComponent;
	private mostrarEmittersComponent: MostrarEmittersComponent;
	private proyectoGuardarComponent: ProyectoGuardarComponent;
	private proyectoAbrirComponent: ProyectoAbrirComponent;
	private deathZoneComponent: DeathZoneComponent;
	private emitZoneComponent: EmitZoneComponent;
	private exportarMenuComponent: ExportarMenuComponent;
	private propiedadesIngresoAvanzadoComponent: PropiedadesIngresoAvanzadoComponent;
	private menuAbierto: IDestroyable | null = null;
	private listaEmitters: IConfiguracionEmitter[] = [];
	private indexEmitterSeleccionado = 0;
	private proyectoDatos: IProyectosBasicosConfiguracion;
	private panel: any;
	private listaEases = [ '--Sin Ease--', 'Back.in', 'Back.inOut', 'Back.out', 'Bounce.in', 'Bounce.inOut', 'Bounce.out', 'Circ.in', 'Circ.inOut', 'Circ.out', 'Cubic.in', 'Cubic.inOut', 'Cubic.out', 'Expo.in', 'Expo.inOut', 'Expo.out', 'Linear', 'Quad.in', 'Quad.inOut', 'Quad.out', 'Quart.in', 'Quart.inOut', 'Quart.out', 'Quint.in', 'Quint.inOut', 'Quint.out', 'Sine.in', 'Sine.inOut', 'Sine.out'];

	private capturaCoordenadasFlag: boolean = false;
	private capturaCoordenadasTipo: '' | 'PosicionX-Puntos' | 'PosicionX-Interpolacion' | 'PosicionY-Puntos' | 'PosicionY-Interpolacion';
	private capturaCoordenadasListaPuntos: Phaser.Geom.Point[] = [];
	private capturaCoordenadasLabel: Label;
	private barraVisualizacionEjemplosComponent: BarraVisualizacionEjemplosComponent;

	public init() {
	}

	public preload() {
		// this.load.image('settings', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/settings.png');
        // this.load.image('arrow-down', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down.png');
	}

	private createPanel(scene) {
		return scene.rexUI.add.tweaker({
			width: 340,

			styles: {
				background: {
					radius: 10,
					color: 0x0,
					strokeColor: 0xffffff,
				},

				inputRow: {
					background: {
						strokeColor: this.COLOR_MAIN
					},

					title: {
						space: { icon: 2 },
						iconSize: 30,
					},

					inputText: {
						background: {
							color: this.COLOR_DARK
						},
						focusStyle: {
							color: this.COLOR_MAIN,
						},
						style: {
							backgroundBottomY: 4,
							backgroundHeight: 18,
						},
						cursorStyle: {
							color: 'black',
							backgroundColor: 'white',
						}
					},

					inputTextArea: {
						height: 100,
					},

					slider: {
						track: {
							color: this.COLOR_DARK,
							width: 8, height: 8,
						},
						indicator: {
							color: this.COLOR_MAIN,
							width: 8, height: 8,
						},
						thumb: {
							color: this.COLOR_LIGHT,
							width: 16, height: 16,
						},
					},

					list: {
						label: {
							background: {
								color: this.COLOR_DARK,
							},
							space: { left: 5, right: 5 }
						},
						button: {
							space: { left: 5, right: 5, top: 8, bottom: 8 },
							background: {
								color: this.COLOR_DARK,
								strokeColor: this.COLOR_LIGHT,

								'hover.color': this.COLOR_LIGHT,
							},

						},
					},

					button: {
						space: { left: 8, right: 8, top: 8, bottom: 8 },
						background: {
							color: this.COLOR_DARK,
							// color: 0xff0000,
							strokeColor: this.COLOR_LIGHT,
							'active.color': 0x005cb2
						},

					},

					checkbox: {
						color: this.COLOR_LIGHT,
						boxStrokeColor: this.COLOR_DARK,
						uncheckedColor: this.COLOR_DARK,
					},

					toggleSwitch: {

						// color: this.COLOR_LIGHT,
						size: 30,
						color: 0x005cb2,
						falseValueTrackColor: this.COLOR_MAIN,
					},

					colorInput: {
						colorPicker: {
							background: { color: 0x0, strokeColor: this.COLOR_LIGHT },
						},

						colorComponents: {
							inputText: {
								background: {
									color: this.COLOR_DARK
								},
								focusStyle: {
									color: this.COLOR_MAIN,
								},
								style: {
									backgroundBottomY: 4,
									backgroundHeight: 18,
								},
								cursorStyle: {
									color: 'black',
									backgroundColor: 'white',
								}
							}
						}
					},

					incDec: {
						incButton: {
							space: { left: 5, right: 5 },
							icon: { key: Imagenes.ArrowDown, flipY: true },
							// icon: { key: AtlasImagenes.Botones, frame: AtlasBotonesImagenes.Anterior },
							iconSize: 20,
							background: {
								color: this.COLOR_DARK,
								strokeColor: this.COLOR_LIGHT,
							},

						},
						decButton: {
							space: { left: 5, right: 5 },
							icon: { key: Imagenes.ArrowDown },
							iconSize: 20,
							background: {
								color: this.COLOR_DARK,
								strokeColor: this.COLOR_LIGHT,
							},

						},
					},

				},

				folder: {
					title: {
						iconSize: 30,
						background: { color: this.COLOR_DARK },
						space: { icon: 2 },

						expandedIcon: {
							color: this.COLOR_MAIN,
						},
					},

					background: {
						strokeColor: this.COLOR_DARK
					},

					space: {
						left: 10, right: 0, top: 5, bottom: 5, item: 3
					},
				},

				tab: {
					tab: {
						background: {
							color: this.COLOR_DARK,
							strokeColor: this.COLOR_MAIN,
							'active.color': 0x005cb2,
						},
						space: { left: 3, right: 3, top: 3, bottom: 3 }
					},
					tabs: {
						space: { item: 3 }
					},
					pages: {
						fadeIn: 300
					},
				},

				separator: {
					height: 5,
					color: this.COLOR_DARK
				},

				space: {
					left: 10, right: 10, top: 10, bottom: 10, item: 3
				}
			},
		})
	}

	public create(): void {
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.menuComponent = new MenuComponent(this);
		this.proyectoGuardarComponent = new ProyectoGuardarComponent(this);
		this.proyectoAbrirComponent = new ProyectoAbrirComponent(this);
		this.mostrarEmittersComponent = new MostrarEmittersComponent(this);
		this.deathZoneComponent = new DeathZoneComponent(this);
		this.emitZoneComponent = new EmitZoneComponent(this);
		this.exportarMenuComponent = new ExportarMenuComponent(this);
		this.propiedadesIngresoAvanzadoComponent = new PropiedadesIngresoAvanzadoComponent(this);

		this.crearNuevoEmitter();
		this.crearPanel();
		this.registry.events.on(Eventos.MenuMostrar, (soloBoton: boolean) => {
			this.menuAbierto = null;
			if (this.capturaCoordenadasFlag) {
				return;
			}

			if (soloBoton) {
				this.menuComponent.showButtonMenu();
			} else {
				this.menuComponent.showFullMenu();
			}
		});

		this.registry.events.on(Eventos.EmittersVerMenu, (abrirEmitters: boolean = true) => {
			this.menuComponent.hideFullMenu();
			this.mostrarEmittersComponent.show(this.listaEmitters, this.indexEmitterSeleccionado);
			this.menuAbierto = this.mostrarEmittersComponent;

		});

		this.registry.events.on(Eventos.EmitterCrear, () => {
			this.crearNuevoEmitter();
			this.mostrarEmittersComponent.actualizarEmitters(this.listaEmitters, this.indexEmitterSeleccionado);
		});

		this.registry.events.on(Eventos.EmitterEliminar, (indexEliminar: number) => {
			this.listaEmitters[indexEliminar].emitter.destroy();
			this.listaEmitters[indexEliminar].graphicsBounds.destroy();
			this.listaEmitters[indexEliminar].bokeh?.destroy();
			this.listaEmitters[indexEliminar].gravityWell?.destroy();
			this.listaEmitters[indexEliminar].gravityWellPunto?.destroy();
			this.listaEmitters[indexEliminar].graphicsDeathZone?.destroy();
			this.listaEmitters[indexEliminar].graphicsEmitZone?.destroy();

			this.listaEmitters[indexEliminar].emitter = null;
			this.listaEmitters[indexEliminar].graphicsBounds = null;
			this.listaEmitters[indexEliminar].bokeh = null;
			this.listaEmitters[indexEliminar].gravityWell = null;
			this.listaEmitters[indexEliminar].gravityWellPunto = null;
			this.listaEmitters[indexEliminar].graphicsDeathZone = null;
			this.listaEmitters[indexEliminar].graphicsEmitZone = null;
			this.listaEmitters.splice(indexEliminar, 1);
			if (this.indexEmitterSeleccionado === indexEliminar) {
				this.indexEmitterSeleccionado = 0;
				this.crearPanel();
			} else if (this.indexEmitterSeleccionado > indexEliminar) {
				this.indexEmitterSeleccionado--;
			}
			this.mostrarEmittersComponent.actualizarEmitters(this.listaEmitters, this.indexEmitterSeleccionado);
		});

		this.registry.events.on(Eventos.EmitterSeleccionar, (indexSeleccionar: number) => {
			this.indexEmitterSeleccionado = indexSeleccionar;
			this.mostrarEmittersComponent.actualizarEmitters(this.listaEmitters, this.indexEmitterSeleccionado);
			this.crearPanel();
		});

		this.registry.events.on(Eventos.EmitterCambiarImagen, (index: number, frame: string[], frameCycle: boolean) => {
			this.listaEmitters[index].frame = frame;
			this.listaEmitters[index].frameCycle = frameCycle;
			this.resetEmitter(index, true);
			this.mostrarEmittersComponent.actualizarEmitters(this.listaEmitters, this.indexEmitterSeleccionado);
		});

		this.registry.events.on(Eventos.EmitterDeathZoneCrear, (nueva: boolean, indexDeathZone: number, tipo: 'onLeave' | 'onEnter', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle) => {
			this.emitterDeathZone(nueva, indexDeathZone, tipo, figura);
		});

		this.registry.events.on(Eventos.EmitterDeathZoneEliminar, (indexEliminar: number) => {
			this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaDeathZones.splice(indexEliminar, 1);
			this.deathZoneComponent.update(this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaDeathZones);
			const emitter = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
			const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
			emitter.clearDeathZones();
			const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
			if (memoria.deathZone.deathZone_activado) {
				emitter.addDeathZone(configAdicional.listaDeathZones.map(x => ({
					type: x.tipo,
					source: x.figura,
				})));
			}
			this.graficarDeathZone(this.indexEmitterSeleccionado);
		});

		this.registry.events.on(Eventos.EmitterEmitZoneCrear, (nueva: boolean, indexDeathZone: number, tipo: 'edge' | 'random', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line, quantity: number, total: number, yoyo: boolean) => {
			this.emitterEmitZone(nueva, indexDeathZone, tipo, figura, quantity, total, yoyo);
		});

		this.registry.events.on(Eventos.EmitterEmitZoneEliminar, (indexEmitZoneEliminar: number) => {
			this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaEmitZones.splice(indexEmitZoneEliminar, 1);
			this.emitZoneComponent.update(this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaEmitZones);
			const emitter = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
			const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
			const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
			emitter.clearEmitZones();
			if (configAdicional.listaEmitZones.length > 0 && memoria.emitZone.emitZone_activado) {
				for (const emitZone of configAdicional.listaEmitZones) {
					const aux = {
						type: emitZone.tipo,
						source: UtilFiguras.obtenerInstanciaFiguraPosicionRelativa(emitZone.figura, emitter),
						quantity: emitZone.quantity,
						total: emitZone.total,
						yoyo: emitZone.yoyo
					};
					if (emitZone.tipo === 'random') {
						delete aux.quantity;
						delete aux.yoyo;
					}
					emitter.addEmitZone(aux);
				}
			}
			this.graficarEmitZone(this.indexEmitterSeleccionado);
		});


		this.registry.events.on(Eventos.MenuProyectoNuevo, () => {
			for (const item of this.listaEmitters) {
				item.emitter.off('complete');
				item.emitter.destroy();
				item.graphicsBounds.destroy();
				item.graphicsDeathZone.destroy();
				item.graphicsEmitZone.destroy();
				item.bokeh?.destroy();
				item.gravityWell?.destroy();
				item.gravityWellPunto?.destroy();

				item.emitter = null;
				item.graphicsBounds = null;
				item.graphicsDeathZone = null;
				item.graphicsEmitZone = null;
				item.bokeh = null;
				item.gravityWell = null;
				item.gravityWellPunto = null;
				item.memoria = null;
				item.configParticle = null;
				item.configAdicional = null;
				item.texture = null;
				item.frame = null;
			}
			this.listaEmitters = [];
			this.indexEmitterSeleccionado = 0;
			this.proyectoDatos = null;
			this.crearNuevoEmitter();
			this.crearPanel();
		});

		this.registry.events.on(Eventos.MenuProyectoGuardar, () => {
			this.menuComponent.hideFullMenu();
			this.proyectoGuardarComponent.show(this.listaEmitters, this.proyectoDatos?.id, this.proyectoDatos?.nombreProyecto);
			this.menuAbierto = this.proyectoGuardarComponent;
		});

		this.registry.events.on(Eventos.MenuProyectoAbrir, () => {
			this.menuComponent.hideFullMenu();
			this.proyectoAbrirComponent.show();
			this.menuAbierto = this.proyectoAbrirComponent;
		});

		this.registry.events.on(Eventos.ProyectoAbrir, (id?: number) => {
			this.menuComponent.showButtonMenu();
			this.menuAbierto = null;
			if (id) {
				this.proyectoAbrirGuardados(id);
			}
		});

		this.registry.events.on(Eventos.ProyectoGuardado, (proyecto: IProyectosBasicosConfiguracion) => {
			this.proyectoDatos = proyecto;
		});

		this.registry.events.on(Eventos.EmitterClonar, (index: number) => {
			this.emitterClonar(index);
			this.mostrarEmittersComponent.actualizarEmitters(this.listaEmitters, this.indexEmitterSeleccionado);
		});

		this.registry.events.on(Eventos.MenuExportar, () => {
			this.menuComponent.hideFullMenu();
			this.exportarMenuComponent.show(this.indexEmitterSeleccionado);
			this.menuAbierto = this.exportarMenuComponent;
		});

		this.registry.events.on(Eventos.Exportar, (tipo: 'proyecto' | 'proyectojs' | 'emitter' | 'emitters', index?: number) => {
			if (tipo === 'proyecto') {
				UtilProyectos.exportarProyecto(this.listaEmitters, this.proyectoDatos);
			} else if (tipo === 'proyectojs') {
				const listaEmittersExportar = this.listaEmitters.map((item, index) => {
					const configAdicional = item.configAdicional;
					const memoria = item.memoria;
					let configParticulas = this.obtenerConfigParticleDesdeMemoria(item.configAdicional, memoria);
					const propiedadesFunction = this.obtenerPropiedadesFunctionEmitter(configAdicional, memoria);
					configParticulas = { ...configParticulas, ...propiedadesFunction };
					this.eliminarPropiedadesEmitter(configParticulas, configAdicional, memoria)
					configParticulas.frame = !item.frameCycle ? item.frame : { frames: item.frame, cycle: true };
					return {
						x: item.emitter.x,
						y: item.emitter.y,
						texture: item.texture,
						frame: item.frame,
						configParticle: configParticulas,
						memoria: memoria,
						listaDeathZones: configAdicional.listaDeathZones,
						listaEmitZones: configAdicional.listaEmitZones,
						emitZoneAbsolutoX: configAdicional.emitZoneAbsolutoX,
						emitZoneAbsolutoY: configAdicional.emitZoneAbsolutoY,
						listaPropiedadesFunction: configAdicional.listaPropiedadesFunction,
					};
				});
				UtilProyectos.exportarProyectoJS(this.proyectoDatos?.nombreProyecto || 'Proyecto 1', listaEmittersExportar);
			} else if (tipo === 'emitter') {
				const indexExportar = index ?? this.indexEmitterSeleccionado;
				const configAdicional = this.listaEmitters[indexExportar].configAdicional;
				const memoria = this.listaEmitters[indexExportar].memoria;
				let configParticulas = this.obtenerConfigParticleDesdeMemoria(configAdicional, memoria);
				const propiedadesFunction = this.obtenerPropiedadesFunctionEmitter(configAdicional, memoria);
				configParticulas = { ...configParticulas, ...propiedadesFunction };
				this.eliminarPropiedadesEmitter(configParticulas, configAdicional, memoria)
				configParticulas.frame = !this.listaEmitters[indexExportar].frameCycle ? this.listaEmitters[indexExportar].frame : { frames: this.listaEmitters[indexExportar].frame, cycle: true };
				const emitter = {
					x: this.listaEmitters[indexExportar].emitter.x,
					y: this.listaEmitters[indexExportar].emitter.y,
					texture: this.listaEmitters[indexExportar].texture,
					frame: this.listaEmitters[indexExportar].frame,
					configParticle: configParticulas,
					memoria: memoria,
					listaDeathZones: this.listaEmitters[indexExportar].configAdicional.listaDeathZones,
					listaEmitZones: this.listaEmitters[indexExportar].configAdicional.listaEmitZones,
					emitZoneAbsolutoX: this.listaEmitters[indexExportar].configAdicional.emitZoneAbsolutoX,
					emitZoneAbsolutoY: this.listaEmitters[indexExportar].configAdicional.emitZoneAbsolutoY,
					listaPropiedadesFunction: configAdicional.listaPropiedadesFunction,
				};
				UtilProyectos.exportarEmitters([emitter]);
			} else if (tipo === 'emitters') {
				const listaEmittersExportar = this.listaEmitters.map((item, index) => {
					const configAdicional = item.configAdicional;
					const memoria = item.memoria;
					let configParticulas = this.obtenerConfigParticleDesdeMemoria(item.configAdicional, memoria);
					const propiedadesFunction = this.obtenerPropiedadesFunctionEmitter(configAdicional, memoria);
					configParticulas = { ...configParticulas, ...propiedadesFunction };
					this.eliminarPropiedadesEmitter(configParticulas, configAdicional, memoria);
					configParticulas.frame = !item.frameCycle ? item.frame : { frames: item.frame, cycle: true };
					return {
						x: item.emitter.x,
						y: item.emitter.y,
						texture: item.texture,
						frame: item.frame,
						configParticle: configParticulas,
						memoria: memoria,
						listaDeathZones: configAdicional.listaDeathZones,
						listaEmitZones: configAdicional.listaEmitZones,
						emitZoneAbsolutoX: configAdicional.emitZoneAbsolutoX,
						emitZoneAbsolutoY: configAdicional.emitZoneAbsolutoY,
						listaPropiedadesFunction: configAdicional.listaPropiedadesFunction,
					};
				});
				UtilProyectos.exportarEmitters(listaEmittersExportar);
			}
			// this.menuAbierto = this.exportarMenuComponent;
		});

		this.registry.events.on(Eventos.AbrirNuevoEjemplo, (listaEmitters: IGuardarConfiguracionEmitter[]) => {
			this.abrirProyecto(listaEmitters);
			this.proyectoDatos = null;
			this.menuAbierto?.destroy();
			this.menuAbierto = null;
			this.barraVisualizacionEjemplosComponent.show();
		});

		this.registry.events.on(Eventos.Importar, (proyecto: IGuardarConfiguracionProyectos) => {
			this.proyectoDatos = {
				nombreProyecto: proyecto.nombreProyecto,
				id: proyecto.id,
				fecha: proyecto.fecha
			};
			this.abrirProyecto(proyecto.listaEmitters);
		});

		this.registry.events.on(Eventos.FormulasAvanzadasGuardar, (propiedad: typePropiedadesAdvancedFormula) => {
			const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
			const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
			if (configAdicional[`${propiedad}Seleccionada`] !== 'Avanzado') {
				return;
			} else if (!memoria[`${propiedad}`][`${propiedad}_onEmitActivado`] && !memoria[`${propiedad}`][`${propiedad}_onUpdateActivado`]) {
				return;
			} else if (configAdicional.tipoScaleSeleccionada === 'Scale' && ['scaleX', 'scaleY'].includes(propiedad)) {
				return;
			} else if (configAdicional.tipoScaleSeleccionada === 'ScaleXY' && propiedad === 'scale') {
				return;
			}
			this.resetEmitter(this.indexEmitterSeleccionado, false);
		});

		this.barraVisualizacionEjemplosComponent = new BarraVisualizacionEjemplosComponent(this);
		this.scene.pause(PrincipalScene.Name);
		this.scene.launch(AyudaScene.Name);
	}

	private crearPanel() {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const properties = this.crearPropiedadesPanel(this.listaEmitters[this.indexEmitterSeleccionado].configAdicional, this.listaEmitters[this.indexEmitterSeleccionado].memoria);
		this.panel?.destroy();
        this.panel = this.createPanel(this)
            .addRows(properties, memoria, true)
            .setPosition(0, 0)
			.setOrigin(0)
			.setDepth(0)
            .layout();
		this.panel.on('valuechange', (newValue, oldValue, bindingTarget, bindingKey: string) => {
			let resetEmitZoneCambioXY = false;
			let resetColor = false;
			let resetBounds = false;
			let resetGravityWell = false;
			let resetPropiedadBasica = false;
			let resetStopAfterDuration = false;
			let resetDetenerMoveTo = false;
			const particulaEmitter = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
			const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
			const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
			if (bindingKey === 'x') {
				particulaEmitter.setPosition(newValue, particulaEmitter.y);
				if (configAdicional.listaEmitZones.length > 0) {
					this.recalcularEmitZone(newValue, particulaEmitter.y);
				}
				// resetEmitZoneCambioXY = configAdicional.listaEmitZones.length > 0;
			} else if (bindingKey === 'y') {
				particulaEmitter.setPosition(particulaEmitter.x, newValue);
				if (configAdicional.listaEmitZones.length > 0) {
					this.recalcularEmitZone(particulaEmitter.x, newValue);
				}
				// resetEmitZoneCambioXY = configAdicional.listaEmitZones.length > 0;
			} else if (['lifespan', 'frequency', 'quantity', 'gravityX', 'gravityY', 'blendMode', 'maxVelocityX', 'maxVelocityY', 'advance', 'hold', 'particleBringToTop', 'sortProperty', 'sortOrderAsc', 'moveToX', 'moveToY'].includes(bindingKey)) {
				this.cambiarPropiedadesEmitter(bindingKey, newValue);
				// resetSort = ['sortProperty', 'sortOrderAsc'].includes(bindingKey);
				// resetPropiedadBasica = 'sortProperty' === bindingKey;
				resetPropiedadBasica = 'sortProperty' === bindingKey || ('gravityX' === bindingKey && newValue === 0) || ('gravityY' === bindingKey && newValue === 0);
			} else if (bindingKey === 'tipoSpeedSeleccionada') {
				configAdicional.tipoSpeedSeleccionada = newValue;
				this.cambiarTipoVelocidad();
			} else if (bindingKey === 'tipoScaleSeleccionada') {
				configAdicional.tipoScaleSeleccionada = newValue;
				this.cambiarTipoScale();
			} else if (bindingKey === 'angle_activado') {
				configAdicional.velocidadAngleActivado = newValue;
			} else if (bindingKey.startsWith('angle_')) {
				this.cambiarPropiedadesCompuestasEmitter(bindingKey);
			} else if (bindingKey.startsWith('speed_') || bindingKey.startsWith('speedX') || bindingKey.startsWith('speedY')) {
				this.cambiarPropiedadesSpeedEmitter(bindingKey);
			} else if (bindingKey === 'alpha_activado') {
				configAdicional.alphaActivado = newValue;
				//FIXME: estoy dudando de utilizar estas propieddes activado en el alpha, rotate, accelerationX, accelerationY, posicionX, posicionY, quizas no son necesarias porque estan en la memoria
				if (configAdicional.alphaActivado) {
					this.cambiarPropiedadesCompuestasEmitter(bindingKey);
				}
			} else if (bindingKey === 'rotate_activado') {
				configAdicional.rotateActivado = newValue;
				if (configAdicional.rotateActivado) {
					this.cambiarPropiedadesCompuestasEmitter(bindingKey);
				}
			} else if (bindingKey.startsWith('colorTint_')) {
				if (bindingKey === 'colorTint_colorEaseAuxInt') {
					memoria.colorTint.colorTint_colorEase = this.listaEases[newValue];
				}
				this.cambiarPropiedadesColorTint(bindingKey);
				resetColor = bindingKey !== 'colorTint_colorEaseAuxInt';
			} else if (bindingKey.startsWith('bounds')) {
				resetBounds = 'bounds_mostrar' !== bindingKey;
				this.cambiarPropiedadesBoundsEmitter(bindingKey);
			} else if (bindingKey === 'bounce') {
				resetBounds = true;
				configParticle.bounce = newValue;
			} else if (bindingKey.startsWith('bokeh')) {
				this.cambiarBokeh();
			} else if (bindingKey === 'accelerationX_activado') {
				configAdicional.accelerationXActivada = newValue;
				if (configAdicional.accelerationXActivada) {
					this.cambiarPropiedadesCompuestasEmitter(bindingKey);
				}
			} else if (bindingKey === 'accelerationY_activado') {
				configAdicional.accelerationYActivada = newValue;
				if (configAdicional.accelerationYActivada) {
					this.cambiarPropiedadesCompuestasEmitter(bindingKey);
				}
			} else if (bindingKey.startsWith('scale') || bindingKey.startsWith('alpha') || bindingKey.startsWith('rotate') || bindingKey.startsWith('accelerationX') || bindingKey.startsWith('accelerationY')) {
				this.cambiarPropiedadesCompuestasEmitter(bindingKey); //esto tambien sirve para scaleX y scaleY
			} else if (bindingKey === 'posicionX_activada') {
				configAdicional.posicionXActivada = newValue;
				if (configAdicional.posicionXActivada) {
					const auxtipo = {
						'Unica': 'unica',
						'Transition': 'start',
						'Random': 'min',
						'Puntos': 'puntos',
						'Interpolacion': 'interpolacionPuntos',
					}
					this.cambiarPropiedadesPosicionEmitter('posicionX_' + auxtipo[configAdicional.posicionXSeleccionada]);
				}
			} else if (bindingKey.startsWith('posicionX')) {
				if (bindingKey === 'posicionX_transitionEaseAuxInt') {
					memoria.posicionX.posicionX_transitionEase = this.listaEases[newValue];
				}
				this.cambiarPropiedadesPosicionEmitter(bindingKey);
			}  else if (bindingKey === 'posicionY_activada') {
				configAdicional.posicionYActivada = newValue;
				if (configAdicional.posicionYActivada) {
					const auxtipo = {
						'Unica': 'unica',
						'Transition': 'start',
						'Random': 'min',
						'Puntos': 'puntos',
						'Interpolacion': 'interpolacionPuntos',
					}
					this.cambiarPropiedadesPosicionEmitter('posicionY_' + auxtipo[configAdicional.posicionYSeleccionada]);
				}
			} else if (bindingKey.startsWith('posicionY')) {
				if (bindingKey === 'posicionY_transitionEaseAuxInt') {
					memoria.posicionY.posicionY_transitionEase = this.listaEases[newValue];
				}
				this.cambiarPropiedadesPosicionEmitter(bindingKey);
			} else if (bindingKey.startsWith('gravityWell')) {
				this.cambiarGravityWell();
				resetGravityWell = bindingKey === 'gravityWell_activado' && !newValue;
			} else if (bindingKey.startsWith('deathZone')) {
				this.graficarDeathZone(this.indexEmitterSeleccionado);
				if (bindingKey === 'deathZone_activado') {
					this.resetAllDeathEmitZone(this.indexEmitterSeleccionado);
				}
			} else if (bindingKey.startsWith('emitZone')) {
				this.graficarEmitZone(this.indexEmitterSeleccionado);
				if (bindingKey === 'emitZone_activado') {
					this.resetAllDeathEmitZone(this.indexEmitterSeleccionado);
				}
			} else if (bindingKey.startsWith('stopAfterDuration')) {
				this.cambiarStopAfterDuration();
				resetStopAfterDuration = bindingKey === 'stopAfterDuration_tipo'
										|| (memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none'
											&& (
												(memoria.stopAfterDuration.stopAfterDuration_tipo === 'stopAfter' && bindingKey === 'stopAfterDuration_stopAfter')
												|| (memoria.stopAfterDuration.stopAfterDuration_tipo === 'duration' && bindingKey === 'stopAfterDuration_duration')
											));
			} else if (bindingKey.startsWith('moveToActivar')) {
				if (newValue) {
					configParticle.moveToX = memoria.moveToX;
					configParticle.moveToY = memoria.moveToY;
				} else {
					resetDetenerMoveTo = true;
				}
			}

			if (['gravityWell_mostrarPunto', 'gravityWell_x', 'gravityWell_y', 'x', 'y'].includes(bindingKey)) {
				this.gravityWellMostrarPunto();
			}


			if (configParticle.bounce === 0) {
				delete configParticle.bounce;
			}
			this.resetEmitter(this.indexEmitterSeleccionado, ['tipoSpeedSeleccionada', 'tipoScaleSeleccionada'].includes(bindingKey) || resetColor || resetBounds || resetGravityWell || resetPropiedadBasica || resetEmitZoneCambioXY || resetStopAfterDuration || resetDetenerMoveTo || configParticle.hasOwnProperty('bounce'));
		});
	}

	private crearNuevoEmitter() {
		const configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
			frequency: 10,
			speedX: { min: -500, max: 500 },
			speedY: { min: -500, max: 500 },
			scale: { start: 0.5, end: 1 },
			rotate: { start: 0, end: 360 },
			lifespan: 4500,
			gravityY: 180,
			gravityX: 0,
			quantity: 4,
			blendMode: Phaser.BlendModes.ADD,
			sortOrderAsc: false,
			// timeScale: 0.1,
		};
		const emitter = this.add.particles(this.cameras.main.centerX, this.cameras.main.centerY, AtlasImagenes.Particulas, {
			frame: AtlasParticulas.Star1,
			...configParticle,
        }).setDepth(-1);
		const configAdicional: IConfiguracionAdicional = {
			tipoSpeedSeleccionada: 'SpeedXY',
			tipoScaleSeleccionada: 'Scale',
			velocidadAngleActivado: true,
			alphaActivado: false,
			rotateActivado: true,
			accelerationXActivada: false,
			accelerationYActivada: false,
			posicionXActivada: false,
			posicionYActivada: false,
			speedXSeleccionada: 'Random',
			speedYSeleccionada: 'Random',
			speedSeleccionada: 'Random',
			angleSeleccionada: 'Random',
			accelerationXSeleccionada: 'Transition',
			accelerationYSeleccionada: 'Transition',
			scaleSeleccionada: 'Transition',
			scaleXSeleccionada: 'Transition',
			scaleYSeleccionada: 'Transition',
			alphaSeleccionada: 'Transition',
			rotateSeleccionada: 'Transition',
			posicionXSeleccionada: 'Random',
			posicionYSeleccionada: 'Random',
			listaDeathZones: [],
			listaEmitZones: [],
			emitZoneAbsolutoX: this.cameras.main.centerX,
			emitZoneAbsolutoY: this.cameras.main.centerY,
			listaPropiedadesFunction: [],
		};

		const memoria: IMemoria = {
			expandirPaginasUtilizadas: false,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY,
			lifespan: 4500,
			frequency: 10,
			quantity: 4,
			gravityX: 0,
			gravityY: 180,
			tipoSpeedSeleccionada: 'SpeedXY',
			tipoScaleSeleccionada: 'Scale',
			blendMode: 'ADD',
			maxVelocityX: 0,
			maxVelocityY: 0,
			advance: 0,
			hold: 0,
			particleBringToTop: null,
			sortProperty: '',
			sortOrderAsc: false,
			moveToActivar: false,
			moveToX: 0,
			moveToY: 0,
			colorTint: {
				colorTint_seleccionado: 'ninguno',
				colorTint_color: '0xff0000, 0x00ff00, 0x0000ff',
				colorTint_colorEaseAuxInt: 0,
				colorTint_colorEase: this.listaEases[0],
				colorTint_tint: '0xff0000, 0x00ff00, 0x0000ff',
			},
			bounce: 0,
			speed: {
				speed_unica: 0,
				speed_start: 0,
				speed_end: 0,
				speed_steps: 1,
				speed_min: 300,
				speed_max: 400,
			},
			angle: {
				angle_activado: true,
				angle_start: 0,
				angle_end: 360,
				angle_steps: 36,
				angle_min: 225,
				angle_max: 315,
			},
			speedX: {
				speedX_unica: 0,
				speedX_start: 0,
				speedX_end: 0,
				speedX_steps: 1,
				speedX_min: -500,
				speedX_max: 500,
			},
			speedY: {
				speedY_unica: 0,
				speedY_start: 0,
				speedY_end: 0,
				speedY_steps: 1,
				speedY_min: -500,
				speedY_max: 500,
			},
			accelerationX: {
				accelerationX_activado: false,
				accelerationX_unica: 0,
				accelerationX_start: 100,
				accelerationX_end: 500,
				accelerationX_steps: 0,
				accelerationX_transitionEaseAuxInt: 0,
				accelerationX_transitionEase: this.listaEases[0],
				accelerationX_min: -100,
				accelerationX_max: 100,
				accelerationX_onEmitActivado: false,
				accelerationX_onUpdateActivado: false
			},
			accelerationY: {
				accelerationY_activado: false,
				accelerationY_unica: 0,
				accelerationY_start: 100,
				accelerationY_end: 500,
				accelerationY_steps: 0,
				accelerationY_transitionEaseAuxInt: 0,
				accelerationY_transitionEase: this.listaEases[0],
				accelerationY_min: -100,
				accelerationY_max: 100,
				accelerationY_onEmitActivado: false,
				accelerationY_onUpdateActivado: false
			},
			posicionX: {
				posicionX_activada: false,
				posicionX_unica: 0,
				posicionX_start: 0,
				posicionX_end: 100,
				posicionX_steps: 10,
				posicionX_transitionEaseAuxInt: 0,
				posicionX_transitionEase: this.listaEases[0],
				posicionX_transitionRandom: false,
				posicionX_min: -500,
				posicionX_max: 500,
				posicionX_puntos: '',
				posicionX_interpolacionPuntos: '',
				posicionX_interpolacionTipo: 'linear',
			},
			posicionY: {
				posicionY_activada: false,
				posicionY_unica: 0,
				posicionY_start: 0,
				posicionY_end: 100,
				posicionY_steps: 10,
				posicionY_transitionEaseAuxInt: 0,
				posicionY_transitionEase: this.listaEases[0],
				posicionY_transitionRandom: false,
				posicionY_min: -500,
				posicionY_max: 500,
				posicionY_puntos: '',
				posicionY_interpolacionPuntos: '',
				posicionY_interpolacionTipo: 'linear',
			},
			scale: {
				scale_unica: 0,
				scale_start: 0.5,
				scale_end: 1,
				scale_steps: 0,
				scale_transitionEaseAuxInt: 0,
				scale_transitionEase: this.listaEases[0],
				scale_min: 0.1,
				scale_max: 1,
				scale_onEmitActivado: false,
				scale_onUpdateActivado: false
			},
			scaleX: {
				scaleX_unica: 0,
				scaleX_start: 0.5,
				scaleX_end: 1,
				scaleX_steps: 0,
				scaleX_transitionEaseAuxInt: 0,
				scaleX_transitionEase: this.listaEases[0],
				scaleX_min: 0.1,
				scaleX_max: 1,
				scaleX_onEmitActivado: false,
				scaleX_onUpdateActivado: false,
			},
			scaleY: {
				scaleY_unica: 0,
				scaleY_start: 0.5,
				scaleY_end: 1,
				scaleY_steps: 0,
				scaleY_transitionEaseAuxInt: 0,
				scaleY_transitionEase: this.listaEases[0],
				scaleY_min: 0.1,
				scaleY_max: 1,
				scaleY_onEmitActivado: false,
				scaleY_onUpdateActivado: false,
			},
			alpha: {
				alpha_activado: false,
				alpha_unica: 0,
				alpha_start: 0,
				alpha_end: 1,
				alpha_steps: 0,
				alpha_transitionEaseAuxInt: 0,
				alpha_transitionEase: this.listaEases[0],
				alpha_min: 0.25,
				alpha_max: 0.5,
				alpha_onEmitActivado: false,
				alpha_onUpdateActivado: false,
			},
			rotate: {
				rotate_activado: true,
				rotate_unica: 0,
				rotate_start: 0,
				rotate_end: 360,
				rotate_steps: 0,
				rotate_transitionEaseAuxInt: 0,
				rotate_transitionEase: this.listaEases[0],
				rotate_min: 0,
				rotate_max: 360,
				rotate_onEmitActivado: false,
				rotate_onUpdateActivado: false
			},
			bounds: {
				bounds_activado: false,
				bounds_mostrar: false,
				bounds_color: 0x00ff00,
				bounds_x: this.cameras.main.centerX - 400,
				bounds_y: this.cameras.main.centerY - 300,
				bounds_width: 800,
				bounds_height: 600,
			},
			bokeh: {
				bokeh_activado: false,
				bokeh_radius: 0.5,
				bokeh_amount: 1,
				bokeh_contrast: 0.2,
			},
			gravityWell: {
				gravityWell_activado: false,
				gravityWell_mostrarPunto: false,
				gravityWell_x: 0,
				gravityWell_y: 0,
				gravityWell_power: 4.2,
				gravityWell_epsilon: 250,
				gravityWell_gravity: 100
			},
			stopAfterDuration: {
				stopAfterDuration_tipo: 'none',
				stopAfterDuration_stopAfter: 5000,
				stopAfterDuration_duration: 5000,
				stopAfterDuration_reset: true,
			},
			deathZone: {
				deathZone_activado: true,
				deathZone_mostrar: true,
				deathZone_color: 0x00ff00
			},
			emitZone: {
				emitZone_activado: true,
				emitZone_mostrar: true,
				emitZone_color: 0x0000ff
			},
			follow: {
				follow_imagen: null,
				follow_offsetX: 0,
				follow_offsetY: 0
			}
        };
		this.listaEmitters.push({
			emitter,
			configAdicional,
			configParticle,
			graphicsBounds: this.add.graphics(),
			graphicsDeathZone: this.add.graphics(),
			graphicsEmitZone: this.add.graphics(),
			texture: AtlasImagenes.Particulas,
			frame: [AtlasParticulas.Star1],
			frameCycle: false,
			bokeh: null,
			gravityWell: null,
			gravityWellPunto: null,
			memoria,
		});
	}

	private cambiarPropiedadesEmitter(key: string, value: any) {
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		configParticle[key] = value;
	}

	private cambiarPropiedadesSpeedEmitter(key: string) {
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const propiedad = key.startsWith('speedX') ? 'speedX' : key.startsWith('speedY') ? 'speedY' : 'speed';
		if (key.endsWith('_min') || key.endsWith('_max')) {
			configParticle[propiedad] = { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			configAdicional[propiedad + 'Seleccionada'] = 'Random';
		} else if (key.endsWith('_start') || key.endsWith('_end') || key.endsWith('_steps')) {
			configParticle[propiedad] = { start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`], steps: memoria[propiedad][`${propiedad}_steps`] };
			configAdicional[propiedad + 'Seleccionada'] = 'Transition';
		} else if (key.endsWith('_unica')) {
			configParticle[propiedad] = memoria[propiedad][`${propiedad}_unica`];
			configAdicional[propiedad + 'Seleccionada'] = 'Unica';
		} else if (key.endsWith('_onEmitActivado') || key.endsWith('_onUpdateActivado')) {
			configAdicional[propiedad + 'Seleccionada'] = 'Avanzado';
		}
	}

	private cambiarTipoVelocidad() {
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		const tipoSeleccionada = {
			'Unica': 'unica',
			'Transition': 'start',
			'Random': 'min',
			'Avanzado': 'onEmitActivado'
		};
		if (configAdicional.tipoSpeedSeleccionada === 'SpeedAngle') {
			this.cambiarPropiedadesSpeedEmitter(`speed_${tipoSeleccionada[configAdicional.speedSeleccionada]}`);
			this.cambiarPropiedadesCompuestasEmitter(`angle_${tipoSeleccionada[configAdicional.angleSeleccionada]}`);
		} else if (configAdicional.tipoSpeedSeleccionada === 'SpeedXY') {
			this.cambiarPropiedadesSpeedEmitter(`speedX_${tipoSeleccionada[configAdicional.speedXSeleccionada]}`);
			this.cambiarPropiedadesSpeedEmitter(`speedY_${tipoSeleccionada[configAdicional.speedYSeleccionada]}`);
		}
	}

	private cambiarTipoScale() {
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		const tipoSeleccionada = {
			'Unica': 'unica',
			'Transition': 'start',
			'Random': 'min',
			'Avanzado': 'onEmitActivado'
		};
		if (configAdicional.tipoScaleSeleccionada === 'Scale') {
			this.cambiarPropiedadesCompuestasEmitter(`scale_${tipoSeleccionada[configAdicional.scaleSeleccionada]}`);
		} else if (configAdicional.tipoScaleSeleccionada === 'ScaleXY') {
			this.cambiarPropiedadesCompuestasEmitter(`scaleX_${tipoSeleccionada[configAdicional.scaleXSeleccionada]}`);
			this.cambiarPropiedadesCompuestasEmitter(`scaleY_${tipoSeleccionada[configAdicional.scaleYSeleccionada]}`);
		}
	}

	private cambiarPropiedadesPosicionEmitter(key: string) {
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const propiedad = key.startsWith('posicionX') ? 'posicionX' : 'posicionY';
		const propiedadParticula = key.startsWith('posicionX') ? 'x' : 'y';
		if (key.endsWith('_min') || key.endsWith('_max')) {
			configParticle[propiedadParticula] = { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			configAdicional[propiedad + 'Seleccionada'] = 'Random';
		} else if (key.endsWith('_start') || key.endsWith('_end') || key.endsWith('_steps') || key.endsWith('_transitionEase') || key.endsWith('_transitionEaseAuxInt') || key.endsWith('_transitionRandom')) {
			const aux = {
				start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`],
							steps: memoria[propiedad][`${propiedad}_steps`], ease: memoria[propiedad][`${propiedad}_transitionEaseAuxInt`] ? memoria[propiedad][`${propiedad}_transitionEase`] : '',
							random: memoria[propiedad][`${propiedad}_transitionRandom`]
			};
			if (!aux.steps) {
				delete aux.steps;
			}
			if (!aux.ease) {
				delete aux.ease;
			}
			if (!aux.random) {
				delete aux.random;
			}
			configParticle[propiedadParticula] = aux;
			configAdicional[propiedad + 'Seleccionada'] = 'Transition';
		} else if (key.endsWith('_unica')) {
			configParticle[propiedadParticula] = memoria[propiedad][`${propiedad}_unica`];
			configAdicional[propiedad + 'Seleccionada'] = 'Unica';
		} else if (key.endsWith('_puntos')) {
			memoria[propiedad][`${propiedad}_puntos`] = memoria[propiedad][`${propiedad}_puntos`].split(',').filter(x => !isNaN(x)).map(x => +x).join(',');
			configParticle[propiedadParticula] = memoria[propiedad][`${propiedad}_puntos`].split(',').map(x => +x);
			configAdicional[propiedad + 'Seleccionada'] = 'Puntos';
		} else if (key.endsWith('_interpolacionPuntos') || key.endsWith('_interpolacionTipo')) {
			memoria[propiedad][`${propiedad}_interpolacionPuntos`] = memoria[propiedad][`${propiedad}_interpolacionPuntos`].split(',').filter(x => !isNaN(x)).map(x => +x).join(',');
			configParticle[propiedadParticula] = {values: memoria[propiedad][`${propiedad}_interpolacionPuntos`].split(',').map(x => +x), interpolation: memoria[propiedad][`${propiedad}_interpolacionTipo`] };
			configAdicional[propiedad + 'Seleccionada'] = 'Interpolacion';
		}
	}

	private cambiarPropiedadesCompuestasEmitter(keyPropiedad: string) {
		const propiedad: string = keyPropiedad.split('_')[0];
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const accionTipoSeleccionado = {
			'activado': this.listaEmitters[this.indexEmitterSeleccionado].configAdicional[propiedad + 'Seleccionada'],
			'unica': 'Unica',
			'start': 'Transition',
			'end': 'Transition',
			'steps': 'Transition',
			'transitionEaseAuxInt': 'Transition',
			'min': 'Random',
			'max': 'Random',
			'onEmitActivado': 'Avanzado',
			'onUpdateActivado': 'Avanzado',
		};

		if (keyPropiedad.endsWith('transitionEaseAuxInt')) {
			memoria[propiedad][`${propiedad}_transitionEase`] = this.listaEases[memoria[propiedad][`${propiedad}_transitionEaseAuxInt`]];
		}

		const tipo: 'Unica' | 'Transition' | 'Random' | 'Avanzado' = accionTipoSeleccionado[keyPropiedad.split('_')[1]];

		let configAdicional = '';
		if (tipo === 'Random') {
			configParticle[propiedad] = { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			configAdicional = 'Random';
		} else if (tipo === 'Transition') {
			const aux = { start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`], steps: memoria[propiedad][`${propiedad}_steps`], ease: memoria[propiedad][`${propiedad}_transitionEaseAuxInt`] ? memoria[propiedad][`${propiedad}_transitionEase`] : ''};
			if (!aux.steps) {
				delete aux.steps;
			}
			if (!aux.ease) {
				delete aux.ease;
			}
			configParticle[propiedad] = aux;
			configAdicional = 'Transition';
		} else if (tipo === 'Unica') {
			configParticle[propiedad] = memoria[propiedad][`${propiedad}_unica`];
			configAdicional = 'Unica';
		} else if (tipo === 'Avanzado') {
			configAdicional = 'Avanzado';
		}
		this.listaEmitters[this.indexEmitterSeleccionado].configAdicional[propiedad + 'Seleccionada'] = configAdicional;
	}

	private cambiarPropiedadesBoundsEmitter(key: string) {
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		const graphicsBounds = this.listaEmitters[this.indexEmitterSeleccionado].graphicsBounds;
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		graphicsBounds.clear();

		if (memoria.bounds.bounds_activado && memoria.bounds.bounds_mostrar) {
			graphicsBounds.lineStyle(4, memoria.bounds.bounds_color, 1);
			graphicsBounds.strokeRectShape(new Phaser.Geom.Rectangle(memoria.bounds.bounds_x, memoria.bounds.bounds_y, memoria.bounds.bounds_width, memoria.bounds.bounds_height));
		}

		if (memoria.bounds.bounds_activado) {
			configParticle.bounds = new Phaser.Geom.Rectangle(memoria.bounds.bounds_x, memoria.bounds.bounds_y, memoria.bounds.bounds_width, memoria.bounds.bounds_height);
		} else {
			delete configParticle.bounds;
			delete configParticle.bounce;
		}
	}

	private cambiarBokeh() {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const bokeh = this.listaEmitters[this.indexEmitterSeleccionado].bokeh
		if (!memoria.bokeh.bokeh_activado) {
			bokeh?.destroy();
			this.listaEmitters[this.indexEmitterSeleccionado].bokeh = null;
			this.listaEmitters[this.indexEmitterSeleccionado].emitter.postFX.clear();
			return;
		}

		if (!bokeh) {
			this.listaEmitters[this.indexEmitterSeleccionado].bokeh = this.listaEmitters[this.indexEmitterSeleccionado].emitter.postFX.addBokeh(
				memoria.bokeh.bokeh_radius,
				memoria.bokeh.bokeh_amount,
				memoria.bokeh.bokeh_contrast
			);
		} else {
			bokeh.radius = memoria.bokeh.bokeh_radius;
			bokeh.amount = memoria.bokeh.bokeh_amount;
			bokeh.contrast = memoria.bokeh.bokeh_contrast;
		}
	}

	private cambiarGravityWell() {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const gravityWell = this.listaEmitters[this.indexEmitterSeleccionado].gravityWell;
		if (!memoria.gravityWell.gravityWell_activado) {
			gravityWell?.destroy();
			this.listaEmitters[this.indexEmitterSeleccionado].gravityWell = null;
			// this.listaEmitters[this.indexEmitterSeleccionado].emitter.postFX.clear();
			return;
		}

		if (!gravityWell) {
			this.listaEmitters[this.indexEmitterSeleccionado].gravityWell = this.listaEmitters[this.indexEmitterSeleccionado].emitter.createGravityWell({
				x: memoria.gravityWell.gravityWell_x,
				y: memoria.gravityWell.gravityWell_y,
				power: memoria.gravityWell.gravityWell_power,
				epsilon: memoria.gravityWell.gravityWell_epsilon,
				gravity: memoria.gravityWell.gravityWell_gravity,
			});
		} else {
			gravityWell.x = memoria.gravityWell.gravityWell_x;
			gravityWell.y = memoria.gravityWell.gravityWell_y;
			gravityWell.power = memoria.gravityWell.gravityWell_power;
			gravityWell.epsilon = memoria.gravityWell.gravityWell_epsilon;
			gravityWell.gravity = memoria.gravityWell.gravityWell_gravity;
		}
	}

	private gravityWellMostrarPunto() {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const gravityWellPunto = this.listaEmitters[this.indexEmitterSeleccionado].gravityWellPunto;
		if (!memoria.gravityWell.gravityWell_mostrarPunto) {
			gravityWellPunto?.destroy();
			this.listaEmitters[this.indexEmitterSeleccionado].gravityWellPunto = null;
			return;
		}

		const emitter = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
		const {gravityWell_x, gravityWell_y} = memoria.gravityWell;
		if (!gravityWellPunto) {
			this.listaEmitters[this.indexEmitterSeleccionado].gravityWellPunto = this.add.circle(emitter.x + gravityWell_x, emitter.y + gravityWell_y, 20, 0xff0000).setStrokeStyle(4, 0xffffff);
		} else {
			gravityWellPunto.setPosition(emitter.x + gravityWell_x, emitter.y + gravityWell_y);
		}
	}

	private cambiarStopAfterDuration() {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		if (memoria.stopAfterDuration.stopAfterDuration_tipo === 'none') {
			delete configParticle.stopAfter;
			delete configParticle.duration;
			return;
		} else if (memoria.stopAfterDuration.stopAfterDuration_tipo === 'stopAfter') {
			configParticle.stopAfter = memoria.stopAfterDuration.stopAfterDuration_stopAfter;
			delete configParticle.duration;
			return;
		} else if (memoria.stopAfterDuration.stopAfterDuration_tipo === 'duration') {
			configParticle.duration = memoria.stopAfterDuration.stopAfterDuration_duration;
			delete configParticle.stopAfter;
		}
	}

	private cambiarPropiedadesColorTint(key: string) {
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		const configParticle = this.listaEmitters[this.indexEmitterSeleccionado].configParticle;
		const tipo = memoria.colorTint.colorTint_seleccionado;
		if (tipo === 'ninguno') {
			delete configParticle.tint;
			delete configParticle.color;
			delete configParticle.colorEase;
			return;
		}


		const listaColores = memoria.colorTint[`colorTint_${tipo === 'color' ? 'color' : 'tint'}`].split(',').map(x => x.trim()).filter(x => x);
		if (listaColores.length === 0) {
			delete configParticle.color;
			delete configParticle.tint;
			delete configParticle.colorEase;
		} else  if (listaColores.every(x => /^0x[0-9a-fA-F]{6}$/.test(x))) {
			if (tipo === 'color') {
				configParticle.color = listaColores.map(x => parseInt(x, 16));
				if (memoria.colorTint.colorTint_colorEaseAuxInt) {
					configParticle.colorEase = this.listaEases[memoria.colorTint.colorTint_colorEaseAuxInt];
				} else {
					delete configParticle.colorEase;
				}
				delete configParticle.tint;
			} else if (tipo === 'tint') {
				configParticle.tint = listaColores.map(x => parseInt(x, 16));
				delete configParticle.color;
				delete configParticle.colorEase;
			}
		} else {
			delete configParticle.color;
			delete configParticle.tint;
			delete configParticle.colorEase;
			// resetColor = true;
			alert('Formato de color incorrecto. Debe ser 0xRRGGBB');
			console.warn('Formato de color incorrecto.');
		}
	}

	private crearPropiedadesPanel(configAdicional: IConfiguracionAdicional, memoria: IMemoria) {
		const refrescarPanel = this.crearPanel.bind(this);
		const capturaCoordenadas = this.capturaCoordenadas.bind(this);
		const abrirDeathZone = () => {
			this.menuAbierto?.destroy();
			this.menuAbierto = null;
			this.menuComponent.hideFullMenu();
			this.deathZoneComponent.show(this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaDeathZones);
			this.menuAbierto = this.deathZoneComponent;
		};
		const abrirEmitZone = () => {
			this.menuAbierto?.destroy();
			this.menuAbierto = null;
			this.menuComponent.hideFullMenu();
			this.emitZoneComponent.show(this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaEmitZones);
			this.menuAbierto = this.emitZoneComponent;
		};
		const abrirPropiedadesAvanzadas = (propiedad: string) => {
			this.menuAbierto?.destroy();
			this.menuAbierto = null;
			this.menuComponent.hideFullMenu();
			this.propiedadesIngresoAvanzadoComponent.show(propiedad, '', '', configAdicional.listaPropiedadesFunction);
		};
		return [{
					$type: 'folder', title: 'Configuraciones',
					$properties: [
						{ $key: 'expandirPaginasUtilizadas', title: 'Expandir Auto', view: 'toggleSwitch' },
						{ $type: 'button', title: 'Actualizar: ➡️', label: 'Refrescar Panel',
								callback: function(target) {
									refrescarPanel();
								},
						},
						{ $key: 'x', title: 'x', min: -200, max: this.cameras.main.displayWidth + 200, step: 1 },
						{ $key: 'y', title: 'y', min: -200, max: this.cameras.main.displayHeight + 200, step: 1 },
						{ $type: 'separator' },
						{ $key: 'lifespan', title: 'lifespan', min: 10, max: 10000, step: 10 },
						{ $key: 'frequency', title: 'frequency', min: 10, max: 1000, step: 10 },
						{ $key: 'quantity', title: 'quantity', min: 1, max: 100, step: 1 },
						{ $type: 'separator' },
						{ $key: 'gravityX', title: 'gravityX', min: -1000, max: 1000, step: 10 },
						{ $key: 'gravityY', title: 'gravityY', min: -1000, max: 1000, step: 10 },
						{ $key: 'blendMode', title: 'blendMode', options: [
								// { text: 'SKIP_CHECK', value: 'SKIP_CHECK' },
								{ text: 'NORMAL', value: 'NORMAL' },
								{ text: 'ADD', value: 'ADD' },
								{ text: 'MULTIPLY', value: 'MULTIPLY' },
								{ text: 'SCREEN', value: 'SCREEN' },
								// { text: 'OVERLAY', value: 'OVERLAY' },
								// { text: 'DARKEN', value: 'DARKEN' },
								// { text: 'LIGHTEN', value: 'LIGHTEN' },
								// { text: 'COLOR_DODGE', value: 'COLOR_DODGE' },
								// { text: 'COLOR_BURN', value: 'COLOR_BURN' },
								// { text: 'HARD_LIGHT', value: 'HARD_LIGHT' },
								// { text: 'SOFT_LIGHT', value: 'SOFT_LIGHT' },
								// { text: 'DIFFERENCE', value: 'DIFFERENCE' },
								// { text: 'EXCLUSION', value: 'EXCLUSION' },
								// { text: 'HUE', value: 'HUE' },
								// { text: 'SATURATION', value: 'SATURATION' },
								// { text: 'COLOR', value: 'COLOR' },
								// { text: 'LUMINOSITY', value: 'LUMINOSITY' },
								{ text: 'ERASE', value: 'ERASE' },
								// { text: 'SOURCE_IN', value: 'SOURCE_IN' },
								// { text: 'SOURCE_OUT', value: 'SOURCE_OUT' },
								// { text: 'SOURCE_ATOP', value: 'SOURCE_ATOP' },
								// { text: 'DESTINATION_OVER', value: 'DESTINATION_OVER' },
								// { text: 'DESTINATION_IN', value: 'DESTINATION_IN' },
								// { text: 'DESTINATION_OUT', value: 'DESTINATION_OUT' },
								// { text: 'DESTINATION_ATOP', value: 'DESTINATION_ATOP' },
								// { text: 'LIGHTER', value: 'LIGHTER' },
								// { text: 'COPY', value: 'COPY' },
								// { text: 'XOR', value: 'XOR' },
						] },
						{ $type: 'separator' },
						{
							$key: 'tipoSpeedSeleccionada',
							// icon: 'settings',
							title: 'Tipo Speed',
							options: [
								{ text: 'Sin\nSpeed', value: 'No' },
								{ text: 'Speed\n& Angle', value: 'SpeedAngle' },
								{ text: 'Speed\nX & Y', value: 'SpeedXY' },
							],
							view: 'buttons'
						},
						{
							$key: 'tipoScaleSeleccionada',
							// icon: 'settings',
							title: 'Tipo Scale',
							options: [
								{ text: 'Sin\nScale', value: 'No' },
								{ text: 'Scale', value: 'Scale' },
								{ text: 'Scale\nX & Y', value: 'ScaleXY' },
							],
							view: 'buttons'
						},
					],
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${(memoria.maxVelocityX > 0 || memoria.maxVelocityY > 0 || memoria.advance > 0 || memoria.hold > 0 || memoria.particleBringToTop !== null || memoria.sortProperty !== '' || memoria.moveToActivar) ? '✔️' : ''}Otras propiedades`,
					expanded: memoria.expandirPaginasUtilizadas && (memoria.maxVelocityX > 0 || memoria.maxVelocityY > 0 || memoria.advance > 0 || memoria.hold > 0 || memoria.particleBringToTop !== null || memoria.sortProperty !== '' || memoria.moveToActivar),
					$properties: [
						{ $key: 'maxVelocityX', title: 'maxVelocityX', min: 0, max: 1000, step: 1 },
						{ $key: 'maxVelocityY', title: 'maxVelocityY', min: 0, max: 1000, step: 1 },
						{ $key: 'advance', title: 'advance', min: 0, max: 5000, step: 1 },
						{ $key: 'hold', title: 'hold', min: 0, max: 5000, step: 1 },
						{
							$key: 'particleBringToTop',
							title: 'particleBringToTop',
							options: [
								{ text: 'null', value: null },
								{ text: 'true', value: true },
								{ text: 'false', value: false },
							],
							view: 'buttons'
						},
						{ $key: 'sortProperty', title: 'sortProperty', options: [
								{ text: 'No Utilizar', value: '' },
								{ text: 'y', value: 'y' },
								{ text: 'x', value: 'x' },
								{ text: 'lifeT', value: 'lifeT' },
						] },
						{ $key: 'sortOrderAsc', title: 'sortOrderAsc', view: 'toggleSwitch' },
						{ $key: 'moveToActivar', title: 'Activar MoveTo', view: 'toggleSwitch' },
						{ $key: 'moveToX', title: 'MoveTo X', min: -2000, max: 2000, step: 1 },
						{ $key: 'moveToY', title: 'MoveTo Y', min: -2000, max: 2000, step: 1 },
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoSpeedSeleccionada === 'SpeedAngle' && !memoria.moveToActivar ? '✔️' : ''}Speed & Angle`,
					expanded: memoria.expandirPaginasUtilizadas &&  memoria.tipoSpeedSeleccionada === 'SpeedAngle' && !memoria.moveToActivar,
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica |',
									show: configAdicional.speedSeleccionada === 'Unica',
									$properties: [
										{ $key: 'speed.speed_unica', title: 'Velocidad ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Speed Transition |',
									show: configAdicional.speedSeleccionada === 'Transition',
									$properties: [
										{ $key: 'speed.speed_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speed.speed_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speed.speed_steps', title: 'Steps ', min: 1, max: 100, step: 1  },
									]
								},

								{
									title: 'Speed Random',
									show: configAdicional.speedSeleccionada === 'Random',
									$properties: [
										{ $key: 'speed.speed_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'speed.speed_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								}
							],
						},
						{ $type: 'separator' },
						{ $key: 'angle.angle_activado', title: 'Angle Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Angle Transition',
									show: configAdicional.angleSeleccionada === 'Transition',
									$properties: [
										{ $key: 'angle.angle_start', title: 'Start ', min: -360, max: 360, step: 1  },
										{ $key: 'angle.angle_end', title: 'End ', min: -360, max: 360, step: 1  },
										{ $key: 'angle.angle_steps', title: 'Steps ', min: 1, max: 100, step: 1  },
									]
								},

								{
									title: 'Angle Random',
									show: configAdicional.angleSeleccionada === 'Random',
									$properties: [
										{ $key: 'angle.angle_min', title: 'Angle Min ', min: -360, max: 360, step: 1 },
										{ $key: 'angle.angle_max', title: 'Angle Max ', min: -360, max: 360, step: 1 },
									]
								}
							],
						},

					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoSpeedSeleccionada === 'SpeedXY' && !memoria.moveToActivar ? '✔️' : ''}Speed X`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.tipoSpeedSeleccionada === 'SpeedXY' && !memoria.moveToActivar,
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica |',
									show: configAdicional.speedXSeleccionada === 'Unica',
									$properties: [
										{ $key: 'speedX.speedX_unica', title: 'Velocidad ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Speed Transition |',
									show: configAdicional.speedXSeleccionada === 'Transition',
									$properties: [
										{ $key: 'speedX.speedX_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speedX.speedX_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speedX.speedX_steps', title: 'Steps ', min: 1, max: 100, step: 1  },
									]
								},

								{
									title: 'Speed Random',
									show: configAdicional.speedXSeleccionada === 'Random',
									$properties: [
										{ $key: 'speedX.speedX_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'speedX.speedX_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoSpeedSeleccionada === 'SpeedXY' && !memoria.moveToActivar ? '✔️' : ''}Speed Y`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.tipoSpeedSeleccionada === 'SpeedXY' && !memoria.moveToActivar,
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica |',
									show: configAdicional.speedYSeleccionada === 'Unica',
									$properties: [
										{ $key: 'speedY.speedY_unica', title: 'Velocidad ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Speed Transition |',
									show: configAdicional.speedYSeleccionada === 'Transition',
									$properties: [
										{ $key: 'speedY.speedY_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speedY.speedY_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'speedY.speedY_steps', title: 'Steps ', min: 1, max: 100, step: 1  },
									]
								},
								{
									title: 'Speed Random',
									show: configAdicional.speedYSeleccionada === 'Random',
									$properties: [
										{ $key: 'speedY.speedY_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'speedY.speedY_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.accelerationX.accelerationX_activado && !memoria.moveToActivar ? '✔️' : ''}Acceleration X`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.accelerationX.accelerationX_activado && !memoria.moveToActivar,
					$properties: [
						{ $key: 'accelerationX.accelerationX_activado', title: 'Acceleration X Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.accelerationXSeleccionada === 'Unica',
									$properties: [
										{ $key: 'accelerationX.accelerationX_unica', title: 'Velocidad ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Acc. Transition',
									show: configAdicional.accelerationXSeleccionada === 'Transition',
									$properties: [
										{ $key: 'accelerationX.accelerationX_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'accelerationX.accelerationX_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'accelerationX.accelerationX_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'accelerationX.accelerationX_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Acc. Random',
									show: configAdicional.accelerationXSeleccionada === 'Random',
									$properties: [
										{ $key: 'accelerationX.accelerationX_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'accelerationX.accelerationX_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.accelerationXSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'accelerationX.accelerationX_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'accelerationX.accelerationX_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('accelerationX');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.accelerationY.accelerationY_activado && !memoria.moveToActivar ? '✔️' : ''}Acceleration Y`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.accelerationY.accelerationY_activado && !memoria.moveToActivar,
					$properties: [
						{ $key: 'accelerationY.accelerationY_activado', title: 'Acceleration Y Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.accelerationYSeleccionada === 'Unica',
									$properties: [
										{ $key: 'accelerationY.accelerationY_unica', title: 'Velocidad ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Acc. Transition',
									show: configAdicional.accelerationYSeleccionada === 'Transition',
									$properties: [
										{ $key: 'accelerationY.accelerationY_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'accelerationY.accelerationY_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'accelerationY.accelerationY_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'accelerationY.accelerationY_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Acc. Random',
									show: configAdicional.accelerationYSeleccionada === 'Random',
									$properties: [
										{ $key: 'accelerationY.accelerationY_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'accelerationY.accelerationY_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.accelerationYSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'accelerationY.accelerationY_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'accelerationY.accelerationY_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('accelerationY');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.posicionX.posicionX_activada ? '✔️' : ''}Posición X`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.posicionX.posicionX_activada,
					$properties: [
						{ $key: 'posicionX.posicionX_activada', title: 'Posición X Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.posicionXSeleccionada === 'Unica',
									$properties: [
										{ $key: 'posicionX.posicionX_unica', title: 'Posición X ', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Transition',
									show: configAdicional.posicionXSeleccionada === 'Transition',
									$properties: [
										{ $key: 'posicionX.posicionX_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'posicionX.posicionX_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'posicionX.posicionX_steps', title: 'Steps ', min: 0, max: 100, step: 1  },
										{ $key: 'posicionX.posicionX_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec' },
										{ $key: 'posicionX.posicionX_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
										{ $key: 'posicionX.posicionX_transitionRandom', title: 'Random', view: 'toggleSwitch' },
									]
								},
								{
									title: 'Random',
									show: configAdicional.posicionXSeleccionada === 'Random',
									$properties: [
										{ $key: 'posicionX.posicionX_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'posicionX.posicionX_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
								{
									title: 'Puntos',
									show: configAdicional.posicionXSeleccionada === 'Puntos',
									$properties: [
										{ $key: 'posicionX.posicionX_puntos', title: 'Números separados\npor coma (,)' },
										{ $type: 'button', title: 'Click para comenzar ➡️', label: 'Capturar/Terminar',
												callback: function(target) {
													capturaCoordenadas('PosicionX-Puntos');
												},
										},
									]
								},
								{
									title: 'Interpolación',
									show: configAdicional.posicionXSeleccionada === 'Interpolacion',
									$properties: [
										// { $key: 'blendMode', title: 'blendMode', options: [
										// 	{ text: 'linear', value: 'linear' },
										// 	{ text: 'bezier', value: 'bezier' },
										// 	{ text: 'catmull', value: 'catmull' },
										// 	{ text: 'SCREEN', value: 'SCREEN' },
										// ] },
										{
											$key: 'posicionX.posicionX_interpolacionTipo',
											title: 'Interpolación',
											options: [
												{ text: 'linear', value: 'linear' },
												{ text: 'bezier', value: 'bezier' },
												{ text: 'catmull', value: 'catmull' },
											],
											view: 'buttons'
										},
										{ $key: 'posicionX.posicionX_interpolacionPuntos', title: 'Números separados\npor coma (,)' },
										{ $type: 'button', title: 'Click para comenzar ➡️', label: 'Capturar/Terminar',
												callback: function(target) {
													capturaCoordenadas('PosicionX-Interpolacion');
												},
										},
									]
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.posicionY.posicionY_activada ? '✔️' : ''}Posición Y`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.posicionY.posicionY_activada,
					$properties: [
						{ $key: 'posicionY.posicionY_activada', title: 'Posición Y Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.posicionYSeleccionada === 'Unica',
									$properties: [
										{ $key: 'posicionY.posicionY_unica', title: 'Posición Y', min: -2000, max: 2000, step: 1 },
									],
								},

								{
									title: 'Transition',
									show: configAdicional.posicionYSeleccionada === 'Transition',
									$properties: [
										{ $key: 'posicionY.posicionY_start', title: 'Start ', min: -2000, max: 2000, step: 1  },
										{ $key: 'posicionY.posicionY_end', title: 'End ', min: -2000, max: 2000, step: 1  },
										{ $key: 'posicionY.posicionY_steps', title: 'Steps ', min: 0, max: 100, step: 1  },
										{ $key: 'posicionY.posicionY_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'posicionY.posicionY_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
										{ $key: 'posicionY.posicionY_transitionRandom', title: 'Random', view: 'toggleSwitch' },
									]
								},
								{
									title: 'Random',
									show: configAdicional.posicionYSeleccionada === 'Random',
									$properties: [
										{ $key: 'posicionY.posicionY_min', title: 'Min ', min: -2000, max: 2000, step: 1 },
										{ $key: 'posicionY.posicionY_max', title: 'Max ', min: -2000, max: 2000, step: 1 },
									]
								},
								{
									title: 'Puntos',
									show: configAdicional.posicionYSeleccionada === 'Puntos',
									$properties: [
										{ $key: 'posicionY.posicionY_puntos', title: 'Números separados\npor coma (,)' },
										{ $type: 'button', title: 'Click para comenzar ➡️', label: 'Capturar/Terminar',
												callback: function(target) {
													capturaCoordenadas('PosicionY-Puntos');
												},
										},
									]
								},
								{
									title: 'Interpolación',
									show: configAdicional.posicionYSeleccionada === 'Interpolacion',
									$properties: [
										// { $key: 'blendMode', title: 'blendMode', options: [
										// 	{ text: 'linear', value: 'linear' },
										// 	{ text: 'bezier', value: 'bezier' },
										// 	{ text: 'catmull', value: 'catmull' },
										// 	{ text: 'SCREEN', value: 'SCREEN' },
										// ] },
										{
											$key: 'posicionY.posicionY_interpolacionTipo',
											title: 'Interpolación',
											options: [
												{ text: 'linear', value: 'linear' },
												{ text: 'bezier', value: 'bezier' },
												{ text: 'catmull', value: 'catmull' },
											],
											view: 'buttons'
										},
										{ $key: 'posicionY.posicionY_interpolacionPuntos', title: 'Números separados\npor coma (,)' },
										{ $type: 'button', title: 'Click para comenzar ➡️', label: 'Capturar/Terminar',
												callback: function(target) {
													capturaCoordenadas('PosicionY-Interpolacion');
												},
										},
									]
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoScaleSeleccionada === 'Scale' ? '✔️' : ''}Scale`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.tipoScaleSeleccionada === 'Scale',
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.scaleSeleccionada === 'Unica',
									$properties: [
										{ $key: 'scale.scale_unica', title: 'Scale ', min: -2, max: 2, step: 0.01 },
									],
								},

								{
									title: 'Transition',
									show: configAdicional.scaleSeleccionada === 'Transition',
									$properties: [
										{ $key: 'scale.scale_start', title: 'Start ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scale.scale_end', title: 'End ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scale.scale_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'scale.scale_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Random',
									show: configAdicional.scaleSeleccionada === 'Random',
									$properties: [
										{ $key: 'scale.scale_min', title: 'Min ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scale.scale_max', title: 'Max ', min: -2, max: 2, step: 0.01 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.scaleSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'scale.scale_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'scale.scale_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('scale');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoScaleSeleccionada === 'ScaleXY' ? '✔️' : ''}Scale X`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.tipoScaleSeleccionada === 'ScaleXY',
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.scaleXSeleccionada === 'Unica',
									$properties: [
										{ $key: 'scaleX.scaleX_unica', title: 'ScaleX ', min: -2, max: 2, step: 0.01 },
									],
								},
								{
									title: 'Transition',
									show: configAdicional.scaleXSeleccionada === 'Transition',
									$properties: [
										{ $key: 'scaleX.scaleX_start', title: 'Start ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleX.scaleX_end', title: 'End ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleX.scaleX_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'scaleX.scaleX_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Random',
									show: configAdicional.scaleXSeleccionada === 'Random',
									$properties: [
										{ $key: 'scaleX.scaleX_min', title: 'Min ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleX.scaleX_max', title: 'Max ', min: -2, max: 2, step: 0.01 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.scaleXSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'scaleX.scaleX_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'scaleX.scaleX_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('scaleX');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.tipoScaleSeleccionada === 'ScaleXY' ? '✔️' : ''}Scale Y`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.tipoScaleSeleccionada === 'ScaleXY',
					$properties: [
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.scaleYSeleccionada === 'Unica',
									$properties: [
										{ $key: 'scaleY.scaleY_unica', title: 'ScaleY ', min: -2, max: 2, step: 0.01 },
									],
								},

								{
									title: 'Transition',
									show: configAdicional.scaleYSeleccionada === 'Transition',
									$properties: [
										{ $key: 'scaleY.scaleY_start', title: 'Start ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleY.scaleY_end', title: 'End ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleY.scaleY_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'scaleY.scaleY_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Random',
									show: configAdicional.scaleYSeleccionada === 'Random',
									$properties: [
										{ $key: 'scaleY.scaleY_min', title: 'Min ', min: -2, max: 2, step: 0.01 },
										{ $key: 'scaleY.scaleY_max', title: 'Max ', min: -2, max: 2, step: 0.01 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.scaleYSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'scaleY.scaleY_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'scaleY.scaleY_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('scaleY');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.alpha.alpha_activado ? '✔️' : ''}Alpha`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.alpha.alpha_activado,
					$properties: [
						{ $key: 'alpha.alpha_activado', title: 'Alpha Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.alphaSeleccionada === 'Unica',
									$properties: [
										{ $key: 'alpha.alpha_unica', title: 'Alpha ', min: 0, max: 1, step: 0.01 },
									],
								},

								{
									title: 'Alpha Transition',
									show: configAdicional.alphaSeleccionada === 'Transition',
									$properties: [
										{ $key: 'alpha.alpha_start', title: 'Start ', min: 0, max: 1, step: 0.01 },
										{ $key: 'alpha.alpha_end', title: 'End ', min: 0, max: 1, step: 0.01 },
										{ $key: 'alpha.alpha_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'alpha.alpha_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Alpha Random',
									show: configAdicional.alphaSeleccionada === 'Random',
									$properties: [
										{ $key: 'alpha.alpha_min', title: 'Min ', min: 0, max: 1, step: 0.01 },
										{ $key: 'alpha.alpha_max', title: 'Max ', min: 0, max: 1, step: 0.01 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.alphaSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'alpha.alpha_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'alpha.alpha_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('alpha');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.rotate.rotate_activado ? '✔️' : ''}Rotate`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.rotate.rotate_activado,
					$properties: [
						{ $key: 'rotate.rotate_activado', title: 'Rotate Activado', view: 'toggleSwitch' },
						{
							$type: 'tab',
							pages: [
								{
									title: 'Unica',
									show: configAdicional.rotateSeleccionada === 'Unica',
									$properties: [
										{ $key: 'rotate.rotate_unica', title: 'Rotate ', min: -360, max: 360, step: 1 },
									],
								},

								{
									title: 'Rotate Transition',
									show: configAdicional.rotateSeleccionada === 'Transition',
									$properties: [
										{ $key: 'rotate.rotate_start', title: 'Start ', min: -360, max: 360, step: 1 },
										{ $key: 'rotate.rotate_end', title: 'End ', min: -360, max: 360, step: 1 },
										{ $key: 'rotate.rotate_transitionEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
										{ $key: 'rotate.rotate_transitionEase', title: 'Ease ', inputTextReadOnly: true  },
									]
								},
								{
									title: 'Rotate Random',
									show: configAdicional.rotateSeleccionada === 'Random',
									$properties: [
										{ $key: 'rotate.rotate_min', title: 'Min ', min: -360, max: 360, step: 1 },
										{ $key: 'rotate.rotate_max', title: 'Max ', min: -360, max: 360, step: 1 },
									]
								},
								{
									title: 'Avanzado',
									show: configAdicional.rotateSeleccionada === 'Avanzado',
									$properties: [
										{ $key: 'rotate.rotate_onEmitActivado', title: 'On Emit Activado', view: 'toggleSwitch' },
										{ $key: 'rotate.rotate_onUpdateActivado', title: 'On Update Activado', view: 'toggleSwitch' },
										{ $type: 'button', title: 'Click para configurar ➡️', label: 'Configurar',
												callback: function(target) {
													abrirPropiedadesAvanzadas('rotate');
												},
										},
									],
								},
							],
						},
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.bounds.bounds_activado ? '✔️' : ''}Bounds & bounce`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.bounds.bounds_activado,
					$properties: [
						{ $key: 'bounce', title: 'bounce', min: 0, max: 1, step: 0.01 },
						{ $key: 'bounds.bounds_activado', title: 'Activar Bounds', view: 'toggleSwitch' },
						{ $key: 'bounds.bounds_mostrar', title: 'Mostrar Bounds', view: 'toggleSwitch' },
						{ $key: 'bounds.bounds_color', title: 'Color Bounds', view: 'color' },
						{ $key: 'bounds.bounds_x', title: 'x', min: -200, max: this.cameras.main.displayWidth + 200, step: 1 },
						{ $key: 'bounds.bounds_y', title: 'y', min: -200, max: this.cameras.main.displayHeight + 200, step: 1 },
						{ $key: 'bounds.bounds_width', title: 'width', min: 0, max: this.cameras.main.displayWidth + 200, step: 1 },
						{ $key: 'bounds.bounds_height', title: 'height', min: 0, max: this.cameras.main.displayHeight + 200, step: 1 },
					]
				},
				{ $type: 'separator' },


				{
					$type: 'folder', title: `${memoria.colorTint.colorTint_seleccionado !== 'ninguno' ? '✔️' : ''}Color / Tint`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.colorTint.colorTint_seleccionado !== 'ninguno',
					$properties: [
						{
							$key: 'colorTint.colorTint_seleccionado',
							title: 'Seleccione',
							options: [
								{ text: 'Ninguno', value: 'ninguno' },
								{ text: 'Color', value: 'color' },
								{ text: 'Tint', value: 'tint' },
							],
							view: 'buttons'
						},
						{ $key: 'colorTint.colorTint_color', title: 'Color' },
						// { $key: 'colorTint.colorTint_colorEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, step: 1  },
						{ $key: 'colorTint.colorTint_colorEaseAuxInt', title: 'Ease Aux', min: 0, max: this.listaEases.length - 1, view: 'incdec'  },
						{ $key: 'colorTint.colorTint_colorEase', title: 'Ease ', inputTextReadOnly: true  },
						{ $key: 'colorTint.colorTint_tint', title: 'Tint' },
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.bokeh.bokeh_activado ? '✔️' : ''}Bokeh 🚨 utiliza muchos recursos`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.bokeh.bokeh_activado,
					$properties: [
						{ $key: 'bokeh.bokeh_activado', title: 'Activar Bokeh', view: 'toggleSwitch' },
						{ $key: 'bokeh.bokeh_radius', title: 'Radio', min: 0, max: 1, step: 0.01 },
						{ $key: 'bokeh.bokeh_amount', title: 'Cantidad', min: 0, max: 20, step: 0.1 },
						{ $key: 'bokeh.bokeh_contrast', title: 'Contraste', min: 0, max: 1, step: 0.01 },
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.gravityWell.gravityWell_activado ? '✔️' : ''}Gravity well`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.gravityWell.gravityWell_activado,
					$properties: [
						{ $key: 'gravityWell.gravityWell_activado', title: 'Activar GravityWell', view: 'toggleSwitch' },
						{ $key: 'gravityWell.gravityWell_mostrarPunto', title: 'Mostrar Punto', view: 'toggleSwitch' },
						{ $key: 'gravityWell.gravityWell_x', title: 'X', min: -1000, max: 1000, step: 1 },
						{ $key: 'gravityWell.gravityWell_y', title: 'Y', min: -1000, max: 1000, step: 1 },
						{ $key: 'gravityWell.gravityWell_power', title: 'Power', min: 0, max: 100, step: 0.1 },
						{ $key: 'gravityWell.gravityWell_epsilon', title: 'Epsilon', min: 0, max: 1000, step: 1 },
						{ $key: 'gravityWell.gravityWell_gravity', title: 'Gravity', min: 0, max: 1000, step: 1 },
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none' ? '✔️' : ''}StopAfter y Duration`,
					expanded: memoria.expandirPaginasUtilizadas && memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none',
					$properties: [
						{
							$key: 'stopAfterDuration.stopAfterDuration_tipo',
							title: 'Tipo',
							options: [
								{ text: 'none', value: 'none' },
								{ text: 'stopAfter', value: 'stopAfter' },
								{ text: 'duration', value: 'duration' },
							],
							view: 'buttons'
						},
						{ $key: 'stopAfterDuration.stopAfterDuration_stopAfter', title: 'stopAfter', min: 1, max: 10000, step: 1 },
						{ $key: 'stopAfterDuration.stopAfterDuration_duration', title: 'duration', min: 1, max: 10000, step: 1 },
						{ $key: 'stopAfterDuration.stopAfterDuration_reset', title: 'Activar Reset', view: 'toggleSwitch' },
					]
				},
				{ $type: 'separator' },

				{
					$type: 'folder', title: `${this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaDeathZones.length > 0 || this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaEmitZones.length > 0 ? '✔️' : ''}Death/Emitting Zone`,
					expanded: memoria.expandirPaginasUtilizadas && (this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaDeathZones.length > 0 || this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.listaEmitZones.length > 0),
					$properties: [
						{ $key: 'deathZone.deathZone_activado', title: 'Activar DeathZone', view: 'toggleSwitch' },
						{ $key: 'deathZone.deathZone_mostrar', title: 'Mostrar DeathZone', view: 'toggleSwitch' },
						{ $key: 'deathZone.deathZone_color', title: 'Color DeathZone', view: 'color' },
						{ $type: 'button', title: 'Death Zone ➡️', label: 'Abrir',
												callback: function(target) {
													abrirDeathZone();
												},
										},
						{ $type: 'separator' },
						{ $key: 'emitZone.emitZone_activado', title: 'Activar EmitZone', view: 'toggleSwitch' },
						{ $key: 'emitZone.emitZone_mostrar', title: 'Mostrar EmitZone', view: 'toggleSwitch' },
						{ $key: 'emitZone.emitZone_color', title: 'Color EmitZone', view: 'color' },
						{ $type: 'button', title: 'Emit Zone ➡️', label: 'Abrir',
												callback: function(target) {
													abrirEmitZone();
												},
										},
						{ $type: 'separator' },
					]
				},
				{ $type: 'separator' },
        ];
	}

	private resetEmitter(index: number, resetEmitter: boolean) {
		const configParticle = this.listaEmitters[index].configParticle;
		const configAdicional = this.listaEmitters[index].configAdicional;
		let auxConfig =  structuredClone(configParticle);
		const propiedadesFunction = this.obtenerPropiedadesFunctionEmitter(configAdicional, this.listaEmitters[index].memoria);
		auxConfig = { ...auxConfig, ...propiedadesFunction };
		this.eliminarPropiedadesEmitter(auxConfig, configAdicional, this.listaEmitters[index].memoria);

		console.log({ auxConfig });
		const emitter = this.listaEmitters[index].emitter;
		if (resetEmitter || emitter.listenerCount('complete') > 0) {
			emitter.off('complete');
			emitter.destroy();
			this.listaEmitters[index].emitter = this.add.particles(emitter.x, emitter.y, AtlasImagenes.Particulas, {
												frame: !this.listaEmitters[index].frameCycle ? this.listaEmitters[index].frame : { frames: this.listaEmitters[index].frame, cycle: true },
												...auxConfig,
											}).setDepth(-1);
			if (this.listaEmitters[index].bokeh) {
				this.listaEmitters[index].bokeh.destroy();
				const memoria = this.listaEmitters[index].memoria;
				this.listaEmitters[index].bokeh = this.listaEmitters[index].emitter.postFX.addBokeh(
					memoria.bokeh.bokeh_radius,
					memoria.bokeh.bokeh_amount,
					memoria.bokeh.bokeh_contrast
				);
			}

			if (this.listaEmitters[index].gravityWell) {
				this.listaEmitters[index].gravityWell.destroy();
				const memoria = this.listaEmitters[index].memoria;
				this.listaEmitters[index].gravityWell = this.listaEmitters[index].emitter.createGravityWell({
							x: memoria.gravityWell.gravityWell_x,
							y: memoria.gravityWell.gravityWell_y,
							power: memoria.gravityWell.gravityWell_power,
							epsilon: memoria.gravityWell.gravityWell_epsilon,
							gravity: memoria.gravityWell.gravityWell_gravity,
				});
			}
			this.resetAllDeathEmitZone(index);
			this.graficarDeathZone(index);
			this.graficarEmitZone(index);
		} else {
			emitter.setConfig(auxConfig);
		}
		const memoria = this.listaEmitters[index].memoria;
		if (memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none' && memoria.stopAfterDuration.stopAfterDuration_reset) {
			this.listaEmitters[index].emitter.on('complete', () => {
				this.listaEmitters[index].emitter.start();
			});
		}
	}

	private eliminarPropiedadesEmitter(auxConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig, configAdicional: IConfiguracionAdicional, memoria: IMemoria) {
		if (configAdicional.tipoSpeedSeleccionada === 'SpeedAngle') {
			delete auxConfig.speedX;
			delete auxConfig.speedY;
			if (!configAdicional.velocidadAngleActivado) {
				delete auxConfig.angle;
			}
		} else if (configAdicional.tipoSpeedSeleccionada === 'SpeedXY') {
			delete auxConfig.speed;
			delete auxConfig.angle;
		} else {
			delete auxConfig.speedX;
			delete auxConfig.speedY;
			delete auxConfig.angle;
			delete auxConfig.speed;
		}

		if (configAdicional.tipoScaleSeleccionada === 'Scale') {
			delete auxConfig.scaleX;
			delete auxConfig.scaleY;
		} else if (configAdicional.tipoScaleSeleccionada === 'ScaleXY') {
			delete auxConfig.scale;
		} else {
			delete auxConfig.scale;
			delete auxConfig.scaleX;
			delete auxConfig.scaleY;
		}

		if (!configAdicional.alphaActivado) {
			delete auxConfig.alpha;
		}
		if (!configAdicional.rotateActivado) {
			delete auxConfig.rotate;
		}

		if (!configAdicional.accelerationXActivada) {
			delete auxConfig.accelerationX;
		}

		if (!configAdicional.accelerationYActivada) {
			delete auxConfig.accelerationY;
		}

		if (!configAdicional.posicionXActivada) {
			delete auxConfig.x;
		}
		if (!configAdicional.posicionYActivada) {
			delete auxConfig.y;
		}

		if (!auxConfig.blendMode) {
			delete auxConfig.blendMode;
		}

		if (!auxConfig.maxVelocityX) {
			delete auxConfig.maxVelocityX;
		}

		if (!auxConfig.maxVelocityY) {
			delete auxConfig.maxVelocityY;
		}

		if (!auxConfig.advance) {
			delete auxConfig.advance;
		}

		if (!auxConfig.hold) {
			delete auxConfig.hold;
		}

		if (auxConfig.particleBringToTop === null) {
			delete auxConfig.particleBringToTop;
		}

		if (!auxConfig.gravityX) {
			delete auxConfig.gravityX;
		}

		if (!auxConfig.gravityY) {
			delete auxConfig.gravityY;
		}

		if (!auxConfig.sortProperty) {
			delete auxConfig.sortProperty;
			delete auxConfig.sortOrderAsc;
		}
		if (memoria.moveToActivar) {
			delete auxConfig.speedX;
			delete auxConfig.speedY;
			delete auxConfig.angle;
			delete auxConfig.speed;
			delete auxConfig.accelerationX;
			delete auxConfig.accelerationY;
			delete auxConfig.gravityX;
			delete auxConfig.gravityY;
		} else {
			delete auxConfig.moveToX;
			delete auxConfig.moveToY;
		}

		for (const item of propiedadesAdvancedFormulaArray) {
			if (configAdicional[`${item}Seleccionada`] === 'Avanzado') {
				const propiedadFormula = configAdicional.listaPropiedadesFunction.find(x => x.propiedadFormula === item);
				const onEmitActivado = memoria[item][`${item}_onEmitActivado`];
				const onUpdateActivado = memoria[item][`${item}_onUpdateActivado`];
				if (!propiedadFormula?.onEmitFormula && !propiedadFormula?.onUpdateFormula) {
					delete auxConfig[item]
				} else if (!onEmitActivado && !onUpdateActivado) {
					delete auxConfig[item];
				} else if (!onEmitActivado && !!propiedadFormula?.onEmitFormula && !propiedadFormula?.onUpdateFormula) {
					delete auxConfig[item];
				} else if (!onUpdateActivado && !!propiedadFormula?.onUpdateFormula && !propiedadFormula?.onEmitFormula) {
					delete auxConfig[item];
				}
			}
		}
	}

	private obtenerPropiedadesFunctionEmitter(configAdicional: IConfiguracionAdicional, memoria: IMemoria) {
		type propiedadesConFunction = {
			[u in typePropiedadesAdvancedFormula]?: { onEmit: (particle: Phaser.GameObjects.Particles.Particle, key: string, value: number) => number, onUpdate: (particle: Phaser.GameObjects.Particles.Particle, key: string, t: number, value: number) => number };
		};
		const resultado: propiedadesConFunction = {};
		for (const item of configAdicional.listaPropiedadesFunction) {
			let funcOnEmit: (particle: Phaser.GameObjects.Particles.Particle, key: string, value: number) => number;
			let funcOnUpdate: (particle: Phaser.GameObjects.Particles.Particle, key: string, t: number, value: number) => number;
			if (configAdicional[`${item.propiedadFormula}Seleccionada`] === 'Avanzado') {
				if (memoria[item.propiedadFormula][`${item.propiedadFormula}_onEmitActivado`] && item.onEmitFormula) {
					funcOnEmit = new Function('particle', 'key', 'value', item.onEmitFormula) as (particle: Phaser.GameObjects.Particles.Particle, key: string, value: any) => any;
				}

				if (memoria[item.propiedadFormula][`${item.propiedadFormula}_onUpdateActivado`] && item.onUpdateFormula) {
					funcOnUpdate = new Function('particle', 'key', 't', 'value', item.onUpdateFormula) as (particle: Phaser.GameObjects.Particles.Particle, key: string, t: number, value: any) => any;
				}
			}
			resultado[item.propiedadFormula] = { onEmit: funcOnEmit, onUpdate: funcOnUpdate };
			if (!funcOnEmit) {
				delete resultado[item.propiedadFormula].onEmit;
			}
			if (!funcOnUpdate) {
				delete resultado[item.propiedadFormula].onUpdate;
			}
			if (!funcOnEmit && !funcOnUpdate) {
				delete resultado[item.propiedadFormula];
			}
		}
		return resultado;
	}

	private resetAllDeathEmitZone(indexEmitter: number) {
		const emitter = this.listaEmitters[indexEmitter].emitter;
		const configAdicional = this.listaEmitters[indexEmitter].configAdicional;
		emitter.clearDeathZones();
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		if (memoria.deathZone.deathZone_activado) {
			for (const deathZone of configAdicional.listaDeathZones) {
				emitter.addDeathZone({
					type: deathZone.tipo,
					source: deathZone.figura,
				});
			}
		}


		emitter.clearEmitZones();
		if (memoria.emitZone.emitZone_activado) {
			for (const emitZone of configAdicional.listaEmitZones) {
				const aux = {
					type: emitZone.tipo,
					source: UtilFiguras.obtenerInstanciaFiguraPosicionRelativa(emitZone.figura, emitter),
					quantity: emitZone.quantity,
					total: emitZone.total,
					yoyo: emitZone.yoyo
				};
				if (emitZone.tipo === 'random') {
					delete aux.quantity;
					delete aux.yoyo;
				}
				emitter.addEmitZone(aux);
			}
		}
	}

	private emitterDeathZone(nueva: boolean, indexDeathZone: number, tipo: 'onLeave' | 'onEnter', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle) {
		const emitter = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		const memoria = this.listaEmitters[this.indexEmitterSeleccionado].memoria;
		if (nueva) {
			configAdicional.listaDeathZones.push({tipo: tipo, figura});
			if (memoria.deathZone.deathZone_activado) {
				emitter.addDeathZone({
					type: tipo,
					source: figura
				});
			}
		} else {
			configAdicional.listaDeathZones[indexDeathZone] = {tipo: tipo, figura};
			emitter.clearDeathZones();
			if (memoria.deathZone.deathZone_activado) {
				emitter.addDeathZone(configAdicional.listaDeathZones.map(x => ({
					type: x.tipo,
					source: x.figura,
				})));
			}
		}

		this.graficarDeathZone(this.indexEmitterSeleccionado);
	}

	private graficarDeathZone(indexEmitter: number) {
		const graphicsDeathZone = this.listaEmitters[indexEmitter].graphicsDeathZone;
		const configAdicional = this.listaEmitters[indexEmitter].configAdicional;
		graphicsDeathZone.clear();
		if (this.listaEmitters[indexEmitter].memoria.deathZone.deathZone_mostrar) {
			graphicsDeathZone.lineStyle(2, this.listaEmitters[indexEmitter].memoria.deathZone.deathZone_color);
			for (const item of configAdicional.listaDeathZones) {
				if (item.figura instanceof Phaser.Geom.Rectangle) {
					graphicsDeathZone.strokeRectShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Circle) {
					graphicsDeathZone.strokeCircleShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Ellipse) {
					graphicsDeathZone.strokeEllipseShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Triangle) {
					graphicsDeathZone.strokeTriangleShape(item.figura);
				}
			}
		}
	}

	private emitterEmitZone(nueva: boolean, indexEmitZone: number, tipo: 'edge' | 'random', figura: Phaser.Geom.Rectangle | Phaser.Geom.Circle | Phaser.Geom.Ellipse | Phaser.Geom.Triangle | Phaser.Geom.Line, quantity: number, total: number, yoyo: boolean) {
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		configAdicional.emitZoneAbsolutoX = this.listaEmitters[this.indexEmitterSeleccionado].emitter.x;
		configAdicional.emitZoneAbsolutoY = this.listaEmitters[this.indexEmitterSeleccionado].emitter.y;
		if (nueva) {
			configAdicional.listaEmitZones.push({tipo, figura, quantity, total, yoyo });
		} else {
			configAdicional.listaEmitZones[indexEmitZone] = {tipo: tipo, figura, quantity, total, yoyo};
		}
		this.resetEmitter(this.indexEmitterSeleccionado, true);
	}

	private graficarEmitZone(indexEmitter: number) {
		const graphicsEmitZone = this.listaEmitters[indexEmitter].graphicsEmitZone;
		const configAdicional = this.listaEmitters[indexEmitter].configAdicional;
		graphicsEmitZone.clear();
		if (this.listaEmitters[indexEmitter].memoria.emitZone.emitZone_mostrar) {
			graphicsEmitZone.lineStyle(2, this.listaEmitters[indexEmitter].memoria.emitZone.emitZone_color);
			for (const item of configAdicional.listaEmitZones) {
				if (item.figura instanceof Phaser.Geom.Rectangle) {
					graphicsEmitZone.strokeRectShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Circle) {
					graphicsEmitZone.strokeCircleShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Ellipse) {
					graphicsEmitZone.strokeEllipseShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Triangle) {
					graphicsEmitZone.strokeTriangleShape(item.figura);
				} else if (item.figura instanceof Phaser.Geom.Line) {
					graphicsEmitZone.strokeLineShape(item.figura);
				}
			}
		}
	}

	private recalcularEmitZone(x: number, y: number) {
		this.emitZoneComponent.ocultarSiEsVisible();
		const configAdicional = this.listaEmitters[this.indexEmitterSeleccionado].configAdicional;
		for (const item of configAdicional.listaEmitZones) {
			const nuevoX = x - configAdicional.emitZoneAbsolutoX;
			const nuevoY = y - configAdicional.emitZoneAbsolutoY;
			if (item.figura instanceof Phaser.Geom.Rectangle) {
				item.figura.setPosition(item.figura.x + nuevoX, item.figura.y + nuevoY);
			} else if (item.figura instanceof Phaser.Geom.Circle) {
				item.figura.setPosition(item.figura.x + nuevoX, item.figura.y + nuevoY);
			} else if (item.figura instanceof Phaser.Geom.Ellipse) {
				item.figura.setPosition(item.figura.x + nuevoX, item.figura.y + nuevoY);
			} else if (item.figura instanceof Phaser.Geom.Triangle) {
				item.figura.setTo(item.figura.x1 + nuevoX, item.figura.y1 + nuevoY, item.figura.x2 + nuevoX, item.figura.y2 + nuevoY, item.figura.x3 + nuevoX, item.figura.y3 + nuevoY);
			} else if (item.figura instanceof Phaser.Geom.Line) {
				item.figura.setTo(item.figura.x1 + nuevoX, item.figura.y1 + nuevoY, item.figura.x2 + nuevoX, item.figura.y2 + nuevoY);
			}
		}
		configAdicional.emitZoneAbsolutoX = x;
		configAdicional.emitZoneAbsolutoY = y;
		this.graficarEmitZone(this.indexEmitterSeleccionado);
	}

	private proyectoAbrirGuardados(id: number) {
		const proyecto = UtilProyectos.leerProyecto(id);
		this.proyectoDatos = {
			id: proyecto.id,
			nombreProyecto: proyecto.nombreProyecto,
			fecha: proyecto.fecha,
		};
		for (const item of proyecto.listaEmitters) {
			//FIXME: En el futuro sacarlo, codigo para actualizar proyectos guardados previamente
			if (!item.memoria.hasOwnProperty('moveToActivar')) {
				item.memoria.moveToActivar = false;
				item.memoria.moveToX = 0;
				item.memoria.moveToY = 0;
			}
			if (!item.configAdicional.hasOwnProperty('listaPropiedadesFunction')) {
				item.configAdicional.listaPropiedadesFunction = [];
			}
			if (!item.memoria.accelerationX.hasOwnProperty('accelerationX_onEmitActivado')) {
				item.memoria.accelerationX.accelerationX_onEmitActivado = false;
				item.memoria.accelerationX.accelerationX_onUpdateActivado = false;
			}
			if (!item.memoria.accelerationY.hasOwnProperty('accelerationY_onEmitActivado')) {
				item.memoria.accelerationY.accelerationY_onEmitActivado = false;
				item.memoria.accelerationY.accelerationY_onUpdateActivado = false;
			}
			if (!item.memoria.scale.hasOwnProperty('scale_onEmitActivado')) {
				item.memoria.scale.scale_onEmitActivado = false;
				item.memoria.scale.scale_onUpdateActivado = false;
			}
			if (!item.memoria.scaleX.hasOwnProperty('scaleX_onEmitActivado')) {
				item.memoria.scaleX.scaleX_onEmitActivado = false;
				item.memoria.scaleX.scaleX_onUpdateActivado = false;
			}
			if (!item.memoria.scaleY.hasOwnProperty('scaleY_onEmitActivado')) {
				item.memoria.scaleY.scaleY_onEmitActivado = false;
				item.memoria.scaleY.scaleY_onUpdateActivado = false;
			}
			if (!item.memoria.rotate.hasOwnProperty('rotate_onEmitActivado')) {
				item.memoria.rotate.rotate_onEmitActivado = false;
				item.memoria.rotate.rotate_onUpdateActivado = false;
			}
			if (!item.memoria.alpha.hasOwnProperty('alpha_onEmitActivado')) {
				item.memoria.alpha.alpha_onEmitActivado = false;
				item.memoria.alpha.alpha_onUpdateActivado = false;
			}
		}
		this.abrirProyecto(proyecto.listaEmitters);
	}

	private abrirProyecto(listaEmittersAbrir: IGuardarConfiguracionEmitter[]) {
		const listaEmitters: IConfiguracionEmitter[] = [];
		for (const item of listaEmittersAbrir) {
			const graphicsBounds = this.add.graphics();
			const graphicsDeathZone = this.add.graphics();
			const graphicsEmitZone = this.add.graphics();
			const configParticle = this.obtenerConfigParticleDesdeMemoria(item.configAdicional, item.memoria);
			const emitter: IConfiguracionEmitter = {
				emitter: this.add.particles(item.memoria.x, item.memoria.y, AtlasImagenes.Particulas, { emitting: false }),
				configAdicional: item.configAdicional,
				configParticle,
				graphicsBounds,
				texture: item.texture,
				frame: item.frame,
				frameCycle: !!item.frameCycle,
				bokeh: null,
				memoria: item.memoria,
				gravityWell: null,
				gravityWellPunto: null,
				graphicsDeathZone,
				graphicsEmitZone
			}

			if (item.memoria.bokeh.bokeh_activado) {
				emitter.bokeh = emitter.emitter.postFX.addBokeh(
					item.memoria.bokeh.bokeh_radius,
					item.memoria.bokeh.bokeh_amount,
					item.memoria.bokeh.bokeh_contrast
				);
			}

			if (item.memoria.bounds.bounds_activado && item.memoria.bounds.bounds_mostrar) {
				graphicsBounds.lineStyle(4, item.memoria.bounds.bounds_color, 1);
				graphicsBounds.strokeRectShape(new Phaser.Geom.Rectangle(item.memoria.bounds.bounds_x, item.memoria.bounds.bounds_y, item.memoria.bounds.bounds_width, item.memoria.bounds.bounds_height));
			}

			if (item.memoria.gravityWell.gravityWell_activado) {
				emitter.gravityWell = emitter.emitter.createGravityWell({
					x: item.memoria.gravityWell.gravityWell_x,
					y: item.memoria.gravityWell.gravityWell_y,
					power: item.memoria.gravityWell.gravityWell_power,
					epsilon: item.memoria.gravityWell.gravityWell_epsilon,
					gravity: item.memoria.gravityWell.gravityWell_gravity,
				});
			}
			if (item.memoria.gravityWell.gravityWell_mostrarPunto) {
				emitter.gravityWellPunto = this.add.circle(item.memoria.x + item.memoria.gravityWell.gravityWell_x, item.memoria.y + item.memoria.gravityWell.gravityWell_y, 20, 0xff0000).setStrokeStyle(4, 0xffffff);
			}
			listaEmitters.push(emitter);
		}
		for (const item of this.listaEmitters) {
			item.emitter.off('complete');
			item.emitter.destroy();
			item.graphicsBounds.destroy();
			item.graphicsDeathZone.destroy();
			item.graphicsEmitZone.destroy();
			item.bokeh?.destroy();
			item.gravityWell?.destroy();
			item.gravityWellPunto?.destroy();

			item.emitter = null;
			item.graphicsBounds = null;
			item.graphicsDeathZone = null;
			item.graphicsEmitZone = null;
			item.bokeh = null;
			item.gravityWell = null;
			item.gravityWellPunto = null;
			item.memoria = null;
			item.configParticle = null;
			item.configAdicional = null;
			item.texture = null;
			item.frame = null;
		}
		this.listaEmitters = listaEmitters;
		this.indexEmitterSeleccionado = 0;
		this.crearPanel();

		for (const [index, item] of this.listaEmitters.entries()) {
			for (const deathZone of item.configAdicional.listaDeathZones) {
				deathZone.figura = UtilFiguras.obtenerInstanciaFigura(deathZone.figura);
			}
			for (const emitZone of item.configAdicional.listaEmitZones) {
				emitZone.figura = UtilFiguras.obtenerInstanciaFigura(emitZone.figura);
			}
			this.resetEmitter(index, true);


			item.graphicsDeathZone.clear();
			if (item.memoria.deathZone.deathZone_mostrar) {
				item.graphicsDeathZone.lineStyle(2, item.memoria.deathZone.deathZone_color);
				for (const deathZone of item.configAdicional.listaDeathZones) {
					if (deathZone.figura instanceof Phaser.Geom.Rectangle) {
						item.graphicsDeathZone.strokeRectShape(deathZone.figura);
					} else if (deathZone.figura instanceof Phaser.Geom.Circle) {
						item.graphicsDeathZone.strokeCircleShape(deathZone.figura);
					} else if (deathZone.figura instanceof Phaser.Geom.Ellipse) {
						item.graphicsDeathZone.strokeEllipseShape(deathZone.figura);
					} else if (deathZone.figura instanceof Phaser.Geom.Triangle) {
						item.graphicsDeathZone.strokeTriangleShape(deathZone.figura);
					}
				}
			}

			item.graphicsEmitZone.clear();
			if (item.memoria.emitZone.emitZone_mostrar) {
				item.graphicsEmitZone.lineStyle(2, item.memoria.emitZone.emitZone_color);
				for (const emitZone of item.configAdicional.listaEmitZones) {
					if (emitZone.figura instanceof Phaser.Geom.Rectangle) {
						item.graphicsEmitZone.strokeRectShape(emitZone.figura);
					} else if (emitZone.figura instanceof Phaser.Geom.Circle) {
						item.graphicsEmitZone.strokeCircleShape(emitZone.figura);
					} else if (emitZone.figura instanceof Phaser.Geom.Ellipse) {
						item.graphicsEmitZone.strokeEllipseShape(emitZone.figura);
					} else if (emitZone.figura instanceof Phaser.Geom.Triangle) {
						item.graphicsEmitZone.strokeTriangleShape(emitZone.figura);
					} else if (emitZone.figura instanceof Phaser.Geom.Line) {
						item.graphicsEmitZone.strokeLineShape(emitZone.figura);
					}
				}
			}
		}
	}

	private obtenerConfigParticleDesdeMemoria(configAdicional: IConfiguracionAdicional, memoria: IMemoria): Phaser.Types.GameObjects.Particles.ParticleEmitterConfig {
		const obtenerSpeed = (propiedad: string, valor: 'Unica' | 'Transition' | 'Random') => {
			if (valor === 'Unica') {
				return memoria[propiedad][`${propiedad}_unica`];
			} else if (valor === 'Transition') {
				return { start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`], steps: memoria[propiedad][`${propiedad}_steps`] };
			} else if (valor === 'Random') {
				return { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			}
		};

		const obtenerPropiedadesCompuestas = (propiedad: string, valor: 'Unica' | 'Transition' | 'Random' | 'Avanzado') => {
			if (valor === 'Unica') {
				return memoria[propiedad][`${propiedad}_unica`];
			} else if (valor === 'Transition') {
				const aux = { start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`], steps: memoria[propiedad][`${propiedad}_steps`], ease: memoria[propiedad][`${propiedad}_transitionEaseAuxInt`] ? memoria[propiedad][`${propiedad}_transitionEase`] : '' };
				if (!aux.steps) {
					delete aux.steps;
				}
				if (!aux.ease) {
					delete aux.ease;
				}
				return aux;
			} else if (valor === 'Random') {
				return { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			}
			// else if (valor === `Avanzado`) {
			// 	return `${propiedad}_avanzado`;
			// }
		};

		const obtenerPosicion = (propiedad: string, valor: 'Unica' | 'Transition' | 'Random' | 'Puntos' | 'Interpolacion') => {
			if (valor === 'Unica') {
				return memoria[propiedad][`${propiedad}_unica`];
			} else if (valor === 'Transition') {
				const aux =  {
					start: memoria[propiedad][`${propiedad}_start`], end: memoria[propiedad][`${propiedad}_end`], steps: memoria[propiedad][`${propiedad}_steps`],
					ease: !!memoria[propiedad][`${propiedad}_transitionEaseAuxInt`] ? memoria[propiedad][`${propiedad}_transitionEase`] : '',
					random: memoria[propiedad][`${propiedad}_transitionRandom`],
				};
				if (!aux.steps) {
					delete aux.steps;
				}
				if (!aux.ease) {
					delete aux.ease;
				}
				if (!aux.random) {
					delete aux.random;
				}
				return aux;
			} else if (valor === 'Random') {
				return { min: memoria[propiedad][`${propiedad}_min`], max: memoria[propiedad][`${propiedad}_max`] };
			} else if (valor === 'Puntos') {
				return memoria[propiedad][`${propiedad}_puntos`].split(',').map(x => +x);
			} else {
				return { values: memoria[propiedad][`${propiedad}_interpolacionPuntos`].split(',').map(x => +x), interpolation: memoria[propiedad][`${propiedad}_interpolacionTipo`] };
			}
		};

		const configParticle: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
			lifespan: memoria.lifespan,
			frequency: memoria.frequency,
			quantity: memoria.quantity,
			blendMode: memoria.blendMode,
			gravityX: memoria.gravityX,
			gravityY: memoria.gravityY,
		};
		if (memoria.maxVelocityX) {
			configParticle.maxVelocityX = memoria.maxVelocityX;
		}
		if (memoria.maxVelocityY) {
			configParticle.maxVelocityY = memoria.maxVelocityY;
		}
		if (memoria.advance) {
			configParticle.advance = memoria.advance;
		}
		if (memoria.hold) {
			configParticle.hold = memoria.hold;
		}
		if (memoria.particleBringToTop !== null) {
			configParticle.particleBringToTop = memoria.particleBringToTop;
		}
		if (memoria.sortProperty) {
			configParticle.sortProperty = memoria.sortProperty;
			configParticle.sortOrderAsc = memoria.sortOrderAsc;
		}
		if (memoria.moveToActivar) {
			configParticle.moveToX = memoria.moveToX;
			configParticle.moveToY = memoria.moveToY;
		}

		if (memoria.stopAfterDuration.stopAfterDuration_tipo !== 'none') {
			if (memoria.stopAfterDuration.stopAfterDuration_tipo === 'stopAfter') {
				configParticle.stopAfter = memoria.stopAfterDuration.stopAfterDuration_stopAfter;
			} else if (memoria.stopAfterDuration.stopAfterDuration_tipo === 'duration') {
				configParticle.duration = memoria.stopAfterDuration.stopAfterDuration_duration;
			}
		}

		if (memoria.colorTint.colorTint_seleccionado === 'color') {
			const listaColores = memoria.colorTint.colorTint_color.split(',').map(x => x.trim()).filter(x => x);
			if (listaColores.length > 0 && listaColores.every(x => /^0x[0-9a-fA-F]{6}$/.test(x))) {
				configParticle.color = listaColores.map(x => parseInt(x, 16));
				if (memoria.colorTint.colorTint_colorEaseAuxInt) {
					configParticle.colorEase = this.listaEases[memoria.colorTint.colorTint_colorEaseAuxInt];
				}
			}
		}

		if (memoria.colorTint.colorTint_seleccionado === 'tint') {
			const listaColores = memoria.colorTint.colorTint_tint.split(',').map(x => x.trim()).filter(x => x);
			if (listaColores.length > 0 && listaColores.every(x => /^0x[0-9a-fA-F]{6}$/.test(x))) {
				configParticle.tint = listaColores.map(x => parseInt(x, 16));
			}
		}

		if (memoria.bounds.bounds_activado) {
			configParticle.bounds = new Phaser.Geom.Rectangle(memoria.bounds.bounds_x, memoria.bounds.bounds_y, memoria.bounds.bounds_width, memoria.bounds.bounds_height);
			if (memoria.bounce) {
				configParticle.bounce = memoria.bounce;
			}
		}

		configParticle.speed = obtenerSpeed('speed', configAdicional.speedSeleccionada);
		configParticle.speedX = obtenerSpeed('speedX', configAdicional.speedXSeleccionada);
		configParticle.speedY = obtenerSpeed('speedY', configAdicional.speedYSeleccionada);
		configParticle.scale = obtenerPropiedadesCompuestas('scale', configAdicional.scaleSeleccionada);
		configParticle.scaleX = obtenerPropiedadesCompuestas('scaleX', configAdicional.scaleXSeleccionada);
		configParticle.scaleY = obtenerPropiedadesCompuestas('scaleY', configAdicional.scaleYSeleccionada);
		configParticle.rotate = obtenerPropiedadesCompuestas('rotate', configAdicional.rotateSeleccionada);
		configParticle.alpha = obtenerPropiedadesCompuestas('alpha', configAdicional.alphaSeleccionada);
		configParticle.accelerationX = obtenerPropiedadesCompuestas('accelerationX', configAdicional.accelerationXSeleccionada);
		configParticle.accelerationY = obtenerPropiedadesCompuestas('accelerationY', configAdicional.accelerationYSeleccionada);
		configParticle.x = obtenerPosicion('posicionX', configAdicional.posicionXSeleccionada);
		configParticle.y = obtenerPosicion('posicionY', configAdicional.posicionYSeleccionada);
		configParticle.angle = obtenerPropiedadesCompuestas('angle', configAdicional.angleSeleccionada);
		return configParticle;
	}

	private emitterClonar(index:number) {
		const emitter = this.listaEmitters[index];
		const graphicsBounds = this.add.graphics();
		const graphicsDeathZone = this.add.graphics();
		const graphicsEmitZone = this.add.graphics();
		const configParticle = this.obtenerConfigParticleDesdeMemoria(emitter.configAdicional, emitter.memoria);
		const newEmitter: IConfiguracionEmitter = {
			emitter: this.add.particles(emitter.memoria.x, emitter.memoria.y, AtlasImagenes.Particulas, { emitting: false }),
			configAdicional: structuredClone(emitter.configAdicional),
			configParticle,
			graphicsBounds,
			texture: emitter.texture,
			frame: emitter.frame,
			frameCycle: emitter.frameCycle,
			bokeh: null,
			memoria: structuredClone(emitter.memoria),
			gravityWell: null,
			gravityWellPunto: null,
			graphicsDeathZone,
			graphicsEmitZone
		};
		if (emitter.bokeh) {
			newEmitter.bokeh = newEmitter.emitter.postFX.addBokeh(
				newEmitter.memoria.bokeh.bokeh_radius,
				newEmitter.memoria.bokeh.bokeh_amount,
				newEmitter.memoria.bokeh.bokeh_contrast
			);
		}
		if (newEmitter.memoria.bounds.bounds_activado && newEmitter.memoria.bounds.bounds_mostrar) {
			graphicsBounds.lineStyle(4, newEmitter.memoria.bounds.bounds_color, 1);
			graphicsBounds.strokeRectShape(new Phaser.Geom.Rectangle(newEmitter.memoria.bounds.bounds_x, newEmitter.memoria.bounds.bounds_y, newEmitter.memoria.bounds.bounds_width, newEmitter.memoria.bounds.bounds_height));
		}
		if (emitter.gravityWell) {
			newEmitter.gravityWell = newEmitter.emitter.createGravityWell({
				x: newEmitter.memoria.gravityWell.gravityWell_x,
				y: newEmitter.memoria.gravityWell.gravityWell_y,
				power: newEmitter.memoria.gravityWell.gravityWell_power,
				epsilon: newEmitter.memoria.gravityWell.gravityWell_epsilon,
				gravity: newEmitter.memoria.gravityWell.gravityWell_gravity,
			});
		}
		if (newEmitter.gravityWellPunto) {
			newEmitter.gravityWellPunto = this.add.circle(newEmitter.memoria.x + newEmitter.memoria.gravityWell.gravityWell_x, newEmitter.memoria.y + newEmitter.memoria.gravityWell.gravityWell_y, 20, 0xff0000).setStrokeStyle(4, 0xffffff);
		}
		for (const deathZone of newEmitter.configAdicional.listaDeathZones) {
				deathZone.figura = UtilFiguras.obtenerInstanciaFigura(deathZone.figura);
			}
			for (const emitZone of newEmitter.configAdicional.listaEmitZones) {
				emitZone.figura = UtilFiguras.obtenerInstanciaFigura(emitZone.figura);

			}
		this.listaEmitters.push(newEmitter);
		this.resetEmitter(this.listaEmitters.length - 1, true);
	}

	private capturaCoordenadas(tipoCaptura: '' | 'PosicionX-Puntos' | 'PosicionX-Interpolacion' | 'PosicionY-Puntos' | 'PosicionY-Interpolacion') {
		this.barraVisualizacionEjemplosComponent.hide();
		const comenzarCaptura = !this.capturaCoordenadasTipo;
		if (comenzarCaptura && this.capturaCoordenadasTipo) {
			alert('Ya se está capturando Coordenadas');
			return;
		}

		if (!comenzarCaptura && !this.capturaCoordenadasFlag) {
			alert('No se ha iniciado la captura de Coordenadas');
			return;
		}

		if (comenzarCaptura) {
			this.capturaCoordenadasFlag = true;
			this.capturaCoordenadasTipo = tipoCaptura;
			this.capturaCoordenadasListaPuntos = [];
			this.menuAbierto?.destroy();
			this.menuComponent.hideFullMenu();
			this.capturaCoordenadasLabel = this.rexUI.add.label({
				x: this.input.x, y: this.input.y - 40,
				width: 325,
				height: 75,
				orientation: 'v',
				background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e).setStrokeStyle(2, 0x7b5e57),
				text: this.add.text(0, 0, 'Capturando puntos'),
				wrapText: true,
				// icon: this.rexUI.add.roundRectangle(0, 0, 40, 40, 10, 0x260e04),
				space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, },
				// adjustTextFontSize: true,
				align: 'left'

			}).layout()
			this.input.on('pointerdown', pointer => {
				if (this.capturaCoordenadasFlag) {
					this.capturaCoordenadasListaPuntos.push(new Phaser.Geom.Point(pointer.worldX, pointer.worldY));
					const {x: xEmitter, y: yEmitter} = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
					const tipoCapturaDescripcion = {
						'PosicionX-Puntos': 'PosX-Puntos',
						'PosicionX-Interpolacion': 'PosX-Interpolación',
						'PosicionY-Puntos': 'PosY-Puntos',
						'PosicionY-Interpolacion': 'PosY-Interpolación',
					}
					this.capturaCoordenadasLabel.setText(`Capturando puntos ${tipoCapturaDescripcion[this.capturaCoordenadasTipo]} (${this.capturaCoordenadasListaPuntos.length} puntos):
						Absoluto x: ${(+pointer.worldX).toFixed(0)}, y: ${(+pointer.worldY).toFixed(0)}
						Relativo x: ${(+pointer.worldX - xEmitter).toFixed(0)}, y: ${(+pointer.worldY - yEmitter).toFixed(0)}
						`);
				}
			});
			this.input.on('pointermove', pointer => {
				if (this.capturaCoordenadasFlag) {
					const {x: xEmitter, y: yEmitter} = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
					const tipoCapturaDescripcion = {
						'PosicionX-Puntos': 'PosX-Puntos',
						'PosicionX-Interpolacion': 'PosX-Interpolación',
						'PosicionY-Puntos': 'PosY-Puntos',
						'PosicionY-Interpolacion': 'PosY-Interpolación',
					}
					this.capturaCoordenadasLabel.setText(`Capturando puntos ${tipoCapturaDescripcion[this.capturaCoordenadasTipo]} (${this.capturaCoordenadasListaPuntos.length} puntos):
						Absoluto x: ${(+pointer.worldX).toFixed(0)}, y: ${(+pointer.worldY).toFixed(0)}
						Relativo x: ${(+pointer.worldX - xEmitter).toFixed(0)}, y: ${(+pointer.worldY - yEmitter).toFixed(0)}
						`);
					this.capturaCoordenadasLabel.setPosition(pointer.worldX, pointer.worldY - 40);
				}
			});
		} else {
			this.input.off('pointerdown');
			this.input.off('pointermove');
			this.capturaCoordenadasFlag = false;
			this.capturaCoordenadasLabel.destroy();
			this.capturaCoordenadasLabel = null;
			const puntosX = this.capturaCoordenadasListaPuntos.map(punto => +punto.x.toFixed(0)).slice(0, -1);
			const puntosY = this.capturaCoordenadasListaPuntos.map(punto => +punto.y.toFixed(0)).slice(0, -1);
			const {x: xEmitter, y: yEmitter} = this.listaEmitters[this.indexEmitterSeleccionado].emitter;
			if (this.capturaCoordenadasTipo === 'PosicionX-Puntos') {
				this.listaEmitters[this.indexEmitterSeleccionado].memoria.posicionX.posicionX_puntos = puntosX.map(punto => punto - xEmitter).join(',');
				this.cambiarPropiedadesPosicionEmitter('posicionX_puntos');
			} else if (this.capturaCoordenadasTipo === 'PosicionX-Interpolacion') {
				this.listaEmitters[this.indexEmitterSeleccionado].memoria.posicionX.posicionX_interpolacionPuntos = puntosX.map(punto => punto - xEmitter).join(',');
				this.cambiarPropiedadesPosicionEmitter('posicionX_interpolacionPuntos');
			} else if (this.capturaCoordenadasTipo === 'PosicionY-Puntos') {
				this.listaEmitters[this.indexEmitterSeleccionado].memoria.posicionY.posicionY_puntos = puntosY.map(punto => punto - yEmitter).join(',');
				this.cambiarPropiedadesPosicionEmitter('posicionY_puntos');
			} else if (this.capturaCoordenadasTipo === 'PosicionY-Interpolacion') {
				this.listaEmitters[this.indexEmitterSeleccionado].memoria.posicionY.posicionY_interpolacionPuntos = puntosY.map(punto => punto - yEmitter).join(',');
				this.cambiarPropiedadesPosicionEmitter('posicionY_interpolacionPuntos');
			}

			if (['PosicionX-Puntos', 'PosicionX-Interpolacion'].includes(this.capturaCoordenadasTipo) && this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.posicionXActivada) {
				this.resetEmitter(this.indexEmitterSeleccionado, false);
			}

			if (['PosicionY-Puntos', 'PosicionY-Interpolacion'].includes(this.capturaCoordenadasTipo) && this.listaEmitters[this.indexEmitterSeleccionado].configAdicional.posicionYActivada) {
				this.resetEmitter(this.indexEmitterSeleccionado, false);
			}
			this.capturaCoordenadasTipo = '';
			this.capturaCoordenadasListaPuntos = [];
			this.menuComponent.showButtonMenu(true);
		}

	}

}
