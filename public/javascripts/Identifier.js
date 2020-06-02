let send_data;
let reserve_data;
$.ajax({
    url:'/main/Identifier/getData',
    type:'POST',
    data:send_data,
    datatype:'json',
}).done(function(rcv_data)
{
    console.log(rcv_data)
    showVehicle(rcv_data)
})

$.ajax({
    url:'/main/Identifier/getCustomerData',
    type:'POST',
    data:send_data,
    datatype:'json',
}).done(function(rcv_data)
{
    console.log(rcv_data);
    reserve_data = rcv_data;

})

let chooceFlag = false;

function showVehicle(rcv_data)
{
    const container = document.querySelector('div.music-table');

    for(let i = 0; i < rcv_data.length; i++)
    {
        const div = document.createElement('div');
        div.className = 'row';    
        let type = (rcv_data[i].Vehicle_type == "Train") ? rcv_data[i].train_type : (rcv_data.Vehicle_type == "HSR") ? rcv_data[i].carriage_type : null;
        let vehicleType = (rcv_data[i].Vehicle_type == "Train") ? "火車" : (rcv_data[i].Vehicle_type == 'HSR') ? "高鐵" : "客運";

        for(let j = 0; j < 7;j++)
        {
            const node = document.createElement('div');
            let className,textContent;
            switch(j)
            {
                case 0:
                className = 'cell number';
                textContent = rcv_data[i].Vehicle_num;;
                break;

                case 1:
                className = 'cell title';
                textContent = '';
                break;

                case 2:
                className = 'cell beg';
                textContent = rcv_data[i].begin_station;
                break;

                case 3:
                className = 'cell des';
                textContent = rcv_data[i].end_station;
                break;

                case 4:
                className = 'cell genre';
                textContent = vehicleType
                break;

                case 5:
                className = 'cell type';
                textContent = type;
                break;

                case 6:
                className = 'cell link';
                textContent = '選擇此車';
                break;
            }
            node.className = className;
            node.innerHTML = textContent;

            if(j == 6)
            {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('click', function(event)
                {
                    if(!chooceFlag)
                    {
                        event.currentTarget.checked = true;
                        chooceFlag = true;
                    }
                    else
                    {
                        if(!event.currentTarget.checked)
                        {
                            chooceFlag = false
                        }
                        event.currentTarget.checked = false;
                    }
                })
                node.appendChild(checkbox);
            }
            div.appendChild(node);
        }
        container.appendChild(div);
    }
}

document.querySelector('input.submit').addEventListener('click', function(event)
{   
    let flag = false;
    let allRow = document.querySelectorAll('.row');
    let vehicle_num;
    
    allRow.forEach(function(row, index)
    {
        if(row.querySelector('input').checked)
        {
            vehicle_num = row.querySelector('.number').textContent;
            let send_data = {vehicle_type: reserve_data.vehicle_type, ID: reserve_data.ID, start: reserve_data.start, destination: reserve_data.destination, type: reserve_data.type, region: reserve_data.region, date: reserve_data.date, price: reserve_data.price, vehicle_num:vehicle_num, time:reserve_data.time};
            flag = true;
            
            const inputMessage = document.querySelector('form');

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

        //     $.ajax(
        //         {
        //           url:'/main/Ticket',
        //           type:'POST',
        //           data:send_data,
        //           datatype:'json',  
        //         }).done(function(rcv_data)
        //         {
                    
        //         })
        }
    })
    
    if(!flag)
    {
        alert('請選擇一個搭乘車次！');
        event.preventDefault();
    }
})
