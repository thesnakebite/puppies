import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { login, logout } from "@/routes";
import { Button } from "./ui/button";

export function Header () {
    const { auth } = usePage().props;

    return (
        <header>
            <div className="flex justify-between items-center">
                {/* Logo */}
                <a className="group" href="/">
                    <div className="inline-flex items-center gap-4">
                    <img
                        src="/images/logo.png"
                        alt="DevPups"
                        className="h-16 transition group-hover:scale-105 group-hover:-rotate-6 md:h-20 lg:h-24"
                    />
                    <p className="text-lg font-semibold text-black">Dev Pups</p>
                    </div>
                </a>
                {/* Auth actions */}
                { auth.user ? (
                    <div className="flex items-center gap-3">
                        <span className="sm:hidden grid place-items-center size-9 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">
                            {auth.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                        <span className="hidden sm:inline text-indigo-500 font-medium truncate max-w-40">
                            Hola, {auth.user.name}
                        </span>
                        <Button asChild size="sm">
                            <Link href={logout()} as="button">Cerrar sesión</Link>
                        </Button>
                    </div>
                ) : (
                    <Button asChild>
                        <Link href={login()}>Acceso</Link>
                    </Button>
                )}
            </div>
            {/* Hero copy */}
            <div className="mt-6">
                <h1 className="text-lg font-bold text-black">Tenemos a las mejores cachorros!</h1>
                <p className="text-slate-600">
                    No se fíen solo de nuestra palabra: dejen que los perretes, hablen por sí solos.🐶
                </p>
                {!auth.user && (
                    <p className="text-slate-600 mt-4">
                        <Link className="underline hover:no-underline" href={login()}>Entrar</Link>{' '} ¡Para llevar un registro de tus cachorros favoritos y añadir nuevos!
                    </p>
                )}
            </div>
        </header>
    );
}
