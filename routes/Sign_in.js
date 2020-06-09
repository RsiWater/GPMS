var express = require('express');
var router = express.Router();


let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

router.get('/', function(req, res, next)
{

    let account='123'
    let password='456'
    let check
    DB_check('account','123','456',function(result){
        console.log(result)
        check=result
        if(check.length>0){
            //有輸入正確帳號
            console.log('fuck yeah')

        }else{
            //沒有輸入正確帳號
        }
        res.render('Sign_in')
    })

})

router.post('/', function(req, res, next)
{


})

module.exports = router;


function DB_check(tableName ,account,password,callback)
{
    const sql_string = 'SELECT * FROM '+tableName+' WHERE 帳號=? and 密碼=?';
     db.all(sql_string, account,password, function(err, row)
    {
        if(err) throw err;
        //console.log(row)
        let result=row
        return callback(result)
    })

}