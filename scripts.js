let moneyOutput = document.getElementById("money");
let checkBoxRed = document.getElementById("colorRed");
let checkBoxBlack = document.getElementById("colorBlack");
let result = document.getElementById("result");

let money = 100;
let profitMargeCasino = 0;

moneyOutput.innerText = money;

document.getElementById("play").addEventListener("click", function () {
  let stake = parseInt(document.getElementById("wager").value);

  if (stake > money) {
    document.querySelector("h2").innerText = "Dein Guthaben reicht nicht aus!";
    return;
  }
  if (money <= 0) {
    document.querySelector("h2").innerText = "Guthaben aufladen!";
    return;
  }
  if (!stake || stake <= 0) {
    document.querySelector("h2").innerText = "Bitte setzen Sie ihren Einsatz";
    return;
  }

  let isRed = checkBoxRed.checked;
  let isBlack = checkBoxBlack.checked;

  if (isRed || isBlack) {
    let randomNumber = getRandomNumberBetween(0, 100);
    let correctColor = randomNumber <= 48 ? "red" : "black";
    let isWinning = (isRed && correctColor === "red") || (isBlack && correctColor === "black");

    document.getElementById("result").style.backgroundColor = correctColor;
    document.querySelector("h2").innerText = isWinning ? "Du hast richtig getippt!" : "Leider falsch getippt!";

    money = isWinning ? money + stake : money - stake;
    moneyOutput.innerText = money;

    if (isWinning) {
      result.classList.add("win-animation");
      setTimeout(() => result.classList.remove("win-animation"), 2000);
    }

    if (randomNumber > 48 && randomNumber <= 52) {
      profitMargeCasino += stake;
      console.log("Die Gewinnmarge von Casino ist:" + profitMargeCasino);
    }
  }
});

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
