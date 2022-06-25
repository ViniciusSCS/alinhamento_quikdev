const sendAuthenticationError = (req, res, message) => {
  console.error(`${req.method} ${req.originalUrl} - ${message}`)

  res.status(401).json({
    data: null,
    message
  })
}

module.exports = sendAuthenticationError
