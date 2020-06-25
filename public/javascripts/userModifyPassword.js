// 舊密碼要跟資料庫一樣
// 新密碼符合要求
// 確認密碼要跟新密碼一樣
var error = document.getElementsByClassName('error')[0];

//輸入的新密碼
var Password = ""
//舊密碼
var OldPW = ""
$.ajax({
    url: '/systemManage/userModifyPassword/getData', //待修改
    type: 'POST',
    data: "",
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage.password)
    OldPW = rcvMessage.password
})

function processFormData() {
    const OldPassword = document.getElementById("inputOldPassword");
    const NewPassword = document.getElementById("inputNewPassword");
    const CheckPassword = document.getElementById("inputCheckPassword");
    var eng = /^[a-zA-Z]+$/;
    var num = /^[\d]+$/;
    // console.log(form.value.length)
    console.log(NewPassword)
    console.log(NewPassword.value)
    if ((( OldPassword.value === OldPW) && !eng.test(NewPassword.value) && !num.test(NewPassword.value)) &&(NewPassword.value.length >= 8 && NewPassword.value.length <= 16) &&
            (NewPassword.value === CheckPassword.value)) {
        Password = NewPassword.value;
        return true;
    } else {
        error.style.display = "block";
        return false;
    }
}

var SubmitControl = document.querySelector('button[type="submit"]');
SubmitControl.addEventListener('click', (event) => {
    if (processFormData()) {
        console.log(Password)
        let SendPassword = {
            password: Password
        };
        console.log(SendPassword);
        $.ajax({
            url: '/systemManage/userModifyPassword', //待修改
            type: 'POST',
            data: SendPassword,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage)
        })
    }
});