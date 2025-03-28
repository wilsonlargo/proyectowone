

function make_text_editor() {
    try {
        byE("Nombre_proyecto").textContent = global_proyecto.PROYECTO.nombre + "- Textos"
        if (verificar_datos(global_proyecto["PARSER-WORD"]) == false) {

            global_proyecto["PARSER-WORD"] = {
                "PARSER": []
            }
            newDataTable(global_proyecto["PARSER-WORD"], "PARSER-WORD")

        }
    } catch (error) {
        byE("Nombre_proyecto").textContent = "- Textos"
    }
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
            newDataTable(template_text(), "TETX-" + randomKey(5, '12345abcde'))
            open_text_data()
        }

        const bt_del = newE("div", "bt_delete_texto", "btn btn-secondary org-btn-tool bi bi-trash3-fill")
        bts_adddel.appendChild(bt_del)

        const col_move = newE("div", "col_move", "col-auto")
        row_toolbar.appendChild(col_move)

        const bts_move = newE("div", "bts_move", "btn-group")
        bts_move.role = "group"
        col_move.appendChild(bts_move)


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
            byE("btnAceptar_open").onclick = () => {
                _make_item_list()
            }
        }

        ul_menu_config.appendChild(item_variantes)

        const item_idioma_analisis = newE("div", "item_idioma_analisis", "item-menu")
        item_idioma_analisis.textContent = "Idiomas de análisis"
        item_idioma_analisis.setAttribute("data-bs-toggle", "modal")
        item_idioma_analisis.setAttribute("data-bs-target", "#open_modal")
        item_idioma_analisis.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_idioma_analisis()
            byE("btnAceptar_open").onclick = () => {
                _make_item_list()
            }
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
            byE("btnAceptar_open").onclick = () => {
                _make_item_list()
            }
        }

        const item_contexto = newE("div", "item_contexto", "item-menu")
        item_contexto.textContent = "Tipos de contexto"
        item_contexto.setAttribute("data-bs-toggle", "modal")
        item_contexto.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_contexto)
        item_contexto.onclick = () => {
            byE("class_modal_open").className = "modal-dialog"
            config_contexto()
            byE("btnAceptar_open").onclick = () => {
                _make_item_list()
            }
        }

        const item_ps = newE("div", "item_ps", "item-menu")
        item_ps.textContent = "Categorías gramaticales"
        item_ps.setAttribute("data-bs-toggle", "modal")
        item_ps.setAttribute("data-bs-target", "#open_modal")
        ul_menu_listas.appendChild(item_ps)
        item_ps.onclick = () => {
            byE("class_modal_open").className = "modal-dialog modal-fullscreen"
            config_gramatical_list()
            byE("btnAceptar_open").onclick = () => {
                _make_item_list()
            }
        }

    }

    const row_panel_text = newEk("div", "row", "")
    panel_escritorio.appendChild(row_panel_text)

    const col_list_text = newEk("div", "col-2 menu-group-scroll-list mt-2", "Sin lista", "list_textos")
    row_panel_text.appendChild(col_list_text)

    const col_edit_text = newEk("div", "col", "Editores", "edit_textos")
    row_panel_text.appendChild(col_edit_text)
    _make_item_list()
}

