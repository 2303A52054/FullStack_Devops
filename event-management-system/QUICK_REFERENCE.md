# Event Management System - Quick Reference

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📡 API Endpoints Reference

### Base URL
```
http://localhost:5000/api
```

### CRUD Operations

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| POST | `/events` | Create new event | ✅ Yes |
| GET | `/events` | Get all events | ❌ No |
| GET | `/events/:id` | Get event by ID | ❌ No |
| PUT | `/events/:id` | Update event | ✅ Yes |
| DELETE | `/events/:id` | Delete event | ❌ No |
| GET | `/events/status/:status` | Get events by status | ❌ No |
| POST | `/events/:id/participants` | Add participant | ✅ Yes |

## 📋 Request Body Examples

### Create Event
```json
{
  "title": "Tech Conference 2026",
  "date": "2026-03-15",
  "location": "Convention Center, NY",
  "description": "Annual tech conference",
  "status": "upcoming",
  "participants": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ]
}
```

### Update Event
```json
{
  "title": "Updated Title",
  "status": "completed"
}
```

### Add Participant
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+0987654321"
}
```

## 🎯 Valid Event Status Values
- `upcoming`
- `ongoing`
- `completed`
- `cancelled`

## 🔧 Postman Testing Steps

1. **Create Event**
   - POST → `http://localhost:5000/api/events`
   - Headers: `Content-Type: application/json`
   - Body: Raw JSON (see example above)

2. **Get All Events**
   - GET → `http://localhost:5000/api/events`

3. **Get Single Event**
   - GET → `http://localhost:5000/api/events/{event_id}`

4. **Update Event**
   - PUT → `http://localhost:5000/api/events/{event_id}`
   - Body: Fields to update

5. **Delete Event**
   - DELETE → `http://localhost:5000/api/events/{event_id}`

## 💾 MongoDB Commands

```bash
# Start MongoDB shell
mongosh

# Switch to database
use eventmanagement

# View all events
db.events.find().pretty()

# Count events
db.events.countDocuments()

# Find by status
db.events.find({status: "upcoming"}).pretty()

# Delete all events (careful!)
db.events.deleteMany({})
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Run `net start MongoDB` (Windows) |
| Port 5000 in use | Change PORT in `.env` file |
| Module not found | Run `npm install` |
| Git not working | Install from git-scm.com |

## 📦 Git Commands

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Add remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main
```

## 📚 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* event data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error"
}
```

## 🔐 Required Fields

| Field | Required | Type | Max Length |
|-------|----------|------|------------|
| title | ✅ Yes | String | 100 chars |
| date | ✅ Yes | Date | - |
| location | ✅ Yes | String | - |
| description | ❌ No | String | 500 chars |
| status | ❌ No | String | - |
| participants | ❌ No | Array | - |

## 📞 Support

- Check SETUP_GUIDE.md for detailed instructions
- Check README.md for complete documentation
- Review sample-data.js for testing examples

---
**Date Created:** 22-01-2026  
**Project:** Event Management System  
**Tech Stack:** Node.js + Express + MongoDB
