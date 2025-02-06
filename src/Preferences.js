import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCreation.css'; // Reuse the same CSS for layout

function Preferences() {
  const [formData, setFormData] = useState({
    ageRangeLower: '',
    ageRangeUpper: '',
    heightLowerFeet: '',
    heightLowerInches: '',
    heightUpperFeet: '',
    heightUpperInches: '',
    distance: '',
    interestedIn: '',
    lookingFor: '',
    education: '',
    familyPlans: '',
    drink: '',
    smoke: '',
    workout: '',
    interestedInReligions: [], // Added interested in religions field
    politicalStance: '' // Added political stance field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedReligions = [];
    for (const option of options) {
      if (option.selected) {
        selectedReligions.push(option.value);
      }
    }
    setFormData({ ...formData, interestedInReligions: selectedReligions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Preferences data:', formData);

    const preferencesData = {
      uid: '13', // Assuming a static uid for now
      workout: formData.workout,
      age_min: formData.ageRangeLower,
      age_max: formData.ageRangeUpper,
      distance: formData.distance,
      min_height_feet: formData.heightLowerFeet,
      min_height_inches: formData.heightLowerInches,
      max_height_feet: formData.heightUpperFeet,
      max_height_inches: formData.heightUpperInches,
      political_stance: formData.politicalStance, // Added political stance field
      drink: formData.drink,
      email: 'abc@gmail.com', // Assuming a static email for now
      smoke: formData.smoke,
      goal: formData.lookingFor,
      religion: formData.interestedInReligions,
      interested_in: formData.interestedIn,
      highest_degree: formData.education,
      family_plans: formData.familyPlans
    };

    try {
      const response = await fetch('http://localhost:3001/createPreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencesData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Network response was not ok:', response.status, errorText);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('API response:', result);
      navigate('/main/swipe');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isAgeRangeValid = () => {
    const lower = parseInt(formData.ageRangeLower, 10);
    const upper = parseInt(formData.ageRangeUpper, 10);
    return lower >= 18 && upper >= 18 && lower <= upper;
  };

  const isHeightRangeValid = () => {
    const lowerFeet = parseInt(formData.heightLowerFeet, 10);
    const lowerInches = parseInt(formData.heightLowerInches, 10);
    const upperFeet = parseInt(formData.heightUpperFeet, 10);
    const upperInches = parseInt(formData.heightUpperInches, 10);

    const lowerTotalInches = lowerFeet * 12 + lowerInches;
    const upperTotalInches = upperFeet * 12 + upperInches;

    return lowerTotalInches <= upperTotalInches;
  };

  return (
    <div className="profile-creation">
      <h2>Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Age Range: 
          <div className="age-range">
            <input 
              type="number" 
              name="ageRangeLower" 
              value={formData.ageRangeLower} 
              onChange={handleChange} 
              className={!isAgeRangeValid() ? 'invalid' : ''}
              placeholder="Min"
            />
            <input 
              type="number" 
              name="ageRangeUpper" 
              value={formData.ageRangeUpper} 
              onChange={handleChange} 
              className={!isAgeRangeValid() ? 'invalid' : ''}
              placeholder="Max"
            />
          </div>
        </label>
        <label>Height Range: 
          <div className="height-range">
            <div>
              <input 
                type="number" 
                name="heightLowerFeet" 
                value={formData.heightLowerFeet} 
                onChange={handleChange} 
                className={!isHeightRangeValid() ? 'invalid' : ''}
                placeholder="Feet (Min)"
              />
              <input 
                type="number" 
                name="heightLowerInches" 
                value={formData.heightLowerInches} 
                onChange={handleChange} 
                className={!isHeightRangeValid() ? 'invalid' : ''}
                placeholder="Inches (Min)"
              />
            </div>
            <div>
              <input 
                type="number" 
                name="heightUpperFeet" 
                value={formData.heightUpperFeet} 
                onChange={handleChange} 
                className={!isHeightRangeValid() ? 'invalid' : ''}
                placeholder="Feet (Max)"
              />
              <input 
                type="number" 
                name="heightUpperInches" 
                value={formData.heightUpperInches} 
                onChange={handleChange} 
                className={!isHeightRangeValid() ? 'invalid' : ''}
                placeholder="Inches (Max)"
              />
            </div>
          </div>
        </label>
        <label>Distance: <input type="number" name="distance" value={formData.distance} onChange={handleChange} /></label>
        <label>Interested in: 
          <select name="interestedIn" value={formData.interestedIn} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </label>
        <label>Looking for: 
          <select name="lookingFor" value={formData.lookingFor} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="long term">Long Term</option>
            <option value="short term">Short Term</option>
            <option value="friends">Friends</option>
            <option value="hookup">Hookup</option>
          </select>
        </label>
        <label>Minimum education required: 
          <select name="education" value={formData.education} onChange={handleChange}>
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
        <label>Interested in religions: 
          <select name="interestedInReligions" multiple value={formData.interestedInReligions} onChange={handleMultiSelectChange}>
            <option value="Any">Any</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Sikh">Sikh</option>
            <option value="Jewish">Jewish</option>
            <option value="Bahá'í">Bahá'í</option>
            <option value="Jain">Jain</option>
            <option value="Shinto">Shinto</option>
            <option value="Taoist">Taoist</option>
            <option value="Zoroastrian">Zoroastrian</option>
            <option value="Confucian">Confucian</option>
            <option value="Caodaist">Caodaist</option>
            <option value="Tenrikyo">Tenrikyo</option>
            <option value="Animist">Animist</option>
            <option value="Atheist">Atheist</option>
            <option value="Agnostic">Agnostic</option>
          </select>
        </label>
        <label>Are you ok with kids?: 
          <select name="family" value={formData.familyPlans} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>Is drinking ok?: 
          <select name="drink" value={formData.drink} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>Is smoking ok?: 
          <select name="smoke" value={formData.smoke} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>Workout: 
          <select name="workout" value={formData.workout} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>Political Stance: 
          <select name="politicalStance" value={formData.politicalStance} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="republican">Republican</option>
            <option value="democrat">Democrat</option>
            <option value="independent">Independent</option>
            <option value="either">Either</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Preferences;