function _make_item_list() {
    const panel_list = byE("list_textos")
    panel_list.innerHTML = ""
    const panel_edit = byE("edit_textos")
    panel_edit.innerHTML = ""

    let tabla_textos = global_proyecto["TEXTOS"]

    panel_list.innerHTML = ""
    tabla_textos.forEach(texto => {
        const item_text = newEk("div", "item-menu", texto.titulo, texto.id)
        panel_list.appendChild(item_text)
        item_text.onclick = () => {
            _make_edit_text(texto)
        }
    })
    _make_edit_text(tabla_textos[0])
    function _make_edit_text(texto) {
        panel_edit.innerHTML = ""

        _make_info()
        function _make_info() {
            const div_info = newEk("div", "div-categoria mt-2")
            panel_edit.appendChild(div_info)

            const row_info = newEk("div", "row align-items-start", "")
            div_info.appendChild(row_info)

            const col_titulo = newEk("div", "col-2 label-wrap sub-labels", "Título")
            row_info.appendChild(col_titulo)

            const col_titulo_value = newEk("div", "col", "")
            row_info.appendChild(col_titulo_value)

            const row_cat_values_loc = newEk("div", "row")
            col_titulo_value.appendChild(row_cat_values_loc)
            const col_cat_label_lng = newEk("div", "col-auto tag-small")
            try {
                col_cat_label_lng.textContent = global_proyecto["PROYECTO"].cod_idioma
            } catch (error) {
                col_cat_label_lng.textContent = "aaa"
            }


            row_cat_values_loc.appendChild(col_cat_label_lng)

            const col_cat_value_loc = newEk("div", "col")
            row_cat_values_loc.appendChild(col_cat_value_loc)

            const input_titulo = newEk("input", "input-flat-dicc", "")
            col_cat_value_loc.appendChild(input_titulo)

            try {
                input_titulo.value = texto.titulo
            } catch (error) {

            }
            input_titulo.onchange = () => {
                texto.titulo = input_titulo.value
                byE(texto.id).textContent = input_titulo.value
                save_texto(texto)
            }

            const lng_analisis = global_proyecto["PROYECTO"].Lngtraducion
            texto["titulo-traduccion"].forEach(_lng => {
                const filter_trad = lng_analisis.filter(l => l.abreviacion == _lng.abreviacion)
                if (filter_trad[0].visible == true) {

                    const row_cat_values_lng = newEk("div", "row")
                    col_titulo_value.appendChild(row_cat_values_lng)

                    const col_cat_label_lng = newEk("div", "col-auto tag-small", _lng.abreviacion)
                    row_cat_values_lng.appendChild(col_cat_label_lng)

                    const col_cat_value_lng = newEk("div", "col")
                    row_cat_values_lng.appendChild(col_cat_value_lng)

                    const int_cat_value_lng = newEk("input", "input-flat-dicc")
                    int_cat_value_lng.style.color = filter_trad[0].style["font-color"]
                    int_cat_value_lng.style.fontSize = filter_trad[0].style["font-size"]
                    col_cat_value_lng.appendChild(int_cat_value_lng)

                    int_cat_value_lng.value = _lng.texto
                    int_cat_value_lng.onchange = () => {
                        _lng.texto = int_cat_value_lng.value
                        save_texto(texto)
                    }
                }

            })
        }

        _make_tool_analisis()
        function _make_tool_analisis() {
            const div_tool = newEk("div", "mt-2 bg-secondary  div-fluid p-3")
            panel_edit.appendChild(div_tool)

            const btn_toBasicText = newEk("div", "item-texto-small text-white ms-2", "[Texto base]", "btn_textobase")
            div_tool.appendChild(btn_toBasicText)
            btn_toBasicText.onclick = () => {
                _make_text_editor()
            }

            const btn_toParserText = newEk("div", "item-texto-small text-white ms-2", "[Analizar texto]", "btn_analizarTexto")
            div_tool.appendChild(btn_toParserText)
            btn_toParserText.onclick = () => {
                _make_text_parser()
            }


        }

        const div_analisis = newEk("div", "mt-2",)
        panel_edit.appendChild(div_analisis)

        _make_text_editor()
        function _make_text_editor() {
            div_analisis.innerHTML = ""

            const textarea = newEk("textarea", "form-control mt-2")
            textarea.rows = 15
            div_analisis.appendChild(textarea)

            let parrafos = texto.analisis["text-basic"]
            parrafos.forEach(p => {
                textarea.value = textarea.value + p["par-text"] + "\n"
            })
            //Leer todos los párrafos que hay en el text

            textarea.onchange = () => {
                let list_parrafos = []
                const par = textarea.value.split("\n")
                par.forEach(p => {
                    list_parrafos.push(
                        {
                            "key": "par-" + randomKey(10, '12345abcde'),
                            "par-text": p
                        })
                })
                texto.analisis["text-basic"] = list_parrafos
                save_texto(texto)
            }

        }


        function _make_text_parser() {
            div_analisis.innerHTML = ""

            const div_parser = newEk("div", "box-parser")
            div_analisis.appendChild(div_parser)

            let parrafos = texto.analisis["text-basic"]

            parrafos.forEach(p => {
                const palabras = p["par-text"].split(" ")

                _make_words(palabras)

                const p_wor = newEk("div", "w-100")
                p_wor.textContent = "*"
                div_parser.appendChild(p_wor)

            })
           
            function _make_words(palabras) {
                palabras.forEach(w => {
                    if (w != "") {
                        make_w(clear_word(w))

                        function make_w(word_ini) {
                            const c_word = newEk("div", "word-parser")
                            div_parser.appendChild(c_word)

                            const c_word_basic = newEk("div", "ms-3 fw-bold")
                            c_word_basic.textContent = word_ini
                            c_word.appendChild(c_word_basic)

                            const div_1 = newEk("div", "")
                            c_word.appendChild(div_1)

                            const div_11 = newEk("div", "div-fluid")
                            div_1.appendChild(div_11)

                            const col_botones = newEk("div", "mt-1")
                            col_botones.style.width = "11px"
                            div_11.appendChild(col_botones)

                            //Acciones relacionadas con lso cortes de lexemas y lexemas
                            const btn_menu_lexemes = newEk("div", "btn-context-parser text-secondary text-center")
                            btn_menu_lexemes.setAttribute("data-bs-toggle", "dropdown")
                            col_botones.appendChild(btn_menu_lexemes)

                            const ul_menu_lexemes = newEk("ul", "dropdown-menu shadow")
                            col_botones.appendChild(ul_menu_lexemes)


                            //Contenedor de los lexemas o fragmentos de palabra
                            const div_lexemes = newEk("div", "div-fluid align-items-start")
                            div_11.appendChild(div_lexemes)

                            //Contiene el las glosas generales y las categorias generales
                            const div_12 = newEk("div", "div-fluid mt-1")
                            div_1.appendChild(div_12)


                            //Administra la lìnea de glosas, boton, menu e input.
                            const btn_glosas_gen = newEk("div", "btn-context-parser text-secondary text-center")
                            btn_glosas_gen.setAttribute("data-bs-toggle", "dropdown")
                            btn_glosas_gen.style.width = "12px"
                            div_12.appendChild(btn_glosas_gen)

                            const ul_menu_glosas = newEk("ul", "dropdown-menu shadow")
                            div_12.appendChild(ul_menu_glosas)

                            const c_word_glosa_gen = newEk("span", "ms-1 input input-flat-dicc label-cat")
                            c_word_glosa_gen.role = "textbox"
                            c_word_glosa_gen.setAttribute("contenteditable", "")
                            div_12.appendChild(c_word_glosa_gen)

                            //Administra la lìnea de categoria general, boton, menù e input
                            const div_13 = newEk("div", "div-fluid mt-1")
                            div_1.appendChild(div_13)

                            const btn_categorias = newEk("div", "btn-context-parser bi bi-arrow-down-circle-fill")
                            btn_categorias.setAttribute("data-bs-toggle", "dropdown")
                            btn_categorias.style.width = "12px"
                            div_13.appendChild(btn_categorias)

                            const ul_menu_categorias = newEk("ul", "dropdown-menu shadow menu-group-scroll-lg pt-3 p-2")
                            div_13.appendChild(ul_menu_categorias)

                            const c_word_cat = newEk("div", "ms-1 input input-flat-dicc label-cat", "CAT")
                            div_13.appendChild(c_word_cat)

                            //Administra todos los botones parte inferior.
                            const div_14 = newEk("div", "div-fluid-rg mt-1 me-2")
                            div_1.appendChild(div_14)

                            const btn_aprobar = newEk("div", "btn-aprovar-parser bi bi-check-square-fill")
                            div_14.appendChild(btn_aprobar)

                            //Aciones para aprobar una palabra
                            btn_aprobar.onclick = () => {
                                let new_lexemas_flat = ""
                                let new_lexemas_ref = []
                                let new_glosas = []
                                let new_categorias = []
                                let Padre1 = div_lexemes.childNodes;
                                Padre1.forEach(P => {
                                    let child = P.childNodes
                                    child.forEach(C => {
                                        let sub_child = C.childNodes
                                        sub_child.forEach(sc => {
                                            if (sc.id !== undefined) {
                                                if (sc.id.includes("LXID-") == true) {
                                                    new_lexemas_flat = new_lexemas_flat + sc.textContent + " "
                                                    new_lexemas_ref.push(sc.textContent.trim())
                                                } else if (sc.id.includes("LXGN-") == true) {
                                                    new_glosas.push(sc.textContent.trim())
                                                } else if (sc.id.includes("LXPS-") == true) {
                                                    new_categorias.push(sc.textContent.trim())
                                                }
                                            }
                                        })

                                    })
                                })
                                const data = {
                                    "text_ref": texto.id,
                                    "word_basic": w,
                                    "new_lexemas_ref": new_lexemas_ref,
                                    "new_lexemas_flat": new_lexemas_flat,
                                    "glosas": new_glosas,
                                    "categorias": new_categorias,
                                    "glosas_generales": c_word_glosa_gen.textContent,
                                    "categorias_generales": "",
                                }

                                put_analisis(data)
                            }

                            //Administra todos los controles que se encuentran dentro del DIV palabra
                            const controls = {
                                "panel_lexemas": div_lexemes,
                                "btn_lexemas": btn_menu_lexemes,
                                "menu_lexemas": ul_menu_lexemes,

                                "btn_glosas_gen": btn_glosas_gen,
                                "menu_glosas_gen": ul_menu_glosas,
                                "input_glosas_gen": c_word_glosa_gen,

                                "btn_categorias_gen": btn_categorias,
                                "menu_categorias_gen": ul_menu_categorias,
                                "input_categorias_gen": c_word_cat,

                            }
                            //Llama a la funciòn analizar palabra
                            _make_lexema_txt(controls, word_ini)
                        }
                    }
                })
            }

            //Función para analizar palabra
          
            function _make_lexema_txt(controls, word_ini) {
             

                //Ejecuta la función de buscar la palabra en la DB analisis ["PARSER-WORD"]
                const verificar_word = load_analisis(clear_word_2(word_ini))

                //Si la palabra se encuentra entonces proceder a cargar todas las características
                if (verificar_word["includes"] == true) {

                    //Identifica cúal es el indice que se dejó por defecto del análisis
                    const id_active = verificar_word["active-analisis_id"]

                    //Limpiamos todos los menús
                    controls.menu_lexemas.innerHTML = ""
                    //Agregamos un item para resetear la los lexemas
                    const itemBasic = newEk("div", "me-2  item-menu", word_ini)
                    controls.menu_lexemas.appendChild(itemBasic)
                    itemBasic.onclick=()=>{
                        controls.panel_lexemas.innerHTML = ""
                        _make_parser2(itemBasic.textContent,"--","-")
                    }

                    controls.menu_glosas_gen.innerHTML = ""
                    //Cuenta el número de opciones de análisis de morfemas
                    //Es decir recolecta todas las fragmentaciones de palabra posibles.
                    //La información la carga en un botón, indicando cuantas opciones hay y la muestra en un menú
                    controls.btn_lexemas.textContent = verificar_word.count
                    //Para agregar al menu items de lexemas
                    verificar_word.parser.forEach(p => {
                        //P es la opción enumerada, contieno todas las caracteristicas de la palabra
                        const item = newEk("div", "me-2  item-menu", p["lexemas-basic"])
                        //Agrega la opción al menú de lexemas
                        controls.menu_lexemas.appendChild(item)

                        //Al seleccionar una opción de lexemas actualizar en al DB
                        item.onclick = () => {
                            //Limpia los lexemas actuales
                            controls.panel_lexemas.innerHTML = ""

                            //Usa la información de P para actualizar las glosas y categorías generales
                            let gns = p["lexemas-gn"]
                            let pss = p["lexemas-ps"]

                            //Cargamos info de las glosas de esta palabra
                            let adm_glosas = p["glosa-general"]

                            //Verificamos cual es la glosa activa en este momento
                            let glosa_activa = adm_glosas.options[adm_glosas["active-glosa"]]
                            //Recupera la glosa activa en esa palabra y actualiza el input
                            //Esto sucede dentro del menú input


                            //Limpiamos el menú glosas generales
                            controls.menu_glosas_gen.innerHTML = ""

                            //Leemos los datos de las glosas generales dentro de la palabra
                            adm_glosas.options.forEach(g => {
                                //g es cada glosa encontrada
                                const item = newEk("div", "pe-2 item-menu", g.text)
                                //Agregamso al menú la glosa encontrada
                                controls.menu_glosas_gen.appendChild(item)
                                //Al seleccionar una gloas actualizar el input y l aDB
                                item.onclick = () => {
                                    controls.input_glosas_gen.textContent = g.text
                                }
                            })

                            controls.input_glosas_gen.textContent = adm_glosas["active-glosa-text"]

                            //Colocamos cuantas gloas hay para esta palabra
                            controls.btn_glosas_gen.textContent = adm_glosas.options.length
                            //controls.input_glosas_gen.textContent = adm_glosas["active-glosa-text"]
                            _make_parser2(item.textContent, gns, pss)
                        }
                    })

                    //Fuera del menú gloasas
                    //Cargamos info de las glosas de esta palabra
                    let adm_glosas = verificar_word.parser[id_active]["glosa-general"]
                    let glosa_activa = adm_glosas.options[adm_glosas["active-glosa"]]

                    controls.btn_glosas_gen.textContent = adm_glosas.options.length

                    //Actualziamos el menú de las glosas que se cargan de la función load_analisis
                    controls.menu_glosas_gen.innerHTML = ""
                    adm_glosas.options.forEach(g => {
                        const item = newEk("div", "item-menu", g.text)
                        controls.menu_glosas_gen.appendChild(item)
                        item.onclick = () => {
                            controls.input_glosas_gen.textContent = g.text
                        }
                    })

                    controls.input_glosas_gen.textContent = adm_glosas["active-glosa-text"]
                    controls.input_glosas_gen.oninput = () => {
                    }

                    //Ahora de la información obtenida por la función load_analisis
                    //actualizamos los componentes o partes de la palabra,
                    //ya sea un lexemas o varios lexemas, son una matris bidimencional

                    //Carga todos los lexemas del análisis activo [id_active]
                    let w = verificar_word.parser[id_active]["lexemas-basic"]
                    //Todas las glosas de cada lexema
                    let gns = verificar_word.parser[id_active]["lexemas-gn"]
                    //Todas las categorias de cada lexema
                    let pss = verificar_word.parser[id_active]["lexemas-ps"]

                    //Llamamos a la función parser_2, esta se encarga de fragmentar los analisis
                    //por cada lexemamorfema entontrado
                    //            //Usa el campo lexemas basic, y glsos y categorias.
                    _make_parser2(verificar_word.parser[id_active]["lexemas-basic"], gns, pss)

                    //Administramos los datos de la categoría general
                    //esta ación actualiza la información de la categoria general de la palabra
                    //Del análisis activo cargar la categoria
                    const cat_general = verificar_word.parser[id_active]["categoria-general"]
                    //Actualiza el input con el valor de abreviación
                    controls.input_categorias_gen.textContent = cat_general.abreviacion
                    //Al botón de categorias, le asigna un menú arbols para seleccionar la categoria.
                    controls.btn_categorias_gen.onclick = () => {
                        //Contruye el arbol y asigna lso controles que se afectan por esta acción
                        make_ps_tree(controls.menu_categorias_gen, controls.input_categorias_gen, verificar_word.parser[id_active])
                    }
                } else {
                    //Si la palabra no se encuentra en la lista de análisis, proceder sin cortes o cargar

                    //Puede mostrar categorías pero no guarda hasta tener un analisis preliminar.
                    controls.btn_categorias_gen.onclick = () => {
                        make_ps_tree(controls.menu_categorias_gen, controls.input_categorias_gen, "")
                    }
                    //Llama la función de fragmentar palabra para un solo lexema
                    _make_parser2(word_ini)
                }


                //Esta es la función que fragmenta la palabra según datos previos
                //Verfifica si hay separaciones de morfemas [" "]

                
                function _make_parser2(w, gn,ps) {


                    //Guarda un texto actualizado de los analisis realzados
                    let new_text = ""


                    //Fragmenta la palabra por espacios
                    const word_process = w.split(" ")

                    //Cuenta los lexemas separados

                    let contadores_lx = 0
                    word_process.forEach(wp => {
                        
                        //Por cada fragmeto wp, ejecutar una acción

                        //Si la palabra no contiene una puntuación, procede
                        //ESta puntuación se configura en la variable global y allí se ejecuta una acción de
                        //de limpiar palabra.
                        if (lista_puntuacion.includes(wp) == false) { //Variable en módulo global
                            if (wp != "") { //Si el fragmento no está vacio, entonces proceder
                                
                                //micro función para crear un fragmento
                                crear_wp()
                                function crear_wp() {

                                    //A cada fragmento le asignamos un contenedor
                                    const lx_div = newEk("div", "me-2")
                                    //Y lo colocamso en el contenedor de lexemas
                                    controls.panel_lexemas.appendChild(lx_div)

                                    //Se crea un input editable para modificar la entrada
                                    //Es un control que se ajusta al tamaño de la palabra
                                    //Lo marca con un  id automatico pero que tenga el prefijo "LX-"
                                    //Esto para que los pueda buscar la función childnodes
                                    const c_word_lexeme = newEk("span", "ms-1 input input-flat-dicc text-secondary", "", "LX-" + randomKey(10, '12345abcde'))
                                    c_word_lexeme.role = "textbox"
                                    c_word_lexeme.setAttribute("contenteditable", "")

                                    //Toma el valor del fragmento WP
                                    c_word_lexeme.textContent = wp
                                    //Lo agrega al contenedor del fragmento actual.
                                    lx_div.appendChild(c_word_lexeme)

                                    //Aquí una de las acciones más importantes
                                    //El usuario puede modificar el contenido del input
                                    //Cada vez que ingresa información se actualiza en ciclo todo
                                    c_word_lexeme.oninput = () => {
                                        //Identifica dentro de que contenedor está

                                        let Padre1 = controls.panel_lexemas.childNodes;
                                        //Enumera cada control que se encuentra dentro del contenedor padre
                                        Padre1.forEach(P => {
                                            //Por cada contenedor padre busca 
                                            //que otros controles se encuentran junto a él 
                                            let child = P.childNodes
                                            //Enumera revisa cada control
                                            child.forEach(C => {
                                                //Si el control contiene el prefijo LX-
                                                //Entonces actualiza la información desde la BD
                                                if (C.id.includes("LX-") == true) {
                                                    //Crea una cadena consecutiva de morfemas y lso separa por espacio
                                                    //Usa los valores de cada control encontrado dentro de la palabra
                                                    //Los suma quedando uan candena como "aa bb cc"
                                                    new_text = new_text + C.textContent + " "
                                                }
                                            })
                                        })
                                        //Limpia el contedenor
                                        controls.panel_lexemas.innerHTML = ""
                                        //Ahora lo que ahce es llamar a la función que crea un control por cada fragmento

                                        //Retorna ciclicamente cada vez que se hace un cambio en el input [c_word_lexeme]
                                        //Usa la base de datos de controles y el nuevo texto creado
                                        _make_lexema_txt(controls, new_text)
                                    }

                                    //ESto fuera de acciones dentro del input c_word_lexeme
                                    //Ahora se crea una línea de analis por cada fragmento
                                    // 
                                    const div_lx_analisis = newEk("div", "mt-1", "", "PAR-" + randomKey(10, '12345abcde'))
                                    lx_div.appendChild(div_lx_analisis)

                                    //Coloca un control que puede hacerce click para buscar el fragmento en el diccionario
                                    //Lo agrega al contenedor de analisis
                                    //Le asignamos funciones de llamar menú
                                    const div_lx_id = newEk("div", "word-find-parser", wp, "LXID-" + randomKey(10, '12345abcde'))
                                    div_lx_id.setAttribute("data-bs-toggle", "dropdown")
                                    div_lx_analisis.appendChild(div_lx_id)

                                    const ul_menu_buscar = newE("ul", "ul_menu_varianteOf", "dropdown-menu shadow")
                                    div_lx_analisis.appendChild(ul_menu_buscar)
                                    //Evitar acciones de click
                                    ul_menu_buscar.onclick = (e) => {
                                        //e.stopPropagation();
                                    }

                                    const ul_div_buscar = newEk("div", "", "***")
                                    ul_menu_buscar.appendChild(ul_div_buscar)

                                    const ul_item_agregar = newEk("div", "item-menu", "Agregar palabra")
                                    ul_menu_buscar.appendChild(ul_item_agregar)


                                    //Aquí están las acciones para abrir un cuadro de díalogo con todas las opciones de buscar

                                    //Crea un contenedor de glosa del fragmento on el prefijo LXGN- para glosa
                                    const div_lx_gn = newEk("div", "ms-1 label-parser-gn", "--", "LXGN-" + randomKey(10, '12345abcde'))
                                    //Si en el DB hay información, entonces colocarla
                                    div_lx_analisis.appendChild(div_lx_gn)

                                    let parser_id
                                    if (gn !== undefined && gn!== "")  {
                                        div_lx_gn.textContent=gn[contadores_lx]
                                        parser_id=contadores_lx
                                                                             
                                        div_lx_id.onclick = () => {                                        
                                            
                                            ul_div_buscar.innerHTML = ""
                                            const db_lexemas = global_proyecto.LEXICON.entries
                                            const filter_lx = db_lexemas.filter(l => l.lexeme.lc == div_lx_id.textContent)
    
                                            const lexemas = filter_lx
                                            lexemas.forEach(lx => {
                                                const sentidos = lx["clase-sn"].sentidos
                                                sentidos.forEach(s => {
                                                    const abb_new = s.ps.abreviaciones[0].texto
                                                    const gn_new = s.gn[0].texto
                                                    const ul_item_lx = newEk("div", "item-menu", "")
                                                    ul_item_lx.innerHTML = `${lx.lexeme.lc} ${abb_new.toLowerCase()}. ${gn_new}`
                                                    ul_div_buscar.appendChild(ul_item_lx)
    
                                                    ul_item_lx.onclick = () => {
                                                                                                                 
                                                        div_lx_gn.textContent = gn_new
                                                        gn[parser_id]=gn_new
                                                       
                                                        div_lx_ps.textContent = abb_new                                                   
                                                        ps[parser_id]=abb_new
                                                        
                                                        save_data(global_proyecto["PARSER-WORD"])
                                                    }
                                                    
                                                })
    
                                            })
                                            
                                        }
                                    }                                   

                                    //Crea un control para las categoria con el prefijo LXPS- para categorias
                                    const div_lx_ps = newEk("div", "ms-1 label-parser-ps", "--", "LXPS-" + randomKey(10, '12345abcde'))
                                    div_lx_analisis.appendChild(div_lx_ps)

                                    let ps_id
                                    if (ps!== undefined && ps!== "") {
                                        ps_id=contadores_lx
                                        div_lx_ps.textContent=ps[contadores_lx]
                                    }
                                    let m=contadores_lx
                                    


                                    
                                    
                                }
                                contadores_lx++ 
                            }
                            
                            
                        } else {
                            if (wp != "") { //Si el fragmento no está vacio, entonces proceder
                                //A cada fragmento le asignamos un contenedor
                                //const lx_div = newEk("div", "me-2", wp)
                                //Y lo colocamso en el contenedor de lexemas
                                //div_parser.appendChild(lx_div)

                            }

                        }
                        

                    })
                    
                    
                }
               
            }

        }
        const btn_borrar = byE("bt_delete_texto")
        btn_borrar.onclick = () => {
            delete_texto(texto.id)
            open_text_data()
        }
    }
}

