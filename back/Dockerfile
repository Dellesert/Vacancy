FROM node:18-alpine as builder
WORKDIR /app
COPY  /*.json ./
RUN npm install
RUN apk --no-cache add --virtual build-dependencies build-base python3
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm run build


FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4200
CMD [ "node", "dist/main.js" ]