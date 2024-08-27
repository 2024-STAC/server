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

# Install dependencies and build the service
RUN pnpm install --frozen-lockfile
RUN pnpm run build api

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy only the necessary files to run the application
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/node_modules ./node_modules

RUN ls -la

# Expose the port and start the application
EXPOSE 3000
CMD ["node", "./dist/main"]
