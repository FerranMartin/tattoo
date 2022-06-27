export const FORMATS = {
  SOLID: "solid",
  EMPTY: "EMPTY",
  OUTLINE: "outline"
};

/**
 * FORMATS TO IMPLEMENT
 *  - parallel lines
 *  - concentric lines
 */

export function bit(
  p5,
  { format = FORMATS.OUTLINE, totalLetters, ...bitProps }
) {
  const angle = p5.TWO_PI / totalLetters;
  const _bitProps = { ...bitProps, angle };

  switch (format) {
    case FORMATS.SOLID:
      solidBit(p5, _bitProps);
      break;

    case FORMATS.EMPTY:
      emptyBit(p5, _bitProps);
      break;

    case FORMATS.OUTLINE:
      outlineBit(p5, _bitProps);
      break;

    default:
      break;
  }
}

function solidBit(
  p5,
  {
    center,
    letterIndex,
    bitIndex,
    angle,
    totalBits,
    mostOuterRadius,
    drawBitsFromOutsideToInside
  }
) {
  p5.push();
  p5.fill(0, 0, 0);
  p5.beginShape();

  let firstAngle = angle * letterIndex;
  let secondAngle = angle * (letterIndex + 1);

  const _bitIndex = drawBitsFromOutsideToInside
    ? totalBits - bitIndex - 1
    : bitIndex;

  let outerRadius = (_bitIndex + 1) * (mostOuterRadius / totalBits);
  let innerRadius = _bitIndex * (mostOuterRadius / totalBits);

  const x1 = center.y + p5.cos(firstAngle) * outerRadius;
  const y1 = center.x + p5.sin(firstAngle) * outerRadius;
  p5.vertex(x1, y1);

  const x2 = center.y + p5.cos(secondAngle) * outerRadius;
  const y2 = center.x + p5.sin(secondAngle) * outerRadius;
  p5.vertex(x2, y2);

  const x3 = center.y + p5.cos(secondAngle) * innerRadius;
  const y3 = center.x + p5.sin(secondAngle) * innerRadius;
  p5.vertex(x3, y3);

  const x4 = center.y + p5.cos(firstAngle) * innerRadius;
  const y4 = center.x + p5.sin(firstAngle) * innerRadius;
  p5.vertex(x4, y4);

  p5.rotate(-p5.PI / 2);
  p5.endShape(p5.CLOSE);
  p5.pop();
}

function emptyBit() { }

function outlineBit(
  p5,
  {
    center,
    letterIndex,
    bitIndex,
    angle,
    totalBits,
    mostOuterRadius,
    drawBitsFromOutsideToInside
  }
) {
  p5.push();
  p5.noFill();
  p5.beginShape();

  let firstAngle = angle * letterIndex;
  let secondAngle = angle * (letterIndex + 1);

  const _bitIndex = drawBitsFromOutsideToInside
    ? totalBits - bitIndex - 1
    : bitIndex;

  let outerRadius = (_bitIndex + 1) * (mostOuterRadius / totalBits);
  let innerRadius = _bitIndex * (mostOuterRadius / totalBits);

  const x1 = center.y + p5.cos(firstAngle) * outerRadius;
  const y1 = center.x + p5.sin(firstAngle) * outerRadius;
  p5.vertex(x1, y1);

  const x2 = center.y + p5.cos(secondAngle) * outerRadius;
  const y2 = center.x + p5.sin(secondAngle) * outerRadius;
  p5.vertex(x2, y2);

  const x3 = center.y + p5.cos(secondAngle) * innerRadius;
  const y3 = center.x + p5.sin(secondAngle) * innerRadius;
  p5.vertex(x3, y3);

  const x4 = center.y + p5.cos(firstAngle) * innerRadius;
  const y4 = center.x + p5.sin(firstAngle) * innerRadius;
  p5.vertex(x4, y4);

  p5.rotate(-p5.PI / 2);
  p5.endShape(p5.CLOSE);
  p5.pop();
}
