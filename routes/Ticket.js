var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})

let data = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Ticket');
});

let vehicle_num,seat_no;

router.post('/', function(req, res, next)
{
  data = {vehicle_type: req.body.vehicle_type,ID: req.body.ID, start: req.body.start, destination: req.body.destination, type: req.body.type, region: req.body.region, date: req.body.date, price: req.body.price, vehicle_num: req.body.vehicle_num, time: req.body.time};
  seat_no = 0
  let contentList = [req.body.vehicle_type, req.body.ID, req.body.start, req.body.destination, req.body.date, req.body.time, req.body.vehicle_num, seat_no];
  console.log('ticket!');
  console.log(contentList)

  res.render('Ticket', {content: contentList});
})

router.post('/submit', function(req, res, next)
{
  console.log('submit');
  console.log(req.body.seat_no);
  console.log(data);
  let Dno = 0;
  if(data.vehicle_type === "Train") Dno = 1;
  else if(data.vehicle_type === "HSR") Dno = 2;
  else if(data.vehicle_type === "Bus") Dno = 3;
  else 
  {
    console.log("Error Vehicle Type!");
  }
  let SQL_selectString = 'SELECT ID FROM service_agent WHERE Dno=?'; 
  db.get(SQL_selectString, Dno, function(err, row)
  {
    if(err) console.log(err);
    else
    {
      db.run('INSERT INTO customer(ID,region,SID) VALUES(?,?,?)',data.ID, data.region,row.ID,function(err)
      {
          if(err) console.log(err);
      });
      db.run('INSERT INTO ticket(VID,Vehicle_type,Date,start,destination,seat_no,price,type,CID) VALUES(?,?,?,?,?,?,?,?,?)',data.vehicle_num, data.vehicle_type, data.date, data.start, data.destination, req.body.seat_no, data.price, data.type, data.ID,function(err)
      {
          if(err) console.log(err);
      })
      db.run('INSERT INTO payment(Serial_code,method,cost,Date,CID,Status) VALUES(?,"刷卡",?,?,?,"未付款")',generateRandomSerial_code(),data.price ,data.date, data.ID,function(err)
      {
          if(err) console.log(err);
      });
    }
  })
})



module.exports = router;
function generateRandomVID() { return Math.floor(Math.random()*9999)+1000; }
function generateRandomSeatNo() { return Math.floor(Math.random()*99)+10; }
function generateRandomSerial_code() { return Math.floor(Math.random()*99)+10; }