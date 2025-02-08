const { WebSocketServer } = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server with ping/pong to keep connections alive
const wss = new WebSocketServer({ server });

// Store all connections
const connections = new Set();

// Send ping to all clients every 30 seconds to keep connections alive
setInterval(() => {
  connections.forEach((ws) => {
    if (ws.isAlive === false) {
      connections.delete(ws);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  ws.isAlive = true;
  connections.add(ws);

  // Handle pong messages
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Send welcome message
  broadcast({
    type: 'system',
    content: 'A new bestie joined the chat! 💅',
    timestamp: new Date().toISOString()
  });

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received message:', message);

      if (message.type === 'message') {
        broadcast({
          type: 'message',
          content: message.content,
          username: message.username,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    connections.delete(ws);
    broadcast({
      type: 'system',
      content: 'A bestie left the chat',
      timestamp: new Date().toISOString()
    });
  });
});

function broadcast(message) {
  const messageStr = JSON.stringify(message);
  connections.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(messageStr);
    }
  });
}

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`WebSocket server is running on ${HOST}:${PORT}`);
});
