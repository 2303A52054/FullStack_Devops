# Event Management System

A comprehensive Event Management System backend built with Node.js, Express, and MongoDB supporting full CRUD operations.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for events
- ✅ Event details: title, date, location, participants
- ✅ Participant management
- ✅ Event status tracking (upcoming, ongoing, completed, cancelled)
- ✅ RESTful API architecture
- ✅ MongoDB database integration
- ✅ Input validation
- ✅ Error handling

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running locally
- Git for version control
- VS Code or any code editor

## Project Structure

```
event-management-system/
│
├── config/
│   └── database.js          # MongoDB connection configuration
│
├── models/
│   └── Event.js             # Event schema/model
│
├── controllers/
│   └── eventController.js   # Business logic for CRUD operations
│
├── routes/
│   └── eventRoutes.js       # API route definitions
│
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── server.js               # Main application entry point
└── README.md               # Project documentation
```

## Installation & Setup

### Step 1: Clone or Copy Project

1. Open VS Code
2. Navigate to `C:\FullStack_DevOps\22-01-2026\`
3. Copy all the project files to this directory

### Step 2: Install Dependencies

Open terminal in VS Code and run:

```bash
npm install
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# Windows
mongod

# Or if using MongoDB service
net start MongoDB
```

### Step 4: Configure Environment Variables

The `.env` file is already configured with default values:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventmanagement
```

Modify if needed based on your MongoDB configuration.

### Step 5: Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Create Event
- **Endpoint:** `POST /api/events`
- **Body:**
```json
{
  "title": "Tech Conference 2026",
  "date": "2026-03-15",
  "location": "Convention Center, New York",
  "description": "Annual technology conference",
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

### 2. Get All Events
- **Endpoint:** `GET /api/events`
- **Response:** Array of all events

### 3. Get Event by ID
- **Endpoint:** `GET /api/events/:id`
- **Example:** `GET /api/events/65abc123def456789`

### 4. Update Event
- **Endpoint:** `PUT /api/events/:id`
- **Body:** (same as create, but partial updates allowed)
```json
{
  "title": "Updated Tech Conference 2026",
  "status": "ongoing"
}
```

### 5. Delete Event
- **Endpoint:** `DELETE /api/events/:id`

### 6. Get Events by Status
- **Endpoint:** `GET /api/events/status/:status`
- **Example:** `GET /api/events/status/upcoming`
- **Valid statuses:** upcoming, ongoing, completed, cancelled

### 7. Add Participant to Event
- **Endpoint:** `POST /api/events/:id/participants`
- **Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567891"
}
```

## Testing the API

### Using Postman

1. **Create Event:**
   - Method: POST
   - URL: `http://localhost:5000/api/events`
   - Headers: `Content-Type: application/json`
   - Body: (JSON from above)

2. **Get All Events:**
   - Method: GET
   - URL: `http://localhost:5000/api/events`

3. **Update Event:**
   - Method: PUT
   - URL: `http://localhost:5000/api/events/{event_id}`
   - Body: Updated fields

4. **Delete Event:**
   - Method: DELETE
   - URL: `http://localhost:5000/api/events/{event_id}`

### Using cURL

```bash
# Create Event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Sample Event","date":"2026-05-01","location":"City Hall"}'

# Get All Events
curl http://localhost:5000/api/events

# Get Event by ID
curl http://localhost:5000/api/events/{event_id}

# Update Event
curl -X PUT http://localhost:5000/api/events/{event_id} \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete Event
curl -X DELETE http://localhost:5000/api/events/{event_id}
```

## Database Schema

### Event Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Event title (max 100 chars) |
| date | Date | Yes | Event date |
| location | String | Yes | Event location |
| participants | Array | No | Array of participant objects |
| description | String | No | Event description (max 500 chars) |
| status | String | No | Event status (default: upcoming) |
| createdAt | Date | Auto | Creation timestamp |
| updatedAt | Date | Auto | Last update timestamp |

### Participant Schema (nested in Event)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Participant name |
| email | String | Yes | Participant email |
| phone | String | No | Participant phone number |

## Pushing to GitHub

### Step 1: Initialize Git Repository

```bash
git init
```

### Step 2: Add Files

```bash
git add .
```

### Step 3: Commit Changes

```bash
git commit -m "Initial commit: Event Management System with MongoDB CRUD"
```

### Step 4: Create GitHub Repository

1. Go to GitHub.com
2. Click "New Repository"
3. Name it: `event-management-system`
4. Don't initialize with README (we already have one)
5. Click "Create Repository"

### Step 5: Push to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/event-management-system.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/eventmanagement |

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request:** Invalid input data
- **404 Not Found:** Event not found
- **500 Internal Server Error:** Server errors

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Success Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* response data */ }
}
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Event capacity management
- [ ] Email notifications
- [ ] Search and filter functionality
- [ ] Event categories/tags
- [ ] File uploads (event images)
- [ ] Frontend integration
- [ ] API rate limiting
- [ ] Pagination for large datasets

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running (`mongod` or `net start MongoDB`)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` file or kill the process using port 5000

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` to install dependencies

## License

This project is open source and available under the MIT License.

## Author

Created as part of FullStack DevOps learning project (22-01-2026)

## Support

For issues or questions, please create an issue in the GitHub repository.
