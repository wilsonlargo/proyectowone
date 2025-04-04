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

const n_end_sufijo = plantilla_cat["sufijos"].length - 1
for (id in plantilla_cat["sufijos"]) {
    plantilla_cat["sufijos"][id].orden = n_orden_pref
    n_orden_pref = n_orden_pref - 1
    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
    const th = newEk("th", "")
    trh.appendChild(th)
    const row_th = newEk("div", "row align-items-center")
    th.appendChild(row_th)

    const col_btn = newEk("div", "col-auto")
    row_th.appendChild(col_btn)

    const _btn = newEk("i", "bi bi-arrow-down-circle-fill btn-context-lx")
    _btn.setAttribute("data-bs-toggle", "dropdown")
    col_btn.appendChild(_btn)

    const ul_menu = newEk("ul", "dropdown-menu shadow")
    col_btn.appendChild(ul_menu)

    const item_borrar = newEk("div", "bi bi-trash item-menu-s ps-2 pe-2", "  Eliminar")
    ul_menu.appendChild(item_borrar)
    let id_item = parseInt(id)

    item_borrar.onclick = () => {
        const filter_del = plantilla_cat["sufijos"].filter(ele => ele.key != plantilla_cat["sufijos"][id_item].key)

        plantilla_cat["sufijos"] = filter_del
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_plantilla()

    }

    
    if (plantilla_cat["sufijos"][id].orden != 0) {
        const item_adelante = newEk("div", "bi bi-arrow-right-square item-menu-s ps-2 pe-2", "  Mover adelante")
        ul_menu.appendChild(item_adelante)
        item_adelante.onclick = () => {
            let ind_pos = plantilla_cat["sufijos"][id_item].orden - 1
            let ind_pre = plantilla_cat["sufijos"][id_item + 1].orden + 1
            plantilla_cat["sufijos"][id_item].orden = ind_pos

            plantilla_cat["sufijos"][id_item + 1].orden = ind_pre
            //Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            _make_plantilla()
        }
    }

    if (plantilla_cat["sufijos"][id].orden != n_end) {
        const item_atras = newEk("div", "bi bi-arrow-left-square item-menu-s ps-2 pe-2", "  Mover atrás")
        ul_menu.appendChild(item_atras)
        item_atras.onclick = () => {

        }
    }


    const col_value = newEk("div", "col")
    row_th.appendChild(col_value)

    const in_prefijo = newEk("input", "input-flat-dicc")
    col_value.appendChild(in_prefijo)

    in_prefijo.value = plantilla_cat["sufijos"][id_item].nombre
    in_prefijo.onchange = () => {
        plantilla_cat["sufijos"][id_item].nombre = in_prefijo.value
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
    }
}

