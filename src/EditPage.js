import React, { useState } from 'react';
import ProfileCreation from './ProfileCreation';
import Preferences from './Preferences';
import './EditPage.css';

const EditPage = ({ userProfile }) => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="edit-page">
      <h2>Edit Your Profile and Preferences</h2>
      <div className="edit-buttons">
        <button onClick={() => setActiveSection('profile')} className={activeSection === 'profile' ? 'active' : ''}>
          Edit Profile
        </button>
        <button onClick={() => setActiveSection('preferences')} className={activeSection === 'preferences' ? 'active' : ''}>
          Edit Preferences
        </button>
      </div>
      {activeSection === 'profile' && (
        <div className="edit-section scrollable">
          <ProfileCreation userProfile={userProfile} />
        </div>
      )}
      {activeSection === 'preferences' && (
        <div className="edit-section scrollable">
          <Preferences />
        </div>
      )}
    </div>
  );
}

export default EditPage;
