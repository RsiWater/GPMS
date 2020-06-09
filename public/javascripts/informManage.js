// time
var Dates = new Date();
var Year = Dates.getFullYear();
console.log(Year);
var Month = Dates.getMonth() + 1;
console.log(Month);
var Day = Dates.getDate();
console.log(Day);
if (Month < 10) {
    Month = '0' + Month
}
if (Day < 10) {
    Day = '0' + Day
}
var Today = Year + '-' + Month + '-' + Day;


var DateControl = document.querySelector('input[type="date"]');

DateControl.value = Today;
DateControl.min = Today;
console.log(DateControl.value)

DateControl.addEventListener('change', (event) => {
    console.log(DateControl.value);
});
// 

//選擇的通知類型
var InformType = 0
function processFormData() {
    const form = document.getElementById("informManageForm");
    // console.log(form)
    // console.log(form.inform)
    for (var i = 0; i < form.inform.length; i++) {
        if (form.inform[i].checked) {
            InformType = form.inform[i].value;
            console.log(InformType)
        }
    }
}

// 點選送出
var SubmitControl = document.querySelector('button[type="button"]');  //測試先用button 之後type要改成submit
SubmitControl.addEventListener('click', (event) => {
    processFormData();
    let SendDateAndType = {
        time: DateControl.value,
        informType: InformType // 通知 =>  0:打分數 1: 上傳檔案 2:老師上傳學生名單
    };
    console.log(SendDateAndType)
    $.ajax({
        url: '/main/Identifier/getData', //待修改
        type: 'POST',
        data: SendDateAndType,
        datatype: 'json',
    }).done(function (rcvMessage) {
        console.log(rcvMessage)
    })
});