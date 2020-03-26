const uuid = require('uuid-random');

module.exports = class User {
    constructor (socket) {
        this.id = uuid();
        this.socket = socket;
    }

    sendMessage (message) {
        this.socket.send(message);
    }
};
