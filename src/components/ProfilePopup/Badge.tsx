"use client";

import { ReactNode, useState } from "react";
import "./badgeStyles.css";

const Badge = (props: {
  color: string,
  icon: ReactNode
  value: string
}) => {
  const [hover, setHover] = useState(false);
  const [timeout, setTimeoutState] = useState(setTimeout(() => {}));

  return (
    <sub className="flex gap-[0.2rem] items-center select-none transition" style={{
      color: props.color,
      padding: "0.3rem 0"
    }} onMouseEnter={() => {
      clearTimeout(timeout);
      setHover(false);
      setTimeout(() => {
        setHover(true);
        setTimeoutState(setTimeout(() => setHover(false), 2000));
      }, 40); // race conditions in MY weathercord?!?

    }}><div className={hover ? "hover" : ""}>{props.icon}</div><span>{props.value}</span></sub>
  );
};

export default Badge;
