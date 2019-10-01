const axios = require("axios");

// Make a request for a user with a given ID

function showDesc(el) {
  el.parentNode.querySelector(".desc").style.display = "block";
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("view")) {
    showDesc(e.target);
  }
});

document.addEventListener("click", async function (e) {
  const id = +input.value; // parseInt(input.value, 10)

  if (e.target && e.target.classList.contains("delete")) {
    console.log("test");

    try {
      const response = await axios.get(`https://character-database.becode.xyz/characters/${id}`, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
      });
      const deletedHero = await response;

      console.log(deletedHero)
    } catch (err) {
      console.error(`Unknown hero with id: ${id}`);
    }
  }
});


function add() {
  let ajout = document.createElement("button");
  ajout.className = "ajout";
  var newContent = document.createTextNode("Add Character");
  ajout.appendChild(newContent);
  var currentDiv = document.getElementById("root");
  document.body.insertBefore(ajout, currentDiv);
}

function showAdd(el) {
  el.parentNode.querySelector("#myModal").style.display = "block";
}

document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("ajout")) {
    showAdd(e.target);
  }
});




function update() { }

axios
  .get("https://character-database.becode.xyz/characters/")
  .then(async function (response) {
    const array = await response.data;

    console.log(array);
    var div = "<div>";
    add();
    //let contentDesc = document.getElementsByClassName("desc");

    array.forEach(function (element) {
      div += "<div class='character'>";
      div += '<img src="data:image/jpeg;base64,' + element.image + '"/>';
      div += "<ul>";
      div += "<li class='name'>" + element.name + "</li>";
      div += "<li class='short-desc'>" + element.shortDescription + "</li>";
      div += "<li class='desc'>" + element.description + "</li>";
      div += "</ul>";
      div += "<button class='view'>view</button>";
      div += "<button class='edit'>edit</button>";
      div += "<button class='delete'>delete</button>";
      div += "</div>";
    });
    div += "</div>";
    document.getElementById("root").innerHTML = div;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
