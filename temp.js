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

const row_Cat = newE("div", randomKey(10, '12345abcde'), "row row align-items-end mt-2")
            div_lx.appendChild(row_Cat)

            const col_row_Cat_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_Cat.appendChild(col_row_Cat_label)

            const row_Cat_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_row_Cat_label.appendChild(row_Cat_label)

            const col_menu_Cat = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_Cat_label.appendChild(col_menu_Cat)

            const btn_menu_Cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_Cat.setAttribute("data-bs-toggle", "dropdown")
            col_menu_Cat.appendChild(btn_menu_Cat)

            const ul_menu_Cat = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_Cat.appendChild(ul_menu_Cat)

            const div_visible_Cat = newE("div", randomKey(10, '12345abcde'), "form-check")
            ul_menu_Cat.appendChild(div_visible_Cat)

            const int_visible_Cat = newE("input", randomKey(10, '12345abcde'), "form-check-input-check")
            int_visible_Cat.type = "checkbox"
            div_visible_Cat.appendChild(int_visible_Cat)


            const int_visibleCat_label = newE("label", randomKey(10, '12345abcde'), "form-check-label ms-2")
            int_visibleCat_label.for = "int_visible_Cat"
            int_visibleCat_label.textContent = "Visible"
            div_visible_Cat.appendChild(int_visibleCat_label)


            int_visible_Cat.checked = entrada["clase-Cat"].visible
            int_visible_Cat.onchange = () => {
                entrada["clase-Cat"].visible = int_visible_Cat.checked
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_lexicon_edit(entrada)
            }

            const col_menu_Cat_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
            col_menu_Cat_label.textContent = "Variante de"
            row_Cat_label.appendChild(col_menu_Cat_label)

            const col_variateOf_value = newE("div", randomKey(10, '12345abcde'), "col")
            row_Cat.appendChild(col_variateOf_value)

            const row_Cat_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_variateOf_value.appendChild(row_Cat_value)

            const col_variateOf_values = newE("div", randomKey(10, '12345abcde'), "col div-fluid")
            row_Cat_value.appendChild(col_variateOf_values)

            const col_variateOf_items = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_Cat_value.appendChild(col_variateOf_items)



