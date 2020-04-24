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
        $footer.append($('<p>').addClass('date').text(tweetObject.created_at));
  const $iconsDiv = $('<div>').addClass('icons');
        $iconsDiv.append($('<i>').addClass('fas fa-flag'));
        $iconsDiv.append($('<i>').addClass('fas fa-retweet'));
        $iconsDiv.append($('<i>').addClass('fas fa-heart'));
  $footer.append($iconsDiv);
  
  $tweet.append($header); //header
  $tweet.append($userTweetDiv); //body
  $tweet.append($footer); //footer
  return $tweet;
};

// const formatTime = function (date) {
//   let createdTime = 
//   console.log(createdTime)
//   let timeInSeconds
// }


const renderTweets = function(tweets) {
  tweets.forEach((tweetObject) => {
    $('#tweets-container').append(createTweetElement(tweetObject));
  });
}
const loadTweets = function () {
  $.ajax( {
      url: '/tweets',
      type: 'GET',
      success: response => renderTweets(response)
  })
};

const formValidation = function () {
  let text = $('#tweet-text');
  if (text.val().length > 140) {
    $('div.error').slideDown("fast", function(){
      $( this ).html('<i class="fas fa-exclamation-triangle"></i><span class="errorMsg">Too many characters, please revise!</span><i class="fas fa-exclamation-triangle"></i>')
    });
    text.focus()
    return false;
  } else if (!text.val()) {
    $('div.error').slideDown("fast", function(){
      $( this )
      .html('<i class="fas fa-exclamation-triangle"></i><span class="errorMsg">Please enter something!!</span><i class="fas fa-exclamation-triangle"></i>')
    });
      text.focus();
      return false;
  } 
  $('div.error').slideUp(400);
  return true; 
}



$(document).ready(function() {
  loadTweets();
  
  $('#tweetForm').submit(function (event) {
    event.preventDefault();
    let text = $('#tweet-text').val()
    if (formValidation() === true) {
      $.ajax( {
          url: `/tweets`,
          method: "POST",
          data: { text }
        })
      .then((tweet) => {createTweetElement(tweet).prependTo('#tweets-container')});
     $('#tweet-text').val('');
     $('.counter').text('140')
    } 
  });
});