var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// express.bodyParser
// express.use(bodyParser.json());
// express.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('passwordModify');
});


router.post('/send', urlencodedParser, function(req, res, next)
{
    console.log('test')
    console.log(req.body.password)
});

module.exports = router;



