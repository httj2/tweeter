$(document).ready(function() {


// Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.

// const textArea = document.getElementsById('tweet-text');
// $("#btn").click(function() {
//   var text = $('#tweet-text').val();
//   console.log(text)
//   })


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



