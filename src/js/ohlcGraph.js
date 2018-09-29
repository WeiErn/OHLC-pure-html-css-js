import loadJSON from './retrieveData';
import createAxis from './axis';
import createYLabel from './label';
const svgNS = "http://www.w3.org/2000/svg";

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
  line.classList.add(classString);
  line.setAttribute('x1', x1);
  line.setAttribute('x2', x2);
  line.setAttribute('y1', y1);
  line.setAttribute('y2', y2);

  return line;
}

function createSymbol(trendClass, plot) {
  let symbol = document.createElementNS(svgNS, 'g');
  symbol.classList.add('symbol');
  symbol.classList.add(trendClass);

  const openEl = createOpenEl();
  const highLowEl = createHighLowEl();
  const closeEl = createCloseEl();

  symbol.appendChild(openEl);
  symbol.appendChild(highLowEl);
  symbol.appendChild(closeEl);
  plot.appendChild(symbol);
}

function createGraph(width, height) {
  const graph = document.createElementNS(svgNS, 'svg');
  graph.classList.add('graph');
  graph.setAttribute('version', '1.2');
  graph.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  graph.setAttribute('width', width);
  graph.setAttribute('height', height);

  return graph;
}

function createPlot() {
  const plot = document.createElementNS(svgNS, 'g');
  plot.classList.add('plot');

  return plot;
}


function init() {
  loadJSON(function(response) {

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

    const width = '900px';
    const height = '400px';

    const graph = createGraph(width, height);
    // const graph = document.getElementsByClassName('graph')[0];
    createAxis('x-axis', 0, 365, graph);
    createAxis('y-axis', 615, 0, graph);

    createYLabel('y-labels', 365, graph);

    const plot = createPlot();
    // const plot = document.getElementsByClassName('plot')[0];
    createSymbol('bear', plot);
    graph.appendChild(plot);
    document.getElementsByTagName('section')[0].appendChild(graph);
  });
}

export default init;