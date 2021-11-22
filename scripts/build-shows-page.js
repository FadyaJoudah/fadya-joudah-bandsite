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

const showSection = document.querySelector(".shows");

// }
//  todo: function creatShow(show) {

const heading = document.createElement("h2");
heading.classList.add("shows__title");
heading.innerText = "Shows";

const showsList = document.createElement("div");
showsList.classList.add("shows-list");
showSection.append(showsList);
showSection.prepend(heading);

const hiddenInfo = document.createElement("div");
hiddenInfo.classList.add("shows__info");
hiddenInfo.classList.add("shows__info--hidden");
showsList.prepend(hiddenInfo);
// todo: function creatHiddenInfo() {
// elements of the hidden info div
const infoHeading = document.createElement("p");
const infoHeading2 = document.createElement("p");
const infoHeading3 = document.createElement("p");

infoHeading.classList.add("shows__details");
infoHeading2.classList.add("shows__details");
infoHeading3.classList.add("shows__details");

infoHeading.innerText = "DATE";
infoHeading2.innerText = "VENUE";
infoHeading3.innerText = "LOCATION";
hiddenInfo.append(infoHeading, infoHeading2, infoHeading3);

function renderTicket() {}
for (let i = 0; i < showsInfo.length; i++) {
  const currentShow = showsInfo[i];
  const dateNode = creatEventInfoNode("DATE", currentShow.date, "bold");
  const venueNode = creatEventInfoNode("VENUE", currentShow.venue);
  const locationNode = creatEventInfoNode("LOCATION", currentShow.location);

  const buyTicketSection = document.createElement("div");
  buyTicketSection.classList.add("shows__show");
  buyTicketSection.classList.add("show");
  showsList.append(buyTicketSection);
  buyTicketSection.append(dateNode, venueNode, locationNode);
  console.log(buyTicketSection);

  const buttonEle = document.createElement("button");
  buttonEle.classList.add("show__button");
  buttonEle.innerText = "BUY TICKETS";
  buyTicketSection.append(buttonEle);
}
console.log(showSection);
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
