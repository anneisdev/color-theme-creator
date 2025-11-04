import Button from "../Button";
import ColorForm from "../ColorForm";
import "./Color.css";

export default function Color({
  color,
  onDeleteColor,
  onEditColor,
  toEdit,
  onConfirmEdit,
  onCancelEdit,
}) {
  function getDeleteFunction() {
    onDeleteColor(color.id);
  }

  const isEditing = toEdit?.id === color.id;

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
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
