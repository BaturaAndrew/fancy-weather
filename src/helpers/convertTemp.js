function convertToFarengeit(temp) {
  return Math.round((9 / 5) * temp + 32);
}

function convertToCelsius(temp) {
  return Math.round((5 / 9) * (temp - 32));
}

export {
  convertToFarengeit,
  convertToCelsius,
};
