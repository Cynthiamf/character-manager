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

    window.location.reload(true);
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
  document.getElementById("modify").style.display = "none";
  el.parentNode.querySelector("#myModal").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("ajout")) {
    showAdd(e.target);
  }
});

function showEditModal() {
  document.getElementById("send").style.display = "none";
  document.querySelector("#myModal").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

document.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("edit")) {
    let parentElement = e.target.closest(".character");
    let parentElementID = parentElement.getAttribute("data-id");
    axios
      .get(
        `https://character-database.becode.xyz/characters/${parentElementID}`
      )
      .then(res => {
        let hero = res.data;

        var span = document.createElement("span");
        span.id = "imageContainer";
        span.innerHTML = `<img class="thumb" src="data:image/png;base64,${hero.image}"/>`;
        document.getElementById("list").insertBefore(span, null);
        document.getElementById("name").value = hero.name;
        document.getElementById("short-desc").value = hero.shortDescription;
        document.getElementById("desc").value = hero.description;

        console.log(hero.name);
      });

    showEditModal();

    document.getElementById("modify").addEventListener("click", function(e) {
      let img = document.querySelector(".thumb").src;
      const words = img.split(",");
      img = words[1];
      let nameCharacter = document.getElementById("name").value;
      let shortDesc = document.getElementById("short-desc").value;
      let desc = document.getElementById("desc").value;

      axios({
        method: "put",
        url: `https://character-database.becode.xyz/characters/${parentElementID}`,
        data: {
          description: desc,
          shortDescription: shortDesc,
          name: nameCharacter,
          image: img
        }
      }).then((res: any) => {
        window.location.reload(true);
      });
    });
  }

  if (e.target && e.target.classList.contains("delete")) {
    let parentElement = e.target.closest(".character");
    let parentElementID = parentElement.getAttribute("data-id");

    let confirmDelete = confirm("Are you sure to delete this character?");

    if (confirmDelete) {
      axios.delete(
        `https://character-database.becode.xyz/characters/${parentElementID}`
      );
      parentElement.parentNode.removeChild(parentElement);
    }
  }
});

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
      div += "<div class='character' data-id='" + element.id + "'>";
      div += '<img src="data:image/jpeg;base64,' + element.image + '"/>';
      div += "<ul>";
      div += "<li class='name'>" + element.name + "</li>";
      div += "<li class='short-desc'>" + element.shortDescription + "</li>";
      div += "<li class='desc'>" + element.description + "</li>";
      div += "</ul>";
      div += "<button class='view'>view</button>";
      div += "<button class='edit' >edit</button>";
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
