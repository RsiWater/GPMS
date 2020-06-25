let btnList = document.querySelectorAll('button.btn-primary')
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
