import { useState } from "react";

export default function ColorInput({ name, defaultValue }) {
  const [colorPickValue, setColorPickValue] = useState(defaultValue);

  if (!defaultValue) {
    defaultValue = "";
  }

  function onColorPick(event) {
    setColorPickValue(event.target.value);
  }
  return (
    <>
      <input
        type="text"
        name={name}
        value={colorPickValue}
        onChange={onColorPick}
      ></input>
      <input type="color" value={colorPickValue} onChange={onColorPick}></input>
    </>
  );
}
