from utils.config import getURI
import psycopg2
from models.gasto_predio import GastoPredio

def getGastosPredio(id):
    try:
        url = getURI()
        conn = psycopg2.connect(url)
        
        gastosPredios = []
        inst = "select PGD.id_predio_gastos_det, GA.descripcion, PGD.importe, PGD.id_gasto, TGA.id_tipo_gasto, TGA.descripcion from predio_gastos_det PGD, gasto GA, tipo_gasto TGA where PGD.id_predio_gastos = %s and GA.id_gasto = PGD.id_gasto and TGA.id_tipo_gasto = GA.id_tipo_gasto;"
        inst1 = "update predio_gastos as PG set importe = (select sum(PGD.importe) from predio_gastos_det PGD where PGD.id_predio_gastos = PG.id_predio_gastos) where PG.id_predio_gastos = %s;"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id,))
            for row in cursor.fetchall():
                gastoPredio = GastoPredio(row[1], row[2], row[3], row[4], row[5])
                gastoPredio.id_predio_gastos_det = row[0]
                gastosPredios.append(gastoPredio.to_json())
            conn.commit()
            cursor.execute(inst1, (id,))
            conn.commit()
        conn.close()
        return gastosPredios
    except Exception as error:
        print(error)
