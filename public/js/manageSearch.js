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
