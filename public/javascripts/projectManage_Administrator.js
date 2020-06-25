
var SubmitSearch = document.querySelector(".Administrator nav button")
var SearchContent = document.querySelector(".Administrator input")
var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
var ProjectList
$.ajax({
    url: '/systemManage/projectManage/getdata', 
    type: 'POST',
    data: '',
    datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage.projectNameList)
})

SubmitSearch.addEventListener('click', (event) => {
    search();
});
function search(){
    sContent = SearchContent.value
    console.log(sContent)
    for (const list of SA_Proj_List_Serach) {
        var text = list.innerText
        text = (text.split("\n"))[0]
        console.log(text)
        console.log(list)
        list.style.display = "none";
        console.log(sContent === text)
        if (sContent === text)
            list.style.display = "flex"
    }
}
// $(".Administrator nav input").bind("keypress", {}, keypressInBox);

// function keypressInBox(e) {
//     var code = (e.keyCode ? e.keyCode : e.which);
//     if (code == 13) { //Enter keycode
//         e.preventDefault();

//         $(".Administrator button").click();
//     }
// };
showSearch = function(event,self) {
    if (event.keyCode == 13) {
        search();
        event.cancleBubble = true;
        event.returnValue = false;
        return false;
    }
}
