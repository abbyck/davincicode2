const router = require('express').Router();
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();


router.get('/', multipartMiddleware,(req, res, next) => {
    res.render('upload');
})


router.post('/', (req, res, next) => {
    console.log("hello")
    console.log(req.files);
    res.send('ok');
})

module.exports = router;