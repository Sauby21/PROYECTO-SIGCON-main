export class Gastos {
    id_predio_gastos: string;
    periodo: string;

    constructor(id_pre_gas:string, per:string){
        this.id_predio_gastos = id_pre_gas;
        this.periodo = per;
    }
}