import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import ProfileCreation from './ProfileCreation';
import Preferences from './Preferences';
import SwipePage from './SwipePage';
import LikesPage from './LikesPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import Layout from './Layout';
import EditPage from './EditPage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const responseMessage = (response) => {
    // Handle successful login response
    setIsLoggedIn(true);
    setUserProfile(response.profileObj); // Assuming response.profileObj contains user profile information
  };

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <ProfileCreation userProfile={userProfile} />
            ) : (
              <>
                <h2 className='title'>Head Over Heels</h2>
                <div className="intro-text">
                  <p>At Head Over Heels, we’re revolutionizing online dating with the power of AI. Whether you’re looking for love, companionship, or something in between, our AI-driven platform makes the process effortless and enjoyable. With our auto swiping AI agents say goodbye to endless swiping and hello to meaningful connections. And all of our advanced features are completely free to use!</p>
                  <p>Ready to let AI guide you to your next great relationship? Let’s fall head over heels!</p>
                </div>
                <GoogleLogin
                  className="sign"
                  onSuccess={credentialResponse => {
                    console.log('Login successful:', credentialResponse);
                    responseMessage(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </>
            )
          } />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/main" element={<Layout />}>
            <Route path="swipe" element={<SwipePage />} />
            <Route path="likes" element={<LikesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
