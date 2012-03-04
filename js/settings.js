/**
 * Global Settings.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
settings = {
  get version() {
    return localStorage['version'];
  },
  set version(val) {
    settings.notify('version', val);
    localStorage['version'] = val;
  },
  get opt_out() {
    var key = localStorage['opt_out'];
    return (typeof key == 'undefined') ? false : key === 'true';
  },
  set opt_out(val) {
    settings.notify('opt_out', val);
    localStorage['opt_out'] = val;
  },
  get volume() {
    var key = localStorage['volume'];
    return (typeof key == 'undefined') ? 0.8 : parseFloat(key);
  },
  set volume(val) {
    settings.notify('volume', val);
    localStorage['volume'] = val;
  },
  get play_posts() {
    var key = localStorage['play-posts'];
    return (typeof key == 'undefined') ? true : key === 'true';
  },
  set play_posts(val) {
    settings.notify('play-posts', val);
    localStorage['play-posts'] = val;
  },
  get play_comments() {
    var key = localStorage['play-comments'];
    return (typeof key == 'undefined') ? true : key === 'true';
  },
  set play_comments(val) {
    settings.notify('play-comments', val);
    localStorage['play-comments'] = val;
  }
};

// Settings event listeners.
settings.listeners = {};
settings.notify = function(key, val) {
  var listeners = settings.listeners[key]
  if (listeners) {
    listeners.forEach(function(callback, index) {
      callback(key, val);
    });
  }
};
settings.addListener = function(key, callback) {
  if (!settings.listeners[key]) {
    settings.listeners[key] = [];
  }
  settings.listeners[key].push(callback);
};