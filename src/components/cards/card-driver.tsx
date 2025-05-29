import { Drivers } from "~/generated/prisma";

type CardDriverProps = {
  driver: Drivers;
};

export const CardDriver = ({ driver }: CardDriverProps) => {
  return (
    <div>
      <p>{driver.drv_name}</p>
      <p>{driver.drv_nickname}</p>
    </div>
  );
};
