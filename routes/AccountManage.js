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
  if(req.cookies.PassKey != 'undefined'){
    // console.log(req.cookies.PassKey)

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


router.post('/getData', function(req, res, next)
{
  const _sql_string = 'SELECT * FROM account'
  db.all(_sql_string, function(err, row)
  {
    if(err) throw err;
    let nameList = []
    row.forEach(item =>
      {
        nameList.push(item.Name)
      })
    res.json({nameList: nameList})
  })
})

router.post('/addAccount', function(req, res, next)
{
  const sql_string = 'INSERT INTO account (Name,Password,Permission,EmployeeNumber) VALUES (?,?,?,?)'
  db.run(sql_string, req.body.AccountName,req.body.Password,req.body.Permission,req.body.EmployeeNumber, function(err, row)
  {
    if(err) throw err;
    res.json({href: '/systemManage/accountManage'})
  })
})

router.post('/delAccount', function(req, res, next)
{
  const sql_string = 'DELETE FROM account WHERE Name = ?'
  db.run(sql_string, req.body.Name, function(err, row)
  {
    if (err) throw err;
    console.log('delete success!');
    res.json({href: '/systemManage/accountManage'})
  })
})


module.exports = router;
