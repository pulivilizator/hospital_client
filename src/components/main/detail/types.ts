import {Doctor, Service} from "../search/types";

export type Direction = {
    id: number;
    name: string;
    description: string;
    slug: string;
    doctors: Doctor[];
    services: Service[];
}
