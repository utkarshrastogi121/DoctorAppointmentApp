# 🩺 Doctor Appointment App

A full-stack web application that enables users to seamlessly book appointments with doctors and provides doctors with tools to manage their schedules and profiles. Includes real-time booking, authentication, image uploads via Cloudinary, and secure payment integration using Stripe.

---

## 🔗 Live Demo

🌐 [Frontend](https://doctorappointmentapp-frontend.onrender.com)  
🛠️ [Backend API](https://doctorappointmentapp-1-mw7u.onrender.com)

---

## ✨ Features

- 👤 User & Doctor authentication
- 📅 Real-time appointment booking system
- 💳 Secure payments via **Stripe**
- ☁️ Image uploads handled with **Cloudinary**
- 🔐 JWT-based authentication & protected routes
- 🧑‍⚕️ Doctor profile management
- 📊 Admin dashboard to manage users, doctors, and appointments
- 📬 Optional email confirmations
- 🔍 Filter doctors by specialty, city, etc.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT-based secure authentication
- **Payments**: Stripe API
- **Image Storage**: Cloudinary
- **Deployment**: Render

---

## 🧰 Installation & Setup

### 📁 Clone the Repository

```bash
git clone https://github.com/utkarshrastogi121/DoctorAppointmentApp.git
cd DoctorAppointmentApp
```
### 📦 Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside the backend folder and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
### 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## 🤝 Contributing
Pull requests and feature suggestions are welcome.
Check the issues page for open tasks.
