var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql_string = 'SELECT * FROM account'
  db.all(sql_string, function(err, row)
  {
    if(err) throw err;
    let result = row;
    console.log(row)
  })


  res.render('accountManage');
});



module.exports = router;
