const { compare, genSalt, hash  } = require('bcryptjs')


const hashPassword = async (password) => {
  const salt = await genSalt(10)

  return await hash(password, salt)
}

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword)
}

module.exports = passwordCrypto = {
  hashPassword,
  verifyPassword
}