FROM node:16.15.1 as builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

# Set Environment
ENV NODE_ENV=production

# Copy Source code
COPY . .
RUN cp .env.development .env

# Build & tag image
RUN npm run build

# Move to Alpine
#FROM node:16-alpine
#WORKDIR /app
#COPY --from=builder /app /app

# Start App
CMD [ "npm", "run", "start"]