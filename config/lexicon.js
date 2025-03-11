let active_lexicon;
let template_entry = {
    "id": "",
    "lexeme": {
        "lx": "Nueva entrada",
        "lx_lngs": []
    }
}



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

        const bt_del = newE("div", "bt_add", "btn btn-secondary org-btn-tool bi bi-trash3-fill")
        bts_adddel.appendChild(bt_del)
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

        const panel_lexicon_edit = newE("div", "panel_lexicon_edit", "")
        panel_lexicon_edit.textContent = "diccionario"
        panel_splitter.appendChild(panel_lexicon_edit)

        dragElement(document.getElementById("panel_separador"), "H");
    }
    _make_list_lx()
    function _make_list_lx() {
        const panel_list = byE("panel_list")
        panel_list.innerHTML = ""


        for (idx in active_lexicon.entries) {
            const entrada = active_lexicon.entries[idx]
            const p = newE("p", "p" + entrada.id, "")
            p.textContent = entrada.lexeme.lx
            panel_list.appendChild(p)

            console.log(entrada)
        }

    }


    function _add_registro() {
        template_entry.id = randomKey(20, '12345abcde'),
            active_lexicon.entries.push(template_entry)
        Guardar_datos("LEXICON", global_proyecto["LEXICON"])
        _make_list_lx()
    }


}
