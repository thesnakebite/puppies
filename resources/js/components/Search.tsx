import { router } from '@inertiajs/react';
import { debounce } from 'lodash-es';
import { Delete } from 'lucide-react';
import { useRef } from 'react';
import { home } from '@/routes';
import type { Filters } from '@/types/puppy';

export function Search({ filters }: { filters: Filters }) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <label htmlFor="search" className="font-medium">
                Buscar un rasgo de carácter
            </label>
            <div className="mt-2 flex items-center gap-4">
                <input
                    defaultValue={filters.search}
                    ref={inputRef}
                    onChange={debounce((e) => {
                        router.get(
                            home().url,
                            { search: e.target.value },
                            {
                                preserveState: true,
                                preserveScroll: true,
                            },
                        );
                    }, 300)}
                    placeholder="travieso..."
                    name="search"
                    id="search"
                    type="text"
                    className="w-full max-w-80 bg-white px-4 py-2 ring ring-black/5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />

                <button
                    onClick={() => {
                        router.get(
                            home().url,
                            {},
                            {
                                preserveState: true,
                                preserveScroll: true,
                                onSuccess: () => {
                                    if (inputRef.current) {
                                        inputRef.current.value = '';
                                        inputRef.current.focus();
                                    }
                                },
                            },
                        );
                    }}
                    className="inline-block rounded bg-cyan-300 px-4 py-2 pr-3! pl-2.5! font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                    <Delete />
                </button>
            </div>
        </div>
    );
}
