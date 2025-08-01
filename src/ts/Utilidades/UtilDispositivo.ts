
export class UtilDispositivo {

    static esDispositivoiOS(){
        // const userAgent = window.navigator.userAgent;
        // return (/iP(hone|od|ad)/.test(userAgent));
        return !!navigator.platform.match(/iPhone|iPod|iPad/);

    }

    static esDispositivoMovil() {
        return (!!navigator.userAgent.match(/Android/i) ||
                !!navigator.userAgent.match(/webOS/i) ||
                !!navigator.userAgent.match(/iPhone/i) ||
                !!navigator.userAgent.match(/iPad/i) ||
                !!navigator.userAgent.match(/iPod/i) ||
                !!navigator.userAgent.match(/BlackBerry/i) ||
                !!navigator.userAgent.match(/Windows Phone/i));
    }
}



