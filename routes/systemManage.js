var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.PassKey){
    //console.log(req.cookies.PassKey)

    const sql_string = 'SELECT * FROM account WHERE PassKey=?'
     db.all(sql_string, req.cookies.PassKey, function(err, row)
    {
        if(err) throw err;
        if(row.length>0){
          //console.log('yeah')
          res.render('systemManage')
        }
        else{
          //console.log('no')
          res.render('Sign_in')
        }
    })


  }else{
    //console.log('no')
    res.render('Sign_in')

  }
});

module.exports = router;
