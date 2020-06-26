var SubmitSearch = document.querySelector(".account nav button")
var SearchContent = document.querySelector(".account input")
// var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
var listGroup = document.querySelector(".account .list-group")
var pageid = document.querySelector(".account #pageid")
var page = document.querySelector(".account .row .pagination")

var HOME = document.querySelectorAll('.nav li a')[1]
HOME.href = "accountManage"

var main = document.querySelectorAll('.nav li a')[2]
main.href = "/systemManage"

var AccountList

$.ajax({
    url: '/systemManage/accountManage/getdata',
    type: 'POST',
    data: '',
    datatype: 'json',
}).done(function (rcvMessage) {
    AccountList = rcvMessage.nameList
    console.log(AccountList)
    // paging(AccountList, 1, pageid, listGroup, "accountManage", []);
})
SubmitSearch.addEventListener('click', (event) => {
    search();
    page.style.display = "none";
});

function search() {
    var havethis = 0
    sContent = SearchContent.value
    console.log(sContent)
    for (const list of AccountList) {
        console.log(list)
        if (list === sContent) {
            havethis = 1
            break;
        } else {
            havethis = 0
        }
        console.log(listGroup.innerHTML)
    }
    console.log(havethis)
    listGroup.innerHTML = ""
    if (havethis) {
        listGroup.innerHTML = '      <li class="list-group-item ">' +
            sContent + '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"' + '>' +
            '<button type="button" class="btn btn-primary ' + sContent + '">更改專題</button>' +
            '</div>' +
            '</li>'
    }
}

showSearch = function (event, self) {
    if (event.keyCode == 13) {
        search();
        page.style.display = "none";
        event.cancleBubble = true;
        event.returnValue = false;
        return false;
    }
}