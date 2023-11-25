from utils.config import getURI
import psycopg2
from models.gasto_predio import GastoPredio

def getGastosPredioI(id, id_gasto):
    try:
        url = getURI()
        conn = psycopg2.connect(url)

        gastosPrediosI = []
        inst = "select PGD.id_predio_gastos_det, GA.descripcion, PGD.importe from predio_gastos_det PGD, gasto GA where PGD.id_predio_gastos = %s and PGD.id_gasto = %s and GA.id_gasto = PGD.id_gasto;"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id,id_gasto))
            for row in cursor.fetchall():
                gastoPredio = GastoPredio(row[1], row[2])
                gastoPredio.id_predio_gastos_det = row[0]
                gastosPrediosI.append(gastoPredio.to_json())
        conn.close()
        return gastosPrediosI
    except Exception as error:
        print(error)
