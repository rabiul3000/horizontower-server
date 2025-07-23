# HomeHorizon API

[![Node.js](https://img.shields.io/badge/node.js-16.x-green)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/express-5.x-blue)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/mongodb-5.x-green)](https://www.mongodb.com/)  

---

## Overview

HomeHorizon API is the backend server for the **HomeHorizon Building Management System (BMS)** — a full-featured platform to manage apartments, users, agreements, payments, announcements, coupons, and more. It is built with Node.js, Express.js, and MongoDB, providing RESTful APIs secured with JWT-based using google firebase highly secure authentication and role-based access control.

---

## Live API

Explore the live deployed API here:  
🌐 [https://homehorizonserver.vercel.app](https://homehorizonserver.vercel.app)

## Live Website (Frontend)

Live Website:  
🌐 [https://horizontower-3c51a.web.app/](https://horizontower-3c51a.web.app)

---

## Repository

Backend source code repository:  
🔗 [https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-rabiul3000.git](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-rabiul3000.git)

---

## Features

- 👥 **User management** with roles and permissions (Admin, Member, User)  
- 🏢 **Apartment data** retrieval and administration  
- 📝 **Agreement creation, approval, and rejection** workflow  
- 📢 **Announcements management**  
- 🎟️ **Coupon system** with creation, status updates, and validation  
- 💳 **Payment processing** integrated with Stripe  
- 🔒 **Middleware** for token verification and role-based access control  
- 📋 **Request logging** with Morgan  
- 🌐 **CORS configuration** with frontend URL whitelisting  
- 🔧 **Environment variable** support via dotenv  

---

## Tech Stack

- 🚀 **Node.js** & **Express.js** for server and REST API  
- 🗄️ **MongoDB** with Mongoose ODM  
- 💳 **Stripe** for payment intent and processing  
- 🔐 **Firebase Admin SDK** for authentication and user verification  
- 🛠️ Middleware: **CORS**, **Morgan**, **dotenv**  


---

## Tech project structure
```
homehorizon-api/
├── config/
│   └── mongoInit.js            # MongoDB connection initialization
├── controllers/
│   ├── agreementController.js
│   ├── apartmentController.js
│   ├── announcementController.js
│   ├── couponController.js
│   ├── paymentController.js
│   └── userController.js
├── middlewares/
│   ├── checkRole.js            # Role validation middlewares (isUser, etc.)
│   ├── isAgreementExist.js
│   ├── verifyAdmin.js
│   ├── verifyMember.js
│   ├── verifyPayment.js
│   ├── verifyToken.js          # JWT token verification
│   └── verifyUser.js
├── routes/
│   ├── agreementRoutes.js
│   ├── apartmentRoutes.js
│   ├── announcementRoutes.js
│   ├── couponRoutes.js
│   ├── paymentRoutes.js
│   ├── routes.js               # Main router combining all routes
│   └── userRoutes.js
├── .env                       # Environment variables (not committed)
├── package.json
├── server.js                  # Entry point
└── README.md
```
## API Endpoints

### User Routes (`/user`)

| Method | Endpoint                      | Description                               | Auth Required | Roles        |
|--------|-------------------------------|-----------------------------------------|---------------|--------------|
| GET    | `/user/get_user`               | Get authenticated user details          | Yes           | User         |
| POST   | `/user/create`                 | Create a new user                       | No            | Public       |
| GET    | `/user/user_exist/:email`      | Check if user exists by email           | No            | Public       |
| GET    | `/user/all`                   | Get all users                          | Yes           | Admin        |
| PATCH  | `/user/remove_member_to_user`  | Remove member from a user               | Yes           | Admin        |

---

### Apartment Routes (`/apartment`)

| Method | Endpoint                     | Description                              | Auth Required | Roles        |
|--------|------------------------------|----------------------------------------|---------------|--------------|
| GET    | `/apartment/all`              | Get all apartments                     | No            | Public       |
| GET    | `/apartment/apartments_for_admin` | Get apartments (admin view)          | Yes           | Admin        |

---

### Agreement Routes (`/agreement`)

| Method | Endpoint                   | Description                            | Auth Required | Roles        |
|--------|----------------------------|--------------------------------------|---------------|--------------|
| POST   | `/agreement/create`         | Create a new agreement                | Yes           | User         |
| GET    | `/agreement/all`            | Get all agreements                   | Yes           | Admin        |
| PATCH  | `/agreement/accept/:id`     | Accept agreement by ID               | Yes           | Admin        |
| PATCH  | `/agreement/reject/:id`     | Reject agreement by ID               | Yes           | Admin        |
| GET    | `/agreement/:email`         | Get agreement by member email        | Yes           | Member       |

---

### Announcement Routes (`/announcement`)

| Method | Endpoint                   | Description                          | Auth Required | Roles        |
|--------|----------------------------|------------------------------------|---------------|--------------|
| GET    | `/announcement/all`         | Get all announcements              | No            | Public       |
| POST   | `/announcement/make`        | Create a new announcement          | Yes           | Admin        |

---

### Coupon Routes (`/coupon`)

| Method | Endpoint                   | Description                          | Auth Required | Roles        |
|--------|----------------------------|------------------------------------|---------------|--------------|
| GET    | `/coupon/all`               | Get all coupons                    | No            | Public       |
| POST   | `/coupon/create`            | Create a new coupon                | Yes           | Admin        |
| PATCH  | `/coupon/change_status`     | Change coupon status               | Yes           | Admin        |
| POST   | `/coupon/validate`          | Validate a coupon                  | Yes           | Member       |

---

### Payment Routes (`/payment`)

| Method | Endpoint                     | Description                         | Auth Required | Roles          |
|--------|------------------------------|-----------------------------------|---------------|----------------|
| POST   | `/payment/create-intent`      | Create Stripe payment intent      | Yes           | Verified Payment|
| POST   | `/payment/save`               | Save payment details              | Yes           | Member         |
| GET    | `/payment/payment_history`    | Get user payment history          | Yes           | Member         |


# Middleware Summary
- verifyToken: Validates firebase admin token for protected routes.
- verifyUser / verifyAdmin / verifyMember: Role-based access control.
- verifyPayment: Additional verification for payment routes.
- isUser: Checks if the requester has user role.
- isAgreementExist: Checks if an agreement already exists before creating.
- Others for business logic validation.

## Getting Started


## Prerequisites

- 🖥️ **Node.js** (v16 or above recommended)  
- 🗄️ **MongoDB** instance (local or cloud)  
- 💳 **Stripe** account and API keys  
- 🔐 **Firebase** project (for authentication)  
- ⚙️ `.env` file with necessary environment variables  


### Installation

1. Clone the repo:

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-rabiul3000.git
cd b11a12-server-side-rabiul3000
npm install
npm start

