import { Categoria } from "./Categoria"

export interface Platillo {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    id_menu: number;
    id_categoria:number;
    disponible:Boolean;
    categoria: Categoria;
    plato_disponible_menu: boolean;
}
export interface PlatilloCocina{
    nombre:string;
    cantidad:any;
    detalle:any;
}