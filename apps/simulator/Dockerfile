FROM node:7.10
WORKDIR /user/packages/clientLib
COPY /packages/clientLib .
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm install
COPY . ./
EXPOSE 3000
RUN yarn start