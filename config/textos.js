
function make_text_editor() {
    try {
        byE("Nombre_proyecto").textContent = global_proyecto.PROYECTO.nombre + "- Textos"
    } catch (error) {
        byE("Nombre_proyecto").textContent = "- Textos"
    }
    const panel_escritorio = byE("panel_escritorio")
    panel_escritorio.innerHTML = ""

    if (verificar_datos(global_proyecto["PARSER-WORD"]) == false) {

        global_proyecto["PARSER-WORD"] = {
            "PARSER": []
        }
        newDataTable(global_proyecto["PARSER-WORD"], "PARSER-WORD")

    }

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

            const col_cat_label_lng = newEk("div", "col-auto tag-small", global_proyecto["PROYECTO"].cod_idioma)
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

                        function make_w(Word_clear) {
                            const c_word = newEk("div", "word-parser")
                            div_parser.appendChild(c_word)

                            const c_word_basic = newEk("div", "fw-bold")
                            c_word_basic.textContent = Word_clear
                            c_word.appendChild(c_word_basic)

                            const div_1 = newEk("div", "")
                            c_word.appendChild(div_1)

                            const div_11 = newEk("div", "div-fluid")
                            div_1.appendChild(div_11)

                            const col_botones = newEk("div", "mt-1")
                            col_botones.style.width = "11px"
                            div_11.appendChild(col_botones)

                            const btn_menu_lexemes = newEk("div", " mt-1 btn-context-parser bi bi-arrow-down-circle-fill")
                            btn_menu_lexemes.setAttribute("data-bs-toggle", "dropdown")
                            col_botones.appendChild(btn_menu_lexemes)

                            const ul_menu_lexemes = newEk("ul", "dropdown-menu shadow")
                            col_botones.appendChild(ul_menu_lexemes)

                            //Evitar acciones de click
                            ul_menu_lexemes.onclick = (e) => {
                                //e.stopPropagation();
                            }

                            const div_contador = newEk("div", "mt-2 btn-context-parser text-secondary")
                            col_botones.appendChild(div_contador)


                            const div_lexemes = newEk("div", "div-fluid align-items-start")
                            div_11.appendChild(div_lexemes)

                            const div_12 = newEk("div", "div-fluid mt-1")
                            div_1.appendChild(div_12)

                            const col_botones2 = newEk("div", "btn-context-parser bi bi-arrow-down-circle-fill")
                            col_botones2.style.width = "12px"
                            div_12.appendChild(col_botones2)

                            const c_word_glosa_gen = newEk("span", "ms-1 input input-flat-dicc bg-white")
                            c_word_glosa_gen.role = "textbox"
                            c_word_glosa_gen.setAttribute("contenteditable", "")
                            div_12.appendChild(c_word_glosa_gen)

                            const div_13 = newEk("div", "div-fluid mt-1")
                            div_1.appendChild(div_13)

                            const col_botones3 = newEk("div", "btn-context-parser bi bi-arrow-down-circle-fill")
                            col_botones3.style.width = "12px"
                            div_13.appendChild(col_botones3)

                            const c_word_cat = newEk("div", "ms-1 input input-flat-dicc")
                            div_13.appendChild(c_word_cat)

                            const div_14 = newEk("div", "div-fluid-rg mt-1 me-2")
                            div_1.appendChild(div_14)

                            const btn_aprobar = newEk("div", "btn-aprovar-parser bi bi-check-square-fill")
                            div_14.appendChild(btn_aprobar)

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

                            _make_lexema_txt(div_lexemes, Word_clear, div_contador, ul_menu_lexemes, c_word_glosa_gen)
                        }
                    }
                })
            }

            function _make_lexema_txt(div_lexemes, word_ini, div_contador, ul_menu_lexemes, c_word_glosa_gen) {
                const verificar_word = load_analisis(clear_word_2(word_ini))

                console.log(verificar_word.count)

                if (verificar_word["includes"] == true) {
                    div_contador.textContent = verificar_word.count
                    verificar_word.parser.forEach(p => {
                        const item = newEk("div", "item-menu", p["lexemas-basic"])
                        ul_menu_lexemes.appendChild(item)
                        item.onclick = () => {
                            div_lexemes.innerHTML = ""
                            let gns = p["lexemas-gn"]
                            let pss = p["lexemas-ps"]

                            //Cargamos info de las glosas de esta palabra
                            let adm_glosas = p["glosa-general"]
                            let glosa_activa = adm_glosas.options[adm_glosas["active-glosa"]]

                            let glosa = glosa_activa.text
                            c_word_glosa_gen.textContent = glosa_activa.text

                            c_word_glosa_gen.oninput = () => {
                                //p["glosa-general"].push(c_word_glosa_gen.textContent)
                                //save_data(global_proyecto["PARSER-WORD"])
                            }

                            _make_parser2(item.textContent, gns, pss, glosa)
                        }
                    })

                    //Cargamos info de las glosas de esta palabra
                    let adm_glosas = verificar_word.parser[0]["glosa-general"]
                    let glosa_activa = adm_glosas.options[adm_glosas["active-glosa"]]

                    //c_word_glosa_gen.textContent = glosa_activa.text
                    c_word_glosa_gen.oninput = () => {
                        //glosa_activa.text=c_word_glosa_gen.textContent
                        //save_data(global_proyecto["PARSER-WORD"])
                    }

                    let w = verificar_word.parser[0]["lexemas-basic"]
                    let gns = verificar_word.parser[0]["lexemas-gn"]
                    let pss = verificar_word.parser[0]["lexemas-ps"]
                    _make_parser2(w, gns, pss)

                } else {
                    _make_parser2(word_ini)
                }

                function _make_parser2(w, gn = "", ps = "") {
                    let new_text = ""
                    const word_process = w.split(" ")
                    let contadores_lx = 0
                    word_process.forEach(wp => {
                        if (lista_puntuacion.includes(wp) == false) { //Variable en módulo global
                            if (wp != "") {
                                crear_wp()
                                function crear_wp() {
                                    const lx_div = newEk("div", "me-2")
                                    div_lexemes.appendChild(lx_div)

                                    const c_word_lexeme = newEk("span", "ms-1 input input-flat-dicc bg-white", "", "LX-" + randomKey(10, '12345abcde'))
                                    c_word_lexeme.role = "textbox"
                                    c_word_lexeme.setAttribute("contenteditable", "")
                                    c_word_lexeme.textContent = wp
                                    lx_div.appendChild(c_word_lexeme)

                                    c_word_lexeme.oninput = () => {
                                        //let Parent = c_word_lexeme.parentNode;
                                        let Padre1 = div_lexemes.childNodes;
                                        Padre1.forEach(P => {
                                            let child = P.childNodes
                                            child.forEach(C => {
                                                if (C.id.includes("LX-") == true) {
                                                    new_text = new_text + C.textContent + " "
                                                }
                                            })
                                        })
                                        div_lexemes.innerHTML = ""
                                        _make_lexema_txt(div_lexemes, new_text)
                                    }

                                    const div_lx_analisis = newEk("div", "mt-1", "", "PAR-" + randomKey(10, '12345abcde'))
                                    lx_div.appendChild(div_lx_analisis)

                                    const div_lx_id = newEk("div", "word-find-parser", wp, "LXID-" + randomKey(10, '12345abcde'))
                                    div_lx_analisis.appendChild(div_lx_id)


                                    const div_lx_gn = newEk("div", "ms-1 text-success bg-white", "---", "LXGN-" + randomKey(10, '12345abcde'))
                                    if (gn != "") {
                                        div_lx_gn.textContent = gn[contadores_lx]
                                    }
                                    div_lx_analisis.appendChild(div_lx_gn)


                                    const div_lx_ps = newEk("div", "ms-1 text-secondary bg-white", "--", "LXPS-" + randomKey(10, '12345abcde'))
                                    if (ps != "") {
                                        div_lx_ps.textContent = ps[contadores_lx]
                                    }
                                    div_lx_analisis.appendChild(div_lx_ps)


                                    contadores_lx++
                                }
                            }
                        }

                    })
                }



                div_lexemes.addEventListener("keydown", (ev) => {


                    //console.log("Has pulsado la tecla ", ev.key, ` (${ev.code})`);
                });
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
    //make_analisis(w, new_lexemas, new_lexemas_ref, new_glosas, new_categorias)
    let list_lx_ref = []
    let tabla_analisis = global_proyecto["PARSER-WORD"].PARSER
    const filter_word = tabla_analisis.filter(ele => ele.word == clear_word_2(data.word_basic))
    if (filter_word.length == 0) {
        tabla_analisis.push(
            {
                "word": clear_word_2(data.word_basic),
                "analisis": [
                    {
                        "lexemas-basic": data.new_lexemas_flat.trim(),
                        "lexemas-ref": data.new_lexemas_ref,
                        "lexemas-gn": data.glosas,
                        "lexemas-ps": data.categorias,
                        "glosa-general": {
                            "active-glosa": 0,
                            "options": [{
                                "text": data.glosas_generales,
                                "text-ref": data.text_ref,
                            }]
                        },
                        "categoria-general": data.categorias_generales
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
                        "options": [{
                            "text": data.glosas_generales,
                            "text-ref": data.text_ref,
                        }]
                    },
                    "categoria-general": data.categorias_generales
                }
            )
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
                console.log(adm_glosas.options)
            }

            
        }

        //filter_word[0].analisis.push(word_analisis)
        //save_data(global_proyecto["PARSER-WORD"])

        //return filter_word

    }
}

function load_analisis(word_basic) {
    let tabla_analisis = global_proyecto["PARSER-WORD"].PARSER
    const filter_word = tabla_analisis.filter(ele => ele.word == clear_word_2(word_basic))

    let load_word = []
    let n = 0
    if (filter_word.length != 0) {
        filter_word[0].analisis.forEach(a => {
            n++
        })

        load_word = {
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
