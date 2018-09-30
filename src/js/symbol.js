import createLine from "./line";

const svgNS = "http://www.w3.org/2000/svg";

function createHighLowEl(x, y1, y2) {
  return createLine('high-low', x, x, `${y1}`, `${y2}`)
}

function createOpenEl(x1, x2, y) {
  return createLine('open', x1, x2, `${y}`, `${y}`)
}

function createCloseEl(x1, x2, y) {
  return createLine('close', x1, x2, `${y}`, `${y}`)
}

function createSymbol(trendClass, plot, x, open, high, low, close) {
  let symbol = document.createElementNS(svgNS, 'g');
  symbol.classList.add('symbol');
  symbol.classList.add(trendClass);

  const openEl = createOpenEl(`${x}`, `${x+8}`, open);
  const highLowEl = createHighLowEl(`${x+8}`, high, low);
  const closeEl = createCloseEl(`${x+8}`, `${x+16}`, close);

  symbol.appendChild(openEl);
  symbol.appendChild(highLowEl);
  symbol.appendChild(closeEl);
  plot.appendChild(symbol);
}

export default createSymbol;