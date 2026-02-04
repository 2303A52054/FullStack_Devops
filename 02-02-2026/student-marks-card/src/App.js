import React from 'react';
import StudentCard from './StudentCard';
import './App.css';

function App() {
  // Store student details in parent component
  const students = [
    {
      name: "Varshitha",
      rollNumber: "CS101",
      marks: {
        physics: 92,
        chemistry: 88,
        mathematics: 95
      }
    },
    {
      name: "Vaishnavi",
      rollNumber: "CS102",
      marks: {
        physics: 85,
        chemistry: 90,
        mathematics: 87
      }
    },
    {
      name: "Hasini",
      rollNumber: "CS103",
      marks: {
        physics: 78,
        chemistry: 82,
        mathematics: 80
      }
    },
    {
      name: "Akshara",
      rollNumber: "CS104",
      marks: {
        physics: 95,
        chemistry: 93,
        mathematics: 98
      }
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎓 Student Marks Card</h1>
        <p className="subtitle">Academic Performance Report</p>
      </header>
      
      <div className="cards-container">
        {/* Passing data to StudentCard using props */}
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            rollNumber={student.rollNumber}
            marks={student.marks}
          />
        ))}
      </div>
      
      <footer className="App-footer">
        <p>Props Demo: Parent (App) → Child (StudentCard)</p>
      </footer>
    </div>
  );
}

export default App;
