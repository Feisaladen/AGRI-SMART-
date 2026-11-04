#Stage 1 : build the React app
From node:22-alpine As build 
WORKDIR /app
RUN npm ci

COPY . .

ARG VITE_CLERK_PULISHABLE_KEY
ARG VITE_API_URL=""
ENV VITE_CLERK_PULISHABLE_KEY =$VITE_CLERK_PULISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

#stage 2 : server the built files with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 
