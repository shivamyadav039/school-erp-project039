import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import Profile from './components/Profile';
import DashboardContent from './components/DashboardContent'; // This component now has all the content
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentDashboard from './components/StudentDashboard';
import FeeManagement from './components/FeeManagement';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<DashboardContent />} /> {/* Renders the content */}
            <Route path="students" element={<StudentManagement />} />
            <Route path="teachers" element={<TeacherManagement />} />
            <Route path="fees" element={<FeeManagement />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/student-dashboard" element={<StudentDashboardPage />}>
            <Route index element={<StudentDashboard />} />
            {/* Additional routes will go here as needed */}
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;