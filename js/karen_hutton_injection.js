var PLUS_ADD_POST_NAME = 'Click to +1 this ';
var PLUS_REMOVE_POST_NAME = 'Click to remove your +1 from this ';
var PLUS_ADD_BUTTON_SELECTOR = 'button[title^="' + PLUS_ADD_POST_NAME + '"]';
var PLUS_REMOVE_BUTTON_SELECTOR = 'button[title^="' + PLUS_REMOVE_POST_NAME + '"]';

var plusClicked = function(e) {
  var isPlus = e.target.title.indexOf(PLUS_ADD_POST_NAME) === 0;
  var isPost = e.target.title.substr(-4) === 'post';
  chrome.extension.sendRequest({
    method: 'PlaySound',
    state: isPlus,
    type: isPost
  });
};

$(document).on('click', PLUS_ADD_BUTTON_SELECTOR, plusClicked);
$(document).on('click', PLUS_REMOVE_BUTTON_SELECTOR, plusClicked);