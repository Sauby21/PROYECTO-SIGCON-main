export class Casas {
    id_indice: string;
    id_predio: string;
    id_casa: string;
    mdu: string;
    numero: string;
    piso: string;
    estado: string;
    responsable: string;
    area_casa: string;
    area_cochera: string;
    area_total: string;
    participacion: string;

   
    constructor(id_ind:string, id_pre:string, id_cas:string, md:string, num:string, pis:string, est:string,
        res:string, resp:string, a_cas:string, a_coc:string, a_tot:string, par:string){
        this.id_indice = id_ind;
        this.id_predio = id_pre;
        this.id_casa = id_cas;
        this.mdu = md;
        this.numero = num;
        this.piso = pis;
        this.estado = est;
        this.responsable = resp;
        this.area_casa = a_cas;
        this.area_cochera = a_coc;
        this.area_total = a_tot;
        this.participacion = par;

       
    }
}