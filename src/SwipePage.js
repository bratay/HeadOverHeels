import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import './SwipePage.css';
import profileImagePlaceholder from './assets/images/profileImagePlaceholder.jpg';

const SwipePage = ({ userProfile = {} }) => {
  const navigate = useNavigate();

  return (
    <div className="swipe-page">
      <div className="profile-content">
        <div className="profile-header">
          <img 
            src={userProfile.picture || profileImagePlaceholder} 
            alt="Profile" 
            className="profile-picture" 
          />
        </div>
        <h2>{userProfile.name || 'Name not provided'}, {userProfile.age || 'Age not provided'}</h2>
        <div className="bio-box">
          <p><strong>Bio:</strong> {userProfile.bio || 'Bio not provided'}</p>
        </div>
        <p><strong>Location:</strong> {userProfile.city || 'Location not provided'}</p>
        <p><strong>Occupation:</strong> {userProfile.occupation || 'Occupation not provided'}</p>
        <p><strong>Company:</strong> {userProfile.company || 'Company not provided'}</p>
        <p><strong>School:</strong> {userProfile.college || 'School not provided'}</p>
        <p><strong>Degree:</strong> {userProfile.degree || 'Degree not provided'}</p>
        <p><strong>Height:</strong> {userProfile.heightFeet ? `${userProfile.heightFeet}' ${userProfile.heightInches}"` : 'Height not provided'}</p>
        <p><strong>Favorite Music Genres:</strong> {userProfile.musicGenres || 'Music genres not provided'}</p>
        <p><strong>Hobbies:</strong> {userProfile.hobbies ? userProfile.hobbies.join(', ') : 'Hobbies not provided'}</p>
        <p><strong>Zodiac:</strong> {userProfile.zodiac || 'Zodiac not provided'}</p>
        <p><strong>Drink:</strong> {userProfile.drink || 'Drink preference not provided'}</p>
        <p><strong>Smoke:</strong> {userProfile.smoke || 'Smoke preference not provided'}</p>
        <p><strong>Looking For:</strong> {userProfile.lookingFor || 'Looking for not provided'}</p>
        <p><strong>Family Plans:</strong> {userProfile.familyPlans || 'Family plans not provided'}</p>
      </div>
      <div className="swipe-buttons">
        <button className="dislike-button" style={{ backgroundColor: 'red' }}></button>
        <button className="like-button" style={{ backgroundColor: 'green' }}></button>
      </div>
    </div>
  );
}

export default SwipePage;