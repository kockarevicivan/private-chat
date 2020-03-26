const uuid = require('uuid-random');

module.exports = class Conversation {
    constructor (creator) {
        this.id = uuid();
        this.users = [creator];
    }

    addUser (user) {
        this.users.push(user);
    }

    removeUser (user) {
        this.users = this.users.filter(conversationUser => conversationUser.id != user.id);
    }

    isEmpty () {
        return !this.users || !this.users.length;
    }

    sendMessage (message) {
        this.users.forEach(user => user.sendMessage(message));
    }
};