var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})
// express.bodyParser
// express.use(bodyParser.json());
// express.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('ff')
  res.render('passwordModify');
});


router.post('/send', function(req, res, next)
{
  const sql_string = 'UPDATE account SET Password = ? WHERE Permission = 0'
  db.run(sql_string, req.body.password, function(err, row)
  {
    if (err) throw err;
    // res.render('systemManage')
    res.json({href:'/systemManage'})
  })
});

module.exports = router;


