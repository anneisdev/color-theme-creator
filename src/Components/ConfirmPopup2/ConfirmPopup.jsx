import Button from "../Button/Button";

export default function ConfirmPopup({ onConfirm, onDelete }) {
  return (
    <div className="color-card-highlight">
      <p>Really delete?</p>
      <Button onClick={onConfirm}>Yes</Button>
      <Button onClick={onDelete}>No</Button>
    </div>
  );
}
