"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
};

export default function SelectField({
  name,
  label,
  placeholder,
  options,
}: SelectFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Select
            defaultValue={field.value}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="border-border">
              <SelectValue
                placeholder={placeholder}
              />
            </SelectTrigger>

            <SelectContent >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="p-2"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}