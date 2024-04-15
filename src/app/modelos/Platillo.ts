import { Categoria } from "./Categoria"

export interface Platillo {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    id_menu: number;
    categoria: Categoria;
    plato_disponible_menu: boolean;
}