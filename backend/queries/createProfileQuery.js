async function createProfile(pool, profileData) {
  const {
    uid, email, age, name, gender, interested_in, city, university, hobbies, occupation, company,
    highest_degree, bio, height_feet, height_inches, music_genre, zodiac, drink, smoke, goal,
    family_plans, longest_relationship, personality, political_stance, workout
  } = profileData;

  await pool.query(
    `INSERT INTO profiles (
      uid, email, age, name, gender, interested_in, city, university, hobbies, occupation, company,
      highest_degree, bio, height_feet, height_inches, music_genre, zodiac, drink, smoke, goal,
      family_plans, longest_relationship, personality, political_stance, workout
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
    )`,
    [
      uid, email, age, name, gender, interested_in, city, university, hobbies, occupation, company,
      highest_degree, bio, height_feet, height_inches, music_genre, zodiac, drink, smoke, goal,
      family_plans, longest_relationship, personality, political_stance, workout
    ]
  );
}

module.exports = {
  createProfile,
};
