FROM node:16.13.2
WORKDIR /app/web/

COPY ./package*.json /app/web/
COPY ./src/ /app/web/src/
COPY ./public/ /app/web/public/

RUN npm install
RUN ls -lah

CMD ["npm", "start"]
