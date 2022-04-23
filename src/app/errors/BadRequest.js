const sendBadRequest = (req, res, message) => {
  console.error(`${req.method} ${req.originalUrl} - ${message}`);

  res.status(400).json({
    data: null,
    message,
  });
};

module.exports = sendBadRequest;
