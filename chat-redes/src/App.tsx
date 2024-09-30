import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false); // Estado para verificar a conexão

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket is connected');
      setIsConnected(true); // Define como conectado quando o WebSocket abrir
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('WebSocket is closed');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.log('WebSocket error', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && isConnected && newMessage) {
      ws.send(newMessage);
      setNewMessage('');
    } else {
      console.log('WebSocket not connected or message is empty');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat App</h1>
      <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
        disabled={!isConnected} // Desabilitar o input até conectar
      />
      <button onClick={sendMessage} disabled={!isConnected}>Send</button> {/* Desabilitar botão se não estiver conectado */}
    </div>
  );
};

export default ChatApp;
