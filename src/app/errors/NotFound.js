const sendNotFoundError = (req, res, message) => {
  console.error(`${req.method} ${req.originalUrl} - ${message}`)

  res.status(404).json({
    data: null,
    message
  })
}

module.exports = sendNotFoundError
