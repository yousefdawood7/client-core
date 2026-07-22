"use client";

import { useId } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FormDialogProps<TFormValues extends FieldValues> = {
  trigger: React.ReactElement;
  title: string;
  submitText?: string;
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
};

export default function FormDialog<TFormValues extends FieldValues>({
  trigger,
  title,
  submitText = "Save",
  form,
  onSubmit,
  children,
}: FormDialogProps<TFormValues>) {
  const id = useId();

  return (
    <Dialog>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id={id}>
          <div className="flex justify-end">
            <DialogTrigger render={trigger} />
          </div>

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {children}

            <DialogFooter>
              <Button type="submit" form={id}>
                {submitText}
              </Button>

              <DialogClose render={<Button variant="outline">Cancel</Button>} />
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
}
