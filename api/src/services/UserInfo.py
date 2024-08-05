from src.services.db.DatabaseConnection import connection
from src.utils.Logger import Logger
from src.services.keys import DB_PREFIX
import traceback


def get_user_info(id):
    try:
        conn = connection()
        cursor = conn.cursor()
        sql = 'SELECT username FROM '+DB_PREFIX+'tr_user WHERE id=%s;'
        cursor.execute(sql, [id])
        return cursor.fetchone()[0]
    except Exception as ex:
        Logger.add_to_log('error', traceback.format_exc())
    finally:
        cursor.close()
        conn.close()