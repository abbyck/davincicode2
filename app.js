const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const morganBody = require('morgan-body');
var fileupload = require("express-fileupload");

// DB connection
mongoose.connect(
        'mongodb+srv://dcodeadmin:'+ 
        process.env.MONGO_PW +
        '@davincicode-c73pr.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true  },
    err => {
        if (err) {
            console.log('DB: Connection Error:' + err);
        }
        console.log('DB: Connected Successfully');
    }
);

mongoose.set('useCreateIndex', true);

morganBody(app);



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());

// Engine
app.set('view engine', 'ejs');
// public
app.use(express.static('public'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.use('/hello', require('./helloworld'));
app.use('/', require('./api/routes'));

module.exports = app;
