const axios = require("axios");

// document.getElementById("send").addEventListener("click", function(e) {
//   let img = document.getElementById("img");
//   let nameCharacter = document.getElementById("name").value;
//   let shortDesc = document.getElementById("short-desc").value;
//   let desc = document.getElementById("desc").value;
// });

function showDesc(el) {
  el.parentNode.querySelector(".desc").style.display = "block";
}

document.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("view")) {
    showDesc(e.target);
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

function edit() {}

axios
  .get("https://character-database.becode.xyz/characters/")
  .then(async function(response) {
    const array = await response.data;

    console.log(array);
    let div = "<div>";
    add();
    //let contentDesc = document.getElementsByClassName("desc");

    array.forEach(function(element) {
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
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });
