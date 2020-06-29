$.ajax({
    url: '/', 
    type: 'POST',
    data: "",
    datatype: 'json',
  }).done(function(rcvMessage){
    console.log(rcvMessage)
  })