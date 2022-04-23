const sendInternalServerError = (req, res, message, error) => {
  console.error(error);

  console.error(`${req.method} ${req.originalUrl} - ${message}`);

  return res.status(500).json({
    data: null,
    message: message || "Erro interno do servidor",
  });
};

module.exports = sendInternalServerError;
