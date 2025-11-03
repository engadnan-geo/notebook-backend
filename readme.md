# 🧠 NoteBook Backend API

A secure, scalable **Note Management API** built with **TypeScript**, **Express**, and **MongoDB**.  
It supports **JWT authentication**, **note CRUD operations**, **Cloudinary uploads**, **rate limiting**, **Swagger docs**, and **secure middlewares**.

---

## 🚀 Features

- 🔐 JWT-based Authentication  
- 🧾 CRUD Operations for Notes  
- ☁️ Image Upload with Cloudinary  
- 🧩 Validation using Zod  
- 🧱 MongoDB + Mongoose ODM  
- 🛡️ Helmet Security Headers  
- 🚦 Rate Limiting with Express-Rate-Limit  
- 📜 Swagger API Documentation  
- ⚡ TypeScript for maintainability  
- 🌐 Ready for Render Deployment  

---

src/
├── controllers/           # Business logic
│   ├── auth.ts            # Handles register/login
│   ├── note.ts            # CRUD for notes
│   └── upload.ts          # Upload to Cloudinary
│
├── middleware/            # Custom middlewares
│   ├── auth.ts            # Verifies JWT tokens
│   ├── authorize.ts       # Role-based authorization
│   ├── ratelimiter.ts     # Rate limiting
│   ├── upload.ts          # Multer configuration
│   └── validateZod.ts     # Zod validation handler
│
├── models/                # Mongoose models
│   ├── user.ts
│   └── note.ts
│
├── routes/                # Route handlers
│   ├── authRoutes.ts
│   ├── note.ts
│   └── upload.ts
│
├── schemas/               # Validation schemas
│   ├── userSchema.ts
│   └── noteSchema.ts
│
├── utils/                 # Helper utilities
│   ├── cloudinary.ts
│   ├── generateToken.ts
│   └── swagger.ts
│
└── server.ts              # Application entry point

---

## ⚙️ Environment Variables

Create a `.env` file in your project root with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development


---

🔐 Authentication Routes (/apiauth)
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Authenticate user and return JWT
🗒️ Note Routes (/api)
Method	Endpoint	Description
POST	/note	Create a new note
PUT	/note/:id	Update an existing note
DELETE	/note/:id	Delete a note
GET	/note/:id	Retrieve a single note
GET	/notes	Get all notes (Admin only)
📸 Upload Route (/api)
Method	Endpoint	Description
POST	/profile-picture	Upload image to Cloudinary

---
🧪 Run Locally
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Run production
npm start

Server will start on:
👉 http://localhost:5000


🧠 API Flow Diagram
flowchart TD
    A[User Registers/Login] --> B[JWT Token Issued]
    B --> C[Access Protected Routes]
    C --> D[Create/Update/Delete Note]
    C --> E[Upload Image to Cloudinary]
    E --> F[Image URL Returned]
    C --> G[Admin Views All Notes]
    H[Swagger Docs] --> I[/api/docs]
