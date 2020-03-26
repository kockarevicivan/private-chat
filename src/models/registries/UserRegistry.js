class UserRegistry {
    constructor () {
        this.users = {};
    }

    add (user) {
        this.users[user.id] = user;
    }

    get (id) {
        return this.users[id];
    }

    remove (user) {
        delete this.users[user.id];
    }
};

module.exports = new UserRegistry();
