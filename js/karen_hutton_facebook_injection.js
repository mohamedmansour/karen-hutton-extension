/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
var PLUS_ADD_POST_NAME = 'Like this item';
var PLUS_REMOVE_POST_NAME = 'Stop liking this item';
var PLUS_ADD_BUTTON_SELECTOR = 'button[title="' + PLUS_ADD_POST_NAME + '"]';
var PLUS_REMOVE_BUTTON_SELECTOR = 'button[title="' + PLUS_REMOVE_POST_NAME + '"]';

var likeClicked = function(e) {
  var isLiked = e.target.innerText === 'Unlike';
  chrome.extension.sendRequest({
    method: 'PlaySound',
    state: isLiked,
    type: true
  });
};

$(document).on('click', PLUS_ADD_BUTTON_SELECTOR, likeClicked);
$(document).on('click', PLUS_REMOVE_BUTTON_SELECTOR, likeClicked);