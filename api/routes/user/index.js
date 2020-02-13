var router = require('express').Router();

// Login
router.use('/login', require('./login'));
// Update Status
router.use('/statusupdate', require('./updatestatus'));

module.exports = router;