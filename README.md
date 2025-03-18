# Event Booking Platform

## 🏰 Architecture Overview
The **Event Booking Platform** is a microservices-based system built using **Node.js, Express.js, PostgreSQL, and RabbitMQ**. It follows an event-driven architecture where services communicate asynchronously via RabbitMQ.

### ✨ Key Features
- User authentication and management  
- Event creation and listing  
- Booking system for users  
- Notification service to send emails  

---

## 🏦 System Architecture
The system consists of **four microservices**:

### 1. **User Service**
   - Manages user authentication & registration  
   - Handles user data storage  
   - Uses PostgreSQL as a database  
   - Exposes RESTful APIs for user management  

### 2. **Event Service**
   - Allows event creation, modification, and retrieval  
   - Stores event details in PostgreSQL  
   - Exposes REST APIs for managing events  

### 3. **Booking Service**
   - Handles event bookings by users  
   - Publishes booking events to RabbitMQ  
   - Uses PostgreSQL for booking records  

### 4. **Notification Service**
   - Listens to RabbitMQ for booking confirmation messages  
   - Sends email notifications to users  

---

## 🔗 Service Communication Flow
1. A user books an event via **Booking Service**.  
2. The **Booking Service** publishes a message (`booking_notifications`) to RabbitMQ.  
3. The **Notification Service** consumes this message and sends an email confirmation.  

---

## 🗂 Project Structure
```
event-booking-platform/
🗂 Booking_Service/
    🗁 .env
    🗋 controllers.js
    🗋 db.js
    🗋 index.js
    🗋 models.js
    🗋 package.json
    🗋 rabbitmqPublisher.js
    🗋 routes.js

🗂 Event_Service/
    🗁 .env
    🗋 controllers.js
    🗋 db.js
    🗋 index.js
    🗋 models.js
    🗋 package.json
    🗋 routes.js

🗂 Notification_Service/
    🗋 index.js
    🗋 package.json
    🗋 rabbitConsumer.js
    🗋 sendemail.js
    🗋 testPublisher.js

🗂 User_Service/
    🗁 .env
    🗋 controllers.js
    🗋 db.js
    🗋 index.js
    🗋 models.js
    🗋 package.json
    🗋 routes.js
```

---

## 🚀 How to Run
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/event-booking-platform.git
cd event-booking-platform
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in each service with the required **RabbitMQ** and **PostgreSQL** credentials.

### 4. Start RabbitMQ (if using Docker)
```sh
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

### 5. Start Services
Run each service separately:
```sh
cd User_Service && node index.js
cd Event_Service && node index.js
cd Booking_Service && node index.js
cd Notification_Service && node index.js
```
OR use `docker-compose up` for **Docker-based deployment**.

---

## 📢 Testing the APIs
You can test the services using **Postman**.

- **User Service**: `POST /register`, `POST /login`
- **Event Service**: `GET /events`, `POST /events`
- **Booking Service**: `POST /bookings`
- **Notification Service**: Runs in the background and listens for messages.

---

## 🔧 Technologies Used
- **Node.js & Express.js** – Backend framework  
- **PostgreSQL** – Database  
- **RabbitMQ** – Message broker  
- **Docker** – Containerization  
- **Postman** – API testing  

---

## 📚 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Contributors
- Mishal Ali  
---
