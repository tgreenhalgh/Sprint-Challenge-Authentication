const axios = require('axios');
const { registerConstraints, loginConstraints } = require('../middleware/');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', registerConstraints, register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const { USERNAME, PASSWORD } = req;
  console.log('user and pass', USERNAME, PASSWORD);
  res.JSON(USERNAME);
}

function login(req, res) {
  // implement user login
  res.send('howdy');
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten',
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
