const express = require('express');
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const config = require('./config');
const gameRoutes = require('./routes/gameRoutes');


const app = express();


// parse application/x-www-form-urlencoded
// parse application/json

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session application
// var session = require('express-session');
// app.use(session({ secret: 'plataforma5', resave: true, saveUninitialized: true }));


// Motor de plantillas, definición de rutas

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

app.use('/web', gameRoutes.routes);

// Levanta servidor
app.listen(config.port, () => {
    console.info('server listening on port 8080');
})


