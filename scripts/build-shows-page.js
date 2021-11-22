const showsInfo = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021 ",
    venue: "Pier 3 East",
    location: "San Francisco, CA ",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge ",
    location: "San Francisco, CA ",
  },
  {
    date: "Sat Nov 06 2021 ",
    venue: "Hyatt Agency ",
    location: "San Francisco, CA ",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center ",
    location: "San Francisco, CA ",
  },
  {
    date: "Wed Dec 15 2021 ",
    venue: "Press Club ",
    location: "San Francisco, CA",
  },
];

const showSection = document.createElement("section");
showSection.classList.add("shows");
const main = document.querySelector(".hero-shows");
main.parentNode.insertBefore(showSection, main.nextSibling);

createTitle();
const showsList = createShowList();

createTableHeading();

for (let i = 0; i < showsInfo.length; i++) {
  const currentShow = showsInfo[i];
  createShow(currentShow);
}

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
  const dateNode = creatEventInfoNode("DATE", show.date, "bold");
  const venueNode = creatEventInfoNode("VENUE", show.venue);
  const locationNode = creatEventInfoNode("LOCATION", show.location);

  const buyTicketSection = document.createElement("div");
  buyTicketSection.classList.add("shows__show");
  buyTicketSection.classList.add("show");
  showsList.append(buyTicketSection);
  buyTicketSection.append(dateNode, venueNode, locationNode);

  const buttonEle = document.createElement("button");
  buttonEle.classList.add("show__button");
  buttonEle.innerText = "BUY TICKETS";
  buyTicketSection.append(buttonEle);
}
