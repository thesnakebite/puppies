import { usePage, useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { Heart, LoaderCircle } from 'lucide-react';
import { like } from '@/routes/puppies';
import type { Puppy } from '../types/puppy';

export function LikeToggle({ puppy }: { puppy: Puppy }) {
    const { auth } = usePage().props;
    const { processing, patch } = useForm();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            patch(like(puppy.id).url, {
                preserveScroll: true,
            });
        }}>
            <button
                type='submit'
                className="group disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!auth.user || processing}
            >
                {processing ? (
                    <LoaderCircle className='animate-spin stroke-slate-300' />
                ) : (
                    <Heart
                        className={clsx(
                            auth.user && puppy.likedBy.includes(auth.user.id)
                            ? 'fill-pink-500 stroke-none'
                            :
                            'stroke-slate-200 group-hover:stroke-slate-300',
                        )
                    }
                    />
                )}
            </button>
        </form>
    );
}
