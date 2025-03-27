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
let gns = p["lexemas-gn"]
let pss = p["lexemas-ps"]

//Cargamos info de las glosas de esta palabra
let adm_glosas = p["glosa-general"]
let glosa_activa = adm_glosas.options[adm_glosas["active-glosa"]]

if (adm_glosas.options.length != 0) {
    col_botones2.textContent = adm_glosas.options.length
}

let glosa = glosa_activa.text
c_word_glosa_gen.textContent = glosa_activa.text

c_word_glosa_gen.oninput = () => {
    //p["glosa-general"].push(c_word_glosa_gen.textContent)
    //save_data(global_proyecto["PARSER-WORD"])
}