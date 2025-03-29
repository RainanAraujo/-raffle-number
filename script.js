

const clearLocalStorage = document.getElementById("clearLocalStorage");
const raffleButton = document.getElementById("raffleButton");
const numbersRaffleViewer = document.getElementById("numbersRaffleViewer");

clearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
  numbersRaffleViewer.innerText = "Nenhum Sorteado";
});

setNumbersRaffleViewer();

function setNumbersRaffleViewer() {
  numbersRaffleViewer.innerText =
    localStorage.getItem("numbersRaffle") != null
      ? "Sorteados: " +
      JSON.parse(
        "[" + localStorage.getItem("numbersRaffle").toString() + "]"
      ).slice(1)
      : "Nenhum Sorteado";
}

raffleButton.addEventListener("click", (e) => {
  raffleButton.disabled = true;
  const number = document.getElementById("number");
  const numberGenerate = document.getElementById("numberGenerate");
  const lottie = document
    .createRange()
    .createContextualFragment(
      "<lottie-player autoplay id='lottie' src='./lf30_editor_cjcssanc.json' background='transparent' speed='0.7' style='width: 500px; height: 500px'></lottie-player>"
    );
  const confetes = document
    .createRange()
    .createContextualFragment(
      "<lottie-player id='confetes' autoplay src='./confetes.json' background='transparent' speed='1' style='width: 500px; height: 500px'></lottie-player>"
    );
  numberGenerate.appendChild(lottie);
  number.style.display = "none";
  const confetesNode = document.getElementById("confetes");
  setTimeout(function () {
    const lottie = document.getElementById("lottie");
    var numbersRaffle = [
      localStorage.getItem("numbersRaffle") != null
        ? localStorage.getItem("numbersRaffle")
        : 0,
    ];
    lottie.remove();
    var numberRaffle = generateRandom(numbersRaffle);
    number.innerText = numberRaffle;
    numbersRaffle.push(numberRaffle);
    numbersRaffleViewer.innerText =
      "Sorteados:" +
      " " +
      JSON.parse("[" + numbersRaffle.toString() + "]").slice(1);
    number.style.display = "block";
    localStorage.setItem("numbersRaffle", numbersRaffle);
    setTimeout(function () {
      numberGenerate.appendChild(confetes);
    }, 200);
    raffleButton.disabled = false;
  }, 6000);

  confetesNode.remove();
});

function generateRandom(exceptList) {
  var numbersRaffle = JSON.parse("[" + exceptList.toString() + "]");
  var numberRaffle = Math.floor(Math.random() * 4000) + 1;
  while (numbersRaffle.includes(numberRaffle)) {
    numberRaffle = Math.floor(Math.random() * 4000) + 1;
  }
  return numberRaffle;
}
