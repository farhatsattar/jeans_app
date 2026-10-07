"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

type InputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue"> & {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onValueChange?: (value: string) => void;
};

function Input({
  className,
  type,
  value,
  defaultValue,
  onChange,
  onValueChange,
  ...props
}: InputProps) {
  const isControlled = value !== undefined;

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      value={isControlled ? String(value ?? "") : undefined}
      defaultValue={
        isControlled
          ? undefined
          : defaultValue !== undefined
            ? String(defaultValue)
            : undefined
      }
      onValueChange={(next) => {
        onValueChange?.(next);
        if (onChange) {
          onChange({
            target: { value: next },
            currentTarget: { value: next },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
      {...props}
    />
  );
}

export { Input };
