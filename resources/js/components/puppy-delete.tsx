import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { LoaderCircle, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { destroy as destroyPuppy } from '@/routes/puppies';
import type { Puppy } from '@/types/puppy';
import { Button } from './ui/button';

export function PuppyDelete({ puppy }: { puppy: Puppy }) {
    const [open, setOpen] = useState(false);
    const { processing, delete: destroy } = useForm();

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        className="group/delete bg-background/30 hover:bg-background"
                        size="icon"
                        variant="secondary"
                        aria-label="Borrar cachorro"
                    >
                        <TrashIcon className="size-4 group-hover/delete:stroke-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg">
                            ¿Estás completamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            ¿Quién en su sano juicio borraría un cachorro tan
                            lindo? ¿En serio?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                destroy(destroyPuppy(puppy.id).url, {
                                    preserveScroll: true,
                                });
                            }}
                        >
                            <Button
                                className="relative disabled:opacity-100"
                                type="submit"
                                disabled={processing}
                            >
                                {processing && (
                                    <div className='absolute inset-0 grid place-items-center'>
                                        <LoaderCircle className="size-5 animate-spin stroke-primary-foreground" />
                                    </div>
                                )}
                                <span
                                    className={clsx(processing && 'invisible')}
                                >
                                    Borrar {puppy.name}
                                </span>
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
