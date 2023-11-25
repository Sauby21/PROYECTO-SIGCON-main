from utils.config import getURI
import psycopg2
from models.casas import Casas

def getTablaCasas(id):
    try:
        url = getURI()
        conn = psycopg2.connect(url)

        casas = []
        inst = "update casa as CA set participacion = ((CA.area + (select E.area from estacionamiento E where E.id_casa = CA.id_casa)) / (select sum(CA1.area + E1.area) from casa CA1, estacionamiento E1 where E1.id_casa = CA1.id_casa and CA1.id_predio = %s)) * 100 where CA.id_predio = %s;"
        inst1 = "select row_number() over (order by CA.id_casa) as indice, CA.id_predio, CA.id_casa, PMD.descripcion as MDU, CA.numero, CA.piso, CES.descripcion as estado, CONCAT(PE.apellido_paterno, ' ', PE.nombres) as responsable, CA.area as area_casa, E.area as area_cochera, sum(CA.area + E.area) as area_total, CA.participacion from casa CA, predio_mdu PMD, casa_estado CES, estacionamiento E, persona PE, predio PR where PMD.id_predio_mdu = CA.id_predio_mdu and CES.id_estado = CA.id_estado and CA.id_predio = %s and E.id_casa = CA.id_casa and PE.id_persona = PR.id_persona and PR.id_predio = CA.id_predio group by CA.id_casa, PMD.descripcion, CA.numero, CA.piso, CES.descripcion, CA.area, E.area,PE.apellido_paterno,PE.nombres;"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id,id))
            cursor.execute(inst1, (id,))
            for row in cursor.fetchall():
                casa = Casas(row[0], row[1], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11])
                casa.id_casa = row[2]
                casas.append(casa.to_json())
        conn.close()
        return casas
    except Exception as error:
        print(error)

