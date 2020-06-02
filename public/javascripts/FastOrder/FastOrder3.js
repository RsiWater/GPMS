//[國籍 ID 票數 票價]
class FastOrder3{
    constructor(result){
        console.log(result);
        this.result=result;
        this.step=0;
        this.toFinish=this.toFinish.bind(this);
        this.submit=this.submit.bind(this);

        const theBall=document.querySelector('.orange');
        theBall.classList.remove('orange');
        theBall.classList.add('green');
        const stepNum=document.querySelector('#stepNum');
        stepNum.textContent=3;
        const final=document.querySelector('#idReg');
        final.classList.remove('hidden');

        const confirm=document.querySelector('#idRegConfirm');
        confirm.addEventListener('click',this.toFinish);
    }

    toFinish(){
        if(this.step===0){  //輸入國籍 ID 階段
            const myRegion=document.querySelector('#TheRegion');
            const myId=document.querySelector('#phone');
            const r=myRegion.value;
            const i=myId.value
            if(r==="" || i===""){
                alert("請填寫完整");
            }
            else{
                this.result.push(r);
                this.result.push(i);
                this.step=1;

                const removeReg=document.querySelector('#region');
                const addTicket=document.querySelector('#ticket');
                removeReg.classList.add('hidden');
                addTicket.classList.remove('hidden');
            }
            document.querySelector('#idRegConfirm').type = 'submit';
        }
        else if(this.step===1){  //輸入票數階段
            const theTicket=document.querySelector('#a-of-passangers');
            this.result.push(theTicket.value * 300);
            console.log(this.result);//////////
            /////////////把該格的內容push到this.result裡面
            this.submit();
        }
    }

    submit(){
        //submit this.result
        let time = this.result[2] + ':' + this.result[3];
        let send_data = {vehicle_type: this.result[0], date: this.result[1], time: time, start: this.result[4], destination: this.result[5], vehicle_num: this.result[6],region: this.result[7], ID: this.result[8], price: this.result[9], type: '一般票'};


        const inputMessage = document.querySelector('form.submitButton');
        for(let i = 0;i < 10;i++)
        {
            const div = document.createElement('input');

            switch(i)
            {
                case 0:
                div.name = 'vehicle_type';
                div.value = send_data.vehicle_type;
                break;
                case 1:
                div.name = 'ID';
                div.value = send_data.ID;
                break;
                case 2:
                div.name = 'start';
                div.value = send_data.start;
                break;
                case 3:
                div.name = 'destination';
                div.value = send_data.destination;
                break;
                case 4:
                div.name = 'type';
                div.value = send_data.type;
                break;
                case 5:
                div.name = 'region';
                div.value = send_data.region;
                break;
                case 6:
                div.name = 'date';
                div.value = send_data.date;
                break;
                case 7:
                div.name = 'price';
                div.value = send_data.price;
                break;
                case 8:
                div.name = 'vehicle_num';
                div.value = send_data.vehicle_num;
                break;
                case 9:
                div.name = 'time';
                div.value = send_data.time;
            }
            div.classList.add('hidden');
            inputMessage.appendChild(div);
            console.log(div);
        }
        // $.ajax({
        //     url:"/main/FastOrder/submitTicket",
        //     type:"POST",
        //     data:send_data,
        //     datatype:'json',
        // }).done(function(rcv_data)
        // {

        // })
    }
}