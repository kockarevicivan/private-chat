const uuid = require('uuid-random');

module.exports = class File {
    constructor (name, content, timestamp, senderId) {
        this.id = uuid();
        this.name = name;
        this.content = content;
        this.timestamp = timestamp;
        this.senderId = senderId;
    }
};