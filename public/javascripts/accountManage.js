function AccountManage() {
    let btnList = document.querySelectorAll('button.btn-primary:not(.sendNewAccount):not(.btn-danger-ensure)')
    btnList.forEach(item => {
        item.addEventListener('click', function (event) {
            let sendData = {
                Name: event.target.name
            }
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

    let delbtnList = document.querySelectorAll('.list-group button.btn-danger')
    // console.log(delbtnList)
    let delAccountName = undefined
    delbtnList.forEach(item => {
        item.addEventListener('click', function (event) {
            delAccountName = {
                Name: event.target.name
            }
            console.log(delAccountName)
        })
    })
    document.querySelector('button.btn-danger-ensure').addEventListener('click', function (event) {
        $.ajax({
            url: '/systemManage/accountManage/delAccount',
            type: 'POST',
            data: delAccountName,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log('qsd')
            window.location.reload();
        })
    })


    document.querySelector('.sendNewAccount').addEventListener('click', function (event) {
        var accountName = document.querySelector('.accountName').value
        var password = document.querySelector('.password').value
        var permission = document.querySelector('.permission').value
        var employeeNumber = document.querySelector('.employeeNumber').value
        let SendNewAccount = {
            AccountName: accountName,
            Password: password,
            Permission: permission,
            EmployeeNumber: employeeNumber
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

    document.querySelector('a.signout').addEventListener('click', function (event) {
        $.ajax({
            url: '/login/signout',
            type: 'POST',
            data: '',
            datatype: 'json',
        }).done(function (rcvMessage) {
            window.location.href = rcvMessage.href
        })
    })
}