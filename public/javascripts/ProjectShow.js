class ProjectShow{
    //待處理事項: 提供下載檔案 上傳檔案資料設定
    constructor(info,imgSrc) {
        this.init=this.init.bind(this) //綁定function
        this.toModify=this.toModify.bind(this)
        this.toUpdate=this.toUpdate.bind(this)
        this.cancelMod=this.cancelMod.bind(this)
        this.fileChoose=this.fileChoose.bind(this)
        this.fileDel=this.fileDel.bind(this)
        const modifyButton=document.querySelector('.modify')
        this.modifyButton=modifyButton //修改資料按鈕
        const backButton=document.querySelector('.back')
        this.backButton=backButton //返回按鈕
        const titleText=document.querySelector('.titleText')
        this.titleText=titleText //標題
        const desText=document.querySelector('.desText')
        this.desText=desText //描述
        const posterName=document.querySelector('.posterName')
        this.posterName=posterName//海報名稱
        const posterImg=document.querySelector('.posterImg')
        this.posterImg=posterImg//海報圖片
        const pptName=document.querySelector('.pptName')
        this.pptName=pptName//簡報名稱
        const pptImg=document.querySelector('.pptImg')
        this.pptImg=pptImg//簡報圖片
        const docName=document.querySelector('.docName')
        this.docName=docName//文件名稱
        const docImg=document.querySelector('.docImg')
        this.docImg=docImg//文件圖片
        const codeName=document.querySelector('.codeName')
        this.codeName=codeName//程式碼名稱
        const codeImg=document.querySelector('.codeImg')
        this.codeImg=codeImg//程式碼圖片
        const titleInput=document.querySelector('.titleInput')
        this.titleInput=titleInput//標題輸入框
        const desInput=document.querySelector('.desInput')
        this.desInput=desInput//描述輸入框
        const ppdcText=document.querySelector('.ppdcText')
        this.ppdcText=ppdcText//指引文字
        const updateButton=document.querySelector('.updateButton')
        this.updateButton=updateButton//上傳刪除按鈕
        const posterCh=document.getElementById('posterCh')
        this.posterCh=posterCh//選擇檔案按鈕
        const pptCh=document.getElementById('pptCh')
        this.pptCh=pptCh//選擇投影片按鈕
        const docCh=document.getElementById('docCh')
        this.docCh=docCh//選擇文件按鈕
        const codeCh=document.getElementById('codeCh')
        this.codeCh=codeCh//程式碼選擇按鈕
        const posterDel=document.getElementById('posterDel')
        this.posterDel=posterDel//海報刪除按鈕
        const pptDel=document.getElementById('pptDel')
        this.pptDel=pptDel//投影片刪除按鈕
        const docDel=document.getElementById('docDel')
        this.docDel=docDel//文件刪除按鈕
        const codeDel=document.getElementById('codeDel')
        this.codeDel=codeDel//程式碼刪除按鈕
        this.poster=document.querySelector('.poster')
        this.ppt=document.querySelector('.ppt')
        this.doc=document.querySelector('.doc')
        this.code=document.querySelector('.code')

        let upData //預定儲存上傳的訊息
        this.upData=upData

        this.init(info.certification) //初始化設定
    }

    init(certification){
        if(certification){ //專題修改認證
            this.modifyButton.addEventListener('click',this.toModify)
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
            //設置download
            $(".poster").click(function(){
                window.open("http://elearning.nuk.edu.tw/m_teacher/m_tea_txbook_files.php?jteabook_sd=126217")
            })
            this.poster.classList.add('downhover')
        }
        if(info.ppt!=null){
            this.pptName.innerText=info.ppt////////////////// info.ppt.files[0].name
            this.pptImg.setAttribute("src",imgSrc.ppt)
            //設置download
            $(".ppt").click(function(){
                window.open("http://elearning.nuk.edu.tw/m_teacher/m_tea_txbook_files.php?jteabook_sd=126217")
            })
            this.ppt.classList.add('downhover')
        }
        if(info.doc!=null){
            this.docName.innerText=info.doc////////////////// info.doc.files[0].name
            this.docImg.setAttribute("src",imgSrc.doc)
            //設置download
            $(".doc").click(function(){
                window.open("http://elearning.nuk.edu.tw/m_teacher/m_tea_txbook_files.php?jteabook_sd=126217")
            })
            this.doc.classList.add('downhover')
        }
        if(info.code!=null){
            this.codeName.innerText=info.code///////////////// info.code.files[0].name
            this.codeImg.setAttribute("src",imgSrc.code)
            //設置download
            $(".code").click(function(){
                window.open("http://elearning.nuk.edu.tw/m_teacher/m_tea_txbook_files.php?jteabook_sd=126217")
            })
            this.code.classList.add('downhover')
        }

        this.upData={'title':[true,null],'description':[true,null],'poster':[false,null],
        'ppt':[false,null],'doc':[false,null],'code':[false,null]} //Boolean為false表示未經過修改
    }

    toModify(){ //選擇修改觸發
        this.titleText.innerText=""
        this.titleInput.classList.remove('hidden') //標題輸入框
        this.desText.innerText=""
        this.desInput.classList.remove('hidden') //描述輸入框

        this.ppdcText.classList.add('hidden')
        this.updateButton.classList.remove('hidden')//選擇資料按鈕

        this.posterCh.addEventListener('change',this.fileChoose)//選擇資料按鈕綁定event
        this.pptCh.addEventListener('change',this.fileChoose)
        this.docCh.addEventListener('change',this.fileChoose)
        this.codeCh.addEventListener('change',this.fileChoose)

        this.posterDel.addEventListener('click',this.fileDel)//刪除資料按鈕綁定event
        this.pptDel.addEventListener('click',this.fileDel)
        this.docDel.addEventListener('click',this.fileDel)
        this.codeDel.addEventListener('click',this.fileDel)

        this.modifyButton.textContent="儲存修改"//"選擇修改"按鈕改成"儲存修改"並綁定event
        this.modifyButton.addEventListener('click',this.toUpdate)

        this.backButton.addEventListener('click',this.cancelMod)//"取消"綁定為取消修改(復原)
    }

    cancelMod(){ //取消修改
        this.init(info.certification)
        this.modifyButton.textContent="修改資料"
        this.modifyButton.removeEventListener('click',this.toUpdate)
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
                $(".poster").unbind('click')
                this.upData.poster[0]=true
                this.upData.poster[1]=this.posterCh.files
                break
            case 'pptCh':
                this.pptName.innerText=filename
                this.pptImg.setAttribute("src",imgSrc.ppt)
                this.ppt.classList.remove('downhover') //移除下載綁定
                $(".ppt").unbind('click')
                this.upData.ppt[0]=true
                this.upData.ppt[1]=this.pptCh.files
                break
            case 'docCh':
                this.docName.innerText=filename
                this.docImg.setAttribute("src",imgSrc.doc)
                this.doc.classList.remove('downhover')  //移除下載綁定
                $(".doc").unbind('click')
                this.upData.doc[0]=true
                this.upData.doc[1]=this.docCh.files
                break
            case 'codeCh':
                this.codeName.innerText=filename
                this.codeImg.setAttribute("src",imgSrc.code)
                this.code.classList.remove('downhover') //移除下載綁定
                $(".code").unbind('click')
                this.upData.code[0]=true
                this.upData.code[1]=this.codeCh.files
                break
        }
    }

    fileDel(event){//檔案刪除
        switch(event.target.id){
            case 'posterDel':
                this.posterName.innerText="尚未上傳檔案"
                this.posterImg.setAttribute("src","")
                this.poster.classList.remove('downhover') //移除下載綁定
                $(".poster").unbind('click')
                this.upData.poster[0]=true
                this.upData.poster[1]=null
                break
            case 'pptDel':
                this.pptName.innerText="尚未上傳檔案"
                this.pptImg.setAttribute("src","")
                this.ppt.classList.remove('downhover') //移除下載綁定
                $(".ppt").unbind('click')
                this.upData.ppt[0]=true
                this.upData.ppt[1]=null
                break
            case 'docDel':
                this.docName.innerText="尚未上傳檔案"
                this.docImg.setAttribute("src","")
                this.doc.classList.remove('downhover')  //移除下載綁定
                $(".doc").unbind('click')
                this.upData.doc[0]=true
                this.upData.doc[1]=null
                break
            case 'codeDel':
                this.codeName.innerText="尚未上傳檔案"
                this.codeImg.setAttribute("src","")
                this.code.classList.remove('downhover') //移除下載綁定
                $(".code").unbind('click')
                this.upData.code[0]=true
                this.upData.code[1]=null
                break
        }
    }

    toUpdate(){ //上傳資料
        this.upData.title[1]=this.titleInput.value
        this.upData.description[1]=this.desInput.value
        $.ajax({
            url: '/teacherMain/projectManage/addscore', //待修改
            type: 'POST',
            data: SendScore,
            datatype: 'json',
        }).done(function (rcvMessage) {
            console.log(rcvMessage)
            window.location.reload();
        })
    }
}
const imgSrc={'poster':'../public/images/poster.png','ppt':'../public/images/microsoft-powerpoint.png',
              'doc':'../public/images/microsoft-word.png','code':'../public/images/compressed.png',download:"../public/images/download_icon.png"}

const info={'certification':true,'title':'生活助理','description':'他會幫助你的生活大小事。\n與他聊天，生活解悶\n生活記帳，自動分類，無流水帳\n\n\n\n你好',
            'poster':'專題成果報告書_行車安全警示系統.pdf','ppt':'聊天機器人(上).pptx',
            'doc':'專題成果報告書_NeoHand2.docx','code':'GA_A1065506.zip'}

/*const info={'certification':true,'title':null,'description':null,
            'poster':null,'ppt':null,
            'doc':null,'code':null}*/
const ps=new ProjectShow(info,imgSrc)