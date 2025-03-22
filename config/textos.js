
function make_text_editor() {
    byE("Nombre_proyecto").textContent = global_proyecto.PROYECTO.nombre + "- Textos"
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
            const data = GLOBAL.firestore.addTexto(template_text())
            open_text_data()
            _make_item_list()
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
            //_move_to_entry("ini")
        }

        const bt_prev = newE("div", "bt_prev", "btn btn-secondary org-btn-tool bi bi-skip-backward")
        bts_move.appendChild(bt_prev)
        bt_prev.onclick = () => {
            //_move_to_entry("prev")
        }

        const bt_sig = newE("div", "bt_sig", "btn btn-secondary org-btn-tool bi bi-skip-forward")
        bts_move.appendChild(bt_sig)
        bt_sig.onclick = () => {
            //_move_to_entry("sig")
        }

        const bt_fin = newE("div", "bt_fin", "btn btn-secondary org-btn-tool bi bi-skip-end")
        bts_move.appendChild(bt_fin)
        bt_fin.onclick = () => {
            //_move_to_entry("fin")
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

    const row_panel_text = newEk("div", "row", "")
    panel_escritorio.appendChild(row_panel_text)

    const col_list_text = newEk("div", "col-3 menu-group-scroll-list", "Listas", "list_textos")
    row_panel_text.appendChild(col_list_text)

    const col_edit_text = newEk("div", "col", "Editores","edit_textos")
    row_panel_text.appendChild(col_edit_text)
    _make_item_list()
}
function _make_item_list() {
    const panel_list = byE("list_textos")
    panel_list.innerHTML=""
    const panel_edit = byE("edit_textos")
    panel_edit.innerHTML=""

    let tabla_textos=global_proyecto["TEXTOS"]

    panel_list.innerHTML=""
    tabla_textos.forEach(texto=>{
        const item_text= newEk("div","item-menu",texto.titulo)
        panel_list.appendChild(item_text)
        item_text.onclick=()=>{
            _make_edit_text(texto)
        }
    })

    function _make_edit_text(texto){
        panel_edit.innerHTML=""
        const input_titulo= newEk("input","form-control","")

        panel_edit.appendChild(input_titulo)

        input_titulo.value=texto.titulo
        input_titulo.onchange=()=>{
            texto.titulo=input_titulo.value
            save_texto(texto) 
        }
    }

}
function save_texto(texto) {
    GLOBAL.firestore.updateTexto(texto)
}