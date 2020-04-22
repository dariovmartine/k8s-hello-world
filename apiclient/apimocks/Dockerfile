# Dockerfile
FROM node:12 AS base
WORKDIR /app
COPY package*.json ./

# npm ci installs the same versions defined in the lock file 
# and doesn't try to update them as npm install does. 
# The --only=production flag that skips the installation 
# of devDependencies, which we don't need in production.
RUN npm ci --only=production

FROM node:12-alpine
WORKDIR /app
COPY --from=base /app .
COPY . .

EXPOSE 3000
CMD npm start
