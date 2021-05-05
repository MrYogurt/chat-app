FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Dependencies
COPY package.json yarn.lock /home/app/
COPY packages/web/package.json /home/app/packages/web/

# Build
RUN yarn install \
  && yarn workspace web react-scripts build

# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/web /app

EXPOSE 3000
CMD ["yarn", "start"]
