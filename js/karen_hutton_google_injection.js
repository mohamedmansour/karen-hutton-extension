/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
var PLUS_BUTTON_SELECTOR = '[plus_plus="1"]';

var plusClicked = function(e) {
  var realNode = $(e.target);
  if (!realNode.attr('plus_plus')) {
    realNode = realNode.parent();
  }
  var isPlus = realNode.attr('aria-pressed') === 'false';
  var isPost = realNode.tagName === 'DIV';
  chrome.extension.sendRequest({
    method: 'PlaySound',
    state: isPlus,
    type: isPost
  });
};

$(document).on('click', PLUS_BUTTON_SELECTOR, plusClicked);
