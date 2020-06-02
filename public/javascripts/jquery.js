getComment()
function getComment()
{
    $.get('/test', function(data){
        if(!data)
        {
            console.log('No data received');
        }
        console.log('Received data:');
        for(let i in data)
        {
            console.log(i.SID);
        }
    })
}