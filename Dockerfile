FROM node
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --omit=dev
COPY . /app
RUN npm run build
CMD ["npm", "start"]