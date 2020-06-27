//愛心
var lis = document.querySelectorAll(".card.w-25")
var isClick = 0
var clickNum = 10
for (const button of lis) {
    button.onmouseover = function () {
        // if (!isClick) {
        var i = Array.prototype.indexOf.call(lis, button);

        for (var j = 0; j <= i; j++) {
            var selectedHeart = lis[j]
            selectedHeart.children[0].src = "../images/pheart.png"
        }
        for (var j = 9; j > i; j--) {
            var selectedHeart = lis[j]
            selectedHeart.children[0].src = "../images/bheart.png"
        }
        // }
    }

    button.onmouseout = function () {
        // if (!isClick) {
        var i = Array.prototype.indexOf.call(lis, button);
        console.log(button)
        if (clickNum == 10) {
            for (var j = 0; j <= i; j++) {
                var selectedHeart = lis[j]
                if (selectedHeart.children[0].src = "../images/pheart.png")
                    selectedHeart.children[0].src = "../images/bheart.png"
            }
        } else {
            for (var j = 0; j <= clickNum; j++) {
                var selectedHeart = lis[j]
                selectedHeart.children[0].src = "../images/pheart.png"
            }
            for (var j = 9; j > clickNum; j--) {
                var selectedHeart = lis[j]
                selectedHeart.children[0].src = "../images/bheart.png"
            }
        }
    }
    // }

    button.onclick = function () {
        var i = Array.prototype.indexOf.call(lis, button);
        console.log("click")
        clickNum = i
        isClick = 1
        console.log(i)
        for (var j = 0; j <= clickNum + 1; j++) {
            var selectedHeart = lis[j]
            selectedHeart.children[0].src = "../images/pheart.png"
        }
        for (var j = 9; j > clickNum; j--) {
            var selectedHeart = lis[j]
            if (selectedHeart.children[0].src = "../images/pheart.png")
                selectedHeart.children[0].src = "../images/bheart.png"
        }
    }
}


var SubmitScore = document.querySelector('button[type="submit"].btn-score');

SubmitScore.addEventListener('click', (event) => {
    var passKey=document.cookie
    let SendScore = {
        passkey: passKey,
        score: clickNum + 1,
        teamLeader: targetTeam
    };
    console.log(SendScore);
    $.ajax({
        url: '/studentMain/projectManage/addstudentscore', //待修改
        type: 'POST',
        data: SendScore,
        datatype: 'json',
    }).done(function (rcvMessage) {
        window.location.reload();
    })

});

//輸入的成績
let sucbtnList = document.querySelectorAll('button.btn-success')
let targetTeam = ''
sucbtnList.forEach(item => {
    item.addEventListener('click', function (event) {
        targetTeam = event.target.name;
    })
})

var SubmitControl = document.querySelector('.scoreSubmit');
SubmitControl.addEventListener('click', (event) => {
    var Score = document.querySelector('.scoreForm').value
    var passKey=document.cookie
    console.log(Score)
    let SendScore = {
        passkey: passKey,
        score: Score,
        teamLeader: targetTeam
    };
    console.log(SendScore);
    $.ajax({
        url: '/teacherMain/projectManage/addscore', //待修改
        type: 'POST',
        data: SendScore,
        datatype: 'json',
    }).done(function (rcvMessage) {
        console.log(rcvMessage)
        window.location.reload();
    })
});


$.ajax({
    url: '/systemManage/projectManage', //待修改
    type: 'POST',
    data: '',
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log("permission:" + rcvMessage.permission)
    if (rcvMessage.permission == 0) {
        SAS();
        document.querySelector(".Administrator").style = "display:block"
        document.querySelector(".Teacher").style = "display:none"
        document.querySelector(".Student").style = "display:none"
        document.querySelector(".Guest").style = "display:none"
    }
    if (rcvMessage.permission == 1) {
        GAS();
        document.querySelector(".Administrator").style = "display:none"
        document.querySelector(".Teacher").style = "display:block"
        document.querySelector(".Student").style = "display:none"
        document.querySelector(".Guest").style = "display:none"
    }
    if (rcvMessage.permission == 2) {
        PMS();
        document.querySelector(".Administrator").style = "display:none"
        document.querySelector(".Teacher").style = "display:none"
        document.querySelector(".Student").style = "display:block"
        document.querySelector(".Guest").style = "display:none"
    }
    if (rcvMessage.permission == 3) {
        GMS();
        document.querySelector(".Administrator").style = "display:none"
        document.querySelector(".Teacher").style = "display:none"
        document.querySelector(".Student").style = "display:none"
        document.querySelector(".Guest").style = "display:block"
    }

})