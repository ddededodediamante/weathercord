export const nullish = (value: string | null) => (typeof value === "string" && value.trim().length > 0) ? value.trim() : null;
