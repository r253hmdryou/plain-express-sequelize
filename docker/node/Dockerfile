# builder
FROM node:16.17.0-slim as base
EXPOSE 3000
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    procps \
    && rm -rf /var/lib/apt/lists/*

RUN npm i --location=global pm2@5

COPY package.json package-lock.json ./
RUN npm ci --production

COPY ["pm2.yaml", "."]

# builder
FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

# runner
FROM base as runner
ENV NODE_ENV=production
USER node
COPY --from=builder /app/dist ./dist
ENTRYPOINT ["pm2-runtime", "pm2.yaml"]
