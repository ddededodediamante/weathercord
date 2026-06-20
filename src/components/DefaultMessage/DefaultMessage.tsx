"use client";

import { l10nValue } from "@/lib/l10n.generated";
import { l10nStore, localize } from "./localize";
import { ReactNode, useSyncExternalStore } from "react";
import reactStringReplace from "react-string-replace";

const DefaultMessage = (props: {
  id: l10nValue,
  values?: Record<string, ReactNode | string>
}) => {
  useSyncExternalStore(l10nStore.subscribe, l10nStore.getSnapshot); // update all DefaultMessages when language changes
  let data: string | ReactNode[] = localize(props.id);
  for (const key in props.values) {
    data = reactStringReplace(data, `{{${key}}}`, (_, i) => (
      <span key={Math.random()}>
        {props.values?.[key]}
      </span>
    ));
  }
  return data;
};

export const defaultMessage = (id: l10nValue, values?: Record<string, string>) => {
  let data = localize(id);
  for (const key in values) {
    data = data.replaceAll(`{{${key}}}`, values[key]);
  }
  return data;
}

export default DefaultMessage;
