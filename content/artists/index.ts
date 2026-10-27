import type { Artist } from "./types";
import { talwiinder } from "./talwiinder";

export const artists: Record<string, Artist> = {
  [talwiinder.slug]: talwiinder,
};

/** The artist the homepage "See demo" links point at. */
export const DEMO_ARTIST_SLUG = talwiinder.slug;

export function getArtist(slug: string): Artist | undefined {
  return artists[slug];
}
