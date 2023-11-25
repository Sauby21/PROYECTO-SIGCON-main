export class RegistroPredioEstado {
    id_registro_predio_estado: string
    id_predio: string
    id_personal: string
    id_estado: string
    periodo: string
    descripcion: string

    constructor(
        id_registro_predio_estado: string,
        id_predio: string,
        id_personal: string,
        id_estado: string,
        periodo: string,
        descripcion: string
    ) {
        this.id_registro_predio_estado = id_registro_predio_estado
        this.id_predio = id_predio
        this.id_personal = id_personal
        this.id_estado = id_estado
        this.periodo = periodo
        this.descripcion = descripcion
    }
}