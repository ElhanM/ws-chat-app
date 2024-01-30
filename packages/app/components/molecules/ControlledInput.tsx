import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  useFormState,
} from "react-hook-form";
import Input from "../atoms/Input";

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label: string;
  type: string;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<"input">;

const ControlledInput = <TFormValues extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  ...rest
}: Props<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();
  const { errors } = useFormState<TFormValues>();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            label={label}
            type={type}
            placeholder={placeholder}
            {...field}
            {...rest}
          />
        )}
      />
      {typeof errors[name]?.message === "string" && (
        <span className="text-sm text-red-500">
          {(errors[name]?.message as string).charAt(0).toUpperCase() +
            (errors[name]?.message as string).slice(1)}
        </span>
      )}
    </>
  );
};

export default ControlledInput;
