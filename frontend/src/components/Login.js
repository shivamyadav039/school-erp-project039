import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import './../assets/css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye, 
    faEyeSlash, 
    faUser, 
    faLock, 
    faBuilding, 
    faSyncAlt 
} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('9CCEH');
  const { email, password, role } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    if (captcha !== generatedCaptcha) {
      alert('Invalid CAPTCHA');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (res.data.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (res.data.role === 'student') {
        navigate('/student-dashboard');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.msg);
      } else {
        alert('Network Error. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 7).toUpperCase();
    setGeneratedCaptcha(newCaptcha);
    setCaptcha('');
  };

  return (
    <div className="login-page">
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="login-container">
        
        {/* Left Column */}
        <div className="branding-column">
          <div className="branding-content">
            <p className="welcome-message">Welcome to</p>
            <h1 className="school-name">Eklavya Children Academy</h1>
            <img src={require('./../assets/images/login-illustration.png')} alt="Login Illustration" className="illustration-image" />
            <p className="quote">"Education is the most powerful weapon which you can use to change the world."</p>
            <p className="quote-author">- Nelson Mandela</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="form-column">
          <div className="login-form-container">
            <div className="school-logo">
              <p className="school-text">School</p>
              <p className="school-subtext">Management <span>System</span></p>
            </div>

            <p className="login-title">Log in</p>

            <form onSubmit={onSubmit}>
              <div className="select-group input-with-icon">
                <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                <select 
                  className="office-select"
                  name="role"
                  value={role}
                  onChange={onChange}
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="input-group input-with-icon">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input 
                  type="text" 
                  name="email" 
                  value={email} 
                  onChange={onChange} 
                  placeholder="User ID"
                  required 
                />
              </div>

              <div className="input-group password-group input-with-icon">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={password} 
                  onChange={onChange} 
                  placeholder="Password"
                  required 
                />
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="password-toggle" 
                  onClick={togglePasswordVisibility}
                />
              </div>

              <div className="recaptcha-group">
                <input 
                  type="text" 
                  placeholder="Enter CAPTCHA" 
                  className="captcha-input" 
                  value={captcha}
                  onChange={e => setCaptcha(e.target.value)}
                  required
                />
                <span className="captcha-text">{generatedCaptcha}</span>
                <FontAwesomeIcon icon={faSyncAlt} className="refresh-captcha-icon" onClick={refreshCaptcha} />
              </div>

              <button type="submit" className="login-btn">Login</button>
              <a href="#!" onClick={(e) => e.preventDefault()} className="forgot-password">Forgot your password?</a>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
