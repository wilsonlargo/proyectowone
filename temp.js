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

const collapse_sub = newE("div", "collapse_ps" + cat_A, "collapse show")
            panel_list.appendChild(collapse_sub)


            let cat_B = 0
            cat.subcategorias.forEach(sub_B => {

                const item_collapse_categoria_b = newE("div", randomKey(10, '12345abcde'), "row align-items-center item-tree")
                collapse_sub.appendChild(item_collapse_categoria)

               


                cat_B++
            })

            cat_A++
        
        

const col_collapse_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree")
col_collapse_plus_b.textContent = "-"
col_collapse_plus_b.setAttribute("data-bs-toggle", "collapse")
col_collapse_plus_b.setAttribute("data-bs-target", "#collapse_ps" + cat_A)
item_collapse_categoria_b.appendChild(col_collapse_plus_b)

col_collapse_plus_b.onclick = () => {
    if (col_collapse_plus_b.textContent == "+") {
        col_collapse_plus_b.textContent = "-"
    } else if (col_collapse_plus_b.textContent == "-") {
        col_collapse_plus_b.textContent = "+"
    }
}

const col_collapse_name_b = newE("div", "categoria" + cat_B, "col")
col_collapse_name_b.textContent = sub_B.nombre[0].texto
item_collapse_categoria_b.appendChild(col_collapse_name_b)