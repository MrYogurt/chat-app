FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Copy API serive sources
COPY packages/api/package.json /home/app/packages/api/
COPY packages/api/package-lock.json /home/app/packages/api/
COPY packages/api/nest-cli.json /home/app/packages/api/
COPY packages/api/tsconfig.json /home/app/packages/api/
COPY packages/api/tsconfig.build.json /home/app/packages/api/
COPY packages/api/.eslintrc.js /home/app/packages/api/
# COPY packages/api/.env /home/app/packages/api/
COPY packages/api/src /home/app/packages/api/src

# Build
RUN cd packages/api \
  && yarn install \
  && yarn build

# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/api /app

EXPOSE 5000

CMD ["node", "./dist/src/main.js"]