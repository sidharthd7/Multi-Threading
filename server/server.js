const express = require('express');
const { spawn } = require('child_process');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173',  
      methods: ['GET', 'POST'],
    },
  });

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));

app.get('/', (req, res) => {
  res.send('Server is running.');
});

io.on('connection', (socket) => {
  console.log('New client connected');


  const python = spawn('python3', ['main.py']);  

  python.stdout.on('data', (data) => {
    
    console.log(`Data from Python: ${data}`);
    socket.emit('pythonData', data.toString());
  });

  python.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    python.kill();  
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
