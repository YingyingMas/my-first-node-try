const login = (username, password) => {
  if (username === '1' && password === '2') {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  login
}
