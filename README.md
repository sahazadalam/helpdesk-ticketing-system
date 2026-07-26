# 🎫 HelpDesk Ticketing System

### 🚀 Enterprise IT Support & Ticket Management Platform

<p align="center">
  <a href="https://helpdeskk-ticketing-system.netlify.app">
    <img src="https://img.shields.io/badge/🌐 Live_Demo-Visit_Now-0A66C2?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Netlify-Frontend-00C7B7?style=for-the-badge&logo=netlify" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge" />
</p>

<p align="center">
<b>A modern MERN Stack IT Service Desk platform designed for managing support requests, issue tracking, workflow automation, and efficient communication between users and support teams.</b>
</p>

---

# 🌟 Project Overview

**HelpDesk Ticketing System** is a production-style IT support platform that enables organizations to efficiently manage customer and employee support requests.

The application simulates a real-world enterprise service desk where users can submit issues, support agents can resolve them, and administrators can manage the complete support workflow.

It demonstrates modern full-stack development practices, authentication, role-based authorization, REST APIs, database management, and responsive UI design.

---

# 🚀 Live Demo

### 🌐 Frontend

https://helpdeskk-ticketing-system.netlify.app

### ⚙ Backend API

https://helpdesk-backend-ris4.onrender.com

---

# ✨ Core Features

## 🎫 Ticket Management

* Create Support Tickets
* Edit Ticket Information
* Delete Tickets
* View Ticket Details
* Track Ticket Progress
* Ticket Priority Management
* Ticket Category Support
* Search & Filter Tickets

---

## 🔐 Authentication & Security

* JWT Authentication
* Secure Login
* User Registration
* Password Encryption
* Protected Routes
* Session Management
* Role-Based Authorization

---

## 👥 User Management

* User Registration
* User Profiles
* Manage User Accounts
* User Dashboard
* Ticket History

---

## 💬 Communication

* Add Comments
* Internal Discussions
* Ticket Conversations
* Activity Timeline
* Status Updates

---

## 📊 Dashboard

* Total Tickets
* Open Tickets
* In Progress Tickets
* Resolved Tickets
* Recent Activities
* Assigned Tickets
* User Statistics

---

# 👥 User Roles

## 👤 User

Users can:

* Register/Login
* Create Tickets
* View Their Tickets
* Update Ticket Details
* Add Comments
* Track Ticket Status
* Close Their Tickets

---

## 🧑‍💻 Support Agent

Support Agents can:

* View Assigned Tickets
* Accept New Tickets
* Update Ticket Status
* Resolve Issues
* Reply to Customers
* Add Internal Notes
* Monitor Assigned Work

---

## 👑 Administrator

Administrators have complete system control.

Features include:

* Manage All Users
* Manage All Tickets
* Assign Tickets
* Change Ticket Priority
* Manage Agents
* View Analytics
* System Administration
* Dashboard Monitoring

---

# 📈 Ticket Workflow

```text
User Creates Ticket
        │
        ▼
Open
        │
        ▼
Assigned to Agent
        │
        ▼
In Progress
        │
        ▼
Waiting for User (Optional)
        │
        ▼
Resolved
        │
        ▼
Closed
```

---

# 🎨 User Interface

The application features a clean and modern interface with:

* Responsive Design
* Mobile-Friendly Layout
* Professional Dashboard
* Smooth Navigation
* Clean Typography
* Modern Color Palette
* Interactive Components
* User-Friendly Forms
* Organized Ticket Tables

---

# 🛠️ Technology Stack

| Category        | Technology       |
| --------------- | ---------------- |
| Frontend        | React.js         |
| Styling         | Tailwind CSS     |
| Backend         | Node.js          |
| Framework       | Express.js       |
| Database        | MongoDB Atlas    |
| Authentication  | JWT              |
| API             | REST API         |
| Deployment      | Netlify & Render |
| Version Control | Git & GitHub     |

---

# 🏗️ System Architecture

```bash
HelpDesk-Ticketing-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│
├── README.md
└── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sahazadalam/helpdesk-ticketing-system.git

cd helpdesk-ticketing-system
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file

```env
MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

PORT=5000
```

Run the backend

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm start
```

Application runs at:

```text
http://localhost:3000
```

---

# 🔑 Demo Accounts

### 👑 Administrator

Email

```text
sahazadadmin@gmail.com
```

Password

```text
Sahzad@123
```

---

### 🧑‍💻 Support Agent

Email

```text
sahazadagent@gmail.com
```

Password

```text
Sahzad2123
```

---

### 👤 User

Create a new account using the Registration page.

---

# 📂 Main Modules

* Authentication Module
* User Management
* Ticket Management
* Dashboard
* Comment System
* Role Management
* Ticket Assignment
* Ticket Status Tracking
* Notification Ready Architecture

---

# 📸 Screenshots

Add your screenshots here.

```md
![Dashboard](images/dashboard.png)

![Ticket List](images/tickets.png)

![Ticket Details](images/details.png)

![Admin Panel](images/admin.png)
```

---

# 🚀 Future Enhancements

* Email Notifications
* Real-Time Chat
* Live Ticket Updates
* File Upload Support
* Ticket Attachments
* Priority Levels
* SLA Management
* Knowledge Base
* AI Support Assistant
* Smart Ticket Categorization
* Ticket Analytics Dashboard
* Performance Reports
* Dark Mode
* Multi-Language Support
* Mobile Application
* Docker Deployment
* Kubernetes Support
* CI/CD Pipeline with GitHub Actions

---

# 📊 Project Highlights

* Enterprise-style Help Desk Platform
* MERN Stack Architecture
* Secure JWT Authentication
* Role-Based Authorization
* RESTful API Development
* MongoDB Database Design
* Responsive Dashboard
* Modern UI Components
* Ticket Workflow Management
* Professional Folder Structure
* Production-Ready Codebase
* Cloud Deployment (Netlify + Render)

---

# 🎯 Learning Outcomes

This project demonstrates expertise in:

* Full-Stack Web Development
* REST API Development
* Authentication & Authorization
* MongoDB Database Design
* Express.js Backend Development
* React.js Frontend Development
* Role-Based Access Control (RBAC)
* CRUD Operations
* Cloud Deployment
* Real-World Business Workflow Implementation

---

# 🤝 Contributing

Contributions are welcome!

```bash
1. Fork the repository

2. Create a feature branch

git checkout -b feature/new-feature

3. Commit your changes

git commit -m "Add new feature"

4. Push to your branch

git push origin feature/new-feature

5. Open a Pull Request
```

---

# 👨‍💻 Author

## **Sahazad Alam Ansari**

📧 Email

```text
sahazadalam02@gmail.com
```

💻 GitHub

https://github.com/sahazadalam

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

📢 Share it with others

🤝 Contribute to improve it

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
🚀 Built with MERN Stack • Secure by Design • Engineered for Modern IT Support
</p>
