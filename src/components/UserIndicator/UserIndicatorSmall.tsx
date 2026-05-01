"use client";

import Box from "../Box/Box";
import BoxButton from "../BoxButton/BoxButton";
import type { PublicAccount } from "@/db/schema";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

const UserIndicatorSmall = (props: Record<string, any> & PublicAccount & {
  avatar: string,
  canEdit: boolean,
  splash?: string,
}) => {
  return (
    <Box className={"p-[0.7rem] text-left h-4 flex gap-[0.7rem] items-center overflow-hidden " + props.className} style={{
      backgroundImage: props.splash ? `linear-gradient(90deg, #000000ab 0%, #00000090 100%), url(${props.splash})` : null,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <img className="rounded-full h-[2.6rem] group-[.open]:-translate-y-10" src={props.avatar} alt={props.displayName + "'s avatar"} style={{
        transition: "translate 0.25s"
      }} />
      <div className="leading-1 grow group-[.open]:-translate-y-10" style={{
        transition: "translate 0.25s"
      }}>
        <span style={{
          fontFamily: props.nameFont
        }}>{props.displayName}</span><br />
        <sub>@{props.username}</sub>
      </div>
      {props.canEdit &&
        <BoxButton>
          <Settings strokeWidth="1.5" />
        </BoxButton>
      }
    </Box>
  );
};

export default UserIndicatorSmall;
