import type { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};

export function Container({ children }: ContainerProps) {
    return <div className="mx-auto max-w-5xl p-4 md:p-8">{children}</div>;
}
