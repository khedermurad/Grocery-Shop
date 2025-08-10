# 🍽️ Online Grocery Shop – Fullstack Web Application

A fullstack web application for an **online grocery store**.  
The backend is built with **Spring Boot** and implements **authentication and authorization** using **Spring Security** and **JWT**.  
The frontend is developed with **Angular**, providing a responsive and user-friendly interface.

---

## 🚀 Features

### 👤 User Features
- **User Registration & Login** (JWT-based authentication)
- **Search for Products** by name
- **Browse Products** by categories
- **Add Products to Cart**
- **View Cart Contents**

### 🛠️ Admin Features
- **Admin Login**
- **Manage Products** (create, update, delete)
- **Manage Categories** (create, update, delete)

---

## 💡 Possible Future Improvements
- **Payment Integration** (e.g., Stripe, PayPal)
- **User Profile Management** (edit personal data, change password)
- **Order History & Tracking**
- **Product Reviews & Ratings**
- **Wishlist Functionality**
- **Inventory Management** (stock tracking for admins)
- **Email Notifications** (order confirmation, password reset)
- **Multi-language Support**
- **Discounts & Coupons**

---

## 🏗️ Tech Stack
- **Backend:** Spring Boot, Spring Security, JWT, REST API
- **Frontend:** Angular
- **Database:** PostgreSQL
- **Build Tool:** Maven (backend), Angular CLI (frontend)

---

## 📸 Screenshots

### 🏠 Home Page
<img width="1910" height="960" alt="Image" src="https://github.com/user-attachments/assets/8660a278-d22f-47e6-9a9b-6a54ea8aa506" />

### 🔍 Product Search
<img width="1912" height="962" alt="Image" src="https://github.com/user-attachments/assets/7870084c-9a71-4635-945c-d4d8af1a31fa" />

## ⚙️ Getting Started

1️⃣ Clone the Repository
git clone https://github.com/khedermurad/Grocery-Shop.git
```bash
cd Grocery-Shop
```
2️⃣ Backend Setup (Spring Boot)
```bash
cd backend

# Configure database in src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/grocery-shop
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
```
```bash
# Build and run backend
mvn clean install
mvn spring-boot:run
# Runs on: http://localhost:8080
```
3️⃣ Frontend Setup (Angular)
```bash
cd frontend
npm install
ng serve
# Runs on: http://localhost:4200
```
