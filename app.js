const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/styles",express.static(__dirname + "/views/styles"));
app.use("/scripts",express.static(__dirname + "/views/scripts"));
app.use("/assets",express.static(__dirname + "/views/assets"));


const port = process.env.PORT || 5000;

//navigation routing
app.use('/', require('./routes/index'))
app.use('/api/v1/', require('./routes/login'))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})