$('.press').click(function(e)
{
    sendPOST();
})

function sendPOST()
{
    console.log('suc');
    $.post("/test", {hi: 'hello'});
}