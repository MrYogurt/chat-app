FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Dependencies
COPY packages/web/package.json /home/app/packages/web/
COPY packages/web/tsconfig.json /home/app/packages/web/
COPY packages/web/src/ /home/app/packages/web/src
COPY packages/web/public/ /home/app/packages/web/public

# Build
RUN cd packages/web \
  && yarn install \
  && yarn build

# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/web /app

EXPOSE 3000

CMD ["yarn", "start"]
