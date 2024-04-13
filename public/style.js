//toggle settings button
$(document).ready(function(){
    $('#gears-btn').on('click', function(){
        $('.gear-menu').animate({
            width: 'toggle'
        }, 500)
    })
})

    //toggle description
    $(document).ready(function(){
        $('#dot').on('click', function(){
        $('.description').animate({
         show: 'toggle'
          })
          })
          })