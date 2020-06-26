function paging(ProjectList, nowPage, pageid, listGroup, whopage,TeamLeaderList) {
    console.log('paging')
    pagination(ProjectList, nowPage)

    function pagination(jsonData, nowPage) {
        console.log(nowPage);
        // 取得全部資料長度
        const dataTotal = jsonData.length;

        // 設定要顯示在畫面上的資料數量
        // 預設每一頁只顯示 5 筆資料。
        const perpage = 7;

        // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
        // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
        const pageTotal = Math.ceil(dataTotal / perpage);

        // 當前頁數，對應現在當前頁數
        let currentPage = nowPage;

        // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
        // 所以要在寫入一個判斷避免這種狀況。
        // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
        // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況，例如：nowPage 突然發神經？！
        if (currentPage > pageTotal) {
            currentPage = pageTotal;
        }

        // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
        const minData = (currentPage * perpage) - perpage + 1;
        const maxData = (currentPage * perpage);

        // 先建立新陣列
        const data = [];
        // 這邊將會使用 ES6 forEach 做資料處理
        // 首先必須使用索引來判斷資料位子，所以要使用 index
        jsonData.forEach((item, index) => {
            // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
            const num = index + 1;
            // 這邊判斷式會稍微複雜一點
            // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
            if (num >= minData && num <= maxData) {
                data.push(item);
            }
        })
        // 用物件方式來傳遞資料
        const page = {
            pageTotal,
            currentPage,
            hasPage: currentPage > 1,
            hasNext: currentPage < pageTotal,
        }
        displayData(data);
        pageBtn(page);
    }

    function displayData(data) {
        let str = '';
        listGroup.innerHTML = ""
        data.forEach((item,index) => {
            if (whopage === "stduentManage") {
                str += '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                    item + '<div><div class="btn-group btn-group-sm" role="group" aria-label="Basic example">'+
                '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter" name="' +
                TeamLeaderList[index] + '">互評專題</button></div>' +
                    '<div class="btn-group btn-group-sm" style="padding-left:1vw" role="group" aria-label="Basic example">' +
                    ' <button type="button" class="btn btn-primary ' + item + '">瀏覽專題</button>' +
                    ' </div></div></li>'
            } 
            else if (whopage === "systemManage") {
                str += '      <li class="list-group-item ">' +
                    item + '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"' + '>' +
                    '<button type="button" class="btn btn-primary ' + item + '">更改專題</button>' +
                    '</div>' +
                    '</li>';
            }
            else if(whopage === "teacherManage"){
                str += '<li class="list-group-item d-flex justify-content-between align-items-center"' + '>' +
                    item + '<div><div class="btn-group btn-group-sm" style="padding-left:1vw" role="group" aria-label="Basic example">'+
                '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenterTeacher"name="' +
                TeamLeaderList[index] + '">專題評分</button></div>' +
                    '<div class="btn-group btn-group-sm" role="group" style="padding-left:1vw" aria-label="Basic example">' +
                    ' <button type="button" class="btn btn-primary ' + item + '">瀏覽專題</button>' +
                    ' </div></div></li>'
            }
            else if(whopage === "guestManage"){

            }
            else if(whopage === "accountManage"){
                str += '<li class="list-group-item d-flex justify-content-between align-items-center">'+ item +
                    '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example" name="'+ item +'">'+
                    '<button type="button" class="btn btn-danger" style="margin-right:1rem;" data-toggle="modal"'+
                    'data-target="#exampleModal" name="'+item+'">刪除帳號</button>'+
                     '<button type="button" class="btn btn-primary" name="'+ item +'">更改帳號</button></div></li>'
            }
        });
        listGroup.innerHTML = str;
    }

    function pageBtn(page) {
        let str = '';
        const total = page.pageTotal;

        if (page.hasPage) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">上一頁</a></li>`;
        } else {
            str += `<li class="page-item disabled"><span class="page-link">上一頁</span></li>`;
        }


        for (let i = 1; i <= total; i++) {
            if (Number(page.currentPage) === i) {
                str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            } else {
                str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            }
        };

        if (page.hasNext) {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">下一頁</a></li>`;
        } else {
            str += `<li class="page-item disabled"><span class="page-link">下一頁</span></li>`;
        }

        pageid.innerHTML = str;
    }

    function switchPage(e) {
        e.preventDefault();
        if (e.target.nodeName !== 'A') return;
        const page = e.target.dataset.page;
        pagination(ProjectList, page);
    }

    pageid.addEventListener('click', switchPage);
}