function GAS() {
    var SubmitSearch = document.querySelector(".Teacher nav button")
    var SearchContent = document.querySelector(".Teacher input")
    // var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
    var listGroup = document.querySelector(".Teacher .list-group")
    var pageid = document.querySelector(".Teacher #pageid")
    var page = document.querySelector(".Teacher .row .pagination")

    var HOME = document.querySelectorAll('.nav li a')[1]
    HOME.href = "projectManage"
    var main = document.querySelectorAll('.nav li a')[2]
    main.href = "/teacherMain"

    var lis = document.querySelectorAll(".Teacher .list-group li")
    paging(lis, 1, pageid);

    var ProjectList
    $.ajax({
        url: '/teacherMain/projectManage/getdata',
        type: 'POST',
        data: '',
        datatype: 'json',
    }).done(function (rcvMessage) {
        ProjectList = rcvMessage.projectNameList
        console.log(ProjectList)
        // paging(ProjectList, 1,pageid,listGroup,"teacherManage",TeamLeaderList);
    })
    
    SubmitSearch.addEventListener('click', (event) => {
        search();
        page.style.display = "none";
    });

    var ERROR = document.querySelector(".Teacher .list-group img")

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

            page.style.display = "none";
            event.cancleBubble = true;
            event.returnValue = false;
            return false;
        }
    }
}