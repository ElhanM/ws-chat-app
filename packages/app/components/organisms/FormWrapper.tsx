// path: packages/app/components/FormWrapper.tsx

import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type Props<TFormValues extends FieldValues> = {
  methods: UseFormReturn<TFormValues, any, undefined>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
};

const FormWrapper = <TFormValues extends FieldValues>({
  methods,
  onSubmit,
  children,
}: Props<TFormValues>) => {
  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
