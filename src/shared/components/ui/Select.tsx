import React, { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/utils/cn";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: "default" | "small" | "large";
  }
>(({ className, children, size = "default", ...props }, ref) => {
  const sizeStyles = {
    default: "px-4 py-3 text-base",
    small: "px-3 py-2 text-sm rounded-lg",
    large: "px-5 py-4 text-lg",
  };

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full items-center justify-between rounded-lg border-1 bg-white",
        sizeStyles[size],
        "transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "border-default-dark/50 hover:bg-default-dark/10 hover:border-default-dark/50",
        "text-default-dark/50 data-[state=open]:text-default-dark",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    size?: "default" | "small" | "large";
  }
>(
  (
    { className, children, position = "popper", size = "default", ...props },
    ref,
  ) => {
    const sizeStyles = {
      default: "text-base",
      small: "text-sm",
      large: "text-lg",
    };

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border-1 bg-white text-secondary-900 shadow-md",
            sizeStyles[size],
            "border-secondary-600",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className,
          )}
          position={position}
          {...props}
        >
          <SelectPrimitive.Viewport
            className={cn(
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full",
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    size?: "default" | "small" | "large";
    variant?: "primary" | "admin";
  }
>(
  (
    { className, children, size = "default", variant = "admin", ...props },
    ref,
  ) => {
    const sizeStyles = {
      default: "p-3 text-base",
      small: "p-2 text-sm",
      large: "p-4 text-lg",
    };

    const variantStyles = {
      primary:
        "focus:bg-primary-500/20 data-[highlighted]:bg-primary-500/20 data-[highlighted]:text-primary-500",
      admin:
        "focus:bg-[#2A1F5C]/10 data-[highlighted]:bg-[#2A1F5C]/10 data-[highlighted]:text-[#2A1F5C]",
    };

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default select-none items-center outline-none text-default-dark",
          sizeStyles[size],
          variantStyles[variant],
          "data-[highlighted]:outline-none",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
