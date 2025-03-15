let active_lexicon;
let active_lexicon_id = 0


function make_lexicon() {
    active_lexicon = global_proyecto.LEXICON

    byE("Nombre_proyecto").textContent = global_proyecto.PROYECTO.nombre + "- Lexicón"
    const panel_escritorio = byE("panel_escritorio")
    panel_escritorio.innerHTML = ""
    _make_toolbar()
    function _make_toolbar() {
        const row_toolbar = newE("div", "row_toolbar", "row bg-secondary")
        panel_escritorio.appendChild(row_toolbar)

        const col_new = newE("div", "col_new", "col-auto")
        row_toolbar.appendChild(col_new)

        const bts_adddel = newE("div", "bts_adddel", "btn-group")
        bts_adddel.role = "group"
        col_new.appendChild(bts_adddel)

        const bt_add = newE("div", "bt_add", "btn btn-secondary org-btn-tool bi bi-file-earmark-plus")
        bts_adddel.appendChild(bt_add)
        bt_add.onclick = () => {
            _add_registro()
        }

        const bt_del = newE("div", "bt_del", "btn btn-secondary org-btn-tool bi bi-trash3-fill")
        bts_adddel.appendChild(bt_del)

        const col_move = newE("div", "col_move", "col-auto")
        row_toolbar.appendChild(col_move)

        const bts_move = newE("div", "bts_move", "btn-group")
        bts_move.role = "group"
        col_move.appendChild(bts_move)

        const bt_ini = newE("div", "bt_ini", "btn btn-secondary org-btn-tool bi bi-skip-start")
        bts_move.appendChild(bt_ini)
        bt_ini.onclick = () => {
            _move_to_entry("ini")
        }

        const bt_prev = newE("div", "bt_prev", "btn btn-secondary org-btn-tool bi bi-skip-backward")
        bts_move.appendChild(bt_prev)
        bt_prev.onclick = () => {
            _move_to_entry("prev")
        }

        const bt_sig = newE("div", "bt_sig", "btn btn-secondary org-btn-tool bi bi-skip-forward")
        bts_move.appendChild(bt_sig)
        bt_sig.onclick = () => {
            _move_to_entry("sig")
        }

        const bt_fin = newE("div", "bt_fin", "btn btn-secondary org-btn-tool bi bi-skip-end")
        bts_move.appendChild(bt_fin)
        bt_fin.onclick = () => {
            _move_to_entry("fin")
        }

        const div_dropdown_config = newE("div", "div_dropdown", "dropdown mt-1")
        bts_move.appendChild(div_dropdown_config)

        const btn_menu_config = newE("button", "btn_menu_config", "btn btn-secondary dropdown-toggle")
        btn_menu_config.setAttribute("data-bs-toggle", "dropdown")
        btn_menu_config.type = "button"
        btn_menu_config.textContent = "Configuración"
        div_dropdown_config.appendChild(btn_menu_config)

        const ul_menu_config = newE("ul", "ul_menu_config", "dropdown-menu shadow")
        div_dropdown_config.appendChild(ul_menu_config)

        const item_variantes = newE("div", "item_variantes", "item-menu")
        item_variantes.textContent = "Variantes de idioma"
        item_variantes.setAttribute("data-bs-toggle", "modal")
        item_variantes.setAttribute("data-bs-target", "#open_modal")
        item_variantes.onclick = () => {
            config_variantes()
        }

        ul_menu_config.appendChild(item_variantes)

        /////////////////////////////////////////////
        const div_dropdown_listas = newE("div", "div_dropdown_listas", "dropdown mt-1")
        bts_move.appendChild(div_dropdown_listas)

        const btn_menu_listas = newE("button", "btn_menu_config", "btn btn-secondary dropdown-toggle")
        btn_menu_listas.setAttribute("data-bs-toggle", "dropdown")
        btn_menu_listas.type = "button"
        btn_menu_listas.textContent = "Listas"
        div_dropdown_listas.appendChild(btn_menu_listas)

        const ul_menu_listas = newE("ul", "ul_menu_listas", "dropdown-menu shadow")
        div_dropdown_listas.appendChild(ul_menu_listas)

        const item_morfema = newE("div", "item_morfema", "item-menu")
        item_morfema.textContent = "Tipos de morfemas"
        item_morfema.setAttribute("data-bs-toggle", "modal")
        item_morfema.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_morfema)
        item_morfema.onclick = () => {
            config_morfemas()
        }

    }
    make_spliter_panel()
    function make_spliter_panel() {
        const panel_splitter = newE("div", "panel_splitter", "splitter mt-2")
        panel_escritorio.appendChild(panel_splitter)

        const panel_list = newE("div", "panel_list", "")
        panel_list.textContent = "Panel listas"
        panel_splitter.appendChild(panel_list)

        const panel_separador = newE("div", "panel_separador", "bg-secondary")
        panel_splitter.appendChild(panel_separador)

        const panel_lexicon_edit = newE("div", "panel_lexicon_edit", "p-2")
        panel_lexicon_edit.textContent = "diccionario"
        panel_splitter.appendChild(panel_lexicon_edit)

        dragElement(document.getElementById("panel_separador"), "H");
    }
    _make_list_lx()

    function _make_list_lx() {
        const panel_list = byE("panel_list")
        panel_list.innerHTML = ""

        let i = 0
        for (idx in active_lexicon.entries) {
            const entrada = active_lexicon.entries[idx]
            entrada.id = i
            i++
            const p = newE("div", "p-" + entrada.key, "item-list-lx")
            p.textContent = entrada.lexeme.lx
            panel_list.appendChild(p)

            p.onclick = () => {
                _make_lexicon_edit(entrada)
                active_lexicon_id = entrada.id
            }
        }
    }
    _move_to_entry("ini")
    function _make_lexicon_edit(entrada) {
        const panel_lexicon_edit = byE("panel_lexicon_edit")
        panel_lexicon_edit.innerHTML = ""

        //Contenedor de categoria lx y sus variantes
        const div_lx = newE("div", "div_lx", "div-categoria")
        panel_lexicon_edit.appendChild(div_lx)

        const row_lx = newE("div", "row_lx", "row row align-items-end")
        div_lx.appendChild(row_lx)

        const col_lx_label = newE("div", "col_lx_label", "col-3 label-wrap")
        col_lx_label.textContent = "Lexema base"
        row_lx.appendChild(col_lx_label)

        const col_lx_value = newE("div", "col_lx_value", "col")
        row_lx.appendChild(col_lx_value)

        const input_lx_value = newE("input", "input_lx_value", "input-flat-dicc fs-5 fw-bold")
        input_lx_value.type = "text"
        col_lx_value.appendChild(input_lx_value)
        input_lx_value.value = entrada.lexeme.lx
        input_lx_value.onchange = () => {
            entrada.lexeme.lx = input_lx_value.value
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            byE("p-" + entrada.key).textContent = input_lx_value.value
        }

        /////////////////////////////////////////////////////////////////
        //Mostrar variantes del idioma principal
        const lx_variantes = global_proyecto["PROYECTO"].Variantes
        //Si en la configuración del proyecto existen variantes, verificar
        if (typeof lx_variantes != "undefined") {
            //Si existen estas variantes dentro del registro, verificar
            if (entrada.lexeme.lx_lngs.length != 0) {
                _put_variantes_lx()
            } else {
                lx_variantes.forEach(ele => {
                    const variantes = {
                        "variante": ele.nombre,
                        "abreviacion": ele.abreviacion,
                        "value": "",
                    }
                    entrada.lexeme.lx_lngs.push(variantes)

                })
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _put_variantes_lx()
            }
        }

        //Gestiona las variantes del proyento dentro de la entrada LX,
        function _put_variantes_lx() {
            const contar_variantes_inlx = entrada.lexeme.lx_lngs.length
            let contar_variantes_global;
            let global_variante;
            //Verifica si existe una tabla con variatnes globales
            if (verificar_datos(global_proyecto["PROYECTO"].Variantes) == true) {
                //Con la tabla de variantes globales hago una lista de variantes por nombre
                global_variante = global_proyecto["PROYECTO"].Variantes
                let item_global_var = []
                global_variante.forEach(ele => {
                    item_global_var.push(ele.nombre)
                })
                let item_inlx_var = []

                for (i in entrada.lexeme.lx_lngs) {
                    item_inlx_var.push(entrada.lexeme.lx_lngs[i].variante)
                }

                /////////////////////////////////////////////////////////////
                //Cuento cuantas variantes hay en lo global y en la entrada
                contar_variantes_global = global_variante.length
                //Si hay menos variantes en lo global, debemos eliminar una variante de la entrada lx
                if (contar_variantes_global < contar_variantes_inlx) {
                    //Aquí verificamos si las que están en la entrada están también en la global
                    //Si no está entonces vamso creando una lista alterna para actualizar los datos
                    let includes_var = []
                    entrada.lexeme.lx_lngs.forEach(var_lx => {
                        if (item_global_var.includes(var_lx.variante) == true) {
                            includes_var.push(var_lx)
                        }
                    })
                    entrada.lexeme.lx_lngs = includes_var
                    entrada.lexeme.lx_lngs.forEach(var_lx => {
                        make_variante_inlx(var_lx)
                    })
                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                } else if (contar_variantes_global > contar_variantes_inlx) {
                    global_variante.forEach(ele => {

                        if (item_inlx_var.includes(ele.nombre) == false) {
                            const variantes = {
                                "variante": ele.nombre,
                                "abreviacion": ele.abreviacion,
                                "value": "",
                            }
                            entrada.lexeme.lx_lngs.push(variantes)

                            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        }
                    })
                    entrada.lexeme.lx_lngs.forEach(var_lx => {
                        make_variante_inlx(var_lx)
                    })
                } else if (contar_variantes_global == contar_variantes_inlx) {
                    entrada.lexeme.lx_lngs.forEach(var_lx => {
                        make_variante_inlx(var_lx)
                    })
                }
            }
            function make_variante_inlx(var_lx) {
                //Identifica los datos desde el global
                const style_filter = global_variante.filter(ele => ele["nombre"] == var_lx.variante)
                if (style_filter[0].visible == true) {
                    const row_lx_var = newE("div", "row_lx_var" + var_lx.abreviacion, "row row align-items-end tag-small")
                    div_lx.appendChild(row_lx_var)

                    const col_lx_var_label = newE("div", "col_lx_var_label" + var_lx.abreviacion, "col-3 label-wrap text-end")
                    col_lx_var_label.textContent = var_lx.abreviacion
                    row_lx_var.appendChild(col_lx_var_label)

                    const col_lx_var_value = newE("div", "col_lx_value" + var_lx.abreviacion, "col")
                    row_lx_var.appendChild(col_lx_var_value)

                    const input_lx_var_value = newE("input", "input_lx_var_value" + var_lx.abreviacion, "input-flat-dicc")
                    input_lx_var_value.style.color = style_filter[0].style["font-color"]
                    input_lx_var_value.style.fontSize = style_filter[0].style["font-size"]
                    input_lx_var_value.type = "text"
                    col_lx_var_value.appendChild(input_lx_var_value)

                    input_lx_var_value.value = var_lx.value
                    input_lx_var_value.onchange = () => {
                        var_lx.value = input_lx_var_value.value
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                    }
                }
            }




        }
        /////////////////////////////////////////////////////////////////
        const row_morfema = newE("div", "row_morfema", "row row align-items-end")
        div_lx.appendChild(row_morfema)

        const col_morfema_label = newE("div", "col_lx_label", "col-3 label-wrap")
        col_morfema_label.textContent = "Tipo de morfema"
        row_morfema.appendChild(col_morfema_label)

        const col_morfema_value = newE("div", "col_morfema_value", "col")
        row_morfema.appendChild(col_morfema_value)

        const input_morfema_value = newE("select", "input_morfema_value", "input-flat-dicc")
        col_morfema_value.appendChild(input_morfema_value)



        //////////////////////////////////77
        byE("bt_del").onclick = () => {
            active_lexicon.entries = _delete_registro(active_lexicon.entries, "key", entrada.key)
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            _make_list_lx()
            panel_lexicon_edit.innerHTML = ""
            _move_to_entry("ini")
        }
    }

    function _add_registro() {
        active_lexicon.entries.push(template_entry())
        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
        _make_list_lx()
        _move_to_entry("fin")
    }



    function _move_to_entry(option) {

        if (option == "ini") {
            active_lexicon_id = 0
            _make_lexicon_edit(active_lexicon.entries[0])
        } else if (option == "sig") {
            if (active_lexicon_id >= active_lexicon.entries.length - 1) {
                alert("Último registro")
                active_lexicon_id = active_lexicon.entries.length - 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            } else {
                active_lexicon_id = active_lexicon_id + 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            }

        } else if (option == "prev") {
            if (active_lexicon_id == 0) {
                alert("Primer registro")
                active_lexicon_id = 0
                _make_lexicon_edit(active_lexicon.entries[0])
            } else {
                active_lexicon_id = active_lexicon_id - 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            }
        } else if (option == "fin") {
            active_lexicon_id = active_lexicon.entries.length - 1
            const entrada = _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
        }
    }
}
//Gestiona el cuadro de dialogo de las variantes dialectales de un idioma principal del proyecto
function config_variantes() {
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
    }
    const div_clase = newE("div", "div_clase", "m-2")
    modal_panel_gonfig.appendChild(div_clase)
    if(verificar_datos(global_proyecto["TABLAS"].MORFEMAS)==false){
        global_proyecto["TABLAS"]["MORFEMAS"] = template_mofemas()
        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
        _make_morfemas()      
    }else{
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
                _make_morfemas
            }

            byE("btnAceptar_open").onclick = () => {
                make_lexicon()
            }

            id_ref++
        }
    }



}

