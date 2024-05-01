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

let chatzone = document.querySelector('.chatzone');
chatzone.scrollTop = chatzone.scrollHeight;
    
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
       }
    });
   $('#mess').val('');
 });

}

 //auto-refresh swiper's div

    $(document).ready(function(){ 
        setInterval(() => {   
           $.ajax({
               url : '/fetch-mesg',
               type: 'GET',
               data: {
                   userid: $('#userid').val(),
                   chat: $('#chatuserid').val()
               },
               success:function(data){
                $('.chatzone').html(data); 
               }
           })
        }, 100); 
        }) 
 
   

//auto-refresh chat user's in messages div
$(document).ready(function(){
    setInterval(() => {
       $.ajax({
           url : '/fetch-mesguser',
           type: 'GET',
           data: {
               chats:$('#chat2').val(),
               userids:$('#userid2').val(),
           },
           success:function(data){
            $('.mess-users').html(data)
           }
       })
       }, 4000);
})

//upload images
$(document).ready(function(){
    $('#gallery-upload').on('click',function(){
        $('#galery').trigger('click');
        return false;
     })
     $('#icn').on('click', () => {
        $('.image-opt').fadeOut();
        $('.gallery').empty();
     })
})

$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#galery').on('change', function() {
        imagesPreview(this, 'div.gallery');
        $('.image-opt').fadeIn();
        $('.options').fadeOut();
    });
    });

    function sendGallery(){
        $(document).ready(function(){
           $('#icn').trigger('click');
         });
    };

//record calls
    $(document).ready(function(){
        $('#telephone').on('click', function(){
            $('.call-center').fadeIn();
        })
    })

$(document).ready(function(){
    $('#icns').on('click', function(){
        $('.call-center').fadeOut();
    })
})

function sendAudios(){

    $(document).ready(function(){

        $.ajax({
            url: '/upload-audio',
            type: 'post',
            data: {
                usid: $('#usid').val(),
                chid: $('#chid').val(),
                playback: $('#playbacse').val(),
            },
            dataType: 'text',
            success:function(data){
                console.log(data);
            }
        });

        $('#icns').trigger('click');
 
    }); 
}


 
     