# Event Booking Platform

## 🏠 Architecture Overview
The **Event Booking Platform** is a microservices-based system built using **Node.js, Express.js, PostgreSQL, and RabbitMQ**. It follows an event-driven architecture where services communicate asynchronously via RabbitMQ.

### ✨ Key Features
- User authentication and management  
- Event creation and listing  
- Booking system for users  
- Notification service to send emails  
- Kubernetes deployment support  

---

## 🏶 System Architecture
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
📂 Booking_Service/
    🗁 .env
    📋 controllers.js
    📋 db.js
    📋 index.js
    📋 models.js
    📋 package.json
    📋 rabbitmqPublisher.js
    📋 routes.js

📂 Event_Service/
    🗁 .env
    📋 controllers.js
    📋 db.js
    📋 index.js
    📋 models.js
    📋 package.json
    📋 routes.js

📂 Notification_Service/
    📋 index.js
    📋 package.json
    📋 rabbitConsumer.js
    📋 sendemail.js
    📋 testPublisher.js

📂 User_Service/
    🗁 .env
    📋 controllers.js
    📋 db.js
    📋 index.js
    📋 models.js
    📋 package.json
    📋 routes.js

📂 kubernetes/
        📋 booking-service-deployment.yaml
        📋 event-service-deployment.yaml
        📋 notification-service-deployment.yaml
        📋 user-service-deployment.yaml
        📋 configmap.yaml
        📋 secrets.yaml
        📋 postgres-deployment.yaml
        📋 rabbitmq-deployment.yaml
        📋 namespace.yaml 
        📋 ingress.yaml
```

---

## 🚀 How to Run
### 1. Clone the Repository
```sh
git clone https://github.com/mishal-A2/Booking-Online-platform--Microservices-based.git
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

### 6. Start Services
Run each service for deployment by port forwarding:
user-service: 
kubectl port-forward service/user-service -n online-event-booking-mishal 5001:80   

event-service:
kubectl port-forward service/event-service -n online-event-booking-mishal 5002:80  

booking-service:
kubectl port-forward svc/booking-service 5003:80 -n online-event-booking-mishal

notificatioin-service:
kubectl logs -n online-event-booking-mishal -l app=notification-service --tail=50 -f

ingress:
kubectl port-forward svc/ingress-nginx-controller -n ingress-nginx 8080:80


   


---

## 🌐 Deploying with Kubernetes

### 1. Apply Kubernetes Configurations
```sh
kubectl apply -f kubernetes/deployment/
kubectl apply -f kubernetes/services/
kubectl apply -f kubernetes/ingress/
```

### 3. Check Pod and Service Status
```sh
kubectl get pods
kubectl get services
```

### 4. Access Services via Ingress
Make sure ingress is enabled, then access services using:
```sh
kubectl get ingress
```

---

## 🛠️ Testing the APIs
You can test the services using **Postman**.

- **User Service**: `POST /register`, `POST /login`
- **Event Service**: `GET /events`, `POST /events`
- **Booking Service**: `POST /bookings`
- **Notification Service**: Runs in the background and listens for messages.

---

## 🛠️ Technologies Used
- **Node.js & Express.js** – Backend framework  
- **PostgreSQL** – Database  
- **RabbitMQ** – Message broker  
- **Docker** – Containerization  
- **Kubernetes** – Orchestration  
- **Postman** – API testing  

---

## 📚 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Contributors
- Mishal Ali  
---

