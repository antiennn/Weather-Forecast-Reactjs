export const getNextDays = (numDays) => {
  const today = new Date();
  const daysArray = [];

  for (let i = 0; i < numDays; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    const day = nextDay.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    daysArray.push(day);
  }

  return daysArray;
};
