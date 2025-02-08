import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'system',
    content: 'Welcome to the VIP Lounge! 🎉',
    timestamp: new Date().toISOString()
  }));

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      // Broadcast message to all clients
      clients.forEach((client) => {
        if (client.readyState === 1) { // Check if client is open
          client.send(JSON.stringify({
            ...message,
            timestamp: new Date().toISOString()
          }));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });

  // Keep connection alive with ping/pong
  const pingInterval = setInterval(() => {
    if (ws.readyState === 1) {
      ws.ping();
    }
  }, 30000);

  ws.on('pong', () => {
    // Client is still alive
    console.log('Client responded to ping');
  });

  ws.on('close', () => {
    clearInterval(pingInterval);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
