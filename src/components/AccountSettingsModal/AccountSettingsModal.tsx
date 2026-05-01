"use client";

import ActionRow from "../ActionRow/ActionRow";
import { AuthorizedAccountFromAPI } from "@/db/schema";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal/Modal";
import { nullish } from "@/lib/api";

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>
}) => {
  let [bio, setBio] = useState(props.account.bio ?? "");
  let [displayName, setDisplayName] = useState(props.account.displayName ?? "");
  let [pronouns, setPronouns] = useState(props.account.pronouns ?? "");
  let [username, setUsername] = useState(props.account.username);

  let [error, setError] = useState("");

  return (
    <Modal>
      <form onSubmit={async (event) => {
        event.preventDefault();

        const res = await fetch(`/u/${props.account.username}`, {
          method: "PUT",
          body: JSON.stringify({
            bio,
            displayName,
            pronouns,
            username
          })
        });

        if (!res.ok) {
          setError(await res.text());
          return;
        }

        props.setAccount({
          admin: props.account.admin,
          bio: nullish(bio),
          displayName: nullish(displayName),
          email: props.account.email,
          id: props.account.id,
          joined: props.account.joined,
          nameFont: nullish(props.account.nameFont),
          pronouns: nullish(pronouns),
          username
        });
        props.closeModal();
      }}>
        <label>
          <div>Display Name</div>
          <input type="text" value={displayName} placeholder={username} onChange={(event) => setDisplayName(event.currentTarget.value)} />
        </label>
        <label>
          <div>Username</div>
          <input type="text" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
        </label>
        <label>
          <div>Pronouns</div>
          <input type="text" value={pronouns} onChange={(event) => setPronouns(event.currentTarget.value)} />
        </label>
        <label>
          <div>Bio</div>
          <textarea value={bio} onChange={(event) => setBio(event.currentTarget.value)}></textarea>
        </label>
        <ActionRow>
          <button className="action" onClick={props.closeModal}>Cancel</button>
          <input type="submit" value="Save profile" />
        </ActionRow>
      </form>
      <div style={{
        boxSizing: "content-box",
        height: `${error.length > 0 ? 1 : 0}lh`,
        overflow: "hidden",
        paddingTop: `${error.length > 0 ? 1 : 0}rem`,
        transition: "0.25s"
      }}>{error}</div>
    </Modal>
  );
};

export default AccountSettingsModal;
