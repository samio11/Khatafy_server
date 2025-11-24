# 🍽️ Khatafy Server

> A comprehensive backend solution for mess (dining hall) management, expense tracking, and collaborative meal planning

[![Live Server](https://img.shields.io/badge/Live-Server-brightgreen)](https://khatafy-server.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg)](https://www.mongodb.com/)

## 🌟 Overview

Khatafy Server is a TypeScript-based RESTful API backend designed for managing shared mess expenses, bazaar (shopping) tracking, and collaborative meal management. Perfect for hostels, shared apartments, or any group living situation where expense tracking and meal management are essential.

**Live Server:** [https://khatafy-server.vercel.app/](https://khatafy-server.vercel.app/)

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Role-Based Access Control (RBAC)** with three distinct roles:
  - **Admin** - Full system access and mess creation
  - **Manager** - Mess management and member coordination
  - **Member** - Expense tracking and contribution management
- JWT-based secure authentication
- File upload support for user profiles

### 🏠 Mess Management
- Create and manage multiple mess groups
- Invite users to join specific mess
- Transfer manager responsibilities
- Update and delete mess data
- Comprehensive mess statistics and overview

### 🛒 Bazaar (Shopping) Tracking
- Record shopping expenses with receipt uploads
- Add, update, and delete individual items
- Manager verification system for expense approval
- Track all bazaar history per mess
- Detailed item-level expense breakdown

### 📊 Expense Analytics
- Per-mess expense tracking
- Individual contribution monitoring
- Shopping history and trends
- Verification status tracking

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Deployment:** Vercel
- **Security:** bcrypt, helmet, cors

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)
- TypeScript (v5.x)
- Git for version control

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samio11/Khatafy_server.git
   cd Khatafy_server
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

The server should now be running on `http://localhost:5000`

## 📁 Project Structure

```
Khatafy_server/
├── src/
│   ├── config/
│   │   ├── db.config.ts           # Database configuration
│   │   └── multer.config.ts       # File upload configuration
│   ├── middlewares/
│   │   ├── checkAuth.ts           # JWT & role verification
│   │   └── errorHandler.ts       # Global error handling
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts # Authentication logic
│   │   │   ├── auth.service.ts    # Auth business logic
│   │   │   ├── auth.route.ts      # Auth endpoints
│   │   │   └── auth.interface.ts  # Auth types
│   │   ├── user/
│   │   │   ├── user.model.ts      # User schema
│   │   │   ├── user.interface.ts  # User types & ERole enum
│   │   │   └── user.service.ts    # User operations
│   │   ├── mess/
│   │   │   ├── mess.controller.ts # Mess management logic
│   │   │   ├── mess.service.ts    # Mess business logic
│   │   │   ├── mess.route.ts      # Mess endpoints
│   │   │   ├── mess.model.ts      # Mess schema
│   │   │   └── mess.interface.ts  # Mess types
│   │   └── bazar/
│   │       ├── bazar.controller.ts # Shopping logic
│   │       ├── bazar.service.ts   # Bazaar business logic
│   │       ├── bazar.route.ts     # Bazaar endpoints
│   │       ├── bazar.model.ts     # Bazaar schema
│   │       └── bazar.interface.ts # Bazaar types
│   ├── utils/
│   │   ├── catchAsync.ts         # Async error wrapper
│   │   └── sendResponse.ts       # Standardized responses
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── .env.example                  # Environment template
├── .gitignore                   # Git ignore file
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

## 🔌 API Endpoints

### Authentication
```http
POST   /api/auth/register          # Register new user (with file upload)
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
```

**Register Request Body:**
- `file`: Profile picture (multipart/form-data)
- User data fields (JSON)

### Mess Management
```http
POST   /api/mess/create                    # Create new mess [Admin]
POST   /api/mess/invite/:messId            # Invite user to mess [Admin, Manager]
POST   /api/mess/shift-manager/:messId     # Transfer manager role [Manager]
GET    /api/mess                           # Get all mess [Admin]
GET    /api/mess/:id                       # Get specific mess data
PATCH  /api/mess/update/:messId            # Update mess info [Manager]
DELETE /api/mess/update/:messId            # Delete mess [Manager]
```

### Bazaar (Shopping) Management
```http
POST   /api/bazar/create/:messId           # Create bazaar entry [Member]
                                           # (with receipt upload)
POST   /api/bazar/add-item/:messId         # Add item to bazaar [Member]
PUT    /api/bazar/update-item/:messId      # Update bazaar item [Member]
DELETE /api/bazar/delete-item/:messId      # Delete bazaar item [Member]
POST   /api/bazar/change-status/:bazarId   # Verify/reject bazaar [Manager]
GET    /api/bazar/bazar-all/:messId        # Get all bazaar by mess
GET    /api/bazar/bazar/:bazarId           # Get specific bazaar details
```

### Health Check
```http
GET    /                                   # Server status
```

## 🔐 Role-Based Access Control

The system implements three distinct user roles:

| Role | Permissions | Key Actions |
|------|-------------|-------------|
| **Admin** | Full system access | Create mess, view all mess, manage system |
| **Manager** | Mess-level management | Invite members, verify expenses, transfer role, update/delete mess |
| **Member** | Basic operations | Create bazaar entries, add/update/delete items, track expenses |

### Role Enum
```typescript
enum ERole {
  admin = "admin",
  manager = "manager",
  member = "member"
}
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration time | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `CLIENT_URL` | Frontend application URL (CORS) | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for file storage | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## 🎯 Usage Examples

### Creating a Mess
```bash
POST /api/mess/create
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Hostel Mess A",
  "location": "Building 1, Floor 2",
  "description": "Main hostel mess for Block A"
}
```

### Recording a Shopping Trip
```bash
POST /api/bazar/create/:messId
Authorization: Bearer <member_token>
Content-Type: multipart/form-data

file: [receipt image]
date: "2024-11-24"
totalAmount: 1500
description: "Weekly grocery shopping"
```

### Adding Items to Bazaar
```bash
POST /api/bazar/add-item/:messId
Authorization: Bearer <member_token>
Content-Type: application/json

{
  "bazarId": "bazaar_id_here",
  "items": [
    { "name": "Rice", "quantity": "5kg", "price": 500 },
    { "name": "Vegetables", "quantity": "2kg", "price": 150 }
  ]
}
```

## 🧪 Testing

Run tests with:
```bash
npm test
# or
yarn test
```

For coverage report:
```bash
npm run test:coverage
```

## 📦 Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard under Settings → Environment Variables

### Build for Production
```bash
npm run build
```

The compiled JavaScript will be in the `dist/` directory.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **Role-Based Authorization** - Granular access control
- **CORS Protection** - Configured allowed origins
- **Helmet.js** - Security headers
- **Input Validation** - Request validation middleware
- **File Upload Validation** - Secure file handling with Multer

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add unit tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Samio**
- GitHub: [@samio11](https://github.com/samio11)
- Repository: [Khatafy_server](https://github.com/samio11/Khatafy_server)

## 🙏 Acknowledgments

- TypeScript community for type-safe development
- Express.js for the robust framework
- MongoDB for flexible data modeling
- Multer for file upload handling
- Vercel for seamless deployment
- All contributors who help improve this project

## 📧 Support

For questions, issues, or feature requests:
- Open an issue on [GitHub Issues](https://github.com/samio11/Khatafy_server/issues)
- Contact the maintainer through GitHub

## 🗺️ Roadmap

- [ ] Real-time notifications for expense approvals
- [ ] Mobile app integration
- [ ] Advanced analytics dashboard
- [ ] Automated expense splitting algorithms
- [ ] Multi-currency support
- [ ] Export reports (PDF/Excel)
- [ ] Integration with payment gateways

---

<div align="center">
  Made with ❤️ by Samio
  
  ⭐ Star this repository if you find it helpful!
  
  **[Report Bug](https://github.com/samio11/Khatafy_server/issues)** · **[Request Feature](https://github.com/samio11/Khatafy_server/issues)**
</div>
