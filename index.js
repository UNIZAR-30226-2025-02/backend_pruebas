const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');

const app = express();

// Crea el servidor manualmente para poder utilizar WebSockets
const server = http.createServer(app);
const io = socket(server);

const PORT = 3000;

// Para poder recibir JSONs en el body de las requests
app.use(express.json());                                                 

// Ruta de prueba para comprobar que el servidor está funcionando
app.get("/", (req, res) => {
    console.log(req.body);
    res.json({ message: "Servidor funcionando" });
});

// Inicializa el servidor, que se pone a la escucha
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  
// WebSockets para comunicación en tiempo real
let usuariosConectados = 0;
io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");
    usuariosConectados++;
    console.log("Usuarios conectados: ", usuariosConectados);

    socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
    usuariosConectados--;
    console.log("Usuarios conectados: ", usuariosConectados);
  });
});