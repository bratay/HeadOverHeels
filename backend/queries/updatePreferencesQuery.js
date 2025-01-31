async function updatePreferences(pool, preferencesData) {
  const {
    workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
    uid, personality, political_stance, zodiac, drink, email, smoke, goal, religion, interested_in,
    highest_degree, family_plans
  } = preferencesData;

  await pool.query(
    `UPDATE preferences
     SET workout = $1, age_min = $2, age_max = $3, distance = $4, min_height_feet = $5, min_height_inches = $6, max_height_feet = $7, max_height_inches = $8,
         personality = $9, political_stance = $10, zodiac = $11, drink = $12, email = $13, smoke = $14, goal = $15, religion = $16, interested_in = $17,
         highest_degree = $18, family_plans = $19
     WHERE uid = $20`,
    [workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
     personality, political_stance, zodiac, drink, email, smoke, goal, religion, interested_in,
     highest_degree, family_plans, uid]
  );
}

module.exports = {
  updatePreferences,
};
