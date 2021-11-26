// function declarations
function renderComments(commentData) {
  for (let i = 0; i < commentData.length; i++) {
    let currentComment = commentData[i];
    displayComment(currentComment);
  }
}

function createComment(comment) {
  // create article
  const article = document.createElement("article");
  article.classList.add("comments__comment");
  article.classList.add("comment");

  // create and append img
  console.log(comment);
  const avatar = createAvatar(comment.img);
  // create comment container
  const container = createCommentContent(comment);

  article.appendChild(avatar);
  article.appendChild(container);
  return article;
}
// adds (prepend) the new comment to <section class="comments"/>
function displayComment(comment) {
  const commentNode = createComment(comment);
  commentsSection.prepend(commentNode);
}

function createAvatar(img) {
  const avatar = document.createElement("img");
  avatar.classList.add("comments__img");
  if (img) {
    avatar.src = img.src;
  }
  if (img) {
    avatar.alt = img.alt;
  }
  return avatar;
}

function createName(name) {
  const commenter = document.createElement("p");
  commenter.classList.add("comments__name");
  commenter.innerText = name;
  return commenter;
}

function createCommentText(text) {
  const comment = document.createElement("p");
  comment.classList.add("comments__text");
  comment.innerText = text;
  return comment;
}

function createDate(date) {
  const commentDate = document.createElement("p");
  commentDate.classList.add("comments__date");
  commentDate.innerText = new Date(date * 1000).toLocaleDateString("en-US");
  return commentDate;
}

function createCommentInfo() {
  const infoDiv = document.createElement("div");
  document.createElement("div");
  infoDiv.classList.add("comments__info");
  return infoDiv;
}

function createCommentContent(comment) {
  container = document.createElement("div");
  container.classList.add("comments__content");

  // creat div for comments ifo
  const infoDiv = createCommentInfo();
  container.appendChild(infoDiv);

  // creat two p elements for comment info
  const commenter = createName(comment.name);
  infoDiv.appendChild(commenter);

  const commentDate = createDate(comment.timestamp);
  infoDiv.appendChild(commentDate);

  //creat comment p element
  const commentText = createCommentText(comment.comment);
  container.appendChild(commentText);
  return container;
}
function clearComments() {
  commentsSection.innerHTML = "";
}

const commentsSection = document.createElement("section");
commentsSection.classList.add("comments");
const formSection = document.querySelector(".form");
formSection.append(commentsSection);

const submitButton = document.getElementsByClassName("form__button")[0];

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nameInput = document.getElementsByClassName("form__input")[0];
  const commenterText = document.querySelector(".form__text");
  const commenterImg = document.querySelector(".form__img");

  const latestComment = {
    name: nameInput.value,
    img: {
      src: commenterImg.getAttribute("src"),
      alt: "Profile Avatar",
    },
    text: commenterText.value,
    date: new Date().toLocaleDateString("en-US"),
  };

  getComments().push(latestComment);

  //clean section from old comments
  clearComments();
  renderComments();

  nameInput.value = "";
  commenterText.value = "";
});

function getComments() {
  axios
    .get(
      'https://project-1-api.herokuapp.com/comments?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"'
    )
    .then((response) => {
      console.log(response);
      const defaultComments = response.data;
      renderComments(defaultComments);
      return defaultComments;
    })
    .catch((err) => {
      console.log(err);
    });
}
getComments();
