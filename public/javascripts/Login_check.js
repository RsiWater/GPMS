//POST function

let data;
$('#submit').click(function(e)
{
    console.log('Button Clicked');
    $.ajax({
        url: '/main/Login_check/check',
        type:'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        }).done(function(data) {
            console.log(data);
            if(data.length > 0)
            {
                regionIDSet(data[0].region, data[0].ID);
                creatList(jsonToList(data));
            }
            else
            {
                alert('尚未找到訂票資訊！')
                window.location.href='/main';
            }
        });    
    return false;
})

$('#modifyWindow button').click(function(e)
{
    e.preventDefault();
})


function cancelDatabase()
{
    console.log('Button Deleted');
    $.ajax({
        url: '/main/Loading/cancel',
        type:'POST',
        request: JSON.stringify(data),
        dataType: 'json',
        complete: function(response)
        {
            window.location.href = '/main/Loading/';
        }
        }).done(function(request) {
            console.log(request);
        });    
}

function testAlive()
{
    console.log('Alive');
}


// data control
function creatList(contentList){
    const loginBox=document.querySelector('#loginWindow');
    loginBox.classList.add('hidden');

    const Box=document.querySelector('#shoppingBox');
    Box.classList.remove('hidden');

    const title=['訂票序號: ','搭乘日期: ','交通工具: ','車次代碼: ','車輛種類: ','起始車站: ','終點車站: ','座位號碼: ','合計金額: ','付款方式: ','付款狀況: '];

    const myList=document.createElement('div');
    myList.classList.add('shoppingList');
    
    
    let myEntity;
    let myListTitle;
    let myListContent;

    for(let i=0;i<title.length;i++){
        myEntity=document.createElement('div');
        myListTitle=document.createElement('div');
        myListContent=document.createElement('div');
        myListTitle.classList.add('listTitle');
        myListContent.classList.add('listContent');
        myListTitle.textContent=title[i];
        myListContent.textContent=contentList[i];
        myEntity.appendChild(myListTitle);
        myEntity.appendChild(myListContent);
        myList.appendChild(myEntity);
    }

    const modClrBox=document.createElement('div');
    modClrBox.classList.add('modClrBox');

    const modifyDIV=document.createElement('div');
    modifyDIV.classList.add('modify');
    const modify=document.createElement('button');
    modify.id='modify';
    modify.innerText='修改訂單';
    modifyDIV.addEventListener('click',funMod);
    modifyDIV.appendChild(modify);
    modClrBox.appendChild(modifyDIV);

    if(contentList[contentList.length-1]==='未付款'){

        const clearDIV=document.createElement('form');
        clearDIV.classList.add('clear');
        clearDIV.action = '/main/Loading';
        clearDIV.method = 'POST';
        const clear=document.createElement('button');
        clear.id='cancel';
        clear.type = 'submit';
        clear.innerText='清除訂單';
        const hiddenID = document.createElement('input');
        hiddenID.classList.add('hidden');
        hiddenID.type = 'text';
        hiddenID.name = 'deleteID';
        clearDIV.appendChild(hiddenID);
        hiddenID.value = document.querySelector('#ID').value;
        // clear.addEventListener('click', cancelDatabase);
        clearDIV.appendChild(clear);
        modClrBox.appendChild(clearDIV);
    }
    myList.appendChild(modClrBox);
    Box.appendChild(myList);
}

////////////////////////////////////////////////////////////////

function regionIDSet(country,idNum){
    const Box=document.querySelector('#shoppingBox');

    const cInf=document.createElement('div');
    cInf.classList.add('cInf');

    const region=document.createElement('div');
    region.classList.add('region');
    region.textContent='國籍: '+country;

    const cID=document.createElement('div');
    cID.classList.add('cID');
    cID.textContent='身分碼: '+idNum;

    cInf.appendChild(region);
    cInf.appendChild(cID);
    Box.appendChild(cInf);
}

////////////////////////////////////////////////////////////////
function funMod(){
    const modWindow=document.querySelector('#modifyWindow');
    modWindow.classList.remove('hidden');
    const unMod=document.querySelector('.subMod button');
    unMod.addEventListener('click',modCancel);
}
function modCancel(){
    const modWindow=document.querySelector('#modifyWindow');
    modWindow.classList.add('hidden');
}
///////////////////////////////////////////////////////////////
// regionIDSet('花蓮國','A875874566');
let mybutton=document.querySelector('button');
const list123=['abc123','2020/1/10','火車','416','普悠瑪','往北','小港國','天龍國','4車87號','875','信用卡','未付款'];
// mybutton.addEventListener('click',function() {creatList(list123)});
function jsonToList(json)
{
    let json_zero = json[0];
    let customerList = [json_zero.Serial_code, json_zero.Date, json_zero.vehicle_type, json_zero.VID, json_zero.type, json_zero.start, json_zero.destination, json_zero.seat_no, json_zero.price, json_zero.method, json_zero.Status];
    return customerList;
}