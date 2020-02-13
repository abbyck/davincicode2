const router = require('express').Router();
const User = require('../../models/user');

const checkAuth = require('../../middlewares/check-auth')


router.post('/', checkAuth,(req, res, next) => {
    User.findOneAndUpdate({ username: req.body.username }, { moves: req.body.moves, time: req.body.time }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: "successfully updated status"
        })
    })
})

module.exports = router;