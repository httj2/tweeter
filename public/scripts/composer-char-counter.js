$(document).ready(function() {



  $('textarea#tweet-text').keyup(function(){
    maxLength = 140;
    currentLength = this.value.length
    if (currentLength > maxLength) {
      $('output.counter').addClass('red')
    } else {
      $('output.counter').removeClass('red')
    }

    $('output.counter').val(maxLength - currentLength);

  });

});



