import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import './../assets/css/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axiosInstance.get('/auth/me');
                setUser(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handlePhotoUpload = async () => {
        if (!photo) {
            alert('Please select a photo to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);

        try {
            await axiosInstance.post('/auth/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Photo uploaded successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to upload photo.');
        }
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-details">
                <div className="profile-photo">
                    <img
                        src={user.photo || 'https://via.placeholder.com/150'}
                        alt="User Profile"
                    />
                    <div className="photo-upload-section">
                        <input type="file" onChange={handlePhotoChange} />
                        <button onClick={handlePhotoUpload}>Upload Photo</button>
                    </div>
                </div>
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;