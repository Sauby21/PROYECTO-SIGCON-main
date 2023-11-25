export class DescripGastos {
    id_gasto: string;
    descripcion: string;

    constructor(id_g:string, des:string){
        this.id_gasto = id_g;
        this.descripcion = des;
    }
}