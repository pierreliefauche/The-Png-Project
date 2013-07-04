window.tpp = {};

(function(tpp) {

  tpp.trigger = function() {
    if (!canvg) {
      return alert('The PNG Project didn’t load properly. Sorry for that…');
    }

    var $svg = $('#icon-container .current svg');
    if (!$svg.length) {
      return alert('Ouch, problem...');
    }

    var svg = $svg.parent().html();
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
  };

})(window.tpp);

// $(document).on("click", "#tpp-button", function(e){
//   e.preventDefault();
//   e.stopPropagation();
//   window.tpp.trigger();
//   return false;
// });
