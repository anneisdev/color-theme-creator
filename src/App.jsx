import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";
import ConfirmPopup from "./Components/ConfirmPopup";

function App() {
  const [colors, setColors] = useState(initialColors);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
  }

  function handleDeleteRequest(id) {
    setConfirmDelete(id);
  }

  function onConfirmDeleteColor() {
    const updatedColors = colors.filter((color) => color.id !== confirmDelete);
    setColors(updatedColors);
    setConfirmDelete(null);
  }

  function onCancelDeleteColor() {
    setConfirmDelete(null);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.length === 0 ? (
        <h2>add a color?</h2>
      ) : (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDeleteColor={handleDeleteRequest}
            />
          );
        })
      )}

      {confirmDelete && (
        <ConfirmPopup
          onConfirm={onConfirmDeleteColor}
          onDelete={onCancelDeleteColor}
        />
      )}
    </>
  );
}

export default App;
