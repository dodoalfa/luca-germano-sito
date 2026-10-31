"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes (state-during-render pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled && !open
          ? "border-b border-border/60 bg-background/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-10">
        {/* Left: primary navigation (desktop) */}
        <nav aria-label="Principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "eyebrow relative py-2 transition-opacity hover:opacity-100",
                      active ? "opacity-100" : "opacity-60"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Center: wordmark */}
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="col-start-1 justify-self-start md:col-start-2 md:justify-self-center"
        >
          <Logo variant="wordmark" className="w-[150px] md:w-[200px]" />
        </Link>

        {/* Right: utilities */}
        <div className="col-start-3 flex items-center justify-end gap-1 md:gap-4">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow hidden opacity-60 transition-opacity hover:opacity-100 md:inline"
          >
            Instagram
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="relative inline-flex size-10 items-center justify-center md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-6 bg-current transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[4px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-6 bg-current transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[4px]"
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-12 md:hidden"
          >
            <ul className="space-y-4">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} className="font-serif text-5xl tracking-tight">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-1 text-sm text-muted-foreground">
              <a href={`mailto:${site.email}`} className="block">{site.email}</a>
              <a href={site.phoneHref} className="block">{site.phone}</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="block">
                Instagram
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
