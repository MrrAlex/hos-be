FROM node:alpine as build

WORKDIR /usr/src/app

COPY package* ./
RUN npm install

COPY . .
RUN npm run build


FROM node:alpine As production

USER node

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
