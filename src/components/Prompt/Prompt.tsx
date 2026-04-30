"use client";

import Box from "../Box/Box";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const Prompt = (props: Record<string, any> & {
  // message: string,
  // setMessage: Dispatch<SetStateAction<boolean>>
}) => {
  const [message, setMessage] = useState("");
  const [currentTarget, setCurrentTarget] = useState<EventTarget & HTMLDivElement>();
  const [selection, setSelection] = useState<Selection>();
  const [offset, setOffset] = useState<number>();
  const [caretNode, setCaretNode] = useState<Node>();

  useEffect(() => {
    if (!(currentTarget && selection && offset)) return;

    currentTarget.innerHTML = message
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace(/@&amp;([a-fa-f0-9]*w[a-fA-f0-9]{14})/gm, "<span class=\"mention\" spellcheck=\"false\">@&amp;<code>$1</code></span>")
      .replace(/@([a-zA-Z0-9_.-]{0,19}[a-zA-Z0-9_-])/gm, "<span class=\"mention\" spellcheck=\"false\">@$1</span>");

    const newRange = document.createRange();

    const childNodes = currentTarget.childNodes;
    let childNode = 0;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].isEqualNode(caretNode!)) childNode = i;
    }
    let nodeOffset = 0;

    for (let i = 0; i < offset; i++) {
      if (childNodes[childNode].textContent?.length === nodeOffset) {
        childNode++;
        nodeOffset = 0;
      } else nodeOffset++;
    }

    console.log(childNodes[childNode], nodeOffset);

    newRange.setStart(childNodes[childNode], nodeOffset);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
  }, [message]);

  return (
    <Box {...props} className={"rounded-2xl " + props.className}>
      <div
        suppressContentEditableWarning
        contentEditable
        className="outline-none p-1"
        onInput={(event) => {
          event.preventDefault();

          const sel = getSelection()!;

          setCurrentTarget(event.currentTarget);
          setSelection(sel);
          setOffset(sel.getRangeAt(0).startOffset);
          setCaretNode(sel.getRangeAt(0).startContainer);

          setMessage(event.currentTarget.innerText);
        }}
        style={{
          fontFamily: message.trim().startsWith("/") ? "Maple Mono" : "inherit"
        }}
      />
    </Box>
  )
}
