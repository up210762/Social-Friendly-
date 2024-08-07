import pymysql, os
from dotenv import load_dotenv

load_dotenv()

def connection():
    try:
        return pymysql.connect(
            host=os.getenv('HOST'),
            user=os.getenv('USER'),
            password=os.getenv('PASSWORD'),
            db=os.getenv('DATABASE')
        )
    except Exception as ex:
        return