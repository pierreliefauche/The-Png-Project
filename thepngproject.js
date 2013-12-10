window.tpp = {};

(function(tpp) {

  tpp.trigger = function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!canvg) {
      alert('The PNG Project says “Where the hell is canvg?!”');
      return false;
    }

    var $svgImg = $('figure img.icon');
    if ($svgImg.length !== 1) {
      alert('The PNG Project says “I can’t find the icon here. Did they change the website? AGAIN?!”');
      return false;
    }

    var svgUrl = $svgImg.attr('src');
    if (!svgUrl) {
      alert('The PNG Project says “An image without an url, how strange…”');
      return false;
    }

    $.get('{{HOST}}/proxy/' + encodeURIComponent(svgUrl))
      .done(function(doc, status, xhr) {
        if (status === 'success') {
          var svg = xhr.responseText;
          svg = svg.replace(/^[\s\S]*<svg/, '<svg');

          // Size

          var size = parseInt(prompt("What size?","1024"));
          if (!size || isNaN(size)) size = 1024;

          svg = svg.replace(/(width|height)="\d+px"/g, '$1="'+size+'px"');

          // Color

          var color = prompt("What color? (CSS hexa plz)", "000");
          if (!color || !color.length) color = '#000';
          if (color[0] !== '#') color = '#' + color;
          if (!/#([0-9a-f]{3}){1,2}/i.test(color)) color = '#000';

          // Stroke color if any
          svg = svg.replace(/stroke="[^"]+"/g, 'stroke="'+color+'"');
          // Fill color
          svg = svg.replace(/fill="[^"]+"/g, '');
          svg = svg.replace('<svg', '<svg fill="'+color+'" ');

          // Canvas

          var canvas = document.createElement('canvas');
          canvas.width = canvas.height = size+'px';

          var context = canvas.getContext('2d');
          context.fillStyle = 'red';
          context.strokeStyle = 'blue';

          canvg(canvas, svg);

          var png = canvas.toDataURL();
          window.location = png;
        } else {
          alert('The PNG Project says “I wanted to get the svg, but I got responded this: '+status+'. Sad, I know.”');
          return false;
        }
      });
  };

  tpp.hijackRegularDownload = function() {
    var $button = $('#hero-header #download.download');
    if ($button && $button.length === 1) {
      var button = $button[0];
      button.innerHTML = '&nbsp;&nbsp;SVG&nbsp;&nbsp;';
      var $tpp = $('<span id="tpp-button">|&nbsp;&nbsp;PNG</span>');
      $tpp.click(window.tpp.trigger);
      $button.append($tpp);
    } else {
      console.log('The PNG Project script says “I didn’t find any regular DL button to hijack.”');
    }
  };

  tpp.hijackPremiumDownload = function() {
    var $button = $('#hero-header #premium-download.download');
    if ($button && $button.length === 1) {
      var button = $button[0];
      var $tpp = $('<span id="tpp-button">PNG&nbsp;&nbsp;|&nbsp;&nbsp;</span>');
      $tpp.click(window.tpp.trigger);
      $button.prepend($tpp);
    } else {
      console.log('The PNG Project script says “I didn’t find any premium DL button to hijack.”');
    }
  };

  tpp.hijack = function() {
    tpp.hijackRegularDownload();
    tpp.hijackPremiumDownload();
  };

})(window.tpp);

window.tpp.hijack();
