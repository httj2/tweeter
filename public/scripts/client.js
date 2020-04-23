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

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
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
  // console.log(text);
  if (text.val().length > 140) {
      alert('Too many characters');
      text.focus()
      return false;
  } else if (!text.val()) {
      alert('Please write something before submitting')
      text.focus();
      return false;
  }
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
        .then((tweet) => {createTweetElement(tweet).prependTo('#tweets-container')})
    }   
  });

});