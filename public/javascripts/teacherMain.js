// 得到老師名字
var TeacherName = "AAA"

$.ajax({
    url: '/teacherMain/getData', //待修改
    type: 'POST',
    data: "",
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage)
    TeacherName = rcvMessage.name
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

var notificationType=document.querySelectorAll(".notificationType")
var notificationTime=document.querySelectorAll(".notificationTime")
console.log(notificationTime)
var timeInMs = Date.now();
lastestFromNow=[]
sortedFromNow=[]
elementList=[]
var count=0
notificationTime.forEach(element =>{
    console.log(element)
    console.log(timeInMs)
    var times=element.childNodes[1].innerText.split('-')
    console.log(times)
    var dt2 = new Date(times[0], times[1]-1, times[2])
    console.log(dt2)
    console.log(timeInMs-dt2)
    lastestFromNow.push(Math.abs(timeInMs-dt2))
    sortedFromNow.push(Math.abs(timeInMs-dt2))

})
sortedFromNow.sort(function(a, b){return a - b})
console.log(sortedFromNow)
console.log(lastestFromNow)
console.log(notificationType)

for(var i=0;i<=2;i++)
{
    for(var j=0;j<lastestFromNow.length;j++){
        if(lastestFromNow[j]==sortedFromNow[i]){
            if(count==3){
                break
            }
            if(notificationType[j].innerText==0){
                notificationType[j].innerText="打分數"
                count++
            }
            if(notificationType[j].innerText==2){
                notificationType[j].innerText="老師上傳學生名單"
                count++
            }
        }
    }

    if(count==3){
        break
    }
}
for(var i=0;i<notificationType.length;i++)
{
    if((notificationType[i].innerText==0)||(notificationType[i].innerText==2))
    {
        notificationType[i].parentNode.style="display:none"
    }
    
}
console.log(notificationType)


