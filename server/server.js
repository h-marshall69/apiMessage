import express from 'express';
import cors from 'cors';
import { Server } from "socket.io"

const PORT = process.env.PORT || 3500
const ADMIN = "Admin"

const app = express();

// Configurar CORS (puedes personalizar los orígenes si es necesario)
const corsOptions = {
  origin: 'http://localhost:3000',  // Ajusta el origen según tu frontend
  methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


const io = new Server(expressServer, {
  cors: {
      origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
  }
})

// WebSocket - Manejo de eventos de conexión
io.on('connection', socket => {
  console.log(`Nuevo usuario conectado: ${socket.id}`);

  // Escuchar y emitir mensajes
  socket.on('send_message', (msg) => {
    console.log('Mensaje recibido:', msg);
    io.emit('receive_message', msg);  // Emitir a todos los clientes
  });

  // Manejo de desconexión
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Ruta API para obtener datos
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hola desde el servidor!' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

