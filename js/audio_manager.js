/**
 * Sound manager uses HTML5 Web Audio.
 *
 * @constructor
 */
AudioManager = function() {
  this.context = new webkitAudioContext();
  this.plusAudio = [];
  this.plusAudioAlreadyPlayed = [];
  this.minusAudio = [];
  this.minusAudioAlreadyPlayed = [];
  this.loaded = false;
};

/**
 * Initializes by preloading all audio tracks into buffer images.
 */
AudioManager.prototype.init = function() {
  var audioLoader = new AudioBufferLoader(
      this.context,
      AudioManager.AUDIO_TRACKS.plus.concat(AudioManager.AUDIO_TRACKS.minus),
      this.finishedLoading.bind(this));
  audioLoader.load();
};

/**
 * Finished loading all sounds from the audio tracks defined.
 */
AudioManager.prototype.finishedLoading = function(bufferList) {
  this.plusAudio = bufferList.slice(0, AudioManager.AUDIO_TRACKS.plus.length);
  this.minusAudio = bufferList.slice(AudioManager.AUDIO_TRACKS.plus.length, bufferList.length);
  this.loaded = true;
};

/**
 * List of available audio tracks that the user can choose from.
 */
AudioManager.AUDIO_TRACKS = {
  plus: [
    '/audio/+1-Aahhh.ogg',
    '/audio/+1-AhThankYou.ogg',
    '/audio/+1-Awesome.ogg',
    '/audio/+1-Cool.ogg',
    '/audio/+1-Excellent.ogg',
    '/audio/+1-HeyThanks.ogg',
    '/audio/+1-LetsDoIt.ogg',
    '/audio/+1-LetsGo.ogg',
    '/audio/+1-MarvelousDarling.ogg',
    '/audio/+1-Nice.ogg',
    '/audio/+1-OhGoodChoice.ogg',
    '/audio/+1-OhRightOn.ogg',
    '/audio/+1-OhThankYouForYourVote.ogg',
    '/audio/+1-Oooo.ogg',
    '/audio/+1-Oooo_Low.ogg',
    '/audio/+1-ThankYou.ogg',
    '/audio/+1-ThankYou_2.ogg',
    '/audio/+1-Thanks.ogg',
    '/audio/+1-WooHoo.ogg',
    '/audio/+1-Yay.ogg',
    '/audio/+1-YourVoteIsNoted.ogg'
  ],
  minus: [
    '/audio/-1-Aww_DownEnding.ogg',
    '/audio/-1-Awww.ogg',
    '/audio/-1-BetterLuckNextTime.ogg',
    '/audio/-1-BuhBye.ogg',
    '/audio/-1-Bye.ogg',
    '/audio/-1-Farewell.ogg',
    '/audio/-1-IllMissYou.ogg',
    '/audio/-1-MmmBuhBye.ogg',
    '/audio/-1-Mmmm.ogg',
    '/audio/-1-Mwah.ogg',
    '/audio/-1-Noooo.ogg',
    '/audio/-1-Ohhh.ogg',
    '/audio/-1-Oooh.ogg',
    '/audio/-1-Sigh.ogg',
    '/audio/-1-Sigh_Low.ogg',
    '/audio/-1-SoSorry.ogg',
    '/audio/-1-TaTa.ogg',
    '/audio/-1-TooBad.ogg',
    '/audio/-1-Whine.ogg'
  ]
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
  this.source = this.context.createBufferSource();
  this.source.buffer = buffer;
  this.source.connect(this.context.destination);
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
