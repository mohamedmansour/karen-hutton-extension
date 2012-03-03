/**
 * Sound manager uses HTML5 Audio.
 * @constructor
 */
SoundManager = function() {
  this.audio = new Audio();
};

/**
 * List of available audio tracks that the user can choose from.
 */
SoundManager.AUDIO_TRACKS = {
 'Mode1': [
    ['Temp', 'http://praytimes.org/audio/adhan/Shia/Aghati.mp3']
  ]
};

/**
 * Set the Athan to a specific track for the audio stream.
 */
SoundManager.prototype.play = function(type, name) {
  var tracks = SoundManager.AUDIO_TRACKS[type];
  this.audio.src = tracks[0][1];
  this.audio.play();
};


/**
 * Stops  the athan which is currently in the track.
 */
SoundManager.prototype.stop = function() {
  this.audio.pause();
};
