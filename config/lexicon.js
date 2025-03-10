let active_lexicon;
function make_lexicon() {
    //console.log(global_proyecto)
    active_lexicon = global_proyecto.LEXICON

    byE("Nombre_proyecto").textContent = global_proyecto.INFO.nombre + "- Lexicón"
    const panel_escritorio = byE("panel_escritorio")
    panel_escritorio.innerHTML = ""
    _make_toolbar()
    function _make_toolbar() {
        const row_toolbar = newE("div", "row_toolbar", "row")
        panel_escritorio.appendChild(row_toolbar)

        const col_new = newE("div", "col_new", "col-auto")
        row_toolbar.appendChild(col_new)

        const bts_adddel = newE("div", "bts_adddel", "btn-group")
        bts_adddel.role = "group"
        col_new.appendChild(bts_adddel)

        const bt_add = newE("div", "bt_add", "btn btn-secondary org-btn-tool bi bi-file-earmark-plus")
        bts_adddel.appendChild(bt_add)

        const bt_del = newE("div", "bt_add", "btn btn-secondary org-btn-tool bi bi-trash3-fill")
        bts_adddel.appendChild(bt_del)
    }
    //make_spliter_panel()
    function make_spliter_panel(){
        const panel_splitter= newE("div", "panel_splitter", "h-100")
        panel_splitter.setAttribute("data-role", "splitter")
        panel_splitter.setAttribute("data-split-sizes", "30, 70")
        panel_escritorio.appendChild(panel_splitter)

        const panel_list= newE("div", "panel_list", "d-flex flex-justify-center flex-align-center")
        panel_list.textContent="Hola"
        panel_splitter.appendChild(panel_list)

        const panel_lexicon_edit= newE("div", "panel_lexicon_edit", "d-flex flex-justify-center flex-align-center")
        panel_lexicon_edit.textContent="diccionario"
        panel_splitter.appendChild(panel_lexicon_edit)
    }


}
