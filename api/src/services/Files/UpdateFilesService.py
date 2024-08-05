from src.services.db.DatabaseConnection import connection
from src.services.UserInfo import get_user_info
from src.services.keys import MAIN_PATH, DB_PREFIX

def upload_image(id, file):
    try:
        conn = connection()
        cursor = conn.cursor()
        res = get_user_info(id)
        filename = file.filename
        path = f'{MAIN_PATH}@{res}/{filename}'
        sqlSearch = 'SELECT * FROM '+DB_PREFIX+'tr_path_user \
            WHERE path=%s'
        sql = 'INSERT INTO '+DB_PREFIX+'tr_path_user \
            (id_user, path) VALUES (%s, %s);'
        resSearch = cursor.execute(sqlSearch, [path])
        if resSearch == 0:
            res = cursor.execute(sql, [id, path])
            if res:
                file.save(path)
                conn.commit()
                return {
                    "status": 200,
                    "message": "Archivo insertado correctamente."
                }
        else:
            return {
                    "status": 406,
                    "message": "El archivo ya existe."
                }
    except:
        return {
            "status": 500,
            "message": "Algo salió mal."
        }
    finally:
        conn.close()
        cursor.close()