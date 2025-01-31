async function updatePreferences(pool, preferencesData) {
  const { uid, preferences } = preferencesData;

  await pool.query(
    `UPDATE preferences
     SET preferences = $1
     WHERE uid = $2`,
    [preferences, uid]
  );
}

module.exports = {
  updatePreferences,
};
