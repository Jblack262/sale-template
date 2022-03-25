require('dotenv').config();
const express = require('express');
const app = express();


app.use('/api/v1/', require('./routes/auth'))


app.listen(4000, () => {
  console.log('server listening on port 4000')
})