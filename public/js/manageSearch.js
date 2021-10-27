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