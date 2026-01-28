# 🚀 Quick Start Guide

## Prerequisites

- Node.js (v18+)
- MongoDB running locally or connection string ready
- pnpm installed (`npm install -g pnpm`)

## Environment Setup

### Backend (.env file in `notesandpyqssharda-backend/`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
```

### Frontend (.env.local in `notesandpyqsharda-frontend/`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
```

## Running the Application

### 1. Start Backend

```bash
cd notesandpyqssharda-backend
pnpm install
pnpm run dev
```

Backend will run on: **http://localhost:5000**

### 2. Start Frontend

```bash
cd notesandpyqsharda-frontend
pnpm install
pnpm run dev
```

Frontend will run on: **http://localhost:3100**

## Testing the Application

### Create Test Accounts

1. **Admin Account**: Register first user and manually set role to "admin" in MongoDB
2. **Mod Account**: User can request mod role from dashboard
3. **Regular User**: Register normally

### Test Upload Flow

1. Login as regular user
2. Upload a note/pyq/syllabus (status: pending)
3. Login as mod to approve/reject
4. Check explore page to see approved content

## Common Issues & Fixes

### Issue: "fetchNotes is not a function"

**Fixed!** ✅ The function name has been corrected to `fetchMyNotes` in DashboardPage

### Issue: 500 Error on Note Upload

**Fixed!** ✅

- Added proper semester number conversion
- Fixed .env.local configuration
- Ensured backend routes are properly registered

### Issue: CORS Errors

- Verify backend CORS config allows `http://localhost:3100`
- Check `withCredentials: true` in axios config

### Issue: Authentication Not Working

- Clear browser cookies
- Check JWT secrets are set in backend .env
- Verify MongoDB is running

## Project Structure

```
📦 Notes and Pyqs Sharda
├── 📂 notesandpyqsharda-backend/
│   ├── 📂 src/
│   │   ├── 📂 controllers/      # Business logic
│   │   ├── 📂 models/           # MongoDB schemas
│   │   ├── 📂 routes/           # API endpoints
│   │   ├── 📂 middlewares/      # Auth, validation
│   │   └── index.ts             # Server entry
│   └── .env                      # Backend config
│
└── 📂 notesandpyqsharda-frontend/
    ├── 📂 app/                   # Next.js pages
    ├── 📂 components/            # React components
    ├── 📂 lib/
    │   └── 📂 api/              # API client layer
    ├── 📂 stores/               # Zustand state management
    └── .env.local               # Frontend config
```

## Key Features Implemented ✅

### User Features

- ✅ Authentication (Register, Login, Email Verification)
- ✅ Upload Notes, PYQs, Syllabus
- ✅ View personal uploads with status
- ✅ Edit/Delete own uploads
- ✅ Request moderator role
- ✅ Search & explore approved content

### Moderator Features

- ✅ Review pending submissions
- ✅ Approve/Reject with reasons
- ✅ Dedicated mod dashboard

### Admin Features

- ✅ User management (activate/deactivate/delete)
- ✅ Moderator management
- ✅ Review mod requests
- ✅ Content oversight

## API Endpoints Reference

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/request-mod` - Request mod role

### Notes (User)

- `GET /api/v1/notes/all-notes` - Get approved notes
- `GET /api/v1/notes/my-notes` - Get my notes
- `POST /api/v1/notes` - Upload note (multipart/form-data)
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note
- `GET /api/v1/notes/search-notes?q=query` - Search notes

### Moderation

- `GET /api/v1/mod/notes/pending` - Get pending notes
- `PATCH /api/v1/mod/notes/:id/approve` - Approve note
- `PATCH /api/v1/mod/notes/:id/reject` - Reject note

### Admin

- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/mods` - Get all moderators
- `GET /api/v1/admin/mods/requests` - Get mod requests
- `PATCH /api/v1/admin/mods/review/:userId` - Approve/reject mod request

## Next Steps for Production

1. **Environment Variables**

   - Set up production MongoDB cluster
   - Configure production Cloudinary account
   - Use production email service
   - Generate strong JWT secrets

2. **Deployment**

   - Backend: Deploy to Railway, Heroku, or DigitalOcean
   - Frontend: Deploy to Vercel or Netlify
   - Database: Use MongoDB Atlas

3. **Security**

   - Enable rate limiting
   - Add input sanitization
   - Implement CSRF protection
   - Use HTTPS only

4. **Performance**
   - Add caching layer (Redis)
   - Optimize images/files
   - Enable CDN for static assets
   - Database indexing

## Support

For issues or questions, check:

- `PROJECT_SETUP_GUIDE.md` - Detailed setup instructions
- `lib/api/README.md` - API documentation
- `stores/README.md` - State management docs

Happy coding! 🎉
