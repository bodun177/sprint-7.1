const { WebSocketServer, WebSocket } = require('ws');

const wss = new WebSocketServer({ port: 8082 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

module.exports = wss;
