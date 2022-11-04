const fs = require('fs').promises;
const path = require('path');

const handleGetTalker = async () => {
  const talkerdb = path.resolve(__dirname, '.', 'talker.json');
  const file = await fs.readFile(talkerdb, 'utf-8');
  return JSON.parse(file);
};

module.exports = { handleGetTalker };
