// post load
(function(window, undefined) {
  // set src attribute to gravatar url. blacksmith(plates) doesn't supports
  // customizing partials with src attribute of img yet.
  var elems = document.getElementsByClassName('gravatar');
  for (var i = 0; i < elems.length; ++i) {
    elems[i].setAttribute('src', elems[i].getAttribute('href'));
  }
})(window);
