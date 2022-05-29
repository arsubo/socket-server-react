//servidor express
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

//Servidor de sockets
const http= require('http');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //HTTP Server
        this.server = http.createServer(this.app);
        
        //configuracion de socket server
        this.io = socketio(this.server, {/* configuraciones */});
    }

    middlewares() {
        //desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }
    
    configurarSockets() {
        
        new Sockets(this.io);
    }

    execute() {

        //Inicializar Middlewares
        this.middlewares();

        //Iniciarlizar Sockets
        this.configurarSockets();

        //Iniciarlizar server
        this.server.listen(this.port, () => {
                console.log('servidor corriendo en el puerto:', this.port)
            });
    }
}

module.exports = Server;