# ---------------- DEV ----------------
FROM node:24-alpine AS dev

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000

CMD ["npm", "run", "dev"]


# ---------------- BUILD ----------------
FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .


# ---------------- PROD (DISTROLESS) ----------------
FROM gcr.io/distroless/nodejs24-debian13 AS prod

WORKDIR /app
COPY --from=build /app /app
EXPOSE 5000

CMD ["src/server.js"]