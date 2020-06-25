var express = require('express');
const { InsufficientStorage } = require('http-errors');
var router = express.Router();

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
          res.render('themePicker')
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

router.post('/', function(req, res, next)
{
  const sql_string = 'UPDATE theme SET themeType = ? WHERE id = 0'
  db.run(sql_string, req.body.themeType, function(err, row)
  {
    if(err) throw err;
    console.log('update theme success')
  })
})

router.post('/changeColor', function(req, res, next)
{
  const sql_string = 'SELECT * FROM theme WHERE id = 0'
  db.all(sql_string, function(err, row)
  {
    if(err) throw err;
    res.json({themeType: row[0].themeType})
  })
})
module.exports = router;
