function createOpenEl() {
  return createLine('high-low', '105', '105', '5', '371')
}

function createHighLowEl() {
  return createLine('open', '97', '105', '10', '10')
}

function createCloseEl() {
  return createLine('close', '105', '113', '50', '50')
}

function createLine(classString, x1, x2, y1, y2) {
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.classList.add('high-low');
  line.setAttribute('x1', x1);
  line.setAttribute('x2', x2);
  line.setAttribute('y1', y1);
  line.setAttribute('y2', y2);

  return line;
}

function loadJSON(callback) {

  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    // Parse JSON string into object
    const data = JSON.parse(response);
    const timeSeriesData = data['Time Series (Daily)'];

    for (const day in timeSeriesData) {
      let stock = timeSeriesData[day];
      if (parseFloat(stock['4. close']) > parseFloat(stock['1. open'])) {
        stock.trend = 'bull'
      } else if (parseFloat(stock['4. close']) < parseFloat(stock['1. open'])) {
        stock.trend = 'bear'
      }
    }

    console.log(timeSeriesData);

    let graph = document.getElementsByClassName('chart')[0];
    const svgNS = "http://www.w3.org/2000/svg";

    createSymbol('bear');

    function createSymbol(trendClass) {
      let symbol = document.createElementNS(svgNS, 'g');
      symbol.classList.add('symbol');
      symbol.classList.add(trendClass);

      const openEl = createOpenEl();
      const highLowEl = createHighLowEl();
      const closeEl = createCloseEl();

      symbol.appendChild(openEl);
      symbol.appendChild(highLowEl);
      symbol.appendChild(closeEl);
      graph.appendChild(symbol);
    }
  });
}

init();