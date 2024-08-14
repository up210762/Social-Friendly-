FROM node:20.5.0-alpine3.18
RUN addgroup react && adduser -S -G react react
USER react
WORKDIR /var/html/www/client/
COPY --chown=react package*.json .
RUN npm install
COPY --chown=react . .
EXPOSE 5173
CMD ["npm", "run", "dev"]