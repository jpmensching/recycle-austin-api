# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:12

# Install Yarn
CMD [ "npm", "install", "yarn", "-g" ]

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Copy source files from host computer to the container
COPY . .

# Specify port app runs on
EXPOSE 3000

# Run the app
CMD [ "yarn", "start" ]
