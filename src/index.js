const express = require('express');
const bodyParser = require('body-parser');
const { handleGetTalker, handleGetTalkerById } = require('./talkerFile');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await handleGetTalker();
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await handleGetTalkerById(id);

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
});

app.listen(PORT, () => {
  console.log('Online');
});
