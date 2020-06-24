// 舊密碼要跟資料庫一樣
// 新密碼符合要求
// 確認密碼要跟新密碼一樣

//輸入的成績




var SubmitControl = document.querySelector('.scoreSubmit');
SubmitControl.addEventListener('click', (event) => {
        var Score = document.querySelector('.scoreForm').value
        console.log(Score)
        let SendScore = {
            score: Score
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