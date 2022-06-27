import p5 from "p5";
import React from "react";
import Sketch from "react-p5";

import { drawTextRepresentation } from "./utils/draw-utils";

const Tattoo = ({
  text,
  inverted,
  drawBitsFromOutsideToInside,
  drawLastPolygon,
  drawStrokes,
  sidesPerLetter
}) => {
  const P5Ref = React.useRef()
  React.useEffect(() => {
    P5Ref.current?.redraw()
  })

  const setup = React.useCallback((p5, canvasParentRef) => {
    P5Ref.current = p5
    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.createCanvas(
      canvasParentRef.offsetWidth,
      canvasParentRef.offsetHeight
    ).parent(canvasParentRef);
    p5.noLoop()
  }, []);

  const draw = React.useCallback(
    (p5) => {
      p5.translate(p5.width * 0.5, p5.height * 0.5);
      p5.background(255);
      drawTextRepresentation(p5, {
        text,
        sidesPerLetter,
        inverted,
        drawLastPolygon,
        drawBitsFromOutsideToInside,
        drawStrokes
      });
    },
    [
      text,
      drawLastPolygon,
      inverted,
      drawBitsFromOutsideToInside,
      drawStrokes,
      sidesPerLetter
    ]
  );

  return <Sketch className="Sketch" setup={setup} draw={draw} />;
};

export { Tattoo };
