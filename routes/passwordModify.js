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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('passwordModify');
});


let accountName = undefined

router.post('/sendAccount', function(req, res, next)
{
  accountName = req.body.Name
  res.json({href: '/systemManage/accountManage/passwordModify'})
})

router.post('/send', function(req, res, next)
{
  const sql_string = 'UPDATE account SET Password = ? WHERE Name = ?'
  db.run(sql_string, req.body.password, accountName, function(err, row)
  {
    if (err) throw err;
    // res.render('systemManage')
    res.json({href:'/systemManage'})
  })
});

module.exports = router;


