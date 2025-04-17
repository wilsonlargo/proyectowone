function loadDataBase(id, hoja, query = "Select *") {
    //Carga base de datos de google sheets y la convierte a una lista

    //let query = "Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W"
    return fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?&sheet=${hoja}&tq=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(text => {
            //Cargar Datos
            const rawdata = text.slice(47, -2);
            const data = ((JSON.parse(rawdata)).table);


            //Titulos de columnas y Obtener columnas
            const cols = (data.cols);
            const Keys = cols.map(col => col.label);
            const rows = data.rows;

            //Regresar Objeto (Diccionario Json)
            const Objeto = [];
            for (const row of rows) {
                const raw = (row.c)
                const rowinfo = raw.map(dic => (dic && dic.v) ? dic.v : 0);
                const caso = Object.fromEntries(Keys.map((key, i) => [key, rowinfo[i]]));
                Objeto.push(caso)
            }


            return Objeto
        })
}


let DataPrincipal;
loadDataBase("1dniplVXfiSFYUFfsT1Ij6cdEoAdtK7dqWf3x4s9eUSw", proyecto).then(objeto => {
    DataPrincipal = [...objeto].sort((a, b) => a[0] - b[0]);
    GLOBAL.from_drive = DataPrincipal
})

//Limpiamos los contenedores
contenedor_ps.innerHTML = ""
div_partes.innerHTML = ""

//const int_buscarini = byE("int_nuevo_lx")
const dPrincipal_Categoria = newEk("div", "ps-1 bg-warning pe-1", "?")
div_partes.appendChild(dPrincipal_Categoria)

const div_simbolo = newEk("div", "bg-white ps-1 pe-1", "=>")
div_partes.appendChild(div_simbolo)

//Control de entrada de tipo de inflexion
const input_inflexion = newEk("input", "form-control ms-2", "?")
div_partes.appendChild(input_inflexion)

make_ps_tree(contenedor_ps, dPrincipal_Categoria, "", "for_inflexional")


const div_ok = newEk("div", "ms-3 bg-success text-white ps-1 pe-1", "Ok")
div_ok.style.cursor = "pointer"
div_partes.appendChild(div_ok)

div_ok.onclick = () => {
    //Usamos una plantilla de categorias
    const temp_ps = template_ps()
    //Pero solo usamos los nombres y abreviaciones
    new_ps = []
    new_ps = {
        "abreviaciones": temp_ps.abreviaciones,
        "nombres": temp_ps.nombre
    }
    new_ps.nombres[0].texto = "Inflexional"
    new_ps.abreviaciones[0].texto = dPrincipal_Categoria.textContent + ":" + input_inflexion.value
    sel_cat_lx.textContent = "Inflexional [" + dPrincipal_Categoria.textContent + ":" + input_inflexion.value + "]"
}



