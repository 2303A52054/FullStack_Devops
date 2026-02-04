# Step-by-Step Setup Guide for Event Management System

## Complete Setup Instructions for VS Code

### Phase 1: Prepare Your Directory Structure

1. **Open File Explorer**
   - Navigate to `C:\FullStack_DevOps\`
   - Create a folder named `22-01-2026` (if it doesn't exist)
   - Full path should be: `C:\FullStack_DevOps\22-01-2026\`

2. **Copy Project Files**
   - Copy all the project files to this directory
   - Your structure should look like:
   ```
   C:\FullStack_DevOps\22-01-2026\
   ├── config/
   ├── controllers/
   ├── models/
   ├── routes/
   ├── .env
   ├── .gitignore
   ├── package.json
   ├── server.js
   ├── README.md
   └── sample-data.js
   ```

### Phase 2: Open Project in VS Code

1. **Launch VS Code**
   - Open VS Code
   - Click File → Open Folder
   - Navigate to `C:\FullStack_DevOps\22-01-2026\`
   - Click "Select Folder"

2. **Open Integrated Terminal**
   - Press `Ctrl + `` (backtick) OR
   - View → Terminal

### Phase 3: Install MongoDB (if not already installed)

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Install with default settings

2. **Verify MongoDB Installation**
   ```bash
   mongod --version
   ```

3. **Start MongoDB Service**
   - Open Command Prompt as Administrator
   ```bash
   net start MongoDB
   ```
   OR run `mongod` in a separate terminal

### Phase 4: Install Node.js Dependencies

In VS Code terminal:

```bash
# Verify Node.js is installed
node --version
npm --version

# Install all dependencies
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- body-parser
- nodemon (for development)

### Phase 5: Configure Environment

1. **Check .env file**
   - Open `.env` file in VS Code
   - Verify settings:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventmanagement
   ```

2. **Modify if needed**
   - Change PORT if 5000 is already in use
   - Change database name if desired

### Phase 6: Start the Server

In VS Code terminal:

```bash
# Development mode (auto-restart on changes)
npm run dev

# OR production mode
npm start
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
API available at http://localhost:5000/api
```

### Phase 7: Test the API

#### Option 1: Using Web Browser
- Open: http://localhost:5000/
- You should see the API welcome message with all endpoints

#### Option 2: Using Postman

1. **Install Postman** (if not installed)
   - Download from: https://www.postman.com/downloads/

2. **Test CREATE Event**
   - Method: POST
   - URL: `http://localhost:5000/api/events`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "title": "Test Event",
     "date": "2026-03-15",
     "location": "Test Location",
     "description": "This is a test event",
     "participants": [
       {
         "name": "Test User",
         "email": "test@example.com",
         "phone": "1234567890"
       }
     ]
   }
   ```
   - Click "Send"

3. **Test GET All Events**
   - Method: GET
   - URL: `http://localhost:5000/api/events`
   - Click "Send"

4. **Test GET Event by ID**
   - Copy an event ID from the previous response
   - Method: GET
   - URL: `http://localhost:5000/api/events/{EVENT_ID}`
   - Click "Send"

5. **Test UPDATE Event**
   - Method: PUT
   - URL: `http://localhost:5000/api/events/{EVENT_ID}`
   - Body:
   ```json
   {
     "status": "completed"
   }
   ```
   - Click "Send"

6. **Test DELETE Event**
   - Method: DELETE
   - URL: `http://localhost:5000/api/events/{EVENT_ID}`
   - Click "Send"

#### Option 3: Using VS Code REST Client Extension

1. **Install REST Client Extension**
   - In VS Code, go to Extensions (Ctrl+Shift+X)
   - Search for "REST Client"
   - Install by Huachao Mao

