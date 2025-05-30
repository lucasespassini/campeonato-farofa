import { Driver } from "@prisma/client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

type CardSelectDriverProps = {
  driver: Driver;
  isSelected?: boolean;
};

export const CardSelectDriver = ({ driver, isSelected }: CardSelectDriverProps) => {
  return (
    <Button
      variant="outline"
      className="group flex w-full cursor-pointer items-center justify-between rounded-md bg-slate-600 px-4 py-2"
    >
      <p>
        {driver.drv_name} - {driver.drv_nickname}
      </p>

      {isSelected ? (
        <ArrowLeftIcon className="opacity-0 transition group-hover:opacity-100" />
      ) : (
        <ArrowRightIcon className="opacity-0 transition group-hover:opacity-100" />
      )}
    </Button>
  );
};
