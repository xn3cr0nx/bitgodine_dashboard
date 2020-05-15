FROM node:13 as build-deps

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . /usr/src/app

RUN npm run build


FROM node:slim

COPY --from=build-deps /usr/src/app/build /build

RUN npm install -g serve

CMD serve -s build 

EXPOSE 5000
