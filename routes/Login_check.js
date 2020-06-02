var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('sqlit.db', function(err)
{
  if(err) throw err;
})

// functions
let result = 123;

function getDataFromCustomerID(ID)
{

    let selectSQL = 'SELECT C.region,C.ID,P.Serial_code,T.Date,T.vehicle_type,T.VID,T.type,T.start,T.destination,T.seat_no,T.price,P.method,P.Status FROM PAYMENT AS P,TICKET AS T,CUSTOMER AS C WHERE C.ID = ? AND C.ID = T.CID AND C.ID = P.CID;';
    console.log('ID = '+ID);
    db.all(selectSQL, ID, function(err, row)
    {
        if(err) throw err;
        console.log(row);
        // row.forEach(i=>
        // {
        //     console.log(i.ID);   
        // })
        result = row;
    });
    
}


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Login_check')
});


// POST
let customerID;

router.post('/', function(req, res, next)
{
    customerID = req.body.customerID;
    getDataFromCustomerID(req.body.customerID);
    console.log('result=' + result);
    res.render('Login_check', {ID: customerID});
})

router.post('/check', function(req, res, next)
{
    console.log(result);
    res.json(result);
})

router.post('/cancel', function(req, res, next)
{
    console.log('deleted!???');
    let SQL = 'DELETE FROM TICKET WHERE CID = ?';
    db.run(SQL, customerID, function(err)
    {
        if(err) console.log(err);
    })
})

module.exports = router;