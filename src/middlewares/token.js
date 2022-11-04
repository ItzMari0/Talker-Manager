const token = async (req, res, next) => {
  const getToken = req.header('authorization');

  if (getToken === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (typeof (getToken) === 'string' && getToken.length === 16) {
    return next();
  }
  return res.status(401).json({ message: 'Token inválido' });
};

module.exports = token;
