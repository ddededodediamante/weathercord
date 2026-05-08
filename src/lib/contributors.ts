export interface Contributor {
  id?: string;
  name?: string;
  github: {
    username: string,
    id: string
  },
  quote?: string;
}

export const contributors: readonly Contributor[] = Object.freeze([
  {
    id: "0w1bcb00925be5d2",
    name: "Rayne D.",
    github: {
      username: "raynecloudy",
      id: "129226914"
    },
    quote: "but we've been born anew, so perfectly askew..."
  }
]);
