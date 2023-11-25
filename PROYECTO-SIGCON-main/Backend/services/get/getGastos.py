from utils.config import getURI
import psycopg2
from models.gastos import Gastos

def getGastos(id):
    try:
        url = getURI()
        conn = psycopg2.connect(url)
        
        gastos = []
        inst = "select id_predio_gastos, periodo from predio_gastos where id_predio = %s order by id_predio_gastos"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id,))
            for row in cursor.fetchall():
                gasto = Gastos(row[1])
                gasto.id_predio_gastos = row[0]
                gastos.append(gasto.to_json())
        conn.close()
        return gastos
    except Exception as error:
        print(error)