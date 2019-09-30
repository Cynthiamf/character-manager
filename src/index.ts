const axios = require("axios");

// Make a request for a user with a given ID
axios
  .get("https://character-database.becode.xyz/characters/")
  .then(function(response) {
    const array = response.data;
    var div = "<div>";

    array.forEach(function(element) {
      div += "<div class='character'>";
      div += '<img src="data:image/jpeg;base64,' + element.image + '"/>';
      div += "<ul>";
      div += "<li class='name'>" + element.name + "</li>";
      div += "<li class='desc'>" + element.shortDescription + "</li>";
      div += "</ul>";
      div += "<button>View</button>";
      div += "<button>Edit</button>";
      div += "<button>Delete</button>";
      div += "</div>";
    });
    div += "</div>";
    document.getElementById("root").innerHTML = div;
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });
