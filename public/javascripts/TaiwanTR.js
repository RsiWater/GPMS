getComment()
console.log("alive");
function getComment()
{
    $.get('/html/TaiwanRailway.html', function(url,data){
        if(!data)
        {
            console.log('No data received');
        }
        console.log(JSON.stringify(data))
        // console.log('Received data:');
        // for(let i in data)
        // {
        //     console.log(i.SID);
        // }
    })
}