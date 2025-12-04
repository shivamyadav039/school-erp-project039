import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserGraduate, faChalkboardTeacher, faMoneyBillWave, faCog, faQuestionCircle, faChevronLeft, faChevronRight, faSearch, faBell, faEnvelope, faChevronDown, faSun, faMoon, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/dashboard-content.css';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1 className="app-logo">ECA</h1>
          <button className="collapse-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
          </button>
        </div>
        <nav className="sidebar-menu">
          <NavLink to="/admin-dashboard" end className={({ isActive }) => "sidebar-menu-item" + (isActive ? " selected" : "")}>
            <FontAwesomeIcon icon={faTachometerAlt} />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/admin-dashboard/students" className={({ isActive }) => "sidebar-menu-item" + (isActive ? " selected" : "")}>
            <FontAwesomeIcon icon={faUserGraduate} />
            {!isCollapsed && <span>Student Management</span>}
          </NavLink>
          <NavLink to="/admin-dashboard/teachers" className={({ isActive }) => "sidebar-menu-item" + (isActive ? " selected" : "")}>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            {!isCollapsed && <span>Teacher Management</span>}
          </NavLink>
          <NavLink to="/admin-dashboard/fees" className={({ isActive }) => "sidebar-menu-item" + (isActive ? " selected" : "")}>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            {!isCollapsed && <span>Fee Management</span>}
          </NavLink>
          <NavLink to="/admin-dashboard/courses" className={({ isActive }) => "sidebar-menu-item" + (isActive ? " selected" : "")}>
            <FontAwesomeIcon icon={faCog} />
            {!isCollapsed && <span>Courses</span>}
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-item">
            <FontAwesomeIcon icon={faQuestionCircle} />
            {!isCollapsed && <span>Help & Support</span>}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`main-content ${isCollapsed ? 'full-width' : ''}`}>
        <header className="dashboard-header-main">
          <div className="search-bar-container">
            <input type="text" placeholder="Search" className="search-input" />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <div className="header-right">
            <FontAwesomeIcon icon={faEnvelope} className="header-icon" />
            <button className="theme-toggle-btn" onClick={toggleDarkMode}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <div className="profile-dropdown-container">
              <div className="profile-trigger" onClick={toggleDropdown}>
                <img src="/path/to/profile-pic.png" alt="Profile" className="profile-pic-header" />
                <div className="profile-info-header">
                  <p className="profile-name-header">Diane Nguyen</p>
                  <p className="profile-role-header">2nd year</p>
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <NavLink to="/admin-dashboard/profile" className="dropdown-item" onClick={toggleDropdown}>Profile</NavLink>
                  <NavLink to="/admin-dashboard/change-password" className="dropdown-item" onClick={toggleDropdown}>Change Password</NavLink>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <Outlet /> {/* This is where DashboardContent will render */}
      </main>
    </div>
  );
};

export default AdminDashboard;