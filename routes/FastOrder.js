var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})

let cityList = ["屏東","高雄","臺南","嘉義","雲林","南投","彰化","臺中","苗栗","新竹","桃園","新北","臺北","基隆"];
let cityListEast = ["屏東","臺東","花蓮","宜蘭","新北","臺北","基隆"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('FastOrder');
});

router.post('/getData', function(req, res, next)
{
    console.log(req.body.hi);

    let vehicle_type;
    if(req.body.type == 0) vehicle_type = 'HSR';
    else if(req.body.type == 1) vehicle_type = 'Train';
    else if(req.body.type == 2) vehicle_type = 'Bus';
    else console.log('vehicle type ERROR!');

    const SQL_Select = 'SELECT * FROM STATION WHERE vehicle_type = ?';

    db.all(SQL_Select, vehicle_type,function(err, row)
    {
        if(err) console.log(err);
        res.json(row);
    })
});


router.post('/getStation', function(req,res,next)
{
  db.serialize(function()
  {
    let SQL_getCity = "SELECT * FROM STATION WHERE Name = ? AND vehicle_type = ?;";
    let SQL_getAvailableVehicle = (req.body.vehicle_type.toLowerCase() == 'train') ? "SELECT * FROM Train WHERE direction = ?;" : (req.body.vehicle_type.toLowerCase() == 'hsr') ? "SELECT * FROM HSR WHERE direction = ?;" : "SELECT * FROM Bus WHERE direction = ?;" ;
    let selectList = [];
    let direction;
    console.log()
    db.get(SQL_getCity, req.body.start, req.body.vehicle_type, function(err, row)
    {
      if(err) console.log(err)
      // console.log(row);
      selectList.push(row.Municipality);
    })
    db.get(SQL_getCity, req.body.destination, req.body.vehicle_type, function(err, row)
    {
      if(err) console.log(err)
      // console.log(row);
      selectList.push(row.Municipality);

      let usingList;
      if(cityList.indexOf(selectList[0] != -1 && cityList.indexOf(selectList[1] != -1)))
      { usingList = cityList; }
      else { usingList = cityListEast; }
      
      if(usingList.indexOf(selectList[0]) > usingList.indexOf(selectList[1])) direction = '南';
      else if(usingList.indexOf(selectList[0]) < usingList.indexOf(selectList[1])) direction = '北';
      else direction = null;
      // console.log('start');
      // console.log(selectList)
      // console.log(usingList);
      // if(direction == null) //dosomething!!
      // console.log(direction);
      db.all(SQL_getAvailableVehicle, direction, function(err, row)
      {
        if(err) console.log(err)
        // console.log(row);
        // console.log('start=' + selectList[0]);
        // console.log('end=' + selectList[1]);
        // console.log(direction);
        let vehicleList = Object.assign([], row);
        let availableVehicleArray = [];
        let directToNorth = (direction == '北') ? true : false;
        for(let i = 0;i < vehicleList.length; i++)
        {
          db.serialize(function()
          {
            let startCity, endCity;
            db.get(SQL_getCity, vehicleList[i].begin_station, req.body.vehicle_type, function(err, row_s)
            {
              if(row_s != undefined) startCity = row_s.Municipality;
            })
            db.get(SQL_getCity, vehicleList[i].end_station, req.body.vehicle_type, function(err, row_s)
            {
              if(row_s != undefined) endCity = row_s.Municipality;
              
              if(usingList.indexOf(startCity) != -1 && usingList.indexOf(endCity) != -1)
              {
                if(directToNorth)
                {
                  // console.log("顧客起始=" + selectList[0] +" 顧客終點="+ selectList[1] +" 車站起始="+ startCity +" 車站終點="+ endCity)
                  if(usingList.indexOf(selectList[0]) >= usingList.indexOf(startCity) && usingList.indexOf(selectList[1]) <= usingList.indexOf(endCity) && vehicleList[i] != undefined)
                  {
                    availableVehicleArray.push(vehicleList[i]);
                  }
                }
                else
                {
                  // console.log("顧客起始=" + selectList[0] +" 顧客終點="+ selectList[1] +" 車站起始="+ startCity +" 車站終點="+ endCity)
                  if(usingList.indexOf(selectList[0]) <= usingList.indexOf(startCity) && usingList.indexOf(selectList[1]) >= usingList.indexOf(endCity) && vehicleList[i] != undefined)
                  {
                    availableVehicleArray.push(vehicleList[i]);
                  }
                }
              }
              if(i == vehicleList.length - 1) 
              {
                // console.log(availableVehicleArray);
                res.json(availableVehicleArray);
              }
            })
          })
        }
        // console.log(availableVehicleArray)
      })  

    })
  })
  // res.json(data);
})


router.post('/submitTicket', function(req, res, next)
{
  console.log('submit');
  let SQL_CustomerString= "INSERT INTO customer(ID,region,SID) VALUES(?,?,?);";
  //Time??
  let SQL_TicketString = "INSERT INTO ticket(VID,vehicle_type,Date,start,destination,seat_no,price,type,CID) VALUES(?,?,?,?,?,?,?,?,?)";
  let SQL_PaymentString = "INSERT INTO payment(Serial_code, method, cost, Date, CID, Status) VALUES(?,?,?,?,?,?);";

  db.serialize(function()
  {
    db.run(SQL_CustomerString, req.body.ID, req.body.region, generateRandomSID(), function(err)
    {
      if(err) console.log(err);
    });
    db.run(SQL_TicketString, req.body.vehicle_num, req.body.vehicle_type, req.body.Date, req.body.start, req.body.destination, null, req.body.price, req.body.ID, function(err)
    {
      if(err) console.log(err);
    });
    db.run(SQL_PaymentString, generateRandomSID(), "超商", req.body.price, req.body.Date, req.body.ID, "未付款", function(err)
    {
      if(err) console.log(err);
    });
  })

  res.redirect("/main/Loading");
});



module.exports = router;

function generateRandomSID() { return Math.floor(Math.random()*999999)+100000; }
function generateRandomVID() { return Math.floor(Math.random()*9999)+1000; }
function generateRandomSeatNo() { return Math.floor(Math.random()*99)+10; }