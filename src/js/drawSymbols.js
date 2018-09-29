import loadJSON from "./retrieveData";
import createSymbol from './symbol';

function drawSymbols (width, height, yMin, yMax, plot) {

  loadJSON(function (response) {

    const data = JSON.parse(response);
    const timeSeriesData = data['Time Series (Daily)'];

    let y = 26-3.5;

    const xIncr = 20;
    const xStart = 97;
    let x = xStart;
    const yPerUnitValue = height/(yMax - yMin + 10);

    // const open = y + (200 - 100) * yPerUnitValue;
    // const high = y + (200 - 200) * yPerUnitValue;
    // const low = y + (200 - 30) * yPerUnitValue;
    // const close = y + (200 - 50) * yPerUnitValue;
    //
    // for (let i = 0; i < 4; i++) {
    //   createSymbol('bull', plot, x, open, high, low, close);
    //   x = x + 20;
    // }

    for (const day in timeSeriesData) {
      let stock = timeSeriesData[day];
      console.log(stock);
      const open = y + (yMax - parseFloat(stock['1. open'])) * yPerUnitValue;
      const high = y + (yMax - parseFloat(stock['2. high'])) * yPerUnitValue;
      const low = y + (yMax - parseFloat(stock['3. low'])) * yPerUnitValue;
      const close = y + (yMax - parseFloat(stock['4. close'])) * yPerUnitValue;

      if (parseFloat(stock['4. close']) > parseFloat(stock['1. open'])) {
        // stock.trend = 'bull'
        createSymbol('bull', plot, x, open, high, low, close);
      } else if (parseFloat(stock['4. close']) < parseFloat(stock['1. open'])) {
        // stock.trend = 'bear'
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