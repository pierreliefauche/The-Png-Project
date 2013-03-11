if (window.location.host === 'thenounproject.com' ) {

  var s = document.createElement('script');
  s.src = '{{SCRIPT_URL}}';
  document.head.appendChild(s);

  $(document).ready(function(){

    var $button = $('#noun-detail #icon header .button.download');
    if ($button && $button.length === 1) {
      var button = $button[0];
      button.innerHTML = button.innerHTML.replace(/<\/span>.*$/, '</span>SVG&nbsp;&nbsp;');
      var $tpp = $('<span id="tpp-button" onclick="javascript:window.tpp.trigger();">|&nbsp;&nbsp;PNG</span>');
      $button.append($tpp);
    }

  });
}
