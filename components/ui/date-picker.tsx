"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && <Label>{label}</Label>}
        <Input
          type="date"
          className={cn("w-full px-3 py-2 text-sm", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
