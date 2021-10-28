const searchBar = document.getElementById("search-skill");
const searchLevel = document.getElementById("search-level");
const divTest = document.getElementById("test");

const searchObject = {};

function searchSkill(evt) {
  axios
    .get("/home/search", {
      params: searchObject,
    })
    .then((httpResponse) => {
      console.log("Successs: ", httpResponse.data);
      displaySkill(httpResponse.data);
    })
    .catch((err) => console.error(err));
}

searchBar.oninput = searchSkill;


function displaySkill(users) {
  users.forEach((element) => {
    divTest.innerHTML = `this is : ${element.name} ${JSON.stringify(
      element.skills
    )}`;
  });
}

const handleInput = (evt) => {
  searchObject.search = evt.target.value;
  searchSkill();
};

const handleChange = (evt) => {
  searchObject.level = evt.target.value;
  searchSkill();
};


searchBar.oninput = handleInput;
searchLevel.onchange = handleChange;


const searchBoxResult = document.getElementById("home-search-result");
// TRY DOM HUGO ----------------------------------------------------------------------
function displayUsers(user) {
  // display the list we fetched via AJAX method
  searchBoxResult.innerHTML = ""; // empty the div

  user.forEach((skill) => {
      // create one div per skill containing multiple element > skill's infos
      const div = document.createElement("div");
      div.setAttribute("data-skill-id", skill._id); // seting the skill's id on the tr so we can use it later for deletion
      const template = `
            <img>
                //picture to put here
            </img>
            <p class="resultText">${user.name} propose <strong>${user.skillName}</strong></p>
            <p>Niveau :${skill.level}</p>
            <button class="ask-for-a-course">Ask for a course</button>`;
      div.innerHTML = template;
      div.querySelector("button").onclick = () => deleteUser(user._id); // preparing the listener for deletion
      div.appendChild(div); // a remplacer le premier div par la section du dessus
  });

  listenUsernameChanges();// a remplacer
}