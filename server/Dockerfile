FROM node:16.14.2-alpine3.15
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN apk --no-cache add curl
RUN npm install

EXPOSE 3000

COPY . /usr/src/app

CMD ["node", "src/app.js"]