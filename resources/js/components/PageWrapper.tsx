import type { ReactNode } from 'react';

type PageWrapperProps = {
    children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="min-h-dvh bg-linear-to-b from-cyan-200 to-white to-[60vh]">
            <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
                <div className="relative mx-auto h-full max-w-7xl px-4 md:px-8">
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute top-32 -right-28 size-137.5 rotate-[0.449rad] opacity-10"
                    />
                </div>
            </div>
            {children}
        </div>
    );
}
