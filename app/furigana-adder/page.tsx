"use client";

import { useRef } from "react";

export default function FuriganaAdder() {
  // Stores a const reference to the text area object
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function getTextFromTextArea() {
    const text = textareaRef.current?.value;
    console.log(text);
  }

  return (
    <div className="flex h-screen items-start justify-center py-5">
      <textarea
        ref={textareaRef} // Tells the textareaRef to refer to this textarea
        id="textbox"
        className="w-[30%] h-[30%] bg-foreground/30 border border-gray-100 rounded-md px-3
      align-text-top"
      ></textarea>
      <button onClick={getTextFromTextArea}>Get Text</button>
    </div>
  );
}
