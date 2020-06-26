var file = document.querySelector('#file');
var upload = document.querySelector('#upload');
var xhr = new XMLHttpRequest();
upload.addEventListener('click', uploadFile, false);
// 點選上傳
function uploadFile(event) {
var formData = new FormData();
formData.append('test-upload', file.files[0]);
xhr.onload = uploadSuccess;
xhr.open('post', '/test/upload', true);
xhr.send(formData);
console.log('hello')
}

function uploadSuccess(event) {
    if (xhr.readyState === 4) {
    console.log(xhr.responseText);
    }
}