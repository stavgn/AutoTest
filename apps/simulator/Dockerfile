FROM node:14
WORKDIR /user/packages/
COPY /packages/ .
WORKDIR /user/src/app
COPY package*.json  ./
RUN npm install
COPY . ./
RUN yarn build
EXPOSE 3000
CMD yarn start:prod