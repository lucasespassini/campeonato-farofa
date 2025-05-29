import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "~/hooks/useFormContext";
import { FormInput } from "./form-input";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    FormInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
