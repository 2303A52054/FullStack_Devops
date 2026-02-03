import React from 'react';
import './StudentCard.css';

function StudentCard({ name, rollNumber, marks }) {
  // Calculate total marks
  const total = marks.physics + marks.chemistry + marks.mathematics;
  
  // Calculate percentage
  const percentage = (total / 300) * 100;
  
  // Calculate grade based on percentage
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };
  
  const grade = calculateGrade(percentage);
  
  return (
    <div className="student-card">
      <div className="card-header">
        <h2>{name}</h2>
        <p className="roll-number">Roll No: {rollNumber}</p>
      </div>
      
      <div className="card-body">
        <h3>Subject Marks</h3>
        <div className="marks-table">
          <div className="mark-row">
            <span className="subject">Physics:</span>
            <span className="mark">{marks.physics}/100</span>
          </div>
          <div className="mark-row">
            <span className="subject">Chemistry:</span>
            <span className="mark">{marks.chemistry}/100</span>
          </div>
          <div className="mark-row">
            <span className="subject">Mathematics:</span>
            <span className="mark">{marks.mathematics}/100</span>
          </div>
        </div>
        
        <div className="summary">
          <div className="summary-item">
            <span className="label">Total Marks:</span>
            <span className="value">{total}/300</span>
          </div>
          <div className="summary-item">
            <span className="label">Percentage:</span>
            <span className="value">{percentage.toFixed(2)}%</span>
          </div>
          <div className="summary-item">
            <span className="label">Grade:</span>
            <span className={`value grade-${grade.replace('+', 'plus')}`}>{grade}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
