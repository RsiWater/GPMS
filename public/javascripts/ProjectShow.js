class ProjectShow{
    constructor(info) {
        this.init=this.init.bind(this)
        this.toModify=this.toModify.bind(this)
        this.toUpdate=this.toUpdate.bind(this)
        this.cancelMod=this.cancelMod.bind(this)
        this.fileChoose=this.fileChoose.bind(this)
        const modifyButton=document.querySelector('.modify')
        this.modifyButton=modifyButton //修改資料按鈕
        const backButton=document.querySelector('.back')
        this.backButton=backButton //返回按鈕
        const titleText=document.querySelector('.titleText')
        this.titleText=titleText //標題
        const desText=document.querySelector('.desText')
        this.desText=desText //描述

        const posterCh=document.getElementById('posterCh')
        posterCh.addEventListener('change',this.fileChoose)
        const pptCh=document.getElementById('pptCh')
        pptCh.addEventListener('change',this.fileChoose)
        const docCh=document.getElementById('docCh')
        docCh.addEventListener('change',this.fileChoose)
        const codeCh=document.getElementById('codeCh')
        codeCh.addEventListener('change',this.fileChoose)

        this.init(info.certification) //初始化設定

    }

    init(certification){
        if(certification){
            this.modifyButton.addEventListener('click',this.toModify)
        }
        else{
            this.modifyButton.classList.add('hidden')
        }

        if(info.title!=null){
            this.titleText.innerText=info.title
        }else{
            this.titleText.innerText="尚未設置標題..."
        }
        if(info.description!=null){
            this.desText.innerText=info.description
        }else{
            this.desText.innerText="尚未設置專題描述..."
        }

        if(info.poster!=null){
                        
        }
        if(info.ppt!=null){

        }
        if(info.doc!=null){

        }
        if(info.code!=null){
            
        }
    }

    toModify(){
        this.titleText.innerText=""
        const titleInput=document.querySelector('.titleInput')
        titleInput.classList.remove('hidden')
        titleInput.value=info.title //標題輸入框
        this.desText.innerText=""
        const desInput=document.querySelector('.desInput')
        desInput.classList.remove('hidden')
        desInput.value=info.description //描述輸入框

        const ppdcText=document.querySelector('.ppdcText')
        ppdcText.classList.add('hidden')
        const updateButton=document.querySelector('.updateButton')
        updateButton.classList.remove('hidden')//選擇資料按鈕

        this.modifyButton.textContent="儲存修改"
        this.modifyButton.addEventListener('click',this.toUpdate)

        this.backButton.addEventListener('click',this.cancelMod)
    }

    cancelMod(){
        this.init(info.certification)
        this.modifyButton.textContent="修改資料"
        const titleInput=document.querySelector('.titleInput')
        titleInput.classList.add('hidden')
        const desInput=document.querySelector('.desInput')
        desInput.classList.add('hidden')

        const ppdcText=document.querySelector('.ppdcText')
        ppdcText.classList.remove('hidden')
        const updateButton=document.querySelector('.updateButton')
        updateButton.classList.add('hidden')
    }

    downloadFile(fileName, content){
        var aLink = document.createElement('a');
        var blob = new Blob([content]);
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, false);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(evt);
    }

    fileChoose(event){
        const filename=event.target.files[0].name
        console.log(event.target.files)
        switch(event.target.id){
            case 'posterCh':
                const posterName=document.querySelector('.posterName')
                posterName.innerText=filename
                const posterImg=document.querySelector('.posterImg')
                posterImg.setAttribute("src","../public/images/poster.png")
                break
            case 'pptCh':
                const pptName=document.querySelector('.pptName')
                pptName.innerText=filename
                const pptImg=document.querySelector('.pptImg')
                pptImg.setAttribute("src","../public/images/microsoft-powerpoint.png")
                break
            case 'docCh':
                const docName=document.querySelector('.docName')
                docName.innerText=filename
                const docImg=document.querySelector('.docImg')
                docImg.setAttribute("src","../public/images/microsoft-word.png")
                break
            case 'codeCh':
                const codeName=document.querySelector('.codeName')
                codeName.innerText=filename
                const codeImg=document.querySelector('.codeImg')
                codeImg.setAttribute("src","../public/images/compressed.png")
                break
        }
    }

    toUpdate(){ //上傳資料

    }
}

const info={'certification':true,'title':'生活助理','description':'他會幫助你的生活大小事。\n與他聊天，生活解悶\n生活記帳，自動分類，無流水帳\n\n\n\n你好',
            'poster':'../fileTest/專題成果報告書_行車安全警示系統.pdf','ppt':'../fileTest/聊天機器人(上).pptx',
            'doc':'../fileTest/專題成果報告書_NeoHand2.docx','code':'../fileTest/GA_A1065506.zip'}
const ps=new ProjectShow(info)