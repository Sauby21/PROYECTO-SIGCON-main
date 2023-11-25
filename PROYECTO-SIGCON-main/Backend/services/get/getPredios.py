from utils.config import getURI
import psycopg2
from models.predios import Predios

def getPredios():
    try:
        url = getURI()
        conn = psycopg2.connect(url)

        predios = []
        inst = "select PR.id_predio, CONCAT(TP.nomre_predio, ' ', PR.descripcion) as predio, CONCAT(PE.apellido_paterno, ' ', PE.apellido_materno, ', ', PE.nombres) as responsable from tipo_predio TP, predio PR, persona PE where TP.id_tipo_predio = PR.id_tipo_predio and PR.id_persona = PE.id_persona order by PR.id_predio;"
        with conn.cursor() as cursor:
            cursor.execute(inst)
            for row in cursor.fetchall():
                predio = Predios(row[1], row[2])
                predio.id_predio = row[0]
                predios.append(predio.to_json())
        conn.close()
        return predios
    except Exception as error:
        print(error)
