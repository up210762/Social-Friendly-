ALLOWED_EXTENSION = ['csv']

def allowed_file(filename):
    return filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSION