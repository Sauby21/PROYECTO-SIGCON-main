export class RegistroCasaEstado {
    id_registro_casa_estado: string
    id_casa: string
    num_casa:string
    estado: string
    periodo: string
    constructor(
        id_registro_casa_estado: string,
        id_casa: string,
        num_casa:string,
        estado: string,
        periodo: string
        
    ) {
        this.id_registro_casa_estado = id_registro_casa_estado
        this.id_casa = id_casa
        this.estado = estado
        this.periodo = periodo
        this.num_casa=num_casa
    }
}

