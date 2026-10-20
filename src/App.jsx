import { useState, useEffect } from 'react';
import './App.css';

function App({ ws }) {
  const [chat, setChat] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    ws.onmessage = (event) => {
      setChat((prev) => prev + event.data + '\n');
    };
  }, [ws]);

  const sendMessage = () => {
    ws.send(`${nickname}: ${message}`);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Web Sockets</h1>
      <div>
        <textarea rows="30" cols="60" readOnly aria-label="chat" value={chat} />
      </div>
      <input
        placeholder="Your nickname"
        size="11"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        placeholder="Type your message"
        size="40"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
