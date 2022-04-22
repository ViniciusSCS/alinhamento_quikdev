Array.prototype.responseErrors = function () {
  return this.reduce(
    (array, item) => ({ ...array, [item.path]: item.message }),
    {}
  );
};
