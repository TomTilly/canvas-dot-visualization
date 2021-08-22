function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debounce(func, delay = 1000) {
  let shouldFire = true;

  return (...args) => {
    if (shouldFire) {
      func(...args);
      shouldFire = false;
      setTimeout(() => {
        shouldFire = true;
      }, delay);
    }
  };
}

export { randomNumber, debounce };
