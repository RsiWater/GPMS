var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */


router.get('/', function(req, res, next) {
  const sql_string = 'SELECT * FROM GraduationProjectExhibition'
  db.all(sql_string, function(err, row)
  {
    let result = []
    for (exEle of row)
    {
      let projectList = []
      db.all('SELECT * FROM GraduationProject WHERE Semester = ?', exEle.Semester, function(err, row)
      {
        if(err) throw err;
        for (elePr of row)
        {
          projectList.push(elePr.Name)
        }
        result.push([exEle, projectList])
        console.log('pp')
      })
    }
    let sendData = {
      data: row
    }
    console.log(sendData)
    res.render('exhibition', sendData);
  })
});

module.exports = router;
