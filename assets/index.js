function qs(i){
  return document.querySelector(i);
}

var url = 'index.json';

function fetchPackageData() {
  $.getJSON(url, renderIndex);
}

function renderIndex(data) {
    data.forEach(function(obj){
        var data = {
            packages: obj[Object.keys(obj)[0]],
            title: Object.keys(obj)[0]
        }
        var template = Handlebars.compile($("#hlb-packages").text());
        var html = template(data);
        $("#content").append(html);
    });

    $( "[data-package-path] td" ).on( "click", function () {
        var path = $(this).closest('tr').data("package-path")
        window.location.href = path;
    });

}

fetchPackageData();
