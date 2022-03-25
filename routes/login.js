const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
router.use(express.json())

const {authenticateToken} = require('../middleware/tokenAuthenticate')

const serverData = [
  {
    username: 'James',
    secret: '3.141592653589793238462643383279502884'
  },
  {
    username: 'Ethan',
    secret: '3.141592653589793238462643383279502884'
  }
]
let users = []
router.get('/posts', authenticateToken, (req, res) => {
  res.json(serverData.filter(post => post.username === req.user.name))
})

router.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(5)
        console.log(`Salt ${salt}`);
        console.log(req.body)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(`hashedPassword ${hashedPassword}`);

        const user = {name: req.body.name, email: req.body.email, password: hashedPassword}
        users.push(user)
        console.log(users)

        res.sendStatus(201);
    } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
})

module.exports = router;