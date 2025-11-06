import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    const updatedColors = [{ id: uid(), ...newColor }, ...colors];
    setColors(updatedColors);
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
              onDelete={(id) => {
                setColors(colors.filter((color) => color.id !== id));
              }}
              onEdit={(newColor) => {
                setColors(
                  colors.map((color) =>
                    color.id === newColor.id ? newColor : color
                  )
                );
              }}
            />
          );
        })
      )}
    </>
  );
}

export default App;

/** 
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
    */
