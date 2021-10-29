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
      // displaySkill(httpResponse.data);
      displayUsers(httpResponse.data);
    })
    .catch((err) => console.error(err));
}

searchBar.oninput = searchSkill;

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
function displayUsers(users) {
  // display the list we fetched via AJAX method
  searchBoxResult.innerHTML = ""; // empty the div

  users.forEach((user) => {
      // create one div per skill containing multiple element > skill's infos
      const div = document.createElement("div");
      div.setAttribute("class","user-info"); // seting the skill's id on the tr so we can use it later for deletion
      const template = `       
            <img src="${user.profilPicture}" alt="${user._id}"></img>
            <p class="resultText">${user.name} can teach you : <b>${user.skills[0].name}</b> !</p>
            <p>Level : <b>${user.skills[0].level}</b></p>
            <a href="/home/askCourse" class="btn-book-course">Ask for a course !</a>`;
      div.innerHTML = template;
      //div.querySelector("button").onclick = () => deleteUser(user._id); // preparing the listener for deletion
      searchBoxResult.appendChild(div); // a remplacer le premier div par la section du dessus
  });
}
