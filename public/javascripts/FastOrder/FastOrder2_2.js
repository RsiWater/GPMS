class FastOrder2_2{
    constructor(result) {
        this.result=result;
        this.newTuple=this.newTuple.bind(this);
        this.next=this.next.bind(this);
        this.theChose=this.theChose.bind(this);
        this.getStationData = this.getStationData.bind(this);
        this.carNumFlex=document.querySelector('#carNumFlex');
        this.carNumFlex.classList.remove('hidden');
        this.isChose=false;
        this.numToChosen;
        this.carNumBuffer=[];

        // const testlist=['224','花蓮','臺北','車廂'];
        // const testlist2=['875','花蓮','臺北','車廂'];
        // this.newTuple(testlist);
        // this.carNumBuffer.push(testlist[0]);
        // this.newTuple(testlist2); //
        // this.carNumBuffer.push(testlist2[0]);
        this.getStationData(this.newTuple, this.carNumBuffer, this.carNumFlex, this.next);

        // const confirm=document.createElement('div'); //把按鈕加入
        // confirm.classList.add('carNumConfirm'); //把按鈕加入
        // confirm.textContent="確認送出";
        // confirm.addEventListener('click',this.next);
        // this.carNumFlex.appendChild(confirm);
    }
    //DBS function

    getStationData(__callback, __callback2, __callback3, __callback4)
    {
        // console.log('post');
        let time = this.result[2] + ':' + this.result[3];
        let send_data = {vehicle_type: this.result[0], date: this.result[1], time:time, start: this.result[4], destination: this.result[5]};
        
        $.ajax({
            url:'/main/FastOrder/getStation',
            type:'POST',
            data:send_data,
            datatype:'json',
        }).done(function(rcv_data)
        {
            // console.log(rcv_data)
            for(let i = 0; i < rcv_data.length; i++)
            {
                let type;
                if(rcv_data[i].Vehicle_type.toLowerCase() == 'train') type = rcv_data[i].train_type;
                else if(rcv_data[i].Vehicle_type.toLowerCase() == 'hsr') type = rcv_data[i].carrige_type;
                else type = null;

                let vehicleList = [rcv_data[i].Vehicle_num, rcv_data[i].begin_station, rcv_data[i].end_station, type];
                __callback(vehicleList);
                __callback2.push(rcv_data[i].Vehicle_num);
            }

            const confirm=document.createElement('div'); //把按鈕加入
            confirm.classList.add('carNumConfirm'); //把按鈕加入
            confirm.textContent="確認送出";
            confirm.addEventListener('click',__callback4);
            __callback3.appendChild(confirm);
        })
    }

    //end
    newTuple(list){
        const carNumList=document.createElement('div');
        const num_car=document.createElement('div');
        const num_st=document.createElement('div');
        const num_en=document.createElement('div');
        const num_box=document.createElement('div');
        carNumList.classList.add('carNumList');
        num_car.textContent=list[0];
        num_st.textContent=list[1];
        num_en.textContent=list[2];
        num_box.textContent=list[3];
        carNumList.appendChild(num_car);
        carNumList.appendChild(num_st);
        carNumList.appendChild(num_en);
        carNumList.appendChild(num_box);
        carNumList.addEventListener('click',this.theChose);

        this.carNumFlex.appendChild(carNumList);
    }

    theChose(event){
        this.isChose=true;
        const allcarNumList=document.querySelectorAll('.carNumList');
        let i=0;
        for(const l of allcarNumList){
            if(l==event.currentTarget){
                l.style.backgroundColor="gray";
                this.numToChosen=this.carNumBuffer[i];
            }
            else{
                l.style.backgroundColor="";
            }
            i++;
        }
    }

    next(){
        if(this.isChose==true){
            this.result.push(this.numToChosen);
            this.carNumFlex.classList.add('hidden');
            new FastOrder3(this.result);
        }
        else{
            alert('請選擇車次');
        }
    }
}