import { Platillo } from "./Platillo";

export interface PlatillosPorCategoria {
    id: number;
    nombre: string;
    imagen: string;
    platillos: Platillo[]
}