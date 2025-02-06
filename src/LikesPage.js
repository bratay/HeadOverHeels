import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { currentUserUID } from './CurrentUser'; // Import currentUser

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/getLikes?uid=${currentUserUID}`); // Use the uid from currentUser
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
        {likes.length > 0 ? (
          <ul>
            {likes.map((like, index) => (
              <li key={index}>{like.name}</li> // Assuming the API returns an array of objects with a 'name' property
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