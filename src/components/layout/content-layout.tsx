import { PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

type ContentLayoutProps = { className?: string } & PropsWithChildren;

export const ContentLayout = ({ children, className }: ContentLayoutProps) => {
  return (
    <div className={cn("mx-auto max-w-[800px] flex-1 py-5", className)}>{children}</div>
  );
};
