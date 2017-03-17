function qs(i){
  return document.querySelector(i);
}

var url = 'index.json';

function fetchPackageData() {
  $.getJSON(url, renderIndex);
}

function renderIndex(data) {
    var template = Handlebars.compile($("#hlb-packages").text());
    var html = template(data);
    $("#content").append(html);

    $( "[data-package-path] td" ).on( "click", function () {
        var path = $(this).closest('tr').data("package-path")
        window.location.href = path;
    });
}

Handlebars.registerHelper('cleanName', function(text) {
  var newName = text.replace('@thumbtack/', '');
  return newName;
});

fetchPackageData();
