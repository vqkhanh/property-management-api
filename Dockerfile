# Base image
FROM node:22-alpine

# Set workdir
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Build project
RUN npm run build

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "dist/main"]
