Employee Management System (Angular Frontend)

This project is an Angular-based frontend for the Employee Management System, designed to work with the GraphQL-based backend API. It provides a user-friendly interface for managing employees with authentication capabilities.
Features

    User authentication (Login/Signup)

    Employee CRUD operations

    Add employee 

    Filter and search employees

    Responsive design

    Angular Material UI components

    GraphQL API integration

Technologies Used

    Angular 19

    Apollo Angular (GraphQL client)

    Angular Material

    RxJS

    TypeScript

Project Structure

|-- src/
|   |-- app/
|   |   |-- core/
|   |   |   |-- guards/
|   |   |   |   └── auth.guard.ts              # Authentication guard
|   |   |   |-- services/
|   |   |   |   ├── auth.service.ts            # Authentication service
|   |   |   |   └── employee.service.ts        # Employee service
|   |   |
|   |   |-- features/
|   |   |   |-- auth/
|   |   |   |   ├── login/
|   |   |   |   |   ├── login.component.ts
|   |   |   |   |   ├── login.component.html
|   |   |   |   |   └── login.component.scss
|   |   |   |   ├── signup/
|   |   |   |   |   ├── signup.component.ts
|   |   |   |   |   ├── signup.component.html
|   |   |   |   |   └── signup.component.scss
|   |   |
|   |   |   |-- employee/
|   |   |   |   ├── list/
|   |   |   |   |   ├── list.component.ts
|   |   |   |   |   ├── list.component.html
|   |   |   |   |   └── list.component.scss
|   |   |   |   ├── view/
|   |   |   |   |   ├── view.component.ts
|   |   |   |   |   ├── view.component.html
|   |   |   |   |   └── view.component.scss
|   |   |   |   ├── add/
|   |   |   |   |   ├── add.component.ts
|   |   |   |   |   ├── add.component.html
|   |   |   |   |   └── add.component.scss
|   |   |   |   ├── edit/
|   |   |   |   |   ├── edit.component.ts
|   |   |   |   |   ├── edit.component.html
|   |   |   |   |   └── edit.component.scss
|   |
|   |-- graphql


Installation
Prerequisites

    Node.js (>=16.x)

    Angular CLI (npm install -g @angular/cli)

    Employee Management API (backend) running    


Steps

    Clone the repository:
      

    git clone <repo-url>
    cd <frontend-folder>

    Install dependencies:
    
    npm install   

    Start the development server:

    ng serve

    Open your browser and navigate to:
    Copy

    http://localhost:4200



Usage

Core Services
Auth Service (auth.service.ts)

    Handles user authentication (login/signup)

    Manages JWT token storage/retrieval

    Provides authentication state

Employee Service (employee.service.ts)

    Handles all GraphQL operations for employees:

        getAllEmployees()

        getEmployeeById(id)

        addEmployee(employeeData)

        updateEmployee(id, updateData)

        deleteEmployee(id)

Guards
Auth Guard (auth.guard.ts)

    Protects routes requiring authentication

    Redirects unauthorized users to login page

    Checks for valid JWT token

Key Components
Auth Feature

    login.component - User login form

    signup.component - User registration form

 Authentication

    Signup: Create a new account

    Login: Access the system with your credentials

 Employee Management

    View All Employees: See the complete list of employees

    Add Employee: Create new employee records

    Edit Employee: Update existing employee information

    Delete Employee: Remove employee records

    View Details: See comprehensive employee information

API Integration

The frontend communicates with the following GraphQL endpoints:

    login: User authentication

    signup: User registration

    Employee CRUD operations:

        getAllEmployees

        addEmployee

        updateEmployee

        deleteEmployee


License

Distributed under Basit Ali. Contact me for more information.        