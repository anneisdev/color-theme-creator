import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
    console.log(colors);
  }

  function handleDeleteColor(id) {
    const isConfirmed = confirm("are you sure?");
    if (!isConfirmed) {
      return;
    }

    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        );
      })}
    </>
  );
}

export default App;
