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
    zodiac: '',
    education: '',
    familyPlans: '',
    drink: '',
    smoke: '',
    workout: '',
    interestedInReligions: [] // Added interested in religions field
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Preferences data:', formData);
    // Handle form submission logic here
    navigate('/main/swipe'); // Navigate to the swipe page after form submission
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
        <label>Zodiac: 
          <select name="zodiac" value={formData.zodiac} onChange={handleChange}>
            <option value="">Select a sign</option>
            {['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'].map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </label>
        <label>Education: 
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
        <label>Family plans: 
          <select name="familyPlans" value={formData.familyPlans} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="not sure">Not Sure</option>
            <option value="don't want kids">Don't Want Kids</option>
            <option value="want kids">Want Kids</option>
            <option value="have kids and don't want more">Have Kids and Don't Want More</option>
            <option value="have kids and want more">Have Kids and Want More</option>
          </select>
        </label>
        <label>Drink: 
          <select name="drink" value={formData.drink} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="sometimes">Sometimes</option>
            <option value="alot">A lot</option>
          </select>
        </label>
        <label>Smoke: 
          <select name="smoke" value={formData.smoke} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
            <option value="yes">Yes</option>
            <option value="alot">A lot</option>
          </select>
        </label>
        <label>Workout: <input type="text" name="workout" value={formData.workout} onChange={handleChange} /></label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Preferences;