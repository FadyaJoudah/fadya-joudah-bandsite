let defaultComments = [
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

for (let i = 0; i < defaultComments.length; i++) {
  let currentComment = defaultComments[i];

  // creat article
  let article = document.createElement("article");
  article.classList.add("comments__comment");
  article.classList.add("comment");
  commentsSection.appendChild(article);

  // creat and append img
  let avatar = createAvatar(defaultComments.img);
  article.appendChild(avatar);

  // creat comment container
  let container = document.createElement("div");
  container.classList.add("comment__content");
  article.appendChild(container);

  // creat div for comments ifo
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("comment__info");
  container.appendChild(infoDiv);

  // creat two p elements for comment info
  let commenter = document.createElement("p");
  commenter.classList.add("comment__name");
  commenter.innerText = currentComment.name;
  infoDiv.appendChild(commenter);

  let commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.innerText = currentComment.date;
  infoDiv.appendChild(commentDate);

  //creat comment p element
  let comment = document.createElement("p");
  comment.classList.add("comment__text");
  comment.innerText = currentComment.text;
  container.appendChild(comment);
}

function createAvatar(img) {
  let avatar = document.createElement("img");
  avatar.src = img.src;
  avatar.alt = img.alt;
  return avatar;
}

function createName(name) {
  commenter.classList.add("comment__name");
  commenter.innerText = currentComment.name;

  return commenter;
}
