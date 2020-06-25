var error = document.getElementsByClassName('error')[0];
//輸入的密碼
var Password = ""

function processFormData() {
    const form = document.getElementById("inputPassword");
    // console.log(form)
    // console.log(form.value);
    var eng = /^[a-zA-Z]+$/;
    var num = /^[\d]+$/;
    // console.log(form.value.length)
    if ((!eng.test(form.value) && !num.test(form.value) )&& (form.value.length >=8 && form.value.length<=16)) {
        Password = form.value;
        return true;
    } 
    else {
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
            url: '/systemManage/accountManage/passwordModify/send',
            type: 'POST',
            data: SendPassword,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage)
            window.location.href = rcvMessage.href
        })
    }
});
