//toggle settings button
$(document).ready(function(){
    $('#gears-btn').on('click', function(){
        $('.gear-menu').animate({
            width: 'toggle'
        }, 500)
    })
})

$(document).ready(function(){
    $('#users-btn').on('click', function(){
        $('.users-menu').animate({
            width: 'toggle'
        }, 500)
    })
})

$(document).ready(function(){
    $('.attach').on('click', function(){
        $('.options').animate({
            width: 'toggle'
        }, 500)
    })
})

function sendMessage(){

const dater = new Date();
let m = dater.getMonth() + 1;
let d = dater.getDate();
let y = dater.getFullYear();

let min = dater.getMinutes();
let h = dater.getHours();
let s = dater.getSeconds();

const tarehe = d + '/' + m + '/' + y ; 
const timer = h + ':' + min + ':' + s; 

$(document).ready(function(){
    var frmid= $('#frmid').val();
    var tid = $('#tid').val();
    var mesgs = $('#mess').val();

    console.log(frmid, tid, mesgs);

 
   $.ajax({
       url : '/message',
       type: 'POST',
       data: {
           toid: $('#tid').val(),
           fromid: $('#frmid').val(),
           mess: $('#mess').val(),
           dater: tarehe,
           timer: timer,
       },
       dataType: 'text',
       success:function(data){
           $('#mess').val('');
           console.log('sent message' + data);
       }
   });
 
   $('#mess').val('');

 });

}

 //auto-refresh swiper's div
 $(document).ready(function(){
 setInterval(() => {
   
    console.log('reloaded');
    }, 4000);
 })



     
   
