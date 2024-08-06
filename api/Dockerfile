FROM python:3.9.19-alpine3.20
WORKDIR /api/
COPY requirements.txt requirements.txt
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
# Comando para correr la aplicación
CMD ["python", "index.py"]
