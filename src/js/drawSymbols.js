import loadJSON from "./retrieveData";
import createSymbol from './symbol';

function drawSymbols (width, height, yMin, yMax, stepSize, plot) {

  loadJSON(function (response) {

    const data = JSON.parse(response);
    const timeSeriesData = data['Time Series (Daily)'];

    let y = 26-3.5;

    const xIncr = 20;
    const xStart = 97;
    let x = xStart;
    const yPerUnitValue = height/(yMax - yMin + stepSize);

    for (const day in timeSeriesData) {
      let stock = timeSeriesData[day];
      console.log(stock);
      const open = y + (yMax - parseFloat(stock['1. open'])) * yPerUnitValue;
      const high = y + (yMax - parseFloat(stock['2. high'])) * yPerUnitValue;
      const low = y + (yMax - parseFloat(stock['3. low'])) * yPerUnitValue;
      const close = y + (yMax - parseFloat(stock['4. close'])) * yPerUnitValue;

      if (parseFloat(stock['4. close']) > parseFloat(stock['1. open'])) {
        createSymbol('bull', plot, x, open, high, low, close);
      } else if (parseFloat(stock['4. close']) < parseFloat(stock['1. open'])) {
        createSymbol('bear', plot, x, open, high, low, close);
      }

      x = x + xIncr;

      if (x >= xStart + width - 20) {
        break;
      }
    }

  });

}

export default drawSymbols;