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
            selectedHeart.children[0].src = "../public/images/pheart.png"
        }
        for (var j = 9; j > i; j--) {
            var selectedHeart = lis[j]
            selectedHeart.children[0].src = "../public/images/bheart.png"
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
                if (selectedHeart.children[0].src = "../public/images/pheart.png")
                    selectedHeart.children[0].src = "../public/images/bheart.png"
            }
        } else {
            for (var j = 0; j <= clickNum; j++) {
                var selectedHeart = lis[j]
                selectedHeart.children[0].src = "../public/images/pheart.png"
            }
            for (var j = 9; j > clickNum; j--) {
                var selectedHeart = lis[j]
                selectedHeart.children[0].src = "../public/images/bheart.png"
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
            selectedHeart.children[0].src = "../public/images/pheart.png"
        }
        for (var j = 9; j > clickNum; j--) {
            var selectedHeart = lis[j]
            if (selectedHeart.children[0].src = "../public/images/pheart.png")
                selectedHeart.children[0].src = "../public/images/bheart.png"
        }
    }
}


var SubmitScore = document.querySelectorAll('button[type="submit"]')[1];

SubmitScore.addEventListener('click', (event) => {
        let SendScore = {
            score: clickNum + 1
        };
        console.log(SendScore);
        $.ajax({
            url: '/main/Identifier/getData', //待修改
            type: 'POST',
            data: SendScore,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage)
        })

});