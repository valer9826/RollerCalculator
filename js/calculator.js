// const API_URL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20matic-network%2C%20binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false";
// const HTMLresponse = document.querySelector("#coins");
// const ul = document.createElement("ul");

// fetch(`${API_URL}`)
//   .then((response) => response.json())
//   .then((coins) => {
//     coins.forEach((coin) => {
//       let elem = document.createElement("li");
//       elem.appendChild(
//         document.createTextNode(
//           `${coin.name} - $${coin.current_price} icono: ${coin.image}`
//         )
//       );
//       ul.appendChild(elem);
//     });

//     HTMLresponse.appendChild(ul);
//   });

/* ----- Metodo alternativo para manipular DOM/ Hacer una petición a la API de  y mostrar los resultados en una lista ----- */
// fetch(`${API_URL}`)
//   .then((response) => response.json())
//   .then((coins) => {
//     const tmp = coins.map((coin) => `<li>${coin.name}</li>`);
//     HTMLresponse.innerHTML = `<ul>${tmp}</ul>`;
//   });

//Botones para consumir API
const btnDollar = document.getElementById("dollar");
const btnEuro = document.getElementById("euro");

//Inicializar
var crytocurrencies;

//Contadores
let clickDollar = 0;
let clickEuro = 0;

//Parametros de RESETBOARD
const moneda = ["dollar", "euro"];
const monedaSimbolo = ["$", "€"];

btnDollar.addEventListener("click", function () {
  if (clickDollar === 0) {
    let xhReq = new XMLHttpRequest();
    xhReq.open(
      "GET",
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20matic-network%2C%20binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      false
    );
    xhReq.send(null);
    let dataDollar = JSON.parse(xhReq.responseText);
    console.log(dataDollar);
    resetBoard(dataDollar, moneda[0], monedaSimbolo[0]);
    clickDollar++;
  }
  Mostrar(moneda[0]);
});

btnEuro.addEventListener("click", function () {
  if (clickEuro === 0) {
    let euroReq = new XMLHttpRequest();
    euroReq.open(
      "GET",
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20matic-network%2C%20binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      false
    );
    euroReq.send(null);
    let dataEuro = JSON.parse(euroReq.responseText);
    console.log(dataEuro);
    resetBoard(dataEuro, moneda[1], monedaSimbolo[1]);
    clickEuro++;
  }
  Mostrar(moneda[1]);
});

//Imprimir en tabla
function resetBoard(data, moneda, monedaSimbolo) {
  var $list = $(`#${moneda}-data`);
  $list.find(".crytocurrency").remove();
  dataMoneda = [];

  for (let i = 0; i < 5; i++) {
    dataMoneda.push({
      name: data[i].name,
      symbol: data[i].symbol,
      current_price: data[i].current_price,
      price_change: data[i].price_change_percentage_24h,
      image: data[i].image,
    });
  }
  for (var i = 0; i < dataMoneda.length; i++) {
    var $item = $(
      "<tr class='text-center'>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td class='name'>" +
        "<img class='img__crypto' src='" +
        dataMoneda[i].image +
        "'/>" +
        "<span>" +
        dataMoneda[i].name +
        "</span>" +
        "<span class='symbol'>" +
        dataMoneda[i].symbol +
        "</span>" +
        "</td>" +
        // "<td class='symbol'>" + crytocurrencies[i].symbol + "</td>" +
        "<td>" +
        monedaSimbolo +
        " " +
        dataMoneda[i].current_price +
        "</td>" +
        "<td class=''>" +
        dataMoneda[i].price_change +
        "</td>" +
        // "<td class='image'>"+"<img class='img__crypto' src='"+ crytocurrencies[i].image+"'/>" + "</td>" +
        "</tr>"
    );
    dataMoneda[i].$item = $item;
    $list.append($item);
  }
}

//Mostrar y ocultas tablas
function Mostrar(moneda) {
  let elem = document.querySelector(`.tabla--${moneda}`);
  let prom = document.querySelector(".prom");
  let textBtnMostrar = document.querySelector(".text-btn-mostrar");

  if (elem.classList.contains("hidden")) {
    elem.classList.remove("hidden");
    prom.classList.add("hidden");

    textBtnMostrar.innerHTML = "Click on the button to hide!";
  } else {
    elem.classList.add("hidden");
    prom.classList.remove("hidden");
    textBtnMostrar.innerHTML = "Click on the button to see coin prices!";
  }
}

