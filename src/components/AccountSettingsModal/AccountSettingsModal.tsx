"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import BoxButton from "../BoxButton/BoxButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ProfileTab from "./ProfileTab";
import { X } from "lucide-react";
import ConnectionsTab from "./ConnectionsTab";

export enum Tab {
  Profile = 0,
  Connections = 1
};

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  startingTab?: Tab
}) => {
  const tabs = Object.keys(Tab).filter((value) => isNaN(parseInt(value))).length - 1;

  let [tab, setTab] = useState(props.startingTab || Tab.Profile);
  let [hoveredTab, setHoveredTab] = useState(tabs + 1);
  let [tabY, setTabY] = useState(0);

  const updateTabY = () => {
    setTabY(tabY + (hoveredTab - tabs - tabY) / 3);
    requestAnimationFrame(updateTabY);
  };

  requestAnimationFrame(updateTabY);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
      <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={props.closeModal}><X /></BoxButton>
      <div className="w-15 shrink-0 -m-2 p-2 pr-1 -mr-1 overflow-auto relative">
        <div className="rounded-xl absolute" style={{
          width: `calc(100% - 3rem - ${Math.abs(hoveredTab - tabs - tabY)}rem * 6)`,
          height: `calc(1lh + 0.6rem + ${Math.abs(hoveredTab - tabs - tabY)}rem * 2)`,
          left: "8rem",
          top: `calc((1lh + 0.6rem) * ${tabY} + (0.5lh + 0.3rem))`,
          translate: "-50% -50%",
          transition: "width 0.2s, height 0.25s, top 0.1s, background-color 0.3s",
          backgroundColor: tab === (hoveredTab - tabs - 1) ? "var(--accent-background)" : "var(--box-button-active)"
        }} />
        <div className="contents" onMouseLeave={() => setHoveredTab(tab + tabs + 1)}>
          {Object.keys(Tab).map((t, index) => {
            if (isNaN(parseInt(t))) return (
              <button key={index} onMouseEnter={() => setHoveredTab(index)} className={"w-full text-left cursor-pointer transition relative z-1 text-(--sub) hover:text-inherit" + (Tab[tab] === t ? " text-(--accent)!" : "")} onClick={() => setTab(Tab[t as keyof typeof Tab])} style={{
                padding: "0.3rem 0.8rem"
              }}>{t}</button>
            )
          })}
        </div>
      </div>
      <div className="grow overflow-auto -m-2 p-2 pl-1 -ml-1">
        {tab === Tab.Profile &&
          <ProfileTab account={props.account} setAccount={props.setAccount} />
        }
        {tab === Tab.Connections &&
          <ConnectionsTab account={props.account} />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
