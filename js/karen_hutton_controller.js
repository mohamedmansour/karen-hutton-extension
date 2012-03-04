/**
 * Karen Hutton Entry Point!
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 * @constructor
 */
KarenHuttonController = function() {
  var version = new VersionManager(this);
  version.init();

  this.audioManager = new AudioManager();

  this.shouldPlayPosts = settings.play_posts;
  this.shouldPlayComments = settings.play_comments;
};

/**
 * Initializes the extension by listening for content changes and loads the audio.
 */
KarenHuttonController.prototype.init = function() {
  chrome.extension.onRequest.addListener(this.onExternalRequest.bind(this));
  this.audioManager.init();
};

/**
 * Listen on requests coming from content scripts.
 *
 * @param {object} request The request object to match data.
 * @param {object} sender The sender object to know what the source it.
 * @param {Function} sendResponse The response callback.
 */
KarenHuttonController.prototype.onExternalRequest = function(request, sender, sendResponse) {
  if (request.method == 'PlaySound') {
    // state = true if currently plus otherwise minus.
    // type = true if currently post otherwise comment.
    // We need to flip them here since we are placing that effect.
    console.log(request.type);
    if ((request.type && this.shouldPlayPosts) || (!request.type && this.shouldPlayComments)) {
      this.audioManager.play(request.state ? 'minus' : 'plus');
    }
  }
  sendResponse({});
};

/**
 * Reload the settings to take it into effect.
 */
KarenHuttonController.prototype.reloadSettings = function() {
  this.shouldPlayPosts = settings.play_posts;
  this.shouldPlayComments = settings.play_comments;
};