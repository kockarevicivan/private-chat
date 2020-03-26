const uuid = require('uuid-random');

module.exports = class Message {
    constructor (text, timestamp, senderId) {
        this.id = uuid();
        this.text = text;
        this.timestamp = timestamp;
        this.senderId = senderId;
    }
};