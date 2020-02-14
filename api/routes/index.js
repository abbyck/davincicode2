var router = require('express').Router();

const User = require('../models/user');

// split up route handling

// LeaderBoard
router.get('/', (req, res) => {
    User.find({}, function(err, docs) {
        if (!err) {
            // console.log(docs.length);
            res.render('lead', {
                user: docs,
            });
            console.log(docs)
            // res.send("ok")
        } else {
            console.log(err);
        }
    });
});


router.use('/user', require('./user'));
router.use('/admin', require('./admin'));

// Basic error handling
router.use((req, res, next) => {
    const err = new Error('No routes could satisfy the req');
    err.status = 404;
    next(err);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = router;