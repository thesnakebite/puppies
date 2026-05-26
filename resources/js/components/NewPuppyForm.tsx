import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import { store as storePuppy } from '@/routes/puppies';
import { ImageUploadPreview } from "./ImageUploadPreview";

export function NewPuppyForm({ mainRef }: {mainRef?: React.RefObject<HTMLElement | null>}) {
    const { data, setData, post, errors, reset, processing } = useForm({
        name: '',
        trait: '',
        image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
        <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(storePuppy().url, {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();

                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }

                            if (mainRef?.current) {
                                mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
                            }

                        }
                    });
                }}
                className="mt-4 flex w-full flex-col items-start gap-4"
            >
                <div className="grid w-full gap-6 md:grid-cols-3">
                    <fieldset className="flex w-full flex-col gap-1">
                        <label htmlFor="name">Nombre</label>
                        <input
                            required
                            value={data.name}
                            className="w-full rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            id="name"
                            type="text"
                            name="name"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-xs mt-1 text-red-500">{errors.name}</p>}
                    </fieldset>
                    <fieldset className="flex w-full flex-col gap-1">
                        <label htmlFor="trait">Rasgo de personalidad</label>
                        <input
                            required
                            value={data.trait}
                            className="w-full rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            id="trait"
                            type="text"
                            name="trait"
                            onChange={(e) => setData('trait', e.target.value)}
                        />
                        {errors.trait && <p className="text-xs mt-1 text-red-500">{errors.trait}</p>}
                    </fieldset>
                    <fieldset className="md:col-span-2 flex w-full flex-col gap-1">
                        <label htmlFor="image">Foto de perfil</label>
                        <input
                            ref={fileInputRef}
                            className="w-full rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            id="image"
                            type="file"
                            accept="image/jpeg,image/png"
                            name="image"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-xs mt-1 text-red-500">{errors.image}</p>}

                        <ImageUploadPreview height={96} className="self-start" source={data.image} />
                    </fieldset>
                </div>
                <button
                    className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium disabled:cursor-not-allowed text-cyan-900 hover:bg-cyan-200 disabled:bg-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    type="submit"
                    disabled={processing}
                >
                    {processing ? `Añadiendo a ${data.name}...` : `Crear nuevo cachorro`}
                </button>
            </form>
        </div>
        </>
    );
}
