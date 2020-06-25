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
//https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html 上傳資料處理
        this.init(info.certification) //初始化設定
    }

    init(certification){
        if(certification){
            this.modifyButton.addEventListener('click',this.toModify)
            this.titleText.innerText=info.title
            this.desText.innerText=info.description
        }
        else{
            this.modifyButton.classList.add('hidden')
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

    fileChoose(event){
        //console.log(event.target.files)
        const filename=event.target.files[0].name
        console.log(event.target.files)
        switch(event.target.id){
            case 'posterCh':
                const poster=document.querySelector('.poster')
                poster.innerText=filename
                break
            case 'pptCh':
                const ppt=document.querySelector('.ppt')
                ppt.innerText=filename
                break
            case 'docCh':
                const doc=document.querySelector('.doc')
                doc.innerText=filename
                break
            case 'codeCh':
                const code=document.querySelector('.code')
                code.innerText=filename
                break
        }
    }

    toUpdate(){ //上傳資料

    }
}

const info={'certification':true,'title':'生活助理','description':'他會幫助你的生活大小事。\n與他聊天，生活解悶\n生活記帳，自動分類，無流水帳\n\n\n\n你好',
            'poster':'','ppt':'','doc':'','code':''}
const ps=new ProjectShow(info)