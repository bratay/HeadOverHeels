async function updateProfile(pool, profileData) {
  const {
    uid, email, age, name, gender, interested_in, city, university, hobbies, occupation, company,
    highest_degree, bio, height_feet, height_inches, music_genre, zodiac, drink, smoke, goal,
    family_plans, longest_relationship, personality, political_stance, workout
  } = profileData;

  await pool.query(
    `UPDATE profiles
     SET email = $1, age = $2, name = $3, gender = $4, interested_in = $5, city = $6, university = $7, hobbies = $8, occupation = $9, company = $10,
         highest_degree = $11, bio = $12, height_feet = $13, height_inches = $14, music_genre = $15, zodiac = $16, drink = $17, smoke = $18, goal = $19,
         family_plans = $20, longest_relationship = $21, personality = $22, political_stance = $23, workout = $24
     WHERE uid = $25`,
    [email, age, name, gender, interested_in, city, university, hobbies, occupation, company,
     highest_degree, bio, height_feet, height_inches, music_genre, zodiac, drink, smoke, goal,
     family_plans, longest_relationship, personality, political_stance, workout, uid]
  );
}

module.exports = {
  updateProfile,
};
