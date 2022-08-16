const firebase = require('../db');
const Login = require('../models/login');
const Preguntas = require('../models/preguntas');
const Respuestas = require('../models/respuestas');
const fireStore = firebase.firestore();
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())


//Mostrar página de inicio (GET './')
const login = async (req, res) => {
    res.render("login")
}
//Mostrar página de error app.get('/errorPagina')
const errorPagina = async (req, res) => {
    res.render("errorPagina", {mensaje : 'Sucedio un error, no te asustes'})
}
//Mostrar página principal app.get('/paginaPrincipal',
const paginaPrincipal = async (req, res) => {
    res.render("paginaPrincipal", {mensaje : ''})
}
//Mostrar página principal2
const paginaPrincipal2 = async (req, res) => {
    res.render("paginaPrincipal2")
}
//Mostrar página principal3
const paginaPrincipal3 = async (req, res) => {
    res.render("paginaPrincipal3", {mensaje : ''})
}
//Mostrar página principal4
const paginaPrincipal4 = async (req, res) => {
    res.render("paginaPrincipal4")
}
//Mostrar Página de pregunta app.get('/paginaPregunta',
const paginaPregunta = async (req, res) => {
    res.render("paginaPregunta")
}
//Mostrar Página de pregunta Usuario app.get('/paginaPreguntaUsuario',
const paginaPreguntaUsuario = async (req, res) => {
    res.render("paginaPreguntaUsuario")
}
//Mostrar la página de registro app.get('/registro',
const entrarRegistro = async (req, res) => {
    console.log("*** entramos al registro ***");
    res.render("registro")
}
//Mostrar Pagina del juego app.get('/Trivias',
const mostrarTrivias = async (req, res) => {
    res.render("Trivias")
}
//Mostrar Pagina del juego Para Usuarios app.get('/TriviasUsuarios', 
const mostrarTriviasUsuarios = async (req, res) => {
    res.render("TriviasUsuarios")
}
//Logeo de usuario app.post('/logueando',
const logueando = async (req, res) => {
    console.log("Entre a logueo");
    const logueo = await fireStore.collection("userLogin");
    const data = await logueo.get(); {
        if (data.empty) {
            res.render("errorPagina", { message: "No se encontró nada" });
        } else {
            await data.forEach((item) => {
                new Login(
                    item.data().user,
                    item.data().password,
                    item.data().es_admin
                );
                let ingresarNombre = req.body.ingresarNombre;
                let ingresarPassword = req.body.ingresarPassword;
                try {
                    if (item.data().user == ingresarNombre && item.data().password == ingresarPassword && item.data().es_admin == '0') {
                        res.render("paginaPrincipal", { mensaje: 'Usuario: ' + item.data().user })
                    }
                    if (item.data().user == ingresarNombre && item.data().password == ingresarPassword && item.data().es_admin == '1') {
                        res.render("paginaPrincipal3", { mensaje: 'Usuario: ' + item.data().user })
                    }
                    if ((ingresarNombre = '') || (ingresarPassword = '')) {
                        res.render('errorPagina', {mensaje: 'Usuario o Password incorrecto. Intente nuevamente'})
                        // res.status(404).json({ Mensaje: 'Usuario o Password incorrecto' })
                    }
                }
                catch (error) {
                    res.status(404).json({ mensaje: error.message })
                }
            });
        };
    }
}
//Registro del Usuario app.post('/registro',
const registro = async (req, res) => {
    console.info("*****Entrando a registro*****");
    const datos = req.body;
    //console.log(registroNombre + registroPassword)
    try {
        await fireStore.collection("userLogin").doc().set(datos);
        res.render("exito", { mensaje: 'Usuario ha sido ingresado correctamente' })
        //res.status(200).json({message: 'registro exitoso'})
    } catch (error) {
        res.render("errorPagina", { message: 'Ha ocurrido un error, por favor reintente'});
    }
}
//Agregar preguntas en el form app.post('/enviarPreguntas',
const enviarPreguntas = async (req, res) => {
    try {
        const datos = req.body;
            await fireStore.collection("preguntas").doc().set(datos);
            res.render("exito", { mensaje: 'La pregunta ha sido registrada exitosamente' })
        }
     catch (error) {
        // res.status(400).json({ message: error.mesagge });
        res.render("errorPagina", { mensaje: 'Pregunta no ingresada. Intente nuevamente ' })
    }
}
const preguntas = async (req, res) => {
    const correcta = req.body.correcta;
    const logueo = await fireStore.collection("preguntas");
    const data = await logueo.get();
    const arreglo = [];

    if (data.empty) {
        res.render("errorPagina", { mensaje: 'Pregunta no ingresada. Intente nuevamente' })
    } else {
        await data.forEach((item) => {
            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );
            arreglo.push(resultado1);
        });
    };
    arreglo.sort((a, b) => Math.random() - 0.5)
    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const objeto = {
        pregunta: resultado2.agregarPregunta,
        pregunta2: resultado2.respuestaCorrecta,
        pregunta3: resultado2.respuestaFalsa1,
        pregunta4: resultado2.respuestaFalsa2
    }
    res.render('paginaPrincipal', {
        pregunta: resultado2.agregarPregunta,
        pregunta2: resultado2.respuestaCorrecta,
        pregunta3: resultado2.respuestaFalsa1,
        pregunta4: resultado2.respuestaFalsa2
    })
    console.debug("firebase " + resultado2.respuestaCorrecta + "usuario " + correcta)
} 
//Mostrar puntaje app.post("/puntajes",
const puntajes = (req, res) => {
    const correcta = req.body.correcta;
    res.render("Puntajes")
}
//Acción de trivia app.post('/Trivias',
const Trivias = async (req, res) => {

    const respuestaBuena = req.body;

    const incorrecta1 = req.body.incorrecta1;
    const incorrecta2 = req.body.incorrecta2;
    var logueo = await fireStore.collection("preguntas");

    var data = await logueo.get();

    const arreglo = [];
    //const arregloPreguntas = [];
    if (data.empty) {
        res.render('errorPagina',{ message: "No se encontró nada" });
    } else {


        await data.forEach((item) => {

            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );


            arreglo.push(resultado1);
        });
    };

    arreglo.sort((a, b) => Math.random() - 0.5)

    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado3 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado4 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado5 = await arreglo[Math.floor(Math.random() * arreglo.length)]

    res.render('Trivias', {
        pregunta: resultado2.agregarPregunta,
        respuestaCorrecta: resultado2.respuestaCorrecta,
        RespuestaIncorrecta1: resultado2.respuestaFalsa1,
        RespuestaIncorrecta2: resultado2.respuestaFalsa2,
        pregunta2: resultado3.agregarPregunta,
        respuestaCorrecta2: resultado3.respuestaCorrecta,
        RespuestaIncorrecta22: resultado3.respuestaFalsa1,
        RespuestaIncorrecta22: resultado3.respuestaFalsa2,
        pregunta3: resultado4.agregarPregunta,
        respuestaCorrecta3: resultado4.respuestaCorrecta,
        RespuestaIncorrecta33: resultado4.respuestaFalsa1,
        RespuestaIncorrecta33: resultado4.respuestaFalsa2,
        pregunta4: resultado5.agregarPregunta,
        respuestaCorrecta4: resultado5.respuestaCorrecta,
        RespuestaIncorrecta44: resultado5.respuestaFalsa1,
        RespuestaIncorrecta44: resultado5.respuestaFalsa2,

    })
}
//Acción de trivia Usuarios app.post('/TriviasUsuarios',
const TriviasUsuarios = async (req, res) => {

    const respuestaBuena = req.body;

    const incorrecta1 = req.body.incorrecta1;
    const incorrecta2 = req.body.incorrecta2;
    var logueo = await fireStore.collection("preguntas");

    var data = await logueo.get();

    const arreglo = [];
    //const arregloPreguntas = [];
    if (data.empty) {
        res.status(200).json({ message: "No se encontró nada" });
    } else {


        await data.forEach((item) => {

            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );


            arreglo.push(resultado1);
        });
    };

    arreglo.sort((a, b) => Math.random() - 0.5)

    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado3 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado4 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado5 = await arreglo[Math.floor(Math.random() * arreglo.length)]

    res.render('TriviasUsuarios', {
        pregunta: resultado2.agregarPregunta,
        respuestaCorrecta: resultado2.respuestaCorrecta,
        RespuestaIncorrecta1: resultado2.respuestaFalsa1,
        RespuestaIncorrecta2: resultado2.respuestaFalsa2,
        pregunta2: resultado3.agregarPregunta,
        respuestaCorrecta2: resultado3.respuestaCorrecta,
        RespuestaIncorrecta22: resultado3.respuestaFalsa1,
        RespuestaIncorrecta22: resultado3.respuestaFalsa2,
        pregunta3: resultado4.agregarPregunta,
        respuestaCorrecta3: resultado4.respuestaCorrecta,
        RespuestaIncorrecta33: resultado4.respuestaFalsa1,
        RespuestaIncorrecta33: resultado4.respuestaFalsa2,
        pregunta4: resultado5.agregarPregunta,
        respuestaCorrecta4: resultado5.respuestaCorrecta,
        RespuestaIncorrecta44: resultado5.respuestaFalsa1,
        RespuestaIncorrecta44: resultado5.respuestaFalsa2,

    })
}
//Accion Validar Trivia app.post("/validar"
const validar = async (req, res) => {
    const respuestaBuena = req.body;
    try {
        await fireStore.collection("respuestasCorrectas").doc().set(respuestaBuena);
        const logueo = await fireStore.collection("respuestasCorrectas");
        const data = await logueo.get();
        const arreglo2 = []
        if (data.empty) {
            response.status(200).json({ message: "No se encontró nada" });
        } else {
            let total = 0;
            data.forEach((item) => {
                const login = new Respuestas(
                    item.id,
                    item.data().rp1,
                    item.data().rp2,
                    item.data().rp3,
                );
                arreglo2.push(login)
            });
        };
        console.log("-------------------------------")
        res.render("finalTest", { respuesta1: respuestaBuena.rp1, respuesta2: respuestaBuena.rp2, respuesta3: respuestaBuena.rp3 })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
login, 
errorPagina, 
paginaPrincipal, 
paginaPrincipal2, 
paginaPrincipal3, 
paginaPrincipal4, 
paginaPregunta, 
paginaPreguntaUsuario, 
entrarRegistro, 
mostrarTrivias, 
mostrarTriviasUsuarios,
logueando,
registro,
enviarPreguntas,
preguntas,
puntajes,
Trivias,
TriviasUsuarios,
validar
}