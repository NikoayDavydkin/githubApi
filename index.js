const inputSearch = document.querySelector("input");
const menu = document.querySelector(".menu");
const repo = document.querySelector(".repo");

inputSearch.addEventListener("keyup",debounce(searchUsers, 1000));

async function searchUsers() {
  clearUsers();
  if (inputSearch.value != "" && inputSearch.value != " ") {
    return await fetch(
      `https://api.github.com/search/repositories?q=${inputSearch.value}&per_page=5`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          res.items.forEach((user) => {
            createAutocompliteItem(user);
          });
        });
      }
    });
  }
}

function createAutocompliteItem(user) {
  const userElement = document.createElement("li");
  userElement.textContent = user.name;
  userElement.addEventListener("click", () => {
    inputSearch.value = "";
    clearUsers();
    createRepositoriesItem(user.id, [
      user.name,
      user.owner.login,
      String(user.stargazers_count),
    ]);
  });
  menu.append(userElement);
}

createRepositoriesItem(123, ["Test", "Test", "Test"]);

function createRepositoriesItem(id, massValues) {
  const repoItem = document.createElement("li");
  repoItem.id = id;
  const deleteButton = document.createElement("button");

  const leftVector = document.createElement("img");
  leftVector.src = "./img/Vector 7.svg";
  leftVector.classList.add("imgLeft");
  deleteButton.append(leftVector);

  const rightVector = document.createElement("img");
  rightVector.src = "./img/Vector 8.svg";
  rightVector.classList.add("imgRight");
  deleteButton.append(rightVector);

  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    repoItem.remove();
  });
  const repoData = document.createElement("div");
  repoData.classList.add("repo-data");
  const massInput = ["Name", "Owner", "Stars"];

  for (let i = 0; i < massInput.length; i++) {
    const p = document.createElement("p");
    p.textContent = `${massInput[i]}: ${massValues[i]}`;
    repoData.append(p);
  }

  repoItem.append(repoData);
  repoItem.append(deleteButton);
  repo.append(repoItem);
}

function clearUsers() {
  menu.innerHTML = "";
}

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}
