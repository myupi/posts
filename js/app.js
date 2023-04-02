const users = document.querySelector(`.users`);
const posts = document.querySelector(`.posts`);
const comments = document.querySelector(`.comments`);

async function getUsers(elem) {
  let data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
  renderUsers(data, elem);
}
getUsers(users);

async function getPosts(elem, id, user) {
  let data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
  renderPosts(data, elem, user);
}

async function getComments(elem, id) {
  let data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments/`
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
  renderComments(data, comments);
}

function renderUsers(arr, elem) {
  elem.innerHTML = null;
  if (arr) {
    arr.forEach((item) => {
      let li = document.createElement("li");
      li.dataset.id = item.id;
      li.classList.add("list-group-item", "item-users");
      li.innerText = `${item.id}. Name: ${item.name},
            Username: ${item.username},
            Address: ${item.address.city}
        `;
      li.addEventListener("click", (e) => {
        comments.innerHTML = null;
        const itemUsers = document.querySelectorAll(`.item-users`);
        let userFind = arr.find((user)=>{
         return user.id == e.target.dataset.id;
        })
        itemUsers.forEach((e) => {
          e.classList.remove("active");
        });
        li.classList.add("active");
        let id = e.target.dataset.id;
        getPosts(posts, id, userFind.name);
      });
      elem.appendChild(li);
    });
  }
}

function renderPosts(arr, elem, user) {
  elem.innerHTML = null;
  let s = 1;
  arr.forEach((item) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "item-posts");
    li.innerText = `Post by ${user}
    ${s}. Title: ${item.title}
            Post: ${item.body},
        `;
    li.dataset.id = item.id;
    s++;
    li.addEventListener("click", (e) => {
      const itemUsers = document.querySelectorAll(`.item-posts`);
      itemUsers.forEach((e) => {
        e.classList.remove("active");
      });
      li.classList.add("active");
      let id = e.target.dataset.id;
      getComments(comments, id);
    });
    elem.appendChild(li);
  });
}

function renderComments(arr, elem) {
  elem.innerHTML = null;
  let s = 1;
  arr.forEach((item) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = `${s}. Title: ${item.name}
            Comment: ${item.body},
        `;
    elem.appendChild(li);
    s++;
  });
}
