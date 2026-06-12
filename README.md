# Employee Management System

A decoupled, full-stack **Employee Management System** built using a **3-Tier Architecture** with **Angular 19**, **Node.js (Express)**, and **MySQL 8.0**.

The application enables users to efficiently manage employee records with complete CRUD functionality and real-time search/filtering capabilities.

---

## 🏗️ System Architecture

The application is divided into three completely independent layers:

### 1. Presentation Tier (Frontend)

Built using **Angular 19** with:

* Standalone Components
* Reactive Data Binding
* Angular HttpClient
* Component-Based Architecture
* Responsive UI Design

### 2. Logic Tier (Backend API)

Built using **Node.js** and **Express.js**.

Responsibilities include:

* RESTful API Endpoints
* Business Logic Processing
* JSON Request/Response Handling
* Cross-Origin Resource Sharing (CORS)
* Database Communication Layer

### 3. Data Tier (Database)

Powered by **MySQL 8.0**.

Features:

* Relational Database Design
* Structured Employee Records
* Transactional Data Storage
* Optimized CRUD Operations

---

## 🛠️ Prerequisites

Ensure the following software is installed before running the application:

| Software     | Version         |
| ------------ | --------------- |
| Node.js      | v18.x or higher |
| npm          | v9.x or higher  |
| Angular CLI  | v19.x or higher |
| MySQL Server | v8.0 or higher  |

---

# 🚀 Setup & Installation

Follow the steps below to configure and run the application locally.

---

## 1️⃣ Database Configuration

### Create Database & Tables

Open MySQL Command Line Client or MySQL Workbench and execute:

```sql
SOURCE path/to/database.sql;
```

Alternatively, copy and run the SQL statements contained in `database.sql`.

This script will:

* Create the `employee_db` database
* Create the `employees` table
* Insert sample employee records

---

## 2️⃣ Backend Server Setup

### Navigate to Backend Directory

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Database Connection

Open:

```javascript
backend/db.js
```

Update the MySQL credentials:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'employee_db'
});
```

### Start Backend Server

```bash
node server.js
```

Expected console output:

```bash
Database Connected Successfully
Server Running On Port 3000
```

---

## 3️⃣ Frontend Angular Setup

### Navigate to Frontend Directory

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Angular Development Server

```bash
ng serve
```

Once compilation completes successfully, open:

```text
http://localhost:4200
```

---

## 📁 Project Structure

```text
Employee-Management-System/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── database.sql
│
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/employees`     | Retrieve all employees  |
| GET    | `/employees/:id` | Retrieve employee by ID |
| POST   | `/employees`     | Create a new employee   |
| PUT    | `/employees/:id` | Update employee details |
| DELETE | `/employees/:id` | Delete employee         |

---

## 💡 Key Features

### ✅ Complete CRUD Operations

Manage employee records through:

* Add Employee
* View Employees
* Edit Employee Details
* Delete Employee Records

### ✅ Real-Time Search & Filtering

Instantly filter employee records by:

* Employee Name
* Department

### ✅ Reactive UI Updates

* Automatic state synchronization
* Efficient Angular change detection
* Real-time data refresh after operations

### ✅ RESTful API Integration

* Clean API communication using Angular HttpClient
* JSON-based request/response handling
* Modular service architecture

### ✅ Cache-Busting Mechanism

Timestamp-based request parameters ensure:

* Fresh API responses
* No stale browser cache
* Real-time database consistency

---

## 🧰 Technology Stack

### Frontend

* Angular 19
* TypeScript
* HTML5
* CSS3
* Angular HttpClient

### Backend

* Node.js
* Express.js
* MySQL2

### Database

* MySQL 8.0

---

## 📸 Application Workflow

```text
User Interface (Angular)
          │
          ▼
 REST API Calls
          │
          ▼
 Node.js + Express
          │
          ▼
     MySQL Database
          │
          ▼
 JSON Response
          │
          ▼
 Updated Angular UI
```

---

## 👨‍💻 Author

Developed as a Full-Stack Employee Management System demonstrating:

* Angular Frontend Development
* REST API Design
* Node.js Backend Development
* MySQL Database Integration
* Three-Tier Software Architecture

---

## 📄 License

This project is intended for educational demo purpose. Please ask for permission before re-using.