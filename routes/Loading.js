var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Loading');
});

router.post('/', function(req, res ,next)
{
  if(req.body.date == undefined && req.body.deleteID != undefined)
  {
    console.log('deleted!!!!');
    let SQL = 'DELETE FROM TICKET WHERE CID = ?';
    console.log(req.body.deleteID);
    db.run(SQL, req.body.deleteID, function(err)
    {
        if(err) console.log(err);
    })
  }
  else if(req.body.vehicle_num == undefined)
  {
    console.log(req.body.date);
    console.log('Updated success!!!');
    let SQL_updated = 'UPDATE ticket SET Date = ?, start = ?,destination = ? WHERE CID = ?';
    db.run(SQL_updated, req.body.date, req.body.start, req.body.destination, req.body.ID, function(err)
    {
      if(err) console.log(err);
    })
  }
  res.render('Loading');
})

router.post('/redirect', function(req, res ,next)
{
  res.render('Loading');
})

router.post('/cancel', function(req, res, next)
{
    console.log('deleted!tt');
    let SQL = 'DELETE FROM TICKET WHERE CID = ?';
    db.run(SQL, req.body.ID, function(err)
    {
        if(err) console.log(err);
    })
    res.render('../Loading')
})

module.exports = router;
