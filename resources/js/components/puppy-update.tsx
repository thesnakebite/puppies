import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { EditIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { update as updatePuppy } from '@/routes/puppies';
import type { Puppy } from '@/types/puppy';
import { ImageUploadPreview } from './ImageUploadPreview';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function PuppyUpdate({ puppy }: { puppy: Puppy }) {
    const { data, setData, transform, errors, post, processing } = useForm({
        name: puppy.name,
        trait: puppy.trait,
        image: null as File | null,
        _method: 'PUT',
    });

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="group/update bg-background/30 hover:bg-background"
                    size="icon"
                    variant={'secondary'}
                    aria-label="Actualizar cachorro"
                >
                    <EditIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edita {puppy.name}</DialogTitle>
                <DialogDescription>
                    Realiza los cambios necesarios en la información de tu
                    cachorro a continuación.
                </DialogDescription>

                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        transform((data) => ({
                            ...data,
                            _method: 'put',
                        }));
                        post(updatePuppy(puppy.id).url, {
                            preserveScroll: true,
                            onSuccess: () => setOpen(false),
                        });
                    }}
                >
                    <fieldset>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Nombre completo"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Label htmlFor="trait">Rasgo de personalidad</Label>
                        <Input
                            id="trait"
                            className="mt-1 block w-full"
                            value={data.trait}
                            onChange={(e) => setData('trait', e.target.value)}
                            required
                            autoComplete="trait"
                            placeholder="Rasgo de personalidad"
                        />
                        {errors.trait && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.trait}
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Label htmlFor="image">Cambiar imagen</Label>
                        <Input
                            id="image"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            placeholder="Foto de perfil"
                        />
                        {errors.image && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.image}
                            </p>
                        )}
                        {/* Previous image */}
                        <ImageUploadPreview source={data.image ?? puppy.imageUrl} />
                    </fieldset>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary">Cancelar</Button>
                        </DialogClose>

                        <Button
                            className="relative disabled:opacity-100"
                            disabled={processing}
                            type="submit"
                        >
                            {processing && (
                                <div className="absolute inset-0 grid place-items-center">
                                    <LoaderCircle className="size-5 animate-spin stroke-primary-foreground" />
                                </div>
                            )}
                            <span className={clsx(processing && 'invisible')}>
                                Actualizar
                            </span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