function put_analisis(data) {

    let list_lx_ref = []
    let tabla_analisis = global_proyecto["PARSER-WORD"].PARSER

    //Buscamos en la lista de palabras si existe esta palabra
    const filter_word = tabla_analisis.filter(ele => ele.word == clear_word_2(data.word_basic))
    if (filter_word.length == 0) {
        //Si existe debemos crear una nueva entrada con la información que nos da [data] 
        tabla_analisis.push(
            {
                "word": clear_word_2(data.word_basic),
                "active-analisis": data.new_lexemas_flat.trim(),
                "active-id": 0,
                "analisis": [
                    {
                        "lexemas-basic": data.new_lexemas_flat.trim(),
                        "lexemas-ref": data.new_lexemas_ref,
                        "lexemas-gn": data.glosas,
                        "lexemas-ps": data.categorias,
                        "glosa-general": {
                            "active-glosa": 0,
                            "active-glosa-text": data.glosas_generales,
                            "options": [{
                                "text": data.glosas_generales,
                                "text-ref": data.text_ref,
                            }]
                        },
                        "categoria-general": {
                            "abreviacion": "",
                            "nombre": ""
                        }
                    }
                ]

            }
        )
        save_data(global_proyecto["PARSER-WORD"])

    } else {//Si la palabra ya existe, entonces revisar los cortes de morfemas

        const lexemas_local = data.new_lexemas_flat.trim()
        //Cargamos todos los cortes de morfemas que existen dentro de este analis
        filter_word[0].analisis.forEach(lx_ref => {
            list_lx_ref.push(lx_ref["lexemas-basic"])
        })

        //Si los cortes de morfemas o analísi de morfemas no existen
        //entonces agregar el nuevo grupo de morfemas
        //A la lista de análisis
        if (list_lx_ref.includes(lexemas_local) == false) {
            filter_word[0].analisis.push(
                {
                    "lexemas-basic": data.new_lexemas_flat.trim(),
                    "lexemas-ref": data.new_lexemas_ref,
                    "lexemas-gn": data.glosas,
                    "lexemas-ps": data.categorias,
                    "glosa-general":
                    {
                        "active-glosa": 0,
                        "active-glosa-text": data.glosas_generales,
                        "options": [{
                            "text": data.glosas_generales,
                            "text-ref": data.text_ref,
                        }]
                    },
                    "categoria-general": {
                        "abreviacion": "", //data.categorias_generales.abb,
                        "nombre": "",//data.categorias_generales.nombre
                    }
                }
            )
            //Agregar como default esta lista
            filter_word[0]["active-analisis"] = data.new_lexemas_flat.trim()

            save_data(global_proyecto["PARSER-WORD"])

        } else {//Si ya existen los mismos cortes de morfemas, entonces revisar

            //Buscamos el corte de morfemas actual
            const filter_parser_unique = filter_word[0].analisis.filter(ele => ele["lexemas-basic"] == lexemas_local)
            //Si se encuentra entonces cargar la tabla de glosas genral
            let adm_glosas = filter_parser_unique[0]["glosa-general"]
            //Dentro de esta tabla glosa general existen ociones de glosa
            //Buscar dentro de estas opciones si la palabra actual en la entrada de glosa existe
            const filter_exist_text = adm_glosas.options.filter(ele => ele.text == data.glosas_generales)
            if (filter_exist_text.length == 0) {

                //Si la palabra no existe, entonces debemos agregar una nueva opción
                adm_glosas.options.push(
                    {
                        "text": data.glosas_generales, //TExto de la caja de texto
                        "text-ref": data.text_ref, //Indica en que texto estamos
                    }
                )
                adm_glosas["active-glosa-text"] = data.glosas_generales
                filter_word[0]["active-analisis"] = data.new_lexemas_flat.trim()
                save_data(global_proyecto["PARSER-WORD"])

            }
            adm_glosas["active-glosa-text"] = data.glosas_generales
            filter_word[0]["active-analisis"] = data.new_lexemas_flat.trim()
            save_data(global_proyecto["PARSER-WORD"])
        }

    }
}

