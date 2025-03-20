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



cat.abreviaciones.forEach(l => {
    const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == l.abreviacion)
    if (filter_lng[0].visible == true) {
        const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
        col_abb_valores.appendChild(row_lng)

        const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
        col_nombre_lng.textContent = l.abreviacion
        row_lng.appendChild(col_nombre_lng)

        const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
        row_lng.appendChild(col_nombre_value)

        const int_lng_value = newE("input", randomKey(20, '12345abcde'), "input-flat-dicc")
        col_nombre_value.appendChild(int_lng_value)

        let campo = l
        int_lng_value.value = l.texto
        int_lng_value.onchange = () => {
            campo.texto = int_lng_value.value
            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        }
    }

})

//////////////////////////////////////////////////////////////////////////////77
const row_det = newE("div", randomKey(20, '12345abcde'), "row align-items-center mt-2")
panel_list_edit.appendChild(row_det)

const col_det = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
col_det.textContent = "Definiciónes"
row_det.appendChild(col_det)

const col_det_valores = newE("div", randomKey(20, '12345abcde'), "col")
row_det.appendChild(col_det_valores)

cat.definiciones.forEach(d => {
    const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == d.abreviacion)
    if (filter_lng[0].visible == true) {
        const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-start")
        col_det_valores.appendChild(row_lng)

        const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
        col_nombre_lng.textContent = d.abreviacion
        row_lng.appendChild(col_nombre_lng)

        const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
        row_lng.appendChild(col_nombre_value)

        const int_lng_value = newE("textarea", randomKey(20, '12345abcde'), "input-flat-dicc")
        col_nombre_value.appendChild(int_lng_value)

        let campo = d
        int_lng_value.value = campo.texto
        int_lng_value.onchange = () => {
            campo.texto = int_lng_value.value
            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        }
    }

})



