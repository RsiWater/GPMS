var express = require('express');
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
          const sql_string = 'SELECT * FROM account'
          db.all(sql_string, function(err, row)
          {
            if(err) throw err;
            let result = [];
            let i = 0;
            row.forEach(function(item)
            {
              result.push([item, i++])
            })
            // console.log(result)

            res.render('accountManage', {student: result});
          })
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



module.exports = router;
