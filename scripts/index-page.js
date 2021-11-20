const defaultComments = [
  {
    img: {
      src: "",
      alt: "profile picture",
    },
    name: "Connor Walton",
    date: "02/17/2021",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    img: {
      src: "",
      alt: "profile picture",
    },
    name: "Emilie Beach",
    date: "01/09/2021",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    img: {
      src: "",
      alt: "profile picture",
    },
    name: "Miles Acosta",
    date: "12/20/2020",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentsSection = document.querySelector(".comments");
renderComments();
function renderComments() {
  for (let i = 0; i < defaultComments.length; i++) {
    let currentComment = defaultComments[i];
    displayComment(currentComment);
  }
}
function createComment(comment) {
  // create article
  let article = document.createElement("article");
  article.classList.add("comments__comment");
  article.classList.add("comment");

  // create and append img
  const avatar = createAvatar(comment.img);
  // create comment container
  let container = createCommentContent(comment);

  article.appendChild(avatar);
  article.appendChild(container);
  return article;
}
function displayComment(comment) {
  let commentNode = createComment(comment);
  commentsSection.prepend(commentNode);
}
function createAvatar(img) {
  let avatar = document.createElement("img");
  avatar.src = img.src;
  avatar.alt = img.alt;
  return avatar;
}

function createName(name) {
  let commenter = document.createElement("p");
  commenter.classList.add("comment__name");
  commenter.innerText = name;
  return commenter;
}

function createCommentText(text) {
  let comment = document.createElement("p");
  comment.classList.add("comment__text");
  comment.innerText = text;
  return comment;
}

function createDate(date) {
  let commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.innerText = date;
  return commentDate;
}

function createCommentInfo() {
  let infoDiv = document.createElement("div");
  document.createElement("div");
  infoDiv.classList.add("comment__info");
  return infoDiv;
}

function createCommentContent(comment) {
  container = document.createElement("div");
  container.classList.add("comment__content");

  // creat div for comments ifo
  let infoDiv = createCommentInfo();
  container.appendChild(infoDiv);

  // creat two p elements for comment info
  let commenter = createName(comment.name);
  infoDiv.appendChild(commenter);

  let commentDate = createDate(comment.date);
  infoDiv.appendChild(commentDate);

  //creat comment p element
  let commentText = createCommentText(comment.text);
  container.appendChild(commentText);
  return container;
}
function clearComments() {
  commentsSection.innerHTML = "";
}

let submitButton = document.getElementsByClassName("form__button")[0];
// console.log(submitButton);
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nameInput = document.getElementsByClassName("form__input")[0];
  const commenterText = document.querySelector(".form__text");
  const commenterImg = document.querySelector(".form__img");

  const latestComment = {
    name: nameInput.value,
    img: {
      src: "",
      // src: commenterImg.getAttribute("src"),
      alt: "Profile Avatar",
    },
    text: commenterText.value,
    date: new Date(),
  };

  defaultComments.push(latestComment);

  //clean section from old comments
  clearComments();
  renderComments();

  nameInput.value = "";
  commenterText.value = "";
});
