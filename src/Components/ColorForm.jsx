import ColorInput from "./ColorInput";

export default function ColorForm({ onAddColor }) {
  function handleSubmitColor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddColor(data);
  }

  return (
    <>
      <form onSubmit={handleSubmitColor}>
        <label htmlFor="role">Role</label>
        <input type="text" name="role" defaultValue="some color"></input>
        <label htmlFor="hex">Hex</label>
        <ColorInput name="hex" defaultValue="#ff4a11" />
        <label htmlFor="contrastText">Contrast Text</label>
        <ColorInput name="contrastText" defaultValue="#ffffff" />
        <input type="submit" value="ADD COLOR"></input>
      </form>
    </>
  );
}
