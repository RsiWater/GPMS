var express = require('express');
var router = express.Router();


let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

router.get('/', function(req, res, next)
{
    
  res.render('Login')

})

router.post('/', function(req, res, next)
{
    console.log('post')
    const SHA256_module = require('./SHA256')
    let name=req.body.Name
    let password=req.body.Password
    let check
    DB_check('account',name,password,function(result){
        //console.log(result)
        check=result
        if(check.length == 0)
        {
            res.cookie.Passkey = 3
            res.redirect('/guest/projectManage')
        }
        if(check[0]['Permission']==0){
            //有輸入正確帳號
            let encode=SHA256_module.SHA256(check[0]['Name'])
            const sql_string = 'UPDATE account SET PassKey=? WHERE Name=?'
            db.run(sql_string, encode,check[0]['Name'], function(err, row)
            {
                if(err) throw err;
            })
            res.cookie('PassKey',SHA256_module.SHA256(check[0]['Name']))
            console.log('syatem manage')
            res.redirect('/systemManage')

        }
        else if(check[0]['Permission']==1){
            let encode=SHA256_module.SHA256(check[0]['Name'])
            const sql_string = 'UPDATE account SET PassKey=? WHERE Name=?'
            db.run(sql_string, encode,check[0]['Name'], function(err, row)
            {
                if(err) throw err;
            })
            res.cookie('PassKey',SHA256_module.SHA256(check[0]['Name']))
            console.log('teacher')
            res.redirect('/teacherMain')
        }
        else if(check[0]['Permission']==2){
            let encode=SHA256_module.SHA256(check[0]['Name'])
            const sql_string = 'UPDATE account SET PassKey=? WHERE Name=?'
            db.run(sql_string, encode,check[0]['Name'], function(err, row)
            {
                if(err) throw err;
            })
            res.cookie('PassKey',SHA256_module.SHA256(check[0]['Name']))
            console.log('student')
            res.redirect('/studentMain')
        }
        else{
            //沒有輸入正確帳號
            console.log('no')
            res.render('Login')
        }
    })

})

router.post('/signout', function(req, res, next)
{
    res.cookie('PassKey', undefined)
    res.json({href: '/login'})
})

module.exports = router;


function DB_check(tableName ,account,password,callback)
{
    const sql_string = 'SELECT * FROM '+tableName+' WHERE Name=? and Password=?';
     db.all(sql_string, account,password, function(err, row)
    {
        if(err) throw err;
        //console.log(row)
        let result=row
        return callback(result)
    })

}