import {User} from "../../types";

export type Filter = {
    name: string | null,
    specialty?: string | null
    direction?: string | null
}

export type Service = {
    id: string,
    direction: string,
    direction_slug: string,
    name: string,
    description: string,
    price: number,
    slug: string,
}

export type Doctor = {
    description: string;
    direction: string;
    id: number;
    image: string;
    specialty: string;
    slug: string,
    user: User;
}

export type SearchResult = Doctor | Service