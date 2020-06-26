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
var notificationSwitch=document.querySelector(".notification ")
var notificationContainer=document.querySelector(".notification-container")
var switchLocker=1
notificationSwitch.addEventListener('click', (event) => {
    if(switchLocker==0)
    {
        notificationContainer.style="display:none"
        switchLocker=1
    }
    else if(switchLocker==1)
    {
        notificationContainer.style="display:block"
        switchLocker=0
    }
});