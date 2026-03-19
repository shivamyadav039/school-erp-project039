import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
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
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');

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
      const studentsRes = await axiosInstance.get('/students');
      setTotalStudents(studentsRes.data.length);

      const teachersRes = await axiosInstance.get('/teachers');
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
      { date: 'Oct 2', name: 'Gandhi Jayanti', type: 'Holiday', description: 'National Holiday celebrating the birthday of Mahatma Gandhi. School will be completely closed.', appliesTo: 'All Staff & Students' },
      { date: 'Oct 24', name: 'Dussehra', type: 'Festival', description: 'Student holiday for Dussehra festival. Teachers and admin staff must report to campus for term planning sessions.', appliesTo: 'Students Only' },
      { date: 'Nov 12', name: 'Diwali', type: 'Festival', description: 'Festival of lights. Campus closed for celebrations.', appliesTo: 'All Staff & Students' },
      { date: 'Dec 25', name: 'Christmas', type: 'Holiday', description: 'Winter break begins. Merry Christmas!', appliesTo: 'All Staff & Students' },
    ];
    setUpcomingFestivals(festivals);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    alert(`Announcement sent successfully:\n"${announcementText}"`);
    setAnnouncementText('');
    setIsAnnouncementModalOpen(false);
  };

  const currentMonth = 'September 2025';
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const calendarDays = [...Array(30)].map((_, i) => i + 1);

  return (
    <div className="dashboard-content-container"> {/* Use a new container class */}
      
      {/* Announcement Modal */}
      {isAnnouncementModalOpen && (
        <div className="modal-overlay">
          <div className="announcement-modal glass-panel">
            <h3>Send Global Announcement</h3>
            <p>This will be broadcasted to all students and teachers.</p>
            <form onSubmit={handleSendAnnouncement}>
              <textarea 
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Type your announcement here..."
                rows="5"
                required
              />
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAnnouncementModalOpen(false)}>Cancel</button>
                <button type="submit" className="send-btn">Send Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <button className="announcement-btn" onClick={() => setIsAnnouncementModalOpen(true)}>Send Announcement</button>
          </div>
        </div>
        
        <div className="events-card">
          <h3>Upcoming Festivals & Holidays</h3>
          <ul className="event-list">
            {upcomingFestivals.map((event, index) => (
              <li key={index} onClick={() => setSelectedEvent(event)}>
                <span className="event-detail">{event.date} - {event.name}</span>
                <span className={`event-tag ${event.type.toLowerCase()}`}>{event.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-detail-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header ${selectedEvent.type.toLowerCase()}-header`}>
              <h3>{selectedEvent.name}</h3>
              <span className={`event-tag ${selectedEvent.type.toLowerCase()}`}>{selectedEvent.type}</span>
            </div>
            <div className="modal-body">
              <p className="event-info-row"><strong>Date:</strong> {selectedEvent.date}</p>
              <p className="event-info-row"><strong>Applies To:</strong> <span className="applies-to-badge">{selectedEvent.appliesTo}</span></p>
              <div className="event-description-box">
                <p>{selectedEvent.description}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="close-btn" onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Enrollment by Grade</h3>
          <div className="bar-chart-placeholder">
            <div className="bar grade-9" style={{height: '60%'}}></div>
            <div className="bar grade-10" style={{height: '80%'}}></div>
            <div className="bar grade-11" style={{height: '40%'}}></div>
            <div className="bar grade-12" style={{height: '90%'}}></div>
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