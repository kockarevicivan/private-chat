class ConversationRegistry {
    constructor () {
        this.conversations = {};
    }

    add (conversation) {
        this.conversations[conversation.id] = conversation;
    }

    get (id) {
        return this.conversations[id];
    }

    remove (conversation) {
        delete this.conversations[conversation.id];
    }
};

module.exports = new ConversationRegistry();
