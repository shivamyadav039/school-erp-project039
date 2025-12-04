import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../assets/css/student.css'; // New: Import the stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    age: '',
    studentClass: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  const { studentId, name, email, phone, gender, age, studentClass } = formData;

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    let filtered = students;

    if (genderFilter !== 'All') {
      filtered = filtered.filter(student => student.gender === genderFilter);
    }
    if (classFilter !== 'All') {
      filtered = filtered.filter(student => student.class === classFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  }, [students, genderFilter, classFilter, searchTerm]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { 'x-auth-token': token }
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert('Could not fetch students. Please log in again.');
    }
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/students', formData, {
        headers: { 'x-auth-token': token }
      });
      fetchStudents();
      setFormData({ studentId: '', name: '', email: '', phone: '', gender: 'Male', age: '', studentClass: '' });
    } catch (err) {
      console.error(err.response.data);
      alert('Failed to add student. Check the console for details.');
    }
  };

  const totalStudents = students.length;
  const totalBoys = students.filter(student => student.gender === 'Male').length;
  const totalGirls = students.filter(student => student.gender === 'Female').length;

  return (
    <div className="management-container">
      <h2 className="management-header">Student Management</h2>

      <div className="summary-section">
        <div className="summary-card">
          <FontAwesomeIcon icon={faUser} className="summary-icon" />
          <div className="summary-info">
            <h3>Total Students</h3>
            <p className="summary-number">{totalStudents}</p>
          </div>
        </div>
        <div className="summary-card">
          <FontAwesomeIcon icon={faMars} className="summary-icon male-icon" />
          <div className="summary-info">
            <h3>Total Boys</h3>
            <p className="summary-number">{totalBoys}</p>
          </div>
        </div>
        <div className="summary-card">
          <FontAwesomeIcon icon={faVenus} className="summary-icon female-icon" />
          <div className="summary-info">
            <h3>Total Girls</h3>
            <p className="summary-number">{totalGirls}</p>
          </div>
        </div>
      </div>

      <div className="form-and-controls">
        <div className="add-student-form">
          <h3>Add New Student</h3>
          <form onSubmit={onSubmit}>
            <input type="text" name="studentId" value={studentId} onChange={onChange} placeholder="Student ID" required />
            <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" />
            <select name="gender" value={gender} onChange={onChange} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="number" name="age" value={age} onChange={onChange} placeholder="Age" required />
            <input type="text" name="studentClass" value={studentClass} onChange={onChange} placeholder="Class" required />
            <button type="submit">Add Student</button>
          </form>
        </div>

        <div className="student-list-container">
          <h3>Student List</h3>
          <div className="search-and-filter">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by Student ID..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                <option value="All">All Classes</option>
                {[...new Set(students.map(s => s.studentClass))].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.gender}</td>
                  <td>{student.age}</td>
                  <td>{student.studentClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;