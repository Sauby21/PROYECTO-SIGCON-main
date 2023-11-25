from utils.config import getURI
import psycopg2

def putGastosPredio(id_pre_ga_det, importe):
    try:
        url = getURI()
        conn = psycopg2.connect(url)
        
        inst = "update predio_gastos_det set importe = %s where id_predio_gastos_det = %s;"
        with conn.cursor() as cursor:
            cursor.execute(inst, (importe,id_pre_ga_det))
            conn.commit()
        conn.close()
        return True
    except Exception as error:
        print(error)
        return False
