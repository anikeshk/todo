# Docker

**Docker** is a popular containerization tool. It lets you build containers and run the containers using **Docker Desktop**.

The below steps provide a quick start guide on setting up Docker for your project and using **Docker Compose** to run multiple services together.

The example project is MERN application, which consists of a Node.js express server (in the `server` directory), a React app (in the `app` directory), and a MongoDB database.

> [!IMPORTANT]
> The below Dockerfile and docker-compose.yml are examples. You might need to tweak your files as per your code.

>  [!WARNING]
> The below docker-compose.yml uses MongoDB. You might need to tweak your file as per your database choice OR if you are using a file system.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and the [Docker VS Code Extention](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker). If you are using another IDE, you can use Docker Desktop to perform the same steps (check online documentation for details).

2. Let's say you want to containize the backend server. Create a `Dockerfile` at the root of the `server` directory. Add the following contents:
```
# Use official Node.js image as base
FROM node:20

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port for the server
EXPOSE 5000

# Start the server
CMD ["node", "./dist/index.js"]
```

The comments above provide a description of each step. Essentially, Docker is going to create an image which runs Node.js v20, installs dependencies, builds your project, and then runs it. The server is exposed to the network on port 5000.

3. Similarly, create a `Dockerfile` at the root of the `app` directory, and add the following contents:
```
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
```
Similar to the `server`'s Dockerfile, here the `app` is being built and then run. One key difference is since this is a webapp, we need to use `nginx` to serve webpages.

4. Finally, create a file called `docker-compose.yml` at the root of your project directory (`/`), and add the following:
```
version: '3.8'

services:
  mongo:
    image: mongo:latest
    container_name: mongo
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: server
    ports:
      - '5000:5000'
    depends_on:
      - mongo
    environment:
      MONGODB_URI: mongodb://mongo:27017/your_database_name
      SERVER_PORT: 5000
      APP_URL: http://localhost

  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    container_name: app
    ports:
      - '80:80'
    depends_on:
      - server
    environment:
      VITE_API_URL: http://localhost:5000

volumes:
  mongo-data:
```

In this file, there are three services:
1. `mongo`
2. `server`
3. `app`

Since each service is dependent on the other, we use `depends_on` to ensure the services are started in the correct order.

This compose file uses the latest MongoDB container available on [Docker Hub](https://hub.docker.com/) for the database.

5. Right-click the `docker-compose.yml` file and click the `Compose Up` command.

6. The React app will be accessible on `http://localhost`.

7. To shut down the todo application, right-click the `docker-compose.yml` file and click the `Compose Down` command.


