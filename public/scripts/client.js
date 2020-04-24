const createTweetElement = function(tweetObject) {
  let $tweet = $('<article>').addClass('tweet');
  // --------Header Elements-----------//
  const $header = $(`<header>`); 
  $header.append($(`<img src = ${tweetObject.user.avatars}>`).addClass('avatar'));
  $header.append($(`<p>`).addClass('name').text(tweetObject.user.name));
  $header.append($(`<p>`).addClass(`username`).text(tweetObject.user.handle));
  // ---- Body of tweet ---//
  const $userTweetDiv = $('<div>')
  $userTweetDiv.append($('<p>').addClass('tweetContext').text(tweetObject.content.text));
    
  // ---- Footer Elements ---- //
  const $footer = $('<footer>');
  // converting the created_at (assuming its in ms) to a day
  const dateDays = Math.floor( (tweetObject.created_at) / (60*60*60*24*1000));
  $footer.append($('<p>').addClass('date').text(`${dateDays} days ago`));
  const $iconsDiv = $('<div>').addClass('icons');
  $iconsDiv.append($('<i>').addClass('fas fa-flag'));
  $iconsDiv.append($('<i>').addClass('fas fa-retweet'));
  $iconsDiv.append($('<i>').addClass('fas fa-heart'));
  $footer.append($iconsDiv);
  // appending header, body and footer to the article
  $tweet.append($header); //header
  $tweet.append($userTweetDiv); //body
  $tweet.append($footer); //footer
  
  return $tweet;
};

// Takes in array of objects and Renders to the DOM
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  tweets.forEach((tweetObject) => {
    $('#tweets-container').prepend(createTweetElement(tweetObject));
  });
};

//function will use jQuery to make a request and receive the array of tweets as JSON. Sucess will call up the renderTweets.
const loadTweets = function () {
  $.ajax( {
      url: '/tweets',
      type: 'GET',
      success: response => renderTweets(response)
  })
};

// Validating a new tweet, will return an error if invalid. 
const formValidation = function () {
  let text = $('#tweet-text');
  if (text.val().length > 140) {
    $('div.error').slideDown("fast", function(){
      $( this ).html('<i class="fas fa-exclamation-triangle"></i><span class="errorMsg">Too many characters, please revise!</span><i class="fas fa-exclamation-triangle"></i>');
    });
      text.focus();
      return false;
  } else if (!text.val()) {
      $('div.error').slideDown("fast", function(){
        $( this ).html('<i class="fas fa-exclamation-triangle"></i><span class="errorMsg">Please enter something!!</span><i class="fas fa-exclamation-triangle"></i>')
    });
      text.focus();
      return false
  };
  $('div.error').slideUp(400);
  return true; 
}




$(document).ready(function() {
  loadTweets();

  // When clicked, will toggle compose new tweet container
  $('.composeTweet').click(function(event){
    $('.new-tweet').slideToggle("fast");
    $('#tweet-text').focus();
  });

  // Function will submit if form validation is true and sends a POST request.
  $('#tweetForm').submit(function (event) {
    event.preventDefault();
    //information from the server 
    let text = $('#tweet-text').val()
    if (formValidation() === true) {
      $.ajax( {
          url: `/tweets`,
          method: "POST",
          data: { text }
        })
      .then((tweet) => {createTweetElement(tweet).prependTo('#tweets-container')});
      $('#tweet-text').val('');  //resets tweetbox
      $('.counter').text('140'); //resets counter
      }
    }); 
});