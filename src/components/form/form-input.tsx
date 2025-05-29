import { Label } from "@radix-ui/react-label";
import { useStore } from "@tanstack/react-form";
import { ZodError } from "zod";
import { useFieldContext } from "~/hooks/useFormContext";
import { cn } from "~/lib/utils";
import { Input } from "../ui/input";

type FormInputProps = {
  label: string;
  mask?(value: string): string;
} & React.ComponentProps<"input">;

export const FormInput = ({ label, className, mask, ...rest }: FormInputProps) => {
  const field = useFieldContext<string>();
  const errors: ZodError[] = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = errors.length > 0;

  return (
    <div className="w-full">
      <Label htmlFor={field.name} className="font-normal text-[#e7e7e7]">
        {label}
      </Label>

      <Input
        className={cn(className, isInvalid && "border-red-600")}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(mask ? mask(e.target.value) : e.target.value)}
        {...rest}
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
};
