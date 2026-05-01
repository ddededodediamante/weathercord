"use client";

import type { PublicAccount } from "@/db/schema";
import { Cake, Shield } from "lucide-react";
import UsernameIDSwitcher from "./UsernameIDSwitcher";
import { useEffect, useState } from "react";

const ProfilePopupContent = (props: Record<string, any> & PublicAccount & {
  avatar: string,
  canEdit: boolean,
  splash?: string
}) => {
  return (
    <div className="text-left" style={props.style}>
      {props.splash &&
        <div className="h-7 w-full" aria-hidden style={{
          backgroundImage: `url(${props.splash})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      }
      <div className="p-1 flex flex-col gap-1">
        <div className="flex gap-1">
          <img className="rounded-full w-6 h-6" src={props.avatar} alt={props.displayName + "'s avatar"} />
          <div>
            <div className="text-2xl font-bold" style={{
              fontFamily: props.nameFont
            }}>{props.displayName}</div>
            <sub><UsernameIDSwitcher id={props.id} username={props.username} /></sub><br />
            <sub>{props.pronouns}</sub>
          </div>
        </div>
        {props.bio &&
          <div className="whitespace-pre-line">{props.bio}</div>
        }
        {props.admin &&
          <sub><Shield />Administrator</sub>
        }
        <sub><Cake />Joined {new Date(props.joined).toLocaleDateString()}</sub>
      </div>
    </div>
  );
};

export default ProfilePopupContent;
