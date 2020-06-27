class ProjectShow{
    //待處理事項: 提供下載檔案 上傳檔案資料設定
    constructor(info,imgSrc) {
        this.init=this.init.bind(this) //綁定function
        this.titleDesMod=this.titleDesMod.bind(this)
        this.updateMod=this.updateMod.bind(this)
        this.toUpdate=this.toUpdate.bind(this)
        this.cancelMod=this.cancelMod.bind(this)
        this.fileChoose=this.fileChoose.bind(this)
        this.fileDel=this.fileDel.bind(this)
        const modifyButton=document.querySelector('.modify')
        this.modifyButton=modifyButton //修改資料按鈕
        this.modifyTD=document.getElementById("modifyTD")//選擇修改標題/描述
        this.modifyUpData=document.getElementById("modifyUpData")//選擇上傳檔案
        this.backButton=document.querySelector('.back') //返回按鈕
        this.titleText=document.querySelector('.titleText') //標題
        this.desText=document.querySelector('.desText') //描述
        this.posterName=document.querySelector('.posterName') //海報名稱
        this.posterImg=document.querySelector('.posterImg') //海報圖片
        this.pptName=document.querySelector('.pptName') //簡報名稱
        this.pptImg=document.querySelector('.pptImg') //簡報圖片
        this.docName=document.querySelector('.docName') //文件名稱
        this.docImg=document.querySelector('.docImg') //文件圖片
        this.codeName=document.querySelector('.codeName') //程式碼名稱
        this.codeImg=document.querySelector('.codeImg') //程式碼圖片
        this.titleInput=document.querySelector('.titleInput') //標題輸入框
        this.desInput=document.querySelector('.desInput') //描述輸入框
        this.ppdcText=document.querySelector('.ppdcText')//文件指引文字
        this.updateButton=document.querySelector('.updateButton') //上傳刪除按鈕
        this.posterCh=document.getElementById('posterCh') //選擇檔案按鈕
        this.pptCh=document.getElementById('pptCh') //選擇投影片按鈕
        this.docCh=document.getElementById('docCh') //選擇文件按鈕
        this.codeCh=document.getElementById('codeCh') //程式碼選擇按鈕
        this.posterDel=document.getElementById('posterDel') //海報刪除按鈕
        this.pptDel=document.getElementById('pptDel') //投影片刪除按鈕
        this.docDel=document.getElementById('docDel') //文件刪除按鈕
        this.codeDel=document.getElementById('codeDel') //程式碼刪除按鈕
        this.poster=document.querySelector('.poster')
        this.ppt=document.querySelector('.ppt')
        this.doc=document.querySelector('.doc')
        this.code=document.querySelector('.code')

        let upData //預定儲存上傳的訊息
        this.upData=upData

        this.init(info.certification) //初始化設定
    }

    init(certification){
        console.log(info)
        if(certification){ //專題修改認證
            this.modifyTD.addEventListener('click',this.titleDesMod)
            this.modifyUpData.addEventListener('click',this.updateMod)
        }
        else{
            this.modifyButton.classList.add('hidden')
        }

        if(info.title!=null){ //標題 描述初始化
            this.titleText.innerText=info.title
        }else{
            this.titleText.innerText="尚未設置標題..."
        }
        if(info.description!=null){
            this.desText.innerText=info.description
        }else{
            this.desText.innerText="尚未設置專題描述..."
        }

        if(info.poster!=null){ //四個檔案初始化
            this.posterName.innerText=info.poster/////////////info.poster.files[0].name
            this.posterImg.setAttribute("src",imgSrc.poster)
            //設置download css
            this.poster.classList.add('downhover')
            this.poster.setAttribute("onclick","posterDownload.click()")
        }else
            this.poster.setAttribute("onclick",null)
        if(info.ppt!=null){
            this.pptName.innerText=info.ppt////////////////// info.ppt.files[0].name
            this.pptImg.setAttribute("src",imgSrc.ppt)
            //設置download css
            this.ppt.classList.add('downhover')
            this.ppt.setAttribute("onclick","pptDownload.click()")
        }else
            this.ppt.setAttribute("onclick",null)
        if(info.doc!=null){
            this.docName.innerText=info.doc////////////////// info.doc.files[0].name
            this.docImg.setAttribute("src",imgSrc.doc)
            //設置download css
            this.doc.classList.add('downhover')
            this.doc.setAttribute("onclick","docDownload.click()")
        }else
            this.doc.setAttribute("onclick",null)
        if(info.code!=null){
            this.codeName.innerText=info.code///////////////// info.code.files[0].name
            this.codeImg.setAttribute("src",imgSrc.code)
            //設置download css
            this.code.classList.add('downhover')
            this.code.setAttribute("onclick","codeDownload.click()")
        }else
            this.code.setAttribute("onclick",null)

        //使用ajax通道上傳的資料
        this.upData={'title':"",'description':"",'poster':false,'ppt':false,'doc':false,'code':false}
    }

    titleDesMod(){
        this.ppdcText.classList.add('hidden')
        this.updateButton.classList.remove('hidden')//選擇資料按鈕

        this.titleText.innerText=""
        this.titleInput.classList.remove('hidden') //標題輸入框
        this.titleInput.value=info.title
        this.desText.innerText=""
        this.desInput.classList.remove('hidden') //描述輸入框
        this.desInput.value=info.description

        const chooseButton=document.querySelectorAll(".choose")
        for(let choose of chooseButton){
            choose.classList.add("hidden")
        }
        const deleteButton=document.querySelectorAll(".delete")
        for(let del of deleteButton){
            del.classList.remove("hidden")
        }

        this.posterDel.addEventListener('click',this.fileDel)//刪除資料按鈕綁定event
        this.pptDel.addEventListener('click',this.fileDel)
        this.docDel.addEventListener('click',this.fileDel)
        this.codeDel.addEventListener('click',this.fileDel)

        this.modifyButton.textContent="儲存修改"//"選擇修改"按鈕改成"儲存修改"並綁定event
        this.modifyButton.addEventListener('click',this.toUpdate)
        this.modifyButton.setAttribute("data-target",null)

        this.backButton.addEventListener('click',this.cancelMod)//"取消"綁定為取消修改(復原)
    }

    updateMod(){
        this.ppdcText.classList.add('hidden')
        this.updateButton.classList.remove('hidden')//選擇資料按鈕

        const chooseButton=document.querySelectorAll(".choose")
        for(let choose of chooseButton){
            choose.classList.remove("hidden")
        }
        const deleteButton=document.querySelectorAll(".delete")
        for(let del of deleteButton){
            del.classList.add("hidden")
        }

        this.posterCh.addEventListener('change',this.fileChoose)//選擇資料按鈕綁定event
        this.pptCh.addEventListener('change',this.fileChoose)
        this.docCh.addEventListener('change',this.fileChoose)
        this.codeCh.addEventListener('change',this.fileChoose)

        this.modifyButton.classList.add("hidden")

        this.backButton.addEventListener('click',this.cancelMod)//"取消"綁定為取消修改(復原)
    }

    cancelMod(){ //取消修改
        this.init(info.certification)
        this.modifyButton.textContent="修改資料"
        this.modifyButton.removeEventListener('click',this.toUpdate)
        this.modifyButton.setAttribute("data-target","#exampleModalCenter")
        this.modifyButton.classList.remove("hidden")
        this.titleInput.classList.add('hidden')
        this.desInput.classList.add('hidden')

        this.ppdcText.classList.remove('hidden')
        this.updateButton.classList.add('hidden')
    }

    fileChoose(event){//選擇按鈕
        const filename=event.target.files[0].name
        switch(event.target.id){
            case 'posterCh':
                this.posterName.innerText=filename
                this.posterImg.setAttribute("src",imgSrc.poster)
                this.poster.classList.remove('downhover') //移除下載綁定
                this.poster.setAttribute("onclick",null)
                break
            case 'pptCh':
                this.pptName.innerText=filename
                this.pptImg.setAttribute("src",imgSrc.ppt)
                this.ppt.classList.remove('downhover') //移除下載綁定
                this.ppt.setAttribute("onclick",null)
                break
            case 'docCh':
                this.docName.innerText=filename
                this.docImg.setAttribute("src",imgSrc.doc)
                this.doc.classList.remove('downhover')  //移除下載綁定
                this.doc.setAttribute("onclick",null)
                break
            case 'codeCh':
                this.codeName.innerText=filename
                this.codeImg.setAttribute("src",imgSrc.code)
                this.code.classList.remove('downhover') //移除下載綁定
                this.code.setAttribute("onclick",null)
                break
        }
    }

    fileDel(event){//檔案刪除
        switch(event.target.id){
            case 'posterDel':
                this.posterName.innerText="尚未上傳檔案"
                this.posterImg.setAttribute("src","")
                this.poster.classList.remove('downhover') //移除下載綁定
                this.poster.setAttribute("onclick",null)
                this.upData.poster=true
                break
            case 'pptDel':
                this.pptName.innerText="尚未上傳檔案"
                this.pptImg.setAttribute("src","")
                this.ppt.classList.remove('downhover') //移除下載綁定
                this.ppt.setAttribute("onclick",null)
                this.upData.ppt=true
                break
            case 'docDel':
                this.docName.innerText="尚未上傳檔案"
                this.docImg.setAttribute("src","")
                this.doc.classList.remove('downhover')  //移除下載綁定
                this.doc.setAttribute("onclick",null)
                this.upData.doc=true
                break
            case 'codeDel':
                this.codeName.innerText="尚未上傳檔案"
                this.codeImg.setAttribute("src","")
                this.code.classList.remove('downhover') //移除下載綁定
                this.code.setAttribute("onclick",null)
                this.upData.code=true
                break
        }
    }

    toUpdate(){ //上傳資料
        this.upData.title=this.titleInput.value
        this.upData.description=this.desInput.value
        console.log('wewe')

        let sendData = this.upData

        // $.ajax({
        //     url: '/systemManage/projectManage/projectShow/modifyProject',
        //     type: 'POST',
        //     data: sendData,
        //     datatype: 'json'
        // }).done(function (rcvMessage) {
        //     console.log(rcvMessage)
        //     window.location.reload();
        // })
    }
}
const imgSrc={'poster':'../../images/poster.png','ppt':'../../images/microsoft-powerpoint.png',
              'doc':'../../images/microsoft-word.png','code':'../../images/compressed.png',download:"../../images/download_icon.png"}

// const info={'certification':true,'title':'生活助理','description':'他會幫助你的生活大小事。\n與他聊天，生活解悶\n生活記帳，自動分類，無流水帳\n\n\n\n你好',
//             'poster':'專題成果報告書_行車安全警示系統.pdf','ppt':'聊天機器人(上).pptx',
//             'doc':'專題成果報告書_NeoHand2.docx','code':'GA_A1065506.zip'}

// const info={'certification':true,'title':null,'description':null,
//             'poster':null,'ppt':null,
//             'doc':null,'code':null}
let info
$.ajax({
        url: '/systemManage/projectManage/projectShow/getData',
        type: 'POST',
        data: null,
        datatype: 'json'
    }).done(function (rcvMessage) {
        info=rcvMessage.info
        const ps=new ProjectShow(info,imgSrc)
    })
//const ps=new ProjectShow(info,imgSrc)