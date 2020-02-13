const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const CheckAuth = require('../../middlewares/check-auth');


// User account creation
router.get('/', (req, res, next)=>{
    res.send("hello");
})

router.post('/', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'User user exists',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } // end if
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            teamname: req.body.teamname,
                            password: hash,
                            started: false
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    } //end else
                }); //end hash
            }
        });
}); //end post



module.exports = router;