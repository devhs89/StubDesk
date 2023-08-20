# StubDesk - Employee Management System (EMS)

Welcome to the StubDesk - Employee Management System (EMS)! This project is a part of our college group project and aims to provide a comprehensive solution for managing employee data efficiently. The web application is built using the MERN (MongoDB, Express.js, React, Node.js) stack, leveraging the power of these technologies to create a seamless user experience.

## Features

- **Employee Records:** Easily manage and maintain employee records, including personal information, job details, and more.
- **Dashboard:** A user-friendly dashboard provides an overview of key metrics and insights related to employee management.
- **Search and Filters:** Efficiently search for specific employees and use filters to sort and categorize employee data.
- **Responsive Design:** The application is designed to work seamlessly across different devices and screen sizes.

## Installation

1. Clone the repository: `git clone https://github.com/devhs89/StubDesk.git`
2. Navigate to the project directory: `cd stubdesk`
3. Navigate to the server directory: `cd api`
4. Install server dependencies: `npm install`
5. Navigate to the client directory: `cd ui`
6. Install client dependencies: `npm install`
7. Return to the project directory: `cd ..`

## Configuration

1. Create a `.env` file in the project directory and configure the following environment variables:

```
DB_USERNAME=your-mongodb-username
DB_PASSWORD=your-mongodb-password
DB_CLUSTER=your-mongodb-cluster-address
DB_NAME=your-mongodb-database-name
```

## Usage

1. Start the server: `cd api && npm start`
2. Start the client: `cd ../ui && npm run compile && npm start`

Access the application by navigating to `http://localhost:30080` in your browser.

## License

All rights reserved. This project is for educational purposes only and is not licensed for reproduction, distribution, or any other use. Unauthorized use or reproduction of this project, in whole or in part, is strictly prohibited.
