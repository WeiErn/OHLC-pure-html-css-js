const svgNS = "http://www.w3.org/2000/svg";

function createLine(classString, x1, x2, y1, y2) {
  const line = document.createElementNS(svgNS,'line');
  line.classList.add(classString);
  line.setAttribute('x1', x1);
  line.setAttribute('x2', x2);
  line.setAttribute('y1', y1);
  line.setAttribute('y2', y2);

  return line;
}

export default createLine;