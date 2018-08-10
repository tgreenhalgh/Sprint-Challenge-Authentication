const axios = require('axios');
const bcrypt = require('bcryptjs');
const registerDB = require('../database/helpers/registerDB');
const { registerConstraints, loginConstraints } = require('../middleware/');

const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', registerConstraints, register);
  server.post('/api/login', loginConstraints, login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const { USERNAME, CLEARPASSWORD } = req;
  try {
    // hash the password
    const HASH = await bcrypt.hash(CLEARPASSWORD, 14);
    const USER = { username: USERNAME, password: HASH };
    try {
      const response = await registerDB.insert(USER);
      if (response) {
        // set JWT: generate the token
        const token = generateToken(USER);
        // attach token to the response
        res.status(200).send(token);
      } else {
        res.status(400).json({
          error: `Undetermined error adding user.`,
        });
      }
    } catch (err) {
      res.status(500).send(`${err}`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
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
