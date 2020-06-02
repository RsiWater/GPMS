var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})

let data = {};
let cityList = ["屏東","高雄","臺南","嘉義","雲林","南投","彰化","臺中","苗栗","新竹","桃園","新北","臺北","基隆"];
let cityListEast = ["屏東","臺東","花蓮","宜蘭","新北","臺北","基隆"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Identifier');
});

router.post('/', function(req, res, next)
{
  data = {vehicle_type: req.body.vehicle_type,ID: req.body.ID, start: req.body.start, destination: req.body.destination, type: req.body.type, region: req.body.region, date: req.body.date, price: req.body.a * 300, time: req.body.time};
  vehicle_num = 0;
  seat_no = 0;
  // let contentList = [req.body.vehicle_type, req.body.ID, req.body.start, req.body.destination, req.body.date, "???", vehicle_num, seat_no];

  res.render('Identifier');
})

router.post('/getData', function(req,res,next)
{
  db.serialize(function()
  {
    let SQL_getCity = "SELECT * FROM STATION WHERE Name = ? AND vehicle_type = ?;";
    console.log((data.vehicle_type == 'HSR'));
    let SQL_getAvailableVehicle = (data.vehicle_type == 'Train') ? "SELECT * FROM Train WHERE direction = ?;" : (data.vehicle_type == 'HSR') ? "SELECT * FROM HSR WHERE direction = ?;" : "SELECT * FROM Bus WHERE direction = ?;" ;
    let selectList = [];
    let direction;
    db.get(SQL_getCity, data.start, data.vehicle_type, function(err, row)
    {
      if(err) console.log(err)
      // console.log(row);
      selectList.push(row.Municipality);
    })
    db.get(SQL_getCity, data.destination, data.vehicle_type, function(err, row)
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
            db.get(SQL_getCity, vehicleList[i].begin_station, data.vehicle_type, function(err, row_s)
            {
              if(row_s != undefined) startCity = row_s.Municipality;
            })
            db.get(SQL_getCity, vehicleList[i].end_station, data.vehicle_type, function(err, row_s)
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

router.post('/getCustomerData', function(req, res, next)
{
  res.json(data);
})

module.exports = router;
