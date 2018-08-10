const axios = require('axios');
const bcrypt = require('bcryptjs');
// database helpers
const registerDB = require('../database/helpers/registerDB');
const usersDB = require('../database/helpers/usersDB');
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

async function login(req, res) {
  // implement user login
  const { USERNAME, CLEARPASSWORD } = req;

  try {
    const USER = await usersDB.getByUsername(USERNAME);
    if (USER) {
      const VALID = await bcrypt.compare(CLEARPASSWORD, USER.password);
      if (VALID) {
        // set JWT: generate the token
        const token = generateToken(USER);
        // attach token to the response
        res.status(200).send(token);
      } else {
        res.status(401).json({ error: `Unauthorized` });
      }
    } else {
      // error with the user, but don't let the hackers know!
      // take the same amount of time as if legit checking
      await bcrypt.compare(
        CLEARPASSWORD,
        '$2a$14$plRslh.07bHu/BWHztxq9.20YIJluMBo9JhdIOCJOQjvAZHmbPV6a',
      );
      res.status(401).json({ error: `Unauthorized` });
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
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
