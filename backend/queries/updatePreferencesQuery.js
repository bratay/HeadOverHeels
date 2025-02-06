async function updatePreferences(pool, preferencesData) {
  const {
    workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
    uid, political_stance, drink, email, smoke, goal, religion, interested_in,
    highest_degree, family_plans
  } = preferencesData;

  await pool.query(
    `UPDATE preferences
     SET workout = $1, age_min = $2, age_max = $3, distance = $4, min_height_feet = $5, min_height_inches = $6, max_height_feet = $7, max_height_inches = $8,
         political_stance = $9, drink = $10, email = $11, smoke = $12, goal = $13, religion = $14, interested_in = $15,
         highest_degree = $16, family_plans = $17
     WHERE uid = $18`,
    [workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
     political_stance, drink, email, smoke, goal, religion, interested_in,
     highest_degree, family_plans, uid]
  );
}

module.exports = {
  updatePreferences,
};
