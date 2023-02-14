FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

COPY --from=builder /usr/src/app/dist ./dist

USER node

CMD [ "node", "dist/main.js" ]
