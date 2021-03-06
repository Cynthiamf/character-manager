var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var axios = require("axios");
document.getElementById("send").addEventListener("click", function (e) {
    var img = document.querySelector(".thumb").src;
    var words = img.split(",");
    img = words[1];
    var nameCharacter = document.getElementById("name").value;
    var shortDesc = document.getElementById("short-desc").value;
    var desc = document.getElementById("desc").value;
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
    }).then(function (res) {
        console.log(res);
        window.location.reload(true);
    });
});
function showDesc(el) {
    el.parentNode.querySelector(".desc").style.display = "block";
}
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("view")) {
        showDesc(e.target);
    }
});
function add() {
    var ajout = document.createElement("button");
    ajout.className = "ajout";
    var newContent = document.createTextNode("Add Character");
    ajout.appendChild(newContent);
    var currentDiv = document.getElementById("root");
    document.body.insertBefore(ajout, currentDiv);
}
function showAdd(el) {
    document.getElementById("modify").style.display = "none";
    el.parentNode.querySelector("#myModal").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
}
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("ajout")) {
        showAdd(e.target);
    }
});
function showEditModal() {
    document.getElementById("send").style.display = "none";
    document.querySelector("#myModal").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
}
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("edit")) {
        var parentElement = e.target.closest(".character");
        var parentElementID_1 = parentElement.getAttribute("data-id");
        axios
            .get("https://character-database.becode.xyz/characters/" + parentElementID_1)
            .then(function (res) {
            var hero = res.data;
            var span = document.createElement("span");
            span.id = "imageContainer";
            span.innerHTML = "<img class=\"thumb\" src=\"data:image/png;base64," + hero.image + "\"/>";
            document.getElementById("list").insertBefore(span, null);
            document.getElementById("name").value = hero.name;
            document.getElementById("short-desc").value = hero.shortDescription;
            document.getElementById("desc").value = hero.description;
            console.log(hero.name);
        });
        showEditModal();
        document.getElementById("modify").addEventListener("click", function (e) {
            var img = document.querySelector(".thumb").src;
            var words = img.split(",");
            img = words[1];
            var nameCharacter = document.getElementById("name").value;
            var shortDesc = document.getElementById("short-desc").value;
            var desc = document.getElementById("desc").value;
            axios({
                method: "put",
                url: "https://character-database.becode.xyz/characters/" + parentElementID_1,
                data: {
                    description: desc,
                    shortDescription: shortDesc,
                    name: nameCharacter,
                    image: img
                }
            }).then(function (res) {
                window.location.reload(true);
            });
        });
    }
    if (e.target && e.target.classList.contains("delete")) {
        var parentElement = e.target.closest(".character");
        var parentElementID = parentElement.getAttribute("data-id");
        var confirmDelete = confirm("Are you sure to delete this character?");
        if (confirmDelete) {
            axios["delete"]("https://character-database.becode.xyz/characters/" + parentElementID);
            parentElement.parentNode.removeChild(parentElement);
        }
    }
});
axios
    .get("https://character-database.becode.xyz/characters/")
    .then(function (response) {
    return __awaiter(this, void 0, void 0, function () {
        var array, div;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, response.data];
                case 1:
                    array = _a.sent();
                    console.log(array);
                    div = "<div>";
                    add();
                    //let contentDesc = document.getElementsByClassName("desc");
                    array.forEach(function (element) {
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
                    return [2 /*return*/];
            }
        });
    });
})["catch"](function (error) {
    // handle error
    console.log(error);
})["finally"](function () {
    // always executed
});
