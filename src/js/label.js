const svgNS = "http://www.w3.org/2000/svg";

function createLabel (labelId, x, y, width, height, graph) {
  const labelGroup = document.createElementNS(svgNS, 'g');
  labelGroup.classList.add('label-group');
  labelGroup.setAttribute('id', labelId);

  if (!width && width > 0) {

  }

  const label = document.createElementNS(svgNS, 'line');
  label.classList.add('label');
  label.setAttribute('x1', '90');
  label.setAttribute('x2', `${90+width}`);
  label.setAttribute('y1', `${370-height}`);
  label.setAttribute('y2', '370');

  labelGroup.appendChild(label);
  graph.appendChild(labelGroup)
}

function createYLabel (labelClass, height, graph) {

  const labelGroup = document.createElementNS(svgNS, 'g');
  labelGroup.classList.add('labels');
  labelGroup.classList.add(labelClass);

  const incr = height / 21;
  let y = 15;

  for (let i = 0; i < 21; i++) {
    let text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', '80');
    text.setAttribute('y', `${y}`);
    text.textContent = `${200-i*10}`;

    labelGroup.appendChild(text);
    y = y + incr;
  }

  const labelTitle = document.createElementNS(svgNS, 'text');
  labelTitle.setAttribute('x', '50');
  labelTitle.setAttribute('y', `${15+height/2}`);
  labelTitle.textContent = 'Price';
  labelGroup.appendChild(labelTitle);

  graph.appendChild(labelGroup);
}

export default createYLabel;