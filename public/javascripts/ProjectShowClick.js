function clickToChange(event){
    const clicked_button = event.currentTarget;
    if(clicked_button.classList.contains('delete')){
        if(clicked_button.classList.contains('poster'))
            if(dataExist('poster')) alert('刪除檔案')
            else alert('現在未上傳任何檔案，無須刪除')
        if(clicked_button.classList.contains('ppt'))
            if(dataExist('ppt')) alert('刪除檔案')
            else alert('現在未上傳任何檔案，無須刪除')
        if(clicked_button.classList.contains('doc'))
            if(dataExist('doc')) alert('刪除檔案')
            else alert('現在未上傳任何檔案，無須刪除')
        if(clicked_button.classList.contains('code'))
            if(dataExist('code')) alert('刪除檔案')
            else alert('現在未上傳任何檔案，無須刪除')
    }
    else if(clicked_button.classList.contains('choose')){
        if(clicked_button.classList.contains('poster'))
            if(!dataExist('poster')) chooseShow('poster');
            else alert('現在已有檔案，如需重新上傳請先刪除檔案')
        else if(clicked_button.classList.contains('ppt'))
            if(!dataExist('ppt')) chooseShow('ppt')
            else alert('現在已有檔案，如需重新上傳請先刪除檔案')
        else if(clicked_button.classList.contains('doc'))
            if(!dataExist('doc')) chooseShow('doc')
            else alert('現在已有檔案，如需重新上傳請先刪除檔案')
        else if(clicked_button.classList.contains('code'))
            if(!dataExist('code')) chooseShow('code')
            else alert('現在已有檔案，如需重新上傳請先刪除檔案')
        
    }
}

function chooseShow(className){
    const custom_name = ".custom-file."+className
    const current_name = ".current-file."+className
    const custom = document.querySelector(custom_name)
    const current = document.querySelector(current_name)
    custom.classList.remove('hidden')
    current.classList.add('hidden')
}

//to do
function dataExist(name){
    return false;
}

const buttons = document.querySelectorAll('.btn');
for (let button of buttons){
    button.addEventListener('click',clickToChange);
}