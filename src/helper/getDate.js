export const getToday = () => {

  const today = new Date();
  const day = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return day;
};
