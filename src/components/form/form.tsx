import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "~/hooks/useFormContext";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    FormInput,
    FormSelect,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
