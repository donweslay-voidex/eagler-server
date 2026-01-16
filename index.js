const WebSocket = require('ws');
const net = require('net');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Eaglercraft client connected');
    
    // Connect to YOUR EXISTING Purpur server
    const mcSocket = net.createConnection({
        host: '147.135.104.179', // YOUR SERVER IP
        port: 25565
    });
    
    // WebSocket ↔ TCP Bridge
    ws.on('message', (data) => {
        mcSocket.write(data);
    });
    
    mcSocket.on('data', (data) => {
        ws.send(data);
    });
    
    ws.on('close', () => mcSocket.end());
    mcSocket.on('close', () => ws.close());
    
    mcSocket.on('error', () => ws.close());
    ws.on('error', () => mcSocket.end());
});

console.log('Eaglercraft bridge running on port 8080');