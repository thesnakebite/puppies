import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { PaginatedMeta, PaginationLinks } from "@/types/puppy";
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    meta: PaginatedMeta;
    links: PaginationLinks;
    className?: string;
}

export function Pagination ({links, meta, className}: PaginationProps) {
    return (
        <div className={cn('flex justify-between items-center mt-6', className)}>
            <div>
                {links.prev && (
                    <Button variant="ghost" asChild className='border'>
                        <Link preserveScroll href={links.prev}>
                            <ChevronLeft />
                            <span>Anterior</span>
                        </Link>
                    </Button>
                )}
            </div>
            <p className='text-sm font-medium'>
                página {meta.current_page} de {meta.last_page}
            </p>
            <div>
                {links.next && (
                    <Button variant="ghost" asChild className='border'>
                        <Link preserveScroll href={links.next}>
                            <span>Siguiente</span>
                            <ChevronRight />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
