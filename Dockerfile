# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install a lightweight HTTP server globally
RUN npm install -g http-server

# Copy the project files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Expose the port
EXPOSE 7090

# Serve the application using http-server
CMD ["http-server", "dist/<your-angular-project>", "-p", "7090"]
