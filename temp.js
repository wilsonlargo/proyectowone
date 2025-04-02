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

              //Esta verfificación se hace si estamos en el nivel superior
                //o inferior, para aplicar el filtro
                if (verificar_datos(parent.subcategorias) == true) {
                    const filter_del = parent.subcategorias.filter(ele => ele.key != cat.key)
                    parent.subcategorias = filter_del
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    config_gramatical_list()
                } else {
                    const filter_del = parent.filter(ele => ele.key != cat.key)
                    global_proyecto["TABLAS"].CATGRAMATICAL = filter_del
                    Guardar_datos("TABLAS", global_proyecto["TABLAS"])
                    config_gramatical_list()

                }

