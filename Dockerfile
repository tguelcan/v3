# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.14
FROM oven/bun:${BUN_VERSION}-slim AS base

ARG BETTER_AUTH_SECRET
ARG MONGODB_URI
ARG OPENAI_API_KEY
ARG BASE_URL
ARG RESEND_API_KEY

LABEL fly_launch_runtime="SvelteKit"

# SvelteKit app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY bun.lock package.json ./
RUN bun install

# Copy application code
COPY . .

RUN BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
RUN MONGODB_URI=$MONGODB_URI
RUN PENAI_API_KEY=$OPENAI_API_KEY
RUN BASE_URL=$BASE_URL
RUN RESEND_API_KEY=$RESEND_API_KEY

RUN bun --bun run build


# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
