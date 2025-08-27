import { IImagenBasico, IImagenCompleto } from "./Interfaces";

export class UtilImagenes {
	static guardarImagen(nombre: string, peso: number, base64: string) {
		const listaImagenes = <IImagenCompleto[]> (localStorage.getItem('imagenes') ? JSON.parse(localStorage.getItem('imagenes') || '[]') : []);
		const nuevaImagen: IImagenCompleto = {
			nombre: nombre.trim(),
			peso,
			fecha: new Date(),
			imagenBase64: base64,
		};
		listaImagenes.some(x => x.nombre === nombre.trim()) ?
			listaImagenes.splice(listaImagenes.findIndex(x => x.nombre === nuevaImagen.nombre), 1, nuevaImagen) :
			listaImagenes.push(nuevaImagen);
		localStorage.setItem('imagenes', JSON.stringify(listaImagenes));
		return <IImagenCompleto> {
			nombre: nuevaImagen.nombre,
			peso: nuevaImagen.peso,
			fecha: nuevaImagen.fecha,
			imagenBase64: nuevaImagen.imagenBase64,
		};
	}

	static eliminarImagen(nombre: string) {
		const listaImagenes = <IImagenCompleto[]> (localStorage.getItem('imagenes') ? JSON.parse(localStorage.getItem('imagenes') || '[]') : []);
		localStorage.setItem('imagenes', JSON.stringify(listaImagenes.filter(x => x.nombre !== nombre.trim())));
	}

	static obtenerListado() {
		const listaProyectos = <IImagenCompleto[]> (localStorage.getItem('imagenes') ? JSON.parse(localStorage.getItem('imagenes') || '[]') : []);
		return listaProyectos.map(x => (<IImagenBasico> {
			nombre: x.nombre,
			peso: x.peso,
			fecha: new Date(x.fecha),
		})).sort((a, b) => a.nombre.localeCompare(b.nombre));
	}

	static obtenerListadoCompleto() {
		const listaProyectos = <IImagenCompleto[]> (localStorage.getItem('imagenes') ? JSON.parse(localStorage.getItem('imagenes') || '[]') : []);
		return listaProyectos.map(x => (<IImagenCompleto> {
			nombre: x.nombre,
			peso: x.peso,
			fecha: new Date(x.fecha),
			imagenBase64: x.imagenBase64,
		})).sort((a, b) => a.nombre.localeCompare(b.nombre));
	}

	private static openDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("particle-editor-phaser", 1);

			request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains("imagenes-background")) {
				db.createObjectStore("imagenes-background");
			}
			};

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	static async guardarImagenIndexDB(nombre: string, peso: number, imagenBase64: string) {
		const db = await UtilImagenes.openDB();
		const tx = db.transaction("imagenes-background", "readwrite");
		const store = tx.objectStore("imagenes-background");

		// Convertir Base64 a Blob
		// const byteString = atob(base64.split(",")[1]);
		// const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
		// const ab = new ArrayBuffer(byteString.length);
		// const ia = new Uint8Array(ab);
		// for (let i = 0; i < byteString.length; i++) {
		// 	ia[i] = byteString.charCodeAt(i);
		// }
		// const blob = new Blob([ab], { type: mimeString });

		store.put({
			imagenBase64,
			peso,
			nombre: nombre.trim(),
			fecha: new Date(),
		}, nombre);

		// return tx.complete;
		return tx.oncomplete;
	}

	static async leerImagenIndexDB(nombre: string): Promise<Blob | null> {
		const db = await UtilImagenes.openDB();
		return new Promise((resolve, reject) => {
			const tx = db.transaction("imagenes-background", "readonly");
			const store = tx.objectStore("imagenes-background");
			const request = store.get(nombre);

			request.onsuccess = () => resolve(request.result || null);
			request.onerror = () => reject(request.error);
		});
	}

	static async eliminarImagenIndexDB(nombre: string): Promise<void> {
		const db = await UtilImagenes.openDB();
		await new Promise<void>((resolve, reject) => {
			const tx = db.transaction("imagenes-background", "readwrite");
			const store = tx.objectStore("imagenes-background");

			const req = store.delete(nombre);

			req.onerror = () => reject(req.error);
			tx.oncomplete = () => {
				db.close();
				resolve();
			};
			tx.onerror = () => reject(tx.error);
			tx.onabort = () => reject(tx.error);
		});
	}

	static async obtenerListadoIndexDB(): Promise<string[]> {
		const db = await UtilImagenes.openDB();

		return new Promise<string[]>((resolve, reject) => {
			const tx = db.transaction("imagenes-background", "readonly");
			const store = tx.objectStore("imagenes-background");
			const req = store.getAllKeys();
			req.onsuccess = () => {
				db.close();
				resolve(req.result as string[]);
			};
			req.onerror = () => reject(req.error);
		});
	}

	static async obtenerListadoCompletoIndexDB(): Promise<IImagenCompleto[]> {
		const db = await UtilImagenes.openDB();
		return new Promise((resolve, reject) => {
			const tx = db.transaction("imagenes-background", "readonly");
			const store = tx.objectStore("imagenes-background");

			const req = store.getAllKeys();
			const resultados: IImagenCompleto[] = [];

			req.onsuccess = () => {
			const keys = req.result as string[];
			let pending = keys.length;

			if (pending === 0) {
				db.close();
				resolve(resultados);
				return;
			}

			keys.forEach((key) => {
				const getReq = store.get(key);
				getReq.onsuccess = () => {
				resultados.push(getReq.result);
				pending--;
				if (pending === 0) {
					db.close();
					resolve(resultados);
				}
				};
				getReq.onerror = () => reject(getReq.error);
			});
			};

			req.onerror = () => reject(req.error);
		});
	}


}