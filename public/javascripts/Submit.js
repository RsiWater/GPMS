
let submitButton = document.querySelector('#submitButton');

submitButton.addEventListener('click',function()
{
    console.log(testRow)
    document.querySelectorAll('.stored').forEach(Element =>
    {
        switch(Element.name)
        {
            case 'name':
                name = Element.value;
                break;
            case 'essn':
                ssn = Element.value;
                break;
            case 'phone':
                phoneNumber = Element.value;
                break;
            default:
                break;

        }
    })
})


