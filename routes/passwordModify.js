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

  console.log(req.cookies.PassKey)
  if(req.cookies.PassKey){
    //console.log(req.cookies.PassKey)

    const sql_string = 'SELECT * FROM account WHERE PassKey=?'
     db.all(sql_string, req.cookies.PassKey, function(err, row)
    {
        if(err) throw err;
        if(row[0]['Permission']==0){
          console.log('yeah')
          res.render('passwordModify')
        }
        else{
          console.log('no')
          res.redirect('/Login')
        }
    })


  }else{
    console.log('no')
    res.redirect('/Login')

  }
});


router.post('/send', urlencodedParser, function(req, res, next)
{
    console.log('test')
    console.log(req.body.password)
});

module.exports = router;



