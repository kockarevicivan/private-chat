const express = require('express');
const uuid = require('uuid-random');
const path = require('path');

const app = express();
const ws = require('express-ws')(app);
const port = process.env.PORT || 3000;

const conversations = {};
const users = {};

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.ws('/ws', function(ws, req) {
    const userId = uuid();
    const conversationId = uuid();

    users[userId] = ws;
    conversations[userId] = [ws];

    ws.send(JSON.stringify({
        type: 'ID',
        payload: userId
    }));

    ws.on('message', function (message) {
        message = JSON.parse(message);

        if (message.type == 'MESSAGE') {
            conversations[message.userId].map(s => s.send(JSON.stringify({
                type: 'MESSAGE',
                senderId: message.userId,
                payload: message.payload
            })));
        } else if (message.type == 'CONNECT') {
            const commonConversation = [...conversations[message.userId], ...conversations[message.payload]];
            conversations[message.payload] = conversations[message.userId] = commonConversation;
        }
    });

    ws.on('close', function () {
        delete users[userId];
        delete conversations[userId];
    });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
