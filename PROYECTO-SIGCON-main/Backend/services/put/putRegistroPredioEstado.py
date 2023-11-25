from utils.config import getURI
import psycopg2

def putRegistroPredioEstado(id_estado, id_predio, periodo):
    try:
        print("Se intenta hacer el putRegistroPredioEstado")
        
        url = getURI()
        conn = psycopg2.connect(url)
        
        inst = "update registro_predio_estado  set id_estado = %s where id_predio = %s and periodo= %s;" 
        with conn.cursor() as cursor:
            cursor.execute(inst, (id_estado,id_predio,periodo))
            conn.commit()
        conn.close()
        return True
    except Exception as error:
        print(error)
        return False
