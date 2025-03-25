function template_entry() {
    const template = {
        "id": active_lexicon.entries.length - 1,
        "key": randomKey(20, '12345abcde'),
        "lexeme": {
            "ini": "",
            "lx": "Nueva entrada",
            "ini": "",
            "lx_lngs": [],
            "visible": true
        },
        "clase-morfema": {
            "tipo": "Indefinido",
            "abreviacion": "ind",
            "lx_lngs": [],
            "visible": true,
            "applayTo": {
                "visible": false,
                "categoria": []
            }

        },

        "clase-contexto": {
            "contextos": [],
            "visible": true
        },
        "clase-varianteOf": {
            "variantes": [],
            "visible": true
        }
        ,
        "clase-etimologia": {
            "forma": "",
            "visible": true,
            "glosas": template_glosas(),
            "nota": "",
        }
        ,
        "clase-sn": {
            "visible": true,
            "sentidos": [],
        }
    }
    return template
}
function template_mofemas() {
    const template = [
        {
            "key": "morf",
            "nombre": "Tema",
            "abreviacion": "tem",
            "info": "Lexema base que contiene la referencia base de significado",
            "estructura": {
                "ini": "",
                "fin": "",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Raíz",
            "abreviacion": "rad",
            "info": "Lexema central sin ningún tipo de afijos",
            "estructura": {
                "ini": "-",
                "fin": "-",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Prefíjo",
            "abreviacion": "pre",
            "info": "Lexema que se ubíca al inicio de un radical",
            "estructura": {
                "ini": "-",
                "fin": "",
            },
            "visible": true,
        },
        {
            "key": "morf",
            "nombre": "Sufíjo",
            "abreviacion": "pre",
            "info": "Lexema que se ubíca al final de un radical",
            "estructura": {
                "ini": "",
                "fin": "-",
            },
            "visible": true,
        }
    ]

    template.forEach(ele => {
        ele.key = "morf-" + randomKey(10, '12345abcde')
    })
    return template
}
function template_contexto() {
    const template = [
        {
            "key": "cont",
            "nombre": "Después de vocal",
            "contexto": "/[V]_",
            "info": "En posterior adyacencia de una vocal",
        },
        {
            "key": "cont",
            "nombre": "Después de consonante",
            "contexto": "/[C]_",
            "info": "En posterior adyacencia de una consonante",
        },
        {
            "key": "cont",
            "nombre": "Antes de vocal",
            "contexto": "/_[V]",
            "info": "En anterior adyacencia de una vocal",
        },
        {
            "key": "cont",
            "nombre": "Antes de consonante",
            "contexto": "/_[C]",
            "info": "En anterior adyacencia de una consonante",
        },
    ]

    template.forEach(ele => {
        ele.key = "cont-" + randomKey(10, '12345abcde')
    })
    return template
}

function template_sn() {
    //Debo procesar antes los idiomas incluidos para análisis
    let gns = []
    let dns = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lngs = global_proyecto["PROYECTO"].Lngtraducion
        lngs.forEach(l => {
            const item_gn = {
                "texto": "Palabra en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            gns.push(item_gn)
            dns.push(item_gn)
        })
        //
    }
    const template = {
        "key": "sn-" + randomKey(10, '12345abcde'),
        "gn": gns,
        "dn": dns,
        "ps": "Indefinido",
        "ex": [],
    }
    return template
}
function template_ps() {
    //Debo procesar antes los idiomas incluidos para análisis
    let ns = []
    let abbs = []
    let dess = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lngs = global_proyecto["PROYECTO"].Lngtraducion
        lngs.forEach(l => {
            const item = {
                "key": "lng-" + randomKey(10, '12345abcde'),
                "texto": "Categoria en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            ns.push(item)
        })
        lngs.forEach(l => {
            const item = {
                "key": "lng-" + randomKey(10, '12345abcde'),
                "texto": "",
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            abbs.push(item)
        })
        lngs.forEach(l => {
            const item = {
                "key": "lng-" + randomKey(10, '12345abcde'),
                "texto": "",
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            dess.push(item)
        })
        //
    }
    const template = {
        "key": "ps-" + randomKey(10, '12345abcde'),
        "nombre": ns,
        "abreviaciones": abbs,
        "definiciones": dess,
        "subcategorias": []
    }
    return template
}

function template_ex() {
    //Debo procesar antes los idiomas incluidos para análisis
    let trad = []
    let lngs = []

    if (verificar_datos(global_proyecto["PROYECTO"].Variantes) == true) {
        const lng_lx = global_proyecto["PROYECTO"].Variantes
        lng_lx.forEach(l => {
            const item = {
                "texto": "Ejemplo en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            lngs.push(item)
        })
    }
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lngs = global_proyecto["PROYECTO"].Lngtraducion
        lngs.forEach(l => {
            const item = {
                "texto": "Ejemplo en " + l.nombre,
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            trad.push(item)
        })
    }
    const template = {
        "key": "ex-" + randomKey(10, '12345abcde'),
        "texto": "Ejemplo en el idioma principal",
        "ejemplo": lngs,
        "traduccion": trad,
    }
    return template
}

function template_glosas() {
    let lngs = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lng_lx = global_proyecto["PROYECTO"].Lngtraducion
        lng_lx.forEach(l => {
            const item = {
                "texto": "",
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            lngs.push(item)
        })
    }

    const template = {
        "key": "et-" + randomKey(10, '12345abcde'),
        "traduccion": lngs,
    }
    return template
}

function template_text() {
    let lngs = []
    if (verificar_datos(global_proyecto["PROYECTO"].Lngtraducion) == true) {
        const lng_lx = global_proyecto["PROYECTO"].Lngtraducion
        lng_lx.forEach(l => {
            const item = {
                "texto": "",
                "idioma": l.nombre,
                "abreviacion": l.abreviacion,
                "visible": l.visible
            }
            lngs.push(item)
        })
    }

    let new_text = {
        "titulo":"Título en el idioma",
        "titulo-traduccion":lngs,
        "autor":"Nombre de autor",
        "idioma-base": {
            "idioma":"",
            "abreviacion":""
        },
        "analisis": {
            "text-basic": [template_par()],
        }
    }
    return new_text
}
function template_par() {
    let par = {
        "key": "par-" + randomKey(10, '12345abcde'),
        "par-text":"Nuevo texto"
    }
    return par
}