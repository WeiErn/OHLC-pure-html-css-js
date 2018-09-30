import createLine from './line';
const svgNS = "http://www.w3.org/2000/svg";

function createYLabel (labelClass, height, yMin, yMax, stepSize, graph) {

  const labelGroup = document.createElementNS(svgNS, 'g');
  labelGroup.classList.add('labels');
  labelGroup.classList.add(labelClass);

  const numOfIntervals = (yMax-yMin)/stepSize + 1;
  const incr = height / numOfIntervals;
  let y = 26;

  for (let i = 0; i < numOfIntervals; i++) {
    let text = document.createElementNS(svgNS, 'text');

    // add text
    text.setAttribute('x', '70');
    text.setAttribute('y', `${y}`);
    text.textContent = `${yMax-i*stepSize}`;

    labelGroup.appendChild(text);

    // add tick
    let tick = createLine('tick', '85', '90', `${y-3.5}`, `${y-3.5}`);

    labelGroup.appendChild(tick);

    y = y + incr;
  }

  const labelTitle = document.createElementNS(svgNS, 'text');
  labelTitle.setAttribute('x', '40');
  labelTitle.setAttribute('y', `${15+height/2}`);
  labelTitle.textContent = 'Price';
  labelGroup.appendChild(labelTitle);

  graph.appendChild(labelGroup);
}

export default createYLabel;