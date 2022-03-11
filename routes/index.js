const express = require('express');
const router = express.Router();
//authentication middleware

//home page
router.get('/', (req, res) => {
  res.render('pages/index')
})
//log in page
router.get('/login', (req, res) => {
  res.render('pages/login')
})
//sign up pages
router.get('/sign-up', (req, res) => {
  res.render('pages/signUp')
})

module.exports = router;