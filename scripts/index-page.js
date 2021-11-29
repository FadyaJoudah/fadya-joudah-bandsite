let mainCommentList = [];
// function declarations
function renderComments(commentsData) {
  commentsData.forEach((comment) => {
    displayComment(comment);
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
  commentsSection.append(commentNode);
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
function createButton(className, name) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerText = name;

  return button;
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
  // creates the DOM elements for date
  const commentDate = createDate(comment.timestamp);
  infoDiv.appendChild(commentDate);

  //creat comment p element
  const commentText = createCommentText(comment.comment);
  container.appendChild(commentText);

  const likeButton = createButton(
    "comments__like-button",
    `💗 ${comment.likes}`
  );

  container.appendChild(likeButton);
  const deleteButton = createButton("comments__delete-button", "🗑️");
  container.appendChild(deleteButton);

  likeButton.addEventListener("click", () => {
    axios
      .put(
        `https://project-1-api.herokuapp.com/comments/${comment.id}/like?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"`
      )
      .then((response) => {
        const updatedComment = response.data;

        mainCommentList.forEach((comment, currentIndex) => {
          if (comment.id === updatedComment.id) {
            mainCommentList[currentIndex] = updatedComment;
          }
        });

        commentsSection.innerHTML = "";
        renderComments(mainCommentList);
      })
      .catch((err) => {
        console.error("failed to like");
      });
  });

  deleteButton.addEventListener("click", () => {
    axios
      .delete(
        `https://project-1-api.herokuapp.com/comments/${comment.id}/?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"`
      )
      .then((response) => {
        console.log(response.data);

        const deletedComment = response.data;

        mainCommentList.forEach((comment, index) => {
          if (comment.id === deletedComment.id) {
            mainCommentList.splice(index, 1);
          }
        });

        commentsSection.innerHTML = "";
        renderComments(mainCommentList);
      })
      .catch((err) => {
        console.error("failed to delete");
      });
  });
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
// source https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
function sortByDate(arr) {
  arr = arr.sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  return arr;
}

function getComments() {
  axios
    .get(
      'https://project-1-api.herokuapp.com/comments?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"'
    )
    .then((response) => {
      mainCommentList = response.data;
      mainCommentList = sortByDate(mainCommentList);
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
    // saw this format on stackOverFlow (forgot to save the link)
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
      // empty the container and rebuild it again to stop the comments from repeating
      commentsSection.innerHTML = "";
      mainCommentList = sortByDate(mainCommentList);
      renderComments(mainCommentList);
    })
    .catch((err) => {
      console.log(err);
    });
}
