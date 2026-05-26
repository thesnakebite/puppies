import type { User } from "@/types/auth";

export type Puppy = {
    id: number;
    name: string;
    trait: string;
    imageUrl: string;
    user: Pick<User, "id" | "name">;
    likedBy: User["id"][];
    can: {
        update: boolean;
        delete: boolean;
    }
}

export interface Filters {
    search?: string;
    [key: string]: unknown;
}

// Tipos de paginación de Laravel
export type PaginationLinks = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};

export type PaginatedMeta = {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLinks;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

export type Paginated<T> = {
    data: T[];
    links: PaginationLinks;
    meta: PaginatedMeta;
};
