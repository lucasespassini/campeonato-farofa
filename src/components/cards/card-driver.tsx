import { Driver } from "@prisma/client";

type CardDriverProps = {
  driver: Driver;
};

export const CardDriver = ({ driver }: CardDriverProps) => {
  return (
    <div>
      <p>{driver.drv_name}</p>
      <p>{driver.drv_nickname}</p>
    </div>
  );
};
