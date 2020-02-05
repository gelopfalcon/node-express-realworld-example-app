var router = require('express').Router();

router.use('/api', require('./api'));

router.get('/', function(req, res, next){
    return res.sendStatus(200);
});
module.exports = router;
