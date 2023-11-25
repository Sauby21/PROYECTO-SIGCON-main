from utils.config import getURI
import psycopg2

def postGastosPredio(id_pre_ga, id_gastos, importe):
    try:
        url = getURI()
        conn = psycopg2.connect(url)

        inst1 = "update predio_gastos as PG set importe = (select sum(PGD.importe) from predio_gastos_det PGD where PGD.id_predio_gastos = PG.id_predio_gastos) where PG.id_predio_gastos = %s;"
        inst = "insert into predio_gastos_det (id_predio_gastos, id_gasto, importe) values (%s, %s, %s);"
        with conn.cursor() as cursor:
            cursor.execute(inst, (id_pre_ga,id_gastos,importe))
            conn.commit()
            cursor.execute(inst1, (id_pre_ga))
            conn.commit()
        conn.close()
        return True
    except Exception as error:
        print(error)
        return False
