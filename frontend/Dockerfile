# Frontend Dockerfile
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Add nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
