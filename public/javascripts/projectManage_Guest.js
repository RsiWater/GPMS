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
    var main = document.querySelectorAll('.nav li a')[2]
    main.href = "/login"

    var lis = document.querySelectorAll(".Guest .list-group li")
    paging(lis, 1, pageid);

    var ProjectList
    $.ajax({
        url: '/Guest/projectManage/getdata',
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
    
    let btnList = document.querySelectorAll('.liketovote')
        btnList.forEach(item => 
            {
                item.addEventListener('click', function(event)
                {
                    if (liketovote==0)
                    {
                        item.innerText= '已喜歡!♥';
           
                        liketovote=1;
                    }
                    else
                    {
                        item.innerText = '我喜歡♡';
       
                        liketovote=0;
                     }
                })
            })
















    // SubmitVote.addEventListener('click', (event) => {
      
    //   if (liketovote==0)
    //     {
    //         document.getElementById('liketovote').innerText = '已喜歡!♥';
           
    //         liketovote=1;
    //     }
    //   else
    //     {
    //         document.getElementById('liketovote').innerText = '我喜歡♡';
       
    //         liketovote=0;
    //     }
    // });
    var ERROR = document.querySelector(".Guest .list-group img")

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