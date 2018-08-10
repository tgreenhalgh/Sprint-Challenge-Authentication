const express = require('express');
const cors = require('cors');

const configureRoutes = require('./config/routes');
const errors = require('./middleware/errors');

const server = express();
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

server.use(express.json());
server.use(cors());

configureRoutes(server);

// middleware errors
server.use(errors);

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

module.exports = {
  server,
};
