export const nullish = (value: string | null) => typeof value === "string" && value.length < 1 ? null : value;
