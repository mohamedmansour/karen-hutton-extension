/**
 * Options controller.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
// Extensions pages can all have access to the bacground page.
var bkg = chrome.extension.getBackgroundPage();

// When the DOM is loaded, make sure all the saved info is restored.
window.addEventListener('DOMContentLoaded', onLoad, false);

function $(id) {
  return document.getElementById(id);
}

/**
 * When the options window has been loaded.
 */
function onLoad() {
  onRestore();
  $('button-close').addEventListener('click', onClose, false);
}

function renderGooglePlusAPI() {
  var script = document.createElement('script');
  script.innerHTML = 'window.___gcfg = {lang: "en"};' +
      '(function() {var po = document.createElement("script");' +
      'po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";' +
      'var s = document.getElementsByTagName("script")[0];' +
      's.parentNode.insertBefore(po, s);})();';
  document.body.appendChild(script);
}

/**
 *  When the options window is closed;
 */
function onClose() {
  window.close();
}

/**
* Restore all options.
*/
function onRestore() {
  // Restore settings.
  $('version').innerHTML = ' Version ' + bkg.settings.version;

  var volumeElement = $('volume');
  volumeElement.addEventListener('change', function(e) {
    bkg.settings.volume = volumeElement.value;
    bkg.controller.audioManager.setVolume(bkg.settings.volume);
  });
  volumeElement.value = bkg.settings.volume;

  var playPostsElement = $('play-posts');
  playPostsElement.addEventListener('click', function(e) {
    bkg.settings.play_posts = playPostsElement.checked;
    bkg.controller.shouldPlayPosts = bkg.settings.play_posts;
  });
  playPostsElement.checked = bkg.settings.play_posts;

  var playCommentsElement = $('play-comments');
  playCommentsElement.addEventListener('click', function(e) {
    bkg.settings.play_comments = playCommentsElement.checked;
    bkg.controller.shouldPlayComments = bkg.settings.play_comments;
  });
  playCommentsElement.checked = bkg.settings.play_comments;
}