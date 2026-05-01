"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import { Prompt } from "../Prompt/Prompt";
import UserIndicator from "../UserIndicator/UserIndicator";
import { useEffect, useState } from "react";

const GUI = () => {
  const [account, setAccount] = useState<AuthorizedAccountFromAPI>();

  useEffect(() => {
    fetch("/whoami")
      .then((res) => res.json())
      .then((account) => setAccount(account));
  }, [0]);

  // TODO: make this better
  if (!account) return (
    <div>Please log in.</div>
  );

  return (
    <>
      <UserIndicator className="w-20" avatar={"/avatar.png"} splash={"/banner.png"} canEdit {...account} />
      <Prompt className="absolute bottom-1 left-22" style={{
        width: "calc(100vw - 23rem)"
      }} />
    </>
  );
};

export default GUI;
