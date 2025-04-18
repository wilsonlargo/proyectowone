//Importa las instanacias de firebase y administración de base de datos
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";


//importa las acciones para almacenar en la nube
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    deleteField,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

//Importa las instanacias de firebase para autenticación
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Utiliza las claves y credenciales de mi base de datos de Tomakare
const firebaseConfig = {
    apiKey: "AIzaSyDVMKQ5tinwAdK4qzq98qQvELbZYUuaq5c",
    authDomain: "woneprj.firebaseapp.com",
    projectId: "woneprj",
    storageBucket: "woneprj.firebasestorage.app",
    messagingSenderId: "356688049122",
    appId: "1:356688049122:web:077a9972fd3762ec57bfbb"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);



function _sel_proyecto(proyecto) {
    //Sección para importar data del DRIVE
    // Cargar informacion de la base de datos de registros de tabla google

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////

    const colectionproyectos = collection(db, proyecto)
    // 1.
    async function getProyecto() {
        const proyectos = [];
        const querySnapshot = await getDocs(proyecto)
        querySnapshot.forEach((doc) => {
            proyectos.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        return proyectos;
    }
    // 2.
    // Función para obtener un proyecto por id
    async function getProyectos(id) {
        const docRef = doc(db, proyecto, id);
        const docSnap = await getDoc(docRef);

        return docSnap.exists() ? ({
            ...docSnap.data(),
            id: docSnap.id,
        }) : null;
    }
    //3.
    // Función para actualizar un proyecto
    async function updateProyecto(datos) {
        const docRef = doc(db, proyecto, datos.id);

        await setDoc(docRef, datos);
    }

    //4.
    // Escuchar si hay en un cambio en la coleccion del proyecto actual y actualizar automaticamente la lista de proyectos
    onSnapshot(colectionproyectos, (querySnapshot) => {
        const data_tables = [];
        querySnapshot.forEach((doc) => {
            data_tables.push({
                ...doc.data(),
                id: doc.id,
            });
        });       
        GLOBAL.state.data = data_tables;
    });

    // Función para agregar un objeto de vigencia a la base de datos
    async function addTexto(objTexto, id) {
        await setDoc(doc(db, proyecto, id), objTexto); 
        open_proyecto_text()
    }

    async function updateTexto(texto) {
        const docRef = doc(db, proyecto, texto.id);
        await setDoc(docRef, texto);
    }


    // Funcion para eliminar un vigencia por id
    async function borrarTexto(id) {
        await deleteDoc(doc(db, proyecto, id));
        open_proyecto_text()
        mensajes("Se eliminó este texto", "orange")
    }

    GLOBAL.firestore = {
        getProyectos,
        getProyecto,
        updateProyecto,
        addTexto,
        updateTexto,
        borrarTexto
    }

}
//Función que escucha el cambio en inicio o cerrar sesión
onAuthStateChanged(auth, async (user) => {
    //console.log(GLOBAL.state)

})
//Función para autorizar ingreso a la base de datos
async function Verificar_Acceso(email, password) {
    try {
        const crearcredencial = await signInWithEmailAndPassword(auth, email, password)
        const proyecto = email.split("@")
        _sel_proyecto(proyecto[0])
        mensajes("El acceso se ha completado con éxito", "green")
        openIni(email)
    } catch (error) {
        mensajes("Su usuario y contraseña no son correctos", "orange")
    }

}
async function CredentialOut() {
    await signOut(auth)
    location.href = "../index.html"
}

GLOBAL.admin = {
    _sel_proyecto,
    Verificar_Acceso,
    CredentialOut,
}






