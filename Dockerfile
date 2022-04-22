FROM node:16.14.0-alpine

ARG DK_UID

ARG DK_GID

RUN apk --no-cache add shadow && \
    usermod -u ${DK_UID:-1000} node && \
    groupmod -g ${DK_GID:-1000} node

RUN npm install -g nodemon sequelize sequelize-cli mysql2

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]