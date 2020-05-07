FROM node:13 as build-deps

COPY . /usr/src/app

WORKDIR /usr/src/app


RUN npm install

RUN npm run build


FROM node:slim

COPY --from=build-deps /usr/src/app/build /build

RUN npm install -g serve

CMD serve -s build 

EXPOSE 5000
