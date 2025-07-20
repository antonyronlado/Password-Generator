# 🔐 Secure Password Generator (With XML & MongoDB Backends)

A modern password generator app with dual backend options: **XML** and **MongoDB**. Features a responsive UI, customizable password generation options, and *dummy* login/register components for future integration.

---

## 🚀 Features

### ✅ Frontend
- Generate strong passwords with customizable rules:
  - Uppercase / Lowercase
  - Numbers / Symbols
  - Length control
- Copy to clipboard functionality
- Simple and clean responsive UI

### 🧪 Dummy Login/Register UI
> **Note:** The user registration and login forms are **non-functional placeholders**. They currently do **not perform real authentication** and are intended for UI demonstration purposes only.

---

## 🧰 Backend Options

### 📁 XML-Based Backend
- Stores user data (dummy) in an XML file
- Lightweight and easy for demo/testing
- Node.js + Express + `xml2js`

### 🍃 MongoDB-Based Backend
- Dummy user structure stored using MongoDB + Mongoose
- Set up for future real authentication support
- Node.js + Express + Mongoose

---

## 📁 Folder Structure
Password-Generator/
├── frontend/
│ ├── index.html
│ ├── design.css
│ └── script.js
├── Backend(XML)/
│ ├── server.js
│ └── users.xml
├── Backend Server(MongoDB Server)/
│ ├── server.js
│ └── models/
│ └── User.js
├── README.md

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **Storage:** XML (xml2js), MongoDB (Mongoose)

---
### 🔧 Backend Setup Instructions (MongoDB & XML)

This project includes **two backend implementations**: one using **MongoDB**, and another using **XML**. You can choose either based on your testing needs.

#### 1️⃣ MongoDB Backend

```bash
# Go to the MongoDB backend folder
cd backend-mongodb

# Install dependencies
npm install
```

Create a `.env` file inside the `backend-mongodb` folder and add the following:

```
MONGO_URI=your_mongodb_connection_string
```

Then start the MongoDB server:

```bash
node server.js
```

---

#### 2️⃣ XML Backend

```bash
# Go to the XML backend folder
cd backend-xml

# Install dependencies
npm install

# Start the XML backend server
node server.js
```

---

> ✅ You can run **either backend**, but not both simultaneously on the same port unless configured.
>
> ⚠️ Make sure the backend is running before testing the frontend interactions.
