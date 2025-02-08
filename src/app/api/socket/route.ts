import { Server as SocketIOServer } from 'socket.io';
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

let io: SocketIOServer;

if (!io) {
  io = new SocketIOServer({
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('join-room', (room) => {
      socket.join(room);
      io.to(room).emit('user-joined', { 
        message: 'A new bestie joined the chat! 💅',
        timestamp: new Date().toISOString()
      });
    });

    socket.on('leave-room', (room) => {
      socket.leave(room);
      io.to(room).emit('user-left', {
        message: 'A bestie left the chat',
        timestamp: new Date().toISOString()
      });
    });

    socket.on('send-message', ({ room, message, username }) => {
      io.to(room).emit('new-message', {
        message,
        username,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

export async function GET(request: NextRequest) {
  return new NextResponse(null, { status: 101 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  io.emit(body.event, body.data);
  return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}
