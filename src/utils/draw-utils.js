import { bit, FORMATS } from "./bit";

const TOTAL_BITS_PER_LETTER = 8;
const OUTER_RADIUS = 150;

export { drawTextRepresentation, FORMATS, OUTER_RADIUS };

function drawTextRepresentation(
  p5,
  {
    text,
    drawLastPolygon = true,
    drawBitsFromOutsideToInside = true,
    inverted = false,
    drawStrokes = false,
    sidesPerLetter = 1,

    bitsFormat = {},
    mostOuterRadius = OUTER_RADIUS,
    totalBitsPerLetter = TOTAL_BITS_PER_LETTER,
    center = { x: 0, y: 0 }
  }
) {
  const bits = textToBin({ text, inverted });
  const totalLetters = bits.length * sidesPerLetter;

  for (let letterIndex = 0; letterIndex < totalLetters; letterIndex++) {
    for (let bitIndex = 0; bitIndex < totalBitsPerLetter; bitIndex++) {
      const _letterIndex = p5.floor(letterIndex / sidesPerLetter);
      const format = bits[_letterIndex][bitIndex]
        ? FORMATS.SOLID
        : FORMATS.EMPTY;

      bit(p5, {
        center,
        letterIndex: letterIndex,
        bitIndex: bitIndex,
        totalLetters,
        drawStrokes,
        drawBitsFromOutsideToInside,
        format,
        mostOuterRadius,
        totalBits: totalBitsPerLetter
      });
    }
  }

  if (drawLastPolygon) {
    polygon(p5, { center, radius: mostOuterRadius, npoints: totalLetters });
  }
}

function textToBin({ text, inverted = false }) {
  const output2 = text.split("").map((char) => {
    const bin = char.charCodeAt().toString(2);
    const paddedBin =
      Array(TOTAL_BITS_PER_LETTER - bin.length + 1).join("0") + bin;

    const checkFnc = inverted ? (bit) => bit === "0" : (bit) => bit === "1";
    return paddedBin.split("").map(checkFnc);
  });
  return output2;
}

function polygon(p5, { center, radius, npoints }) {
  p5.push();
  p5.noFill();
  const angle = p5.TWO_PI / npoints;
  p5.beginShape();
  for (let a = 0; a < p5.TWO_PI; a += angle) {
    let sx = center.x + p5.cos(a) * radius;
    let sy = center.y + p5.sin(a) * radius;
    p5.vertex(sx, sy);
  }
  p5.rotate(-p5.PI / 2);
  p5.endShape(p5.CLOSE);
  p5.pop();
}
