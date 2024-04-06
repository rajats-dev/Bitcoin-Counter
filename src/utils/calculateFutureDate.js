// Function to predict the future halving date

export const calculateFutureDate = (minutesToAdd) => {
  const currentDate = new Date();
  const millisecondsToAdd = minutesToAdd * 60 * 1000;
  const futureDate = new Date(currentDate.getTime() + millisecondsToAdd);
  const ISTOffset = 5.5 * 60 * 60 * 1000;
  const predictDateTime = new Date(futureDate.getTime() + ISTOffset);
  const dateObj = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = predictDateTime.toLocaleDateString("en-US", dateObj);
  return { predictDateTime, formattedDate };
};
