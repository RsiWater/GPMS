var SubmitSearch = document.querySelector(".Administrator nav button")
var SearchContent = document.querySelector(".Administrator input")
// var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
var listGroup = document.querySelector(".Administrator .list-group")
var HOME = document.querySelectorAll('.nav li a')[1]
HOME.href="projectManage"
var ProjectList
$.ajax({
    url: '/systemManage/projectManage/getdata',
    type: 'POST',
    data: '',
    datatype: 'json',
}).done(function (rcvMessage) {
    ProjectList = rcvMessage.projectNameList
    console.log(ProjectList)
})
SubmitSearch.addEventListener('click', (event) => {
    search();
});
var havethis = 0

function search() {
    sContent = SearchContent.value
    console.log(sContent)
    for (const list of ProjectList) {
        console.log(list)
        if (list === sContent) {
            havethis = 1
            break;
        }
        else{
            havethis = 0
        }
        console.log(listGroup.innerHTML)
    }
    console.log(havethis)
    listGroup.innerHTML = ""
    if(havethis){
        listGroup.innerHTML = '      <li class="list-group-item ' + sContent + '">' +
            sContent + '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"' + '>' +
            '<button type="button" class="btn btn-primary">更改專題</button>' +
            '</div>' +
            '</li>'
    }

    // for (const list of ProjectList) {
    //     var text = list.innerText
    //     text = (text.split("\n"))[0]
    //     console.log(text)
    //     console.log(list)
    //     list.style.display = "none";
    //     console.log(sContent === text)
    //     if (sContent === text)
    //         list.style.display = "flex"
    // }
}
// $(".Administrator nav input").bind("keypress", {}, keypressInBox);

// function keypressInBox(e) {
//     var code = (e.keyCode ? e.keyCode : e.which);
//     if (code == 13) { //Enter keycode
//         e.preventDefault();

//         $(".Administrator button").click();
//     }
// };
showSearch = function (event, self) {
    if (event.keyCode == 13) {
        search();
        event.cancleBubble = true;
        event.returnValue = false;
        return false;
    }
}