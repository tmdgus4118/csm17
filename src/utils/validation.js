const validateEmail = (email) => {
  const EMAIL_REG = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!EMAIL_REG.test(email)) {
    const err = new Error("invalid email");
    err.statusCode = 400;
    throw err;
  }
};

const validatePassword = (password) => {
  const PASSWORD_REG = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (!PASSWORD_REG.test(password)) {
    const err = new Error("invalid password");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
