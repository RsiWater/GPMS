var express = require('express');
var router = express.Router();

module.exports = router;

var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:'); temporarily DBS
var db = new sqlite3.Database('sqlit.db', function(err)
{
    if(err) 
    {
        console.log(err);
        throw err;
    }
});

// db.serialize(function() {

// //   db.run('CREATE TABLE lorem (info TEXT)');
// //   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

// //   for (var i = 0; i < 10; i++) {
// //     stmt.run('Ipsum ' + i);
// //   }

// //   stmt.finalize();

//   db.each('SELECT ID AS id, SID FROM customer', function(err, row) {
//     console.log(row.id + ': ' + row.SID);
//   });
// });

router.get('/', function(req, res, next)
{ 
  console.log('GET request received at /test');
  res.render('Seats');
    // res.render('test');    
});
router.post('/', function(req,res)
{
  console.log('rcv');
  console.log(req.body.hi);
});

