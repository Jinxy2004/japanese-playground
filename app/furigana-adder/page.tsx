"use client";

import { useState } from "react";

export default function FuriganaAdder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  function handleConvert() {
    const converted = inputText;
    setOutputText(converted);
  }

  return (
    <div className="flex flex-col h-screen items-center justify-start py-5">
      <textarea
        value={inputText}
        // Because the components state is controlled by inputText which is managed by react state we have to use onChange for the users text to update the UI.
        onChange={(e) => setInputText(e.target.value)}
        className="w-[30%] h-[30%] bg-foreground/30 border border-gray-100 rounded-md px-3
      align-text-top"
      ></textarea>
      <button onClick={handleConvert}>Get Text</button>
      <textarea
        readOnly
        value={outputText}
        className="w-[30%] h-[30%] bg-foreground/30 border border-gray-100 rounded-md px-3
      align-text-top"
      ></textarea>
    </div>
  );
}
