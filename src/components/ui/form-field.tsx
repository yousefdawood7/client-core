"use client";

import { useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import TogglePassword from "./toggle-password";

type FormFieldProps = {
  label: React.ReactNode;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function FormField({
  type = "text",
  label,
  name,
  placeholder,
  defaultValue = "",
  disabled = false,
  required = false,
}: FormFieldProps) {
  const id = useId();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { control } = useFormContext();

  function handlePasswordToggle() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>
            <span className="flex items-center gap-0.5">
              {label}
              {required && <span className="text-destructive">*</span>}
            </span>
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={id}
              name={name}
              type={
                type === "password"
                  ? isPasswordShown
                    ? "text"
                    : "password"
                  : type
              }
              placeholder={placeholder || ""}
              className="border-border focus-visible:outline-none"
            />
            {type === "password" && (
              <TogglePassword
                isPasswordShown={isPasswordShown}
                handlePasswordToggle={handlePasswordToggle}
              />
            )}
          </div>
          <div
            className={cn(
              "transition-opacity",
              fieldState.invalid ? "opacity-100" : "opacity-0",
            )}
          >
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </div>
        </Field>
      )}
    />
  );
}
