/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetObject = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
 
  



const createTweetElement = function(tweetObject) {
  let $tweet = $('<article>').addClass('tweet');
  // $('#tweets-container').append($tweet)
    const $header = $(`<header>`); 
    // --------Header Elements-----------//
    const $img = $('<img>').addClass('avatar');
    $img.attr('src', tweetObject.user.avatars);
    const $name = $(`<p>`).addClass('name');
    $name.text(tweetObject.user.name).appendTo($header);
    const $username = $(`<p>`).addClass(`username`);
    $username.text(tweetObject.user.handle).appendTo($header);
   /** add header to article */
    $tweet.append($header);
   // ---- Body of tweet ---//
    const $userTweetDiv = $('<div>')
    const $tweetContext = $('<p>').addClass('tweetContext')
    $tweetContext.text(tweetObject.content.text).appendTo($userTweetDiv);
    $tweet.append($userTweetDiv);
    // ---- footer Elements ---- //
    const $footer = $('<footer>');
    const $dateP = $('<p>');
    $dateP.text(tweetObject.created_at).appendTo($footer);
    const $iconsDiv = $('<div>').addClass('icons');
    $iconsDiv.appendTo($footer)
    const $flagIcon = $('<i>').addClass('fas fa-flag');
    $flagIcon.appendTo($iconsDiv)
    const $retweetIcon = $('<i>').addClass('fas fa-retweet');
    $retweetIcon.appendTo($iconsDiv)
    const $heartIcon = $('<i>').addClass('fas fa-retweet');
    $heartIcon.appendTo($iconsDiv)
    $tweet.append($footer)
  return $tweet;
};

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  $.each(tweets, (tweetObject) => {
    $('#tweets-container').append(createTweetElement(tweetObject));
  });
}
// const $tweet = createTweetElement(tweetData);

renderTweets(tweetObject)