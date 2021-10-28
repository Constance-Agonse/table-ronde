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

<<<<<<< HEAD
searchBar.oninput = searchSkill;


// TRY DOM HUGO
function displayUsers(skills) {
  // display the list we fetched via AJAX method
  tbody.innerHTML = ""; // empty the table's body
  if (skills.length === 0) displayEmptyRow(); // A remplacer par aucune réation car nous n'avons pas de tableau
  else
    skills.forEach((skill) => {
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
=======
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
>>>>>>> 60b7f1be3022c36b1beed771b1a0f6b119f30501
