const selects = document.querySelectorAll(".exchangeBox .selectBox select");
const fromVal = document.querySelector(".from");
const toVal = document.querySelector(".to");
let inpValue = document.querySelector("#valueInp");
const resultBox = document.querySelector(".resultBox");
const btn = document.querySelector(".btn")
for (let select of selects) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    }
    else if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  })
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let countryName = element.value;
  const flagImg = element.parentElement.querySelector("img");
  let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  flagImg.src = newImgSrc;
}
btn.addEventListener("click", (event) => {
  event.preventDefault();
  inpValue = document.querySelector("#valueInp");
  if (inpValue.value < 1 || inpValue.value == "") {
    inpValue.value = 1;
    inpValue = 1;
  }
  const api = fetch(`https://api.exchangerate-api.com/v4/latest/${fromVal.value}`);
  api.then((res) => {
    return res.json();
  }).then((data) => {
    let toValue = data.rates[toVal.value];
    let result = (parseFloat(inpValue.value) * toValue);
    resultBox.textContent = `${inpValue.value} ${fromVal.value} = ${result} ${toVal.value}`;
  })
});