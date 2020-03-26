const express = require('express');
const path = require('path');

const socketController = require('./controllers/socketController');

// Initialize app.
const app = express();
const port = process.env.PORT || 3000;
require('express-ws')(app);

// Map static, http and socket routes.
app.use('/assets', express.static(path.join(__dirname, './static/assets')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './static/index.html')));
app.ws('/ws', socketController.onConnection);

// Listen on port.
app.listen(port, () => console.log(`http://localhost:${port}`));
