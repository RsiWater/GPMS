// [車種 日期 時間]
class FastOrder{
    constructor(){
        // 0-高鐵 1-台鐵 2-客運
        this.choiceType=this.choiceType.bind(this);
        this.choiceDate=this.choiceDate.bind(this);
        this.toStep2=this.toStep2.bind(this);
        this.result=[];  //儲存選的所有結果
        this.passType;  //傳給Step2的Type(交通工具)

        const type=document.querySelectorAll('#type div');
        for(const t of type){  //將所有車種的div存入typeBox中
            t.addEventListener('click',this.choiceType);
        }
    }

    choiceType(event){  //存入選的車種
        if(event.currentTarget.id=='HSR'){
            this.result.push("HSR");
            this.passType=0;
        }
        else if(event.currentTarget.id=='TRA'){
            this.result.push("Train");
            this.passType=1;
        }
        else if(event.currentTarget.id=='BUS'){
            this.result.push('Bus');
            this.passType=2;
        }
        const myType=document.querySelector('#type');
        myType.classList.add('hidden');
        this.choiceDate();
    }

    choiceDate(){  //選則日期/時間
        const date=document.querySelector('#date');
        date.classList.remove('hidden');

        const dateConfirm=document.querySelector('#dateConfirm');
        dateConfirm.addEventListener('click',this.toStep2);
    }

    toStep2(){  //將選的日期/時間存入
        const theDate=document.getElementById('date-of-journey');
        const myDate=theDate.value;
        const theTimeH=document.getElementById('time-of-hour');
        const myTimeH=theTimeH.value;
        const theTimeM=document.getElementById('time-of-minute');
        const myTimeM=theTimeM.value;
        if(myDate==="" || myTimeH==="" || myTimeM===""){
            alert("請把日期/時間填寫");
        }
        else{
            this.result.push(myDate);
            this.result.push(myTimeH);
            this.result.push(myTimeM);

            const dateRemove=document.querySelector('#date'); //把date選項移掉
            dateRemove.classList.add('hidden');
            new FastOrder2(this.passType,this.result); //進入Step2
        }
    }
}

const TaiwanStart=new FastOrder();