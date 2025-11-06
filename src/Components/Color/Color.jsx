import { useEffect, useState } from "react";
import Button from "../Button/Button";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import "./Color.css";
import ConfirmPopup from "../ConfirmPopUp/ConfirmPopup";

export default function Color({ color, onDelete, onEdit }) {
  const [apiComparison, setApiComparison] = useState();
  const [apiError, setApiError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(false);

  //error when contrasttext & hex the same
  useEffect(() => {
    async function fetchComparison() {
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
        setApiComparison(data.overall);
      } catch (error) {
        setApiError(true);
      }
    }
    fetchComparison();
  }, [color]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <CopyToClipboard hex={color.hex}></CopyToClipboard>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <p>Overall Contrast Score: {apiComparison}</p>
      {apiError && (
        <p className="color-card-highlight">
          Error when loading contrast comparison. Choose a new contrast Color
        </p>
      )}

      {colorToDelete ? (
        <ConfirmPopup
          onConfirm={() => {
            onDelete(color.id);
            setColorToDelete(false);
          }}
          onDelete={() => {
            setColorToDelete(false);
          }}
        />
      ) : (
        <>
          <Button onClick={() => setColorToDelete(true)}>DELETE</Button>
          <Button onClick={() => setIsEditing(true)}>EDIT</Button>
        </>
      )}
      {isEditing && (
        <ColorForm
          originalColor={color}
          onConfirmEdit={(newColor) => {
            onEdit(newColor);
            setIsEditing(false);
          }}
          onCancelEdit={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
