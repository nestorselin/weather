export const config = (): Record<string, unknown> => ({
  appPort: process.env.PORT,
  openWeatherKey: process.env.OPEN_WEATHER_KEY,
  openWeatherCity: process.env.OPEN_WEATHER_CITY,
  openWeatherCityAppId: process.env.OPEN_WEATHER_APP_ID,
  openWeatherBaseUrl: process.env.OPEN_WEATHER_BASE_URL,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  email: process.env.EMAIL,
  temperature: process.env.TEMPERATURE,
});
