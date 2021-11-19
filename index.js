const express = require('express')
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.js')
const app = express();
const mongoose = require('mongoose');

// const mongoose = require('mongoose')
const PORT = 5000;
const cors = require('cors')


app.use(cors())


mongoose.connect("mongodb://localhost:27017/clients", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(data => {
        console.log("database connected ");
    })
    .catch(err => {
        console.log("database error : ", err);
    })
app.use(bodyParser.json());
app.use('/users', usersRoutes);

// app.get('/',  (req, res) => {
//     console.log('object');
//     res.send('Hello from homepage')
// })

app.listen(PORT, async () => {
    console.log('localhost:5000 on');
})
