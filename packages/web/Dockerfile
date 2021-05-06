FROM node:12.22.1-alpine3.10 as builder

# Environment
WORKDIR /home/app/

# Dependencies
# COPY package.json yarn.lock /home/app/
COPY packages/web/package.json /home/app/packages/web/
# COPY packages/web/package-lock.json /home/app/packages/web/
# COPY packages/web/yarn.lock /home/app/packages/web/
COPY packages/web/tsconfig.json /home/app/packages/web/
COPY packages/web/src/ /home/app/packages/web/src
COPY packages/web/public/ /home/app/packages/web/public

# RUN yarn install

# Build
# COPY packages/web/ /home/app/packages/web/
RUN cd packages/web \
  && yarn install \
  && yarn build

# Serve
FROM node:12.22.1-alpine3.10

WORKDIR /app

COPY --from=builder /home/app/packages/web /app

EXPOSE 3000
RUN ls
CMD ["yarn", "start"]
