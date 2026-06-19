import type { l10n, l10nValue } from "@/lib/l10n.generated";

let localized: l10n;

export const setl10nData = async (code: string) => localized = (await (await fetch(`/l10n/${code}.json`)).json()) as l10n;

export const localize = (item: l10nValue) => localized?.[item] ?? item;
