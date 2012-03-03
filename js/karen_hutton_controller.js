KarenHuttonController = function() {
  var version = new VersionManager(this);
  version.init();
  
  this.audioManager = new AudioManager();
};

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
    this.audioManager.play(request.state ? 'minus' : 'plus');
  }
  sendResponse({});
};