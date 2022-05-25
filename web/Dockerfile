FROM node:16.13.2
WORKDIR /app/web/

COPY ./package.json /app/web/package.json
COPY ./package-lock.json /app/web/package-lock.json
COPY ./src/ /app/web/src/
COPY ./public/ /app/web/public/
COPY ./src/fileContents/imagensPerfil/avatar.png /app/web/src/fileContents/imagensPerfil/avatar.png

RUN npm install

CMD ["npm", "start"]
