import Button from "./Button";

export default function ConfirmPopup({ onConfirm, onDelete }) {
  return (
    <div className="color-card-highlight">
      <p>Are you sure you want to delete this color?</p>
      <div>
        <Button onClick={onConfirm}>Yes/</Button>
        <Button onClick={onDelete}>No</Button>
      </div>
    </div>
  );
}
