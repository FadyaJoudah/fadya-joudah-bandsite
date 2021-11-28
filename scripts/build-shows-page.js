const showSection = document.createElement("section");
showSection.classList.add("shows");
const main = document.querySelector(".hero-shows");
main.parentNode.insertBefore(showSection, main.nextSibling);

createTitle();
const showsList = createShowList();

createTableHeading();

function creatEventInfoNode(label, value, modifier) {
  const eventInfoSection = document.createElement("div");
  eventInfoSection.classList.add("show__info-section");

  const eventTitle = document.createElement("p");
  eventTitle.classList.add("show__label");

  const eventInfo = document.createElement("p");
  eventInfo.classList.add("show__details");
  if (modifier !== undefined) {
    eventInfo.classList.add(`show__details--${modifier}`);
  }

  eventInfoSection.append(eventTitle, eventInfo);

  eventTitle.innerText = label;
  eventInfo.innerText = value;
  return eventInfoSection;
}

function createTableHeading() {
  // create hidden info div
  const tableHeading = document.createElement("div");
  tableHeading.classList.add("shows__info");
  tableHeading.classList.add("shows__info--hidden");
  showsList.prepend(tableHeading);

  // elements of the hidden info inside the div
  const infoHeading = document.createElement("p");
  const infoHeading2 = document.createElement("p");
  const infoHeading3 = document.createElement("p");

  infoHeading.classList.add("shows__details");
  infoHeading2.classList.add("shows__details");
  infoHeading3.classList.add("shows__details");

  infoHeading.innerText = "DATE";
  infoHeading2.innerText = "VENUE";
  infoHeading3.innerText = "LOCATION";
  tableHeading.append(infoHeading, infoHeading2, infoHeading3);
}

function createTitle() {
  const heading = document.createElement("h2");
  heading.classList.add("shows__title");
  heading.innerText = "Shows";
  showSection.prepend(heading);
}
function createShowList() {
  const showsList = document.createElement("div");
  showsList.classList.add("shows-list");
  showSection.append(showsList);
  return showsList;
}

function createShow(show) {
  let timeStamp = Number(show.date);
  let formattedDate = new Date(timeStamp).toLocaleDateString("en-US");

  const dateNode = creatEventInfoNode("DATE", formattedDate, "bold");
  const venueNode = creatEventInfoNode("VENUE", show.place);
  const locationNode = creatEventInfoNode("LOCATION", show.location);

  const buyTicketSection = document.createElement("div");
  buyTicketSection.classList.add("shows__show");
  buyTicketSection.classList.add("show");
  showsList.append(buyTicketSection);
  buyTicketSection.append(dateNode, venueNode, locationNode);
  buyTicketSection.addEventListener("click", (e) => {
    // if (buyTicketSection.getAttribute("class")!== "show--active"){

    // }
    console.log(buyTicketSection.getAttribute("class"));
    buyTicketSection.classList.add("show--active");
    // bu;
  });

  const buttonEle = document.createElement("button");
  buttonEle.classList.add("show__button");
  buttonEle.innerText = "BUY TICKETS";
  buyTicketSection.append(buttonEle);
}
getShows();
function getShows() {
  axios
    .get(
      'https://project-1-api.herokuapp.com/showdates?api_key="69a82381-da8f-44fe-8e3a-9193c33b95f9"'
    )
    .then((response) => {
      let shows = response.data;
      shows.forEach((show) => {
        createShow(show);
      });
      shows.date = new Date(shows.date).toLocaleDateString("en-US");
    })
    .catch((err) => {
      console.log(err);
    });
}
