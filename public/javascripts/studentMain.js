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