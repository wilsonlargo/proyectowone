function openweb() {
    location.href = "./CONFIG/data-proyect.html"
}
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
    console.log(data_project)
    //Variable guarda todas la tablas relacionadas con vigencias
    let textos = []
    for (id in data_project) {
        if (data_project[id].id == "PROYECTO") { //Si el la tabla es proyecto, guarda la información propoa del proyecto
            global_proyecto["INFO"] = data_project[id]
        }else if (data_project[id].id == "TABLAS") {//Guardar todas las tablas del proyecto
            global_proyecto["TABLAS"] = data_project[id]
        }else if (data_project[id].id == "LEXICON") {//Guarda y administra el lexicón
            global_proyecto["LEXICON"] = data_project[id]
        }else if (data_project[id].id.includes("T-") == true) {//Si es un texto, guardar los textos pertenecientes a un proyecto
            textos.push(data_project[id])
        }
    }
    //Guardar_datos("TABLAS", global_proyecto["TEXTOS"])
    //Guardar_datos(id_vigencia, global_proyecto["vigencias"][sel_vigencia.value])
    make_lexicon()
    
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
function delete_item(DATA, CAMPO, ID) {
    const filter = DATA.filter(ele => ele[CAMPO] !== ID)
    return filter
}


