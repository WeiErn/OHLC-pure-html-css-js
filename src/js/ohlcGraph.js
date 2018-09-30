import createAxis from './axis';
import createYLabel from './label';
import drawSymbols from './drawSymbols';
const svgNS = "http://www.w3.org/2000/svg";

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

  const width = '900px';
  const height = '400px';
  const yMin = 105;
  const yMax = 116;
  const stepSize = 1;

  // Create graph
  const graph = createGraph(width, height);
  createAxis('y-axis', 0, 365, graph);
  createAxis('x-axis', 615, 0, graph);

  // Create Y Label and Ticks
  createYLabel('y-labels', 365, yMin, yMax, stepSize, graph);

  // Create Plot
  const plot = createPlot();
  drawSymbols(615, 365, yMin, yMax, stepSize, plot);
  graph.appendChild(plot);
  document.getElementsByTagName('section')[0].appendChild(graph);

}

export default init;