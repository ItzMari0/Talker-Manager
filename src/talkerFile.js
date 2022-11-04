const fs = require('fs').promises;
const path = require('path');

const talkerdb = path.resolve(__dirname, '.', 'talker.json');

const fetchTalker = async () => {
  const file = await fs.readFile(talkerdb, 'utf-8');
  return JSON.parse(file);
};

const handleGetTalker = async () => {
  const talker = await fetchTalker();
  return talker;
};

const handleGetTalkerById = async (id) => {
  const talker = await fetchTalker();
  const talkerById = talker.find((person) => person.id === Number(id));
  return talkerById;
};

module.exports = { handleGetTalker, handleGetTalkerById };
