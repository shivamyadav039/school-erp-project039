import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faCalendarAlt, faClipboardList, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/dashboard-content.css';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DashboardContent = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [upcomingFestivals, setUpcomingFestivals] = useState([]);

  // This useEffect will fetch data on component mount and then every 30 seconds
  useEffect(() => {
    fetchSummaryData();
    fetchUpcomingFestivals();
    
    const interval = setInterval(() => {
      fetchSummaryData();
      fetchUpcomingFestivals();
    }, 30000); // Refreshes every 30 seconds
    
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const fetchSummaryData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const studentsRes = await axios.get('http://localhost:5000/api/students', {
        headers: { 'x-auth-token': token }
      });
      setTotalStudents(studentsRes.data.length);

      const teachersRes = await axios.get('http://localhost:5000/api/teachers', {
        headers: { 'x-auth-token': token }
      });
      setTotalTeachers(teachersRes.data.length);
      
      setUpcomingEventsCount(12);
      setActiveCoursesCount(45);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUpcomingFestivals = async () => {
    // Placeholder for API call
    const festivals = [
      { date: 'Oct 2', name: 'Gandhi Jayanti', type: 'Holiday' },
      { date: 'Oct 24', name: 'Dussehra', type: 'Festival' },
      { date: 'Nov 12', name: 'Diwali', type: 'Festival' },
      { date: 'Dec 25', name: 'Christmas', type: 'Holiday' },
    ];
    setUpcomingFestivals(festivals);
  };

  const currentMonth = 'September 2025';
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const calendarDays = [...Array(30)].map((_, i) => i + 1);

  return (
    <div className="dashboard-content-container"> {/* Use a new container class */}
      <div className="welcome-banner">
        <div className="banner-content">
          <p className="banner-date">{currentDate}</p>
          <h2 className="banner-title">Welcome back, Diane!</h2>
          <p className="banner-goal">You've finished <span className="highlight-goal">85%</span> of your weekly goal!</p>
        </div>
        <div className="banner-illustration">
          <div className="graduation-cap"></div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FontAwesomeIcon icon={faUserGraduate} className="stat-icon" />
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-value">{totalStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="stat-icon" />
          <div className="stat-info">
            <h3>Total Teachers</h3>
            <p className="stat-value">{totalTeachers}</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faCalendarAlt} className="stat-icon" />
          <div className="stat-info">
            <h3>Upcoming Events</h3>
            <p className="stat-value">{upcomingEventsCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faClipboardList} className="stat-icon" />
          <div className="stat-info">
            <h3>Active Courses</h3>
            <p className="stat-value">{activeCoursesCount}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="calendar-card">
          <div className="card-header">
            <h3>{currentMonth}</h3>
            <div className="calendar-nav">
              <FontAwesomeIcon icon={faArrowLeft} />
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
          <div className="calendar-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {calendarDays.map((day) => (
              <div key={day} className={`calendar-day ${[14].includes(day) ? 'active' : ''} ${[15, 20].includes(day) ? 'highlighted-day' : ''}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="quick-actions">
            <button className="add-event-btn">Add New Event</button>
            <button className="announcement-btn">Send Announcement</button>
          </div>
        </div>
        
        <div className="events-card">
          <h3>Upcoming Festivals & Holidays</h3>
          <ul className="event-list">
            {upcomingFestivals.map((event, index) => (
              <li key={index}>
                <span className="event-detail">{event.date} - {event.name}</span>
                <span className={`event-tag ${event.type.toLowerCase()}`}>{event.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Enrollment by Grade</h3>
          <div className="bar-chart-placeholder">
            <div className="bar grade-9"></div>
            <div className="bar grade-10"></div>
            <div className="bar grade-11"></div>
            <div className="bar grade-12"></div>
          </div>
          <div className="chart-legend">
            <span>Grade 9</span>
            <span>Grade 10</span>
            <span>Grade 11</span>
            <span>Grade 12</span>
          </div>
        </div>
        <div className="chart-card">
          <h3>Teacher Distribution</h3>
          <div className="donut-chart-placeholder">
            <div className="donut-segment math"></div>
            <div className="donut-segment science"></div>
            <div className="donut-segment humanities"></div>
            <div className="donut-segment arts"></div>
            <div className="donut-segment physical-ed"></div>
          </div>
          <div className="chart-legend-bottom">
            <span>Mathematics</span>
            <span>Science</span>
            <span>Humanities</span>
            <span>Arts</span>
            <span>Physical Education</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;