import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type Project = {
  slug: string;
  year: number;
  stack: string[];
  url?: string;
  repo?: string;
  title: Localized<string>;
  summary: Localized<string>;
  role: Localized<string>;
};

// Add 3-6 projects here. Content lives apart from components on purpose.
export const projects: Project[] = [];
