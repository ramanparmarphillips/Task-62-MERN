#  GoalHERO!™

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
## Overview
GoalHERO!™ is a Goal setting software that allows users to set goals. The software is designed to be used by individuals, teams, and organizations. 

### Note to the reviewer:

This code does not include the snapshot or unit test as laid out in the pdf. I was informed by my Web Development Lecture (Pieter Hills) that this is no longer a requirement for this task. 

## Links
GitHub repository:
- [GitHub](https://github.com/ramanparmarphillips/Task-62-MERN)


## Installation and Setup

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm start` in the terminal to install the required dependencies and start the application.
```bash
npm start
```
This script will install the necessary dependencies and start the application. The application will be available at http://localhost:3000.
Failing that, navigate to each directory and run `npm install` to install the dependencies for each directory.
```bash
npm install
```

There are 3 in total:
1. The Root
2. Frontend
3. Backend

## Security

For the purposes of ease of reviewing this task I have included the .env file containing the JWT secret, mongodb URI. I am aware that this is not a good practice and should not be done in a production environment.

## User roles
It allows for 2 roles to be created, the user and the admin. The user can create, delete or edit goals. The admin has all the same capabilities as the user, but also has the ability give or revoke admin access and delete other users goals.

### User credentials for testing:

> **Admin:**
>- email: raman@gmail.com
>- password: 1234
>
>**User1:**
>- email: janesmith@gmail.com
>- password: 1234
>
>**User2:**
>- email: johndoe@email.com
>- password: 1234
>
>**User3:**
>- email: mikehands@gmail.com
>- password: 1234
>
>(I made everyone's password 1234 for ease of testing)

## System Architecture   
The GoalHERO!™ app is built using a combination of technologies, including create-react-app, Express, Redux, MongoDB, Bcrypt, JWT, and Axios. The front-end of the application is built using create-react-app, which is a popular React-based tool for setting up a new single-page application. Redux is used for managing the state of the application, which includes things like user data, goal data, and admin permissions. Express is used to create the backend server, which handles things like authentication and data retrieval. MongoDB is used to store data for the application, including user accounts and goal data. Bcrypt is used to encrypt user passwords before storing them in the database, which helps ensure user account security. Finally, Axios is used to make API requests from the client-side to the server-side. Overall, this system architecture provides a robust and secure platform for users and admins to create, manage, and track their goals.

## System Requirements

The system requirements for using GoalHERO!™ are relatively straightforward. Users will need to have access to a modern web browser, such as Google Chrome, Mozilla Firefox, or Microsoft Edge. The application is designed to be responsive and accessible on a range of devices, including desktops, laptops, tablets, and mobile phones. For admins, they will need to have a basic understanding of how to manage user accounts and goals within the system. JWTs are used to authenticate users and admins, and to ensure that only authorized users can access the application. The JWTs are stored in the browser's local storage, which allows the application to access the JWTs without having to make a request to the server. The server-side requirements include installing and configuring Node.js, Express, and MongoDB. Additionally, the server should have sufficient resources to handle incoming requests from users and perform database operations efficiently. Overall, the system requirements for GoalHERO!™ are minimal, and the application should be accessible to most users with a basic understanding of how to use a web browser.

GoalHERO!™ has a range of functional and non-functional requirements to ensure that the application meets the needs of users and admins. The functional requirements include the ability for users to create, edit, and delete goals, as well as the ability for admins to manage user accounts and revoke admin access. Additionally, the application should provide a simple and intuitive user interface that is easy to navigate and understand. Non-functional requirements include the need for the application to be secure and reliable, with user data being protected through password encryption and secure data storage. The application should also be responsive and accessible on a range of devices and operating systems. Finally, the application should be scalable, with the ability to handle an increasing number of users and goals as the application grows. Overall, meeting these functional and non-functional requirements is critical to the success of GoalHERO!™, and will help ensure that users and admins can rely on the application to meet their needs.

## Design Patterns and Wire Frames

The design patterns of GoalHERO!™ is based on simplicity and ease of use. The application is designed to be intuitive and easy to navigate, with a simple user interface that allows users to quickly create, edit, and delete goals. Many of the components are designed to be reusable, which allows for the application to be easily scaled and expanded as the application grows.

The Login and Register pages are perfect example of this, as the layout of the page doesn't change allowing for the user to gain familiarity with the interface. The only difference is the text that is displayed on the page, which is determined by the functionality the user is performing (login or register). This allows for the application to be easily expanded to include additional pages, such as a forgot password page, without having to change the layout of the page.


### Login Page:

![](./Documentation/Frame%201.png)

### Register Page:

![](./Documentation/Frame%202.png)

This design continues throughout the application, with the layout of the page and general aesthetics remaining the same, but the text and functionality changing depending on the page. The goal of the application is to provide a simple and intuitive user interface that is easy to navigate and understand, and this design pattern helps to achieve this goal.

### User Dashboard:

![](./Documentation/User%20Dashboard.png)


### Admin Dashboard:

![](./Documentation/Admin%20Dashboad.png) 

Thematically and aesthetically they are the same with expanded functionality allowing the admin to monitor the users on the platform and their activity

## Conclusion

In conclusion, GoalHERO!™ is an innovative and user-friendly goal setting software designed to help individuals, teams, and organizations achieve their goals. The system architecture of the app is robust and secure, built using a combination of technologies including React, Express, Redux, MongoDB, Bcrypt, JWT, and Axios. The application has been designed with simplicity and ease of use in mind, ensuring that users can quickly create, edit, and delete goals. The functional and non-functional requirements have been carefully considered, ensuring that the application is scalable, reliable, and secure. The design patterns and wireframes have been carefully crafted to provide a simple and intuitive user interface that is easy to navigate and understand. Overall, GoalHERO!™ is an excellent tool for anyone looking to set and achieve their goals, and it is sure to become a valuable asset for individuals and organizations alike.
