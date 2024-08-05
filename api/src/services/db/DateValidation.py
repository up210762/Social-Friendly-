import src.services.db.DatabaseConnection as db

def validate_date(date: str) -> bool:
    connection = db.connection()
    cursor = connection.cursor()
    get_date_sql = "SELECT Fecha FROM UltimaActualizacion"
    cursor.execute(get_date_sql)
    res = cursor.fetchone()

    if res is None:
        cursor.close()
        connection.close()
        return True
    else:
        if (res[0].month-date.month) < 3:
            cursor.close()
            connection.close() 
            return False
        else:
            cursor.close()
            connection.close()
            return True
        
def register_date():
    connection = db.connection()
    cursor = connection.cursor()
    sql = "SELECT Fecha FROM UltimaActualizacion"
    cursor.execute(sql)
    resp = cursor.fetchone()
    if resp is None:
        date_sql = "INSERT INTO UltimaActualizacion \
            (Fecha) VALUES (NOW());"
        cursor.execute(date_sql)
        connection.commit()
        cursor.close()
        connection.close()
    else:
        date_sql = "UPDATE UltimaActualizacion \
            SET Fecha=NOW();"
        cursor.execute(date_sql)
        connection.commit()
        cursor.close()
        connection.close()