FROM python:3.9.19-alpine3.20
RUN addgroup data && adduser -S -G data data
WORKDIR /api/
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
USER data
COPY --chown=data . .
EXPOSE 5000
# Comando para correr la aplicación
CMD ["python", "index.py"]
