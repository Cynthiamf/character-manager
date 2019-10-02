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

function showAdd(el: EventTarget) {
  el.parentNode.querySelector("#myModal").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("ajout")) {
    showAdd(e.target);
  }
});

// axios.put(
//   "https://character-database.becode.xyz/characters/:id",
//   (req, res) => {
//     console.log(req.params);
//     res.send(req.params);
//   }
// );
// .then(async function(response: { data: any }) {
//   const array = await response.data;
//   console.log(array);
// });

// axios({
//   method: "put",
//   url: "https://character-database.becode.xyz/characters/:id",
//   data: {
//     description: "",
//     shortDescription: "",
//     name: "",
//     image: ""
//   }
// }).then((res: any) => {
//   console.log(res);
// });

// document.addEventListener("click", e => {
//   if (e.target && e.target.classList.contains("edit")) {
//     edit();
//   }
// });

// function edit() {}

axios
  .get("https://character-database.becode.xyz/characters/")
  .then(async function(response: { data: any }) {
    const array = await response.data;

    console.log(array);
    let div = "<div>";
    add();
    //let contentDesc = document.getElementsByClassName("desc");

    array.forEach(function(element: {
      image: string;
      name: string;
      shortDescription: string;
      description: string;
    }) {
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
  .catch(function(error: any) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });
