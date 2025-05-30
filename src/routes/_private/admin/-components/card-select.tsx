import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";

type CardSelectDriverProps = {
  isSelected?: boolean;
} & PropsWithChildren;

export const CardSelect = ({ children, isSelected }: CardSelectDriverProps) => {
  return (
    <Button
      variant="outline"
      className="group flex h-fit w-full cursor-pointer items-center justify-between rounded-md bg-slate-600 px-4 py-2"
    >
      {children}

      {isSelected ? (
        <ArrowLeftIcon className="opacity-0 transition group-hover:opacity-100" />
      ) : (
        <ArrowRightIcon className="opacity-0 transition group-hover:opacity-100" />
      )}
    </Button>
  );
};
