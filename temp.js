function loadDataBase(id, hoja, query = "Select *") {
    //Carga base de datos de google sheets y la convierte a una lista

    //let query = "Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W"
    return fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?&sheet=${hoja}&tq=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(text => {
            //Cargar Datos
            const rawdata = text.slice(47, -2);
            const data = ((JSON.parse(rawdata)).table);


            //Titulos de columnas y Obtener columnas
            const cols = (data.cols);
            const Keys = cols.map(col => col.label);
            const rows = data.rows;

            //Regresar Objeto (Diccionario Json)
            const Objeto = [];
            for (const row of rows) {
                const raw = (row.c)
                const rowinfo = raw.map(dic => (dic && dic.v) ? dic.v : 0);
                const caso = Object.fromEntries(Keys.map((key, i) => [key, rowinfo[i]]));
                Objeto.push(caso)
            }


            return Objeto
        })
}


let DataPrincipal;
loadDataBase("1dniplVXfiSFYUFfsT1Ij6cdEoAdtK7dqWf3x4s9eUSw", proyecto).then(objeto => {
    DataPrincipal = [...objeto].sort((a, b) => a[0] - b[0]);
    GLOBAL.from_drive = DataPrincipal
})


div_lexemes.innerHTML = ""
c_word_lexeme.textContent.split(" ")
new_lx.forEach(lx => {
    const btn_menu_lx = newEk("div", "bi bi-arrow-down-circle-fill btn-context-lx me-2")
    btn_menu_lx.setAttribute("data-bs-toggle", "dropdown")
    div_lexemes.appendChild(btn_menu_lx)

    const c_word_lexeme = newEk("span", "input input-flat-dicc me-2")
    c_word_lexeme.role = "textbox"
    c_word_lexeme.setAttribute("contenteditable", "")
    c_word_lexeme.textContent = lx
    div_lexemes.appendChild(c_word_lexeme)
})


if(C.id.includes("LX-")==true){
    
}

div_lexemes.addEventListener("keydown", (ev) => {


    //console.log("Has pulsado la tecla ", ev.key, ` (${ev.code})`);
});


const re = new RegExp(/[.&#41,-_|—]/);
const verificar_puntos = ""
const found = w.match(re);
if (found != null) {
    const punt = w.substr(found.index, 1)
    const newW=w.replace(punt,"")
    make_w(newW)
} else {
    make_w(w)
}
