const svgNS = "http://www.w3.org/2000/svg";

function createAxis (axisId, width, height, graph) {
  const axisGroup = document.createElementNS(svgNS, 'g');
  axisGroup.classList.add('axis-group');
  axisGroup.setAttribute('id', axisId);

  const axis = document.createElementNS(svgNS, 'line');
  axis.classList.add('axis');
  axis.setAttribute('x1', '90');
  axis.setAttribute('x2', `${90+width}`);
  axis.setAttribute('y1', `${370-height}`);
  axis.setAttribute('y2', '370');

  axisGroup.appendChild(axis);

  graph.appendChild(axisGroup)
}

export default createAxis;