async function blockUser(pool, uid, uidToBlock) {
  const query = `
    UPDATE Matches
    SET status = 'blocked'
    WHERE (uid = $1 AND matchedUid = $2)
       OR (uid = $2 AND matchedUid = $1);
  `;
  const values = [uid, uidToBlock];

  try {
    await pool.query(query, values);
  } catch (err) {
    throw new Error('Error blocking user: ' + err.message);
  }
}

module.exports = { blockUser };
