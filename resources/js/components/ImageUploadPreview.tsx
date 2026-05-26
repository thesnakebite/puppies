import { useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

export function ImageUploadPreview({
    source,
    className,
    ...restProps
}: {
    source: File | string | null;
    className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
    const src = useMemo(() => {
        if (source instanceof File) {
            return URL.createObjectURL(source);
        }

        return source;
    }, [source])

    // Limpieza del blob URL
    useEffect(() => {
        return () => {
            if (src && src.startsWith('blob:')) {
                URL.revokeObjectURL(src);
            }
        };
    }, [src]);

    if (!src) {
        return null;
    }

    return (
        <img
            src={src}
            className={cn('mt-4 h-24 rounded-md', className)}
            {...restProps}
        />
    );
}
