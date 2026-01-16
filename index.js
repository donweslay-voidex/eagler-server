const WebSocket = require('ws');
const net = require('net');
const http = require('http');

const PORT = process.env.PORT || 10000; // Use Render's port (10000)

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bridge OK');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    const mc = net.connect(15014, '147.135.104.179');
    
    ws.on('message', (data) => mc.write(data));
    mc.on('data', (data) => ws.send(data));
    ws.on('close', () => mc.end());
    mc.on('close', () => ws.close());
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Bridge running on Render-assigned port: ${PORT}`);
});
