# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy over the monorepo package files
COPY ./pnpm-workspace.yaml ./pnpm-lock.yaml ./
COPY ./libs ./libs
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./apps/api ./apps/api
COPY ./tsconfig.build.json ./tsconfig.build.json

RUN ls -la ./libs
# Install dependencies and build the service
RUN pnpm install --frozen-lockfile
RUN pnpm run build api
RUN pnpm run build core dto entities error config middlewares modules utils
RUN ls -la

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy only the necessary files to run the application
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist/apps/api/src ./dist/api
COPY --from=builder /app/dist/libs /libs 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules /node_modules
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.build.json ./tsconfig.build.json


# RUN ls -la /app/dist/api/src
RUN ls -la /app/dist
RUN ls -la /app

# Expose the port and start the application
EXPOSE 3000
CMD ["node", "dist/api/main.js"]
