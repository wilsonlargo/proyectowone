function openIni(email) {
    byE("menu_general").hidden = false
    byE("btnRegistrarse").hidden = true
    console.clear()
}

//Almacena la base de datos completa del proyecto seleccionado
let global_proyecto = {}

function open_proyecto() {

    //Carga todos los proyectos en la base de datos firebase
    const data_project = GLOBAL.state.data

    //Variable guarda todas la tablas relacionadas con vigencias
    let textos = []
    for (id in data_project) {
        if (data_project[id].id == "PROYECTO") { //Si el la tabla es proyecto, guarda la información propoa del proyecto
            global_proyecto["PROYECTO"] = data_project[id]
        } else if (data_project[id].id == "TABLAS") {//Guardar todas las tablas del proyecto
            global_proyecto["TABLAS"] = data_project[id]
        } else if (data_project[id].id == "LEXICON") {//Guarda y administra el lexicón
            //global_proyecto["LEXICON"] = data_project[id]

            if (typeof data_project[id].entries == "undefined") {
                global_proyecto["LEXICON"] = {
                    "entries": [],
                    "id": "LEXICON"
                }
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            } else {
                global_proyecto["LEXICON"] = data_project[id]
            }
        }else if (data_project[id].id == "PARSER-WORD") {//Guardar todas las tablas del proyecto
            global_proyecto["PARSER-WORD"] = data_project[id]

        } 
    }
    //Guardar_datos("TABLAS", global_proyecto["TEXTOS"])
    //Guardar_datos(id_vigencia, global_proyecto["vigencias"][sel_vigencia.value])
    make_lexicon()

}

function open_proyecto_text() {
    const data_project = GLOBAL.state.data
    //Variable guarda todas la tablas relacionadas con vigencias
    let textos = []
    global_proyecto["TEXTOS"] = []
    for (id in data_project) {
        if (data_project[id].id == "PROYECTO") { //Si el la tabla es proyecto, guarda la información propoa del proyecto
            global_proyecto["PROYECTO"] = data_project[id]
        } else if (data_project[id].id == "TABLAS") {//Guardar todas las tablas del proyecto
            global_proyecto["TABLAS"] = data_project[id]
        } else if (data_project[id].id == "LEXICON") {//Guarda y administra el lexicón
            //global_proyecto["LEXICON"] = data_project[id]

            if (typeof data_project[id].entries == "undefined") {
                global_proyecto["LEXICON"] = {
                    "entries": [],
                    "id": "LEXICON"
                }
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            } else {
                global_proyecto["LEXICON"] = data_project[id]
            }
        }else if (data_project[id].id == "PARSER-WORD") {//Guardar todas las tablas del proyecto
            global_proyecto["PARSER-WORD"] = data_project[id]

        }
        else if (data_project[id].id.includes("TETX-") == true) {//Si es un texto, guardar los textos pertenecientes a un proyecto
            let txt = data_project[id]
            txt.id = data_project[id].id
            global_proyecto["TEXTOS"].push(txt)
        }
        
    }

    make_text_editor()
}
function open_text_data() {
    const data_project = GLOBAL.state.data
    //Variable guarda todas la tablas relacionadas con vigencias
    let textos = []
    global_proyecto["TEXTOS"] = []
    for (id in data_project) {
        if (data_project[id].id == "PROYECTO") { //Si el la tabla es proyecto, guarda la información propoa del proyecto
            global_proyecto["PROYECTO"] = data_project[id]
        } else if (data_project[id].id == "TABLAS") {//Guardar todas las tablas del proyecto
            global_proyecto["TABLAS"] = data_project[id]
        } else if (data_project[id].id == "LEXICON") {//Guarda y administra el lexicón
            //global_proyecto["LEXICON"] = data_project[id]

            if (typeof data_project[id].entries == "undefined") {
                global_proyecto["LEXICON"] = {
                    "entries": [],
                    "id": "LEXICON"
                }
                Guardar_datos("LEXICON", global_proyecto["LEXICON"])
            } else {
                global_proyecto["LEXICON"] = data_project[id]
            }
        } else if (data_project[id].id == "PARSER-WORD") {//Guardar todas las tablas del proyecto
            global_proyecto["PARSER-WORD"] = data_project[id]

        }
        else if (data_project[id].id.includes("TETX-") == true) {//Si es un texto, guardar los textos pertenecientes a un proyecto
            let txt = data_project[id]
            txt.id = data_project[id].id
            global_proyecto["TEXTOS"].push(txt)
        }
    }
    _make_item_list()
}



function Guardar_datos(INDICE, DATA) {
    const data_base = GLOBAL.state.data
    let indx = 0
    for (i in data_base) {
        if (data_base[i].id == INDICE) {
            indx = i
        }
    }
    GLOBAL.state.data[indx] = DATA
    const id = GLOBAL.firestore.updateProyecto(GLOBAL.state.data[indx])
}



