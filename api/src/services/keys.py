from dotenv import load_dotenv
import os

load_dotenv()

MAIN_PATH = os.getenv('INPUT_FILES')
DB_PREFIX = os.getenv('DB_PREFIX')