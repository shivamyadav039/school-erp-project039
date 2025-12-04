import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../assets/css/student.css'; // Reusing the student stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserTie, faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    subject: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  const { teacherId, name, email, phone, subject } = formData;

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    let filtered = teachers;

    if (subjectFilter !== 'All') {
      filtered = filtered.filter(teacher => teacher.subject === subjectFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTeachers(filtered);
  }, [teachers, subjectFilter, searchTerm]);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/teachers', {
        headers: { 'x-auth-token': token }
      });
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      alert('Could not fetch teachers. Please log in again.');
    }
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/teachers', formData, {
        headers: { 'x-auth-token': token }
      });
      fetchTeachers();
      setFormData({ teacherId: '', name: '', email: '', phone: '', subject: '' });
    } catch (err) {
      console.error(err.response.data);
      alert('Failed to add teacher. Check the console for details.');
    }
  };

  // Helper functions for summary counts
  const totalTeachers = teachers.length;
  const totalMaleTeachers = teachers.filter(teacher => teacher.gender === 'Male').length;
  const totalFemaleTeachers = teachers.filter(teacher => teacher.gender === 'Female').length;

  return (
    <div className="management-container">
      <h2 className="management-header">Teacher Management</h2>

      <div className="summary-section">
        <div className="summary-card">
          <FontAwesomeIcon icon={faUserTie} className="summary-icon" />
          <div className="summary-info">
            <h3>Total Teachers</h3>
            <p className="summary-number">{totalTeachers}</p>
          </div>
        </div>
        <div className="summary-card">
          <FontAwesomeIcon icon={faMars} className="summary-icon male-icon" />
          <div className="summary-info">
            <h3>Total Male</h3>
            <p className="summary-number">{totalMaleTeachers}</p>
          </div>
        </div>
        <div className="summary-card">
          <FontAwesomeIcon icon={faVenus} className="summary-icon female-icon" />
          <div className="summary-info">
            <h3>Total Female</h3>
            <p className="summary-number">{totalFemaleTeachers}</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="form-and-controls">
        <div className="add-student-form">
          <h3>Add New Teacher</h3>
          <form onSubmit={onSubmit}>
            <input type="text" name="teacherId" value={teacherId} onChange={onChange} placeholder="Teacher ID" required />
            <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" />
            <input type="text" name="subject" value={subject} onChange={onChange} placeholder="Subject" required />
            <button type="submit">Add Teacher</button>
          </form>
        </div>

        <div className="student-list-container">
          <h3>Teacher List</h3>
          <div className="search-and-filter">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by Teacher ID..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
                <option value="All">All Subjects</option>
                {[...new Set(teachers.map(t => t.subject))].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <table className="student-table">
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(teacher => (
                <tr key={teacher._id}>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;