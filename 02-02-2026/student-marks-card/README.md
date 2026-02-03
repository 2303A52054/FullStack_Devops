# 🎓 Student Marks Card Application

A React application demonstrating the use of **Props** for passing data from parent to child components.

## 📋 Project Overview

This project displays student marks cards with automatic grade calculation. It demonstrates:
- Parent-child component communication using props
- Reusable components
- Dynamic grade calculation
- Clean and responsive UI

## 👥 Students

- **Varshitha** - Roll No: CS101
- **Vaishnavi** - Roll No: CS102
- **Hasini** - Roll No: CS103
- **Akshara** - Roll No: CS104

## 🏗️ Component Structure

```
App (Parent Component)
├── Stores student data
└── StudentCard (Child Component) × 4
    ├── Receives props (name, rollNumber, marks)
    ├── Calculates total marks
    ├── Calculates percentage
    └── Determines grade
```

## ✨ Features

- ✅ Props-based data flow from parent to child
- ✅ Automatic total marks calculation
- ✅ Percentage calculation
- ✅ Grade assignment based on percentage
- ✅ Reusable StudentCard component
- ✅ Responsive design
- ✅ Beautiful gradient UI

## 📊 Grading System

| Percentage | Grade |
|------------|-------|
| 90% - 100% | A+    |
| 80% - 89%  | A     |
| 70% - 79%  | B+    |
| 60% - 69%  | B     |
| 50% - 59%  | C     |
| 40% - 49%  | D     |
| Below 40%  | F     |

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- VS Code (recommended)

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd FullStack_DevOps/02-02-2026/student-marks-card
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The application will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
student-marks-card/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Parent component with student data
│   ├── App.css             # App styling
│   ├── StudentCard.js      # Child component for displaying marks
│   ├── StudentCard.css     # StudentCard styling
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
├── .gitignore
└── README.md
```

## 🔄 Data Flow

1. **App.js** (Parent) stores student data in an array
2. Data is passed to **StudentCard.js** (Child) via props
3. StudentCard receives: `name`, `rollNumber`, `marks`
4. StudentCard calculates: `total`, `percentage`, `grade`
5. Results are displayed in a formatted card

## 🎨 Customization

### Adding More Students

Edit the `students` array in `src/App.js`:

```javascript
const students = [
  {
    name: "New Student",
    rollNumber: "CS105",
    marks: {
      physics: 85,
      chemistry: 90,
      mathematics: 88
    }
  },
  // ... existing students
];
```

### Modifying Subjects

Update the marks structure in both `App.js` and `StudentCard.js` to include different subjects.

## 📤 GitHub Push Instructions

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add Student Marks Card application with props demo"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

## 🎯 Learning Outcomes

- Understanding React Props
- Parent-Child component communication
- Component reusability
- State management in functional components
- CSS styling in React
- Dynamic calculations in components

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## 🛠️ Technologies Used

- React 18
- JavaScript (ES6+)
- CSS3
- HTML5

## 📞 Support

If you encounter any issues, check:
1. Node.js is installed: `node --version`
2. Dependencies are installed: `npm install`
3. Port 3000 is available

---

**Created for:** FullStack DevOps Training  
**Date:** 02-02-2026  
**Topic:** React Props Demo
