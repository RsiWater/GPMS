function GMS() {
    var SubmitSearch = document.querySelector(".Guest nav button")
    var SearchContent = document.querySelector(".Guest input")
    // var SA_Proj_List_Serach = document.querySelectorAll(".Administrator .list-group li")
    var listGroup = document.querySelector(".Guest .list-group")
    var pageid = document.querySelector(".Guest #pageid")
    var page = document.querySelector(".Guest .row .pagination")
    var SubmitVote = document.querySelector('.liketovote');
    var liketovote=0;


    var HOME = document.querySelectorAll('.nav li a')[1]
    HOME.href = "projectManage"
    var ProjectList
    $.ajax({
        url: '/Guest/projectManage/getdata',
        type: 'POST',
        data: '',
        datatype: 'json',
    }).done(function (rcvMessage) {
        ProjectList = rcvMessage.projectNameList
        TeamLeaderList = rcvMessage.projectTeamLeaderList
        console.log(ProjectList)
        console.log(TeamLeaderList)
        paging(ProjectList, 1,pageid,listGroup,"guestManage",TeamLeaderList);

    })
    SubmitSearch.addEventListener('click', (event) => {
        search();
        page.style.display = "none";

    });
    
        
    SubmitVote.addEventListener('click', (event) => {
      
      if (liketovote==0)
        {
            document.querySelector('#myspan').textContent  = '已喜歡!♥'
            liketovote=1
        }
      else
        {
        document.querySelector('#myspan').textContent  = '我喜歡♡'
        liketovote=0;
        }
    });

    function search() {
        var havethis = 0
        sContent = SearchContent.value
        console.log(sContent)
        for (const list of ProjectList) {
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
}