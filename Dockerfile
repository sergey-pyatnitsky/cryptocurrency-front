FROM node
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --omit=dev
COPY . /app
RUN npm run build
ENV REACT_APP_BACKEND_HOST=${BACKEND_HOST}
ENV REACT_APP_BACKEND_PORT=${BACKEND_PORT}
CMD ["npm", "start"]