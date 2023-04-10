# Project Documentation

## Introduction

This project is a MERN stack application that involves the integration of various AWS services. The application provides a platform for online food ordering and delivery.

## Getting Started

To start the project on your local machine, first clone this git repository into your desired directory by using the command "git clone [ Https link copied from GitHub ]".

## AWS Services used

- S3 - used for storage
- Lambda function - used for serverless computing
- Route 53 - used for DNS management
- AWS Amplify - used for app deployment and hosting
- SNS - used for push notifications
- API Gateway - used to create, publish, and manage APIs
- DynamoDB - a NoSQL database service from AWS that may be used for storing data in this project
- CloudWatch - a monitoring and logging service from AWS that may be used for monitoring Lambda functions and API Gateway usage

## Folder Structure

The MERN-FOOD project has the following folder structure:

- LAMBDA-BACKEND - contains the Lambda function code
- SRC - contains the React source code
  - COMPONENTS - contains the React components used in the project
  - CONTEXT - contains the React context files
  - IMAGES - contains the image files used in the project
  - ROUTES - contains the React router files
  - UTILS - contains utility functions used in the project
  - APP.JS - the main React component
  - APP.CSS - the main CSS file
  - INDEX.JS - the entry point for the React app
  - INDEX.CSS - contains the global styles for the app
  - .ENV - contains environment variables used in the project
  - PACKAGE.JSON - contains the project dependencies and scripts

## App.js

This is the main component of the React application. It is responsible for rendering the UI and handling the routing of the application.

### Dependencies

- react-router-dom
- react
- utils/ApiCall.js
- context/reducer.js
- context/StateProvider.js
- Routes/PrivateRoute.js
- Routes/PublicRoute.js
- Routes/AdminRoute.js
- components/Header.js
- components/Footer.js
- components/Home.js
- components/Signup.js
- components/Morninigfood.js
- components/Login.js
- components/AdminLogin.js
- components/Account.js
- components/OrderSubmit.js
- components/Dashboard/Dashboard.js
- components/Cart.js

### States

- showProfile - a boolean state that toggles the user profile dropdown menu.
- foodItems - an array of objects that contains information about the food items.

### Functions

- handleProfileToggle - a callback function that toggles the showProfile state.
- fetchData - an async function that fetches the food items data from the API and sets the foodItems state using the dispatch function from the useStateValue hook.

### Routes

- '/' - renders the <Home /> component.
- '/morninigfood' - renders the <Morninigfood /> component.
- '/urvi' - renders the <Dashboard /> component for the admin user only.
- '/account' - renders the <Account /> component for authenticated users only.
- '/cart' - renders the <Cart /> component for authenticated users only.
- '/oderSubmit' - renders the <OrderSubmit /> component for authenticated users only.
- '/login' - renders the <Login /> component for unauthenticated users only.
- '/Adminlogin' - renders the <AdminLogin /> component for unauthenticated users only.
- '/signup' - renders the <Signup /> component for unauthenticated users only.

### Usage

The App component is the root component of the React application. It is responsible for handling the routing of the application and rendering the header, footer, and main content of the application. The Routes component is used to define the different routes of the application and the corresponding components that should be rendered when those routes are accessed. The useState hook is used to define the showProfile state which is used to toggle the user profile dropdown menu. The useEffect hook is used to fetch the food items data from the API and set the foodItems state using the dispatch function from the useStateValue hook. The handleProfileToggle function is used to toggle the showProfile state when the user clicks on the user profile icon.

### Prerequisites

Here are the extensions used for VS Code:

- Prettier - used for code formatting.
- AWS Toolkit - used for managing AWS resources from within VS Code.
- ES7+ React/Redux/React-Native snippets - provides snippets for React, Redux and React Native.
- React Native Tools - provides tools for developing React Native applications.
- Thunder Client - used for testing REST APIs.
- Auto Rename Tag - automatically renames paired HTML/XML tags.

Make sure to install these extensions to have a better development experience in VS Code.

### Setup

Set up the required AWS services by following the documentation provided by AWS.

Configure the environment variables required for the project in the .env file.

### Installing

Run the command `npm install` to install the dependencies.

### Running

Run the command `npm start` to start the development server.

## Contributors

- Ketan Upadhyay

## License

This project is licensed under the MIT License - see the LICENSE file for details.

We hope this README.md file helps you understand the project and how to get started with it.
