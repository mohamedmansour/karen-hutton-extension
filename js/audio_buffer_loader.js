/**
 * Audio buffer loader from HTML5Rocks.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
AudioBufferLoader = function(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
};

/**
 * Loads the audio url into the total buffer.
 */
AudioBufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var loader = this;
  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length) {
          loader.onload(loader.bufferList);
        }
      },
      function() {
          console.error('Error Decoding: ', index, url, arguments);
      }
    );
  };

  request.onerror = function() {
    console.error('BufferLoader: XHR error', index, url, arguments);
  };

  request.send();
};

/**
 * Start loading the existing URLs into the buffer.
 */
AudioBufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i);
  }
};