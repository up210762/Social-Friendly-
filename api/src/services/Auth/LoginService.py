from src.services.db.DatabaseConnection import connection

def get_connection():
    try:
        conn = connection()
        print("Connected")
    except:
        print("Error")