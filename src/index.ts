const axios = require("axios");

document.getElementById("send").addEventListener("click", function(e) {
  let img = document.querySelector(".thumb").src;
  const words = img.split(",");
  img = words[1];
  let nameCharacter = document.getElementById("name").value;
  let shortDesc = document.getElementById("short-desc").value;
  let desc = document.getElementById("desc").value;
  console.log(img, nameCharacter, shortDesc, desc);

  axios({
    method: "post",
    url: "https://character-database.becode.xyz/characters/",
    data: {
      description: desc,
      shortDescription: shortDesc,
      name: nameCharacter,
      image: img
    }
  }).then((res: any) => {
    console.log(res);
  });
});

function showDesc(el: EventTarget) {
  el.parentNode.querySelector(".desc").style.display = "block";
}

document.addEventListener("click", function (e) {
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

function showAdd(el: EventTarget) {
  el.parentNode.querySelector("#myModal").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("ajout")) {
    showAdd(e.target);
  }
});




function update() { }

axios
  .get("https://character-database.becode.xyz/characters/")
<<<<<<< HEAD
  .then(async function (response) {
=======
  .then(async function(response: { data: any }) {
>>>>>>> dev
    const array = await response.data;

    console.log(array);
    var div = "<div>";
    add();
    //let contentDesc = document.getElementsByClassName("desc");

<<<<<<< HEAD
    array.forEach(function (element) {
=======
    array.forEach(function(element: {
      image: string;
      name: string;
      shortDescription: string;
      description: string;
    }) {
>>>>>>> dev
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
<<<<<<< HEAD
  .catch(function (error) {
=======
  .catch(function(error: any) {
>>>>>>> dev
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
