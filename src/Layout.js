import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainPage.css';

const Layout = () => {
  return (
    <div className="main-page">
      <nav>
        <ul>
          <li><Link to="/main/swipe">Swipe</Link></li>
          <li><Link to="/main/likes">Likes</Link></li>
          <li><Link to="/main/messages">Messages</Link></li>
          <li><Link to="/main/profile">Profile</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;