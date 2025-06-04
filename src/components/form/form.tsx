import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "~/hooks/useFormContext";
import { FormDateTimePicker } from "./form-datetime-picker";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormSwitch } from "./form-switch";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    FormInput,
    FormSelect,
    FormSwitch,
    FormDateTimePicker,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
