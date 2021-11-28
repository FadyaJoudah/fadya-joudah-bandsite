let mainCommentList = [];
// function declarations
function renderComments(commentsData) {
  commentsData.forEach((comment) => {
    displayComment(comment);
    console.log(commentsData);
  });
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
  commentDate.innerText = new Date(date).toLocaleDateString("en-US");
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

const commentsSection = document.createElement("section");
commentsSection.classList.add("comments");
const formSection = document.querySelector(".form");
formSection.append(commentsSection);

const form = document.querySelector(".form__section");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.querySelector(".form__input");
  const commenterText = document.querySelector(".form__text");
  const latestComment = {
    name: nameInput.value,
    comment: commenterText.value,
  };

  postComments(latestComment);
});

document.querySelector("form").onsubmit = (e) => {
  e.target.reset();
  return false;
};

function getComments() {
  axios
    .get(
      'https://project-1-api.herokuapp.com/comments?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"'
    )
    .then((response) => {
      mainCommentList = response.data;
      renderComments(mainCommentList);
      return mainCommentList;
    })
    .catch((err) => {
      console.log(err);
    });
}
getComments();

function postComments(draftComment) {
  axios
    .post(
      'https://project-1-api.herokuapp.com/comments?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"',
      {
        name: draftComment.name,
        comment: draftComment.comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const newComment = response.data;
      console.log(response);
      mainCommentList.push(newComment);
      commentsSection.innerHTML = "";
      renderComments(mainCommentList);
      // const newCommentNode = createComment(newComment);
      // commentsSection.prepend(newCommentNode);
    })
    .catch((err) => {
      console.log(err);
    });
}
