import createLine from './line';
const svgNS = "http://www.w3.org/2000/svg";

// function createLabel (labelId, x, y, width, height, graph) {
//   const labelGroup = document.createElementNS(svgNS, 'g');
//   labelGroup.classList.add('label-group');
//   labelGroup.setAttribute('id', labelId);
//
//   if (!width && width > 0) {
//
//   }
//
//   const label = document.createElementNS(svgNS, 'line');
//   label.classList.add('label');
//   label.setAttribute('x1', '90');
//   label.setAttribute('x2', `${90+width}`);
//   label.setAttribute('y1', `${370-height}`);
//   label.setAttribute('y2', '370');
//
//   labelGroup.appendChild(label);
//   graph.appendChild(labelGroup)
// }

function createYLabel (labelClass, height, graph, yMin, yMax) {

  const labelGroup = document.createElementNS(svgNS, 'g');
  labelGroup.classList.add('labels');
  labelGroup.classList.add(labelClass);

  const numOfIntervals = (yMax-yMin)/10 + 1;
  const incr = height / numOfIntervals;
  let y = 26;

  for (let i = 0; i < numOfIntervals; i++) {
    let text = document.createElementNS(svgNS, 'text');

    // add text
    text.setAttribute('x', '70');
    text.setAttribute('y', `${y}`);
    text.textContent = `${yMax-i*10}`;

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