const express = require('express');
const { spawn } = require('child_process');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173',  // Allow the front-end to connect
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

  // Run the Python script and listen for its output
  const python = spawn('python3', ['main.py']);  // Make sure to use the correct path to Python and script

  python.stdout.on('data', (data) => {
    // Send the data from Python script to the front-end
    console.log(`Data from Python: ${data}`);
    socket.emit('pythonData', data.toString());
  });

  python.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    python.kill();  // Optionally terminate the Python script when the client disconnects
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
