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
    return(ans);
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

///////////////////////////////
function dragElement(element, direction) {
    var md; // remember mouse down info
    const first = document.getElementById("panel_list");
    const second = document.getElementById("panel_lexicon_edit");

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

function verificar_datos(DATA){
    if (typeof DATA == "undefined") {
        return false
    } else {
        return true
    }
}