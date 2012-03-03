var PLUS_ADD_POST_NAME = 'Click to +1 this post';
var PLUS_REMOVE_POST_NAME = 'Click to remove your +1 from this post';
var PLUS_ADD_BUTTON_SELECTOR = 'button[title="' + PLUS_ADD_POST_NAME + '"]';
var PLUS_REMOVE_BUTTON_SELECTOR = 'button[title="' + PLUS_REMOVE_POST_NAME + '"]';

var plusClicked = function(e) {
  var isPlussed = e.target.title == PLUS_ADD_POST_NAME;
  chrome.extension.sendRequest({method: 'PlaySound', state: isPlussed});
};

$(document).on('click', PLUS_ADD_BUTTON_SELECTOR, plusClicked);
$(document).on('click', PLUS_REMOVE_BUTTON_SELECTOR, plusClicked);