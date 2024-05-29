# Use official Node.js image as base for building the client
FROM node:20 as builder

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY . .

# Build the React app using Vite
RUN npm run build

# Use a lightweight Nginx image as the final image
FROM nginx:alpine

# Copy built React app from the builder stage to the Nginx server
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
