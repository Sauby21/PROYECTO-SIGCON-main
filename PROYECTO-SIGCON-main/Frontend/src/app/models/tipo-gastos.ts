export class TipoGastos {
    id_tipo_gasto: string;
    descripcion: string;

    constructor(id_tipo_g:string, des:string){
        this.id_tipo_gasto = id_tipo_g;
        this.descripcion = des;
    }
}