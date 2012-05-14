/**
 * Injection script for plus content on all webpages.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
var PLUS_BUTTON_SELECTOR = '#button';

var plusClicked = function(e) {
  var realNode = $(e.target);
  if (!realNode.attr('aria-pressed')) {
    realNode = realNode.parent();
  }
  var isPlus = realNode.attr('aria-pressed') === 'false';
  chrome.extension.sendRequest({
    method: 'PlaySound',
    state: isPlus,
    type: true
  });
};

$(document).on('click', PLUS_BUTTON_SELECTOR, plusClicked);
