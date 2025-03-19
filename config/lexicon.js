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
        ul_menu_config.style.width = "200px"
        div_dropdown_config.appendChild(ul_menu_config)

        const item_variantes = newE("div", "item_variantes", "item-menu")
        item_variantes.textContent = "Variantes de idioma"
        item_variantes.setAttribute("data-bs-toggle", "modal")
        item_variantes.setAttribute("data-bs-target", "#open_modal")
        item_variantes.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_variantes()
        }

        ul_menu_config.appendChild(item_variantes)

        const item_idioma_analisis = newE("div", "item_idioma_analisis", "item-menu")
        item_idioma_analisis.textContent = "Idiomas de análisis"
        item_idioma_analisis.setAttribute("data-bs-toggle", "modal")
        item_idioma_analisis.setAttribute("data-bs-target", "#open_modal")
        item_idioma_analisis.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_idioma_analisis()
        }
        ul_menu_config.appendChild(item_idioma_analisis)


        /////////////////////////////////////////////
        const div_dropdown_listas = newE("div", "div_dropdown_listas", "dropdown mt-1")
        bts_move.appendChild(div_dropdown_listas)

        const btn_menu_listas = newE("button", "btn_menu_config", "btn btn-secondary dropdown-toggle")
        btn_menu_listas.setAttribute("data-bs-toggle", "dropdown")
        btn_menu_listas.type = "button"
        btn_menu_listas.textContent = "Listas"
        div_dropdown_listas.appendChild(btn_menu_listas)

        const ul_menu_listas = newE("ul", "ul_menu_listas", "dropdown-menu shadow")
        ul_menu_listas.style.width = "200px"
        div_dropdown_listas.appendChild(ul_menu_listas)

        const item_morfema = newE("div", "item_morfema", "item-menu")
        item_morfema.textContent = "Tipos de morfemas"
        item_morfema.setAttribute("data-bs-toggle", "modal")
        item_morfema.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_morfema)
        item_morfema.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_morfemas()
        }

        const item_contexto = newE("div", "item_contexto", "item-menu")
        item_contexto.textContent = "Tipos de contexto"
        item_contexto.setAttribute("data-bs-toggle", "modal")
        item_contexto.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_contexto)
        item_contexto.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_contexto()
        }

        const item_ps = newE("div", "item_ps", "item-menu")
        item_ps.textContent = "Categorías gramaticales"
        item_ps.setAttribute("data-bs-toggle", "modal")
        item_ps.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_ps)
        item_ps.onclick = () => {
            byE("class_modal_open").className = "modal-dialog modal-fullscreen"
            config_gramatical_list()
        }

    }
    make_spliter_panel()
    function make_spliter_panel() {
        const panel_splitter = newE("div", "panel_splitter", "splitter mt-2")
        panel_escritorio.appendChild(panel_splitter)

        const panel_list = newE("div", "panel_list_lx", "")
        panel_splitter.appendChild(panel_list)

        const panel_separador = newE("div", "panel_separador_lx", "bg-secondary")
        panel_splitter.appendChild(panel_separador)

        const panel_lexicon_edit = newE("div", "panel_lexicon_edit_lx", "p-2")
        panel_lexicon_edit.textContent = "diccionario"
        panel_splitter.appendChild(panel_lexicon_edit)

        dragElement(document.getElementById("panel_separador_lx"), "H", "panel_list_lx", "panel_lexicon_edit_lx");
    }
    _make_list_lx()

    function _make_list_lx() {
        const panel_list = byE("panel_list_lx")
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
        const panel_lexicon_edit = byE("panel_lexicon_edit_lx")
        panel_lexicon_edit.innerHTML = ""

        //Contenedor de categoria lx y sus variantes
        const div_lx = newE("div", "div_lx", "div-categoria")
        panel_lexicon_edit.appendChild(div_lx)

        const row_lx = newE("div", "row_lx", "row row align-items-end")
        div_lx.appendChild(row_lx)

        const col_lx_label = newE("div", "col_lx_label", "col-3 label-wrap")
        row_lx.appendChild(col_lx_label)

        const row_lx_label = newE("div", "row_lx_label", "row align-items-center")
        col_lx_label.appendChild(row_lx_label)

        const col_menu_lx = newE("div", "col_menu_lx", "col-auto")
        row_lx_label.appendChild(col_menu_lx)

        const btn_menu_lx = newE("div", "btn_menu_lx", "bi bi-arrow-down-circle-fill btn-context-lx")
        btn_menu_lx.setAttribute("data-bs-toggle", "dropdown")
        col_menu_lx.appendChild(btn_menu_lx)

        const ul_menu_lx = newE("ul", "ul_menu_lx", "dropdown-menu shadow")
        col_menu_lx.appendChild(ul_menu_lx)

        const item_lx_vertodo_campos = newE("ul", "item_lx_vertodo_campos", "item-menu")
        item_lx_vertodo_campos.textContent = "Ver campos ocultos"
        ul_menu_lx.appendChild(item_lx_vertodo_campos)
        item_lx_vertodo_campos.onclick = () => {
            entrada["clase-contexto"].visible = true
            entrada["clase-varianteOf"].visible = true
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            _make_lexicon_edit(entrada)
        }

        const col_menu_lx_label = newE("div", "col_menu_lx_label", "col-auto")
        col_menu_lx_label.textContent = "Lexema base"
        row_lx_label.appendChild(col_menu_lx_label)


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

        if (verificar_datos(global_proyecto["TABLAS"].MORFEMAS) == true) {
            global_proyecto["TABLAS"].MORFEMAS.forEach(ele => {
                const option = newE("option", "option" + ele.nombre, "")
                option.value = ele.nombre
                option.textContent = ele.nombre
                input_morfema_value.appendChild(option)
            })

            const option = newE("option", "optionIndefinido", "")
            option.value = "Indefinido"
            option.textContent = "Indefinido"
            input_morfema_value.appendChild(option)
        }
        input_morfema_value.value = entrada["clase-morfema"].tipo
        input_morfema_value.onchange = () => {
            const filter_morfema = global_proyecto["TABLAS"].MORFEMAS.filter(ele => ele.nombre == input_morfema_value.value)
            entrada["clase-morfema"].tipo = input_morfema_value.value
            entrada["clase-morfema"].abreviacion = filter_morfema[0].abreviacion
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
        }

        /////////////////////////////////////////////////////////////////
        ///Configuración contextos de aparición
        if (entrada["clase-contexto"].visible == true) {
            const row_contexto = newE("div", randomKey(10, '12345abcde'), "row row align-items-end mt-2")
            div_lx.appendChild(row_contexto)

            const col_contexto_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_contexto.appendChild(col_contexto_label)

            const row_contexto_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_contexto_label.appendChild(row_contexto_label)

            const col_menu_contexto = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_contexto_label.appendChild(col_menu_contexto)

            const btn_menu_contexto = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_contexto.setAttribute("data-bs-toggle", "dropdown")
            col_menu_contexto.appendChild(btn_menu_contexto)

            const ul_menu_contexto = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_contexto.appendChild(ul_menu_contexto)

            const div_visible_contexto = newE("div", randomKey(10, '12345abcde'), "form-check")
            ul_menu_contexto.appendChild(div_visible_contexto)

            const int_visible_contexto = newE("input", randomKey(10, '12345abcde'), "form-check-input-check")
            int_visible_contexto.type = "checkbox"
            div_visible_contexto.appendChild(int_visible_contexto)


            const int_visibleContexto_label = newE("label", randomKey(10, '12345abcde'), "form-check-label ms-2")
            int_visibleContexto_label.for = "int_visible_contexto"
            int_visibleContexto_label.textContent = "Visible"
            div_visible_contexto.appendChild(int_visibleContexto_label)


            int_visible_contexto.checked = entrada["clase-contexto"].visible
            int_visible_contexto.onchange = () => {
                entrada["clase-contexto"].visible = int_visible_contexto.checked
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_lexicon_edit(entrada)
            }


            const col_menu_contexto_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
            col_menu_contexto_label.textContent = "Contexto"
            row_contexto_label.appendChild(col_menu_contexto_label)

            const col_contexto_value = newE("div", randomKey(10, '12345abcde'), "col")
            row_contexto.appendChild(col_contexto_value)

            const row_contexto_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_contexto_value.appendChild(row_contexto_value)

            const col_contexto_values = newE("div", randomKey(10, '12345abcde'), "col div-fluid")

            row_contexto_value.appendChild(col_contexto_values)

            const col_contexto_items = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_contexto_value.appendChild(col_contexto_items)

            const btn_menu_contexto_items = newE("button", randomKey(10, '12345abcde'), "btn btn-light btn-sm fw-bold")
            btn_menu_contexto_items.type = "button"
            btn_menu_contexto_items.textContent = "..."
            btn_menu_contexto_items.setAttribute("data-bs-toggle", "dropdown")
            col_contexto_items.appendChild(btn_menu_contexto_items)

            const ul_menu_contexto_items = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_contexto_items.appendChild(ul_menu_contexto_items)

            //Verifico si hay una tabla con esa información
            if (verificar_datos(global_proyecto["TABLAS"].CONTEXTOS) == true) {
                global_proyecto["TABLAS"].CONTEXTOS.forEach(ele => {
                    const item_contexto = newE("div", randomKey(10, '12345abcde'), "item-menu m-1")
                    item_contexto.textContent = ele.nombre + " " + ele.contexto
                    ul_menu_contexto_items.appendChild(item_contexto)
                    item_contexto.onclick = () => {
                        entrada["clase-contexto"].contextos.push(ele)
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        _make_contextos_items()
                    }
                })
                _make_contextos_items()
                function _make_contextos_items() {
                    col_contexto_values.innerHTML = ""
                    entrada["clase-contexto"].contextos.forEach(contexto => {
                        const div_contexto = newE("div", "div_contexto" + contexto.nombre, "div-fluid me-4")
                        div_contexto.style.width = "50px"
                        div_contexto.textContent = contexto.contexto

                        const div_borrar = newE("div", "div_borrar" + contexto.nombre, "ms-2 bi bi-x-circle-fill btn-context-lx")
                        div_contexto.appendChild(div_borrar)
                        col_contexto_values.appendChild(div_contexto)

                        div_borrar.onclick = () => {
                            const filter_borrar = entrada["clase-contexto"].contextos.filter(e => e.key != contexto.key)
                            entrada["clase-contexto"].contextos = filter_borrar
                            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                            _make_contextos_items()
                        }

                    })
                }
            }

        }

        if (entrada["clase-varianteOf"].visible == true) {
            const row_varianteOf = newE("div", randomKey(10, '12345abcde'), "row row align-items-end mt-2")
            div_lx.appendChild(row_varianteOf)

            const col_row_varianteOf_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_varianteOf.appendChild(col_row_varianteOf_label)

            const row_varianteOf_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_row_varianteOf_label.appendChild(row_varianteOf_label)

            const col_menu_varianteOf = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_varianteOf_label.appendChild(col_menu_varianteOf)

            const btn_menu_varianteOf = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_varianteOf.setAttribute("data-bs-toggle", "dropdown")
            col_menu_varianteOf.appendChild(btn_menu_varianteOf)

            const ul_menu_varianteOf = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_varianteOf.appendChild(ul_menu_varianteOf)

            const div_visible_varianteOf = newE("div", randomKey(10, '12345abcde'), "form-check")
            ul_menu_varianteOf.appendChild(div_visible_varianteOf)

            const int_visible_varianteOf = newE("input", randomKey(10, '12345abcde'), "form-check-input-check")
            int_visible_varianteOf.type = "checkbox"
            div_visible_varianteOf.appendChild(int_visible_varianteOf)


            const int_visibleVarianteOf_label = newE("label", randomKey(10, '12345abcde'), "form-check-label ms-2")
            int_visibleVarianteOf_label.for = "int_visible_varianteOf"
            int_visibleVarianteOf_label.textContent = "Visible"
            div_visible_varianteOf.appendChild(int_visibleVarianteOf_label)


            int_visible_varianteOf.checked = entrada["clase-varianteOf"].visible
            int_visible_varianteOf.onchange = () => {
                entrada["clase-varianteOf"].visible = int_visible_varianteOf.checked
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_lexicon_edit(entrada)
            }

            const col_menu_varianteOf_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
            col_menu_varianteOf_label.textContent = "Variante de"
            row_varianteOf_label.appendChild(col_menu_varianteOf_label)

            const col_variateOf_value = newE("div", randomKey(10, '12345abcde'), "col")
            row_varianteOf.appendChild(col_variateOf_value)

            const row_varianteOf_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_variateOf_value.appendChild(row_varianteOf_value)

            const col_variateOf_values = newE("div", randomKey(10, '12345abcde'), "col div-fluid")
            row_varianteOf_value.appendChild(col_variateOf_values)

            const col_variateOf_items = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_varianteOf_value.appendChild(col_variateOf_items)

            const btn_menu_variateOf_items = newE("button", randomKey(10, '12345abcde'), "btn btn-light btn-sm fw-bold")
            btn_menu_variateOf_items.type = "button"
            btn_menu_variateOf_items.textContent = "..."
            btn_menu_variateOf_items.setAttribute("data-bs-toggle", "modal")
            btn_menu_variateOf_items.setAttribute("data-bs-target", "#open_modal")
            col_variateOf_items.appendChild(btn_menu_variateOf_items)

            btn_menu_variateOf_items.onclick = () => {
                byE("class_modal_open").className = "modal-dialog"
                _open_variaciones()
            }
            _open_variaciones()
            function _open_variaciones() {
                byE("config_titulo").textContent = "Buscar relación"
                const modal_panel_gonfig = byE("modal_panel_gonfig")
                modal_panel_gonfig.innerHTML = ""
                const sm_buscar = newE("small", randomKey(10, '12345abcde'), "")
                sm_buscar.textContent = "Buscar palabra"
                modal_panel_gonfig.appendChild(sm_buscar)

                //Creamos una casilla de búsqueda
                const int_buscar = newE("input", randomKey(10, '12345abcde'), "form-control")
                modal_panel_gonfig.appendChild(int_buscar)

                //Creamos una lista de idiomas
                const sm_idiomas = newE("small", randomKey(10, '12345abcde'), "")
                sm_idiomas.textContent = "Idioma de búsqueda"
                modal_panel_gonfig.appendChild(sm_idiomas)

                const sel_buscar = newE("select", randomKey(10, '12345abcde'), "form-control")
                modal_panel_gonfig.appendChild(sel_buscar)

                //Primero creo el idioma principal
                const Op_principal = newE("option", randomKey(10, '12345abcde'), "")
                Op_principal.value = "lexeme_lx"

                const lngP = global_proyecto["PROYECTO"]
                Op_principal.textContent = lngP.idioma + " (" + lngP.cod_idioma + ")"
                sel_buscar.appendChild(Op_principal)

                //Segundo busco idiomas de análisis
                const lngS = global_proyecto["PROYECTO"].Lngtraducion
                lngS.forEach(l => {
                    const Op_secundaria = newE("option", randomKey(10, '12345abcde'), "")
                    Op_secundaria.value = "sentidos_" + l.abreviacion
                    Op_secundaria.textContent = l.nombre + " (" + l.abreviacion + ")"
                    sel_buscar.appendChild(Op_secundaria)
                })

                //Creamos un contenedor de listas
                const div_resultados = newE("div", randomKey(10, '12345abcde'), "menu-group-scroll")
                modal_panel_gonfig.appendChild(div_resultados)

                //Creamos una lista de idiomas
                const sm_resultado = newE("small", randomKey(10, '12345abcde'), "")
                sm_resultado.textContent = "Selección"
                modal_panel_gonfig.appendChild(sm_resultado)

                //Creamos un contenedor de listas
                const sel_resultados = newE("select", randomKey(10, '12345abcde'), "form-coltrol")
                sel_resultados.style.width = "100%"
                modal_panel_gonfig.appendChild(sel_resultados)

                //Creamos una lista de idiomas
                const sm_tipo = newE("small", randomKey(10, '12345abcde'), "")
                sm_tipo.textContent = "Tipo de variación"
                modal_panel_gonfig.appendChild(sm_tipo)

                //Creamos un contenedor de listas
                const sel_tipos = newE("select", randomKey(10, '12345abcde'), "form-coltrol")
                sel_tipos.style.width = "100%"
                modal_panel_gonfig.appendChild(sel_tipos)

                const tipos = ["Dialectal", "Ortográfica", "Morfológica"]
                tipos.forEach(t => {
                    const option = newE("option", randomKey(10, '12345abcde'), "")
                    option.value = t
                    option.textContent = t
                    sel_tipos.appendChild(option)
                })


                int_buscar.oninput = () => {
                    div_resultados.innerHTML = ""
                    const fuente = sel_buscar.value.split("_")
                    if (fuente[0] == "lexeme") {
                        //Leo todas las entradas y su lexema
                        global_proyecto["LEXICON"].entries.forEach(lx => {
                            let cadena_ini = lx.lexeme.lx.toLowerCase()
                            if (cadena_ini.startsWith(int_buscar.value.toLowerCase()) == true
                                && int_buscar.value != "") {
                                const item = newE("div", randomKey(10, '12345abcde'), "item-menu")
                                //Contrar traducciones para colocar en la lista
                                let glosas = ""
                                lx["clase-sn"].sentidos.forEach(sn => {
                                    glosas = glosas + ", " + sn.gn[0].texto

                                })
                                item.innerHTML = `<b>${lx.lexeme.lx}</b> ${glosas}`
                                div_resultados.appendChild(item)
                                item.onclick = () => {
                                    sel_resultados.innerHTML = ""
                                    const res = newE("option", randomKey(10, '12345abcde'), "")
                                    res.value = lx.lexeme.lx + "_" + lx.key
                                    res.textContent = lx.lexeme.lx
                                    sel_resultados.appendChild(res)
                                    sel_resultados.value = lx.lexeme.lx + "_" + lx.key
                                }
                            }
                        })
                    } else if (fuente[0] == "sentidos") {
                        //Leo todas las entradas y su sentido
                        global_proyecto["LEXICON"].entries.forEach(lx => {
                            lx["clase-sn"].sentidos.forEach(sn => {
                                sn.gn.forEach(l => {
                                    if (l.abreviacion == fuente[1]) {
                                        let cadena_ini = l.texto.toLowerCase()
                                        if (cadena_ini.startsWith(int_buscar.value.toLowerCase()) == true
                                            && int_buscar.value != "") {
                                            const item = newE("div", randomKey(10, '12345abcde'), "item-menu")
                                            item.textContent = l.texto
                                            item.innerHTML = `<b>${l.texto}</b> ${lx.lexeme.lx}`
                                            div_resultados.appendChild(item)
                                            item.onclick = () => {
                                                sel_resultados.innerHTML = ""
                                                const res = newE("option", randomKey(10, '12345abcde'), "")
                                                res.value = lx.lexeme.lx + "_" + lx.key
                                                res.textContent = lx.lexeme.lx
                                                sel_resultados.appendChild(res)
                                                sel_resultados.value = lx.lexeme.lx + "_" + lx.key
                                            }
                                        }
                                    }
                                })

                            })

                        })
                    }

                }

                byE("btnAceptar_open").onclick = () => {
                    const resultado = sel_resultados.value.split("_")
                    const variacion = {
                        "key": randomKey(10, '12345abcde'),
                        "ref": resultado[1],
                        "texto": resultado[0],
                        "tipo": sel_tipos.value,
                    }
                    entrada["clase-varianteOf"].variantes.push(variacion)
                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])

                    _make_variantes_items()
                }

                _make_variantes_items()
                function _make_variantes_items() {
                    col_variateOf_values.innerHTML = ""
                    entrada["clase-varianteOf"].variantes.forEach(cat => {
                        const div_cat = newE("div", randomKey(10, '12345abcde'), "div-fluid")
                        div_cat.style.cursor = "pointer"

                        div_cat.innerHTML = `[<b class="me-2">${cat.texto}</b>  Var.  <i class="ms-2">${cat.tipo}</i>]`
                        div_cat.onclick = () => {
                            const find_entrada = global_proyecto["LEXICON"].entries.filter(lx => lx.key == cat.ref)
                            _make_lexicon_edit(find_entrada[0])
                            active_lexicon_id = find_entrada[0].id
                        }
                        const div_borrar = newE("div", randomKey(10, '12345abcde'), "ms-2 bi bi-x-circle-fill btn-context-lx me-4")
                        //div_cat.appendChild(div_borrar)
                        col_variateOf_values.appendChild(div_cat)
                        col_variateOf_values.appendChild(div_borrar)

                        div_borrar.onclick = () => {
                            const filter_borrar = entrada["clase-varianteOf"].variantes.filter(e => e.key != cat.key)
                            entrada["clase-varianteOf"].variantes = filter_borrar
                            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                            _make_variantes_items()
                        }

                    })
                }
            }




        }

        ///SECCIÓN DE INGRESO SENTIDOS
        _make_sentidos_panel()
        function _make_sentidos_panel() {
            const lb_clase = "sns"
            //Contenedor de categoria lx y sus variantes
            const div_sn = newE("div", randomKey(10, '12345abcde'), "div-categoria mt-2")
            panel_lexicon_edit.appendChild(div_sn)

            const div_acciones_sntool = newE("div", randomKey(10, '12345abcde'), "")
            div_sn.appendChild(div_acciones_sntool)

            const div_sentidos_list = newE("div", randomKey(10, '12345abcde'), "ms-3")
            div_sn.appendChild(div_sentidos_list)

            const row_titulo_sentidos = newE("div", randomKey(10, '12345abcde'), "row row align-items-end")
            div_acciones_sntool.appendChild(row_titulo_sentidos)

            const col_titulo_sentidos = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_titulo_sentidos.appendChild(col_titulo_sentidos)

            const row_A_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_titulo_sentidos.appendChild(row_A_label)

            const col_menu_AA = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_A_label.appendChild(col_menu_AA)

            const btn_menu_AA = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_AA.setAttribute("data-bs-toggle", "dropdown")
            col_menu_AA.appendChild(btn_menu_AA)

            const ul_menu_AA = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_AA.appendChild(ul_menu_AA)

            const col_menu_AB = newE("div", randomKey(10, '12345abcde'), "col-auto fw-bold")
            col_menu_AB.textContent = "Sentidos"
            row_A_label.appendChild(col_menu_AB)


            const col_acciones_sentidos = newE("div", randomKey(10, '12345abcde'), "col div-fluid-rg")
            row_titulo_sentidos.appendChild(col_acciones_sentidos)

            const btn_agregar_sentidos = newE("div", randomKey(10, '12345abcde'), "item-texto-small me-2")
            btn_agregar_sentidos.textContent = "Agregar sentido +"
            col_acciones_sentidos.appendChild(btn_agregar_sentidos)

            btn_agregar_sentidos.onclick = () => {
                entrada["clase-sn"].sentidos.push(template_sn())
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_sentido()
            }

            const btn_agregar_ejemplo = newE("div", randomKey(10, '12345abcde'), "item-texto-small me-2")
            btn_agregar_ejemplo.textContent = "Agregar ejemplo +"
            col_acciones_sentidos.appendChild(btn_agregar_ejemplo)

            _make_sentido()
            function _make_sentido() {
                div_sentidos_list.innerHTML = ""
                //Miramos los sentidos que están en esta entra
                const tabla_sentidos = entrada["clase-sn"].sentidos
                //Creamos una línea de sentido tipo collapse

                let s = 0
                tabla_sentidos.forEach(sn => {
                    const btn_sn_collapse = newE("div", randomKey(10, '12345abcde'), "btn-collapse-sn")
                    btn_sn_collapse.setAttribute("data-bs-toggle", "collapse")
                    btn_sn_collapse.setAttribute("data-bs-target", "#collapse_sn" + s)
                    btn_sn_collapse.textContent = "Sentido " + (s + 1)
                    div_sentidos_list.appendChild(btn_sn_collapse)

                    const div_sn_collapse = newE("div", "collapse_sn" + s, "collapse show ms-4")
                    div_sentidos_list.appendChild(div_sn_collapse)

                    crear_gns()
                    function crear_gns() {
                        const row_cat = newE("div", randomKey(10, '12345abcde'), "row")
                        div_sn_collapse.appendChild(row_cat)

                        const col_cat_menu = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat.appendChild(col_cat_menu)

                        const row_cat_menu = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                        col_cat_menu.appendChild(row_cat_menu)

                        const col_row_catMenu = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat_menu.appendChild(col_row_catMenu)

                        const btn_menu_cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
                        btn_menu_cat.setAttribute("data-bs-toggle", "dropdown")
                        col_row_catMenu.appendChild(btn_menu_cat)

                        const ul_menu_cat = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
                        col_row_catMenu.appendChild(ul_menu_cat)

                        const col_row_catLabel = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat_menu.appendChild(col_row_catLabel)

                        const div_col_catLabel = newE("div", randomKey(10, '12345abcde'), "sub-labels")
                        div_col_catLabel.textContent = "Glosa"
                        col_row_catLabel.appendChild(div_col_catLabel)


                        const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
                        row_cat.appendChild(col_cat_value)

                        //Aquí las filas dentro del valor de glosa, muestra por idima de análisis

                        sn.gn.forEach(_lng => {
                            //Verifica que el idioma existe y si es visible
                            const filter_trad = global_proyecto["PROYECTO"].Lngtraducion.filter(l => l.abreviacion == _lng.abreviacion)
                            if (filter_trad[0].visible == true) {
                                const row_cat_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                                col_cat_value.appendChild(row_cat_values_lng)
                                const col_cat_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small")
                                col_cat_label_lng.textContent = _lng.abreviacion
                                row_cat_values_lng.appendChild(col_cat_label_lng)

                                const col_cat_value_lng = newE("div", randomKey(10, '12345abcde'), "col")
                                row_cat_values_lng.appendChild(col_cat_value_lng)

                                const int_cat_value_lng = newE("input", randomKey(10, '12345abcde'), "input-flat-dicc fw-bold")
                                int_cat_value_lng.style.color = filter_trad[0].style["font-color"]
                                int_cat_value_lng.style.fontSize = filter_trad[0].style["font-size"]
                                col_cat_value_lng.appendChild(int_cat_value_lng)

                                int_cat_value_lng.value = _lng.texto
                                int_cat_value_lng.onchange = () => {
                                    _lng.texto = int_cat_value_lng.value
                                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                }


                            }
                        })
                    }

                    _crear_dns()
                    function _crear_dns() {
                        const row_cat = newE("div", randomKey(10, '12345abcde'), "row")
                        div_sn_collapse.appendChild(row_cat)

                        const col_cat_menu = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat.appendChild(col_cat_menu)

                        const row_cat_menu = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                        col_cat_menu.appendChild(row_cat_menu)

                        const col_row_catMenu = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat_menu.appendChild(col_row_catMenu)

                        const btn_menu_cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
                        btn_menu_cat.setAttribute("data-bs-toggle", "dropdown")
                        col_row_catMenu.appendChild(btn_menu_cat)

                        const ul_menu_cat = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
                        col_row_catMenu.appendChild(ul_menu_cat)

                        const col_row_catLabel = newE("div", randomKey(10, '12345abcde'), "col-auto")
                        row_cat_menu.appendChild(col_row_catLabel)

                        const div_col_catLabel = newE("div", randomKey(10, '12345abcde'), "sub-labels")
                        div_col_catLabel.textContent = "Definición"
                        col_row_catLabel.appendChild(div_col_catLabel)

                        const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
                        row_cat.appendChild(col_cat_value)
                        sn.dn.forEach(_lng => {
                            //Verifica que el idioma existe y si es visible
                            const filter_trad = global_proyecto["PROYECTO"].Lngtraducion.filter(l => l.abreviacion == _lng.abreviacion)
                            if (filter_trad[0].visible == true) {
                                const row_cat_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                                col_cat_value.appendChild(row_cat_values_lng)

                                const col_cat_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small")
                                col_cat_label_lng.textContent = _lng.abreviacion
                                row_cat_values_lng.appendChild(col_cat_label_lng)

                                const col_cat_value_lng = newE("div", randomKey(10, '12345abcde'), "col")
                                row_cat_values_lng.appendChild(col_cat_value_lng)

                                const int_cat_value_lng = newE("textarea", randomKey(10, '12345abcde'), "input-flat-dicc")
                                int_cat_value_lng.style.color = filter_trad[0].style["font-color"]
                                int_cat_value_lng.style.fontSize = filter_trad[0].style["font-size"]
                                col_cat_value_lng.appendChild(int_cat_value_lng)

                                int_cat_value_lng.value = _lng.texto
                                int_cat_value_lng.onchange = () => {
                                    _lng.texto = int_cat_value_lng.value
                                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                }


                            }
                        })
                    }


                    s++
                })




            }


        }

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
        const tabla_categorias = global_proyecto["TABLAS"]["CATGRAMATICAL"]
        const panel_list = byE("panel_list_ps")
        const panel_list_edit = byE("panel_lexicon_edit_ps")

        panel_list.innerHTML = ""


        tabla_categorias.forEach(cat => {
            const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center item-tree")
            panel_list.appendChild(item_collapse_categoria)

            const col_collapse_plus = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree")
            col_collapse_plus.textContent = "-"
            col_collapse_plus.setAttribute("data-bs-toggle", "collapse")
            col_collapse_plus.setAttribute("data-bs-target", "#collapse_ps" + cat.key)
            item_collapse_categoria.appendChild(col_collapse_plus)

            col_collapse_plus.onclick = () => {
                if (col_collapse_plus.textContent == "+") {
                    col_collapse_plus.textContent = "-"
                } else if (col_collapse_plus.textContent == "-") {
                    col_collapse_plus.textContent = "+"
                }
            }


            const col_collapse_name = newE("div", "categoria" + cat.key, "col")
            col_collapse_name.textContent = cat.nombre[0].texto
            item_collapse_categoria.appendChild(col_collapse_name)

            let i = cat.key
            col_collapse_name.onclick = () => {
                _make_panel_cat(cat, i, true)
            }

            const div_collapse_subcategoria = newE("div", "collapse_ps" + cat.key, "collapse show ms-3")
            panel_list.appendChild(div_collapse_subcategoria)


            cat.subcategorias.forEach(sub_B => {

                const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center item-tree")
                div_collapse_subcategoria.appendChild(item_collapse_categoria)

                const col_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree")
                col_plus_b.textContent = "-"
                col_plus_b.setAttribute("data-bs-toggle", "collapse")
                col_plus_b.setAttribute("data-bs-target", "#collapse_ps" + sub_B.key)
                item_collapse_categoria.appendChild(col_plus_b)

                col_plus_b.onclick = () => {
                    if (col_plus_b.textContent == "+") {
                        col_plus_b.textContent = "-"
                    } else if (col_collapse_plus.textContent == "-") {
                        col_plus_b.textContent = "+"
                    }
                }
             
                const col_collapse_name = newE("div", "categoria" + sub_B.key, "col")
                col_collapse_name.textContent = sub_B.nombre[0].texto
                item_collapse_categoria.appendChild(col_collapse_name)


                let ii = sub_B.key
                col_collapse_name.onclick = () => {
                    _make_panel_cat(sub_B, ii, true)
                }
    
                const div_collapse_AB = newE("div", "collapse_ps"  + sub_B.key, "collapse show ms-3")
                //div_collapse_AB.textContent="AB"
                item_collapse_categoria.appendChild(div_collapse_AB)



            })


        })

        _make_panel_cat(tabla_categorias[0], 0, true)
        function _make_panel_cat(cat, id, add) {
            panel_list_edit.innerHTML = ""
            //Si aún no es el último nivel, permitir agregar
            if (add == true) {
                const div_actions = newE("div", randomKey(20, '12345abcde'), "div-fluid")
                panel_list_edit.appendChild(div_actions)

                const div_add_categoria = newE("div", randomKey(20, '12345abcde'), "item-texto-small")
                div_add_categoria.textContent = "Agregar categoria +"
                div_actions.appendChild(div_add_categoria)
                panel_list_edit.appendChild(div_actions)

                div_add_categoria.onclick = () => {
                    cat.subcategorias.push(template_ps())
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                }
            }
            /////////////////////////////////////////////////////////////////
            const row_nombre = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
            panel_list_edit.appendChild(row_nombre)

            const col_nombre = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
            col_nombre.textContent = "Nombre"
            row_nombre.appendChild(col_nombre)

            const col_nombre_valores = newE("div", randomKey(20, '12345abcde'), "col")
            row_nombre.appendChild(col_nombre_valores)


            cat.nombre.forEach(n => {
                const filter_lng = global_proyecto["PROYECTO"].Lngtraducion.filter(el => el.abreviacion == n.abreviacion)
                if (filter_lng[0].visible == true) {
                    const row_lng = newE("div", randomKey(20, '12345abcde'), "row align-items-center")
                    col_nombre_valores.appendChild(row_lng)

                    const col_nombre_lng = newE("div", randomKey(20, '12345abcde'), "col-auto tag-small")
                    col_nombre_lng.textContent = n.abreviacion
                    row_lng.appendChild(col_nombre_lng)

                    const col_nombre_value = newE("div", randomKey(20, '12345abcde'), "col")
                    row_lng.appendChild(col_nombre_value)

                    const int_lng_value = newE("input", randomKey(20, '12345abcde'), "input-flat-dicc")
                    col_nombre_value.appendChild(int_lng_value)

                    int_lng_value.value = n.texto
                    let campo = n

                    int_lng_value.onchange = () => {
                        campo.texto = int_lng_value.value
                        byE("categoria" + id).textContent = cat.nombre[0].texto
                        Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    }
                }

            })

            //////////////////////////////////////////////////////////////////////////////77
            const row_abb = newE("div", randomKey(20, '12345abcde'), "row align-items-center mt-2")
            panel_list_edit.appendChild(row_abb)

            const col_abb = newE("div", randomKey(20, '12345abcde'), "col-2 ms-2")
            col_abb.textContent = "Abreviación"
            row_abb.appendChild(col_abb)

            const col_abb_valores = newE("div", randomKey(20, '12345abcde'), "col")
            row_abb.appendChild(col_abb_valores)

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


        }

    }
    byE("btnAceptar_open").onclick = () => {
        //make_lexicon()
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
            "tipo": "Indefinido",
            "abreviacion": "ind",
            "lx_lngs": [],
            "visible": true
        },
        "clase-contexto": {
            "contextos": [],
            "visible": true
        },
        "clase-varianteOf": {
            "variantes": [],
            "visible": true
        }
        ,
        "clase-etimologia": {
            "forma": "",
            "visible": true,
            "estructura": []
        }
        ,
        "clase-sn": {
            "visible": true,
            "sentidos": []
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

    template.forEach(ele => {
        ele.key = "morf-" + randomKey(10, '12345abcde')
    })
    return template
}
function template_contexto() {
    const template = [
        {
            "key": "cont",
            "nombre": "Después de vocal",
            "contexto": "/[V]_",
            "info": "En posterior adyacencia de una vocal",
        },
        {
            "key": "cont",
            "nombre": "Después de consonante",
            "contexto": "/[C]_",
            "info": "En posterior adyacencia de una consonante",
        },
        {
            "key": "cont",
            "nombre": "Antes de vocal",
            "contexto": "/_[V]",
            "info": "En anterior adyacencia de una vocal",
        },
        {
            "key": "cont",
            "nombre": "Antes de consonante",
            "contexto": "/_[C]",
            "info": "En anterior adyacencia de una consonante",
        },
    ]

    template.forEach(ele => {
        ele.key = "cont-" + randomKey(10, '12345abcde')
    })
    return template
}

function template_sn() {
    //Debo procesar antes los idiomas incluidos para análisis
    let gns = []
    let dns = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lngs = global_proyecto["PROYECTO"].Lngtraducion
        lngs.forEach(l => {
            const item_gn = {
                "texto": "Palabra en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            gns.push(item_gn)
            dns.push(item_gn)
        })
        //
    }
    const template = {
        "key": "sn-" + randomKey(10, '12345abcde'),
        "gn": gns,
        "dn": dns,
        "ps": "Indefinido",
        "ex": [],
    }
    return template
}
function template_ps() {
    //Debo procesar antes los idiomas incluidos para análisis
    let ns = []
    let abbs = []
    let dess = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lngs = global_proyecto["PROYECTO"].Lngtraducion
        lngs.forEach(l => {
            const item = {
                "texto": "Categoria en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            ns.push(item)
            abbs.push(item)
            dess.push(item)
        })
        //
    }
    const template = {
        "key": "ps-" + randomKey(10, '12345abcde'),
        "nombre": ns,
        "abreviaciones": abbs,
        "definiciones": dess,
        "subcategorias": []
    }
    return template
}