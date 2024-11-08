const jwt = require('jsonwebtoken')

const sign = (data) => {
  return jwt.sign(data, "esmegma")
} 

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, "esmegma")
    
    if (typeof decoded === 'string') return 'INVALID_TOKEN'

    return decoded
  } catch (error) {
    return 'INVALID_TOKEN'
  }
}

module.exports = JWTService = {
  sign,
  verify
}