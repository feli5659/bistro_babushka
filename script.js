// link fra restdb databasen
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: { "x-apikey": "600ec2fb1346a1524ff12de4" },
};

document.addEventListener("DOMContentLoaded", start);
let filter = "alle";
let json;

//første function kaldes efter DOM er loaded

function start() {
  console.log("loaded");
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerPersoner));
  hentData();
}

//eventlistener knyttet til knapperne der vælger hvad for et filter er aktivt

function filtrerPersoner() {
  filter = this.dataset.kategori; //sæt variabel "filter" til værdien af data-troende på den knap der er klikket på
  document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra den knap
  this.classList.add("valgt"); //marker den knap der er klikket på
  vis(); // kald funktionen vis(json) efter nye filter er sat
  header.textContent = this.textContent;
}

// hent data via asynkrone metode
async function hentData() {
  const resspons = await fetch(url, options);
  json = await resspons.json();
  console.log("Kategorier", json);
  vis();
}

// hentData(); - denne er ikke aktiv da jeg har lavet en DOMContentLoaded
//funktion der viser personer i liste view
function vis() {
  const main = document.querySelector("main"); //container til articles med en person
  const template = document.querySelector("template").content; //select indhold af html skabelon (article)
  main.textContent = ""; //ryd container inden ny loop

  json.forEach((element) => {
    console.log("kategori", element.kategori);
    // loop igennem liste af mad
    //tjek hvilken tro personen  har og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"

    if (filter == element.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".navn").textContent = element.navn;
      klon.querySelector(".billede").src = "medium/" + element.billednavn + "-md.jpg";
      klon.querySelector(".kortbeskrivelse").textContent = element.kortbeskrivelse;
      klon.querySelector(".pris").textContent = element.pris + " kr.";
      klon.querySelector("article").addEventListener("click", () => visDetaljer(element));
      main.appendChild(klon);
    }
  });
}
document.querySelector("#luk").addEventListener("click", () => (popop.style.display = "none"));

function visDetaljer(element) {
  console.log(element);
  popop.style.display = "block";
  popop.querySelector(".billede1").src = "medium/" + element.billednavn + "-md.jpg";
  popop.querySelector(".navn").textContent = element.navn;
  popop.querySelector(".lang_beskrivelse").textContent = element.langbeskrivelse;
  popop.querySelector(".pris").textContent = element.pris + " kr.";
}
