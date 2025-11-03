import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
    console.log(colors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
