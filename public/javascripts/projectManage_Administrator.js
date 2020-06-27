function SAS() {
    var SubmitSearch = document.querySelector(".Administrator nav button")
    var SearchContent = document.querySelector(".Administrator input")
    // var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
    var listGroup = document.querySelector(".Administrator .list-group")
    var pageid = document.querySelector(".Administrator #pageid")
    var page = document.querySelector(".Administrator .row .pagination")


    var replay = document.querySelectorAll('.nav li a')[1]
    replay.href = "projectManage"

    var main = document.querySelectorAll('.nav li a')[2]
    main.href = "/systemManage"
    var lis = document.querySelectorAll(".Administrator .list-group li")
    paging(lis, 1, pageid);

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
        page.style.display = "none";

    });

    var ERROR = document.querySelector(".Administrator .list-group img")

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