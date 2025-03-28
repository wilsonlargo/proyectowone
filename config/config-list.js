//Gestiona el cuadro de dialogo de las variantes dialectales de un idioma principal del proyecto
function config_variantes() {
    byE("config_titulo").textContent = "Configurar idioma de variantes"
    const modal_panel_gonfig = byE("modal_panel_gonfig")
    modal_panel_gonfig.innerHTML = ""
    const div_detalle = newE("div", "div_detalle", "text-justificado")
    div_detalle.textContent = `En esta opción usted puede agregar variaciones dialectales del idioma principal, 
tenga en cuenta que serán visibles en las diferentes categorías como una entrada secundaria.`
    modal_panel_gonfig.appendChild(div_detalle)

    const btn_agregar = newE("button", "btn_agregar", "btn btn-secondary btn-sm mt-2")
    btn_agregar.textContent = "Agregar variante +"
    modal_panel_gonfig.appendChild(btn_agregar)

    btn_agregar.onclick = () => {
        const lx_variante = {
            "key": "var-" + randomKey(20, '12345abcde'),
            "nombre": "Nueva variante",
            "abreviacion": "abb",
            "orden": "abcdefghijklmnopqrstuvwxyz",
            "info": "información de la variante",
            "style": {
                "font-color": "green",
                "font-size": "12pt",
                "font-bold": false,
                "font-italic": false,
            },
            "visible": true,
        }
        global_proyecto["PROYECTO"].Variantes.push(lx_variante)
        Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
        _make_variantes()

    }

    const div_variantes = newE("div", "div_variantes", "m-2")
    modal_panel_gonfig.appendChild(div_variantes)


    if (typeof global_proyecto["PROYECTO"].Variantes == "undefined") {
        global_proyecto["PROYECTO"]["Variantes"] = []
        Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
        _make_variantes()
    } else {
        _make_variantes()
    }

    function _make_variantes() {
        div_variantes.innerHTML = ""
        let lx_variantes = global_proyecto["PROYECTO"]["Variantes"]
        let id_ref = 0
        for (i in lx_variantes) {
            const item_variante = newE("div", "item_variante" + id_ref, "item-collapse ps-2 text-white")
            item_variante.textContent = lx_variantes[id_ref].nombre
            item_variante.setAttribute("data-bs-toggle", "collapse")
            item_variante.setAttribute("data-bs-target", "#collapse_variante" + id_ref)
            div_variantes.appendChild(item_variante)

            const collapse_variante = newE("div", "collapse_variante" + id_ref, "collapse p-2")
            div_variantes.appendChild(collapse_variante)

            //////////////////////////////////////

            const row_nombre = newE("div", "row_nombre" + id_ref, "row")
            collapse_variante.appendChild(row_nombre)

            const col_nombre_label = newE("div", "col_nombre_label" + id_ref, "col-3")
            col_nombre_label.textContent = "Nombre:"
            row_nombre.appendChild(col_nombre_label)

            const col_nombre_value = newE("div", "col_nombre_value" + id_ref, "col")
            row_nombre.appendChild(col_nombre_value)

            const int_nombre_value = newE("input", "int_nombre_value" + id_ref, "input-flat-dicc")
            col_nombre_value.appendChild(int_nombre_value)

            int_nombre_value.value = lx_variantes[id_ref].nombre

            let n = id_ref
            int_nombre_value.onchange = () => {
                lx_variantes[n].nombre = int_nombre_value.value
                item_variante.textContent = int_nombre_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }
            //////////////////////////////////////

            const row_abb = newE("div", "row_abb" + id_ref, "row")
            collapse_variante.appendChild(row_abb)

            const col_abb_label = newE("div", "col_abb_label" + id_ref, "col-3")
            col_abb_label.textContent = "Abreviación:"
            row_abb.appendChild(col_abb_label)

            const col_abb_value = newE("div", "col_abb_value" + id_ref, "col")
            row_abb.appendChild(col_abb_value)

            const int_abb_value = newE("input", "int_abb_value" + id_ref, "input-flat-dicc")
            col_abb_value.appendChild(int_abb_value)

            int_abb_value.value = lx_variantes[id_ref].abreviacion
            int_abb_value.onchange = () => {
                lx_variantes[n].abreviacion = int_abb_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }
            //////////////////////////////////////

            const row_orden = newE("div", "row_orden" + id_ref, "row")
            collapse_variante.appendChild(row_orden)

            const col_orden_label = newE("div", "col_orden_label" + id_ref, "col-3")
            col_orden_label.textContent = "Orden:"
            row_orden.appendChild(col_orden_label)

            const col_orden_value = newE("div", "col_orden_value" + id_ref, "col")
            row_orden.appendChild(col_orden_value)

            const int_orden_value = newE("textarea", "int_orden_value" + id_ref, "input-flat-dicc")
            col_orden_value.appendChild(int_orden_value)

            int_orden_value.value = lx_variantes[id_ref].orden
            int_orden_value.onchange = () => {
                lx_variantes[n].orden = int_orden_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_info = newE("div", "row_info" + id_ref, "row")
            collapse_variante.appendChild(row_info)

            const col_info_label = newE("div", "col_info_label" + id_ref, "col-3")
            col_info_label.textContent = "Información:"
            row_info.appendChild(col_info_label)

            const col_info_value = newE("div", "col_info_value" + id_ref, "col")
            row_info.appendChild(col_info_value)

            const int_info_value = newE("textarea", "int_info_value" + id_ref, "input-flat-dicc")
            col_info_value.appendChild(int_info_value)

            int_info_value.value = lx_variantes[id_ref].info
            int_info_value.onchange = () => {
                lx_variantes[n].info = int_info_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_style = newE("div", "row_style" + id_ref, "row")
            collapse_variante.appendChild(row_style)

            const col_style_label = newE("div", "col_style_label" + id_ref, "col-3")
            col_style_label.textContent = "Estilos"
            row_style.appendChild(col_style_label)

            const col_style_value = newE("div", "col_style_value" + id_ref, "col")
            row_style.appendChild(col_style_value)

            const bts_styles = newE("div", "bts_styles" + id_ref, "btn-group")
            bts_styles.role = "group"
            col_style_value.appendChild(bts_styles)

            const int_color = newE("input", "int_color" + id_ref, "form-control btn-secondary")
            int_color.style.width = "50px"
            int_color.style.height = "40px"
            int_color.type = "color"
            bts_styles.appendChild(int_color)

            int_color.value = lx_variantes[n].style["font-color"]
            int_color.onchange = () => {
                lx_variantes[n].style["font-color"] = int_color.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }


            const int_font_size = newE("select", "int_font_size" + id_ref, "btn btn-secondary text-white text-start")
            int_font_size.style.width = "80px"
            int_font_size.style.height = "40px"
            bts_styles.appendChild(int_font_size)

            const f_sizes = ["8pt", "9pt", "10pt", "11pt", "12pt", "13pt", "14pt", "16pt", "18pt", "20pt",]


            f_sizes.forEach(item => {
                const option = newE("option", "option" + item + id_ref, "")
                option.value = item
                option.textContent = item
                int_font_size.appendChild(option)
            })
            int_font_size.value = lx_variantes[n].style["font-size"]
            int_font_size.onchange = () => {
                lx_variantes[n].style["font-size"] = int_font_size.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_visible = newE("div", "row_style" + id_ref, "row mt-2")
            collapse_variante.appendChild(row_visible)

            const col_visible_label = newE("div", "col_visible_label" + id_ref, "col-3")
            col_visible_label.textContent = "Visible"
            row_visible.appendChild(col_visible_label)

            const col_visible_value = newE("div", "col_visible_value" + id_ref, "col-3")
            row_visible.appendChild(col_visible_value)

            const int_visible_value = newE("input", "int_visible_value" + id_ref, "form-check-input")
            int_visible_value.type = "checkbox"

            col_visible_value.appendChild(int_visible_value)

            int_visible_value.checked = lx_variantes[n].visible
            int_visible_value.onchange = () => {
                lx_variantes[n].visible = int_visible_value.checked
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////////////////// 

            const btn_eliminar = newE("button", "btn_eliminar" + id_ref, "btn btn-secondary btn-sm mt-5")
            btn_eliminar.textContent = "Eliminar variante"
            collapse_variante.appendChild(btn_eliminar)

            btn_eliminar.onclick = () => {
                global_proyecto["PROYECTO"]["Variantes"] = _delete_registro(lx_variantes, "key", lx_variantes[n].key)
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
                _make_variantes()
            }

            byE("btnAceptar_open").onclick = () => {
                make_lexicon()
            }

            id_ref++
        }
    }
}

function config_morfemas() {
    byE("config_titulo").textContent = "Configurar lista de morfemas"
    const modal_panel_gonfig = byE("modal_panel_gonfig")
    modal_panel_gonfig.innerHTML = ""
    const div_detalle = newE("div", "div_detalle", "text-justificado")
    div_detalle.textContent = `En esta opción usted puede agregar diferentes tipos de clasificación de morfemas.`
    modal_panel_gonfig.appendChild(div_detalle)

    const btn_agregar = newE("button", "btn_agregar", "btn btn-secondary btn-sm mt-2")
    btn_agregar.textContent = "Agregar tipo de morfema +"
    modal_panel_gonfig.appendChild(btn_agregar)

    btn_agregar.onclick = () => {
        const lx_morfema = {
            "key": "morf-" + randomKey(20, '12345abcde'),
            "nombre": "Nueva tipo",
            "abreviacion": "abb",
            "info": "información de la variante",
            "estructura": {
                "ini": "",
                "fin": "",
            },
            "visible": true,
        }
        global_proyecto["TABLAS"].MORFEMAS.push(lx_morfema)
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_morfemas()
    }
    const div_clase = newE("div", "div_clase", "m-2")
    modal_panel_gonfig.appendChild(div_clase)
    if (verificar_datos(global_proyecto["TABLAS"].MORFEMAS) == false) {
        global_proyecto["TABLAS"]["MORFEMAS"] = template_mofemas()
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_morfemas()
    } else {
        _make_morfemas()

    }
    function _make_morfemas() {
        div_clase.innerHTML = ""
        let lx_morfemas = global_proyecto["TABLAS"]["MORFEMAS"]
        let id_ref = 0
        for (i in lx_morfemas) {
            const item_clase = newE("div", "item_clase" + id_ref, "item-collapse ps-2 text-white")
            item_clase.textContent = lx_morfemas[id_ref].nombre
            item_clase.setAttribute("data-bs-toggle", "collapse")
            item_clase.setAttribute("data-bs-target", "#collapse_clase" + id_ref)
            div_clase.appendChild(item_clase)

            const collapse_clase = newE("div", "collapse_clase" + id_ref, "collapse p-2")
            div_clase.appendChild(collapse_clase)

            //////////////////////////////////////

            const row_nombre = newE("div", "row_nombre" + id_ref, "row")
            collapse_clase.appendChild(row_nombre)

            const col_nombre_label = newE("div", "col_nombre_label" + id_ref, "col-3")
            col_nombre_label.textContent = "Nombre:"
            row_nombre.appendChild(col_nombre_label)

            const col_nombre_value = newE("div", "col_nombre_value" + id_ref, "col")
            row_nombre.appendChild(col_nombre_value)

            const int_nombre_value = newE("input", "int_nombre_value" + id_ref, "input-flat-dicc")
            col_nombre_value.appendChild(int_nombre_value)

            int_nombre_value.value = lx_morfemas[id_ref].nombre

            let n = id_ref
            int_nombre_value.onchange = () => {
                lx_morfemas[n].nombre = int_nombre_value.value
                item_clase.textContent = int_nombre_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }
            //////////////////////////////////////

            const row_abb = newE("div", "row_abb" + id_ref, "row")
            collapse_clase.appendChild(row_abb)

            const col_abb_label = newE("div", "col_abb_label" + id_ref, "col-3")
            col_abb_label.textContent = "Abreviación:"
            row_abb.appendChild(col_abb_label)

            const col_abb_value = newE("div", "col_abb_value" + id_ref, "col")
            row_abb.appendChild(col_abb_value)

            const int_abb_value = newE("input", "int_abb_value" + id_ref, "input-flat-dicc")
            col_abb_value.appendChild(int_abb_value)

            int_abb_value.value = lx_morfemas[id_ref].abreviacion
            int_abb_value.onchange = () => {
                lx_morfemas[n].abreviacion = int_abb_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }

            //////////////////////////////////////
            const row_info = newE("div", "row_info" + id_ref, "row")
            collapse_clase.appendChild(row_info)

            const col_info_label = newE("div", "col_info_label" + id_ref, "col-3")
            col_info_label.textContent = "Detalle:"
            row_info.appendChild(col_info_label)

            const col_info_value = newE("div", "col_info_value" + id_ref, "col")
            row_info.appendChild(col_info_value)

            const int_info_value = newE("textarea", "int_info_value" + id_ref, "input-flat-dicc")
            col_info_value.appendChild(int_info_value)

            int_info_value.value = lx_morfemas[id_ref].info
            int_info_value.onchange = () => {
                lx_morfemas[n].info = int_info_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }

            //////////////////////////////////////
            const row_estrutura = newE("div", "row_strutura" + id_ref, "row")
            collapse_clase.appendChild(row_estrutura)

            const col_estruturaIni_label = newE("div", "col_estruturaIni_label" + id_ref, "col-3")
            col_estruturaIni_label.textContent = "Inicio"
            row_estrutura.appendChild(col_estruturaIni_label)

            const col_estruturaIni_value = newE("div", "col_estruturaIni_value" + id_ref, "col")
            row_estrutura.appendChild(col_estruturaIni_value)


            const int_estruturaIni_value = newE("input", "int_estruturaIni_value" + id_ref, "input-flat-dicc")
            col_estruturaIni_value.appendChild(int_estruturaIni_value)

            int_estruturaIni_value.value = lx_morfemas[n].estructura["ini"]
            int_estruturaIni_value.onchange = () => {
                lx_morfemas[n].estructura["ini"] = int_estruturaIni_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }

            //////////////////////////////////////
            const row_estrutura_fin = newE("div", "row_estrutura_fin" + id_ref, "row")
            collapse_clase.appendChild(row_estrutura_fin)

            const col_estruturaFin_label = newE("div", "col_estruturaFin_label" + id_ref, "col-3")
            col_estruturaFin_label.textContent = "Fin"
            row_estrutura_fin.appendChild(col_estruturaFin_label)

            const col_estruturaFin_value = newE("div", "col_estruturaFin_value" + id_ref, "col")
            row_estrutura_fin.appendChild(col_estruturaFin_value)


            const int_estruturaFin_value = newE("input", "int_estruturaFin_value" + id_ref, "input-flat-dicc")
            col_estruturaFin_value.appendChild(int_estruturaFin_value)

            int_estruturaFin_value.value = lx_morfemas[n].estructura["fin"]
            int_estruturaFin_value.onchange = () => {
                lx_morfemas[n].estructura["fin"] = int_estruturaFin_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }
            ///////////////////////////////////////////////////////7

            const btn_eliminar = newE("button", "btn_eliminar" + id_ref, "btn btn-secondary btn-sm mt-5")
            btn_eliminar.textContent = "Eliminar tipo"
            collapse_clase.appendChild(btn_eliminar)

            btn_eliminar.onclick = () => {
                global_proyecto["TABLAS"]["MORFEMAS"] = _delete_registro(lx_morfemas, "key", lx_morfemas[n].key)
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                _make_morfemas()
            }

            byE("btnAceptar_open").onclick = () => {
                make_lexicon()
            }

            id_ref++
        }
    }

}

function config_contexto() {
    byE("config_titulo").textContent = "Configurar contexto"
    const modal_panel_gonfig = byE("modal_panel_gonfig")
    modal_panel_gonfig.innerHTML = ""
    const div_detalle = newE("div", "div_detalle", "text-justificado")
    div_detalle.textContent = `En esta sección puede agregar contextos o condiciones de aparición de morfemas. 
    Debe estructurar el entorno según la regla que usted indíque`
    modal_panel_gonfig.appendChild(div_detalle)

    const btn_agregar = newE("button", "btn_agregar", "btn btn-secondary btn-sm mt-2")
    btn_agregar.textContent = "Agregar contexto +"
    modal_panel_gonfig.appendChild(btn_agregar)

    btn_agregar.onclick = () => {
        const lx_contexto = {
            "key": "cont-" + randomKey(10, '12345abcde'),
            "nombre": "Nuevo contexto",
            "contexto": "/",
            "info": "Describir contexto",
        }
        global_proyecto["TABLAS"].CONTEXTOS.push(lx_contexto)
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_contexto()
    }
    const div_clase = newE("div", "div_clase", "m-2")
    modal_panel_gonfig.appendChild(div_clase)
    if (verificar_datos(global_proyecto["TABLAS"].CONTEXTOS) == false) {
        global_proyecto["TABLAS"]["CONTEXTOS"] = []
        global_proyecto["TABLAS"]["CONTEXTOS"] = template_contexto()
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_contexto()
    } else {

        _make_contexto()

    }
    function _make_contexto() {
        div_clase.innerHTML = ""
        let lx_contextos = global_proyecto["TABLAS"]["CONTEXTOS"]
        let id_ref = 0
        for (i in lx_contextos) {
            const item_clase = newE("div", "item_clase" + id_ref, "item-collapse ps-2 text-white")
            item_clase.textContent = lx_contextos[id_ref].nombre
            item_clase.setAttribute("data-bs-toggle", "collapse")
            item_clase.setAttribute("data-bs-target", "#collapse_clase" + id_ref)
            div_clase.appendChild(item_clase)

            const collapse_clase = newE("div", "collapse_clase" + id_ref, "collapse p-2")
            div_clase.appendChild(collapse_clase)

            //////////////////////////////////////

            const row_nombre = newE("div", "row_nombre" + id_ref, "row")
            collapse_clase.appendChild(row_nombre)

            const col_nombre_label = newE("div", "col_nombre_label" + id_ref, "col-3")
            col_nombre_label.textContent = "Nombre:"
            row_nombre.appendChild(col_nombre_label)

            const col_nombre_value = newE("div", "col_nombre_value" + id_ref, "col")
            row_nombre.appendChild(col_nombre_value)

            const int_nombre_value = newE("input", "int_nombre_value" + id_ref, "input-flat-dicc")
            col_nombre_value.appendChild(int_nombre_value)

            int_nombre_value.value = lx_contextos[id_ref].nombre

            let n = id_ref
            int_nombre_value.onchange = () => {
                lx_contextos[n].nombre = int_nombre_value.value
                item_clase.textContent = int_nombre_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }
            //////////////////////////////////////

            const row_abb = newE("div", "row_abb" + id_ref, "row")
            collapse_clase.appendChild(row_abb)

            const col_abb_label = newE("div", "col_abb_label" + id_ref, "col-3")
            col_abb_label.textContent = "Contexto:"
            row_abb.appendChild(col_abb_label)

            const col_abb_value = newE("div", "col_abb_value" + id_ref, "col")
            row_abb.appendChild(col_abb_value)

            const int_abb_value = newE("input", "int_abb_value" + id_ref, "input-flat-dicc")
            col_abb_value.appendChild(int_abb_value)

            int_abb_value.value = lx_contextos[id_ref].contexto
            int_abb_value.onchange = () => {
                lx_contextos[n].contexto = int_abb_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }

            //////////////////////////////////////
            const row_info = newE("div", "row_info" + id_ref, "row")
            collapse_clase.appendChild(row_info)

            const col_info_label = newE("div", "col_info_label" + id_ref, "col-3")
            col_info_label.textContent = "Detalle:"
            row_info.appendChild(col_info_label)

            const col_info_value = newE("div", "col_info_value" + id_ref, "col")
            row_info.appendChild(col_info_value)

            const int_info_value = newE("textarea", "int_info_value" + id_ref, "input-flat-dicc")
            col_info_value.appendChild(int_info_value)

            int_info_value.value = lx_contextos[id_ref].info
            int_info_value.onchange = () => {
                lx_contextos[n].info = int_info_value.value
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            }

            const btn_eliminar = newE("button", "btn_eliminar" + id_ref, "btn btn-secondary btn-sm mt-5")
            btn_eliminar.textContent = "Eliminar contexto"
            collapse_clase.appendChild(btn_eliminar)

            btn_eliminar.onclick = () => {
                global_proyecto["TABLAS"]["CONTEXTOS"] = _delete_registro(lx_contextos, "key", lx_contextos[n].key)
                Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                _make_contexto()
            }

            byE("btnAceptar_open").onclick = () => {
                make_lexicon()
            }

            id_ref++
        }
    }



}

function config_idioma_analisis() {
    byE("config_titulo").textContent = "Configurar idioma de análisis"
    const modal_panel_gonfig = byE("modal_panel_gonfig")
    modal_panel_gonfig.innerHTML = ""
    const div_detalle = newE("div", "div_detalle", "text-justificado")
    div_detalle.textContent = `En esta opción se configurán los idiomas de análisis para traducción de la información.`
    modal_panel_gonfig.appendChild(div_detalle)

    const btn_agregar = newE("button", "btn_agregar", "btn btn-secondary btn-sm mt-2")
    btn_agregar.textContent = "Agregar  +"
    modal_panel_gonfig.appendChild(btn_agregar)

    btn_agregar.onclick = () => {
        const lx_traduccion = {
            "key": "var-" + randomKey(20, '12345abcde'),
            "nombre": "Idioma",
            "abreviacion": "aa",
            "orden": "abcdefghijklmnopqrstuvwxyz",
            "info": "información del idioma de análisis",
            "style": {
                "font-color": "green",
                "font-size": "12pt",
                "font-bold": false,
                "font-italic": false,
            },
            "visible": true,
        }
        global_proyecto["PROYECTO"].Lngtraducion.push(lx_traduccion)
        Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
        _make_idiomas()

    }

    const div_clase = newE("div", "div_variantes", "m-2")
    modal_panel_gonfig.appendChild(div_clase)

    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == false) {
        global_proyecto["PROYECTO"]["Lngtraducion"] = []
        Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
        _make_idiomas()
    } else {
        _make_idiomas()
    }
    function _make_idiomas() {
        div_clase.innerHTML = ""
        let lx_clases = global_proyecto["PROYECTO"]["Lngtraducion"]
        let id_ref = 0
        for (i in lx_clases) {
            const item_clase = newE("div", "item_variante" + id_ref, "item-collapse ps-2 text-white")
            item_clase.textContent = lx_clases[id_ref].nombre
            item_clase.setAttribute("data-bs-toggle", "collapse")
            item_clase.setAttribute("data-bs-target", "#collapse_clase" + id_ref)
            div_clase.appendChild(item_clase)

            const collapse_clase = newE("div", "collapse_clase" + id_ref, "collapse p-2")
            div_clase.appendChild(collapse_clase)

            //////////////////////////////////////

            const row_nombre = newE("div", "row_nombre" + id_ref, "row")
            collapse_clase.appendChild(row_nombre)

            const col_nombre_label = newE("div", "col_nombre_label" + id_ref, "col-3")
            col_nombre_label.textContent = "Nombre:"
            row_nombre.appendChild(col_nombre_label)

            const col_nombre_value = newE("div", "col_nombre_value" + id_ref, "col")
            row_nombre.appendChild(col_nombre_value)

            const int_nombre_value = newE("input", "int_nombre_value" + id_ref, "input-flat-dicc")
            col_nombre_value.appendChild(int_nombre_value)

            int_nombre_value.value = lx_clases[id_ref].nombre

            let n = id_ref
            int_nombre_value.onchange = () => {
                lx_clases[n].nombre = int_nombre_value.value
                item_clase.textContent = int_nombre_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }
            //////////////////////////////////////

            const row_abb = newE("div", "row_abb" + id_ref, "row")
            collapse_clase.appendChild(row_abb)

            const col_abb_label = newE("div", "col_abb_label" + id_ref, "col-3")
            col_abb_label.textContent = "Abreviación:"
            row_abb.appendChild(col_abb_label)

            const col_abb_value = newE("div", "col_abb_value" + id_ref, "col")
            row_abb.appendChild(col_abb_value)

            const int_abb_value = newE("input", "int_abb_value" + id_ref, "input-flat-dicc")
            col_abb_value.appendChild(int_abb_value)

            int_abb_value.value = lx_clases[id_ref].abreviacion
            int_abb_value.onchange = () => {
                lx_clases[n].abreviacion = int_abb_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }
            //////////////////////////////////////

            const row_orden = newE("div", "row_orden" + id_ref, "row")
            collapse_clase.appendChild(row_orden)

            const col_orden_label = newE("div", "col_orden_label" + id_ref, "col-3")
            col_orden_label.textContent = "Orden:"
            row_orden.appendChild(col_orden_label)

            const col_orden_value = newE("div", "col_orden_value" + id_ref, "col")
            row_orden.appendChild(col_orden_value)

            const int_orden_value = newE("textarea", "int_orden_value" + id_ref, "input-flat-dicc")
            int_orden_value.rows = 1
            col_orden_value.appendChild(int_orden_value)

            int_orden_value.value = lx_clases[id_ref].orden
            int_orden_value.onchange = () => {
                lx_clases[n].orden = int_orden_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_info = newE("div", "row_info" + id_ref, "row")
            collapse_clase.appendChild(row_info)

            const col_info_label = newE("div", "col_info_label" + id_ref, "col-3")
            col_info_label.textContent = "Información:"
            row_info.appendChild(col_info_label)

            const col_info_value = newE("div", "col_info_value" + id_ref, "col")
            row_info.appendChild(col_info_value)

            const int_info_value = newE("textarea", "int_info_value" + id_ref, "input-flat-dicc")
            int_info_value.rows = 1
            col_info_value.appendChild(int_info_value)

            int_info_value.value = lx_clases[id_ref].info
            int_info_value.onchange = () => {
                lx_clases[n].info = int_info_value.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_style = newE("div", "row_style" + id_ref, "row")
            collapse_clase.appendChild(row_style)

            const col_style_label = newE("div", "col_style_label" + id_ref, "col-3")
            col_style_label.textContent = "Estilos"
            row_style.appendChild(col_style_label)

            const col_style_value = newE("div", "col_style_value" + id_ref, "col")
            row_style.appendChild(col_style_value)

            const bts_styles = newE("div", "bts_styles" + id_ref, "btn-group")
            bts_styles.role = "group"
            col_style_value.appendChild(bts_styles)

            const int_color = newE("input", "int_color" + id_ref, "form-control btn-secondary")
            int_color.style.width = "50px"
            int_color.style.height = "40px"
            int_color.type = "color"
            bts_styles.appendChild(int_color)

            int_color.value = lx_clases[n].style["font-color"]
            int_color.onchange = () => {
                lx_clases[n].style["font-color"] = int_color.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }


            const int_font_size = newE("select", "int_font_size" + id_ref, "btn btn-secondary text-white text-start")
            int_font_size.style.width = "80px"
            int_font_size.style.height = "40px"
            bts_styles.appendChild(int_font_size)

            const f_sizes = ["8pt", "9pt", "10pt", "11pt", "12pt", "13pt", "14pt", "16pt", "18pt", "20pt",]

            f_sizes.forEach(item => {
                const option = newE("option", "option" + item + id_ref, "")
                option.value = item
                option.textContent = item
                int_font_size.appendChild(option)
            })
            int_font_size.value = lx_clases[n].style["font-size"]
            int_font_size.onchange = () => {
                lx_clases[n].style["font-size"] = int_font_size.value
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////
            const row_visible = newE("div", "row_style" + id_ref, "row mt-2")
            collapse_clase.appendChild(row_visible)

            const col_visible_label = newE("div", "col_visible_label" + id_ref, "col-3")
            col_visible_label.textContent = "Visible"
            row_visible.appendChild(col_visible_label)

            const col_visible_value = newE("div", "col_visible_value" + id_ref, "col-3")
            row_visible.appendChild(col_visible_value)

            const int_visible_value = newE("input", "int_visible_value" + id_ref, "form-check-input")
            int_visible_value.type = "checkbox"

            col_visible_value.appendChild(int_visible_value)

            int_visible_value.checked = lx_clases[n].visible
            int_visible_value.onchange = () => {
                lx_clases[n].visible = int_visible_value.checked
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
            }

            //////////////////////////////////////////////////// 

            const btn_eliminar = newE("button", "btn_eliminar" + id_ref, "btn btn-secondary btn-sm mt-5")
            btn_eliminar.textContent = "Eliminar variante"
            collapse_clase.appendChild(btn_eliminar)

            btn_eliminar.onclick = () => {
                global_proyecto["PROYECTO"]["Variantes"] = _delete_registro(lx_clases, "key", lx_clases[n].key)
                Guardar_datos("PROYECTO", global_proyecto["PROYECTO"])
                _make_variantes()
            }

            byE("btnAceptar_open").onclick = () => {
                make_lexicon()
            }

            id_ref++
        }
    }
}

function config_gramatical_list() {
    byE("config_titulo").textContent = "Categorías gramaticales"
    const modal_panel_gonfig = byE("modal_panel_gonfig")
    modal_panel_gonfig.innerHTML = ""

    const div_actions = newE("div", randomKey(20, '12345abcde'), "div-fluid")
    modal_panel_gonfig.appendChild(div_actions)

    const div_add_categoria = newE("div", randomKey(20, '12345abcde'), "item-texto-small")
    div_add_categoria.textContent = "Agregar categoria +"
    div_actions.appendChild(div_add_categoria)


    make_spliter_panel()
    function make_spliter_panel() {
        const panel_splitter = newE("div", randomKey(20, '12345abcde'), "splitter mt-2")
        modal_panel_gonfig.appendChild(panel_splitter)

        const panel_list = newE("div", "panel_list_ps", "")
        panel_list.style.height = modal_panel_gonfig.style.height
        panel_splitter.appendChild(panel_list)

        const panel_separador = newE("div", "panel_separador_ps", "bg-secondary")
        panel_splitter.appendChild(panel_separador)

        const panel_lexicon_edit = newE("div", "panel_lexicon_edit_ps", "p-2")
        panel_lexicon_edit.style.height = modal_panel_gonfig.style.height
        panel_splitter.appendChild(panel_lexicon_edit)

        dragElement(document.getElementById("panel_separador_ps"), "H", "panel_list_ps", "panel_lexicon_edit_ps");

        if (verificar_datos(global_proyecto["TABLAS"].CATGRAMATICAL) == false) {
            global_proyecto["TABLAS"]["CATGRAMATICAL"] = []
            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
            _make_categoria()
        } else {
            _make_categoria()
        }
    }

    div_add_categoria.onclick = () => {
        global_proyecto["TABLAS"]["CATGRAMATICAL"].push(template_ps())
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_categoria()
    }


    function _make_categoria() {
        let tabla_categorias = global_proyecto["TABLAS"]["CATGRAMATICAL"]
        const ul = byE("panel_list_ps")
        const panel_list_edit = byE("panel_lexicon_edit_ps")

        ul.innerHTML = ""

        tabla_categorias.forEach(Nivel_1 => {
            const collapse_Nivel_1 = newEk("div", "div-fluid align-items-center")
            ul.appendChild(collapse_Nivel_1)

            const plus_Nivel1 = newEk("div", "bi bi-dash-square plus-tree-ps")
            plus_Nivel1.setAttribute("data-bs-toggle", "collapse")
            plus_Nivel1.setAttribute("data-bs-target", "#collapse_ps" + Nivel_1.key)
            collapse_Nivel_1.appendChild(plus_Nivel1)


            plus_Nivel1.onclick = () => {
                if (plus_Nivel1.className.includes("bi-dash-square") == true) {
                    plus_Nivel1.className = "bi bi-plus-square-fill plus-tree-ps"
                } else if (plus_Nivel1.className.includes("bi-plus-square-fill")) {
                    plus_Nivel1.className = "bi bi-dash-square plus-tree-ps"
                }
            }

            const item_Nivel1 = newEk("div", "item-tree-ps", Nivel_1.nombre[0].texto)
            collapse_Nivel_1.appendChild(item_Nivel1)


            let i = Nivel_1.key
            let campo = Nivel_1
            item_Nivel1.onclick = () => {
                _make_panel_cat(tabla_categorias, campo, i, true)
            }

            const collapse_Nivel_2 = newEk("div", "align-items-center collapse show", "", "collapse_ps" + Nivel_1.key)
            ul.appendChild(collapse_Nivel_2)


            Nivel_1.subcategorias.forEach(Nivel_2 => {
                const div_Nivel2 = newEk("div", "div-fluid")
                collapse_Nivel_2.appendChild(div_Nivel2)

                const div_botones_plus = newEk("div", "div-fluid")
                div_Nivel2.appendChild(div_botones_plus)

                const line_Nivel2 = newEk("div", "line-tree-ps")
                div_botones_plus.appendChild(line_Nivel2)

                const plus_Nivel2 = newEk("div", "bi bi-dash-square plus-tree-ps")
                plus_Nivel2.setAttribute("data-bs-toggle", "collapse")
                plus_Nivel2.setAttribute("data-bs-target", "#collapse_ps" + Nivel_2.key)
                div_botones_plus.appendChild(plus_Nivel2)

                plus_Nivel2.onclick = () => {
                    if (plus_Nivel2.className.includes("bi-dash-square") == true) {
                        plus_Nivel2.className = "bi bi-plus-square-fill plus-tree-ps"
                    } else if (plus_Nivel2.className.includes("bi-plus-square-fill")) {
                        plus_Nivel2.className = "bi bi-dash-square plus-tree-ps"
                    }
                }

                const item_Nivel2 = newEk("div", "item-tree-ps", Nivel_2.nombre[0].texto)
                div_Nivel2.appendChild(item_Nivel2)

                let ii = Nivel_2.key
                let campo = Nivel_2
                item_Nivel2.onclick = () => {
                    _make_panel_cat(Nivel_2, campo, ii, true)
                }


                const collapse_Nivel_3 = newEk("div", "align-items-center collapse show", "", "collapse_ps" + Nivel_2.key)
                collapse_Nivel_2.appendChild(collapse_Nivel_3)


                Nivel_2.subcategorias.forEach(Nivel_3 => {
                    const div_Nivel3 = newEk("div", "div-fluid")
                    collapse_Nivel_3.appendChild(div_Nivel3)

                    const div_botones_plus = newEk("div", "div-fluid")
                    div_Nivel3.appendChild(div_botones_plus)

                    const line_Nivel0 = newEk("div", "line-tree-single")
                    div_botones_plus.appendChild(line_Nivel0)

                    const line_Nivel3 = newEk("div", "line-tree-ps")
                    div_botones_plus.appendChild(line_Nivel3)

                    const plus_Nivel3 = newEk("div", "bi bi-dash-square plus-tree-ps")
                    plus_Nivel3.setAttribute("data-bs-toggle", "collapse")
                    plus_Nivel3.setAttribute("data-bs-target", "#collapse_ps" + Nivel_3.key)
                    div_botones_plus.appendChild(plus_Nivel3)


                    plus_Nivel3.onclick = () => {
                        if (plus_Nivel3.className.includes("bi-dash-square") == true) {
                            plus_Nivel3.className = "bi bi-plus-square-fill plus-tree-ps"
                        } else if (plus_Nivel3.className.includes("bi-plus-square-fill")) {
                            plus_Nivel3.className = "bi bi-dash-square plus-tree-ps"
                        }
                    }

                    const item_Nivel3 = newEk("div", "item-tree-ps", Nivel_3.nombre[0].texto)
                    div_Nivel3.appendChild(item_Nivel3)

                    let iii = Nivel_3.key
                    let campo = Nivel_3
                    item_Nivel3.onclick = () => {
                        _make_panel_cat(Nivel_3, campo, iii, false)
                    }
                    //const div_collapse_ABC = newE("div", "collapse_ps" + sub_C.key, "collapse show ms-3")
                    //item_collapse_categoria.appendChild(div_collapse_ABC)
                })
            })

        })
        if (tabla_categorias.length != 0) {
            _make_panel_cat(tabla_categorias[0], tabla_categorias[0], tabla_categorias[0].key, true)
        }

        function _make_panel_cat(parent, cat, id, add) {
            panel_list_edit.innerHTML = ""
            //Si aún no es el último nivel, permitir agregar
            const div_actions = newE("div", randomKey(20, '12345abcde'), "div-fluid-rg mb-3 bg-secondary p-3")
            panel_list_edit.appendChild(div_actions)
            if (add == true) {
                const div_add_categoria = newE("div", randomKey(20, '12345abcde'), "item-texto-small text-white")
                div_add_categoria.textContent = "Agregar subcategoria +"
                div_actions.appendChild(div_add_categoria)
                div_add_categoria.onclick = () => {
                    cat.subcategorias.push(template_ps())
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    config_gramatical_list()
                }
            }
            //Crea el menú para eliminar categorías
            const div_del_categoria = newE("div", randomKey(20, '12345abcde'), "item-texto-small ms-2 text-white")
            div_del_categoria.textContent = "Eliminar categoria +"
            div_actions.appendChild(div_del_categoria)

            div_del_categoria.onclick = () => {
                //Esta verfificación se hace si estamos en el nivel superior
                //o inferior, para aplicar el filtro
                if (verificar_datos(parent.subcategorias) == true) {
                    const filter_del = parent.subcategorias.filter(ele => ele.key != cat.key)
                    parent.subcategorias = filter_del
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    config_gramatical_list()
                } else {
                    const filter_del = parent.filter(ele => ele.key != cat.key)

                    global_proyecto["TABLAS"].CATGRAMATICAL = filter_del
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    config_gramatical_list()

                }

            }

            _make_nombre()
            function _make_nombre() {
                /////////////////////////////////////////////////////////////////
                const row_nombre = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                panel_list_edit.appendChild(row_nombre)

                const col_nombre = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
                col_nombre.textContent = "Nombre"
                row_nombre.appendChild(col_nombre)

                const col_nombre_valores = newE("div", randomKey(20, '12345abcde'), "col")
                row_nombre.appendChild(col_nombre_valores)

                for (i in cat.nombre) {
                    const lng = cat.nombre[i]
                    const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == lng.abreviacion)
                    if (filter_lng[0].visible == true) {
                        const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                        col_nombre_valores.appendChild(row_lng)

                        const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
                        col_nombre_lng.textContent = lng.abreviacion
                        row_lng.appendChild(col_nombre_lng)

                        const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
                        row_lng.appendChild(col_nombre_value)

                        const int_lng_value = newE("input", "int-" + randomKey(20, '12345abcde'), "input-flat-dicc")
                        col_nombre_value.appendChild(int_lng_value)

                        const valueFromLng = cat.nombre.filter(ele => ele.key == lng.key)

                        int_lng_value.value = valueFromLng[0].texto

                        int_lng_value.onchange = () => {

                            valueFromLng[0].texto = int_lng_value.value
                            const item = byE("categoria" + id)
                            item.textContent = cat.nombre[0].texto


                            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                        }
                    }
                }
            }

            _make_abb()
            function _make_abb() {
                /////////////////////////////////////////////////////////////////
                const row_nombre = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                panel_list_edit.appendChild(row_nombre)

                const col_nombre = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
                col_nombre.textContent = "Abreviación"
                row_nombre.appendChild(col_nombre)

                const col_nombre_valores = newE("div", randomKey(20, '12345abcde'), "col")
                row_nombre.appendChild(col_nombre_valores)

                for (i in cat.abreviaciones) {
                    const lng = cat.abreviaciones[i]
                    const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == lng.abreviacion)
                    if (filter_lng[0].visible == true) {
                        const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                        col_nombre_valores.appendChild(row_lng)

                        const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
                        col_nombre_lng.textContent = lng.abreviacion
                        row_lng.appendChild(col_nombre_lng)

                        const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
                        row_lng.appendChild(col_nombre_value)

                        const int_lng_value = newE("input", "int-" + randomKey(20, '12345abcde'), "input-flat-dicc")
                        col_nombre_value.appendChild(int_lng_value)

                        const valueFromLng = cat.abreviaciones.filter(ele => ele.key == lng.key)

                        int_lng_value.value = valueFromLng[0].texto

                        int_lng_value.onchange = () => {

                            valueFromLng[0].texto = int_lng_value.value

                            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                        }
                    }
                }








            }
            _make_det()
            function _make_det() {
                /////////////////////////////////////////////////////////////////
                const row_nombre = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                panel_list_edit.appendChild(row_nombre)

                const col_nombre = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
                col_nombre.textContent = "Definicion"
                row_nombre.appendChild(col_nombre)

                const col_nombre_valores = newE("div", randomKey(20, '12345abcde'), "col")
                row_nombre.appendChild(col_nombre_valores)

                for (i in cat.definiciones) {
                    const lng = cat.definiciones[i]
                    const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == lng.abreviacion)
                    if (filter_lng[0].visible == true) {
                        const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                        col_nombre_valores.appendChild(row_lng)

                        const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
                        col_nombre_lng.textContent = lng.abreviacion
                        row_lng.appendChild(col_nombre_lng)

                        const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
                        row_lng.appendChild(col_nombre_value)

                        const int_lng_value = newE("textarea", "int-" + randomKey(20, '12345abcde'), "input-flat-dicc")
                        int_lng_value.rows = 1
                        col_nombre_value.appendChild(int_lng_value)

                        const valueFromLng = cat.definiciones.filter(ele => ele.key == lng.key)

                        int_lng_value.value = valueFromLng[0].texto

                        int_lng_value.onchange = () => {

                            valueFromLng[0].texto = int_lng_value.value

                            Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                        }
                    }
                }

            }
        }

    }
    byE("btnAceptar_open").onclick = () => {
        make_lexicon()
    }

}