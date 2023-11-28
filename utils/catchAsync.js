module.exports = (fn) => {
  return (req, res, next) => {
    return (req, res, next).catch(next);
  };
};
