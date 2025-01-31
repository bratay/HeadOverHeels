async function updateProfile(pool, profileData) {
  const { uid, name, age, bio } = profileData;

  await pool.query(
    `UPDATE profiles
     SET name = $1, age = $2, bio = $3
     WHERE uid = $4`,
    [name, age, bio, uid]
  );
}

module.exports = {
  updateProfile,
};
