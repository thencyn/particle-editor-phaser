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
}