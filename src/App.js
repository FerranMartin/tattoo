import React from "react";
import { Tattoo } from "./Tattoo";
import { useBooleanSetting, useEnumSetting } from "./settings";

const App = () => {
  const [text, setText] = React.useState("enia");
  const handleChangeText = React.useCallback((event) => {
    setText(event.target.value);
  }, []);

  const [sidesPerLetter, setSidesPerLetter] = React.useState(1);
  const handleChangeSidesPerLetter = React.useCallback((event) => {
    setSidesPerLetter(event.target.value);
  }, []);

  const { value: drawLastPolygon, Setting: DrawLastPolygon } =
    useBooleanSetting({
      defaultValue: true,
      id: "drawLastPolygon",
      label: "Perfil exterior: ",
    });

  const { value: drawStrokes, Setting: DrawStrokes } = useBooleanSetting({
    defaultValue: false,
    id: "drawStrokes",
    label: "Lineas interiors: ",
  });

  const { value: inverted, Setting: Inverted } = useBooleanSetting({
    defaultValue: false,
    id: "inverted",
    label: "Invertir colors:  ",
  });

  const {
    value: drawBitsFromOutsideToInside,
    Setting: DrawBitsFromOutsideToInside,
  } = useEnumSetting({
    options: {
      outToIn: "Cap endins: ",
      inToOut: "Cap enfora: ",
    },
    defaultValue: "outToIn",
    id: "drawBitsFromOutsideToInside",
    label: "Direccio bits:",
  });

  return (
    <div className="App">
      <h1>Tattoo</h1>
      <div className="Settings">
        <span>
          <label htmlFor="text">Nom: </label>
          <select id="text" name="text" onChange={handleChangeText}>
            <option value="enia">enia</option>
            <option value="aram">aram</option>
          </select>
        </span>
        <span>
          <label htmlFor="sidesPerLetter">Costats per lletra: </label>
          <input
            id="sidesPerLetter"
            name="sidesPerLetter"
            type="number"
            value={sidesPerLetter}
            onChange={handleChangeSidesPerLetter}
          />
        </span>
        <DrawLastPolygon />
        <Inverted />
        <DrawStrokes />
        <DrawBitsFromOutsideToInside />
      </div>

      <Tattoo
        text={text}
        drawLastPolygon={drawLastPolygon}
        inverted={inverted}
        drawBitsFromOutsideToInside={drawBitsFromOutsideToInside === "outToIn"}
        drawStrokes={drawStrokes}
        sidesPerLetter={sidesPerLetter}
      />
    </div>
  );
};

export { App };
