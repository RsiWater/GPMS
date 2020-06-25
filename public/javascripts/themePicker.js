const colorBoxes = document.querySelectorAll(".rectangle");
let themeType = 0
colorBoxes.forEach(item =>
    {
        item.addEventListener('click', function()
        {
            if (item.classList.contains("red")) {
                themeType = 0
              }
              if (item.classList.contains("orange")) {
                themeType = 1
              }
              if (item.classList.contains("blue")) {
                themeType = 3
              }
              if (item.classList.contains("yellow")) {
                themeType = 6
              }
              if (item.classList.contains("black")) {
                themeType = 2
              }
              if (item.classList.contains("purple")) {
                themeType = 4
              }
              if (item.classList.contains("pink")) {
                themeType = 5
              }
              console.log(themeType)
        })
    })

const saveButton = document.querySelector('input.forms_buttons-action');
saveButton.addEventListener('click', function(event)
{
    let sendData = {
        themeType: themeType
    }
    $.ajax({
        url: '/systemManage/themePicker', //待修改
        type: 'POST',
        data: sendData,
        datatype: 'json',
    }).done(function (rcvMessage) {
        window.location.href = rcvMessage.href
    })
})