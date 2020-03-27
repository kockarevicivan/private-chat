const express = require('express');
const path = require('path');

const socketController = require('./controllers/socketController');

// Initialize app.
const app = express();
const port = process.env.PORT || 3000;
require('express-ws')(app);

// Map static, http and socket routes.
app.use('/css', express.static(path.join(__dirname, './static/css')));
app.use('/images', express.static(path.join(__dirname, './static/images')));
app.use('/js', express.static(path.join(__dirname, './static/js')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './static/index.html')));
app.ws('/', socketController.onConnection);

// Listen on port.
app.listen(port, () => console.log(`http://localhost:${port}`));
