import type { Paginated, Puppy } from '../types/puppy';
import { LikeToggle } from './LikeToggle';
import { PuppyDelete } from './puppy-delete';
import { PuppyUpdate } from './puppy-update';
import { Pagination } from './ui/pagination';

export function PuppiesList({ puppies }: { puppies: Paginated<Puppy> }) {
    return (
        <>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 z-40">
                {puppies.data.map((puppy) => (
                    <PuppyCard key={puppy.id} puppy={puppy} />
                ))}
            </ul>
            <Pagination meta={puppies.meta} links={puppies.links} />
        </>
    );
}

type PuppyCardProps = {
    puppy: Puppy;
};

function PuppyCard({ puppy }: PuppyCardProps) {
    return (
        <li
            key={puppy.id}
            className="relative overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5"
        >
            {/* Only for puppy owners */}
            {puppy.can.update && (
                <div className="absolute top-2 right-2">
                    <div className="flex flex-col items-center gap-2">
                        <PuppyUpdate puppy={puppy} />
                        <PuppyDelete puppy={puppy} />
                    </div>
                </div>
            )}
            <img
                className="aspect-square w-full object-cover"
                alt={puppy.name}
                src={puppy.imageUrl}
            />

            <div className="flex items-center justify-between gap-2 p-4 text-sm">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{puppy.name}</p>
                    <span className="text-slate-300">·</span>
                    <p className="text-slate-500">{puppy.trait}</p>
                </div>
                <LikeToggle puppy={puppy} />
            </div>
        </li>
    );
}
