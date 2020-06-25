// 得到老師名字
var TeacherName = "AAA"

$.ajax({
    url: '/main/Identifier/getData', //待修改
    type: 'POST',
    data: "",
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage)
    showTeacherName();
})
var Name = document.querySelector("#head h1")
// showTeacherName();
function showTeacherName(){
    Name.innerHTML = "您好，"+ TeacherName +"老師!"

}