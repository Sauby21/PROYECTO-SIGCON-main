from utils.gen_route import route
import os
import glob

def borrar_cache(excepciones):
    
    carpeta_cache = route("Backend","\\static\\img\\cache")
    
    
    for excepcion in excepciones:
        archivos = glob.glob(os.path.join(carpeta_cache, "*"))

        for archivo in archivos:
            if archivo != os.path.join(carpeta_cache, excepcion):
                os.remove(archivo)