control.setAttribute("data-bs-toggle", "dropdown")

item_variantes.setAttribute("data-bs-toggle", "modal")
item_variantes.setAttribute("data-bs-target", "#exampleModal")

const btn_agregar = newE("button", "btn_agregar", "btn btn-secondary btn-sm mt-2")

// para crear un título con menú contextual
const row_varianteOf_label = newE("div", "row_varianteOf_label", "row align-items-center")
col_row_varianteOf_label.appendChild(row_varianteOf_label)

const col_menu_varianteOf = newE("div", "col_menu_varianteOf", "col-auto")
row_varianteOf_label.appendChild(col_menu_varianteOf)

const btn_menu_varianteOf = newE("div", "btn_menu_varianteOf", "bi bi-arrow-down-circle-fill btn-context-lx")
btn_menu_varianteOf.setAttribute("data-bs-toggle", "dropdown")
col_menu_varianteOf.appendChild(btn_menu_varianteOf)

const ul_menu_varianteOf = newE("ul", "ul_menu_varianteOf", "dropdown-menu shadow")
col_menu_varianteOf.appendChild(ul_menu_varianteOf)

//Evitar acciones de click
ul_menu_ps.onclick = (e) => {
    e.stopPropagation();
}

//Para guardar dicc por tabla
Guardar_datos("LEXICON", global_proyecto["LEXICON"])

//Onchange

control.onchange = () => {

}
const index_active = filter_word[0].analisis.findIndex((element) => element["lexemas-basic"] == filter_word[0]["active-analisis"]);
const index_active2 = filter_word[0].analisis.find((element) => element["lexemas-basic"] == filter_word[0]["active-analisis"]);


data.div_lexemes.addEventListener("keydown", (ev) => {


    //console.log("Has pulsado la tecla ", ev.key, ` (${ev.code})`);
});