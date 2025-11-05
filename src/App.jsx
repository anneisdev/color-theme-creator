import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";
import "./App.css";
import { uid } from "uid";
import ConfirmPopup from "./Components/ConfirmPopup";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [toDelete, setToDelete] = useState(null);
  const [toEdit, setToEdit] = useState(null);

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
  }

  function handleDeleteRequest(id) {
    setToDelete(id);
  }

  // function onConfirmDeleteColor() {
  //   const updatedColors = colors.filter((color) => color.id !== toDelete);
  //   setColors(updatedColors);
  //   setToDelete(null);
  // }

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

  // if textcolor copied to clipboard, inserted in form & tectcolor same as hex
  // SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
  // data returns empty -> json method cant read and crashes?? error loop?
  // solved: try catch
  async function handleComparison(color) {
    try {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("1");
    }
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
              comparison={handleComparison}
            />
          );
        })
      )}
      {toDelete && (
        <ConfirmPopup
          onConfirm={() => {
            setColors(colors.filter((color) => color.id !== toDelete));
            setToDelete(null);
          }}
          onDelete={() => {
            setToDelete(null);
          }}
        />
      )}
    </>
  );
}

export default App;
