export class Predio {
    id_predio: string;
    predio: string;
    responsable: string;

    constructor(id_pre:string, pre:string, per:string,  ){
        this.id_predio = id_pre;
        this.predio = pre;
        this.responsable = per;
    }   
}