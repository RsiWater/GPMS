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

var lis = document.querySelectorAll(".account .list-group li")
paging(lis, 1, pageid);

var AccountList
console.log()
$.ajax({
    url: '/systemManage/accountManage/getdata',
    type: 'POST',
    data: '',
    datatype: 'json',
}).done(function (rcvMessage) {
    AccountList = rcvMessage.nameList
    console.log(AccountList)
})
SubmitSearch.addEventListener('click', (event) => {
    search();
    page.style.display = "none";
});

var ERROR = document.querySelector(".account .list-group img")

function search() {
    var havethis = 0
    var i = -1
    sContent = SearchContent.value
    console.log(sContent)
    for (const list of AccountList) {
        i = i + 1
        console.log(list)
        if (list === sContent) {
            havethis = 1
            break;
        } else {
            havethis = 0
        }
    }
    console.log(havethis)
    // listGroup.innerHTML = ""
    if (havethis) {
        ERROR.style.display='none'; 
        lis.forEach((item, index) => {
            item.style.display = 'none';
            if (index === i) {
                $(item).css('display', '');
            }
        });
    }
    else{
        lis.forEach((item, index) => {
            item.style.display = 'none';
        })
        ERROR.style.display='block'; 
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