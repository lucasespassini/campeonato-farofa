import { Label } from "@radix-ui/react-label";
import { SelectProps } from "@radix-ui/react-select";
import { useStore } from "@tanstack/react-form";
import { ZodError } from "zod";
import { useFieldContext } from "~/hooks/useFormContext";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type Option = {
  value: string;
  label: React.ReactNode;
};

type FormSelectProps = {
  label: string;
  options: Option[];
} & SelectProps;

export const FormSelect = ({ label, options, ...props }: FormSelectProps) => {
  const field = useFieldContext<string>();
  const errors: ZodError[] = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = errors.length > 0;

  return (
    <div className="w-full">
      <Label htmlFor={field.name} className="font-normal text-[#e7e7e7]">
        {label}
      </Label>

      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        {...props}
      >
        <SelectTrigger
          className={cn("w-full", isInvalid && "border-red-600")}
          id={field.name}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option, idx) => (
            <SelectItem key={idx} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
