async function createPreferences(pool, preferencesData) {
  const {
    workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
    uid, political_stance, drink, email, smoke, goal, religion, interested_in,
    highest_degree, family_plans
  } = preferencesData;

  await pool.query(
    `INSERT INTO preferences (
      workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
      uid, political_stance, drink, email, smoke, goal, religion, interested_in,
      highest_degree, family_plans
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
    )`,
    [
      workout, age_min, age_max, distance, min_height_feet, min_height_inches, max_height_feet, max_height_inches,
      uid, political_stance, drink, email, smoke, goal, religion, interested_in,
      highest_degree, family_plans
    ]
  );
}

module.exports = {
  createPreferences,
};
