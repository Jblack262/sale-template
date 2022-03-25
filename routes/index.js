const express = require('express');
const navigation = express.Router();
//authentication middleware

//home page
navigation.get('/', (req, res) => {
  res.render('pages/index')
})
//log in page
navigation.get('/login', (req, res) => {
  res.render('pages/login')
})
//sign up pages
navigation.get('/sign-up', (req, res) => {
  res.render('pages/signUp')
})

module.exports = navigation;