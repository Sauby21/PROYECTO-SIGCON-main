from utils.config import getURI
import psycopg2
from models.descrip_gastos import DescripGastos

def getDescripGastos(id):
    try:
        url = getURI()
        conn = psycopg2.connect(url)
        
        descripGastos = []
        inst = "select id_gasto, descripcion from gasto where id_tipo_gasto = %s order by id_gasto;"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id,))
            for row in cursor.fetchall():
                descripGasto = DescripGastos(row[1])
                descripGasto.id_gasto = row[0]
                descripGastos.append(descripGasto.to_json())
        conn.close()
        return descripGastos
    except Exception as error:
        print(error)
