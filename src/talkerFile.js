const fs = require('fs').promises;
const path = require('path');
const token = require('crypto');

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

const handleCreateToken = async () => {
  const generatedToken = token.randomBytes(8).toString('hex');
  return generatedToken;
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (email.length > 0 && !EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

const passwordValidation = (req, res) => {
  const { password } = req.body;
  const MAGICNUMBER = 6;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length > 0 && password.length < MAGICNUMBER) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = { handleGetTalker,
  handleGetTalkerById,
  handleCreateToken,
  emailValidation,
  passwordValidation,
};
