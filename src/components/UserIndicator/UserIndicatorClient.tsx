"use client";

import { ReactNode, useState } from "react";

const UserIndicatorClient = (props: Record<string, any> & {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`block${open ? " group open" : ""}`} onClick={(event) => {
      if (event.currentTarget) setOpen(!open);
    }}>
      {props.children}
    </div>
  );
};

export default UserIndicatorClient;