2. **Create test.http file**
   - Create a new file: `test.http`
   - Add:
   ```http
   ### Create Event
   POST http://localhost:5000/api/events
   Content-Type: application/json

   {
     "title": "REST Client Test",
     "date": "2026-04-01",
     "location": "VS Code"
   }

   ### Get All Events
   GET http://localhost:5000/api/events

   ### Get Event by ID (replace with actual ID)
   GET http://localhost:5000/api/events/65abc123def

   ### Update Event (replace with actual ID)
   PUT http://localhost:5000/api/events/65abc123def
   Content-Type: application/json

   {
     "status": "ongoing"
   }

   ### Delete Event (replace with actual ID)
   DELETE http://localhost:5000/api/events/65abc123def
   ```

3. **Run Requests**
   - Click "Send Request" above each section

### Phase 8: Verify Database

1. **Using MongoDB Compass** (GUI Tool)
   - Download: https://www.mongodb.com/try/download/compass
   - Connect to: `mongodb://localhost:27017`
   - Find database: `eventmanagement`
   - View collection: `events`

2. **Using Mongo Shell**
   ```bash
   mongosh
   use eventmanagement
   db.events.find().pretty()
   ```

### Phase 9: Initialize Git and Push to GitHub

1. **Initialize Git Repository**
   ```bash
   git init
   ```

2. **Add Files to Git**
   ```bash
   git add .
   ```

3. **Commit Changes**
   ```bash
   git commit -m "Initial commit: Event Management System with MongoDB CRUD operations"
   ```

4. **Create GitHub Repository**
   - Go to https://github.com
   - Click "+" → "New repository"
   - Repository name: `event-management-system`
   - Description: "Event Management System with MongoDB CRUD operations"
   - Keep it Public or Private (your choice)
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

5. **Link Local Repository to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/event-management-system.git
   ```
   Replace `YOUR_USERNAME` with your actual GitHub username

6. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

7. **Enter Credentials**
   - If prompted, enter your GitHub username and password
   - OR use Personal Access Token (recommended)
   - To create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

8. **Verify on GitHub**
   - Go to your GitHub repository
   - Refresh the page
   - You should see all your files

### Phase 10: Common Issues and Solutions

#### Issue 1: MongoDB Connection Failed
**Error:** `MongooseServerSelectionError`
**Solution:**
- Make sure MongoDB is running
- Check: `net start MongoDB` (Windows)
- OR run `mongod` in a separate terminal

#### Issue 2: Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
- Change PORT in `.env` file to another port (e.g., 5001)
- OR find and kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

#### Issue 3: Module Not Found
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
npm install
```

#### Issue 4: Git Not Recognized
**Error:** `'git' is not recognized`
**Solution:**
- Install Git: https://git-scm.com/download/win
- Restart VS Code after installation

#### Issue 5: Cannot Push to GitHub
**Error:** Authentication failed
**Solution:**
- Use Personal Access Token instead of password
- Create token at: GitHub → Settings → Developer settings → Personal access tokens
- Use token as password when prompted

### Phase 11: Making Changes and Updating GitHub

Whenever you make changes:

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Phase 12: Additional Testing with Sample Data

Use the sample data from `sample-data.js` to test your API:

1. Open Postman
2. Copy one of the sample events from `sample-data.js`
3. Send POST request to create it
4. Test other CRUD operations on it

### Congratulations! 🎉

Your Event Management System is now:
- ✅ Running locally on VS Code
- ✅ Connected to MongoDB
- ✅ All CRUD operations working
- ✅ Pushed to GitHub

## Next Steps

1. Add more features (authentication, file uploads, etc.)
2. Create a frontend (React, Vue, or Angular)
3. Deploy to cloud (Heroku, AWS, Azure)
4. Add automated testing
5. Implement CI/CD pipeline

## Useful VS Code Extensions

- **REST Client** - Test APIs without leaving VS Code
- **MongoDB for VS Code** - View MongoDB data in VS Code
- **GitLens** - Enhanced Git integration
- **Thunder Client** - Alternative API testing tool
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting

## Resources

- Node.js Documentation: https://nodejs.org/docs
- Express.js Guide: https://expressjs.com/
- MongoDB Manual: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/

Happy Coding! 🚀
