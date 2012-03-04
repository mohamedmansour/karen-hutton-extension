/**
 * Sound manager uses HTML5 Web Audio.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 * @constructor
 */
AudioManager = function() {
  this.context = new webkitAudioContext();
  this.gainMode = this.context.createGainNode();
  this.plusAudio = [];
  this.plusAudioAlreadyPlayed = [];
  this.minusAudio = [];
  this.minusAudioAlreadyPlayed = [];
  this.testAudio = [];
  this.testAudioAlreadyPlayed = [];
  this.loaded = false;
};

/**
 * Initializes by preloading all audio tracks into buffer images.
 */
AudioManager.prototype.init = function() {
  var audioLoader = new AudioBufferLoader(
      this.context,
      AudioTracks.PLUS.concat(AudioTracks.MINUS.concat(AudioTracks.TEST)),
      this.finishedLoading.bind(this));
  audioLoader.load();
};

/**
 * Finished loading all sounds from the audio tracks defined.
 */
AudioManager.prototype.finishedLoading = function(bufferList) {
  this.plusAudio = bufferList.slice(0, AudioTracks.PLUS.length);
  this.minusAudio = bufferList.slice(AudioTracks.PLUS.length, AudioTracks.PLUS.length + AudioTracks.MINUS.length);
  this.testAudio = bufferList.slice(AudioTracks.PLUS.length + AudioTracks.MINUS.length, bufferList.length);
  this.loaded = true;
};

/**
 * Sets the buffer to the specific audio stream. If a buffer source already is playing, it will stop it.
 *
 * @param {string} state Either plus or minus.
 */
AudioManager.prototype.play = function(state) {
  var type = state || 'plus';
  var buffer = this.getNextAudioBuffer(this[type + 'Audio'], this[type + 'AudioAlreadyPlayed']);
  this.stop();
  this.gainMode.connect(this.context.destination);
  this.source = this.context.createBufferSource();
  this.source.buffer = buffer;
  this.source.connect(this.gainMode);
  this.source.noteOn(0);
};

/**
 * Randomly seek to the next audio buffer by maintaining two audio containers. Once we played
 * a specific audio, it will rotate out of the queue until everything is already played. This
 * is to ensure some uniqueness of tracks, so we listen to them all.
 *
 * @param {Array<AudioBuffer>} allowedToPlayArray Array that contains the available audio list.
 * @param {Array<AudioBuffer>} alreadyPlayedArray Array that contains the audio already played.
 */
AudioManager.prototype.getNextAudioBuffer = function(allowedToPlayArray, alreadyPlayedArray) {
  if (allowedToPlayArray.length == 0) {
    allowedToPlayArray.push.apply(allowedToPlayArray, alreadyPlayedArray);
    alreadyPlayedArray.length = 0;
  }
  var indexToPlay = Math.floor(Math.random() * allowedToPlayArray.length);
  var bufferArray = allowedToPlayArray.splice(indexToPlay, 1);
  alreadyPlayedArray.push.apply(alreadyPlayedArray, bufferArray);
  return bufferArray[0];
};

/**
 * Stops audio currently in the track.
 */
AudioManager.prototype.stop = function() {
  if (this.source) {
    this.source.noteOff(0);
  }
};

/**
 * Sets the volume for the source.
 */
AudioManager.prototype.setVolume = function(fraction) {
  this.gainMode.gain.value = fraction * fraction;
};
