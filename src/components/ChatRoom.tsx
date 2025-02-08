import { useEffect, useRef, useState } from 'react';

interface Message {
  type: 'message' | 'system';
  content: string;
  username?: string;
  timestamp: string;
}

interface ChatRoomProps {
  name: string;
  activeUsers: number;
}

let ws: WebSocket | null = null;

export function ChatRoom({ name, activeUsers }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate username after component mounts
  useEffect(() => {
    const adjectives = ['Sassy', 'Sparkly', 'Royal', 'Golden', 'Drama'];
    const nouns = ['Queen', 'Bestie', 'Champion', 'Star', 'Icon'];
    const randomUsername = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
    setUsername(randomUsername);
  }, []);

  useEffect(() => {
    if (!username) return;

    const connectWebSocket = () => {
      // Use environment variable for WebSocket URL
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
      
      console.log('Connecting to WebSocket:', wsUrl);
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Connected to WebSocket');
        setConnected(true);
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket');
        setConnected(false);
        ws = null;
        // Try to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
      };
    };

    connectWebSocket();

    return () => {
      if (ws && ws.readyState === 1) {
        ws.close();
      }
    };
  }, [username]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && ws && connected && username) {
      ws.send(JSON.stringify({
        type: 'message',
        content: inputMessage,
        username
      }));
      setInputMessage('');
    }
  };

  if (!username || !connected) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
        <div className="text-center text-[#FFB81C]">
          {!username ? 'Joining chat...' : 'Connecting...'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[#FFB81C] font-bold">{name}</h3>
        <span className="bg-[#E31837] px-2 py-1 rounded-full text-white text-xs">
          {activeUsers} VIPs
        </span>
      </div>
      
      <div className="h-60 bg-black/20 rounded-lg mb-2 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`${
              msg.type === 'system'
                ? 'text-[#FFB81C] italic text-center' 
                : 'bg-black/30 rounded p-2'
            }`}
          >
            {msg.type === 'message' && (
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span className="font-medium text-[#FFB81C]">{msg.username}</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            <p className="text-white">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 bg-black/30 text-white placeholder-gray-400 rounded-lg px-3 py-1"
        />
        <button 
          type="submit"
          className="bg-[#FFB81C] text-black px-3 py-1 rounded-lg font-medium hover:bg-[#FFB81C]/80 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
