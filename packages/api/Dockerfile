FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Dependencies
COPY package.json yarn.lock /home/app/
COPY packages/api/package.json /home/app/packages/api/

RUN yarn install \
  && yarn workspace api start:dev

# Copy API serive sources
COPY packages/api/ /home/app/packages/api/

# Build
RUN cd packages/api \
  && yarn build

# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/api /app

EXPOSE 5000

CMD ["node", "./dist/src/main.js"]
