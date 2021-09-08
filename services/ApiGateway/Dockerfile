FROM node:14
WORKDIR /user/packages/autoTestConfig
COPY /packages/autoTestConfig .
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD npm run staging

