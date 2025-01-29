import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <nav>
        <ul>
          <li><Link to="/swipe">Swipe</Link></li>
          <li><Link to="/likes">Likes</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <div className="content">
        {/* Content for the selected tab will go here */}
      </div>
    </div>
  );
}

export default MainPage;