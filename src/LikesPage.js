import React, { useEffect, useState } from 'react';
import './MainPage.css';
// import { currentUserUID } from './CurrentUser'; // Import currentUser

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const currentUserUID = sessionStorage.getItem('userUID');
        const response = await fetch(`http://localhost:3001/getLikes?uid=${ currentUserUID }`); // Use the uid from currentUser
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Likes:', data);
        setLikes(data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="likes-page">
      <div className="content">
        <h1>Likes</h1> {/* Add a header */}
        {likes.length > 0 ? (
          <ul className="likes-list"> {/* Add a class for styling */}
            {likes.map((like, index) => (
              <li key={index} className="like-item">{like.name}</li> // Add a class for styling
            ))}
          </ul>
        ) : (
          <p>No likes found.</p>
        )}
      </div>
    </div>
  );
}

export default LikesPage;