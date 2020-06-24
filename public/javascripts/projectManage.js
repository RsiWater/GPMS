// 舊密碼要跟資料庫一樣
// 新密碼符合要求
// 確認密碼要跟新密碼一樣

//輸入的成績
var score = document.querySelector('.form-control').nodeValue
console.log(score)



var SubmitControl = document.querySelector('scoreSubmit[type="submit"]');
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