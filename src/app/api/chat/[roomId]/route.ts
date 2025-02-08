import { WebSocket, WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';

interface Message {
  type: 'message' | 'system';
  content: string;
  username?: string;
  timestamp: string;
}

interface JoinMessage {
  type: 'join';
  room: string;
}

interface LeaveMessage {
  type: 'leave';
}

interface ChatMessage {
  type: 'message';
  content: string;
  username: string;
}

type IncomingMessage = JoinMessage | LeaveMessage | ChatMessage;

const rooms = new Map<string, Set<WebSocket>>();
const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws: WebSocket) => {
  let currentRoom: string | null = null;

  ws.on('message', (data: string) => {
    try {
      const message: IncomingMessage = JSON.parse(data);
      
      switch (message.type) {
        case 'join':
          if (currentRoom) {
            const room = rooms.get(currentRoom);
            room?.delete(ws);
          }
          currentRoom = message.room;
          if (!rooms.has(currentRoom)) {
            rooms.set(currentRoom, new Set());
          }
          rooms.get(currentRoom)?.add(ws);
          
          // Broadcast join message
          broadcastToRoom(currentRoom, {
            type: 'system',
            content: 'A new bestie joined the chat! 💅',
            timestamp: new Date().toISOString()
          });
          break;

        case 'message':
          if (currentRoom) {
            broadcastToRoom(currentRoom, {
              type: 'message',
              content: message.content,
              username: message.username,
              timestamp: new Date().toISOString()
            });
          }
          break;

        case 'leave':
          if (currentRoom) {
            const room = rooms.get(currentRoom);
            room?.delete(ws);
            broadcastToRoom(currentRoom, {
              type: 'system',
              content: 'A bestie left the chat',
              timestamp: new Date().toISOString()
            });
            currentRoom = null;
          }
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    if (currentRoom) {
      const room = rooms.get(currentRoom);
      room?.delete(ws);
      broadcastToRoom(currentRoom, {
        type: 'system',
        content: 'A bestie left the chat',
        timestamp: new Date().toISOString()
      });
    }
  });
});

function broadcastToRoom(roomId: string, message: Message) {
  const room = rooms.get(roomId);
  if (room) {
    const messageStr = JSON.stringify(message);
    room.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }
}

export async function GET() {
  // This route exists to satisfy Next.js but we're using raw WebSocket
  return new NextResponse(null, { status: 101 });
}
