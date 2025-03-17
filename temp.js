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

function _make_contextos_items(){
    col_contexto_values.innerHTML=""
    entrada["clase-contexto"].contextos.forEach(contexto=>{
        const div_contexto = newE("div", "div_contexto" + contexto.nombre, "div-fluid me-4")
        div_contexto.style.width = "50px"
        div_contexto.textContent = contexto.contexto

        const div_borrar = newE("div", "div_borrar" + contexto.nombre, "ms-2 bi bi-x-circle-fill btn-context-lx")
        div_contexto.appendChild(div_borrar)
        col_contexto_values.appendChild(div_contexto)

        div_borrar.onclick=()=>{
            const filter_borrar=entrada["clase-contexto"].contextos.filter(e=>e.key!=contexto.key)
            entrada["clase-contexto"].contextos=filter_borrar
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            _make_contextos_items()
        }

    })
}