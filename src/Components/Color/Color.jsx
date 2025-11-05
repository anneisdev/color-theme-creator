import { useEffect, useState } from "react";
import Button from "../Button";
import ColorForm from "../ColorForm";
import CopyToClipboard from "../CopyToClipboard";
import "./Color.css";

export default function Color({
  color,
  onDeleteColor,
  onEditColor,
  toEdit,
  onConfirmEdit,
  onCancelEdit,
  comparison,
}) {
  const [apiComparison, setApiComparison] = useState();
  const isEditing = toEdit?.id === color.id;
  
  function getDeleteFunction() {
    onDeleteColor(color.id);
  }

  useEffect(() => {
    async function fetchComparison() {
      const result = await comparison(color);
      setApiComparison(result.overall);
    }

    fetchComparison();
  }, [color, comparison]);

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
      <Button onClick={getDeleteFunction}>DELETE</Button>
      <Button onClick={() => onEditColor(color)}>EDIT</Button>

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
