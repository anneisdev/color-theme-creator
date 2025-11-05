import { useEffect, useState } from "react";
import Button from "./Button";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(hex);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <>
      <Button onClick={handleCopy}>
        {isCopied ? "SUCCESSFULLY COPIED!" : "COPY"}
      </Button>
    </>
  );
}
