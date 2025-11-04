import Button from "./Button";
import ColorInput from "./ColorInput";

export default function ColorForm({
  onAddColor,
  originalColor,
  onConfirmEdit,
  onCancelEdit,
}) {
  function handleSubmitColor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (originalColor) {
      onConfirmEdit({ ...originalColor, ...data });
    } else {
      onAddColor(data);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitColor}>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          defaultValue={originalColor ? originalColor.role : "some color"}
        ></input>

        <label htmlFor="hex">Hex</label>
        <ColorInput
          name="hex"
          defaultValue={originalColor ? originalColor.hex : "#ff4a11"}
        />

        <label htmlFor="contrastText">Contrast Text</label>
        <ColorInput
          name="contrastText"
          defaultValue={originalColor ? originalColor.contrastText : "#ffffff"}
        />

        <Button type="submit">
          {originalColor ? "EDIT COLOR" : "ADD COLOR"}
        </Button>

        {originalColor && (
          <Button type="button" onClick={onCancelEdit}>
            CANCEL
          </Button>
        )}
      </form>
    </>
  );
}