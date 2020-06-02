//[起始站 終點站] 看setStation 62列
class FastOrder2{
    constructor(choice,result){
        // 0-高鐵 1-台鐵 2-客運
        const s=document.querySelector('#station');
        s.classList.remove('hidden');
        this.choice=choice;
        this.result=result;
        this.HSRstart=this.HSRstart.bind(this);
        this.BUSstart=this.BUSstart.bind(this);
        this.setStation=this.setStation.bind(this);
        this.showStation=this.showStation.bind(this);
        this.stationChoice=this.stationChoice.bind(this);
        this.getListFromServer = this.getListFromServer.bind(this);
        this.bindEventListenerAndPushCountry = this.bindEventListenerAndPushCountry.bind(this);
        this.next=this.next.bind(this);
        //用className取得有的class名稱 用className.includes('className')確認
        // 0-宜蘭 1-台北 2-桃園 3-新竹 4-苗栗 5-台中 6-雲林 7-高雄 8-嘉義 
        // 9-台南 10-屏東 11-台東 12-花蓮 13-基隆 14-南投 15-彰化
        this.stationList=[];  //儲存要顯示的車站(小站)
        this.originalList=[];
        this.choiceState=false;  //false為選起始站 true為選終點站 的state
        this.flag  //小站是否被選的flag 並暫存現在選得站
        this.countyBox=[];

        this.testList=['小港','枋寮','鹿野','月月','真布','艾兒我婆','台北','水哥你好'];

        const theBall=document.querySelector('.red'); //把球改成橙色
        theBall.classList.remove('red');
        theBall.classList.add('orange');
        const ballText=document.querySelector('#stepNum'); //把球內的字改成Step2
        ballText.textContent='2';

        this.getListFromServer(choice, this.bindEventListenerAndPushCountry);
        // this.stationList = this.getListFromServer(choice);
    }
    // DBS function
    getListFromServer(choiceType, _callback)
    {
        let send_data = {type:choiceType, hi:'hello'};
        $.ajax({
            url: '/main/FastOrder/getData',
            type: 'POST',
            data: send_data,
            datatype: 'json',
        }).done(function(rcv_data)
        {
            console.log(rcv_data)
            _callback(rcv_data);
        });
    }

    bindEventListenerAndPushCountry(array)
    {
        this.originalList = array;
        this.stationList = array;
        const country=document.querySelectorAll('#county div');
        for(const c of country){
            this.countyBox.push(c);
            c.addEventListener('click',this.setStation);
        }
        if(this.choice===0){  //選到高鐵
            this.HSRstart();
        }
        else if(this.choice===2){  //選到客運
            this.BUSstart();
        }
    }

    // end
    HSRstart(){
        //沒有 基隆 南投 屏東 台東 花蓮 宜蘭
        this.countyBox[13].classList.add('hidden');
        this.countyBox[14].classList.add('hidden');
        this.countyBox[10].classList.add('hidden');
        this.countyBox[11].classList.add('hidden');
        this.countyBox[12].classList.add('hidden');
        this.countyBox[0].classList.add('hidden');
    }

    BUSstart(){
        //沒有 南投 台東 新竹 苗栗
        this.countyBox[14].classList.add('hidden');
        this.countyBox[11].classList.add('hidden');
        this.countyBox[4].classList.add('hidden');
        this.countyBox[3].classList.add('hidden');  //新竹沒客運??
    }

    setStation(event){  //設定小站 //////////////////////////////////
        const theType=trainsType[this.choice];  //存交通工具和縣市
        let theCountry=stationName[event.currentTarget.className];
        this.stationList = Object.assign([],this.originalList);
        let flag = false;
        // console.log(theType);
        console.log(theCountry);
        if(theCountry === "臺北 新北")
        {
            flag = true;
        }
        // this.stationList=this.testList;  //testList改成向資料庫query
        let newArray = [];
        for(let i = 0;i < this.stationList.length;i++)
        {
            if(!flag)
            {
                while(this.stationList[i].Municipality !== theCountry)
                {
                    this.stationList.splice(i,1);
                    if(this.stationList[i] == undefined) break;
                }
            }
            else
            {
                while(this.stationList[i].Municipality != "臺北" && this.stationList[i].Municipality != "新北")
                {
                    this.stationList.splice(i,1);
                    if(this.stationList[i] == undefined) break;
                }
            }
            if(this.stationList[i] !== undefined) newArray.push(this.stationList[i].Name);
        }
        this.stationList = newArray;
        console.log(this.stationList);
        this.showStation(theCountry);
    }

    showStation(theCounty){
        const stationConsole=document.querySelector('#stationConsole');
        const htmlList=document.querySelector('#stationList');
        htmlList.innerHTML="";
        stationConsole.textContent=theCounty;  //把console換字
        for(const s of this.stationList){  //把得到的list加入
            const oneStation=document.createElement('div');
            oneStation.textContent=s;
            oneStation.addEventListener('click',this.stationChoice);
            htmlList.appendChild(oneStation);
        }
        const stationConfirm=document.querySelector('#stationConfirm');
        stationConfirm.addEventListener('click',this.next);
        stationConfirm.classList.remove('hidden');
    }

    stationChoice(event){  //選小站
        const ListInhtml=document.querySelectorAll('#stationList div');
        for(const s of ListInhtml){
            if(s===event.currentTarget){
                this.flag=s.textContent;
                s.style.backgroundColor="gray";
                //設定背景顏色
            }
            else{
                s.style.backgroundColor="";
                //設定背景顏色
            }
        }
    }///////////////還沒選flag為-1

    next(){
        if(!this.choiceState){  //選起始站
            if(this.flag!==undefined){
                this.result.push(this.flag);
                console.log(this.result);
                this.flag=undefined;

                this.choiceState=true;  //進到選終站的狀態
                const stationConfirm=document.querySelector('#stationConfirm');
                stationConfirm.removeEventListener('click',this.next);
                stationConfirm.classList.add('hidden');  //把確認鍵刪掉↑
                const htmlList=document.querySelector('#stationList');
                htmlList.innerHTML="";  //清空
                stationConsole.textContent="選擇終點站";  //把console換字
            }
        }
        else{
            if(this.flag!==undefined){
                this.result.push(this.flag);
                const stationEnd=document.querySelector('#station');
                stationEnd.classList.add('hidden');
                new FastOrder2_2(this.result);
            }
        }
    }
}
//HSR train bus 資料庫儲存內容