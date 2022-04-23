module.exports = async (req, res, next) => {
  let {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
    filter = {},
  } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 10;

  const skip = (page - 1) * limit;

  if (order.toLowerCase() === "desc") {
    order = -1;
  } else {
    order = 1;
  }

  req.pagination = {
    page,
    limit,
    sort,
    order,
    skip,
    filter,
  };

  return next();
};
