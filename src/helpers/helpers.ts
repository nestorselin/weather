export const kelvinToCelsius = (temp): number => {
  return Math.round(temp - 273.15);
};

export function sevenDays(): Date {
  return new Date(new Date().setDate(new Date().getDate() - 7));
}

export function average(temperatures): number {
  return Math.round(temperatures.reduce((a, b) => a + b) / temperatures.length);
}
