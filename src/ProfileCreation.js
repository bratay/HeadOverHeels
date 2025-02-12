import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { popularHobbies } from './hardcodedData';
import './ProfileCreation.css';
import { cityNameApiKey, ipInfoApiKey } from './keys'; 
import { setCurrentUserUID, currentUserEmail } from './CurrentUser';

async function getUniversityNames() {
  const apiUrl = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(university => university.name);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getCityNames(query) {
  const apiUrl = `https://api.api-ninjas.com/v1/city?name=${query}&country=US&limit=300`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': cityNameApiKey
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    //console.log(data);
    return data.map(city => `${city.name}, ${city.region}`);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getUserIP() {
    // Define the URL of the ipify API endpoint
  const apiUrl = 'https://api.ipify.org?format=json';

  // Make the API call using fetch
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User IP Address:', data.ip);
      return data.ip;
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

async function getUserLocation() {
  // const ipInfoApiKey = 'dd61672be71ea2'
  const ipAddress = await getUserIP();
  const apiUrl = `https://ipinfo.io/${ipAddress}/json?token=${ipInfoApiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.loc;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function ProfileCreation({ userProfile }) {
  const [formData, setFormData] = useState({
    age: '',
    name: userProfile ? userProfile.given_name : '',
    city: '',
    hobbies: [],
    occupation: '',
    company: '',
    college: '',
    degree: '',
    bio: '',
    heightFeet: '',
    heightInches: '',
    musicGenres: '',
    zodiac: '',
    drink: '',
    smoke: '',
    lookingFor: '',
    familyPlans: '',
    gender: '',
    politics: '',
    personalityType: '',
    longestRelationship: '',
    workout: ''
  });

  const [filteredCities, setFilteredCities] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [musicGenres, setMusicGenres] = useState([]);
  const [cities, setCities] = useState([]);
  const [universityNames, setUniversityNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // hardcoded hobbies
    setHobbies(popularHobbies);

    // hardcoded music genres
    const popularMusicGenres = [
      'Pop', 'Rock', 'Hip Hop', 'Country', 'Jazz', 
      'Classical', 'Electronic', 'R&B', 'Reggae', 'Blues',
      'Metal', 'Soul', 'Folk', 'Punk', 'Disco',
      'Funk', 'Gospel', 'Latin', 'Techno', 'House'
    ];

    setMusicGenres(popularMusicGenres);

    getUniversityNames().then(names => setUniversityNames(names));
    getCityNames().then(names => setCities(names));
    // getCityNames().then(names => setCities(["NYC", "San Jose", "KC"]));
  }, []); // Ensure this useEffect runs only once by passing an empty dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'city') {
      const filtered = cities.filter(city =>
        city.includes(value)
      );
      setFilteredCities(filtered);
    }
  };

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, city: value });

    if (value) {
      const cityNames = await getCityNames(value);
      console.log(cityNames);
      setFilteredCities(cityNames);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (cityName) => {
    setFormData({ ...formData, city: cityName });
    setFilteredCities([]);
  };

  const handleCollegeChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, college: value });

    if (value) {
      const apiUrl = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const universityNames = data.map(university => university.name).filter(name =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        setUniversityNames(universityNames);
      } catch (error) {
        console.error('Error:', error);
        setUniversityNames([]);
      }
    } else {
      setUniversityNames([]);
    }
  };

  const handleCollegeSelect = (collegeName) => {
    setFormData({ ...formData, college: collegeName });
    setUniversityNames([]);
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedHobbies = [];
    for (const option of options) {
      if (option.selected) {
        selectedHobbies.push(option.value);
      }
    }
    setFormData({ ...formData, hobbies: selectedHobbies });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Profile data:', formData);

    const profileData = {
      email: "placeholder@gmail.com",
      age: formData.age,
      name: formData.name,
      gender: formData.gender,
      city: formData.city,
      university: formData.college,
      hobbies: formData.hobbies,
      occupation: formData.occupation,
      company: formData.company,
      highest_degree: formData.degree,
      bio: formData.bio,
      height_feet: formData.heightFeet,
      height_inches: formData.heightInches,
      music_genre: formData.musicGenres,
      zodiac: formData.zodiac,
      drink: formData.drink,
      smoke: formData.smoke,
      goal: formData.lookingFor,
      family_plans: formData.familyPlans,
      longest_relationship: formData.longestRelationship,
      personality: formData.personalityType,
      political_stance: formData.politics,
      workout: formData.workout,
      googleClientId: sessionStorage.getItem('googleClientId')
    };

    try {
      const response = await fetch('http://localhost:3001/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Network response was not ok:', response.status, errorText);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      //setCurrentUserUID(result.uid); // Set the current user UID
      sessionStorage.setItem('userUID', result.uid); // Save the UID to sessionStorage
      navigate('/preferences');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="profile-creation">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
        <label>Age: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
        <label>Gender: 
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>City: 
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              autoComplete="off"
            />
            {filteredCities.length > 0 && (
              <ul className="autocomplete-list">
                {filteredCities.map((city, index) => (
                  <li key={index} onClick={() => handleCitySelect(city)}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <label>Occupation: <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} /></label>
        <label>Company: <input type="text" name="company" value={formData.company} onChange={handleChange} /></label>
        <label>College: 
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              name="college" 
              value={formData.college} 
              onChange={handleCollegeChange} 
              autoComplete="off"
            />
            {universityNames.length > 0 && (
              <ul className="autocomplete-list">
                {universityNames.map((name, index) => (
                  <li key={index} onClick={() => handleCollegeSelect(name)}>
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <label>Highest school degree: 
          <select name="degree" value={formData.degree} onChange={handleChange}>
            <option value="">Select a degree</option>
            <option value="some highschool">Some Highschool</option>
            <option value="highschool diploma">Highschool Diploma</option>
            <option value="some college">Some College</option>
            <option value="associate degree">Associate Degree</option>
            <option value="bachelor degree">Bachelor Degree</option>
            <option value="masters degree">Masters Degree</option>
            <option value="phd">PhD</option>
          </select>
        </label>
        <label>Bio: <textarea name="bio" value={formData.bio} onChange={handleChange} /></label>
        <label>Height: 
          <select name="heightFeet" value={formData.heightFeet} onChange={handleChange}>
            <option value="">Feet</option>
            {[...Array(8).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <select name="heightInches" value={formData.heightInches} onChange={handleChange}>
            <option value="">Inches</option>
            {[...Array(12).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>
        <label>Favorite music genres: 
          <select name="musicGenres" value={formData.musicGenres} onChange={handleChange}>
            <option value="">Select a genre</option>
            {musicGenres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </label>
        <label>Hobbies: 
          <select name="hobbies" multiple value={formData.hobbies} onChange={handleMultiSelectChange} className="hobbies-select">
            {hobbies.map((hobby, index) => (
              <option key={index} value={hobby}>{hobby}</option>
            ))}
          </select>
        </label>
        <label>Zodiac: 
          <select name="zodiac" value={formData.zodiac} onChange={handleChange}>
            <option value="">Select a sign</option>
            {['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'].map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </label>
        <label>Drink: 
          <select name="drink" value={formData.drink} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="sometimes">Sometimes</option>
            <option value="a lot">A lot</option>
          </select>
        </label>
        <label>Smoke: 
          <select name="smoke" value={formData.smoke} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="sometimes">Sometimes</option>
            <option value="a lot">A lot</option>
          </select>
        </label>
        <label>What are you looking for: 
          <select name="lookingFor" value={formData.lookingFor} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="long term">Long Term</option>
            <option value="short term">Short Term</option>
            <option value="friends">Friends</option>
            <option value="hookup">Hookup</option>
          </select>
        </label>
        <label>Politics: 
          <select name="politics" value={formData.politics} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="republican">Republican</option>
            <option value="democrat">Democrat</option>
            <option value="independent">Independent</option>
          </select>
        </label>
        <label>Longest Relationship: 
          <select name="longestRelationship" value={formData.longestRelationship} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="less than a year">Less than a year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="more than 5 years">More than 5 years</option>
          </select>
        </label>
        <label>Personality Type: 
          <select name="personalityType" value={formData.personalityType} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="extrovert">Extrovert</option>
            <option value="introvert">Introvert</option>
            <option value="mix">Mix (Extroverted Introvert)</option>
          </select>
        </label>
        <label>Family plans: 
          <select name="familyPlans" value={formData.familyPlans} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="want kids">Want Kids</option>
            <option value="don't want kids">Don't Want Kids</option>
            <option value="have kids and want more">Have Kids and Want More</option>
            <option value="have kids and don't want more">Have Kids and Don't Want More</option>
            <option value="not sure">Not Sure</option>
          </select>
        </label>
        <label>Workout: 
          <select name="workout" value={formData.workout} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfileCreation;
