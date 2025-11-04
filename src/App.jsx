import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";
import ConfirmPopup from "./Components/ConfirmPopup";

function App() {
  const [colors, setColors] = useState(initialColors);
  const [toDelete, setToDelete] = useState(null);
  const [toEdit, setToEdit] = useState(null);

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
  }

  function handleDeleteRequest(id) {
    setToDelete(id);
  }

  function onConfirmDeleteColor() {
    const updatedColors = colors.filter((color) => color.id !== toDelete);
    setColors(updatedColors);
    setToDelete(null);
  }

  function onCancelDeleteColor(color) {
    setToDelete(color);
  }

  function handleEditRequest(color) {
    setToEdit(color);
  }

  function onConfirmEditColor(updatedColor) {
    const updatedColors = colors.map((color) =>
      color.id === updatedColor.id ? updatedColor : color
    );
    setColors(updatedColors);
    setToEdit(null);
  }

  function onCancelEditColor() {
    setToEdit(null);
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
              onEditColor={() => handleEditRequest(color)}
              toEdit={toEdit}
              onConfirmEdit={onConfirmEditColor}
              onCancelEdit={onCancelEditColor}
            />
          );
        })
      )}
      {toDelete && (
        <ConfirmPopup
          onConfirm={onConfirmDeleteColor}
          onDelete={onCancelDeleteColor}
        />
      )}
    </>
  );
}

export default App;
