import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const links = ["about", "projects", "skills", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-2">
        <nav aria-label="Main" className="flex gap-6 text-sm">
          {links.map((id) => (
            <a key={id} href={`#${id}`} className="hover:text-accent transition-colors">
              {t(id)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
