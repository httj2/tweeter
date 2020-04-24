$(document).ready(function() {

  $('textarea#tweet-text').on('input', function(){
    maxLength = 140;
    currentLength = this.value.length
    if (currentLength > maxLength) {
      $('output', $(this).parent()).addClass('invalid')
    } else {
      $('output', $(this).parent()).removeClass('invalid')
    }

    $('output', $(this).parent()).val(maxLength - currentLength);

  });

});



