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

entrada.lexeme.lx_lngs.forEach(var_lx => {
    const global_variante = lx_variantes.filter(ele => ele.abreviacion == var_lx.abreviacion)
    //Si la entrada dentro de
    if (global_variante.length != 0) {
        const row_lx_var = newE("div", "row_lx_var" + var_lx.abreviacion, "row row align-items-end tag-small")
        div_lx.appendChild(row_lx_var)

        const col_lx_var_label = newE("div", "col_lx_var_label" + var_lx.abreviacion, "col-3 label-wrap text-end")
        col_lx_var_label.textContent = var_lx.abreviacion
        row_lx_var.appendChild(col_lx_var_label)

        const col_lx_var_value = newE("div", "col_lx_value" + var_lx.abreviacion, "col")
        row_lx_var.appendChild(col_lx_var_value)

        const input_lx_var_value = newE("input", "input_lx_var_value" + var_lx.abreviacion, "input-flat-dicc")
        input_lx_var_value.style.color = global_variante[0].style["font-color"]
        input_lx_var_value.style.fontSize = global_variante[0].style["font-size"]
        input_lx_var_value.type = "text"
        col_lx_var_value.appendChild(input_lx_var_value)

        input_lx_var_value.value = var_lx.value
        input_lx_var_value.onchange = () => {
            var_lx.value = input_lx_var_value.value
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
        }
    }

}
)