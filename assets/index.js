function qs(i){
  return document.querySelector(i);
}

var hdbPackages = qs('#hlb-packages');
var content     = qs('#content');
var url         = 'index.json';

function fetchPackageData() {
  $.getJSON(url, renderIndex);
}

function renderIndex(data) {
    var template = Handlebars.compile(hdbPackages.textContent);
    var html = template(data);
    content.innerHTML = html;
}

fetchPackageData();
