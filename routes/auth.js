const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

//middleware
const {generateAccessToken, generateRefreshToken} = require('../middleware/tokenGeneration');
router.use(express.json());

let refreshTokenDatabase = [];

router.post('/token', (req, res) => {
  const clientRefreshToken = req.body.token;
  if (clientRefreshToken == null) return res.sendStatus(401);
  if (!refreshTokenDatabase.includes(clientRefreshToken)) return res.sendStatus(403);
  jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({name: user.name});
    res.json({accessToken});
  });
})

router.post('/login', (req, res) => {
  //authentication USERS
  console.log(req.body)
  const username = req.body.username;
  const user = {name: username}
  //assume that the authentication has been completed the JWT.sign should also include the password
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokenDatabase.push(refreshToken);
  res.json({accessToken, refreshToken})
})

router.delete('/logout', (req, res) => {
  refreshTokenDatabase = refreshTokenDatabase.filter(token => token !== req.body.token);
  res.sendStatus(204);
})

module.exports = router;