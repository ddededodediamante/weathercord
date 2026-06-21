import { l10nValue } from "./l10n.generated";

export type l10n = Record<l10nValue, string>;

let localized: l10n;
type Listener = () => void;
const storeListeners = new Set<Listener>();
export const l10nStore = {
  getSnapshot: () => localized,
  subscribe: (listener: Listener) => {
    storeListeners.add(listener);
    return () => storeListeners.delete(listener);
  }
};
export const setl10nData = async (code: string) => {
  localized = (await (await fetch(`/l10n/${code}.json`)).json()) as l10n;
  storeListeners.forEach((listener) => listener());
};

export const localize = (item: l10nValue) => localized?.[item] ?? item;

export interface Language {
  name: string;
  code: string;
}

export const languages: Language[] = [
  {
    name: "English (US)",
    code: "en-us"
  },
  {
    name: "Español (Latinoamérica)",
    code: "es-419"
  },
  {
    name: "toki pona",
    code: "tok"
  }
];
