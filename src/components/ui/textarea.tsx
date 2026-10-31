import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-28 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/60 focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
