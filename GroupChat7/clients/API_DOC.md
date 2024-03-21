Realtime Chat API Documentation
Overview
The Realtime Chat API allows clients to establish WebSocket connections with the server to send and receive messages in real time.

WebSocket Endpoint
URL: ws://localhost:5000
Protocol: WebSocket
Authentication
Authentication is required to establish a WebSocket connection. Clients need to provide a valid authentication token in the WebSocket handshake request.

Sending Messages
Send Message
Method: POST
URL: /api/messages
Description: Sends a new message in the chat.
Request Body:
json
Copy code
{
  "senderId": "string",
  "receiverId": "string",
  "message": "string"
}
Response: Status 200 OK if successful.
Receiving Messages
The server will send received messages to the client in real time through the WebSocket connection.

Example Usage
Establish WebSocket Connection
Clients can use WebSocket to connect to the server using the WebSocket URL ws://localhost:5000.

javascript
Copy code
const socket = new WebSocket('ws://localhost:5000');

socket.onopen = () => {
  console.log('WebSocket connection opened');
};

socket.onmessage = (event) => {
  console.log('New message received:', event.data);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};
Send Message
Clients can send a new message to the server using the POST method to the /api/messages endpoint.

javascript
Copy code
const sendMessage = async (message) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  
  if (response.ok) {
    console.log('Message sent successfully');
  } else {
    console.error('Failed to send message');
  }
};

const newMessage = {
  senderId: 'user123',
  receiverId: 'user456',
  message: 'Hello, how are you?',
};

sendMessage(newMessage);
Receive Message
The server will send received messages from the sender to the receiver in real time through the established WebSocket connection.

javascript
Copy code
// On the server side (Node.js)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('New message:', message);
    // Logic to send message to receiver
    ws.send('Message received');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
Conclusion
The Realtime Chat API provides a seamless way for clients to communicate in real time using WebSocket technology. It enables instant messaging capabilities between users and supports features like message sending and receiving.