// Function to creating countdown functionality
export const startCountdown = (predictedDate, setCountdown, interval) => {
  if (interval) clearInterval(interval);

  const countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = predictedDate - currentDate.getTime();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      console.log("Countdown finished!");
      return;
    }
    // Convert time difference to days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  }, 1000);
};
