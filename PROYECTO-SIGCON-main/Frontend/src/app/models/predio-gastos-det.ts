export class PredioGastosDet {
    id_predio_gastos_det: string;
    descripcion: string;
    importe: string;
    id_gasto: string;
    id_tipo_gasto: string;
    des_gasto: string;

    constructor(id_pre_gas_det:string, des:string, imp:string, id_gas:string, idtgas:string, desgas:string){
        this.id_predio_gastos_det = id_pre_gas_det;
        this.descripcion = des;
        this.importe = imp;
        this.id_gasto = id_gas;
        this.id_tipo_gasto = idtgas;
        this.des_gasto = desgas;
    }
}