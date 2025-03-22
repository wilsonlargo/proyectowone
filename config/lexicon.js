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
            p.textContent = entrada.lexeme.ini + entrada.lexeme.lx + entrada.lexeme.fin
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

        const row_lx = newE("div", "row_lx", "row align-items-end")
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
            entrada["clase-etimologia"].visible = true
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            _make_lexicon_edit(entrada)
        }

        const col_menu_lx_label = newE("div", "col_menu_lx_label", "col-auto")
        col_menu_lx_label.textContent = "Lexema base"
        row_lx_label.appendChild(col_menu_lx_label)

        const col_lx_value = newE("div", "col_lx_value", "col")
        row_lx.appendChild(col_lx_value)

        const row_lx_values = newE("div", "row_lx_values", "align-items-center div-fluid")
        col_lx_value.appendChild(row_lx_values)

        const col_lx_ini = newE("div", "col_lx_ini", "div fs-5 me-1")
        col_lx_ini.style.width="2px"
        col_lx_ini.textContent=entrada.lexeme.ini
        row_lx_values.appendChild(col_lx_ini)

        const col_lx = newE("div", "col_lx", "div")
        row_lx_values.appendChild(col_lx)

        const col_lx_fin = newE("div", "col_lx_fin", "div fs-5")
        col_lx_fin.textContent=entrada.lexeme.fin
        row_lx_values.appendChild(col_lx_fin)

        const input_lx_value = newE("span", "input_lx_value", "fs-5 fw-bold input input-flat-dicc")
        input_lx_value.role="textbox"
        input_lx_value.setAttribute("contenteditable", "")
        col_lx.appendChild(input_lx_value)
        input_lx_value.textContent = entrada.lexeme.lx
        input_lx_value.oninput = () => {
            entrada.lexeme.lx = input_lx_value.textContent
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            byE("p-" + entrada.key).textContent = entrada.lexeme.ini +input_lx_value.textContent+entrada.lexeme.fin
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
        _put_morfema()
        function _put_morfema() {
            const row_cat = newE("div", randomKey(10, '12345abcde'), "row align-items-end mt-3")
            div_lx.appendChild(row_cat)

            const col_cat_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_cat.appendChild(col_cat_label)

            const row_cat_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_cat_label.appendChild(row_cat_label)

            const col_menu_cat = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_cat_label.appendChild(col_menu_cat)

            const btn_menu_cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_cat.setAttribute("data-bs-toggle", "dropdown")
            col_menu_cat.appendChild(btn_menu_cat)

            const ul_menu_cat = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_cat.appendChild(ul_menu_cat)

            const div_visible_cat = newE("div", randomKey(10, '12345abcde'), "form-check")
            ul_menu_cat.appendChild(div_visible_cat)

            const item_applyTo = newE("div", randomKey(10, '12345abcde'), "item-menu")
            item_applyTo.textContent = "Aplicar a"
            ul_menu_cat.appendChild(item_applyTo)

            const int_visible_cat = newE("input", randomKey(10, '12345abcde'), "form-check-input-check")
            int_visible_cat.type = "checkbox"
            div_visible_cat.appendChild(int_visible_cat)

            const int_visiblecat_label = newE("label", randomKey(10, '12345abcde'), "form-check-label ms-2")
            int_visiblecat_label.for = "int_visible_cat"
            int_visiblecat_label.textContent = "Visible"
            div_visible_cat.appendChild(int_visiblecat_label)


            int_visible_cat.checked = entrada["clase-morfema"].visible
            int_visible_cat.onchange = () => {
                entrada["clase-morfema"].visible = int_visible_cat.checked
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_lexicon_edit(entrada)
            }

            const col_menu_cat_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
            col_menu_cat_label.textContent = "Tipo de morfema"
            row_cat_label.appendChild(col_menu_cat_label)

            const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
            row_cat.appendChild(col_cat_value)

            const input_morfema_value = newE("select", "input_morfema_value", "input-flat-dicc")
            col_cat_value.appendChild(input_morfema_value)

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

                //Cmabia las marcas de afijos del lexema
                col_lx_ini.textContent=filter_morfema[0].estructura.fin
                col_lx_fin.textContent=filter_morfema[0].estructura.ini
                entrada.lexeme.ini=filter_morfema[0].estructura.fin
                entrada.lexeme.fin=filter_morfema[0].estructura.ini

                //Modifica el item de la lista pero con las marcas de afijo
                byE("p-" + entrada.key).textContent = entrada.lexeme.ini +input_lx_value.textContent+entrada.lexeme.fin
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])

            }

            const div_lx_applyTo = newE("div", randomKey(10, '12345abcde'), "")
            div_lx.appendChild(div_lx_applyTo)

            if (entrada["clase-morfema"].applayTo.visible == true) {
                _ver_applyTo()
                item_applyTo.textContent = "Ocultar aplicar a"
            }
            function _ver_applyTo() {
                div_lx_applyTo.innerHTML = ""

                const row_cat = newE("div", randomKey(10, '12345abcde'), "row align-items-end mt-2")
                div_lx_applyTo.appendChild(row_cat)

                const col_row_cat_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
                row_cat.appendChild(col_row_cat_label)

                const row_cat_label = newE("div", randomKey(10, '12345abcde'), "row align-items-end")
                col_row_cat_label.appendChild(row_cat_label)

                const col_menu_cat = newE("div", randomKey(10, '12345abcde'), "col-auto")
                row_cat_label.appendChild(col_menu_cat)

                const btn_menu_cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx text-white")
                col_menu_cat.appendChild(btn_menu_cat)

                const col_menu_cat_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
                col_menu_cat_label.textContent = "Aplicar a"
                row_cat_label.appendChild(col_menu_cat_label)

                const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
                row_cat.appendChild(col_cat_value)

                const row_cat_value = newE("div", randomKey(10, '12345abcde'), "row align-items-end")
                col_cat_value.appendChild(row_cat_value)

                const col_cat_values = newE("div", randomKey(10, '12345abcde'), "col")
                row_cat_value.appendChild(col_cat_values)

                const div_cat_values = newE("div", "div_values_applyTo", "input-flat-dicc div-fluid")
                col_cat_values.appendChild(div_cat_values)

                const col_cat_items = newE("div", randomKey(10, '12345abcde'), "col-auto")
                row_cat_value.appendChild(col_cat_items)

                const btn_menu_cat_items = newE("button", randomKey(10, '12345abcde'), "btn btn-light btn-sm fw-bold")
                btn_menu_cat_items.type = "button"
                btn_menu_cat_items.textContent = "..."
                btn_menu_cat_items.setAttribute("data-bs-toggle", "modal")
                btn_menu_cat_items.setAttribute("data-bs-target", "#open_modal")
                col_cat_items.appendChild(btn_menu_cat_items)

                btn_menu_cat_items.onclick = () => {
                    byE("class_modal_open").className = "modal-dialog"
                    _open_aplicarA()
                }


                //entrada["clase-morfema"].applayTo.categoria

                if (entrada["clase-morfema"].applayTo.categoria.length != 0) {
                    const values = entrada["clase-morfema"].applayTo.categoria
                    const div_f = byE("div_values_applyTo")
                    div_f.innerHTML = ""
                    const valores = newE("div", randomKey(10, '12345abcde'))
                    valores.innerHTML = `
                    <b class="fs-5">${values.value_ini}${values.mark_ini}</b>
                    [${values.categoria}]
                    <b class="fs-5">${values.mark_fin}${values.value_fin}</b>
                    `
                    div_f.appendChild(valores)

                    const div_borrar = newE("div", randomKey(10, '12345abcde'), "ms-2 bi bi-x-circle-fill btn-context-lx")
                    div_f.appendChild(div_borrar)
                    div_borrar.onclick = () => {
                        entrada["clase-morfema"].applayTo.categoria = []
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        div_f.innerHTML = ""
                    }
                }

            }

            //Activa o visualiza la entrada de aplicar a
            item_applyTo.onclick = () => {
                if (entrada["clase-morfema"].applayTo.visible == false) {
                    item_applyTo.textContent = "Ocultar aplicar a"
                    div_lx_applyTo.innerHTML = ""
                    entrada["clase-morfema"].applayTo.visible = true
                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                    _ver_applyTo()
                } else {
                    item_applyTo.textContent = "Aplicar a"
                    entrada["clase-morfema"].applayTo.visible = false
                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                    div_lx_applyTo.innerHTML = ""
                }
            }

            _open_aplicarA()
            function _open_aplicarA() {

                byE("config_titulo").textContent = "Aplicar a categoría"
                const modal_panel_gonfig = byE("modal_panel_gonfig")
                modal_panel_gonfig.innerHTML = ""

                const sm_buscar = newE("small", randomKey(10, '12345abcde'), "fw-bold")
                sm_buscar.textContent = "Seleccionar categoria"
                modal_panel_gonfig.appendChild(sm_buscar)

                //Creamos un contenedor de categorías
                const div_resultados = newE("div", randomKey(10, '12345abcde'), "menu-group-scroll-lg")
                modal_panel_gonfig.appendChild(div_resultados)

                _make_tree_ps()
                let cat_sel
                function _make_tree_ps() {
                    if (verificar_datos(global_proyecto["TABLAS"].CATGRAMATICAL) == true) {

                        let tabla_categorias = global_proyecto["TABLAS"]["CATGRAMATICAL"]
                        const panel_list = div_resultados

                        panel_list.innerHTML = ""

                        tabla_categorias.forEach(cat => {
                            const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                            item_collapse_categoria.style.height = "30px"
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

                            const col_collapse_name = newE("div", "categoria" + cat.key, "col item-tree")
                            col_collapse_name.textContent = cat.nombre[0].texto
                            item_collapse_categoria.appendChild(col_collapse_name)

                            col_collapse_name.onclick = () => {
                                _put_ps(cat)
                            }

                            const div_collapse_subcategoria = newE("div", "collapse_ps" + cat.key, "collapse show")
                            panel_list.appendChild(div_collapse_subcategoria)

                            cat.subcategorias.forEach(sub_B => {
                                const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                                item_collapse_categoria.style.height = "30px"
                                div_collapse_subcategoria.appendChild(item_collapse_categoria)

                                const col_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree ms-2")
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

                                const col_collapse_name = newE("div", "categoria" + sub_B.key, "col item-tree")
                                col_collapse_name.textContent = sub_B.nombre[0].texto
                                item_collapse_categoria.appendChild(col_collapse_name)

                                let ii = sub_B.key
                                let campo = sub_B
                                col_collapse_name.onclick = () => {
                                    _put_ps(sub_B)
                                }
                                const div_collapse_ABC = newE("div", "collapse_ps" + sub_B.key, "collapse show")
                                item_collapse_categoria.appendChild(div_collapse_ABC)
                                sub_B.subcategorias.forEach(sub_C => {
                                    const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                                    item_collapse_categoria.style.height = "30px"
                                    div_collapse_ABC.appendChild(item_collapse_categoria)

                                    const col_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree ms-2")
                                    col_plus_b.textContent = "-"
                                    col_plus_b.setAttribute("data-bs-toggle", "collapse")
                                    col_plus_b.setAttribute("data-bs-target", "#collapse_ps" + sub_C.key)
                                    item_collapse_categoria.appendChild(col_plus_b)

                                    col_plus_b.onclick = () => {
                                        if (col_plus_b.textContent == "+") {
                                            col_plus_b.textContent = "-"
                                        } else if (col_collapse_plus.textContent == "-") {
                                            col_plus_b.textContent = "+"
                                        }
                                    }

                                    const col_collapse_name = newE("div", "categoria" + sub_C.key, "col item-tree")
                                    col_collapse_name.textContent = sub_C.nombre[0].texto
                                    item_collapse_categoria.appendChild(col_collapse_name)

                                    let iii = sub_C.key
                                    let campo = sub_C
                                    col_collapse_name.onclick = () => {
                                        _put_ps(sub_C)
                                    }
                                })
                            })

                        })

                        function _put_ps(categoria) {
                            cat_sel = {
                                "categoria": categoria.nombre[0].texto,
                                "abreviacion": categoria.abreviaciones[0].texto
                            }

                            _change_forma()
                        }

                    }
                }

                const sm_forma = newE("small", randomKey(10, '12345abcde'), "fw-bold mt-2")
                sm_forma.textContent = "Estructura"
                modal_panel_gonfig.appendChild(sm_forma)

                const div_forma = newE("div", randomKey(10, '12345abcde'), "mt-2 bg-secondary p-2 text-white text-center")
                div_forma.textContent = "[CAT]"
                modal_panel_gonfig.appendChild(div_forma)


                let applyTo_value = []
                function _change_forma() {
                    div_forma.innerHTML = ""
                    const filter_morf = global_proyecto["TABLAS"].MORFEMAS.filter(ele => ele.abreviacion == entrada["clase-morfema"].abreviacion)

                    if (filter_morf[0].estructura.ini != "" && filter_morf[0].estructura.fin == "") {
                        div_forma.innerHTML = `<b class="fs-5">${entrada.lexeme.lx}</b>{${cat_sel.abreviacion}}`
                        applyTo_value = {
                            "value_ini": entrada.lexeme.lx,
                            "mark_ini": filter_morf[0].estructura.ini,
                            "categoria": cat_sel.abreviacion,
                            "mark_fin": "",
                            "value_fin": "",

                        }
                    } else if (filter_morf[0].estructura.ini == "" && filter_morf[0].estructura.fin != "") {
                        div_forma.innerHTML = `{${cat_sel.abreviacion}}<b class="fs-5">${entrada.lexeme.lx}</b>`
                        applyTo_value = {
                            "value_ini": "",
                            "mark_ini": "",
                            "categoria": cat_sel.abreviacion,
                            "mark_fin": filter_morf[0].estructura.fin,
                            "value_fin": entrada.lexeme.lx,

                        }

                    }
                    else if (filter_morf[0].estructura.ini != "" && filter_morf[0].estructura.fin != "") {
                        div_forma.innerHTML = `{${cat_sel.abreviacion}}<b class="fs-5">${entrada.lexeme.lx}</b>{${cat_sel.abreviacion}}`
                        applyTo_value = {
                            "value_ini": cat_sel.abreviacion,
                            "mark_ini": filter_morf[0].estructura.ini,
                            "categoria": entrada.lexeme.lx,
                            "mark_fin": filter_morf[0].estructura.fin,
                            "value_fin": cat_sel.abreviacion,
                        }
                    }
                    else if (filter_morf[0].estructura.ini == "" && filter_morf[0].estructura.fin == "") {
                    }
                }

                byE("btnAceptar_open").onclick = () => {
                    const div_f = byE("div_values_applyTo")
                    div_f.innerHTML = ""
                    const valores = newE("div", randomKey(10, '12345abcde'))
                    valores.innerHTML = `
                    <b class="fs-5">${applyTo_value.value_ini}${applyTo_value.mark_ini}</b>
                    [${applyTo_value.categoria}]
                    <b class="fs-5">${applyTo_value.mark_fin}${applyTo_value.value_fin}</b>
                    `
                    div_f.appendChild(valores)
                    entrada["clase-morfema"].applayTo.categoria = applyTo_value
                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])

                    const div_borrar = newE("div", randomKey(10, '12345abcde'), "ms-2 bi bi-x-circle-fill btn-context-lx")
                    div_f.appendChild(div_borrar)
                    div_borrar.onclick = () => {
                        entrada["clase-morfema"].applayTo.categoria = []
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        div_f.innerHTML = ""
                    }
                }

            }

        }


        /////////////////////////////////////////////////////////////////
        ///Configuración contextos de aparición
        if (entrada["clase-contexto"].visible == true) {
            const row_contexto = newE("div", randomKey(10, '12345abcde'), "row align-items-end mt-2")
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

            const row_contexto_value = newE("div", randomKey(10, '12345abcde'), "row align-items-end")
            col_contexto_value.appendChild(row_contexto_value)

            const col_contexto_values = newE("div", randomKey(10, '12345abcde'), "col")
            row_contexto_value.appendChild(col_contexto_values)

            const div_contexto_values = newE("div", randomKey(10, '12345abcde'), "col div-fluid input-flat-dicc")
            col_contexto_values.appendChild(div_contexto_values)

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
                    div_contexto_values.innerHTML = ""
                    entrada["clase-contexto"].contextos.forEach(contexto => {
                        const div_contexto = newE("div", "div_contexto" + contexto.nombre, "div-fluid me-4")
                        div_contexto.style.width = "50px"
                        div_contexto.textContent = contexto.contexto

                        const div_borrar = newE("div", "div_borrar" + contexto.nombre, "ms-2 bi bi-x-circle-fill btn-context-lx")
                        div_contexto.appendChild(div_borrar)
                        div_contexto_values.appendChild(div_contexto)

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

        /////////////////////////////////////////////////////////////////
        ///Configuración varaiciones de palabra
        if (entrada["clase-varianteOf"].visible == true) {
            const row_varianteOf = newE("div", randomKey(10, '12345abcde'), "row align-items-end mt-2")
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

            const row_varianteOf_value = newE("div", randomKey(10, '12345abcde'), "row align-items-end")
            col_variateOf_value.appendChild(row_varianteOf_value)

            const col_variateOf_values = newE("div", randomKey(10, '12345abcde'), "col")
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
                    const div_valores = newE("div", randomKey(10, '12345abcde'), "input-flat-dicc div-fluid")
                    col_variateOf_values.appendChild(div_valores)

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
                        div_valores.appendChild(div_cat)
                        div_valores.appendChild(div_borrar)

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
        /////////////////////////////////////////////////////////////////
        ///Configuración etimologìa de palabra
        if (entrada["clase-etimologia"].visible == true) {
            const row_cat = newE("div", randomKey(10, '12345abcde'), "row align-items-end mt-2")
            div_lx.appendChild(row_cat)

            const col_row_cat_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_cat.appendChild(col_row_cat_label)

            const row_cat_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_row_cat_label.appendChild(row_cat_label)

            const col_menu_cat = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_cat_label.appendChild(col_menu_cat)

            const btn_menu_Cat = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx")
            btn_menu_Cat.setAttribute("data-bs-toggle", "dropdown")
            col_menu_cat.appendChild(btn_menu_Cat)

            const ul_menu_Cat = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
            col_menu_cat.appendChild(ul_menu_Cat)

            const div_visible_Cat = newE("div", randomKey(10, '12345abcde'), "form-check")
            ul_menu_Cat.appendChild(div_visible_Cat)

            const int_visible_Cat = newE("input", randomKey(10, '12345abcde'), "form-check-input-check")
            int_visible_Cat.type = "checkbox"
            div_visible_Cat.appendChild(int_visible_Cat)


            const int_visibleCat_label = newE("label", randomKey(10, '12345abcde'), "form-check-label ms-2")
            int_visibleCat_label.for = "int_visible_Cat"
            int_visibleCat_label.textContent = "Visible"
            div_visible_Cat.appendChild(int_visibleCat_label)


            int_visible_Cat.checked = entrada["clase-etimologia"].visible
            int_visible_Cat.onchange = () => {
                entrada["clase-etimologia"].visible = int_visible_Cat.checked
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                _make_lexicon_edit(entrada)
            }

            const col_menu_Cat_label = newE("div", randomKey(10, '12345abcde'), "col-auto")
            col_menu_Cat_label.textContent = "Etimología"
            row_cat_label.appendChild(col_menu_Cat_label)

            const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
            row_cat.appendChild(col_cat_value)

            const row_Cat_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_cat_value.appendChild(row_Cat_value)

            const col_cat_values = newE("div", randomKey(10, '12345abcde'), "col")
            row_Cat_value.appendChild(col_cat_values)

            const row_forma_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_cat_values.appendChild(row_forma_value)

            const col_forma_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small text-white")
            col_forma_lng.textContent = global_proyecto["PROYECTO"].cod_idioma
            //row_forma_value.appendChild(col_forma_lng)

            const col_forma_text = newE("div", randomKey(10, '12345abcde'), "col")
            row_forma_value.appendChild(col_forma_text)

            const int_forma = newE("input", randomKey(10, '12345abcde'), "input-flat-dicc")
            int_forma.type = "text"
            col_forma_text.appendChild(int_forma)

            int_forma.value = entrada["clase-etimologia"].forma
            int_forma.onchange = () => {
                entrada["clase-etimologia"].forma = int_forma.value
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            }

            const row_glosaas = newE("div", randomKey(10, '12345abcde'), "row align-items-center mt-2")
            div_lx.appendChild(row_glosaas)

            const col_glosas_label = newE("div", randomKey(10, '12345abcde'), "col-3 label-wrap")
            row_glosaas.appendChild(col_glosas_label)

            const row_glosas_label = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
            col_glosas_label.appendChild(row_glosas_label)

            const col_menu_glosas = newE("div", randomKey(10, '12345abcde'), "col-auto")
            row_glosas_label.appendChild(col_menu_glosas)

            const btn_menu_glosas = newE("div", randomKey(10, '12345abcde'), "bi bi-arrow-down-circle-fill btn-context-lx text-white")
            //btn_menu_glosas.setAttribute("data-bs-toggle", "dropdown")
            col_menu_glosas.appendChild(btn_menu_glosas)

            const glosas_label = newE("div", randomKey(10, '12345abcde'), "col")
            glosas_label.textContent = "Glosas"
            row_glosas_label.appendChild(glosas_label)


            const glosas_values = newE("div", randomKey(10, '12345abcde'), "col")
            row_glosaas.appendChild(glosas_values)

            entrada["clase-etimologia"].glosas.traduccion.forEach(_lng => {
                const filter_trad = global_proyecto["PROYECTO"].Lngtraducion.filter(l => l.abreviacion == _lng.abreviacion)

                if (filter_trad[0].visible == true) {
                    const row_cat_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                    glosas_values.appendChild(row_cat_values_lng)

                    const col_cat_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small")
                    col_cat_label_lng.textContent = _lng.abreviacion
                    row_cat_values_lng.appendChild(col_cat_label_lng)

                    const col_cat_value_lng = newE("div", randomKey(10, '12345abcde'), "col")
                    row_cat_values_lng.appendChild(col_cat_value_lng)

                    const int_cat_value_lng = newE("input", randomKey(10, '12345abcde'), "input-flat-dicc fst-italic")
                    //int_cat_value_lng.rows = 1
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


            //const filter_trad = global_proyecto["PROYECTO"].Lngtraducion.filter(l => l.abreviacion == _lng.abreviacion)
            //if (filter_trad[0].visible == true){

            //}



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
            _make_sentido()
            function _make_sentido() {
                div_sentidos_list.innerHTML = ""
                //Miramos los sentidos que están en esta entra
                let tabla_sentidos = entrada["clase-sn"].sentidos
                //Creamos una línea de sentido tipo collapse

                let s = 0
                tabla_sentidos.forEach(sn => {
                    const row_tool_sn = newE("div", randomKey(10, '12345abcde'), "row btn-collapse-sn mt-3")
                    div_sentidos_list.appendChild(row_tool_sn)

                    const col_tool_label = newE("div", randomKey(10, '12345abcde'), "col")
                    row_tool_sn.appendChild(col_tool_label)

                    const col_btns_sn = newE("div", randomKey(10, '12345abcde'), "col div-fluid-rg")
                    row_tool_sn.appendChild(col_btns_sn)

                    const btn_eliminar_sn = newE("div", randomKey(10, '12345abcde'), "item-texto-small me-2")
                    btn_eliminar_sn.textContent = "Eliminar entrada"
                    col_btns_sn.appendChild(btn_eliminar_sn)

                    btn_eliminar_sn.onclick = () => {

                        const filter_del = tabla_sentidos.filter(ele => ele.key != sn.key)
                        entrada["clase-sn"].sentidos = filter_del
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        _make_sentido()


                    }


                    const btn_agregar_ejemplo = newE("div", randomKey(10, '12345abcde'), "item-texto-small me-2")
                    btn_agregar_ejemplo.textContent = "Agregar ejemplo +"
                    col_btns_sn.appendChild(btn_agregar_ejemplo)

                    btn_agregar_ejemplo.onclick = () => {
                        sn.ex.push(template_ex())
                        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                        _crear_exs()
                    }


                    const btn_sn_collapse = newE("div", randomKey(10, '12345abcde'), "")
                    btn_sn_collapse.setAttribute("data-bs-toggle", "collapse")
                    btn_sn_collapse.setAttribute("data-bs-target", "#collapse_sn" + s)
                    btn_sn_collapse.textContent = "Sentido " + (s + 1)
                    col_tool_label.appendChild(btn_sn_collapse)

                    const div_sn_collapse = newE("div", "collapse_sn" + s, "collapse show ms-4")
                    div_sentidos_list.appendChild(div_sn_collapse)

                    _crear_gns()
                    function _crear_gns() {
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
                                int_cat_value_lng.rows = 1
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

                    _crear_pss()
                    function _crear_pss() {
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
                        div_col_catLabel.textContent = "Cat. gramatical"
                        col_row_catLabel.appendChild(div_col_catLabel)

                        const col_ps_value = newE("div", randomKey(10, '12345abcde'), "col")
                        row_cat.appendChild(col_ps_value)

                        const row_ps_value = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                        col_ps_value.appendChild(row_ps_value)

                        ////////////////////////////////////////////////
                        const col_ps_values = newE("div", randomKey(10, '12345abcde'), "col div-fluid fw-bold ms-5")
                        try {
                            col_ps_values.innerHTML = `<b class="me-3">${sn.ps.nombres[0].texto}</b> [<i>${sn.ps.abreviaciones[0].texto}</i>]`
                        } catch (error) {
                            col_ps_values.textContent = "Indefinido"
                        }

                        row_ps_value.appendChild(col_ps_values)

                        const col_ps_items = newE("div", randomKey(10, '12345abcde'), "col-auto dropstart")
                        row_ps_value.appendChild(col_ps_items)

                        const btn_menu_ps_items = newE("button", randomKey(10, '12345abcde'), "btn btn-light btn-sm fw-bold")
                        btn_menu_ps_items.type = "button"
                        btn_menu_ps_items.textContent = "..."
                        btn_menu_ps_items.setAttribute("data-bs-toggle", "dropdown")
                        col_ps_items.appendChild(btn_menu_ps_items)

                        const ul_menu_ps = newE("ul", randomKey(10, '12345abcde'), "dropdown-menu shadow")
                        ul_menu_ps.style.width = "300px"
                        col_ps_items.appendChild(ul_menu_ps)

                        ul_menu_ps.onclick = (e) => {
                            e.stopPropagation();
                        }

                        const div_menu_ps = newE("div", randomKey(10, '12345abcde'), "m-3 menu-group-scroll div-categoria")
                        ul_menu_ps.appendChild(div_menu_ps)

                        _make_tree_ps()
                        function _make_tree_ps() {
                            if (verificar_datos(global_proyecto["TABLAS"].CATGRAMATICAL) == true) {

                                let tabla_categorias = global_proyecto["TABLAS"]["CATGRAMATICAL"]
                                const panel_list = div_menu_ps

                                panel_list.innerHTML = ""

                                tabla_categorias.forEach(cat => {
                                    const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                                    item_collapse_categoria.style.height = "30px"
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

                                    const col_collapse_name = newE("div", "categoria" + cat.key, "col item-tree")
                                    col_collapse_name.textContent = cat.nombre[0].texto
                                    item_collapse_categoria.appendChild(col_collapse_name)

                                    col_collapse_name.onclick = () => {
                                        _put_ps(cat)
                                    }

                                    const div_collapse_subcategoria = newE("div", "collapse_ps" + cat.key, "collapse show")
                                    panel_list.appendChild(div_collapse_subcategoria)

                                    cat.subcategorias.forEach(sub_B => {
                                        const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                                        item_collapse_categoria.style.height = "30px"
                                        div_collapse_subcategoria.appendChild(item_collapse_categoria)

                                        const col_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree ms-2")
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

                                        const col_collapse_name = newE("div", "categoria" + sub_B.key, "col item-tree")
                                        col_collapse_name.textContent = sub_B.nombre[0].texto
                                        item_collapse_categoria.appendChild(col_collapse_name)

                                        let ii = sub_B.key
                                        let campo = sub_B
                                        col_collapse_name.onclick = () => {
                                            _put_ps(sub_B)
                                        }
                                        const div_collapse_ABC = newE("div", "collapse_ps" + sub_B.key, "collapse show")
                                        item_collapse_categoria.appendChild(div_collapse_ABC)
                                        sub_B.subcategorias.forEach(sub_C => {
                                            const item_collapse_categoria = newE("div", randomKey(10, '12345abcde'), "row align-items-center")
                                            item_collapse_categoria.style.height = "30px"
                                            div_collapse_ABC.appendChild(item_collapse_categoria)

                                            const col_plus_b = newE("div", randomKey(10, '12345abcde'), "col-auto plus-tree ms-2")
                                            col_plus_b.textContent = "-"
                                            col_plus_b.setAttribute("data-bs-toggle", "collapse")
                                            col_plus_b.setAttribute("data-bs-target", "#collapse_ps" + sub_C.key)
                                            item_collapse_categoria.appendChild(col_plus_b)

                                            col_plus_b.onclick = () => {
                                                if (col_plus_b.textContent == "+") {
                                                    col_plus_b.textContent = "-"
                                                } else if (col_collapse_plus.textContent == "-") {
                                                    col_plus_b.textContent = "+"
                                                }
                                            }

                                            const col_collapse_name = newE("div", "categoria" + sub_C.key, "col item-tree")
                                            col_collapse_name.textContent = sub_C.nombre[0].texto
                                            item_collapse_categoria.appendChild(col_collapse_name)

                                            let iii = sub_C.key
                                            let campo = sub_C
                                            col_collapse_name.onclick = () => {
                                                _put_ps(sub_C)
                                            }
                                            //const div_collapse_ABC = newE("div", "collapse_ps" + sub_C.key, "collapse show ms-3")
                                            //item_collapse_categoria.appendChild(div_collapse_ABC)
                                        })
                                    })

                                })

                                function _put_ps(categoria) {
                                    const new_ps = {
                                        "nombres": categoria.nombre,
                                        "abreviaciones": categoria.abreviaciones
                                    }
                                    sn.ps = new_ps
                                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                    col_ps_values.innerHTML = `<b class="me-3">${sn.ps.nombres[0].texto}</b> [<i>${sn.ps.abreviaciones[0].texto}</i>]`

                                }

                            }
                        }


                    }

                    const div_sec_ejemplos = newE("div", randomKey(10, '12345abcde'), "")
                    div_sn_collapse.appendChild(div_sec_ejemplos)
                    _crear_exs()
                    function _crear_exs() {
                        div_sec_ejemplos.innerHTML = ""

                        if (sn.ex.length != 0) {
                            const div_titulo = newE("div", randomKey(10, '12345abcde'), "sub-labels")
                            div_titulo.textContent = "Ejemplos"
                            div_sec_ejemplos.appendChild(div_titulo)

                            const div_ejemplos = newE("div", randomKey(10, '12345abcde'), "ms-2 mt-2")
                            div_sec_ejemplos.appendChild(div_ejemplos)
                            let e = 1
                            sn.ex.forEach(ej => {
                                const row_cat = newE("div", randomKey(10, '12345abcde'), "row")
                                div_ejemplos.appendChild(row_cat)

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

                                const div_del_item = newE("div", randomKey(10, '12345abcde'), "item-menu")
                                div_del_item.textContent = "Eliminar ejemplo"
                                ul_menu_cat.appendChild(div_del_item)

                                div_del_item.onclick = () => {
                                    const filter_del = sn.ex.filter(ele => ele.key != ej.key)
                                    sn.ex = filter_del
                                    _crear_exs()
                                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                }

                                const col_row_catLabel = newE("div", randomKey(10, '12345abcde'), "col-auto")
                                row_cat_menu.appendChild(col_row_catLabel)

                                const div_col_catLabel = newE("div", randomKey(10, '12345abcde'), "sub-labels")
                                div_col_catLabel.textContent = "Ejemplo " + e
                                col_row_catLabel.appendChild(div_col_catLabel)
                                e++

                                const col_cat_value = newE("div", randomKey(10, '12345abcde'), "col")
                                row_cat.appendChild(col_cat_value)

                                //Escribe la rutina de colocar el ejemplo en el idioma
                                const row_exe_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                                col_cat_value.appendChild(row_exe_values_lng)

                                const col_exe_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small text-white")
                                col_exe_label_lng.textContent = global_proyecto["PROYECTO"].cod_idioma
                                row_exe_values_lng.appendChild(col_exe_label_lng)

                                const col_exe_value_lng = newE("div", randomKey(10, '12345abcde'), "col")
                                row_exe_values_lng.appendChild(col_exe_value_lng)


                                const int_exe_value_lng = newE("textarea", randomKey(10, '12345abcde'), "input-flat-dicc fw-bolder")
                                int_exe_value_lng.rows = 1
                                col_exe_value_lng.appendChild(int_exe_value_lng)

                                int_exe_value_lng.value = ej.texto
                                int_exe_value_lng.onchange = () => {
                                    ej.texto = int_exe_value_lng.value
                                    Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                }

                                //Lineas de variaciones de idioma
                                ej.ejemplo.forEach(_lng => {
                                    const filter_ejemplo = global_proyecto["PROYECTO"].Variantes.filter(l => l.abreviacion == _lng.abreviacion)
                                    if (filter_ejemplo[0].visible == true) {
                                        const row_cat_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                                        col_cat_value.appendChild(row_cat_values_lng)

                                        const col_cat_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small")
                                        col_cat_label_lng.textContent = _lng.abreviacion
                                        row_cat_values_lng.appendChild(col_cat_label_lng)

                                        const col_cat_value_lng = newE("div", randomKey(10, '12345abcde'), "col ms-2")
                                        row_cat_values_lng.appendChild(col_cat_value_lng)

                                        const int_cat_value_lng = newE("textarea", randomKey(10, '12345abcde'), "input-flat-dicc fst-italic")
                                        int_cat_value_lng.rows = 1
                                        int_cat_value_lng.style.color = filter_ejemplo[0].style["font-color"]
                                        int_cat_value_lng.style.fontSize = filter_ejemplo[0].style["font-size"]
                                        col_cat_value_lng.appendChild(int_cat_value_lng)

                                        int_cat_value_lng.value = _lng.texto
                                        int_cat_value_lng.onchange = () => {
                                            _lng.texto = int_cat_value_lng.value
                                            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
                                        }

                                    }

                                })
                                ej.traduccion.forEach(_lng => {
                                    const filter_trad = global_proyecto["PROYECTO"].Lngtraducion.filter(l => l.abreviacion == _lng.abreviacion)
                                    if (filter_trad[0].visible == true) {
                                        const row_cat_values_lng = newE("div", randomKey(10, '12345abcde'), "row")
                                        col_cat_value.appendChild(row_cat_values_lng)

                                        const col_cat_label_lng = newE("div", randomKey(10, '12345abcde'), "col-auto tag-small")
                                        col_cat_label_lng.textContent = _lng.abreviacion
                                        row_cat_values_lng.appendChild(col_cat_label_lng)

                                        const col_cat_value_lng = newE("div", randomKey(10, '12345abcde'), "col")
                                        row_cat_values_lng.appendChild(col_cat_value_lng)

                                        const int_cat_value_lng = newE("textarea", randomKey(10, '12345abcde'), "input-flat-dicc fst-italic")
                                        int_cat_value_lng.rows = 1
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




                            })


                        }

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


function _delete_registro(DATA, CAMPO, ID) {
    const filter = DATA.filter(ele => ele[CAMPO] !== ID)
    return filter
}

