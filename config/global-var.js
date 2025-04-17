const GLOBAL = {
    state: {
        data: [],
    },
    firestore: {},
    admin: {},
    from_drive: []
};
let activeEmail;
function randomKey(len, arr) {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return (ans);
}
function IniCredential() {
    //Lee la información del form,ulario de ingreso en index.html
    const email = document.getElementById("inEmail").value
    const password = document.getElementById("inPass").value

    //Evoca la función global de ingreso, en archivo (cinfirdata.js) 
    GLOBAL.admin.Verificar_Acceso(email, password)
}
function SignOut() {
    GLOBAL.admin.CredentialOut()
}
function autenticar() {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    const texto = document.getElementById("textoModal")
    modal.show();
    const btn = document.getElementById('btnConfirm')
    btn.onclick = () => IniCredential()
}


function mensajes(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
            color: "white",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
let byE = (elemento) => {
    const el = document.getElementById(elemento)
    return el
}
let newE = (elemento, id, clase, ancho) => {
    const el = document.createElement(elemento)
    el.id = id
    el.className = clase
    el.style.width = ancho
    return el
}

let newEk = (elemento, clase, text, id = randomKey(10, '12345abcde'), ancho) => {
    const el = document.createElement(elemento)
    el.id = id
    el.className = clase
    el.style.width = ancho
    el.textContent = text
    return el
}

///////////////////////////////
function dragElement(element, direction, panel_list_lx, panel_lexicon_edit_lx) {
    var md; // remember mouse down info
    const first = document.getElementById(panel_list_lx);
    const second = document.getElementById(panel_lexicon_edit_lx);

    element.onmousedown = onMouseDown;

    function onMouseDown(e) {
        //console.log("mouse down: " + e.clientX);
        md = {
            e,
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
            firstWidth: first.offsetWidth,
            secondWidth: second.offsetWidth
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            //console.log("mouse up");
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e) {
        //console.log("mouse move: " + e.clientX);
        var delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        if (direction === "H") // Horizontal
        {
            // Prevent negative-sized elements
            delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
                md.secondWidth);

            element.style.left = md.offsetLeft + delta.x + "px";
            first.style.width = (md.firstWidth + delta.x) + "px";
            second.style.width = (md.secondWidth - delta.x) + "px";
        }
    }
}

function verificar_datos(DATA) {
    if (typeof DATA == "undefined") {
        return false
    } else {
        return true
    }
}

// Dealing with Input width
let el = document.querySelector(".input-wrap .input");
let widthMachine = document.querySelector(".input-wrap .width-machine");
try {
    el.addEventListener("keyup", () => {
        widthMachine.innerHTML = el.value;
    });
} catch (error) {

}


// Dealing with Textarea Height
function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
}

let lista_puntuacion = []
function load_puntuacion() {
    const proyecto = global_proyecto["PROYECTO"]
    const puntos = proyecto.puntuacion.split(" ")

    puntos.forEach(p => {
        if (p != "") {
            lista_puntuacion.push(p.trim())
        }
    })

}

function clear_word_2(word_ini) {
    load_puntuacion()
    let Word_clear = word_ini

    lista_puntuacion.forEach(l => {
        if (Word_clear.includes(l) == true) {
            Word_clear = Word_clear.replace(l, " " + l + " ")
        }
    })

    const step2 = Word_clear.split(" ")
    let word2 = ""

    step2.forEach(s2 => {
        if (lista_puntuacion.includes(s2) == false) {
            word2 = word2 + s2
        }
    })


    return word2.toLowerCase()
}

function clear_text(word_ini) {
    load_puntuacion()
    let Word_clear = word_ini

    let text_proces = [word_ini]

    let i = 0
    lista_puntuacion.forEach(l => {
        if (text_proces[i].includes(l) == true) {
            var result = _cleanChar(text_proces[i], l);
            text_proces.push(result)          
            i++
        }
    })

    function _cleanChar(str, char) {
        while (true) {
            var result_1 = str.replace(char, '');
            if (result_1 === str) {
                break;
            }
            str = result_1;
        }
        return str;
    }


    //console.log(text_proces[text_proces.length - 1])
    return text_proces[text_proces.length - 1]
}



function clear_word(word_ini) {
    load_puntuacion()
    let Word_clear = word_ini

    lista_puntuacion.forEach(l => {
        if (Word_clear.includes(l) == true) {
            Word_clear = Word_clear.replace(l, " " + l + " ")
        }
    })

    const step2 = Word_clear.split(" ")
    let word2 = ""

    step2.forEach(s2 => {
        if (lista_puntuacion.includes(s2) == false) {
            word2 = word2 + s2
        }
    })
    return Word_clear.toLowerCase()
}


function sort_data(orden, data, campo) {
    const data_sort_ini = data
    let sortedDataArray

    const DataArray = Object.entries(data_sort_ini).map(([key, value]) => ({ ...value, key: key }))
    if (orden == "AZ") {
        sortedDataArray = DataArray.sort((a, b) => b[campo] - a[campo])
    } else {
        sortedDataArray = DataArray.sort((a, b) => a[campo] - b[campo])
    }
    return sortedDataArray

}

