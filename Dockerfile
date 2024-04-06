FROM node:20.12.0-alpine
WORKDIR /app
COPY . /app/
RUN npm create vite@latest && npm install
RUN npm i sass && npm i react-router-dom && npm i vite-plugin-sass-dts && npm install @emotion/react @emotion/styled
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]