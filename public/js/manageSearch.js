const searchBar = document.getElementById("search-skill")

function searchSkill(evt) {
  axios
    .get("/home/search", {
      params: {
        search: evt.target.value,
      },
    })
    .then((httpResponse) => displaySkill(httpResponse.data))
    .catch((err) => console.error(err));
}

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