const dateRange = function (dates) {
  const date1 = new Date(dates[0]);
  const date2 = new Date(dates[1]);

  let range;

  if (date1 < date2) {
    const startDate = new Date(`${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`);
    const finishDate = new Date(`${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate() + 1}`);
    range = { $gte: startDate, $lte: finishDate };
  } else {
    const startDate = new Date(`${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`);
    const finishDate = new Date(`${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate() + 1}`);
    range = { $gte: startDate, $lte: finishDate };
  }

  return range;
};

export default dateRange;