function _delete_registro(DATA, CAMPO, ID) {
    const filter = DATA.filter(ele => ele[CAMPO] !== ID)
    return filter
}

function template_entry() {
    const template = {
        "id": active_lexicon.entries.length - 1,
        "key": randomKey(20, '12345abcde'),
        "lexeme": {
            "lx": "Nueva entrada",
            "lx_lngs": [],
            "visible": true
        },
        "clase-morfema": {
            "tipo": "",
            "abreviacion": "",
            "lx_lngs": [],
            "visible": true
        }
    }
    return template
}
function template_mofemas() {
    const template = [
        {
            "key": "morf",
            "nombre": "Tema",
            "abreviacion": "tem",
            "info": "Lexema base que contiene la referencia base de significado",
            "estructura": {
                "ini": "",
                "fin": "",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Raíz",
            "abreviacion": "rad",
            "info": "Lexema central sin ningún tipo de afijos",
            "estructura": {
                "ini": "-",
                "fin": "-",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Prefíjo",
            "abreviacion": "pre",
            "info": "Lexema que se ubíca al inicio de un radical",
            "estructura": {
                "ini": "-",
                "fin": "",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Sufíjo",
            "abreviacion": "pre",
            "info": "Lexema que se ubíca al final de un radical",
            "estructura": {
                "ini": "",
                "fin": "-",
            },
            "visible": true,
        }
    ]

    template.forEach(ele=>{
        ele.key="morf-" + randomKey(10, '12345abcde')
    })
    return template
}
