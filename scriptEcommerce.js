//selecting required DOM elements

const containerCountries = document.querySelector(".container-countries");
const headerInput = document.querySelector(".header-input");
const selectSearch = document.querySelector(".select-search");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");

//Ajax call

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    //DisplayCountry(data);

    let filterCountries = data;

    filterCountries.forEach((element) => {
      DisplayCountry(element);
    });

    //Getting search Value

    headerInput.addEventListener("keyup", function (e) {
      containerCountries.innerHTML = "";

      let searchCatagory = selectSearch.value;

      console.log(searchCatagory);
      if (searchCatagory == "country") {
        let search = e.target.value.toLowerCase();

        filterCountries = data.filter(function (element) {
          return element.name.common.toLowerCase().startsWith(search);
        });

        filterCountries.forEach((element) => {
          DisplayCountry(element);
        });
      } else if (searchCatagory == "capital") {
        let search = e.target.value;

        filterCountries = data.filter(function (element) {
          return element.capital == search;
        });

        filterCountries.forEach((element) => {
          DisplayCountry(element);
        });
      } else if (searchCatagory == "continent") {
        let search = e.target.value.toLowerCase();

        filterCountries = data.filter(function (element) {
          return element.continents.toLowerCase().startsWith(search);
        });

        filterCountries.forEach((element) => {
          DisplayCountry(element);
        });
      }
    });
  });

let i = 0;
//creating the display of country card
const DisplayCountry = function (element) {
  i++;

  const countryCard = document.createElement("div");
  countryCard.className = "country-card";
  countryCard.id = `key-${i}`;
  countryCard.onclick = ClickonCard();

  const flag = document.createElement("div");
  flag.className = "flag";

  const flagImg = document.createElement("img");
  flagImg.className = "flag-img";
  flagImg.setAttribute("src", `${element.flags?.png}`);

  const countryData = document.createElement("div");
  countryData.className = "country-data";

  const cName = document.createElement("span");
  cName.className = "c-name";
  cName.innerText = `Name:` + `  ${element.name?.common}`;

  const cCapital = document.createElement("span");
  cCapital.className = "c-capital";
  cCapital.innerText = `Capital:` + ` ${element.capital}`;

  const cPopul = document.createElement("span");
  cPopul.className = "c-popul";
  cPopul.innerText = `Population:` + ` ${element.population}`;

  const cCurr = document.createElement("span");
  cCurr.className = "c-curr";
  cCurr.innerText = `Continent:` + ` ${element.continents}`;

  countryData.appendChild(cName);
  countryData.appendChild(cCapital);
  countryData.appendChild(cCurr);
  countryData.appendChild(cPopul);

  containerCountries.appendChild(countryCard);
  countryCard.appendChild(flag);
  countryCard.appendChild(countryData);
  flag.appendChild(flagImg);
};

// Click event on a card

function ClickonCard() {
  let countryCardEle = document.querySelectorAll(".country-card");

  countryCardEle.forEach((element) => {
    element.addEventListener("click", function (e) {
      modal.classList.remove("hidden");
    });
  });
}

close.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// containerCountries.addEventListener("click", function(e){

//     console.log(e.target.className);

// })
