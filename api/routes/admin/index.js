
var router = require('express').Router();

// User Account creation
// router.get('/adduser', req.send("hello"));
router.use('/adduser', require('./useractions'));

module.exports = router;