//Conversion SATOSHI a BTC
function calculateBTC() {
  var satoshi = parseFloat(document.getElementById("satoshi-value").value);
  var btc = satoshi / 100000000;

  console.log(satoshi);

  console.log(btc);

  document.getElementById("btc-resultado").value = btc.toFixed(8);
}

//Conversion Cripto a USD/EUR
function calculated$() {
  var crypto = parseFloat(document.getElementById("btc-value").value);

  var btc_dolar = crypto * 46132.1;
  var btc_euro = crypto * 41293.76;

  var eth_dolar = crypto * 3814.51;
  var eth_euro = crypto * 3386.72;

  var bnb_dolar = crypto * 511.14;
  var bnb_euro = crypto * 452.92;

  var doge_dolar = crypto * 0.17;
  var doge_euro = crypto * 0.12;

  var matic_dolar = crypto * 2.42;
  var matic_euro = crypto * 2.14;

  switch (document.getElementById("crypto-type").selectedIndex) {
    case 0:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value =
            btc_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = btc_euro.toFixed(2);
          break;
      }
      break;
    case 1:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value =
            eth_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = eth_euro.toFixed(2);
          break;
      }
      break;
    case 2:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value =
            bnb_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value = bnb_euro.toFixed(2);
          break;
      }
      break;
    case 3:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value =
            doge_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value =
            doge_euro.toFixed(2);
          break;
      }
      break;
    default:
      switch (document.getElementById("coin-type").selectedIndex) {
        case 0:
          document.getElementById("coin-resultado").value =
            matic_dolar.toFixed(2);
          break;
        default:
          document.getElementById("coin-resultado").value =
            matic_euro.toFixed(2);
          break;
      }
      break;
  }
  console.log(crypto);
  console.log(btc_dolar);
}

/*---------------CALCULADORA------------------*/

function blockAmount() {
  // Returns pre-set block rewards based on block selected
  // Update if updated on rollercoin
  switch (document.getElementById("block-type").selectedIndex) {
    case 0:
      //bitcoin
      var blockreward = 30000;
      document.getElementById("block-reward").value = 30000;
      break;
    case 1:
      //Doge
      var blockreward = 20;
      document.getElementById("block-reward").value = 20;
      break;
    case 2:
      //eth
      var blockreward = 0.005;
      document.getElementById("block-reward").value = 0.005;
      break;
    case 3:
      //bnb
      var blockreward = 0.012;
      document.getElementById("block-reward").value = 0.012;
      break;
    case 4:
      //matic
      var blockreward = 3;
      document.getElementById("block-reward").value = 3;
      console.log("matic end");
      break;
    default:
      //RLT
      console.log("rlt start");
      var blockreward = 30;
      document.getElementById("block-reward").value = 30;
      break;
  }
}

