const getUserID = async (pool, googleClientId) => {
  console.log('googleClient Id:', googleClientId); 
  const query = 'SELECT uid FROM profiles WHERE google_Client_id = $1';
  const values = [googleClientId];

  try {
    const res = await pool.query(query, values);
    if (res.rows.length > 0) {
      return res.rows[0].uid;
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  }
};

module.exports = { getUserID };
