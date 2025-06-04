import { Label } from "@radix-ui/react-label";
import { useStore } from "@tanstack/react-form";
import { ZodError } from "zod";
import { Switch as SwitchRoot } from "~/components/ui/switch";
import { useFieldContext } from "~/hooks/useFormContext";

type FormSwitchProps = {
  label: string;
};

export function FormSwitch({ label }: FormSwitchProps) {
  const field = useFieldContext<boolean>();
  const errors: ZodError[] = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = errors.length > 0;

  return (
    <div className="flex w-fit items-center space-x-2">
      <Label htmlFor={field.name} className="font-normal text-[#e7e7e7]">
        {label}
      </Label>

      <SwitchRoot
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />

      {isInvalid && (
        <div className="-mt-1 ml-1">
          {errors.map((error) => (
            <small key={error.message} className="text-red-600">
              {error.message}
            </small>
          ))}
        </div>
      )}
    </div>
  );
}
