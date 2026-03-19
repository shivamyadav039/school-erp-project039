import React from 'react';
import './../assets/css/student-dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faClipboardCheck, faBookOpen, faTasks } from '@fortawesome/free-solid-svg-icons';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-container">
      <div className="welcome-banner student-banner">
        <div className="banner-content">
          <p className="banner-date">Future Forward</p>
          <h2 className="banner-title">Welcome, Student!</h2>
          <p className="banner-goal">Your current GPA is <span className="highlight-goal">3.8</span>. Keep it up!</p>
        </div>
      </div>

      <div className="student-stats-grid">
        <div className="stat-card">
          <FontAwesomeIcon icon={faGraduationCap} className="stat-icon" />
          <div className="stat-info">
            <h3>Overall GPA</h3>
            <p className="stat-value">3.8</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faClipboardCheck} className="stat-icon" />
          <div className="stat-info">
            <h3>Attendance</h3>
            <p className="stat-value">95%</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faBookOpen} className="stat-icon" />
          <div className="stat-info">
            <h3>Total Courses</h3>
            <p className="stat-value">6</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faTasks} className="stat-icon" />
          <div className="stat-info">
            <h3>Pending Assignments</h3>
            <p className="stat-value">3</p>
          </div>
        </div>
      </div>

      <div className="student-content-grid">
        <div className="assignments-card glass-panel">
          <h3>Upcoming Assignments</h3>
          <ul className="assignment-list">
            <li>
              <span>Advanced Mathematics - Integration</span>
              <span className="due-date">Due: Tomorrow</span>
            </li>
            <li>
              <span>Physics Lab Report</span>
              <span className="due-date">Due: Friday</span>
            </li>
            <li>
              <span>History Essay</span>
              <span className="due-date">Due: Next Monday</span>
            </li>
          </ul>
        </div>
        <div className="progress-card glass-panel">
          <h3>Semester Progress</h3>
          <div className="progress-bars">
            <div className="progress-item">
              <span className="progress-label">Mathematics</span>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <span className="progress-label">Physics</span>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{width: '78%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <span className="progress-label">History</span>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
