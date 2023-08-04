const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const getFilenamesFromDB = async (limit) => {
  try {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database,
    });

    // Implement the logic to query the 'queue' table and get the filenames
    const query = 'SELECT filename FROM queue ORDER BY createdAt ASC LIMIT ?';
    const results = await db.all(query, limit);

    return results.map((row) => row.filename);
  } catch (error) {
    console.error('Error querying the database:', error);
    return [];
  }
};

module.exports = { getFilenamesFromDB };