// 得到學生名字
var StudentName = "CCC"

$.ajax({
    url: '/main/Identifier/getData', //待修改
    type: 'POST',
    data: "",
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage)
    showStudentName();
})

var Name = document.querySelector("#head h1")
function showStudentName(){
    Name.innerHTML = "您好，"+ StudentName +"老師!"
}