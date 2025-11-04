import { useEffect, useState } from "react";
import Button from "./Button";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(hex);
    setIsCopied(true);
    console.log("this hex value is about to be copied");
    // copy the hex code
    // await navigator.clipboard.writeText(hex)
    // button info: "SUCESSFULLY COPIED!"
    // useffect timeout after 3 seconds
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
        {isCopied ? "SUCESSFULLY COPIED!" : "COPY"}
      </Button>
    </>
  );
}
