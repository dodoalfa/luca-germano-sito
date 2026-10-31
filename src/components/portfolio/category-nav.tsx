"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { categories } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const items = [{ href: "/portfolio", label: "Tutti" }, ...categories.map((c) => ({ href: `/portfolio/${c.slug}`, label: c.label }))];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Categorie" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
      <ul className="flex min-w-max gap-6 md:gap-10">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "eyebrow block pb-3 transition-opacity hover:opacity-100",
                  active ? "opacity-100" : "opacity-50"
                )}
              >
                {item.label}
              </Link>
              {active && (
                <motion.span
                  layoutId="category-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
