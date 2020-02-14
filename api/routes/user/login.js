const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message:
                        'Incorrect username or Password, \nTry again with correct credentials',
                });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                username: user[0].username,
                                UserId: user[0]._id,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '10h',
                            }
                        );
                        // Update login status
                        User.findOneAndUpdate({username: req.body.username}, {started: true}, (err, docs) => {
                            if (err) {
                                return res.status(401).json({
                                    message:
                                        'Try again',
                                });
                            }
                            return res.status(200).json({
                                message: 'Authentication Successful',
                                token: token,
                            });
                        })

                    } else{
                        return res.status(401).json({
                            message:
                                'Incorrect username or Password, \nTry again with correct credentials',
                        });
                    }
                    
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;