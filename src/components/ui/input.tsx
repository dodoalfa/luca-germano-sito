import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 border-0 border-b border-border bg-transparent px-0 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/60 focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 [color-scheme:light] dark:[color-scheme:dark]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
