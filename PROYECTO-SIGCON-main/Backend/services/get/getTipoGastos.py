from utils.config import getURI
import psycopg2
from models.tipo_gastos import TipoGastos

def getTipoGastos():
    try:
        url = getURI()
        conn = psycopg2.connect(url)

        tipoGastos = []
        inst = "select id_tipo_gasto, descripcion from tipo_gasto where id_clase_gasto = 1 order by id_tipo_gasto;"
        with conn.cursor() as cursor:
            cursor.execute(inst)
            for row in cursor.fetchall():
                tipoGasto = TipoGastos(row[1])
                tipoGasto.id_tipo_gasto = row[0]
                tipoGastos.append(tipoGasto.to_json())
        conn.close()
        return tipoGastos
    except Exception as error:
        print(error)
