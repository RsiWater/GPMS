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


let accountName = undefined

router.post('/sendAccount', function(req, res, next)
{
  accountName = req.body.Name
  res.json({href: '/systemManage/accountManage/passwordModify'})
})

router.post('/send', function(req, res, next)
{
  console.log(req.body.password)
  const sql_string = 'UPDATE account SET Password = ? WHERE Name = ?'
  db.run(sql_string, req.body.password, accountName, function(err, row)
  {
    if (err) throw err;
    res.json({href:'/systemManage'})
  })
});

module.exports = router;


