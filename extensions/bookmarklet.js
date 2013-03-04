var s = document.createElement('script');
s.src = '{{SCRIPT_URL}}';
s.onload = function() {
  tpp.trigger();
};
document.head.appendChild(s);