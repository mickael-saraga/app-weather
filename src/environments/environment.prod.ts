export const environment = {
  production: true,
  OPEN_WEATHER_URL: 'https://api.openweathermap.org/data/2.5/',
  API_ID: '5a4b2d457ecbef9eb2a71e480b947604',
  COUNTRY_ISO_CODE: 'FR',
  lang: 'fr',
  country: 'France',
  units: 'metric',
  storage_zipcodes_key: 'zipcodes',
  paths: {
    forecast: 'forecast'
  },
  queryParams: {
    zipcode: 'zipcode',
    name: 'name',
    latitude: 'lat',
    longoitude: 'lon',
  }
};
