/**
 * It's a function that takes a string as an argument and returns an array of strings that match the
 * argument.
 * @returns The data is being returned as an array of objects.
 */
function autocompletar() {
    const inputMascota = document.querySelector('#tipo-mascota');
    let indexFocus = -1;

    inputMascota.addEventListener('input', function () {
        const tipoMascota = this.value;

        if (!tipoMascota) {
            return false;
        }
        cerrarLista();

        //crear la lista de sugerencias
        const divList = document.createElement('div');
        divList.setAttribute('id', this.id + '-lista-autocompletar');
        divList.setAttribute('class', 'lista-autocompletar-items');
        this.parentNode.appendChild(divList);


        HttpRequest('controllers/controller.php?tipo-mascota=' + tipoMascota, function () {
            //console.log(this.responseText);
            const arreglo = JSON.parse(this.responseText);
            //console.log("🚀 ~ file: main.js ~ line 23 ~ arreglo", arreglo)
            if (arreglo.length == 0) {
                return false;
            }
            arreglo.forEach(item => {
                if (item.substr(0, tipoMascota.length) == tipoMascota) {
                    const elementoLista = document.createElement('div');
                    elementoLista.innerHTML = `<strong>${item.substr(0, tipoMascota.length)}</strong>${item.substr(tipoMascota.length)}`;
                    elementoLista.addEventListener('click', function () {
                        inputMascota.value = this.innerText;
                        cerrarLista();
                        return false;
                    });
                    divList.appendChild(elementoLista);
                }
            });
        });
    });

    inputMascota.addEventListener('keydown', function (e) {
        const divList = document.querySelector('#' + this.id + '-lista-autocompletar');
        let items;

        if (divList) {
            items = divList.querySelectorAll('div');
            switch (e.keyCode) {
                case 40: //tecla abajo
                    indexFocus++;
                    if (indexFocus > items.length - 1) indexFocus = items.length - 1;
                    break;
                case 38: //tecla arriba
                    indexFocus--;
                    if (indexFocus < 0) indexFocus = 0;
                    break;
                case 13: //tecla enter
                    e.preventDefault();
                    items[indexFocus].click();
                    indexFocus = -1;
                    break;
                default:
                    break;
            }
            seleccionar(items, indexFocus);
            return false;
        }
    });

    document.addEventListener('click', function () {
        cerrarLista();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            cerrarLista();
        }
    });
}

/**
 * It removes the class autocompletar-active from all the items in the list, and then adds it to the
 * item at the index specified by the indexFocus parameter
 * @param items - The list of items to select from.
 * @param indexFocus - The index of the item that is currently selected.
 * @returns false if the items or indexFocus is -1.
 */
function seleccionar(items, indexFocus) {
    if (!items || indexFocus == -1) return false;
    items.forEach(x => { x.classList.remove('autocompletar-active') });
    items[indexFocus].classList.add('autocompletar-active');
}

/**
 * It removes all the elements with the class name "lista-autocompletar-items" from the DOM.
 */
function cerrarLista() {
    const items = document.querySelectorAll('.lista-autocompletar-items');
    items.forEach(item => {
        item.parentNode.removeChild(item);
    });
    indexFocus = -1;
}

/**
 * It creates a new XMLHttpRequest object, opens a connection to the specified URL, sends the request,
 * and then calls the callback function when the request is complete
 * @param url - The URL to make the request to.
 * @param callback - The function to be called when the request is complete.
 */
function HttpRequest(url, callback) {
    const http = new XMLHttpRequest();
    http.open('GET', url);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback.apply(http);
        }
    }
}



autocompletar();