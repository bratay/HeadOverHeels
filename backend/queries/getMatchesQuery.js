async function getMatches(pool, uid) {
  const query = `
    SELECT m.matchedUid, p.name
    FROM Matches m
    JOIN profiles p ON m.matchedUid = p.uid
    WHERE m.uid = $1 AND m.status = 'matched';
  `;
  const values = [uid];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw new Error('Error retrieving matches: ' + err.message);
  }
}

module.exports = { getMatches };
