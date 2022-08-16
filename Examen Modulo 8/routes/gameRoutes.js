const express = require('express');
const {
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
} = require('../controllers/gameController')
const router= express.Router()

// codigos para enrutar
router.get('/login', login);

router.get('/errorPagina', errorPagina);

router.get('/paginaPrincipal', paginaPrincipal);

router.get('/paginaPrincipal2', paginaPrincipal2);

router.get('/paginaPrincipal3', paginaPrincipal3);

router.get('/paginaPrincipal4', paginaPrincipal4);

router.get('/paginaPregunta', paginaPregunta);

router.get('/paginaPreguntaUsuario', paginaPreguntaUsuario);

router.get('/registro', entrarRegistro);

router.get('/Trivias', mostrarTrivias);

router.get('/TriviasUsuarios', mostrarTriviasUsuarios)

router.post('/logueando', logueando);

router.post('/registro', registro);

router.post('/enviarPreguntas', enviarPreguntas);

router.get('/preguntas', preguntas);

router.post('/puntajes', puntajes);

router.post('/Trivias', Trivias);

router.post('/TriviasUsuarios', TriviasUsuarios);

router.post('/validar', validar);

module.exports = {
    routes: router
};