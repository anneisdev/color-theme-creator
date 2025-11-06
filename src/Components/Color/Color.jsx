import { useEffect, useState } from "react";
import Button from "../Button/Button";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import "./Color.css";
import ConfirmPopup from "../ConfirmPopUp/ConfirmPopup";


export default function Color({
  color,
  onDeleteRequest,
  onEditRequest,
  colorToEdit,
  colorToDelete,
  onConfirmDelete,
  onCancelDelete,
  onConfirmEdit,
  onCancelEdit,
}) {
  const [apiComparison, setApiComparison] = useState();
  const [apiError, setApiError] = useState(false);
  const isEditing = colorToEdit?.id === color.id;

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

      {colorToDelete?.id === color.id ? (
        <ConfirmPopup onConfirm={onConfirmDelete} onDelete={onCancelDelete} />
      ) : (
        <>
          <Button onClick={() => onDeleteRequest()}>DELETE</Button>
          <Button onClick={() => onEditRequest(color)}>EDIT</Button>
        </>
      )}
      {isEditing && (
        <ColorForm
          originalColor={color}
          onConfirmEdit={onConfirmEdit}
          onCancelEdit={onCancelEdit}
        />
      )}
    </div>
  );
}