function load_analisis(word_basic) {
    let tabla_analisis = global_proyecto["PARSER-WORD"].PARSER
    const filter_word = tabla_analisis.filter(ele => ele.word == clear_word_2(word_basic))

    let load_word
    let n = 0
    let g = 0
    if (filter_word.length != 0) {
        filter_word[0].analisis.forEach(a => {
            n++
        })


        const index_active = filter_word[0].analisis.findIndex((element) => element["lexemas-basic"] == filter_word[0]["active-analisis"]);


        load_word = {
            "active-analisis_id": index_active,
            "active-analisis": filter_word[0]["active-analisis"],
            "includes": true,
            "count": n,
            "parser": filter_word[0].analisis
        }

    } else {
        load_word = {
            "count": 0,
            "includes": false,
        }
    }
    return load_word

}

function save_texto(texto) {
    GLOBAL.firestore.updateTexto(texto)
}

function save_data(data) {
    GLOBAL.firestore.updateTexto(data)
}

function delete_texto(id) {
    GLOBAL.firestore.borrarTexto(id)
}
function newDataTable(data, id) {
    GLOBAL.firestore.addTexto(data, id)
}

function make_ps_tree(ul, input, field) {

    ul.innerHTML = ""
    ul.onclick = (e) => {
        e.stopPropagation();
    }


    if (verificar_datos(global_proyecto["TABLAS"].CATGRAMATICAL) == true) {
        //Definimos la tabla de categorias
        let tabla_categorias = global_proyecto["TABLAS"]["CATGRAMATICAL"]
        //Leemos cada elemento de la tabla de categorias
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

            item_Nivel1.onclick = () => {
                input.textContent = Nivel_1.abreviaciones[0].texto

                if (field == "") {

                } else {
                    field["categoria-general"] = {
                        "abreviacion": Nivel_1.abreviaciones[0].texto,
                        "nombre": Nivel_1.nombre[0].texto
                    }
                    save_data(global_proyecto["PARSER-WORD"])
                }
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

                item_Nivel2.onclick = () => {
                    input.textContent = Nivel_2.abreviaciones[0].texto

                    if (field == "") {

                    } else {
                        field["categoria-general"] = {
                            "abreviacion": Nivel_2.abreviaciones[0].texto,
                            "nombre": Nivel_2.nombre[0].texto
                        }
                        save_data(global_proyecto["PARSER-WORD"])
                    }
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

                    item_Nivel3.onclick = () => {
                        input.textContent = Nivel_3.abreviaciones[0].texto
                        if (field == "") {

                        } else {
                            field["categoria-general"] = {
                                "abreviacion": Nivel_3.abreviaciones[0].texto,
                                "nombre": Nivel_3.nombre[0].texto
                            }
                            save_data(global_proyecto["PARSER-WORD"])
                        }
                    }
                })
            })
        })
    }

}