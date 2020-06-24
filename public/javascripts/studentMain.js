$.ajax({
    url: '/main/Identifier/getData', //待修改
    type: 'GET',
    data: SendPassword,
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage)
})