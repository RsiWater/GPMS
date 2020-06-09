var express = require('express');
var router = express.Router();


let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

router.get('/', function(req, res, next)
{
    DB_Select("account", 'Hello')
    console.log(temp)
    res.render('Sign_in');
})

router.post('/', function(req, res, next)
{

})

module.exports = router;

function DB_Select(tableName ,PK)
{
    let sql_PK = PK
    let sql_PK_Name = ''
    if(tableName == "account") sql_PK_Name = "Name" 
    const sql_string = 'SELECT * FROM '+tableName+' WHERE '+sql_PK_Name+'=?';
    db.all(sql_string, sql_PK, function(err, row)
    {
        if(err) throw err;
        return row
    })
}