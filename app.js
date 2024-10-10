const BASE_URL = "https://v6.exchangerate-api.com/v6/38914191c707e5984fb0ca10/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// Correctly selects the "from" and "to" currency dropdown
for (let select of dropdowns) {
  for (let currCode in countryList) { // Use let for currCode
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}${fromCurr.value}`;// URL for the "from" currency
  
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data.conversion_rates[toCurr.value];
    let fainalAmount = amtVal * exchangeRate;
    console.log(fainalAmount)
    msg.innerText = `${amtVal} ${fromCurr.value} = ${fainalAmount}${toCurr.value} `
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load",()=>{
  updateExchangeRate();
});