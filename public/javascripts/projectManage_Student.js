function PMS() {
    var SubmitSearch = document.querySelector(".Student nav button")
    var SearchContent = document.querySelector(".Student input")
    // var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
    var listGroup = document.querySelector(".Student .list-group")
    var pageid = document.querySelector(".Student #pageid")
    var page = document.querySelector(".Student .row .pagination")

    var HOME = document.querySelectorAll('.nav li a')[1]
    HOME.href = "projectManage"
    var main = document.querySelectorAll('.nav li a')[2]
    main.href = "/studentMain"

    var lis = document.querySelectorAll(".Student .list-group li")
    paging(lis, 1, pageid);

    var ProjectList
    $.ajax({
        url: '/studentMain/projectManage/getdata',
        type: 'POST',
        data: '',
        datatype: 'json',
    }).done(function (rcvMessage) {
        ProjectList = rcvMessage.projectNameList
        console.log(ProjectList)
    })
    SubmitSearch.addEventListener('click', (event) => {
        search();
        page.style.display = "none";
    });

    var ERROR = document.querySelector(".Student .list-group img")

    function search() {
        var havethis = 0
        var i = -1
        sContent = SearchContent.value
        console.log(sContent)
        for (const list of ProjectList) {
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
                if(index === i){
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
}