var url = 'index.json';

function fetchPackageData() {
  $.getJSON(url, buildJSON);
}

function getCategories(data) {
    var categories = [];
    data.forEach(function(item){
        var category = item.thumbprint.category;
        categories.push(category);
    });

    categories = categories.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    });

    return categories;
}

function buildJSON(data) {
    var newData = [];
    var categories = getCategories(data);

    categories.forEach(function(parentCategory,i){
        newData[i] = new Object();
        newData[i][parentCategory] = [];
        var counter = 0;

        data.forEach(function(item){
            var category = item.thumbprint.category;
            if (parentCategory == category) {
                newData[i][parentCategory][counter] = item;
                counter++;
            }
        })
    });

    renderIndex(newData)
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

Handlebars.registerHelper('cleanName', function(text) {
  var newName = text.replace('@thumbtack/', '');
  return newName;
});

fetchPackageData();
