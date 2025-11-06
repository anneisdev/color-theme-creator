import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [colorToDelete, setColorToDelete] = useState(null);
  const [colorToEdit, setColorToEdit] = useState(null);

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
  }

  function handleDeleteRequest(color) {
    setColorToDelete(color);
  }

  function handleEditRequest(color) {
    setColorToEdit(color);
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
              onDeleteRequest={() => handleDeleteRequest(color)}
              onEditRequest={() => handleEditRequest(color)}
              colorToEdit={colorToEdit}
              colorToDelete={colorToDelete}
              onConfirmDelete={() => {
                setColors(
                  colors.filter((color) => color.id !== colorToDelete.id)
                );
                setColorToDelete(null);
              }}
              onCancelDelete={() => {
                setColorToDelete(null);
              }}
              onConfirmEdit={(newColor) => {
                setColors(
                  colors.map((color) =>
                    color.id === newColor.id ? newColor : color
                  )
                );
                setColorToEdit(null);
              }}
              onCancelEdit={() => {
                setColorToEdit(null);
              }}
            />
          );
        })
      )}
    </>
  );
}

export default App;
