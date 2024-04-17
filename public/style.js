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





     
   
