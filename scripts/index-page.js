const defaultComments = [
  {
    img: {
      src: "./assets/Images/default-profile-picture.png",
      alt: "profile picture",
    },
    name: "Connor Walton",
    date: "02/17/2021",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. let us appreciate this for what it is and what it contains.",
  },
  {
    img: {
      src: "./assets/Images/default-profile-picture.png",
      alt: "profile picture",
    },
    name: "Emilie Beach",
    date: "01/09/2021",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    img: {
      src: "./assets/Images/default-profile-picture.png",
      alt: "profile picture",
    },
    name: "Miles Acosta",
    date: "12/20/2020",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentsSection = document.createElement("section");
commentsSection.classList.add("comments");
const formSection = document.querySelector(".form");
formSection.append(commentsSection);

renderComments();

function renderComments() {
  for (let i = 0; i < defaultComments.length; i++) {
    let currentComment = defaultComments[i];
    displayComment(currentComment);
  }
}

function createComment(comment) {
  // create article
  const article = document.createElement("article");
  article.classList.add("comments__comment");
  article.classList.add("comment");

  // create and append img
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
  avatar.src = img.src;
  avatar.alt = img.alt;
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
  commentDate.innerText = date;
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

  const commentDate = createDate(comment.date);
  infoDiv.appendChild(commentDate);

  //creat comment p element
  const commentText = createCommentText(comment.text);
  container.appendChild(commentText);
  return container;
}
function clearComments() {
  commentsSection.innerHTML = "";
}

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

  defaultComments.push(latestComment);

  //clean section from old comments
  clearComments();
  renderComments();

  nameInput.value = "";
  commenterText.value = "";
});
