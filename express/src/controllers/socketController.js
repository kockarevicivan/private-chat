const conversationRegistry = require('../models/registries/ConversationRegistry');
const userRegistry = require('../models/registries/UserRegistry');

const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Message = require('../models/Message');

class SocketController {
    onConnection (socket) {
        let user = new User(socket);
        let conversation = new Conversation(user);

        userRegistry.add(user);
        conversationRegistry.add(conversation);

        socket.send(JSON.stringify({
            type: 'SESSION_DATA',
            payload: {
                userId: user.id,
                conversationId: conversation.id
            }
        }));

        socket.on('message', (data) => {
            data = JSON.parse(data);

            if (data.type == 'MESSAGE') {
                conversation.sendMessage(JSON.stringify({
                    type: 'MESSAGE',
                    payload: new Message(
                        data.payload.text,
                        data.payload.timestamp,
                        user.id
                    )
                }));
            } else if (data.type == 'CONNECT') {
                conversation.removeUser(user);

                if (conversation.isEmpty())
                    conversationRegistry.remove(conversation);

                conversation = conversationRegistry.get(data.payload.conversationId);
                conversation.addUser(user);

                socket.send(JSON.stringify({
                    type: 'SESSION_DATA',
                    payload: {
                        userId: user.id,
                        conversationId: conversation.id
                    }
                }));
            }
        });

        socket.on('close', () => {
            userRegistry.remove(user);

            if (conversation.isEmpty())
                conversationRegistry.remove(conversation);
        });
    }
};

module.exports = new SocketController();
