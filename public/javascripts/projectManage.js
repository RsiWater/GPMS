// 舊密碼要跟資料庫一樣
// 新密碼符合要求
// 確認密碼要跟新密碼一樣

//輸入的密碼
var Password = ""

function processFormData() {
    const OldPassword = document.getElementById("inputOldPassword");
    const NewPassword = document.getElementById("inputNewPassword");
    const CheckPassword = document.getElementById("inputCheckPassword");
    var eng = /^[a-zA-Z]+$/;
    var num = /^[\d]+$/;
    // console.log(form.value.length)
    console.log(NewPassword)
    console.log(NewPassword.value)

    if ((!eng.test(NewPassword.value) && !num.test(NewPassword.value)) &&(NewPassword.value.length >= 8 && NewPassword.value.length <= 16) &&
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
            url: '/main/Identifier/getData', //待修改
            type: 'POST',
            data: SendPassword,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage)
        })
    }
});