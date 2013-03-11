window.tpp = {};

(function(tpp) {

  tpp.trigger = function() {
    if (!canvg) {
      return alert('The PNG Project didn’t load properly. Sorry for that…');
    }

    var $svg = $('#icon-container .current svg');
    if ($svg.length == 0) {
      return alert('Ouch, problem...')
    }
    
    var svg = $svg.parent().html();
    svg = svg.replace(/^[\s\S]*<svg/, '<svg');
    
    var size = parseInt(prompt("What size?","1024"));
    if (!size || size == NaN) size = 1024;
    
    svg = svg.replace(/(width|height)="\d+px"/g, '$1="'+size+'px"');
    
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = size+'px';
    
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
