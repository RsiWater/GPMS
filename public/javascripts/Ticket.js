const TR_Container = document.querySelectorAll('.theatreTR label');
const HSR_Container = document.querySelectorAll('.theatreHS label');
const BUS_Container = document.querySelectorAll('.theatreBUS label');
const TR_Div = document.querySelector('div.theatreTR');
const HS_Div = document.querySelector('div.theatreHS');
const BUS_Div = document.querySelector('div.theatreBUS');

let clickFlag = false;
let seat_no;

const vehicle_type_text = document.querySelector('div.header').textContent;
if(vehicle_type_text.toLowerCase() == 'train')
{
    TR_Div.classList.remove('hidden');
    HS_Div.classList.add('hidden');
    BUS_Div.classList.add('hidden');
    for(let i = 0;i < TR_Container.length;i++)
    {
        TR_Container[i].addEventListener('click', function(event)
        {
            let checkBox = document.querySelector('#T'+event.currentTarget.textContent);
            if(!clickFlag)
            {
                checkBox.checked = false;
                seat_no = event.currentTarget.textContent;
                clickFlag = true;
                document.querySelector('.seatTR div.info__detail').textContent = seat_no;
                console.log('clicked');
            }
            else
            {
                if(checkBox.checked)
                {
                    clickFlag = false;
                    seat_no = null;
                }
                checkBox.checked = true;
                console.log('reject.');
            }
        })
    }
}
else if(vehicle_type_text.toLowerCase() == 'hsr')
{
    TR_Div.classList.add('hidden');
    HS_Div.classList.remove('hidden');
    BUS_Div.classList.add('hidden');
    for(let i = 0;i < HSR_Container.length;i++)
    {
        HSR_Container[i].addEventListener('click', function(event)
        {
            let checkBox = document.querySelector('#H'+event.currentTarget.textContent);
            if(!clickFlag)
            {
                checkBox.checked = false;
                seat_no = event.currentTarget.textContent;
                clickFlag = true;
                document.querySelector('.seatTR div.info__detail').textContent = seat_no;
                console.log('clicked');
            }
            else
            {
                if(checkBox.checked)
                {
                    clickFlag = false;
                    seat_no = null;
                }
                checkBox.checked = true;
                console.log('reject.');
            }
        })
    }
}
else
{
    TR_Div.classList.add('hidden');
    HS_Div.classList.add('hidden');
    BUS_Div.classList.remove('hidden');
    for(let i = 0;i < BUS_Container.length;i++)
    {
        BUS_Container[i].addEventListener('click', function(event)
        {
            let checkBox = document.querySelector('#B'+event.currentTarget.textContent);
            if(!clickFlag)
            {
                checkBox.checked = false;
                seat_no = event.currentTarget.textContent;
                clickFlag = true;
                document.querySelector('.seatTR div.info__detail').textContent = seat_no;
                console.log('clicked');
            }
            else
            {
                if(checkBox.checked)
                {
                    clickFlag = false;
                    seat_no = null;
                }
                checkBox.checked = true;
                console.log('reject.');
            }
        })
    }
}


document.querySelector('input.submit').addEventListener('click', function(event)
{
    let send_data = {seat_no: seat_no};

    document.querySelector('form');
    $.ajax({
        url:'/main/Ticket/submit',
        type:'POST',
        data:send_data,
        datatype:'json',
    }).done(function(rcv_data){

    })
})