function calculateGoalPower() {
  console.log("Calculate Begin");
  var netpower = parseFloat(document.getElementById("network-power").value);
  var goalpower = parseFloat(document.getElementById("goal-power").value);
  var blockreward = parseFloat(document.getElementById("block-reward").value);

  switch (document.getElementById("network-power-selector").selectedIndex) {
    case 0:
      netpower *= 1000000000;
      console.log("Netpower after ghs conversion: " + netpower);
      break;
    case 1:
      netpower *= 1000000000000;
      console.log("Netpower after ths conversion: " + netpower);
      break;
    case 2:
      netpower *= 1000000000000000;
      console.log("Netpower after phs conversion: " + netpower);
      break;
    default:
      netpower *= 1000000000000000000;
      console.log("Netpower after ehs conversion: " + netpower);
      break;
  }
  switch (document.getElementById("goal-power-selector").selectedIndex) {
    case 0:
      //GH/s
      goalpower *= 1000000000;
      console.log("goalpower after ghs conversion: " + goalpower);
      break;
    case 1:
      //TH/s
      goalpower *= 1000000000000;
      console.log("goalpower after ths conversion: " + goalpower);
      break;
    case 2:
      //PH/s
      goalpower *= 1000000000000000;
      console.log("goalpwer after phs conversion: " + goalpower);
      break;
    default:
      //EH/s
      goalpower *= 1000000000000000000;
      console.log("goalpwer after ehs conversion: " + goalpower);
      break;
  }
  console.log("Block: " + blockreward);
  var exp_reward = blockreward * (goalpower / netpower);

  console.log("exp. reward " + exp_reward.toFixed(4));

  /* const btcBlockTimer = 600;
    const dogeBlockTimer = 600;
    console.log(dogeBlockTimer + "seconds doge")
    const ethBlockTimer = 600; */

  //All timers are now the same 2021-04-19
  const BlockTimer = 600;
  const secFullDay = 86400;

  const dailyBtcBlocks = secFullDay / BlockTimer;
  const dailyDogeBlocks = secFullDay / BlockTimer;
  const dailyEthBlocks = secFullDay / BlockTimer;
  const dailyBnbBlocks = secFullDay / BlockTimer;
  const dailyMaticBlocks = secFullDay / BlockTimer;
  console.log(dailyBtcBlocks + ", " + dailyDogeBlocks + ", " + dailyEthBlocks);

  console.log("DailyBTC " + dailyBtcBlocks);
  console.log("DailyDOGE " + dailyDogeBlocks);
  console.log("DailyETH " + dailyEthBlocks);
  console.log(exp_reward);

  switch (document.getElementById("block-type").selectedIndex) {
    case 0:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(4) + " Satoshi";
      var btcResult = (exp_reward * dailyBtcBlocks).toFixed(4);
      document.getElementById("daily").innerHTML = btcResult + " Satoshi";
      document.getElementById("weekly").innerHTML =
        (btcResult * 7).toFixed(4) + " Satoshi";
      document.getElementById("monthly").innerHTML =
        (btcResult * 30).toFixed(4) + " Satoshi";
      break;
    case 1:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(4) + " Doge";
      var dogeResult = (exp_reward * dailyDogeBlocks).toFixed(4);
      document.getElementById("daily").innerHTML = dogeResult + " Doge";
      document.getElementById("weekly").innerHTML =
        (dogeResult * 7).toFixed(4) + " Doge";
      document.getElementById("monthly").innerHTML =
        (dogeResult * 30).toFixed(4) + " Doge";
      break;
    case 2:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(8) + " Ethereum";
      var ethResult = (exp_reward * dailyEthBlocks).toFixed(8);
      document.getElementById("daily").innerHTML = ethResult + " Etherium";
      document.getElementById("weekly").innerHTML =
        (ethResult * 7).toFixed(8) + " Ethereum";
      document.getElementById("monthly").innerHTML =
        (ethResult * 30).toFixed(8) + " Ethereum";
      break;
    case 3:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(8) + " BNB";
      var bnbResult = (exp_reward * dailyBnbBlocks).toFixed(8);
      document.getElementById("daily").innerHTML = bnbResult + " BNB";
      document.getElementById("weekly").innerHTML =
        (bnbResult * 7).toFixed(8) + " BNB";
      document.getElementById("monthly").innerHTML =
        (bnbResult * 30).toFixed(8) + " BNB";
      break;
    case 4:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(8) + " MATIC";
      var maticResult = (exp_reward * dailyMaticBlocks).toFixed(8);
      document.getElementById("daily").innerHTML = maticResult + " MATIC";
      document.getElementById("weekly").innerHTML =
        (maticResult * 7).toFixed(8) + " MATIC";
      document.getElementById("monthly").innerHTML =
        (maticResult * 30).toFixed(8) + " MATIC";
      break;
    default:
      document.getElementById("exp_reward").innerHTML =
        exp_reward.toFixed(8) + " Rollertoken";
      var rltResult = (exp_reward * dailyEthBlocks).toFixed(4);
      document.getElementById("daily").innerHTML = rltResult + " Rollertoken";
      document.getElementById("weekly").innerHTML =
        (rltResult * 7).toFixed(4) + " Rollertoken";
      document.getElementById("monthly").innerHTML =
        (rltResult * 30).toFixed(4) + " Rollertoken";
      break;
  }
}
