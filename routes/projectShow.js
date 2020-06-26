var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('asd')
  res.render('projectShow');
});

router.post('/modifyProject', function(req, res, next)
{
    console.log(req.body.testData)
    // console.log(JSON.parse(req.body.code))
})

module.exports = router;
