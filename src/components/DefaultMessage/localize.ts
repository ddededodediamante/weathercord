import type { l10n, l10nValue } from "@/lib/l10n.generated";

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
