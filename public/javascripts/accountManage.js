let btnList = document.querySelectorAll('button.btn-primary:not(.sendNewAccount')
btnList.forEach(item => 
{
    item.addEventListener('click', function(event)
    {
        let sendData = {Name: event.target.name}
        $.ajax({
            url: '/systemManage/accountManage/passwordModify/sendAccount', //待修改
            type: 'POST',
            data: sendData,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage.href)
            window.location.href = rcvMessage.href
        })
    })
})



document.querySelector('.sendNewAccount').addEventListener('click',function(event)
{
    var accountName=document.querySelector('.accountName').value
    var password=document.querySelector('.password').value
    var permission=document.querySelector('.permission').value
    var employeeNumber=document.querySelector('.employeeNumber').value
    let SendNewAccount={
        AccountName:accountName,
        Password:password,
        Permission:permission,
        EmployeeNumber:employeeNumber
    };
    $.ajax({
        url: '/systemManage/accountManage/addAccount', //待修改
        type: 'POST',
        data: SendNewAccount,
        datatype: 'json',
    }).done(function (rcvMessage) {
        window.location.reload()
    })
})
