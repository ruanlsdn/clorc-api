# -------- DEVELOPMENT ---------- 
FROM node:18-alpine AS development

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY prisma /prisma/

RUN npm ci

COPY . .

RUN npm run prisma:generate

EXPOSE 3000
# -------- END ---------- 

# -------- BUILD ---------- 
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --from=development /app/node_modules ./node_modules

COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and pASsing in --omit=dev ensures that only the production dependencies are installed. This ensures that the node_modules directory is AS optimized AS possible
RUN npm ci --omit=dev && npm cache clean --force
# -------- END ---------- 

# -------- PRODUCTION ---------- 
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]
# -------- END ---------- 