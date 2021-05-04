FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Dependencies
COPY package.json yarn.lock /home/app/
COPY packages/web/package.json /home/app/packages/web/

RUN yarn install \
  && yarn workspace web react-scripts start


# Build
COPY packages/web/ /home/app/packages/web/
RUN cd packages/web \
  && yarn build \
  && yarn --production \
  && echo "*** TODO: Find another way to manage common package ***" \
# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/web /app

EXPOSE 3000
CMD ["yarn", "start"]
