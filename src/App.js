import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import ProfileCreation from './ProfileCreation';
import Preferences from './Preferences';
import SwipePage from './SwipePage';
import LikesPage from './LikesPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import Layout from './Layout';
import EditPage from './EditPage';
import MessageDetailPage from './MessageDetailPage';
import './App.css';
import { setCurrentUserEmail, setCurrentUserUID } from './CurrentUser';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <Router>
      <AppContent 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userProfile={userProfile} 
        setUserProfile={setUserProfile} 
      />
    </Router>
  );
}

const AppContent = ({ isLoggedIn, setIsLoggedIn, userProfile, setUserProfile }) => {
  const navigate = useNavigate();

  const responseMessage = async (credentialResponse) => {
    const userObject = credentialResponse.credential;
    // console.log('User profile:', credentialResponse);

    // Save user's Google Client ID to sessionStorage
    sessionStorage.setItem('googleClientId', credentialResponse.clientId);
    // console.log('Saving Google Client ID to sessionStorage:', credentialResponse.clientId);
    
    try {
      const res = await fetch(`http://localhost:3001/getUserID?googleClientId=${credentialResponse.clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      
      setIsLoggedIn(true);
      if (data.uid) {
        // console.log('User ID:', data.uid);
        sessionStorage.setItem('userUID', data.uid);
        navigate('/main/swipe');
      } else {
        navigate('/createProfile');
      }
    } catch (err) {
      console.error('Error fetching user ID:', err);
      navigate('/createProfile');
    }
  };

  return (
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
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:matchedUid" element={<MessageDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
