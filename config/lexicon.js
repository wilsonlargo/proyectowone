let active_lexicon;
let active_lexicon_id = 0


function make_lexicon() {
    active_lexicon = global_proyecto.LEXICON

    byE("Nombre_proyecto").textContent = global_proyecto.INFO.nombre + "- Lexicón"
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

        const div_dropdown = newE("div", "div_dropdown", "dropdown mt-1")
        bts_move.appendChild(div_dropdown)

        const btn_menu_config = newE("button", "btn_menu_config", "btn btn-secondary dropdown-toggle")
        btn_menu_config.setAttribute("data-bs-toggle", "dropdown")
        btn_menu_config.type="button"
        btn_menu_config.textContent="Configuración"
        div_dropdown.appendChild(btn_menu_config)

        const ul_menu_config = newE("ul", "ul_menu_config", "dropdown-menu shadow")
        div_dropdown.appendChild(ul_menu_config)

        const item_variantes = newE("div", "item_variantes", "item-menu")
        item_variantes.textContent="Variantes de idioma"
        item_variantes.setAttribute("data-bs-toggle", "modal")
        item_variantes.setAttribute("data-bs-target", "#open_modal")
        item_variantes.onclick=()=>{
            config_variantes()
        }

        
        ul_menu_config.appendChild(item_variantes)






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

        const col_lx_label = newE("div", "col_lx_label", "col-3 label-wrap text-end")
        col_lx_label.textContent = "Entrada principal"
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


        //
        const bt_del = byE("bt_del")
        bt_del.onclick = () => {
            active_lexicon.entries = _delete_registro(active_lexicon.entries, "key", entrada.key)
            Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            _make_list_lx()
            panel_lexicon_edit.innerHTML = ""
        }

        //panel_lexicon_edit.textContent=id
    }

    function _add_registro() {
        const template_entry = {
            "id": active_lexicon.entries.length - 1,
            "key": randomKey(20, '12345abcde'),
            "lexeme": {
                "lx": "Nueva entrada",
                "lx_lngs": []
            }
        }
        active_lexicon.entries.push(template_entry)
        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
        _make_list_lx()
        _move_to_entry("fin")
    }

    function _delete_registro(DATA, CAMPO, ID) {
        const filter = DATA.filter(ele => ele[CAMPO] !== ID)
        return filter
    }

    function _move_to_entry(option) {

        if (option == "ini") {
            active_lexicon_id = 0
            _make_lexicon_edit(active_lexicon.entries[0])

        } else if (option =="sig") {
            if (active_lexicon_id >= active_lexicon.entries.length - 1) {
                alert("Último registro")
                active_lexicon_id = active_lexicon.entries.length - 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            }else{
                active_lexicon_id = active_lexicon_id + 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            }

        }else if (option =="prev"){
            if (active_lexicon_id == 0) {
                alert("Primer registro")
                active_lexicon_id = 0
                _make_lexicon_edit(active_lexicon.entries[0])
            }else{
                active_lexicon_id = active_lexicon_id - 1
                _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
            }
        } else if(option =="fin"){
            active_lexicon_id = active_lexicon.entries.length - 1
            const entrada = _make_lexicon_edit(active_lexicon.entries[active_lexicon_id])
        }
    }
}
function config_variantes(){
const modal_panel_gonfig= byE("modal_panel_gonfig")
modal_panel_gonfig.innerHTML=""
const div_detalle = newE("div", "div_detalle", "text-justificado")
div_detalle.textContent=`En esta opción usted puede agregar variaciones dialectales del idioma principal, 
tenga en cuenta que serán visibles en las diferentes categorías como una entrada secundaria.`
modal_panel_gonfig.appendChild(div_detalle)



}

