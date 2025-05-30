import { Label } from "@radix-ui/react-label";
import { useStore } from "@tanstack/react-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { date, ZodError } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useFieldContext } from "~/hooks/useFormContext";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type DateTimePickerProps = {
  label: string;
};

export const FormDateTimePicker = ({ label }: DateTimePickerProps) => {
  // const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const field = useFieldContext<Date>();
  const errors: ZodError[] = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = errors.length > 0;
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      field.handleChange(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (field.state.value) {
      const newDate = new Date(field.state.value);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      }
      // setDate(newDate);
      field.handleChange(newDate);
    }
  };

  return (
    <div>
      <Label className="font-normal text-[#e7e7e7]">{label}</Label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className={cn(isInvalid && "border-red-600")}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.state.value ? (
              format(field.state.value, "dd/MM/yyyy HH:mm")
            ) : (
              <span>DD/MM/YYYY hh:mm</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              locale={ptBR}
              selected={field.state.value}
              onSelect={handleDateSelect}
              initialFocus
            />
            <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        field.state.value && field.state.value.getHours() === hour
                          ? "default"
                          : "ghost"
                      }
                      className="aspect-square shrink-0 sm:w-full"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        field.state.value && field.state.value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="aspect-square shrink-0 sm:w-full"
                      onClick={() => handleTimeChange("minute", minute.toString())}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>

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
