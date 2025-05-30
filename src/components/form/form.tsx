import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "~/hooks/useFormContext";
import { FormDateTimePicker } from "./form-datetime-picker";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    FormInput,
    FormSelect,
    FormDateTimePicker,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
