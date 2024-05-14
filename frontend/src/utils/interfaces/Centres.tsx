import { Reserve } from "./Reserve";

export interface Centres {
    trainerId: string,
    centresId: string,
    name: string,
    location: string,
    reserves: Reserve[],
    imageUrl: string
}